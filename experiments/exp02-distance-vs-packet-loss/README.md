# Experiment 02: Distance vs. Packet Loss

## Purpose

Characterize the relationship between transmitter-receiver distance and packet error rate for NRF24L01+ modules. Establish practical range limits for Aether experiments and validate theoretical path loss models with real-world measurements.

---

## Objective

**Primary Question:** How does packet error rate increase with distance for NRF24L01+ at different TX power levels?

**Secondary Questions:**
1. How well does the Friis transmission equation predict real-world performance?
2. What is the maximum reliable range for each TX power setting?
3. How does environment (indoor vs. outdoor) affect range?
4. What is the relationship between RSSI and distance?

---

## Hypothesis

We expect:
1. **Exponential increase** in PER with distance (following log-distance path loss model)
2. **+6 dB TX power** should approximately double the range
3. **Outdoor performance** will be better than indoor due to fewer reflections
4. **RSSI will decrease** by ~6 dB per doubling of distance in free space

Theoretical maximum range (0 dBm, 1 Mbps, -90 dBm sensitivity):
- Free space: ~100 meters
- Indoor with walls: ~30 meters
- Dense urban: ~10 meters

---

## Equipment

### Test Setup A (Transmitter)
- Aether v1.0 (ESP32 + NRF24L01+ on HSPI)
- Firmware: Distance test mode (fixed channel, configurable TX power)
- Power: USB with 5 meter extension cable
- Antenna: PCB trace antenna
- Mounting: Tripod at 1.5m height

### Test Setup B (Receiver)
- ESP32 + NRF24L01+ (receiver only)
- Firmware: Packet counter with RSSI and timestamp logging
- Power: Laptop USB (for mobility)
- Antenna: PCB trace antenna
- Mounting: Handheld or on second tripod

### Test Equipment
- Laser distance meter (Boske GLM 50 or equivalent)
- GPS receiver (for outdoor distance validation)
- Multimeter (battery voltage monitoring)
- Notebook for environmental notes

### Measurement Locations
1. **Indoor:** University lab corridor (30m straight line, concrete walls)
2. **Outdoor:** Football field (100m clear line-of-sight)
3. **Semi-outdoor:** Parking garage (mixed environment)

---

## Methodology

### Phase 1: Indoor Range Test
1. Set TX power to 0 dBm, data rate 1 Mbps, channel 45
2. Position transmitter at fixed location (marked on floor)
3. For distances d = 1, 2, 5, 10, 15, 20, 25, 30 meters:
   - Position receiver at distance d (measure with laser meter)
   - Align antennas (vertical polarization, same height)
   - Transmit 1000 packets (32 bytes, 10 ms interval)
   - Record: packets received, RSSI values, timestamps
   - Repeat measurement 3 times at each distance

### Phase 2: TX Power Variation
Repeat Phase 1 for TX power levels:
- -18 dBm (minimum)
- -12 dBm
- -6 dBm
- 0 dBm (maximum)

### Phase 3: Data Rate Comparison
Repeat Phase 1 (0 dBm) for data rates:
- 250 kbps
- 1 Mbps
- 2 Mbps

### Phase 4: Outdoor Range Test
1. Move to football field (clear line-of-sight)
2. Repeat Phase 1 for distances up to 100 meters
3. Additional distances: 40, 60, 80, 100 meters
4. Use GPS to validate distances >30 meters

### Phase 5: Environment Comparison
Compare PER at fixed distance (10 meters) in:
- Lab corridor (indoor)
- Football field (outdoor)
- Parking garage (semi-outdoor with concrete pillars)
- Through one interior wall (drywall)
- Through one exterior wall (brick)

---

## Data Collection

### Parameters Recorded
- **Independent Variables:**
  - Distance (meters)
  - TX power (dBm)
  - Data rate (kbps)
  - Environment (indoor/outdoor/etc.)
  - Channel number (fixed at 45)

- **Dependent Variables:**
  - Packet error rate (%)
  - RSSI (dBm) - min, max, mean, std dev
  - Latency (ms) - min, max, mean
  - Throughput (packets/second)

- **Environmental Variables:**
  - Temperature (°C)
  - Humidity (%)
  - Time of day
  - WiFi channel occupancy (scan before test)
  - Obstructions in path (note any)

### Data Format
```csv
timestamp,distance_m,tx_power_dbm,data_rate_kbps,environment,packets_sent,packets_received,per_percent,rssi_min,rssi_max,rssi_mean,rssi_std,latency_min_ms,latency_max_ms,latency_mean_ms,temperature_c,humidity_percent,notes
2024-01-15T14:30:00Z,10.0,0,1000,indoor,1000,995,0.5,-68,-62,-65.2,1.8,10,15,12.3,22.0,45.0,"clear line of sight"
```

### Measurement Protocol
1. **Before each test:**
   - Record environmental conditions
   - Scan for WiFi networks (note channels in use)
   - Verify battery voltage (>3.5V)
   - Warm up equipment (5 minutes)

2. **During test:**
   - Maintain constant antenna orientation
   - Minimize movement near test area
   - Record any anomalies (people walking through, doors opening)

3. **After test:**
   - Export data immediately
   - Verify data integrity (check packet counts)
   - Note any equipment issues

---

## Results

### Phase 1: Indoor Distance Sweep
*(To be filled after experiment)*

**Expected:** PER < 1% up to ~15 meters, increasing to >50% at 30 meters.

### Phase 2: TX Power Impact
*(To be filled after experiment)*

**Data Table Template:**
| Distance (m) | PER @ -18 dBm | PER @ -12 dBm | PER @ -6 dBm | PER @ 0 dBm |
|--------------|---------------|---------------|--------------|-------------|
| 1            | TBD           | TBD           | TBD          | TBD         |
| 5            | TBD           | TBD           | TBD          | TBD         |
| 10           | TBD           | TBD           | TBD          | TBD         |
| 20           | TBD           | TBD           | TBD          | TBD         |
| 30           | TBD           | TBD           | TBD          | TBD         |

### Phase 3: Data Rate Comparison
*(To be filled after experiment)*

**Expected:** 250kbps has longest range, 2Mbps shortest range (sensitivity difference).

### Phase 4: Outdoor Range
*(To be filled after experiment)*

**Expected:** Significantly longer range than indoor, possibly 80-100 meters at 0 dBm.

### Phase 5: Environment Comparison
*(To be filled after experiment)*

**Expected:** Outdoor < Parking garage < Indoor corridor < Through wall.

---

## Analysis

### Path Loss Modeling
Fit measured data to path loss models:

1. **Free Space Path Loss (FSPL):**
   ```
   PL(d) = 20log₁₀(d) + 20log₁₀(f) + 32.45
   ```

2. **Log-Distance Path Loss:**
   ```
   PL(d) = PL(d₀) + 10n log₁₀(d/d₀) + Xσ
   ```
   Where:
   - d₀ = reference distance (1m)
   - n = path loss exponent
   - Xσ = shadow fading (zero-mean Gaussian)

3. **Calculate path loss exponent n:**
   - Free space: n = 2
   - Indoor office: n = 3-4
   - Factory: n = 2-3

### Key Metrics
1. **Maximum reliable range:** Distance where PER < 5%
2. **Path loss exponent n:** From RSSI vs. distance fit
3. **Shadow fading variance σ:** Environment variability
4. **Link margin:** Difference between received power and sensitivity

### Statistical Analysis
1. **PER vs. Distance:** Fit logistic curve (sigmoid)
2. **RSSI vs. Distance:** Linear regression on log scale
3. **Confidence intervals:** 95% CI for PER at each distance
4. **ANOVA:** Test environment and TX power effects

### Visualization
Generate plots:
1. PER vs. Distance (log scale, multiple TX powers)
2. RSSI vs. Distance (log scale, theoretical vs. measured)
3. Environment comparison (bar chart at fixed distance)
4. Contour plot: PER(distance, TX power)

---

## Conclusion

*(To be filled after experiment)*

**Expected Conclusions:**
1. Practical indoor range: 20-30 meters at 0 dBm
2. Outdoor range: 80-100 meters possible with clear line-of-sight
3. Each +6 dB TX power approximately doubles range
4. 250kbps provides 6-8 dB range advantage over 2Mbps

**Practical Recommendations for Aether Experiments:**
- For lab experiments (<10m): Use -12 dBm to reduce interference
- For corridor experiments (10-20m): Use 0 dBm
- For outdoor experiments: Consider PA+LNA modules for >100m range
- Always include link margin of 10-20 dB for reliability

---

## Future Work

### Follow-up Experiments
1. **Exp02b:** Test with external antennas (directional for longer range)
2. **Exp02c:** Measure multipath effects (RSSI variation over time at fixed distance)
3. **Exp02d:** Test mobility (walking speed effects on PER)
4. **Exp02e:** Measure through different wall materials (quantify attenuation)

### Methodology Improvements
1. Automate distance measurement (ultrasonic sensor on receiver)
2. Real-time PER display during tests
3. Synchronized video recording of test environment
4. Automated environment logging (temperature, humidity sensors)

### Theoretical Extensions
1. Compare measured n values with literature for similar environments
2. Model PER from SNR using NRF24 sensitivity curves
3. Calculate Shannon capacity vs. distance
4. Evaluate diversity techniques (antenna, frequency, time)

---

## References

1. Friis, H.T. (1946). "A Note on a Simple Transmission Formula."
2. Rappaport, T.S. (2002). *Wireless Communications: Principles and Practice*
3. ITU-R P.1238: Propagation data for indoor radio planning
4. NRF24L01+ Sensitivity Specifications (Nordic Semiconductor)

---

## Safety Considerations

### Outdoor Testing
1. Obtain permission for use of football field
2. Mark test area to prevent people walking through
3. Have spotter for distances >50 meters
4. Stop if aircraft approach (2.4 GHz used by some drones)

### General
1. Maintain awareness of other wireless systems
2. Stop if interference detected with critical systems
3. Follow local RF regulations for outdoor transmission

---

## Data Files

*(Links to raw data files will be added after experiment)*

- `data/phase1_indoor.csv`
- `data/phase2_txpower.csv`
- `data/phase3_datarate.csv`
- `data/phase4_outdoor.csv`
- `data/phase5_environment.csv`
- `plots/` (generated visualizations)

---

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-01-15 | 1.0 | Initial experiment design | RF Engineering Student |
| TBD | 1.1 | Add results and analysis | TBD |
