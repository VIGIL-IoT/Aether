# Requirements traceability

Statuses describe repository evidence as checked on 2026-11-02. Verified means the specified software check or CAD check passed; it does not imply hardware validation.

| Requirement | Objective | Implementation | Verification | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| R-01: Map RF_CH 0–125 to 2400–2525 MHz using the project formula and reject malformed channel inputs. | O-1 | web/src/domain/rfModel.mjs | Node model tests | web/tests/rfModel.test.mjs; 8 tests passed locally and in CI for 28d0b50 | Verified for the pure model |
| R-02: Sequential selection advances both model radios and stays inside a valid custom range. | O-2 | web/src/domain/rfModel.mjs | Node model tests | Upper-edge entry, singleton range, and wrap tests in web/tests/rfModel.test.mjs | Verified for the pure model |
| R-03: Seeded random selection is repeatable and remains within the selected range. | O-2 | web/src/domain/rfModel.mjs | Node model test | web/tests/rfModel.test.mjs | Verified for the pure model |
| R-04: Fixed-offset mode selects Radio 2 using the configured offset. | O-2 | web/src/domain/rfModel.mjs | Node model test | web/tests/rfModel.test.mjs | Verified for the pure model |
| R-05: UI labels channel selections as simulated and does not imply measurement. | O-4 | web/src/App.tsx; web/src/components/OccupancyMap.tsx | Source and local browser review | UI copy, a table alternative for all channels, and manual local inspection | Partially verified; no automated browser or screen-reader suite |
| R-06: Carrier R1 schematic and PCB agree under KiCad checks. | O-5 | hardware/kicad/aether-carrier-r1/ | KiCad ERC, DRC, schematic parity | Results recorded in carrier README using KiCad CLI 10.0.7 | Verified by recorded CAD checks |
| R-07: Carrier R1 fits the intended development board and radio breakouts. | O-5 | Custom carrier footprints | Physical fit check | No assembled parts or measurements recorded | Untested |
| R-08: A production web build completes from the configured Vercel root. | O-3 | web/vercel.json; web/package.json; .github/workflows/verify-web.yml | GitHub Actions run 41471280856 passed clean install, npm audit, tests, documentation checks, and production build for commit 28d0b50 on Node.js 24 and Ubuntu 24.04 | Vercel log for 505cee1 failed; root config fix 3d34006; current Vercel revision remains unknown | Partially verified; hosted revision and dashboard root remain unconfirmed |
| R-09: Firmware operates safely and correctly with carrier R1. | N/A | Legacy sketches | Hardware-in-loop test and code review | Not performed; firmware pin map differs from R1 | Untested |
| R-10: RF experiment measurements are repeatable and valid. | N/A | No implemented acquisition path | Physical experiment and data review | No measurements or raw data are present | Planned |
| R-11: A clean web install uses the committed dependency lock and a consistent Node.js runtime. | O-3 | .nvmrc; web/package.json; web/package-lock.json; web/.npmrc; CI workflow | `npm ci` plus `npm run verify` locally and in CI on Node.js 24 | Local run 2026-11-02; CI run 41471280856 | Verified for the web package and recorded environment |
| R-12: Check the locked web dependency tree for known advisories in CI. | O-3 | .github/workflows/verify-web.yml; tools/verify-project.mjs | `npm audit --ignore-scripts --audit-level=moderate` | Local npm audit and CI run 41471280856 on 2026-11-02 | Verified for that date and threshold only |
| R-13: Keep local Markdown file links valid and enforce the repository punctuation rule. | O-3 | tools/verify-docs.mjs; tools/verify-project.mjs | `npm run verify` locally and in CI | 91 text files and 49 Markdown files scanned; external URLs and heading fragments are not checked | Verified within checker scope |
| R-14: Provide a non-visual alternative for simulated channel history and avoid rapidly announcing changing statistics. | O-4 | web/src/components/OccupancyMap.tsx; web/src/components/SpectrumView.tsx | Manual local browser review and source inspection | Expandable 126-row HTML table, named chart regions, and status-only live text | Partially verified; no automated accessibility or screen-reader test |

A test status applies only to the stated evidence. Pure-model tests do not verify the rendered interface, radio hardware, RF emissions, mechanical fit, or regulatory status.
