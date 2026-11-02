import { readdir, readFile, stat } from 'node:fs/promises';
import { dirname, extname, isAbsolute, relative, resolve, sep, win32 } from 'node:path';
import { fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const skippedDirectories = new Set(['.git', 'node_modules', 'dist', 'build', '.venv', 'venv']);
const textFileNames = new Set(['.editorconfig', '.gitattributes', '.gitignore', '.npmrc', '.nvmrc']);
const textExtensions = new Set([
  '.c', '.cc', '.cpp', '.css', '.csv', '.h', '.hpp', '.html', '.ino', '.js', '.json',
  '.jsx', '.kicad_mod', '.kicad_pcb', '.kicad_pro', '.kicad_sch', '.md', '.mjs', '.ps1',
  '.py', '.sh', '.sql', '.svg', '.tex', '.toml', '.ts', '.tsx', '.txt', '.xml', '.yaml', '.yml',
]);
const emDash = String.fromCodePoint(0x2014);
const encodedEmDashPattern = /&(?:mdash|#0*8212|#x0*2014);/i;
const inlineLinkPattern = /!?(?:\[[^\]]*\])\(\s*(?:<([^>]+)>|([^\s)]+))(?:\s+[^)]*)?\)/g;
const referenceLinkPattern = /^\s*\[[^\]]+\]:\s*(?:<([^>]+)>|(\S+))/gm;
const scannedFiles = [];
const markdownFiles = [];
const violations = [];

async function collectTextFiles(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && skippedDirectories.has(entry.name)) continue;
    const filePath = resolve(directory, entry.name);
    if (entry.isDirectory()) {
      await collectTextFiles(filePath);
    } else if (
      entry.isFile()
      && (textExtensions.has(extname(entry.name).toLowerCase()) || textFileNames.has(entry.name.toLowerCase()))
    ) {
      scannedFiles.push(filePath);
      if (extname(entry.name).toLowerCase() === '.md') markdownFiles.push(filePath);
    }
  }
}

function lineAt(source, index) {
  return source.slice(0, index).split('\n').length;
}

function resolveLocalTarget(markdownPath, rawTarget) {
  let target = rawTarget.trim();
  if (!target || target.startsWith('#') || /^[a-z][a-z\d+.-]*:/i.test(target) || target.startsWith('//')) return null;

  target = target.split(/[?#]/, 1)[0];
  try {
    target = decodeURIComponent(target);
  } catch {
    return { error: `invalid percent-encoding in link: ${rawTarget}` };
  }

  target = target.replaceAll('/', sep);
  if (!target) return null;
  if (isAbsolute(target) || win32.isAbsolute(target)) {
    return { error: `absolute local path is not portable: ${rawTarget}` };
  }

  const resolvedTarget = resolve(dirname(markdownPath), target);
  const pathFromRoot = relative(repositoryRoot, resolvedTarget);
  if (pathFromRoot === '..' || pathFromRoot.startsWith(`..${sep}`) || isAbsolute(pathFromRoot)) {
    return { error: `link escapes the repository: ${rawTarget}` };
  }
  return { path: resolvedTarget };
}

async function checkTarget(markdownPath, line, rawTarget) {
  const result = resolveLocalTarget(markdownPath, rawTarget);
  if (!result) return;
  const displayPath = relative(repositoryRoot, markdownPath).replaceAll(sep, '/');
  if (result.error) {
    violations.push(`${displayPath}:${line}: ${result.error}`);
    return;
  }

  try {
    await stat(result.path);
  } catch {
    const target = relative(repositoryRoot, result.path).replaceAll(sep, '/');
    violations.push(`${displayPath}:${line}: missing local target ${target}`);
  }
}

await collectTextFiles(repositoryRoot);

for (const filePath of scannedFiles) {
  const source = await readFile(filePath, 'utf8');
  const literalIndex = source.indexOf(emDash);
  if (literalIndex !== -1 || encodedEmDashPattern.test(source)) {
    const matchIndex = literalIndex !== -1 ? literalIndex : source.search(encodedEmDashPattern);
    violations.push(`${relative(repositoryRoot, filePath).replaceAll(sep, '/')}:${lineAt(source, matchIndex)}: forbidden em dash punctuation`);
  }
}

for (const markdownPath of markdownFiles) {
  const source = await readFile(markdownPath, 'utf8');
  for (const pattern of [inlineLinkPattern, referenceLinkPattern]) {
    pattern.lastIndex = 0;
    let match;
    while ((match = pattern.exec(source)) !== null) {
      const rawTarget = match[1] ?? match[2];
      await checkTarget(markdownPath, lineAt(source, match.index), rawTarget);
    }
  }
}

if (violations.length > 0) {
  console.error(`Documentation verification failed with ${violations.length} issue(s):`);
  for (const violation of violations) console.error(`- ${violation}`);
  process.exitCode = 1;
} else {
  console.log(`Documentation verification passed: ${scannedFiles.length} text files scanned, ${markdownFiles.length} Markdown files checked, no forbidden punctuation or missing local links.`);
}
