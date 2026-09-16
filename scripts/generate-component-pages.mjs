import { access, copyFile, mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'Power Apps', 'Components');
const outputDir = path.join(root, 'src', 'content', 'docs', 'components');
const publicComponentDir = path.join(root, 'public', 'downloads', 'components');
const blogSourceDir = path.join(root, 'Power Apps', 'Blog');
const blogOutputDir = path.join(root, 'src', 'content', 'docs', 'blog');
const blogImageSourceDir = path.join(blogSourceDir, 'images');
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

const files = (await readdir(sourceDir))
  .filter((file) => file.toLowerCase().endsWith('.yml'))
  .sort((a, b) => a.localeCompare(b));

for (const file of files) {
  const name = path.basename(file, '.yml');
  const title = titleFor(name);
  const slug = name.toLowerCase().replaceAll('_', '-');
  const category = categoryByName[name] ?? 'interface';
  const source = await readFile(path.join(sourceDir, file), 'utf8');
  const readmePath = path.join(sourceDir, `${name}.md`);
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
  await copyFile(path.join(sourceDir, file), path.join(publicComponentDir, file));
}

console.log(`Generated ${files.length} component pages.`);

const blogFiles = (await readdir(blogSourceDir))
  .filter((file) => file.toLowerCase().endsWith('.md') && !file.toLowerCase().startsWith('tmp_'));

await mkdir(blogOutputDir, { recursive: true });
for (const file of blogFiles) {
  const slug = path.basename(file, '.md').toLowerCase().replaceAll('_', '-');
  const destination = path.join(blogOutputDir, `${slug}.md`);
  try {
    await access(destination);
    continue;
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }

  const source = await readFile(path.join(blogSourceDir, file), 'utf8');
  const title = source.match(/^#\s+(.+)$/m)?.[1] ?? titleFor(path.basename(file, '.md'));
  const body = source.replace(/^#\s+.+\r?\n/, '').replaceAll('src="./images/', 'src="/Power-Platform-Content/images/');
  await writeFile(destination, `---
title: ${title}
description: Practical Power Platform implementation guidance.
date: ${new Date().toISOString().slice(0, 10)}
tags:
  - blog
  - power-platform
---

${body.trim()}
`);
}

try {
  const imageDirs = await readdir(blogImageSourceDir, { withFileTypes: true });
  await mkdir(publicImageDir, { recursive: true });
  for (const directory of imageDirs.filter((entry) => entry.isDirectory())) {
    const targetDir = path.join(publicImageDir, directory.name);
    await mkdir(targetDir, { recursive: true });
    const images = await readdir(path.join(blogImageSourceDir, directory.name));
    for (const image of images) {
      await copyFile(path.join(blogImageSourceDir, directory.name, image), path.join(targetDir, image));
    }
  }
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
