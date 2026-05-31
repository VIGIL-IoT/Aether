# Contributing to Aether

We appreciate your interest in improving Aether. This document outlines our development process, coding standards, and contribution guidelines.

---

## Licensing

Aether uses dual licensing:

- **Firmware** (`firmware/` directory): GPL v3 or later. All firmware contributions must be compatible with GPL v3 as the firmware is derived from [Ble-jammer](https://github.com/smoochiee/Ble-jammer) by smoochiee.
- **Hardware** (`hardware/` directory): CERN-OHL-S v2
- **Documentation** (`docs/`, `experiments/`): CERN-OHL-S v2

By contributing, you agree to license your contributions under the same terms as the directory you're contributing to.

---

## Commit Style

We follow **Conventional Commits** for clear, structured commit history:

- `feat:` - New feature or capability
- `fix:` - Bug fix or correction
- `docs:` - Documentation changes only
- `hw:` - Hardware design changes (schematics, PCB, BOM)
- `rf:` - RF-specific changes (channel maps, power levels, protocol logic)
- `refactor:` - Code restructuring without behavior change
- `test:` - Adding or modifying tests
- `chore:` - Build system, dependencies, tooling

**Examples:**
```
feat: add channel sweep with RSSI logging
fix: correct NRF24 CE pin timing in nrf_tx()
hw: increase decoupling capacitor to 100µF
docs: clarify FHSS explanation in rf-notes.md
rf: extend channel range to 2.525 GHz
```

---

## Branch Naming

Use descriptive prefixes for branch names:

- `feature/` - New functionality
- `fix/` - Bug fixes
- `hw/` - Hardware revisions
- `docs/` - Documentation improvements

**Examples:**
```
feature/add-bluetooth-scanning
fix/spi-bus-contention
hw/pcb-v2-layout
docs/setup-guide-windows
```

---

## Pull Request Checklist

Before submitting a PR, ensure:

- [ ] Code compiles without errors or warnings
- [ ] Firmware changes tested on physical hardware (if applicable)
- [ ] Documentation updated to reflect changes
- [ ] Commit messages follow Conventional Commits format
- [ ] No scope creep - PR addresses one logical change
- [ ] Hardware changes include PDF schematic export
- [ ] KiCad design rule check passes (for PCB changes)

---

## Code Style

### Firmware (C++)

- **Indentation:** 2 spaces (no tabs)
- **Variable names:** Descriptive, snake_case
- **Constants:** UPPER_SNAKE_CASE
- **Functions:** snake_case
- **Comments:** Include units where applicable (e.g., `uint8_t channel_mhz`, `delay_us`)
- **Line length:** 100 characters maximum

**Example:**
```cpp
const uint8_t NRF24_MAX_CHANNEL = 125;  // 2.525 GHz upper limit

void nrf_set_channel(uint8_t channel_mhz) {
  if (channel_mhz > NRF24_MAX_CHANNEL) {
    channel_mhz = NRF24_MAX_CHANNEL;  // Clamp to valid range
  }
  // Write to RF_CH register (0x05)
  nrf_write_register(0x05, channel_mhz);
}
```

### Documentation (Markdown)

Every file in `docs/` must include:

1. **Summary** - One-paragraph overview of the document's purpose
2. **Prerequisites** - Required knowledge or setup before reading
3. **See Also** - Links to related documentation

Use code blocks with language tags:
```cpp
// Good
void setup() { }
```

Avoid:
```
void setup() { }
```

---

## Hardware Contributions

### Schematics and PCB

- **Tool:** KiCad 6.0 or later preferred
- **Export:** Include PDF schematic export in `hardware/schematics/`
- **Design rules:** Run DRC before committing
- **Layer stackup:** Document any changes to layer configuration
- **BOM:** Update component table in README if parts change

### Enclosure

- **Format:** STEP or STL files
- **Documentation:** Include print settings (layer height, infill, material)
- **Dimensions:** Provide clearance notes for PCB mounting

---

## Documentation Standard

All documentation must be:

- **Technically accurate** - Verify register addresses, pin numbers, frequency ranges
- **Concise** - No filler or marketing language
- **Accessible** - Assume reader has basic embedded systems knowledge, but explain RF-specific concepts
- **Consistent** - Use terminology from the glossary in `docs/rf-notes.md`

---

## What We Don't Accept

- Features that imply or enable unlawful wireless interference
- Code that uses "jammer," "killer," or similar terminology
- Contributions that violate RF regulations in major jurisdictions (FCC, ETSI, ACMA)
- Scope creep - PRs that bundle unrelated changes
- Uncommented or obfuscated code
- Hardware changes without accompanying documentation

---

## Review Process

1. Submit PR with clear description of changes
2. Maintainers review for technical correctness and alignment with project goals
3. Address feedback or requested changes
4. Once approved, PR is merged to `main`

We aim to review PRs within 7 days. Complex hardware changes may take longer.

---

## Questions?

Open an issue for discussion before starting major work. We're happy to provide guidance on architecture, design decisions, or implementation approaches.
