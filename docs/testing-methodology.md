# Testing and validation

## Software model

The pure channel-selection model is tested with Node's built-in test runner. From web/, run:

    npm test

The tests cover the frequency mapping, sequential stepping and wraparound, fixed-offset behavior, seeded-random repeatability, and visit counts. On 2026-11-02, Node.js v24.19.0 ran 5 tests: 5 passed, 0 failed.

The full TypeScript/Vite build was not verified locally because dependency resolution stalled. The package had an ESLint script but no ESLint dependency or configuration; that unusable script has been removed. A GitHub Actions workflow now runs the model tests and production build, but it has not run on GitHub yet.

The Vercel error supplied for commit 505cee1 is a project-root command error; web/vercel.json was added in commit 3d34006. The public URL returned HTTP 200 and served the Aether simulator after commit ab5a033, but the response did not identify its deployed revision. This confirms endpoint availability, not a successful build of a particular commit.

## Hardware CAD

The carrier README records KiCad CLI 10.0.7 results: 0 ERC violations, 0 PCB DRC violations, 0 unconnected items, and 0 schematic-parity issues. These are CAD-rule checks. They do not validate physical fit, assembly, electrical margins, signal integrity, RF behavior, or compliance.

## Firmware and physical experiments

No firmware hardware test, RF measurement, range test, power measurement, browser automation, or hardware-in-loop test result is present. The experiment folders describe proposals only. Do not report a hardware test as passed without dated logs, exact hardware and firmware revisions, test equipment, method, raw data, and reviewable results.

## Evidence needed for stronger claims

- Web build: clean dependency installation and successful production build from the configured web/ root.
- UI behavior: browser-level checks at desktop and narrow viewports.
- Carrier fit: exact mating parts, measured fit, and enclosure-clearance record.
- Electrical behavior: reviewed test plan, instrument details, and recorded measurements.
- Firmware/radio behavior: code review against the current pin map and separately reviewed, authorized bench validation.
- Experiment results: protocol, variables, repetitions, raw data, analysis scripts, and limitations.
