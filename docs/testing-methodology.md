# Testing and validation

## Software model

The pure channel-selection model is tested with Node's built-in test runner. From `web/`, run:

    npm test

The tests cover the frequency mapping, sequential stepping and wraparound, fixed-offset behavior, seeded-random repeatability, and visit counts. On 2026-11-02, Node.js v24.19.0 ran 5 tests: 5 passed, 0 failed.

On 2026-11-02, a clean `npm ci --include=dev --no-audit --no-fund` followed by `npm test`, `npm run build`, and `npm audit --audit-level=moderate` succeeded locally with Node.js v24.19.0 and npm 11.17.0. The audit reported 0 vulnerabilities. GitHub Actions run [41424242681](https://github.com/VIGIL-IoT/Aether/actions/runs/41424242681) completed successfully for commit `932c89a` using Node.js 24, `npm ci`, the same audit threshold, the model tests, and the production build.

The Vercel error supplied for commit `505cee1` was a project-root command error; the root and `web/` Vercel configurations were corrected in earlier commits. CI verifies the package build from `web/`; it does not prove which revision Vercel deployed. The public URL has responded, but its served revision is not exposed here.

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
