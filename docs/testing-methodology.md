# Testing and validation

## Canonical software verification

From `web/`, run `npm ci --no-audit --no-fund` and then `npm run verify`.

The verification command checks local Markdown targets and repository text for forbidden em dash punctuation, audits npm dependencies at the moderate threshold, runs the Node model tests, type-checks the app, and builds the static site. It does not verify external URLs or Markdown heading fragments. The clean install uses the `esbuild` lifecycle-script allowlist in `web/.npmrc`.

The tests cover the 2400 to 2525 MHz endpoint mapping, rejection of invalid frequency inputs, sequential stepping and wraparound, entry into an upper-edge custom range, singleton ranges across all hop modes, malformed range rejection, fixed-offset behavior, seeded-random repeatability, channel bounds, elapsed model time, and visit-count totals. On 2026-11-02, Node.js v24.19.0 ran 8 tests: 8 passed, 0 failed.

On 2026-11-02, a clean `npm ci --no-audit --no-fund` followed by `npm run verify` succeeded locally with Node.js v24.19.0 and npm 11.17.0. The audit reported 0 vulnerabilities. The documentation checker scanned 91 text files and 49 Markdown files. GitHub Actions run [41471280856](https://github.com/VIGIL-IoT/Aether/actions/runs/41471280856) completed successfully for commit `28d0b50` using Node.js 24, a clean install, dependency audit, documentation checks, model tests, and a production build on Ubuntu 24.04.

## Manual accessibility review

The local desktop browser review confirmed semantic controls, named chart regions with `tabIndex=0` and visible focus styling, a status-only live announcement for Ready/Running/Paused, and a disclosure containing a 126-row HTML data table with row and column headers. Frequently changing visit statistics are not a live region. A token contrast calculation found at least 5.16:1 across the three CSS app surfaces for the checked text color tokens.

This is a scoped manual review. It is not a WCAG conformance claim, screen-reader test, mobile viewport check, automated browser suite, or cross-browser compatibility result.

The Vercel error supplied for commit `505cee1` was a project-root command error; the root and `web/` Vercel configurations were corrected in earlier commits. CI verifies the package build from `web/`; it does not prove which revision Vercel deployed. The public URL has responded, but its served revision is not exposed here.

## Hardware CAD

The carrier README records KiCad CLI 10.0.7 results: 0 ERC violations, 0 PCB DRC violations, 0 unconnected items, and 0 schematic-parity issues. These are recorded CAD-rule checks, not a new run during this documentation workstream. They do not validate physical fit, assembly, electrical margins, signal integrity, RF behavior, or compliance.

## Firmware and physical experiments

No firmware hardware test, RF measurement, range test, power measurement, automated browser test, or hardware-in-loop test result is present. The experiment folders describe proposals only. Do not report a hardware test as passed without dated logs, exact hardware and firmware revisions, test equipment, method, raw data, and reviewable results.

## Evidence needed for stronger claims

- Web build: clean dependency installation and successful production build from the configured web/ root.
- UI behavior: browser-level checks at desktop and narrow viewports.
- Carrier fit: exact mating parts, measured fit, and enclosure-clearance record.
- Electrical behavior: reviewed test plan, instrument details, and recorded measurements.
- Firmware/radio behavior: code review against the current pin map and separately reviewed, authorized bench validation.
- Experiment results: protocol, variables, repetitions, raw data, analysis scripts, and limitations.
