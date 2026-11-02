# Compatibility and contracts

This matrix records declared targets separately from environments actually checked. A working build does not establish hardware compatibility or identify the revision currently deployed by Vercel.

## Compatibility matrix

| Platform or component | Declared or observed version | Status | Evidence | Limits |
| --- | --- | --- | --- | --- |
| Node.js runtime | 24.x; local test used v24.19.0 | CI verified | `web/package.json` and `.nvmrc`; GitHub Actions run [41471280856](https://github.com/VIGIL-IoT/Aether/actions/runs/41471280856) passed after clean install, audit, tests, and build. | Other Node major versions are unsupported by the declared engine and have not been checked. |
| npm CLI | Local npm 11.17.0; lockfile version 3 | Locally verified | Clean `npm ci --no-audit --no-fund` and `npm run verify` passed on Windows. | The exact npm version on the GitHub-hosted runner is not pinned. |
| Windows | Windows development environment; npm log reports build 10.0.26300 | Locally verified | Clean install, dependency audit, eight Node tests, TypeScript check, Vite build, and local browser inspection completed. | Does not imply compatibility with every Windows release. |
| Ubuntu | GitHub-hosted `ubuntu-24.04` runner | CI verified | Run 41471280856 completed successfully for commit `28d0b50`. | Other Linux distributions and architectures are untested. |
| macOS | No version declared | Untested | No local or CI run recorded. | Do not claim support. |
| Browser | Desktop in-app browser used for local UI inspection; engine version not recorded | Partially verified | The app rendered, the accessibility tree exposed the controls and an expanded history table with 126 rows and headers. | No cross-browser matrix, screen-reader test, automated browser suite, mobile viewport review, or zoom review. |
| Vercel | Static build from `web/` configured | Partially verified | Repository Vercel config and local/CI production build pass. | Dashboard root settings and deployed commit SHA are unavailable; current deployed revision is unknown. |
| KiCad carrier | Project says KiCad 10 or later; recorded CLI was 10.0.7 | CAD checks recorded | Carrier README records 0 ERC, DRC, unconnected-item, and schematic-parity findings. | Other KiCad versions were not checked. CAD results do not establish fit, assembly, electrical performance, RF behavior, or manufacturing readiness. |
| ESP32 DevKitC mating board | Reference family ESP32-DevKitC V4 | Expected, physical fit untested | Carrier footprint assumptions match Espressif's V4 dimensions drawing. | Exact MPN is absent; clones can differ. No assembled fit check exists. |
| nRF24 radio modules | Generic nRF24L01+ 2x4 breakout assumption | Untested | Carrier schematic and BOM use a conventional 2x4 header. | No module MPN, drawing, regulator/PA details, or measured current is recorded. |
| Legacy firmware | ESP32 Arduino sketches, core/toolchain version unspecified | Untested | Source files and firmware status notes are present. | Pin mapping differs from Carrier R1. No build or hardware run is claimed. |

## User-visible and software contracts

### Browser application

The app's user-visible purpose is to demonstrate channel selection for two model radios. It displays model channel positions, simulated elapsed time, and visit counts. It explicitly states that it does not transmit or measure RF. Sequential, seeded-random, fixed-offset, hop interval, start, pause, and reset behavior are covered by implementation and tests. These semantics are an application behavior contract for this repository, not a public network API.

### Internal model module

`web/src/domain/rfModel.mjs` exports `CHANNEL_COUNT`, `INITIAL_SEED`, `FIXED_CHANNEL_OFFSET`, `channelFrequencyMHz()`, `createInitialModel()`, and `stepModel()`. The module is internal to a private web package. No independent package publication, external API stability promise, or semantic versioning policy is declared.

The tested model contract maps integer RF_CH 0 through 125 to `2400 + RF_CH` MHz, rejects malformed configured ranges, keeps generated selections within the configured range, and records selections in model counters. This describes the model only. It does not model channel width, packet delivery, RF energy, interference, or radio timing.

### Hardware and firmware interfaces

The J1 ESP32 socket and J2/J3 radio sockets are design interfaces in an unbuilt proposal. Their pin maps are documented in `docs/pinout.md` and the KiCad project. They are not a released or physically fit-checked hardware contract. The generic radio module assumption and missing mating-part MPNs prevent a compatibility guarantee.

No verified firmware-to-host protocol, firmware-to-carrier compatibility, database schema, saved state format, or network contract exists. The repository does not provide a migration path for these interfaces because no released external interface or versioned data format is present.

## Versioning and change policy

`web/package.json` has version `1.0.0` but marks the package private. No release tags or external API compatibility promise are used as evidence. Keep model behavior covered by tests and update this document if a public API, persistent format, firmware protocol, or manufacturing-supported board revision is introduced. Record a migration plan before changing any such interface after release.

See [project scope](project-scope.md), [requirements traceability](traceability.md), and [engineering evidence](engineering-evidence.md) for the implementation boundary and status.
