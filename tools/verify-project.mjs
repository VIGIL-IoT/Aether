import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const webDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '../web');
const npmCliPath = process.env.npm_execpath;

if (!npmCliPath) {
  console.error('Run this verifier with npm run verify so npm can locate its own CLI.');
  process.exit(1);
}

const childEnvironment = { ...process.env };
// npm may export a per-user allow-scripts setting as an environment override to nested npm commands.
for (const variable of Object.keys(childEnvironment)) {
  if (variable.toLowerCase() === 'npm_config_allow_scripts') delete childEnvironment[variable];
}

const checks = [
  ['Repository documentation', ['../tools/verify-docs.mjs']],
  ['Dependency audit', [npmCliPath, 'audit', '--ignore-scripts', '--audit-level=moderate']],
  ['Model tests', ['--test']],
  ['Production build', [npmCliPath, 'run', 'build']],
];

for (const [label, args] of checks) {
  console.log(`\n${label}`);
  const result = spawnSync(process.execPath, args, {
    cwd: webDirectory,
    env: childEnvironment,
    stdio: 'inherit',
  });
  if (result.error) {
    console.error(result.error.message);
    process.exit(1);
  }
  if (result.status !== 0) process.exit(result.status ?? 1);
}

console.log('\nAll project verification checks passed.');
