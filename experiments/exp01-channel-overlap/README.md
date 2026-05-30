# Experiment 01: Channel Overlap Analysis

## Purpose

Determine the minimum channel spacing required for reliable simultaneous operation of two NRF24L01+ modules. Characterize adjacent-channel interference and identify optimal channel allocation strategies for dual-radio experiments.

---

## Objective

**Primary Question:** How close can two NRF24 channels be while maintaining reliable packet transmission?

**Secondary Questions:**
1. Does interference depend on data rate (250kbps vs. 1Mbps vs. 2Mbps)?
2. How does TX power affect adjacent-channel interference?
3. What is the relationship between channel spacing and packet error rate?

---

## Hypothesis

We expect:
1. **0 MHz spacing (same channel):** Complete interference, high packet loss
2. **1 MHz spacing:** Significant interference due to spectral overlap
3. **2 MHz spacing:** Moderate interference, usable for low-throughput applications
4. **≥5 MHz spacing:** Minimal interference, reliable operation

Data rate should affect interference: 250kbps has narrower bandwidth, so less adjacent-channel interference than 2Mbps.

---

## Equipment

### Test Setup A (Transmitter)
- Aether v1.0 (ESP32 + dual NRF24L01+)
- Firmware: `dual_radio_hopping.ino` modified for fixed channels
- Power: USB (5V, 2A supply)
- Antennas: PCB trace antennas (both modules)

### Test Setup B (Receiver)
- ESP32 + single NRF24L01+ (receiver only)
- Firmware: Packet counter with RSSI logging
- Power: USB
- Antenna: PCB trace antenna

### Test Equipment
- Spectrum analyzer (Rigol DSA815 or equivalent)
- Logic analyzer (Saleae Logic 8 or equivalent)
- Multimeter (for power rail verification)
- Distance: 2 meters line-of-sight (clear lab environment)

---

## Methodology

### Phase 1: Single-Channel Baseline
1. Configure radio #1 on channel 45, TX power 0 dBm, 1 Mbps
2. Configure receiver on channel 45
3. Transmit 1000 packets, record packet error rate (PER)
4. Repeat for channels 2, 26, 80 (BLE advertising channels)

### Phase 2: Adjacent-Channel Interference
1. Configure radio #1 on channel 45 (transmitter)
2. Configure radio #2 on variable channel (interferer)
3. Configure receiver on channel 45
4. For each channel spacing Δ = 0, 1, 2, 3, 4, 5, 10 MHz:
   - Set interferer to channel 45 + Δ
   - Transmit 1000 packets from radio #1
   - Record PER at receiver
   - Record RSSI values

### Phase 3: Data Rate Variation
Repeat Phase 2 for:
- 250 kbps
- 1 Mbps (baseline)
- 2 Mbps

### Phase 4: TX Power Variation
Repeat Phase 2 (1 Mbps) for:
- -18 dBm (minimum)
- -12 dBm
- -6 dBm
- 0 dBm (maximum)

### Phase 5: Spectrum Analysis
1. Use spectrum analyzer to capture spectral masks
2. Measure occupied bandwidth at each data rate
3. Record adjacent-channel power ratio (ACPR)
4. Compare measured vs. theoretical interference

---

## Data Collection

### Parameters Recorded
- **Independent Variables:**
  - Channel spacing (MHz)
  - Data rate (kbps)
  - TX power (dBm)
  - Channel number

- **Dependent Variables:**
  - Packet error rate (%)
  - RSSI (dBm) at receiver
  - Throughput (packets/second)
  - Latency (ms)

- **Control Variables:**
  - Distance: 2 meters
  - Environment: Indoor lab, 22°C, 45% humidity
  - Antenna orientation: Vertical
  - Packet size: 32 bytes
  - Packet interval: 10 ms

### Data Format
```csv
timestamp,test_id,spacing_mhz,data_rate_kbps,tx_power_dbm,channel,packets_sent,packets_received,per_percent,avg_rssi_dbm,notes
2024-01-15T10:30:00Z,phase2_1,0,1000,0,45,1000,0,100.0,-999,"same channel"
2024-01-15T10:31:00Z,phase2_2,1,1000,0,45,1000,150,85.0,-65,"1 MHz spacing"
```

---

## Results

### Phase 1: Baseline Performance
*(To be filled after experiment)*

**Expected:** PER < 1% for single transmitter, no interference.

### Phase 2: Channel Spacing Impact
*(To be filled after experiment)*

**Data Table Template:**
| Spacing (MHz) | PER (%) | Avg RSSI (dBm) | Notes |
|---------------|---------|----------------|-------|
| 0             | 100.0   | -999           | Same channel |
| 1             | TBD     | TBD            | Adjacent channel |
| 2             | TBD     | TBD            | 2 MHz spacing |
| 3             | TBD     | TBD            | 3 MHz spacing |
| 4             | TBD     | TBD            | 4 MHz spacing |
| 5             | TBD     | TBD            | 5 MHz spacing |
| 10            | TBD     | TBD            | 10 MHz spacing |

### Phase 3: Data Rate Comparison
*(To be filled after experiment)*

**Expected:** 250kbps shows less adjacent-channel interference than 2Mbps due to narrower bandwidth.

### Phase 4: TX Power Impact
*(To be filled after experiment)*

**Expected:** Higher TX power increases interference radius, affecting adjacent channels more.

### Phase 5: Spectrum Measurements
*(To be filled after experiment)*

**Expected:** 2Mbps shows wider spectral mask, more adjacent-channel leakage.

---

## Analysis

### Statistical Methods
1. **PER vs. Spacing:** Fit exponential decay curve
2. **Confidence Intervals:** Calculate 95% CI for PER measurements
3. **ANOVA:** Test significance of data rate and TX power effects
4. **Correlation:** Calculate Pearson's r between spacing and PER

### Key Metrics to Calculate
1. **Minimum usable spacing:** Spacing where PER < 5%
2. **Interference radius:** Channel distance where interference drops below noise floor
3. **Spectral efficiency:** (Data rate) / (Channel spacing) for PER < 1%

### Visualization
Generate plots:
1. PER vs. Channel spacing (log scale)
2. PER vs. Data rate (bar chart)
3. PER vs. TX power (heatmap)
4. Spectral masks overlay (spectrum analyzer screenshots)

---

## Conclusion

*(To be filled after experiment)*

**Expected Conclusions:**
1. For reliable dual-radio operation, use ≥5 MHz channel spacing
2. 250kbps mode allows tighter channel spacing than 2Mbps
3. Lower TX power reduces adjacent-channel interference
4. BLE advertising channels (2, 26, 80) may require special consideration

**Practical Recommendations:**
- For simultaneous TX/RX: Use channels 45 and 50 (5 MHz spacing)
- For maximum throughput: Use 2Mbps with 10 MHz spacing
- For minimum interference: Use 250kbps with 3 MHz spacing

---

## Future Work

### Follow-up Experiments
1. **Exp01b:** Test with external antennas (directional vs. omnidirectional)
2. **Exp01c:** Measure interference in presence of WiFi traffic
3. **Exp01d:** Test with PA+LNA modules (+20 dBm TX power)

### Methodology Improvements
1. Automate channel sweeping with Python script
2. Add real-time PER display on OLED
3. Implement automated data logging to SD card
4. Test with multiple interferers (3+ radios simultaneously)

### Theoretical Extensions
1. Model interference using filter roll-off characteristics
2. Calculate Shannon capacity with interference
3. Compare measured results with NRF24 datasheet specifications

---

## References

1. NRF24L01+ Product Specification v1.0 (Nordic Semiconductor)
2. IEEE 802.11-2020: Adjacent Channel Interference
3. ITU-R SM.337-6: Frequency and distance separations
4. Friis Transmission Equation with interference term

---

## Data Files

*(Links to raw data files will be added after experiment)*

- `data/phase1_baseline.csv`
- `data/phase2_spacing.csv`
- `data/phase3_datarate.csv`
- `data/phase4_txpower.csv`
- `data/phase5_spectrum/` (screenshots and measurements)

---

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-01-15 | 1.0 | Initial experiment design | RF Engineering Student |
| TBD | 1.1 | Add results and analysis | TBD |
