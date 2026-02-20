#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const usage = `
Usage: node add_link.js [options]

Options:
  --url <url>         URL (required)
  --title <title>    Title (optional)
  --tags <tags>      Comma-separated tags (optional)
  --description <desc>  Description (optional)
  -h, --help         Show this help message

Example:
  node add_link.js --url "https://example.com" --title "Example" --tags "tag1,tag2" --description "A description"
`;

if (args.includes('-h') || args.includes('--help')) {
  console.log(usage);
  process.exit(0);
}

const urlIndex = args.indexOf('--url');
if (urlIndex === -1) {
  console.error('Error: --url is required');
  console.log(usage);
  process.exit(1);
}

const url = args[urlIndex + 1];
if (!url) {
  console.error('Error: --url requires a value');
  process.exit(1);
}

const newLink = { url };

const titleIndex = args.indexOf('--title');
if (titleIndex !== -1 && args[titleIndex + 1]) {
  newLink.title = args[titleIndex + 1];
}

const tagsIndex = args.indexOf('--tags');
if (tagsIndex !== -1 && args[tagsIndex + 1]) {
  const tags = args[tagsIndex + 1].split(',').map(t => t.trim()).filter(t => t);
  if (tags.length > 0) {
    newLink.tags = tags;
  }
}

const descIndex = args.indexOf('--description');
if (descIndex !== -1 && args[descIndex + 1]) {
  newLink.description = args[descIndex + 1];
}

const linksPath = path.join(__dirname, 'links.json');

let links = [];
try {
  const data = fs.readFileSync(linksPath, 'utf8');
  links = JSON.parse(data);
} catch (err) {
  console.error('Error reading links.json:', err.message);
  process.exit(1);
}

links.push(newLink);

try {
  fs.writeFileSync(linksPath, JSON.stringify(links, null, 2) + '\n');
  console.log('Link added successfully!');
  console.log(JSON.stringify(newLink, null, 2));
} catch (err) {
  console.error('Error writing links.json:', err.message);
  process.exit(1);
}
