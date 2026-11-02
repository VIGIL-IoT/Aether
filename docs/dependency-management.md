# Dependency management

## Runtime and lockfile

The web package uses Node.js 24, recorded in the repository `.nvmrc`, `web/package.json` `engines` field, and CI workflow. `web/package-lock.json` pins the dependency tree used by `npm ci`. Commit lockfile updates with the corresponding `package.json` change.

For a clean install and local verification, run from `web/`:

```sh
npm ci
npm audit --audit-level=moderate
npm test
npm run build
```

Review dependency updates before accepting them. `npm audit` reports known registry advisories for the resolved dependency tree at the time of the query; it is not a general code-behavior or runtime security review. CI repeats the moderate-severity threshold on web changes.

## Generate a software bill of materials

Generate a CycloneDX SBOM from the lockfile on demand from `web/`:

```sh
npm sbom --package-lock-only --sbom-format cyclonedx --sbom-type application
```

The command writes JSON to standard output, so redirect it to a dated or revision-named file if an audit record needs to retain that exact inventory. Regenerate it after dependency changes. The SBOM describes the web npm dependency tree only; it does not inventory the KiCad design, legacy firmware, Node.js runtime image, Vercel configuration, or deployed environment. npm documents the [SBOM command and supported formats](https://docs.npmjs.com/cli/v11/commands/npm-sbom/).

No generated SBOM is committed because a checked-in copy would become stale unless regenerated for every lockfile update. The verified command produced CycloneDX 1.5 output with 122 components on 2026-11-02.
