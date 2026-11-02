# Requirements traceability

Statuses describe repository evidence as checked on 2026-11-02. Verified means the specified software check or CAD check passed; it does not imply hardware validation.

| Requirement | Objective | Implementation | Verification | Evidence | Status |
| --- | --- | --- | --- | --- | --- |
| R-01: Map RF_CH 0–125 to 2400–2525 MHz using the project formula. | O-1 | web/src/domain/rfModel.mjs | Node model test | web/tests/rfModel.test.mjs; 5 tests passed locally | Verified for the pure model |
| R-02: Sequential selection advances both model radios and wraps within range. | O-2 | web/src/domain/rfModel.mjs | Node model tests | web/tests/rfModel.test.mjs | Verified for the pure model |
| R-03: Seeded random selection is repeatable and remains within the selected range. | O-2 | web/src/domain/rfModel.mjs | Node model test | web/tests/rfModel.test.mjs | Verified for the pure model |
| R-04: Fixed-offset mode selects Radio 2 using the configured offset. | O-2 | web/src/domain/rfModel.mjs | Node model test | web/tests/rfModel.test.mjs | Verified for the pure model |
| R-05: UI labels channel selections as simulated and does not imply measurement. | O-4 | web/src/App.tsx; web/README.md | Source review | UI copy and web README | Partially verified; no browser automation |
| R-06: Carrier R1 schematic and PCB agree under KiCad checks. | O-5 | hardware/kicad/aether-carrier-r1/ | KiCad ERC, DRC, schematic parity | Results recorded in carrier README using KiCad CLI 10.0.7 | Verified by recorded CAD checks |
| R-07: Carrier R1 fits the intended development board and radio breakouts. | O-5 | Custom carrier footprints | Physical fit check | No assembled parts or measurements recorded | Untested |
| R-08: A production web build completes from the configured Vercel root. | O-3 | web/vercel.json; web/package.json; .github/workflows/verify-web.yml | GitHub Actions run 41424242681 passed clean install, dependency audit, tests, and production build on Node.js 24 for commit 932c89a; public URL responds but its deployed revision is unknown | Vercel log for 505cee1 failed; root config fix 3d34006; Node 24 CI run 41424242681 | Partially verified; Vercel revision association remains unconfirmed |
| R-09: Firmware operates safely and correctly with carrier R1. | N/A | Legacy sketches | Hardware-in-loop test and code review | Not performed; firmware pin map differs from R1 | Untested |
| R-10: RF experiment measurements are repeatable and valid. | N/A | No implemented acquisition path | Physical experiment and data review | No measurements or raw data are present | Planned |
| R-11: A clean web install uses the committed dependency lock and a consistent Node.js runtime. | O-3 | .nvmrc; web/package.json; web/package-lock.json; CI workflow | `npm ci` plus local and CI tests/build on Node.js 24 | Local run 2026-11-02; CI run 41424242681 | Verified for the web package |
| R-12: Check the locked web dependency tree for known advisories in CI. | O-3 | .github/workflows/verify-web.yml | `npm audit --audit-level=moderate` | Local npm audit and CI run 41424242681 on 2026-11-02 | Verified for that date and threshold only |

A test status applies only to the stated evidence. Pure-model tests do not verify the rendered interface, radio hardware, RF emissions, mechanical fit, or regulatory status.
