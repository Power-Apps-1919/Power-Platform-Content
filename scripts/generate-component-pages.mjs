import { access, copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'Power Apps', 'Components');
const outputDir = path.join(root, 'src', 'content', 'docs', 'components');
const publicComponentDir = path.join(root, 'public', 'downloads', 'components');
const blogSourceDir = path.join(root, 'Power Apps', 'Blog');
const blogOutputDir = path.join(root, 'src', 'content', 'docs', 'blog');
const publicImageDir = path.join(root, 'public', 'images');

const categoryByName = {
  Card_Control: 'interface',
  Custom_Notification: 'interface',
  Divider: 'interface',
  Loading_Animation: 'interface',
  Popup: 'interface',
  StatusBadge: 'interface',
  TimePicker: 'input-utility',
  Reusable_JSON_Parser: 'input-utility',
  Email_Popup: 'communication',
};

const titleFor = (name) => name
  .replaceAll('_', ' ')
  .replace(/([a-z])([A-Z])/g, '$1 $2');

await mkdir(outputDir, { recursive: true });
await mkdir(publicComponentDir, { recursive: true });

const componentFolders = (await readdir(sourceDir, { withFileTypes: true }))
  .filter((entry) => entry.isDirectory() && !entry.name.startsWith('_'))
  .sort((a, b) => a.name.localeCompare(b.name));

for (const folder of componentFolders) {
  const folderPath = path.join(sourceDir, folder.name);
  const files = (await readdir(folderPath))
    .filter((file) => file.toLowerCase().endsWith('.yml'));
  if (files.length === 0) continue;
  const file = files[0];
  const name = path.basename(file, '.yml');
  const title = titleFor(name);
  const slug = name.toLowerCase().replaceAll('_', '-');
  const category = categoryByName[name] ?? 'interface';
  const source = await readFile(path.join(folderPath, file), 'utf8');
  const readmePath = path.join(folderPath, 'README.md');
  let readme = '';
  try {
    readme = await readFile(readmePath, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  const documentation = readme
    .replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n?/, '')
    .replace(/^#\s+.+\r?\n?/, '')
    .trim();
  const destination = path.join(outputDir, `${slug}.md`);
  const content = `---
title: ${title}
description: Reusable ${title} component for Power Apps Canvas Apps.
date: 2026-09-16
tags:
  - components
  - ${category}
---

<div class="page-kicker">COMPONENT / ${category.toUpperCase().replace('-', ' ')}</div>

# ${title}

Reusable YAML source for a Power Apps Canvas App component. Download the original
definition, import it into Power Apps Studio, and customize its properties for your app.

<div class="component-actions">
  <a href="/Power-Platform-Content/downloads/components/${file}" download="${file}">Download YAML source</a>
  <span>Updated 16 Sep 2026</span>
</div>

${documentation ? `## Component documentation

${documentation}

` : ''}## Source preview

\`\`\`yaml
${source.trim()}
\`\`\`
`;
  await writeFile(destination, content);
  await copyFile(path.join(folderPath, file), path.join(publicComponentDir, file));
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
  const source = await readFile(sourcePath, 'utf8');
  const frontmatter = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
  const title = source.match(/^title:\s*(.+)$/m)?.[1]
    ?? source.match(/^#\s+(.+)$/m)?.[1]
    ?? titleFor(folder.name);
  const description = source.match(/^description:\s*(.+)$/m)?.[1]
    ?? 'Practical Power Platform implementation guidance.';
  const date = source.match(/^date:\s*(.+)$/m)?.[1] ?? new Date().toISOString().slice(0, 10);
  const sourceTags = source.match(/^tags:\r?\n((?:\s+-\s+.+\r?\n?)+)/m)?.[1]
    ?.match(/-\s+(.+)/g)?.map((tag) => tag.replace(/^-\s+/, '').trim()) ?? ['blog', 'power-platform'];
  const body = source
    .replace(frontmatter?.[0] ?? '', '')
    .replace(/^#\s+.+\r?\n?/, '')
    .replaceAll('src="./images/', `src="/Power-Platform-Content/images/${slug}/`);
  await writeFile(destination, `---
title: ${JSON.stringify(title)}
description: ${JSON.stringify(description)}
date: ${JSON.stringify(date)}
tags:
${sourceTags.map((tag) => `  - ${tag}`).join('\n')}
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
