# Dependency management

## Runtime and lockfile

The web package uses Node.js 24, recorded in the repository `.nvmrc`, `web/package.json` `engines` field, and CI workflow. `web/package-lock.json` pins the dependency tree used by `npm ci`. Commit lockfile updates with the corresponding `package.json` change.

For a clean install and local verification, run from `web/`:

```sh
npm ci
npm run verify
```

`npm run verify` checks repository Markdown links and punctuation, runs `npm audit` at the moderate threshold, runs the model tests, and performs the TypeScript check and production build. Its runner removes only the `npm_config_allow_scripts` environment entry that npm may export from a per-user configuration when nesting npm commands. The audit itself runs with lifecycle scripts disabled.

`web/.npmrc` allows the `esbuild` install script required to select its platform binary. The current lockfile resolves esbuild 0.25.12, whose `postinstall` command is `node install.js`. No other dependency install script is approved by this project policy. See npm's [install-script policy](https://docs.npmjs.com/cli/v11/using-npm/config/#allow-scripts). Review dependency updates before accepting them. `npm audit` reports known registry advisories for the resolved dependency tree at the time of the query; it is not a general code-behavior or runtime security review. CI repeats the moderate-severity threshold on documentation, web, hardware, firmware, and verification-tool changes.

The repository uses monthly Dependabot checks for npm dependencies in `web/` and GitHub Actions. These update proposals still require review.

## Generate a software bill of materials

Generate a CycloneDX SBOM from the lockfile on demand from `web/`:

```sh
npm sbom --package-lock-only --sbom-format cyclonedx --sbom-type application
```

The command writes JSON to standard output, so redirect it to a dated or revision-named file if an audit record needs to retain that exact inventory. Regenerate it after dependency changes. The SBOM describes the web npm dependency tree only; it does not inventory the KiCad design, legacy firmware, Node.js runtime image, Vercel configuration, or deployed environment. npm documents the [SBOM command and supported formats](https://docs.npmjs.com/cli/v11/commands/npm-sbom/).

No generated SBOM is committed because a checked-in copy would become stale unless regenerated for every lockfile update. The verified command produced CycloneDX 1.5 output with 122 components on 2026-11-02.
