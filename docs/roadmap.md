# Roadmap

This roadmap lists work that would improve the project's evidence and maintainability. It does not imply a release date or guarantee.

## Immediate

- [x] Make the browser simulator's model-only behavior explicit.
- [x] Add the unbuilt KiCad carrier proposal and record its CAD checks.
- [x] Replace unsupported battery, performance, and compliance claims with evidence-based status.
- [ ] Confirm a successful Vercel deployment from the web/ project root after the configuration fix.
- [ ] Add a reproducible dependency lockfile and automated web build checks.

## Short term

- [ ] Review firmware provenance, source headers, and licensing before describing the firmware as a supported project component.
- [ ] Reconcile or retire firmware pin maps that do not match carrier R1.
- [ ] Verify exact DevKit and radio breakout fit, update footprints if needed, and record the parts used.
- [ ] Review the carrier with the chosen component datasheets and produce manufacturing outputs only after fit review.
- [ ] Add UI-level tests if they can be maintained without making the simulator imply physical behavior.

## Medium term

- [ ] Build a carrier prototype after design review and document assembly and electrical checks.
- [ ] Develop a separately reviewed firmware scope appropriate for authorized, non-disruptive educational work.
- [ ] Define and review experiment protocols before collecting any physical data.
- [ ] Publish measured power or RF results only with raw data, equipment details, revisions, and analysis.

## Long term

- [ ] Evaluate educational outcomes before making impact claims.
- [ ] Consider additional simulation features only when their assumptions can be explained and validated.
