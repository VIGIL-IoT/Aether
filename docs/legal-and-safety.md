# Legal and Safety Considerations

## Purpose

This document outlines the legal, regulatory, and ethical considerations for operating Aether. RF experimentation carries legal obligations and potential for harm if misused. Read this document completely before powering on the device.

## Regulatory Framework

### United States: FCC Part 15

The 2.4 GHz ISM band (2.400-2.4835 GHz) is regulated under FCC Part 15.247 (Frequency Hopping Spread Spectrum) and 15.249 (unlicensed operation).

**Key Requirements:**
- Maximum conducted output power: +30 dBm (1 W)
- Maximum EIRP with directional antenna: +36 dBm (4 W)
- Frequency hopping systems must use ≥15 channels with <0.4s dwell time
- Intentional interference with licensed services is prohibited (47 CFR § 333)

**Aether Compliance Status:**
- NRF24L01+ maximum output: +0 dBm (1 mW) conducted
- PA+LNA modules: +20 dBm (100 mW) conducted
- Constant carrier mode violates hopping requirements → **laboratory use only**
- No FCC certification → **not for commercial sale or deployment**

### European Union: ETSI EN 300 328

Harmonized standard for 2.4 GHz wideband transmission systems.

**Key Requirements:**
- Maximum EIRP: +20 dBm (100 mW)
- Adaptive Frequency Agility (AFA) or Listen Before Talk (LBT) required
- Duty cycle limits for non-adaptive systems

**Aether Compliance Status:**
- Does not implement LBT or AFA
- Intended for research and education under controlled conditions
- Not CE marked → **not for sale or deployment in EU**

### Other Jurisdictions

- **Canada (ISED):** Similar to FCC Part 15, RSS-247 applies
- **Australia (ACMA):** 2.4 GHz ISM band regulated under radiocommunications class license
- **Japan (MIC):** ARIB STD-T66 for 2.4 GHz devices

**General Rule:** Check local spectrum authority regulations before operation. When in doubt, operate in a shielded enclosure or Faraday cage.

## Ethical Use Guidelines

### What Aether Is For

- **Education:** Learning RF fundamentals, protocol behavior, embedded systems
- **Research:** Studying interference patterns, channel coexistence, propagation
- **Experimentation:** Controlled tests in laboratory or authorized environments
- **Skill Development:** Hands-on experience with SPI, register-level programming, hardware debugging

### What Aether Is NOT For

- **Jamming:** Intentional disruption of WiFi, Bluetooth, Zigbee, or other wireless services
- **Denial of Service:** Preventing legitimate users from accessing wireless networks
- **Unauthorized Testing:** Operating in public spaces without permission
- **Malicious Use:** Any activity intended to harm, disrupt, or interfere with others

### Legal Consequences of Misuse

Unauthorized RF interference is a federal crime in most jurisdictions:

- **United States:** Up to $10,000 fine per violation, potential imprisonment (47 USC § 333)
- **European Union:** Member state penalties vary, typically €5,000-€50,000 fines
- **Civil Liability:** Victims of interference can sue for damages

**Real-World Example:** In 2014, Marriott Hotels was fined $600,000 by the FCC for jamming customer WiFi hotspots to force use of paid hotel WiFi.

## Safe Operating Practices

### Controlled Environment Requirements

Operate Aether only in:
- **Shielded laboratory:** RF-isolated room with proper grounding
- **Faraday cage:** Conductive enclosure that blocks external radiation
- **Anechoic chamber:** For accurate RF measurements without reflections
- **Authorized test range:** With written permission from spectrum authority

### Interference Monitoring

Before and during operation:
1. Use spectrum analyzer or SDR to verify no licensed services are present
2. Monitor for unintended interference (check WiFi networks, Bluetooth devices)
3. Stop immediately if interference is detected
4. Document all experiments with timestamps and configurations

### Power Level Guidelines

- **Start low:** Begin experiments at minimum TX power (-18 dBm)
- **Increase gradually:** Only raise power if needed for specific test objectives
- **Maximum power:** Use +20 dBm only in shielded environments
- **Constant carrier:** Never use outside Faraday cage (violates duty cycle limits)

## Specific Risks and Mitigations

### Risk: WiFi Disruption

**Scenario:** Aether transmits on channels 1, 6, or 11 (WiFi primary channels in 2.4 GHz)

**Impact:** Nearby WiFi networks experience packet loss, reduced throughput, disconnections

**Mitigation:**
- Avoid WiFi channels (1-13 in 2.4 GHz band map to NRF24 channels 2-78)
- Use channels 79-125 (2.479-2.525 GHz) which overlap less with WiFi
- Operate in shielded environment
- Coordinate with local network administrators

### Risk: Bluetooth Interference

**Scenario:** Aether transmits on BLE advertising channels (2402, 2426, 2480 MHz)

**Impact:** Bluetooth devices fail to pair, audio stutters, IoT devices disconnect

**Mitigation:**
- Avoid BLE advertising channels (NRF24 channels 2, 26, 80)
- Use frequency hopping patterns that skip BLE channels
- Test in isolated environment first

### Risk: Medical Device Interference

**Scenario:** Aether operates near hospital or medical facility

**Impact:** Potential interference with wireless medical telemetry, patient monitors

**Mitigation:**
- **Never operate near hospitals, clinics, or medical facilities**
- Maintain 100+ meter separation from medical environments
- Assume all 2.4 GHz channels may be used by medical devices

### Risk: Emergency Services Interference

**Scenario:** Aether interferes with public safety radio systems

**Impact:** Disruption of emergency communications (police, fire, EMS)

**Mitigation:**
- Public safety typically uses VHF/UHF bands (not 2.4 GHz), but some systems use 2.4 GHz for data
- Never operate near emergency response scenes
- Stop immediately if emergency vehicles are nearby

## Battery Safety

### Lithium-Ion Hazards

- **Fire risk:** Overcharge, overdischarge, or physical damage can cause thermal runaway
- **Explosion risk:** Venting gases can ignite if exposed to spark or flame
- **Chemical burns:** Electrolyte is corrosive

### Safe Handling

- Use only cells with built-in protection circuits
- Never exceed 4.2V charge voltage
- Never discharge below 2.5V
- Store at 40-60% charge in cool, dry location
- Inspect for swelling, damage, or corrosion before each use
- Dispose of damaged cells at proper recycling facility

### TP4056 Protection Features

The TP4056 charge controller includes:
- Overcharge protection (4.2V cutoff)
- Charge current limiting (1A default)
- Thermal shutdown (>115°C)

**Not included:** Overdischarge protection (add DW01 IC or use protected cells)

## RF Exposure Limits

### FCC Guidelines (47 CFR § 1.1310)

Maximum Permissible Exposure (MPE) for general population at 2.4 GHz:
- Power density: 1 mW/cm² (averaged over 30 minutes)

### Aether Exposure Levels

At maximum power (+20 dBm = 100 mW) with 2 dBi antenna:
- EIRP: 100 mW × 1.58 = 158 mW
- At 10 cm distance: ~0.13 mW/cm² (below MPE limit)
- At 1 cm distance: ~13 mW/cm² (exceeds MPE limit)

**Recommendation:** Maintain >10 cm distance from antennas during operation.

## Responsible Disclosure

If you discover a safety issue, regulatory violation, or potential for misuse:

1. Do not publish details publicly until mitigation is available
2. Contact project maintainers via SECURITY.md
3. Allow 90 days for response before public disclosure
4. Coordinate with affected parties (spectrum authorities, device manufacturers)

## Educational Context

Aether exists to teach RF engineering concepts that are difficult to learn from textbooks alone. Understanding how wireless systems can be disrupted is essential for:
- Designing robust protocols
- Implementing interference mitigation
- Securing wireless networks
- Troubleshooting RF issues

This knowledge must be used responsibly. The same skills that enable research also enable harm. Choose wisely.

## Acknowledgment

By building, modifying, or operating Aether, you acknowledge:
- You have read and understood this document
- You accept sole responsibility for legal compliance
- You will operate only in authorized environments
- You will not use Aether for malicious purposes
- You understand the potential consequences of misuse

## References

- FCC Part 15 Rules: https://www.ecfr.gov/current/title-47/chapter-I/subchapter-A/part-15
- ETSI EN 300 328: https://www.etsi.org/deliver/etsi_en/300300_300399/300328/
- IEEE C95.1 RF Exposure Guidelines
- ICNIRP Guidelines for Limiting Exposure to Electromagnetic Fields

## Future Work

- Add real-time interference detection firmware
- Implement automatic power reduction when interference detected
- Create pre-flight checklist for experiments
- Document case studies of responsible RF research
