# Engineering evidence and applicable gates

**Review date:** 2026-11-02

**Repository:** `VIGIL-IoT/Aether`
**Latest verified commit:** `f53b40e` for the verification workflow; subsequent documentation changes are not yet included in that run.

This file records what applies to the repository, what was checked, and which conclusions remain limited by absent physical or deployment evidence.

## Applicability map

| Capability | Status | Repository evidence | Gate decision |
| --- | --- | --- | --- |
| Browser software and frontend | Applicable | React and TypeScript simulator under `web/` | Model tests, build, documentation checks, supply-chain review, and accessibility review apply. |
| Analytics dashboard | Not applicable | The page is a teaching simulator, not an operational metrics dashboard. | No service telemetry or analytics infrastructure added. |
| API, backend, network service | Not applicable | No server, API, account, database, or radio connection. | No API contract, backend observability, or service threat model added. |
| Package or public library | Not applicable as a public product | `web/package.json` is private. `rfModel.mjs` is an internal module. | Internal model behavior is tested, but no external semver contract is claimed. |
| Firmware and embedded systems | Partially applicable | Legacy ESP32 sketches exist, but they are not built or reconciled with Carrier R1. | Source status and pin mismatch are documented. No firmware build or hardware execution is claimed. |
| Electronics, PCB, and IoT | Partially applicable | Carrier R1 schematic and PCB exist as an unbuilt proposal. | Manufacturer references, assumptions, failure modes, BOM gaps, and CAD evidence are recorded. Physical fit and electrical validation remain open. |
| Research, simulation, and education | Partially applicable | The deterministic browser model and unexecuted experiment proposals exist. | Model semantics and research gaps are documented. No measured result, novelty claim, or study outcome is asserted. |
| DevOps and hosting | Applicable | GitHub Actions and Vercel configuration exist. | CI verification and supply-chain configuration apply. The deployed Vercel revision remains unknown. |
| Security | Partially applicable | Static frontend plus npm and GitHub Actions dependencies; legacy transmitter-capable source is present. | Dependency integrity and least-privilege CI are reviewed. No security product, full penetration test, or firmware safety validation is claimed. |
| Scientific computing, data science, machine learning, robotics | Not applicable | No scientific dataset, ML model, robotics control, or analysis pipeline is implemented. | No research plotting, ML, or robotics infrastructure added. |
| Documentation and accessibility | Applicable | Public Markdown, diagrams, and a user-facing simulator are present. | Link and punctuation checks, evidence documentation, and manual accessibility review apply. |

## Gate decisions

| Gate | Decision and evidence |
| --- | --- |
| Advanced and adversarial testing | Applied boundary and malformed-range checks to the pure model, including non-integer bounds, invalid array lengths, singleton ranges, and upper-edge custom ranges. Fuzzing and mutation testing were not added because there is no parser, external input boundary, or complex state machine that justifies them. |
| Firmware quality | Partially applied as a source and boundary review. Firmware remains legacy, transmitter-capable, unbuilt, and mismatched with the current carrier pin map. Memory, timing, ISR, power, watchdog, OTA, and hardware-in-loop claims remain unverified. |
| Software supply chain | Applied through lockfile installation, npm audit, an explicit `esbuild` install-script allowlist, monthly Dependabot updates, read-only workflow permissions, current GitHub Actions majors, and a pinned Ubuntu 24.04 runner. Actions are not pinned to full commit SHAs. |
| Performance and observability | Evaluated and not expanded. The browser model updates at most 126 channel counters and has no backend or persistent service. No benchmark, profiling result, or telemetry system is claimed. |
| Public contract and versioning | Applied in [compatibility and contracts](compatibility-and-contracts.md). The app has no published API or package contract; its internal model behavior is covered by tests. |
| Accessibility | Applied to semantic controls, live state, keyboard focus, chart regions and legends, and an expandable table of all 126 channel rows. Token contrast was computed for the dark palette. This is a manual review, not a WCAG conformance audit. |
| Documentation as code | Applied with `npm run verify`, which checks local Markdown targets and em dash punctuation, audits dependencies, tests the model, and builds the app. The checker does not fetch external links or validate heading fragments. |
| Generated artifact provenance | Evaluated. No plots, video, Gerbers, or generated dataset were added in this work. The KiCad source README records CLI version and CAD check results. Manufacturing outputs are absent. |
| Hardware references | Applied in [hardware references](hardware-references.md), with source provenance in [research sources](research-sources.md). Chip data is not substituted for missing breakout-module specifications. |
| FMEA-lite and assumptions | Applied below. The analysis is qualitative and does not assign unsupported numeric risk scores. |
| AI change audit | Covered by this evidence file and [repository audit](REPOSITORY_AUDIT.md). A second change-audit document was not added to avoid duplicating the same evidence. |
| Compatibility | Applied in [compatibility and contracts](compatibility-and-contracts.md). Unsupported operating systems, browsers, module variants, and firmware versions remain labeled untested. |
| Visual reasoning | The README Mermaid map and current-system HTML diagram remain. Diagram Design was used earlier and its structural self-check passed. Anatomy was evaluated but no 3D assembly figure was added because the board is unbuilt and the radio module dimensions are unknown. ManimGX was skipped because there is no measured time series and the browser already shows model steps interactively. |

## Evidence ledger

| ID | Claim | Repository evidence and change | Validation and result | Confidence and limit |
| --- | --- | --- | --- | --- |
| E-01 | The pure model accepts only integer channel bounds in RF_CH 0-125 and sequential hopping enters its selected range. | `web/src/domain/rfModel.mjs`; boundary tests in `web/tests/rfModel.test.mjs`. | Eight Node tests pass locally and in CI for commit `f53b40e`. Tests cover out-of-range, fractional, NaN, malformed, singleton, upper-edge, sequential, fixed-offset, and seeded-random cases. | Verified for the pure model. Does not establish physical radio behavior. |
| E-02 | Repository text follows the no-em-dash rule and checked local Markdown paths exist. | `tools/verify-docs.mjs`; `web/.npmrc`, source, docs, and configuration are scanned. | `npm run verify` passed locally and in CI for `f53b40e`. The checker reports its file counts on each run. | Verified for scanned text files and local file paths. It does not check external URL availability, Markdown anchors, or prose correctness. |
| E-03 | The web package has a reproducible clean-install verification path. | `web/package-lock.json`, `web/.npmrc`, `tools/verify-project.mjs`, package scripts, and `.github/workflows/verify-web.yml`. | Clean `npm ci --no-audit --no-fund` passed locally. `npm run verify` reported 0 npm advisories, 8 passing tests, and a passing TypeScript/Vite build. GitHub Actions run [41468904542](https://github.com/VIGIL-IoT/Aether/actions/runs/41468904542) passed for `f53b40e`. | Build verified for the recorded runtime and dependency state. Audit is time and threshold specific. |
| E-04 | The channel history has a non-visual text alternative and its rapidly changing summary is not a live region. | `web/src/components/OccupancyMap.tsx`; run state and chart semantics in `web/src/components/SpectrumView.tsx`; focus and table styles in `web/src/index.css`. | Local desktop browser inspection confirmed an expandable HTML table with 126 channel rows and column/row headers. The minimum computed text-token contrast across the three app surfaces is 5.16:1. | Partially verified. No automated browser, screen-reader, zoom, mobile, or full WCAG evaluation was run. |
| E-05 | Carrier R1 passes the recorded KiCad electrical and layout rules. | `hardware/kicad/aether-carrier-r1/README.md` and the tracked KiCad project. | The README records KiCad CLI 10.0.7 with 0 ERC, DRC, unconnected-item, and schematic-parity findings. | CAD checks recorded. No physical fit, electrical margin, RF, thermal, or regulatory verification. The CAD commands were not rerun for this documentation-only workstream. |
| E-06 | The intended DevKitC power route and nRF24 chip-level supply range have authoritative context. | `docs/hardware-references.md`; R1 carrier README and BOM. | Official Espressif and Nordic documents are indexed in `docs/research-sources.md`. | Research supported. Exact DevKit clone and radio breakout MPNs are missing; no module current budget is verified. |
| E-07 | Vercel uses the intended `web/` package build configuration. | Root and `web/` Vercel configuration plus the GitHub workflow. | Local and CI package builds pass. | Partially verified. The Vercel dashboard configuration and served commit SHA were not available for confirmation. |
| E-08 | Firmware operates safely with Carrier R1. | Legacy `.ino` files and `firmware/README.md`. | No build, pin reconciliation, hardware test, or RF test was performed. | Untested. Do not present firmware as supported or validated. |

## Assumption register

| ID | Assumption | Basis | Impact if false | Validation status | Related component |
| --- | --- | --- | --- | --- | --- |
| A-01 | The mating ESP32 board matches the nominal ESP32-DevKitC V4 outline and header geometry. | The custom J1 footprint uses a 2x19 socket at 2.54 mm pitch and 25.4 mm row spacing. Espressif's V4 drawing gives reference geometry. | The board may not fit, align, or clear the USB connector. | Unverified for any exact purchased board or clone. | Carrier J1 |
| A-02 | Each radio breakout uses the assumed standard 2x4, 2.54 mm pin map and orientation. | The carrier footprint and README use a common nRF24 breakout header. | Reversed power or misrouted signals could damage a module or carrier. | Unverified. The BOM has no breakout MPN or drawing. | Carrier J2 and J3 |
| A-03 | The DevKitC 3V3 output can support both selected radio modules. | The design routes the DevKitC 3V3 output to both sockets. Chip-level current figures exist, but no module identity or regulator budget is recorded. | Brownout, unstable operation, or component stress. | Untested. Exact module selection and current measurement are required. | Carrier power path |
| A-04 | The carrier is powered through the DevKit USB connector, with no simultaneous external injection onto its 3V3 rail. | Carrier design notes and Espressif power-input guidance. | Competing sources could backfeed or damage the board. | Documented design constraint, not physically tested. | Carrier power path |
| A-05 | `2400 + RF_CH` is the desired teaching-model mapping. | Implemented in `channelFrequencyMHz()` and tested at channel endpoints. | Users could mistake a model frequency for a measured or complete RF representation. | Verified as application behavior; not a measurement or full channel-width model. | Browser simulator |
| A-06 | The legacy firmware and the current carrier are not a validated combined system. | Firmware docs state that sketches are legacy; carrier pin assignments differ. | Assuming compatibility could produce incorrect wiring or radio behavior. | Explicitly treated as unsupported until reviewed and tested. | Firmware and carrier |
| A-07 | The live Vercel project uses the checked-in `web/` root configuration. | Repository configuration and CI package path. | A different dashboard root or command could still fail deployment. | Unknown. The deployed revision and dashboard setting are not visible. | Vercel deployment |
| A-08 | The browser interface is used as a deterministic teaching model, not as a physical spectrum measurement. | UI labels and project scope statements. | Model outputs could be misreported as observed RF data. | Explicitly labeled in the app and documentation. | UI and research claims |

## FMEA-lite

Risk labels are qualitative review notes, not a standards-based FMEA score.

| Failure mode | Likely cause | Effect | Detection | Mitigation and recovery | Residual risk |
| --- | --- | --- | --- | --- | --- |
| Incorrect radio module orientation or pinout | Generic breakout assumed to follow the common header | Miswiring, no operation, or hardware damage | Verify exact module drawing, pin 1, and continuity before power | Add exact MPN and assembly photo/drawing before build; keep current BOM marked not procurement-ready | High until exact parts are selected and fit checked |
| Excess current draw on DevKit 3V3 | Breakout includes PA/LNA or a regulator with higher input demand | Brownout, unstable radio behavior, regulator overload | Inspect module, then measure rail voltage/current under reviewed bench conditions | Select known modules and confirm the DevKit output budget before powering both | High until module current is measured |
| Conflicting power inputs | External 3V3 is applied while USB powers the DevKit | Backfeed or board damage | Inspect wiring and measure power path before applying power | Use the documented USB route only; never inject a second source into the 3V3 rail | Medium; no physical interlock exists |
| ESP32 clone does not match J1 footprint | Clone board outline, header spacing, USB position, or height differs | Board interference or non-fit | Measure exact board and check enclosure clearance | Lock a specific board MPN and perform a mechanical fit check before fabrication | High until selected board is physically checked |
| Legacy firmware transmits or uses mismatched pins | Old sketch is mistaken for supported R1 firmware | Unintended radio behavior or unsafe wiring assumptions | Compare source against current pin map and review provenance before any use | Keep firmware marked legacy and unvalidated; do not claim compatibility | High until code provenance, safety, and hardware review are complete |
| Model range contains malformed bounds | Fractional, non-finite, reversed, or wrong-length range state | Invalid channel indexing or an out-of-range model state | Boundary and negative tests in `rfModel.test.mjs` | `stepModel()` rejects invalid ranges before indexing; update tests with range changes | Low for the current pure-model entry path |
| Simulated chart is interpreted as measured RF data | Reader overlooks model boundary labels | Incorrect conclusions about occupancy, interference, or signal strength | Review UI labels and the table caption | State that results are simulated and do not represent RF energy; offer a tabular alternative | Low for informed readers; user interpretation cannot be guaranteed |
| Dependency advisory appears after this review | New vulnerability disclosure or lockfile update | Exposed package risk or failed build | npm audit in CI and Dependabot proposals | Review update and rerun `npm run verify` | Medium between update cycles; audit is point-in-time |

See [research sources](research-sources.md), [hardware references](hardware-references.md), [compatibility and contracts](compatibility-and-contracts.md), and the [repository audit](REPOSITORY_AUDIT.md) for linked records and remaining limits.
