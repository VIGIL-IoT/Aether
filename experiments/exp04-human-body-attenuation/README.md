# Experiment 04: Human Body Attenuation

## Purpose

Quantify signal attenuation caused by the human body at 2.4 GHz. Understand how people affect wireless communication in indoor environments and provide data for RF planning in human-occupied spaces.

---

## Objective

**Primary Question:** How much does the human body attenuate 2.4 GHz signals?

**Secondary Questions:**
1. Does attenuation depend on body position/orientation?
2. How does attenuation vary across the 2.4 GHz band?
3. What is the difference between line-of-sight blockage and near-field effects?
4. How do multiple people affect signal propagation?

---

## Hypothesis

We expect:
1. **High attenuation** (20-30 dB) due to water content (~60% of body mass)
2. **Frequency dependence** near water resonance at 2.45 GHz
3. **Anterior-posterior** (front-to-back) greater than lateral (side-to-side) due to body thickness
4. **Near-field effects** when body is close to antenna (> standing wave effects)

Literature values (approximate):
- Chest (anterior-posterior): 20-30 dB
- Arm (lateral): 10-15 dB
- Head: 15-25 dB
- Variation with frequency: 1-3 dB across 2.4 GHz band

---

## Equipment

### Test Setup
- Aether v1.0 (ESP32 + NRF24L01+)
- Firmware: Fixed channel, configurable TX power
- Power: USB with extension cables
- Antennas: PCB trace antennas (vertical polarization)
- Mounting: Tripods at 1.5m height (typical human torso height)

### Test Subjects
- 3 volunteers (different body types for comparison)
- Height range: 160-190 cm
- Weight range: 60-90 kg
- Clothing: Standard indoor clothing (no metal objects)
- Informed consent obtained for all participants

### Test Equipment
- Laser distance meter
- Scale (for participant weight)
- Measuring tape (for body dimensions)
- Infrared thermometer (optional, for surface temperature)
- Notebook for participant information (anonymized)

### Test Environment
- Controlled indoor space (lab or gymnasium)
- Temperature: 20-25°C (comfortable for participants)
- Humidity: 40-60%
- Minimal other RF interference
- Privacy for participants

---

## Methodology

### Phase 1: Baseline Measurement (No Person)
1. Position transmitter and receiver 2 meters apart
2. Set TX power to 0 dBm, data rate 1 Mbps, channel 45
3. Transmit 1000 packets, record RSSI and PER
4. Repeat for channels 2, 45, 80 (low, middle, high frequency)
5. Establish reference RSSI for 0 dB attenuation

### Phase 2: Body Blockage (Line-of-Sight)
For each participant:
1. Participant stands between transmitter and receiver (1m from each)
2. Standard stance: Feet shoulder-width, arms at sides
3. For each body orientation:
   - **Anterior-posterior:** Facing transmitter (chest blocks signal)
   - **Posterior-anterior:** Facing away from transmitter (back blocks)
   - **Lateral left:** Left side toward transmitter
   - **Lateral right:** Right side toward transmitter
4. For each orientation at channel 45:
   - Transmit 500 packets
   - Record RSSI, calculate attenuation
   - Participant holds position steady (minimize movement)
5. Repeat 3 times per orientation

### Phase 3: Distance Variation
For chest blockage (anterior-posterior):
1. Vary participant distance from transmitter: 0.5m, 1.0m, 1.5m, 2.0m
2. Receiver fixed at 2m from transmitter
3. Measure attenuation at each distance
4. Test if near-field effects are significant

### Phase 4: Frequency Dependence
For chest blockage at 1m distance:
1. Sweep channels 0-125 (2.400-2.525 GHz) in 10-channel steps
2. At each channel, transmit 100 packets
3. Record RSSI, calculate attenuation
4. Look for resonance near 2.45 GHz (water resonance)

### Phase 5: Body Part Comparison
Measure attenuation for specific body parts:
1. **Head:** Participant sits, head blocks line-of-sight
2. **Torso:** Standing, as in Phase 2
3. **Arm:** Participant extends arm horizontally into path
4. **Leg:** Participant lifts leg into path (supported position)
All at 1m distance, channel 45.

### Phase 6: Multiple People
Test attenuation with:
1. 2 people side-by-side (combined width)
2. 2 people in-line (increased effective thickness)
3. 3 people in various configurations
Measure and compare with single-person attenuation.

### Phase 7: Movement Effects
1. Participant walks through path at normal walking speed
2. Measure RSSI variation over time
3. Characterize fading due to movement

---

## Data Collection

### Parameters Recorded
- **Independent Variables:**
  - Participant ID (anonymized)
  - Body orientation
  - Distance from transmitter (m)
  - Channel (frequency)
  - Body part
  - Number of people

- **Dependent Variables:**
  - Attenuation (dB)
  - RSSI with body (dBm)
  - PER with body (%)
  - RSSI reference (dBm)
  - PER reference (%)

- **Participant Data (anonymized):**
  - Height (cm)
  - Weight (kg)
  - Chest circumference (cm)
  - Clothing description
  - Time since last meal/drink (hydration effect)

### Data Format
```csv
timestamp,participant_id,height_cm,weight_kg,orientation,distance_m,channel,body_part,people_count,rssi_reference,rssi_body,attenuation_db,per_reference,per_body,clothing,notes
2024-01-15T14:00:00Z,P01,175,70,anterior_posterior,1.0,45,chest,1,-65.2,-85.5,20.3,0.1,5.2,"cotton t-shirt, jeans","standing still"
```

### Ethical Considerations
1. **Informed Consent:** Participants understand experiment purpose and procedures
2. **Anonymization:** No personally identifiable information in published data
3. **Comfort:** Participants can stop at any time, breaks provided
4. **Safety:** RF exposure below safety limits, minimal movement required
5. **Privacy:** Experiment conducted in private space

### Measurement Protocol
1. **Participant preparation:**
   - Explain procedure, obtain consent
   - Remove metal objects (watches, jewelry, phones)
   - Record basic measurements (height, weight)
   - Ensure comfortable clothing

2. **Positioning:**
   - Use laser for accurate alignment
   - Mark foot positions for repeatability
   - Ensure consistent posture

3. **Measurement:**
   - Participant holds breath during short measurements (5-10 seconds)
   - Minimize movement during packet transmission
   - Take multiple measurements to average movement effects

4. **Participant comfort:**
   - Provide seating between measurements
   - Offer water breaks
   - Monitor for fatigue or discomfort

---

## Results

### Phase 1: Baseline
*(To be filled after experiment)*

**Expected:** Consistent RSSI, PER < 1%.

### Phase 2: Body Orientation
*(To be filled after experiment)*

**Data Table Template (Participant P01):**
| Orientation | Attenuation (dB) | PER (%) | Notes |
|-------------|------------------|---------|-------|
| Anterior-posterior | TBD | TBD | Chest blockage |
| Posterior-anterior | TBD | TBD | Back blockage |
| Lateral left | TBD | TBD | Side blockage |
| Lateral right | TBD | TBD | Side blockage |

### Phase 3: Distance Dependence
*(To be filled after experiment)*

**Expected:** Attenuation decreases with distance from transmitter (near-field effects).

### Phase 4: Frequency Dependence
*(To be filled after experiment)*

**Expected:** Peak attenuation near 2.45 GHz (water resonance).

### Phase 5: Body Part Comparison
*(To be filled after experiment)*

**Expected:** Head ≈ Torso > Arm > Leg (based on thickness and water content).

### Phase 6: Multiple People
*(To be filled after experiment)*

**Expected:** Approximately additive attenuation for in-line configuration.

### Phase 7: Movement Effects
*(To be filled after experiment)*

**Expected:** Rapid RSSI variation (fading) as body moves through path.

---

## Analysis

### Attenuation Modeling
Fit data to models:

1. **Body attenuation model:**
   ```
   α = α₀ + β·d_effective
   ```
   Where α₀ = surface reflection loss, d_effective = effective body thickness

2. **Frequency dependence near resonance:**
   ```
   α(f) = α_max / (1 + Q²·(f/f₀ - f₀/f)²)
   ```
   Where f₀ = 2.45 GHz (water resonance), Q = quality factor

3. **Distance dependence (near-field):**
   ```
   α(d) = α∞ + (α₀ - α∞)·exp(-d/λ)
   ```
   Where α∞ = far-field attenuation, λ = wavelength

### Key Metrics
1. **Average body attenuation** for different orientations
2. **Frequency coefficient** (dB/MHz) across 2.4 GHz band
3. **Near-field decay constant** (distance for attenuation to drop to 1/e)
4. **Comparison across participants** (body type effects)

### Statistical Analysis
1. **ANOVA:** Compare orientations, body parts, participants
2. **Regression:** Attenuation vs. body measurements (height, weight, circumference)
3. **Correlation:** Attenuation vs. estimated water content
4. **Time series analysis:** Movement-induced fading

### Visualization
Generate plots:
1. Attenuation vs. Orientation (bar chart)
2. Attenuation vs. Frequency (line plot, highlight resonance)
3. Attenuation vs. Distance (scatter with exponential fit)
4. Body part comparison (radar chart)
5. Movement fading (RSSI vs. time)

---

## Conclusion

*(To be filled after experiment)*

**Expected Conclusions:**
1. Human body causes 20-30 dB attenuation at 2.4 GHz
2. Anterior-posterior orientation shows highest attenuation
3. Frequency dependence shows mild resonance near 2.45 GHz
4. Near-field effects significant within ~0.5m of body
5. Multiple people cause approximately additive attenuation

**Practical Implications for Aether:**
- People in experiment area can significantly affect results
- For consistent measurements, control human presence
- Consider body attenuation when planning through-person experiments
- Movement causes fading - average over time for stable measurements

**RF Planning Implications:**
- Conference rooms: Account for 20-30 dB attenuation when people present
- Dense crowds: Signal may be blocked completely
- Body-worn devices: Antenna placement critical (avoid body blockage)

---

## Future Work

### Follow-up Experiments
1. **Exp04b:** Measure attenuation with different clothing materials
2. **Exp04b:** Test hydration effects (before/after water consumption)
3. **Exp04c:** Measure attenuation of specific tissues (muscle, fat, bone models)
4. **Exp04d:** Test with different antenna polarizations relative to body
5. **Exp04e:** Measure attenuation in different postures (sitting, crouching)

### Methodology Improvements
1. Use medical imaging data to correlate with body composition
2. Implement automated participant positioning system
3. Add real-time motion tracking for movement studies
4. Develop phantom models for repeatable measurements

### Theoretical Extensions
1. Model body as layered dielectric (skin, fat, muscle, bone)
2. Calculate specific absorption rate (SAR) for safety validation
3. Compare with electromagnetic simulation (FDTD with human models)
4. Develop statistical model for population variation

---

## References

1. ITU-R P.1406: Propagation effects relating to terrestrial land mobile and fixed services
2. IEEE C95.1: Safety levels with respect to human exposure to radio frequency fields
3. "Human Body Attenuation at 2.4 GHz" (Various papers)
4. Dielectric properties of body tissues (Gabriel et al., 1996)

---

## Ethical and Safety Considerations

### Participant Safety
1. **RF Exposure:** TX power limited to 0 dBm (1 mW), far below safety limits
2. **Comfort:** Short measurement periods, breaks provided
3. **Privacy:** Anonymized data only, private testing space
4. **Informed Consent:** Clear explanation of procedures and risks

### General Safety
1. Maintain antenna distance (>10 cm from body)
2. Monitor for any discomfort from participants
3. Stop immediately if any safety concerns arise
4. Follow institutional review board (IRB) guidelines if applicable

---

## Data Files

*(Links to raw data files will be added after experiment)*

- `data/phase1_baseline.csv`
- `data/phase2_orientation.csv`
- `data/phase3_distance.csv`
- `data/phase4_frequency.csv`
- `data/phase5_bodyparts.csv`
- `data/phase6_multiple.csv`
- `data/phase7_movement.csv`
- `participant_info/` (anonymized participant data)

---

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-01-15 | 1.0 | Initial experiment design | RF Engineering Student |
| TBD | 1.1 | Add results and analysis | TBD |
