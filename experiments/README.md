# Aether Experiments

## Purpose

This directory contains documented RF experiments conducted with Aether. Each experiment follows a structured methodology to ensure reproducibility and scientific rigor.

---

## Experiment Index

| ID | Name | Status | Key Finding |
|----|------|--------|-------------|
| 01 | Channel Overlap Analysis | Planned | TBD |
| 02 | Distance vs. Packet Loss | Planned | TBD |
| 03 | Wall Attenuation Measurement | Planned | TBD |
| 04 | Human Body Attenuation | Planned | TBD |

---

## Experiment Template

Each experiment directory should contain:

```
expXX-experiment-name/
├── README.md           # Full experiment documentation
├── data/               # Raw measurement data (CSV, logs)
├── analysis/           # Analysis scripts and plots
└── results/            # Final graphs and conclusions
```

### README.md Structure

Every experiment README must include:

1. **Objective:** What question are we trying to answer?
2. **Hypothesis:** What do we expect to observe?
3. **Equipment:** Hardware and test equipment used
4. **Methodology:** Step-by-step procedure
5. **Data Collection:** What measurements were taken and how
6. **Results:** Raw data summary and observations
7. **Analysis:** Interpretation of results
8. **Conclusion:** Answer to the objective question
9. **Future Work:** Follow-up experiments or improvements

---

## Conducting Experiments

### Before Starting

1. **Safety Check:**
   - Verify operation complies with local RF regulations
   - Ensure controlled environment (lab, Faraday cage, or authorized space)
   - Check for nearby sensitive equipment or licensed services

2. **Equipment Calibration:**
   - Verify Aether firmware version
   - Check battery voltage (>3.5V for consistent TX power)
   - Calibrate test equipment (spectrum analyzer, power meter)

3. **Documentation Setup:**
   - Create experiment directory from template
   - Record environmental conditions (temperature, humidity)
   - Note any deviations from standard configuration

### During Experiment

1. **Data Logging:**
   - Use consistent file naming: `YYYYMMDD_HHMMSS_description.csv`
   - Record timestamps for all measurements
   - Note any anomalies or unexpected behavior

2. **Reproducibility:**
   - Take multiple measurements (minimum 3 trials)
   - Randomize test order when possible
   - Document all configuration changes

3. **Safety Monitoring:**
   - Watch for unintended interference
   - Stop immediately if issues detected
   - Log any safety concerns

### After Experiment

1. **Data Backup:**
   - Commit raw data to repository
   - Store backup copy externally

2. **Analysis:**
   - Process data with documented scripts
   - Generate plots and visualizations
   - Calculate statistics (mean, std dev, confidence intervals)

3. **Documentation:**
   - Complete experiment README
   - Update experiment index table
   - Share findings in project discussions

---

## Planned Experiments

### High Priority

**Exp01: Channel Overlap Analysis**
- Measure interference between adjacent NRF24 channels
- Determine minimum channel spacing for reliable operation
- Compare 250kbps, 1Mbps, and 2Mbps data rates

**Exp02: Distance vs. Packet Loss**
- Characterize range at different TX power levels
- Measure packet error rate vs. distance
- Compare indoor and outdoor environments

**Exp03: Wall Attenuation**
- Quantify signal loss through common building materials
- Test drywall, wood, brick, concrete
- Measure at multiple frequencies across 2.4 GHz band

### Medium Priority

**Exp04: Human Body Attenuation**
- Measure signal loss when human body blocks line-of-sight
- Compare different body positions and orientations
- Investigate water absorption effects

**Exp05: WiFi Coexistence**
- Measure NRF24 packet loss in presence of active WiFi
- Test different WiFi channels and traffic patterns
- Identify least-interfered NRF24 channels

**Exp06: Bluetooth Interference**
- Characterize BLE advertising channel impact
- Measure interference from Bluetooth Classic devices
- Test frequency hopping collision probability

### Low Priority

**Exp07: Antenna Comparison**
- Compare PCB trace, wire monopole, and external antennas
- Measure radiation patterns and gain
- Evaluate polarization effects

**Exp08: Power Consumption Profiling**
- Measure current draw in different modes
- Characterize battery life under various workloads
- Optimize for low-power operation

**Exp09: Temperature Effects**
- Test operation across temperature range (-10°C to +50°C)
- Measure frequency drift and TX power variation
- Evaluate battery performance in cold conditions

---

## Data Format Standards

### CSV Files

Use consistent column headers:
```csv
timestamp_ms,channel,tx_power_dbm,packet_count,error_count,rssi_dbm,distance_m,notes
1234567890,45,0,1000,5,-65,10.0,"clear line of sight"
```

### Log Files

Include metadata header:
```
# Aether Experiment Log
# Experiment: exp02-distance-vs-packet-loss
# Date: 2024-01-15
# Firmware: v1.0
# Hardware: Breadboard prototype
# Environment: Indoor lab, 22°C, 45% humidity
```

---

## Analysis Tools

See `tools/` directory for:
- CSV parsing scripts
- Statistical analysis utilities
- Plotting templates
- Report generators

---

## Contributing Experiments

We welcome community-contributed experiments! To submit:

1. Follow the experiment template structure
2. Include raw data and analysis scripts
3. Document equipment and methodology clearly
4. Open a pull request with your experiment directory

See CONTRIBUTING.md for detailed guidelines.

---

## References

- IEEE 802.11 Standard (WiFi coexistence)
- Bluetooth Core Specification (BLE interference)
- ITU-R P.525 (Attenuation by atmospheric gases)
- Friis Transmission Equation (Path loss calculations)
