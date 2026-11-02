# Repository tools

## Verification commands

- `verify-docs.mjs` scans repository text files for em dash characters and common HTML entities, then checks local Markdown file links. It does not check external link availability or Markdown heading fragments.
- `verify-project.mjs` runs the repository documentation check, npm audit, Node model tests, and the web production build in sequence. Run it through `npm run verify` from `web/`.

Both scripts use Node.js built-in modules. The model tests live under `web/tests/` and use Node's built-in test runner. The KiCad project documents its ERC/DRC checks in its README.
