# Contributing to Aether

Contributions should improve the implemented simulator, make the carrier proposal more reviewable, or improve the accuracy and reproducibility of project documentation.

## Before opening a change

- Keep simulated behavior distinct from physical measurements.
- Do not add unsupported performance, battery, hardware, or compliance claims.
- Do not add features intended to disrupt communications.
- Check whether the affected material is covered by LICENSE, LICENSE-HARDWARE, or a file-specific notice. Firmware provenance has not been fully audited; do not assume a licensing conclusion from source comments alone.

## Web changes

The web project is in web/. It uses React, TypeScript, and Vite. From that directory:

    npm ci
    npm test
    npm run build

Report the commands that passed. If dependencies could not be installed, state that rather than claiming the build passed.

## Hardware changes

For changes to carrier R1:

- Update the schematic, board, BOM, and project README together.
- Record the KiCad version and ERC/DRC results.
- State the exact mating-part assumptions.
- Do not claim physical fit, RF behavior, thermal performance, or compliance based only on CAD checks.
- Mark manufacturing outputs as proposals until the design has been reviewed and fit-checked.

## Documentation and experiments

Document only what repository evidence supports. Label theory, simulation, proposals, and measurements separately. Experiment results need the method, setup, revisions, raw data, analysis, and limitations. Do not publish participant-study plans without the required independent review.

## Pull requests

Keep changes focused, describe user-visible effects, link relevant evidence, and identify anything that remains unverified. Use commit messages that state the change plainly.
