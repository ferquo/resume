#!/usr/bin/env node
import { promises as fs } from 'fs';
import path from 'path';

const distDir = path.resolve(process.cwd(), 'dist');

async function* walk(dir) {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const res = path.resolve(dir, entry.name);
    if (entry.isDirectory()) {
      yield* walk(res);
    } else {
      yield res;
    }
  }
}

function stripHtml(content) {
  // Remove HTML comments
  let out = content.replace(/<!--([\s\S]*?)-->/g, '');
  // Collapse whitespace between tags
  out = out.replace(/>\s+</g, '><');
  // Trim leading/trailing whitespace
  return out.trim();
}

function stripCss(content) {
  // Remove all CSS block comments
  let out = content.replace(/\/\*[\s\S]*?\*\//g, '');
  // Collapse consecutive whitespace
  out = out.replace(/\s{2,}/g, ' ');
  return out.trim();
}

async function run() {
  try {
    for await (const file of walk(distDir)) {
      if (file.endsWith('.html') || file.endsWith('.css')) {
        const content = await fs.readFile(file, 'utf8');
        const processed = file.endsWith('.html') ? stripHtml(content) : stripCss(content);
        await fs.writeFile(file, processed, 'utf8');
      }
    }
    console.log('Post-build: stripped HTML/CSS comments and tightened whitespace');
  } catch (err) {
    console.error('Post-build strip failed:', err);
    process.exit(1);
  }
}

run();

