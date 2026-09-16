import { access, copyFile, mkdir, readdir, readFile, rm, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'power-platform-library', 'components');
const outputDir = path.join(root, 'src', 'content', 'docs', 'components');
const publicComponentDir = path.join(root, 'public', 'downloads', 'components');
const blogSourceDir = path.join(root, 'power-platform-library', 'blog');
const blogOutputDir = path.join(root, 'src', 'content', 'docs', 'blog');
const publicImageDir = path.join(root, 'public', 'images');
const publicBlogDownloadDir = path.join(root, 'public', 'downloads', 'blog');
const sharedComponentGuidancePath = path.join(root, 'power-platform-library', 'shared', 'component-yaml-guidance.md');

const categoryByName = {
  'cmp-card-control': 'interface',
  'cmp-custom-notification': 'interface',
  'cmp-divider': 'interface',
  'cmp-loading-animation': 'interface',
  'cmp-popup': 'interface',
  'cmp-status-badge': 'interface',
  'cmp-time-picker': 'input-utility',
  'cmp-reusable-json-parser': 'input-utility',
  'cmp-email-popup': 'communication',
};

const sharedComponentGuidance = await readFile(sharedComponentGuidancePath, 'utf8');

const titleFor = (name) => name
  .replaceAll('_', ' ')
  .replace(/^cmp[-_]/i, '')
  .replace(/([a-z])([A-Z])/g, '$1 $2');

const metadataFrom = (source, fallbackTitle, fallbackDescription, fallbackDate, fallbackTags) => {
  const normalizedSource = source.replace(/^\uFEFF/, '');
  const frontmatter = normalizedSource.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const block = frontmatter?.[1] ?? '';
  const read = (key, fallback) => block.match(new RegExp(`^${key}:\\s*["']?(.+?)["']?$`, 'm'))?.[1] ?? fallback;
  const tags = block.match(/^tags:\r?\n((?:\s+-\s+.+\r?\n?)+)/m)?.[1]
    ?.match(/-\s+(.+)/g)?.map((tag) => tag.replace(/^-\s+/, '').trim()) ?? fallbackTags;
  return {
    title: read('title', fallbackTitle),
    description: read('description', fallbackDescription),
    date: read('date', fallbackDate),
    tags,
  };
};

const copyFiles = async (sourceDir, destinationDir) => {
  await mkdir(destinationDir, { recursive: true });
  for (const entry of await readdir(sourceDir, { withFileTypes: true })) {
    const sourcePath = path.join(sourceDir, entry.name);
    const destinationPath = path.join(destinationDir, entry.name);
    if (entry.isDirectory()) {
      await copyFiles(sourcePath, destinationPath);
    } else {
      await copyFile(sourcePath, destinationPath);
      }
    }
};

await mkdir(outputDir, { recursive: true });
await mkdir(publicComponentDir, { recursive: true });
for (const generatedFile of await readdir(outputDir)) {
  if (generatedFile !== 'index.md' && generatedFile.toLowerCase().endsWith('.md')) {
    await unlink(path.join(outputDir, generatedFile));
  }
}

const componentFolders = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
  .sort((a, b) => a.name.localeCompare(b.name));

const currentDownloadFiles = new Set();
for (const folder of componentFolders) {
  const folderPath = path.join(sourceDir, folder.name);
  const files = (await readdir(folderPath))
    .filter((file) => file.toLowerCase().endsWith('.yml'));
  if (files.length === 0) {
    throw new Error(`Component folder "${folder.name}" must contain exactly one .yml file.`);
  }
  if (files.length > 1) {
    throw new Error(`Component folder "${folder.name}" contains multiple .yml files: ${files.join(', ')}`);
  }
  const file = files[0];
  const expectedName = `cmp-${folder.name.replace(/^cmp-/, '')}.yml`;
  if (file !== expectedName) {
    throw new Error(`Component folder "${folder.name}" must contain "${expectedName}", found "${file}".`);
  }
  currentDownloadFiles.add(file);
  const name = path.basename(file, '.yml');
  const defaultTitle = titleFor(name);
  const slugBase = name.toLowerCase().replaceAll('_', '-');
  const slug = slugBase.startsWith('cmp-') ? slugBase : `cmp-${slugBase}`;
  const source = await readFile(path.join(folderPath, file), 'utf8');
  const readmePath = path.join(folderPath, 'README.md');
  let readme = '';
  try {
    readme = await readFile(readmePath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  readme = readme.replace(/^\uFEFF/, '');
  const documentation = readme
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
    .replace(/^#\s+.+\r?\n?/, '')
    .trim();
  const metadata = metadataFrom(
    readme,
    defaultTitle,
    `Reusable ${defaultTitle} component for Power Apps Canvas Apps.`,
    new Date().toISOString().slice(0, 10),
    ['components', categoryByName[name] ?? 'visualization'],
  );
  const destination = path.join(outputDir, `${slug}.md`);
  const content = `---
title: ${JSON.stringify(metadata.title)}
description: ${JSON.stringify(metadata.description)}
date: ${JSON.stringify(metadata.date)}
tags:
${metadata.tags.map((tag) => `  - ${tag}`).join('\n')}
---

<div class="page-kicker">COMPONENT / ${metadata.tags[1]?.toUpperCase().replace('-', ' ') ?? 'LIBRARY'}</div>

# ${metadata.title}

${metadata.description} Download the original definition and use it with a component
library or another supported source-code workflow for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/${file}" download="${file}">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

${documentation ? `## Component documentation

${documentation}

` : ''}${sharedComponentGuidance.trim()}

## Source preview

\`\`\`yaml
${source.trim()}
\`\`\`
`;
  await writeFile(destination, content);
  await copyFile(path.join(folderPath, file), path.join(publicComponentDir, file));
}

for (const downloadFile of await readdir(publicComponentDir)) {
  if (downloadFile.toLowerCase().endsWith('.yml') && !currentDownloadFiles.has(downloadFile)) {
    await unlink(path.join(publicComponentDir, downloadFile));
  }
}

console.log(`Generated ${componentFolders.length} component pages.`);

const blogFolders = (await readdir(blogSourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
  .sort((a, b) => a.name.localeCompare(b.name));

await mkdir(blogOutputDir, { recursive: true });
for (const folder of blogFolders) {
  const folderPath = path.join(blogSourceDir, folder.name);
  const file = 'README.md';
  const sourcePath = path.join(folderPath, file);
  try {
    await access(sourcePath);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    continue;
  }
  const slug = folder.name.toLowerCase().replaceAll('_', '-');
  const destination = path.join(blogOutputDir, `${slug}.md`);
  const source = (await readFile(sourcePath, 'utf8')).replace(/^\uFEFF/, '');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const metadata = metadataFrom(
    source,
    source.match(/^#\s+(.+)$/m)?.[1] ?? titleFor(folder.name),
    'Practical Power Platform implementation guidance.',
    new Date().toISOString().slice(0, 10),
    ['blog', 'power-platform'],
  );
  const body = source
    .replace(frontmatter?.[0] ?? '', '')
    .replace(/^#\s+.+\r?\n?/, '')
    .replaceAll('src="./images/', `src="/Power-Platform-Content/images/${slug}/`)
    .replaceAll('](./downloads/', `](/Power-Platform-Content/downloads/blog/${slug}/`);
  await writeFile(destination, `---
title: ${JSON.stringify(metadata.title)}
description: ${JSON.stringify(metadata.description)}
date: ${JSON.stringify(metadata.date)}
tags:
${metadata.tags.map((tag) => `  - ${tag}`).join('\n')}
---

${body.trim()}
`);
}

try {
  const imageDirs = await readdir(blogSourceDir, { withFileTypes: true });
  await mkdir(publicImageDir, { recursive: true });
  for (const directory of imageDirs.filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))) {
    const sourceImages = path.join(blogSourceDir, directory.name, 'images');
    let images;
    try {
      images = await readdir(sourceImages);
    } catch (error) {
      if (error.code === 'ENOENT') continue;
      throw error;
    }
    const targetDir = path.join(publicImageDir, directory.name.toLowerCase().replaceAll('_', '-'));
    await mkdir(targetDir, { recursive: true });
    for (const image of images.filter((file) => file.toLowerCase().match(/\.(png|jpg|jpeg|gif|webp|svg)$/))) {
      await copyFile(path.join(sourceImages, image), path.join(targetDir, image));
    }
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}

await mkdir(publicBlogDownloadDir, { recursive: true });
for (const folder of blogFolders) {
  const sourceDownloads = path.join(blogSourceDir, folder.name, 'downloads');
  const destinationDownloads = path.join(publicBlogDownloadDir, folder.name.toLowerCase().replaceAll('_', '-'));
  try {
    await rm(destinationDownloads, { recursive: true, force: true });
    await copyFiles(sourceDownloads, destinationDownloads);
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
}
