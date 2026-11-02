# Repository audit

**Audit date:** 2026-11-02

**Repository:** `VIGIL-IoT/Aether`

**Baseline:** `505cee1` (`Redesign RF simulator around a deterministic channel model`)

**Audit scope:** repository source, web package, CI and Vercel configuration, documentation, experiment folders, KiCad carrier project, and available Git history. No physical hardware or deployment account was available for verification.

## Repository Overview

Aether is a learning-oriented repository containing a browser-based deterministic RF_CH channel-selection model, a proposed KiCad carrier for an ESP32 DevKitC V4 and two nRF24 breakouts, legacy firmware, and unexecuted experiment proposals. The browser simulator does not transmit or measure RF. The carrier has not been built or fit-checked. The firmware is not validated against that carrier.

The project is best described as a software and hardware proposal, not a validated research testbed. No paper, measured dataset, release tag, or completed user study is present in the audited repository history.

## Initial Condition

The baseline `505cee1` already contained the redesigned deterministic browser model, a small pure-model test suite, and the Taste-aligned Aether simulator UI; its design direction is recorded in `docs/web-ui-design.md`. The user supplied a Vercel build log for this revision; its configured command attempted `cd web` from a project root where that directory was absent. At the baseline, there was no checked-in npm lockfile or CI build-and-audit workflow. Documentation did not yet provide the current requirements traceability, evidence boundaries, complete setup and validation record, or repository-wide maturity assessment.

The baseline is used for the initial score because it is the revision associated with the supplied deployment failure. Scores are an explicit comparative engineering judgment against the dimensions and weights in this report, not a certification or an external benchmark.

## Major Problems Found

- The Vercel install/build command did not match the configured project root.
- Dependency resolution was not reproducible because the web package had no lockfile, and the declared runtime differed from the CI runtime.
- No CI job enforced a clean install, tests, or production build; no automated dependency audit ran.
- Documentation mixed implemented software, unbuilt hardware, legacy firmware, and proposed experiments without a centralized evidence map.
- The browser's timer and model output could be mistaken for real-time or physical RF observations without strong boundary language.
- Hardware fit, firmware compatibility, and empirical performance were not demonstrated.
- There was no repository-level audit score, dependency-management guide, explicit methodology, or decision record.

## Architecture Findings

The web data path is controls → in-memory store → pure deterministic model → subscribed React views. A browser interval requests model steps while the simulation is running. The model maps RF_CH 0–125 to `2400 + RF_CH` MHz, tracks visit counts, and increments simulated elapsed time by the configured interval.

The KiCad carrier and legacy firmware are separate repository artifacts. No runtime path connects them to the browser. CI verifies the web package only. Static hosting and a passing build do not establish the exact deployed revision, device behavior, mechanical fit, RF behavior, or regulatory status.

## Improvements Implemented

- Corrected root and web-level Vercel build configuration for the `web/` package.
- Added the proposed USB-powered, dual-radio carrier R1 with schematic, two-layer PCB, BOM, and explicit unbuilt/fit-check status.
- Added requirements and project-scope documentation, architecture and limitations, setup instructions, safety and firmware boundaries, traceability, roadmap, and evidence-focused validation records.
- Added Node 24 CI for clean lockfile installation, dependency audit, model tests, and production build.
- Added an npm lockfile, aligned the Node runtime declarations, and updated vulnerable Vite/esbuild dependency resolution to a version with a clean audit result on the audit date.
- Retained the existing Taste-aligned simulator design and added a current-system architecture diagram that distinguishes the browser runtime from separate hardware and firmware artifacts.
- Added implementation methodology, repository-level research-gap statement, dependency/SBOM instructions, and a retrospective architecture ADR.
- Added this comparative audit and maturity assessment.

## Files Added

- `.github/workflows/verify-web.yml`, `assets/legacy/README.md`
- `docs/REPOSITORY_AUDIT.md`, `docs/architecture/aether-current-system.html`, `docs/limitations.md`, `docs/project-scope.md`, `docs/sdg-alignment.md`, `docs/traceability.md`
- `docs/methodology.md`, `docs/research-gap.md`, `docs/dependency-management.md`, `docs/decisions/ADR-001-browser-model-boundary.md`
- `firmware/README.md`
- `hardware/kicad/aether-carrier-r1/` schematic, board, project settings, custom footprints, BOM, and README
- `web/package-lock.json`, `web/vercel.json`

## Files Modified

- Root: `.nvmrc`, `CONTRIBUTING.md`, `README.md`, `SECURITY.md`, `vercel.json`
- Web: `web/package.json`, `web/README.md`
- Docs: `docs/architecture.md`, `docs/assembly-guide.md`, `docs/build-variants.md`, `docs/cost-analysis.md`, `docs/design-journal.md`, `docs/index.md`, `docs/legal-and-safety.md`, `docs/lessons-learned.md`, `docs/pinout.md`, `docs/power-budget.md`, `docs/protocol-specification.md`, `docs/rf-notes.md`, `docs/roadmap.md`, `docs/setup-guide.md`, `docs/testing-methodology.md`
- Experiments: `experiments/README.md` and the README files for `exp01` through `exp04`
- Firmware: `firmware/CHANGES.md`
- Hardware/tools: `hardware/BOM.md`, `hardware/components.md`, `hardware/enclosure/README.md`, `hardware/pcb/README.md`, `hardware/schematics/README.md`, `tools/README.md`

Git also relocates the previous cover image, rough layout drawing, block diagram, and slide deck into `assets/legacy/` to label them as historical materials.

The file groups above summarize changes from the baseline and are not an exhaustive line-by-line manifest. `git log 505cee1..HEAD --stat` provides the revision-level record.

## Testing Performed

- Ran the five Node built-in model tests on Node.js v24.19.0.
- Performed a clean npm lockfile install, dependency audit, and TypeScript/Vite production build locally.
- Confirmed GitHub Actions Node 24 workflow completion for commit `932c89a`.
- Parsed the package and deployment JSON configuration, checked patch whitespace, and validated the dependency SBOM command output.
- Reviewed the architecture diagram source and ran the Diagram Design self-check script. A high-confidence token/key pattern scan of the working tree found no hits; `gitleaks` is not installed, and Git history was not scanned by a dedicated secret scanner.
- Recorded the carrier README's KiCad CLI 10.0.7 ERC/DRC and schematic-parity results; these results are CAD checks, not a physical validation.

## Test Results

| Check | Result | Evidence and limit |
| --- | --- | --- |
| Node model tests | 5 passed, 0 failed | Local Node.js v24.19.0; pure model only |
| Production build | Passed | Local `npm run build`; TypeScript and Vite static build |
| Dependency audit | 0 findings at moderate severity or higher | `npm audit --audit-level=moderate` on 2026-11-02; point-in-time result |
| CI | Passed | [Run 41424242681](https://github.com/VIGIL-IoT/Aether/actions/runs/41424242681), commit `932c89a`, Node.js 24 |
| SBOM generation | Passed | CycloneDX 1.5; 122 components in web npm lockfile output |
| KiCad CAD checks | 0 recorded ERC, DRC, unconnected-item, and schematic-parity findings | KiCad CLI 10.0.7 results recorded in carrier README; no fit or electrical test |
| Vercel deployed revision | Unknown | The public endpoint does not identify its source commit; no deployment-account evidence was available |
| Browser UI automation | Not run | No browser automation suite is configured |

## Security Findings

The static web app has no backend, account system, or project database. CI checks the locked web dependency tree for known advisories at moderate severity or higher. No advisory was reported on 2026-11-02. This is a dated package advisory check, not a penetration test or full threat assessment. A high-confidence token/key pattern scan found no working-tree hits. `gitleaks` is unavailable, and no dedicated scan of Git history was run.

Some legacy firmware contains transmitter-capable routines. Its provenance, license compatibility, hardware mapping, and deployment safety are not fully reviewed. The KiCad proposal is unbuilt. No security or regulatory certification is claimed.

## Dependency Findings

The web package now has a committed npm lockfile and uses Node.js 24 consistently in `.nvmrc`, package metadata, and CI. The baseline had no lockfile and used an older toolchain with npm advisory findings. Current date-specific audit status and SBOM generation instructions are in [dependency management](dependency-management.md).

The SBOM covers only the web npm dependency graph. No automated SBOM retention or firmware/hardware inventory is configured.

## Documentation Improvements

The README now summarizes scope, architecture, installation, hardware status, and evidence boundaries. The docs hub links setup, methodology, requirements, traceability, limitations, safety, and validation. The architecture overview uses Mermaid for a maintainable runtime map; a separate HTML diagram explains the current system boundary. Documentation distinguishes simulation, CAD checks, proposals, and physical results.

The UI design record documents the taste-driven simulator direction. The original Vercel failure and later build status are recorded without claiming an unverified deployment revision.

The maintained Mermaid architecture map in the README was retained because it is concise and editable. The HTML current-system diagram was added for an integrated, branded view of the browser/hardware boundary. The Anatomy isometric illustration was skipped because it would repeat the app's spectrum/history visuals and could suggest a physical runtime connection that does not exist. ManimGX animation was skipped because the app already demonstrates temporal channel changes interactively and there is no empirical time-series to animate.

The available Diagram Design skill was used for `docs/architecture/aether-current-system.html`, an architecture and boundary diagram based on the model, store, timer, React components, and carrier/firmware documentation. `docs/architecture.md` links to it. The skill's structural self-check passed. The HTML was not exported to PNG or visually checked in a browser because local `file://` access was blocked by policy. The README Mermaid flowchart was reviewed as source but not rendered by a separate Mermaid renderer. No existing hardware drawing was replaced.

## Research Improvements

The repository now identifies a concrete evidence gap: no measured RF path, validated hardware, firmware reconciliation, browser UI automation, or learning-outcome study. The research-gap document explicitly avoids claiming a field-wide novelty gap because no systematic literature review was performed. Methodology, requirements, traceability, and experiment evidence requirements are documented. No research result, benchmark, paper, or dataset was created because the necessary observations are absent.

## Reproducibility Improvements

The lockfile, Node 24 runtime declaration, `npm ci` CI workflow, deterministic seeded model, Node test runner, build command, audit command, and on-demand CycloneDX SBOM command give contributors a repeatable web verification path. Physical replication is not possible from current evidence: the carrier is unbuilt, exact mating parts are unverified, and no experiment log or raw data is present.

## Traceability Status

Software requirements R-01 through R-04 map to pure-model tests. UI behavior R-05 has source and copy review but no browser automation. Carrier CAD requirement R-06 has recorded ERC/DRC/parity results; physical fit R-07 is untested. Build requirement R-08 is verified in CI for the configured package but remains partially verified for Vercel because the deployed commit is unknown. R-09 firmware operation and R-10 experimental repeatability are untested/planned. R-11 clean install/runtime and R-12 dependency audit are verified for the web package on the recorded date. Full details are in the [traceability matrix](traceability.md).

## Remaining Limitations

- Vercel deployment revision after the configuration fix is not confirmed.
- There are no UI automation or accessibility test results.
- Carrier R1 has not been fabricated, assembled, or checked against exact parts; no manufacturing release is claimed.
- Firmware provenance, licensing, pin mapping, and hardware operation remain unresolved.
- No physical RF measurements, performance study, user study, or raw data exist.
- The web package has no configured static linting or coverage reporting.
- Dependency audit results can change; firmware and hardware dependencies are outside npm's SBOM.
- The architecture HTML passed a structural self-check, but browser screenshot inspection was blocked by local `file://` access policy. Do not treat it as visually screenshot-verified.

## Initial Maturity Score

Scores use the prompt's weights on a 0–10 scale. The initial score evaluates baseline `505cee1`, before the improvements listed above. Scores reflect available evidence, not anticipated quality.

| Dimension | Weight | Score | Evidence at baseline | Remaining gap at baseline |
| --- | ---: | ---: | --- | --- |
| Architecture & Modularity | 15% | 5 | Browser model had been separated into a deterministic module | Runtime deployment root was misconfigured; hardware and firmware boundaries were not documented centrally |
| Documentation | 15% | 4 | README and web design record existed | Setup, scope, limitations, traceability, evidence rules, and project-wide map were incomplete |
| Code Quality | 15% | 5 | React/TypeScript app and pure model were present | Tooling and package metadata needed cleanup; no lockfile or static lint setup |
| Testing | 15% | 3 | Five pure-model tests existed | No CI enforcement, clean-install build evidence, UI automation, or hardware tests |
| Security | 10% | 3 | No web backend or account boundary | Dependency advisories not systematically checked; legacy firmware provenance and safety unresolved |
| Reproducibility | 10% | 2 | Deterministic seeded model supported repeatable model output | No lockfile, Node versions differed, deployment command failed |
| Open Source Governance | 10% | 4 | License files and basic contribution material existed | Security/reporting, evidence expectations, and release status needed clarity; no tags |
| Research Rigor & Traceability | 10% | 1 | Experiment folders existed | No executed protocol, data, method record, traceability matrix, or literature-backed gap |
| **Weighted total** | **100%** | **3.6 / 10** |  |  |

## Final Maturity Score

| Dimension | Weight | Score | Evidence after improvements | Remaining gap |
| --- | ---: | ---: | --- | --- |
| Architecture & Modularity | 15% | 8 | Pure model, store/UI boundary, system diagram, and disconnected hardware/firmware boundary documented | No browser-to-device integration or validated end-to-end system |
| Documentation | 15% | 8 | Scope, setup, methodology, safety, limitations, traceability, audit, and contribution paths documented | Documentation does not replace measurements, literature review, or physical validation |
| Code Quality | 15% | 7 | Typed UI, small pure model, lockfile, and clean production build | No lint configuration, coverage gate, or UI-level test suite |
| Testing | 15% | 7 | Five model tests, Node 24 CI, dependency audit, and production build | UI, accessibility, deployment revision, and hardware remain untested |
| Security | 10% | 6 | Static web boundary documented and current npm audit clean at the recorded threshold | No full threat review, dedicated secret scan, firmware audit, or deployment review |
| Reproducibility | 10% | 7 | Node pin, lockfile, clean install, CI, deterministic seed, build, audit, and SBOM generation | No physical experiment replication package; SBOM not retained automatically |
| Open Source Governance | 10% | 6 | Contribution and security policy, licensing caveats, CI status, and evidence rules | No tagged release or documented maintainer response targets; firmware provenance unclear |
| Research Rigor & Traceability | 10% | 5 | Requirements mapping, methodology, research-gap statement, validation limits, experiment status | No literature review, study, physical data, paper, or results |
| **Weighted total** | **100%** | **6.9 / 10** |  |  |

Calculation: initial `(5×.15)+(4×.15)+(5×.15)+(3×.15)+(3×.10)+(2×.10)+(4×.10)+(1×.10)=3.55`, rounded to 3.6. Final `(8×.15)+(8×.15)+(7×.15)+(7×.15)+(6×.10)+(7×.10)+(6×.10)+(5×.10)=6.9`. All categories apply, so no weights were redistributed.

## Recommended Next Actions

1. Confirm a successful Vercel deployment and record its commit SHA.
2. Add maintained browser-level checks for the rendered simulator and accessibility basics.
3. Review the legacy firmware's origin, license, pin map, and safety before presenting it as supported.
4. Verify the exact carrier mating parts and mechanical fit before generating manufacturing outputs.
5. Decide whether to perform a related-work review and define a bounded research question before making novelty or education claims.
6. Run a reviewed physical validation protocol only after firmware, hardware, safety, and instrumentation prerequisites are met.
