# Repository audit

**Audit date:** 2026-11-02

**Repository:** `VIGIL-IoT/Aether`

**Baseline:** `505cee1` (`Redesign RF simulator around a deterministic channel model`)

**Audit scope:** repository source, web package, CI and Vercel configuration, documentation, experiment folders, KiCad carrier project, and available Git history. No physical hardware or deployment account was available for verification.

## Repository Overview

Aether is a learning-oriented repository containing a browser-based deterministic RF_CH channel-selection model, a proposed KiCad carrier for an ESP32 DevKitC V4 and two nRF24 breakouts, legacy firmware, and unexecuted experiment proposals. The browser simulator does not transmit or measure RF. The carrier has not been built or fit-checked. The firmware is not validated against that carrier.

The project is best described as a software and hardware proposal, not a validated research testbed. No paper, measured dataset, release tag, or completed user study is present in the audited repository history.

## Latest Review Changes

The follow-up review is recorded through commit `28d0b50`, with GitHub Actions run [41471280856](https://github.com/VIGIL-IoT/Aether/actions/runs/41471280856) passing on Node.js 24 and Ubuntu 24.04. The most recent focused commits are:

- `0bc013d`: reject malformed channel ranges and correctly enter a custom range from an out-of-range channel.
- `b7161a4`: add a semantic table alternative for channel history and reduce unnecessary live announcements.
- `f53b40e`: add repository verification, dependency updates, and tighter CI defaults.
- `28d0b50`: add research source, hardware reference, compatibility, skill registry, assumptions, and FMEA-lite documentation.

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
- Hardened model range validation and added boundary tests for malformed values, singleton ranges, and upper-edge range entry.
- Added keyboard-focusable chart regions and an expandable 126-row semantic table alternative for channel history, with reduced live announcements.
- Added a repository-wide punctuation and local Markdown target checker, a single verification command, an explicit `esbuild` lifecycle-script allowlist, monthly Dependabot updates, and least-privilege CI permissions.
- Added primary-source hardware references, a skill and tool registry, compatibility and contract boundaries, engineering evidence, assumptions, and a qualitative FMEA-lite.

## Files Added

- `.github/workflows/verify-web.yml`, `assets/legacy/README.md`
- `docs/REPOSITORY_AUDIT.md`, `docs/architecture/aether-current-system.html`, `docs/limitations.md`, `docs/project-scope.md`, `docs/sdg-alignment.md`, `docs/traceability.md`
- `docs/methodology.md`, `docs/research-gap.md`, `docs/dependency-management.md`, `docs/decisions/ADR-001-browser-model-boundary.md`
- `docs/engineering-evidence.md`, `docs/hardware-references.md`, `docs/research-sources.md`, `docs/compatibility-and-contracts.md`, `docs/AI_SKILLS_REFERENCE.md`
- `firmware/README.md`
- `hardware/kicad/aether-carrier-r1/` schematic, board, project settings, custom footprints, BOM, and README
- `web/package-lock.json`, `web/vercel.json`

## Files Modified

- Root: `.nvmrc`, `CONTRIBUTING.md`, `README.md`, `SECURITY.md`, `vercel.json`
- Web: `web/package.json`, `web/README.md`, model, UI components, and styles
- Docs: `docs/architecture.md`, `docs/assembly-guide.md`, `docs/build-variants.md`, `docs/cost-analysis.md`, `docs/design-journal.md`, `docs/index.md`, `docs/legal-and-safety.md`, `docs/lessons-learned.md`, `docs/pinout.md`, `docs/power-budget.md`, `docs/protocol-specification.md`, `docs/rf-notes.md`, `docs/roadmap.md`, `docs/setup-guide.md`, `docs/testing-methodology.md`, `docs/traceability.md`, and additional project records
- CI and tooling: `.github/workflows/verify-web.yml`, `.github/dependabot.yml`, `tools/verify-docs.mjs`, `tools/verify-project.mjs`
- Experiments: `experiments/README.md` and the README files for `exp01` through `exp04`
- Firmware: `firmware/CHANGES.md`
- Hardware/tools: `hardware/BOM.md`, `hardware/components.md`, `hardware/enclosure/README.md`, `hardware/pcb/README.md`, `hardware/schematics/README.md`, `tools/README.md`

Git also relocates the previous cover image, rough layout drawing, block diagram, and slide deck into `assets/legacy/` to label them as historical materials.

The file groups above summarize changes from the baseline and are not an exhaustive line-by-line manifest. `git log 505cee1..HEAD --stat` provides the revision-level record.

## Testing Performed

- Ran eight Node built-in model tests on Node.js v24.19.0.
- Performed a clean npm lockfile install followed by `npm run verify` locally. It scanned 91 text files and 49 Markdown files, reported zero npm advisories, passed all eight tests, and built the production site.
- Confirmed GitHub Actions run [41471280856](https://github.com/VIGIL-IoT/Aether/actions/runs/41471280856) for commit `28d0b50` completed successfully on Node.js 24 and Ubuntu 24.04.
- Parsed the package and deployment JSON configuration, checked patch whitespace, and validated the dependency SBOM command output.
- Reviewed the architecture diagram source and ran the Diagram Design self-check script. A high-confidence token/key pattern scan of the working tree found no hits; `gitleaks` is not installed, and Git history was not scanned by a dedicated secret scanner.
- Inspected the simulator locally in a desktop browser for semantic controls, chart regions, visible focus styling, status-only live announcements, and the expanded history table. Calculated contrast for the checked app text tokens.
- Recorded the carrier README's KiCad CLI 10.0.7 ERC/DRC and schematic-parity results; these results are CAD checks, not a physical validation.

## Test Results

| Check | Result | Evidence and limit |
| --- | --- | --- |
| Node model tests | 8 passed, 0 failed | Local Node.js v24.19.0 and CI; pure model only |
| Production build | Passed | Local `npm run build`; TypeScript and Vite static build |
| Dependency audit | 0 findings at moderate severity or higher | `npm audit --ignore-scripts --audit-level=moderate` on 2026-11-02; point-in-time result |
| Documentation verification | Passed | 91 text files and 49 Markdown files scanned for the punctuation rule and local file targets; external URLs and heading fragments are not checked |
| CI | Passed | [Run 41471280856](https://github.com/VIGIL-IoT/Aether/actions/runs/41471280856), commit `28d0b50`, Node.js 24, Ubuntu 24.04 |
| Accessibility review | Partially verified | Manual desktop browser inspection and scoped token contrast calculation; no automated, screen-reader, mobile, zoom, or full WCAG review |
| SBOM generation | Passed | CycloneDX 1.5; 122 components in web npm lockfile output |
| KiCad CAD checks | 0 recorded ERC, DRC, unconnected-item, and schematic-parity findings | KiCad CLI 10.0.7 results recorded in carrier README; no fit or electrical test |
| Vercel deployed revision | Unknown | The public endpoint does not identify its source commit; no deployment-account evidence was available |
| Browser UI automation | Not run | No browser automation suite is configured |

## Security Findings

The static web app has no backend, account system, or project database. CI checks the locked web dependency tree for known advisories at moderate severity or higher. No advisory was reported on 2026-11-02. The workflow uses read-only repository permissions and `esbuild` is the only explicitly permitted npm lifecycle script. Monthly Dependabot updates are configured. These controls do not constitute a penetration test or full threat assessment. A high-confidence token/key pattern scan found no working-tree hits. `gitleaks` is unavailable, and no dedicated scan of Git history was run.

Some legacy firmware contains transmitter-capable routines. Its provenance, license compatibility, hardware mapping, and deployment safety are not fully reviewed. The KiCad proposal is unbuilt. No security or regulatory certification is claimed.

## Dependency Findings

The web package has a committed npm lockfile and uses Node.js 24 consistently in `.nvmrc`, package metadata, and CI. The baseline had no lockfile and used an older toolchain with npm advisory findings. `web/.npmrc` explicitly permits the required `esbuild` install script. Dependabot proposes monthly npm and GitHub Actions updates. Current date-specific audit status and SBOM generation instructions are in [dependency management](dependency-management.md).

The SBOM covers only the web npm dependency graph. No automated SBOM retention or firmware/hardware inventory is configured.

## Documentation Improvements

The README now summarizes scope, architecture, installation, hardware status, and evidence boundaries. The docs hub links setup, methodology, requirements, traceability, limitations, safety, validation, hardware sources, compatibility, and engineering evidence. The new records include a source ledger, hardware reference table, assumptions register, FMEA-lite, compatibility matrix, and specialist skill registry. The single verification command checks local Markdown targets and the no em dash rule. Documentation distinguishes simulation, CAD checks, proposals, and physical results.

The UI design record documents the taste-driven simulator direction. The original Vercel failure and later build status are recorded without claiming an unverified deployment revision.

The README Mermaid architecture map was added because it is concise and editable. The HTML current-system diagram was added for an integrated, branded view of the browser/hardware boundary. The earlier raster block diagram and rough layout were preserved under `assets/legacy/` as historical material. The Anatomy isometric illustration was skipped because it would repeat the app's spectrum/history visuals and could suggest a physical runtime connection that does not exist. ManimGX animation was skipped because the app already demonstrates temporal channel changes interactively and there is no empirical time-series to animate.

The available Diagram Design skill was used for `docs/architecture/aether-current-system.html`, an architecture and boundary diagram based on the model, store, timer, React components, and carrier/firmware documentation. `docs/architecture.md` links to it. The skill's structural self-check passed. The HTML was not exported to PNG or visually checked in a browser because local `file://` access was blocked by policy. The README Mermaid flowchart was reviewed as source but not rendered by a separate Mermaid renderer. No existing hardware drawing was replaced.

## Research Improvements

The repository now identifies a concrete evidence gap: no measured RF path, validated hardware, firmware reconciliation, automated browser checks, or learning-outcome study. Manufacturer references support nominal carrier geometry and chip-level radio limits while explicitly leaving exact mating modules unresolved. The research-gap document avoids claiming a field-wide novelty gap because no systematic literature review was performed. Methodology, requirements, traceability, assumptions, failure modes, source provenance, and experiment evidence requirements are documented. No research result, benchmark, paper, or dataset was created because the necessary observations are absent.

## Reproducibility Improvements

The lockfile, Node 24 runtime declaration, explicit npm install-script policy, `npm ci` CI workflow, deterministic seeded model, Node test runner, repository documentation checker, `npm run verify`, and on-demand CycloneDX SBOM command give contributors a repeatable web verification path. Physical replication is not possible from current evidence: the carrier is unbuilt, exact mating parts are unverified, and no experiment log or raw data is present.

## Traceability Status

Software requirements R-01 through R-04 map to pure-model tests. UI behavior R-05 has source and manual browser review but no automated browser suite. Carrier CAD requirement R-06 has recorded ERC/DRC/parity results; physical fit R-07 is untested. Build requirement R-08 is verified in CI for the configured package but remains partially verified for Vercel because the deployed commit is unknown. R-09 firmware operation and R-10 experimental repeatability are untested or planned. R-11 clean install/runtime, R-12 dependency audit, and R-13 documentation checks are verified for the web package on the recorded date. R-14 has a table alternative and scoped manual review, without a full accessibility conformance claim. Full details are in the [traceability matrix](traceability.md).

## Remaining Limitations

- Vercel deployment revision after the configuration fix is not confirmed.
- There are no automated UI or accessibility test results. Accessibility inspection was manual and scoped.
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
| Documentation | 15% | 9 | Scope, setup, methodology, safety, limitations, traceability, sources, compatibility, assumptions, FMEA-lite, audit, and contribution paths documented | Documentation does not replace measurements, literature review, or physical validation |
| Code Quality | 15% | 8 | Typed UI, small pure model, validated custom ranges, lockfile, accessible data alternative, and clean production build | No lint configuration, coverage gate, or automated UI test suite |
| Testing | 15% | 8 | Eight model tests, Node 24 CI, documentation checks, dependency audit, production build, and scoped browser review | No automated UI or accessibility suite, deployment revision confirmation, or hardware tests |
| Security | 10% | 7 | Static web boundary documented, lifecycle scripts allowlisted, workflow permissions read-only, monthly Dependabot, and current npm audit clean | No full threat review, dedicated history secret scan, firmware audit, or deployment review |
| Reproducibility | 10% | 8 | Node pin, lockfile, clean install, CI, deterministic seed, documentation checks, one verification command, audit, and SBOM generation | No physical experiment replication package; SBOM not retained automatically |
| Open Source Governance | 10% | 6 | Contribution and security policy, licensing caveats, CI status, and evidence rules | No tagged release or documented maintainer response targets; firmware provenance unclear |
| Research Rigor & Traceability | 10% | 6 | Requirements mapping, methods, research-gap statement, manufacturer sources, assumptions, failure modes, validation limits, and experiment status | No systematic literature review, study, physical data, paper, or results |
| **Weighted total** | **100%** | **7.7 / 10** |  |  |

Calculation: initial `(5×.15)+(4×.15)+(5×.15)+(3×.15)+(3×.10)+(2×.10)+(4×.10)+(1×.10)=3.55`, rounded to 3.6. Final `(8×.15)+(9×.15)+(8×.15)+(8×.15)+(7×.10)+(8×.10)+(6×.10)+(6×.10)=7.65`, rounded to 7.7. All categories apply, so no weights were redistributed.

## Recommended Next Actions

1. Confirm a successful Vercel deployment and record its commit SHA.
2. Add maintained browser-level checks for the rendered simulator and accessibility basics.
3. Review the legacy firmware's origin, license, pin map, and safety before presenting it as supported.
4. Verify the exact carrier mating parts and mechanical fit before generating manufacturing outputs.
5. Decide whether to perform a related-work review and define a bounded research question before making novelty or education claims.
6. Run a reviewed physical validation protocol only after firmware, hardware, safety, and instrumentation prerequisites are met.
