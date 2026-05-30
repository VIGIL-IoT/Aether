# Experiment 03: Wall Attenuation Measurement

## Purpose

Quantify signal attenuation through common building materials at 2.4 GHz. Provide empirical data for RF planning and help students understand how physical obstructions affect wireless communication range.

---

## Objective

**Primary Question:** How much does each building material attenuate 2.4 GHz signals?

**Secondary Questions:**
1. Does attenuation depend on frequency within the 2.4 GHz band?
2. How does material thickness affect attenuation?
3. What is the difference between normal incidence and oblique incidence?
4. How do multiple layers (e.g., drywall + insulation) combine?

---

## Hypothesis

We expect attenuation to follow:
1. **Concrete > Brick > Wood > Drywall** (based on density and water content)
2. **Thicker materials** show higher attenuation (approximately linear with thickness)
3. **Higher frequencies** (2.5 GHz) may show slightly higher attenuation than lower frequencies (2.4 GHz)
4. **Oblique incidence** increases effective thickness, thus higher attenuation

Literature values (approximate):
- Drywall (12mm): 3-5 dB
- Wood (50mm): 4-6 dB
- Brick (100mm): 6-10 dB
- Concrete (150mm): 10-15 dB
- Metal: Complete reflection (>50 dB)

---

## Equipment

### Test Setup
- Aether v1.0 (ESP32 + NRF24L01+)
- Firmware: Fixed channel, configurable TX power
- Power: USB with extension cables
- Antennas: PCB trace antennas (vertical polarization)
- Mounting: Tripods at 1.5m height on both sides of test material

### Test Materials
1. **Drywall:** 12mm standard interior wall
2. **Plywood:** 18mm construction grade
3. **OSB:** 15mm oriented strand board
4. **Brick:** 100mm standard red brick
5. **Concrete block:** 150mm hollow core
6. **Glass:** 6mm window glass
7. **Metal sheet:** 1mm aluminum (as reference/control)

### Test Equipment
- Laser distance meter
- Calipers (for material thickness measurement)
- Moisture meter (for wood materials)
- Spectrum analyzer (optional, for frequency-dependent measurements)
- Notebook for material specifications

### Test Environment
- University materials lab or construction site
- Controlled temperature (20-25°C)
- Materials at equilibrium moisture content
- Minimal other RF interference

---

## Methodology

### Phase 1: Baseline Measurement (No Obstruction)
1. Position transmitter and receiver 2 meters apart, clear line-of-sight
2. Set TX power to 0 dBm, data rate 1 Mbps, channel 45
3. Transmit 1000 packets, record RSSI and PER
4. Repeat for channels 2, 45, 80 (low, middle, high frequency)
5. This establishes reference RSSI for 0 dB attenuation

### Phase 2: Material Attenuation (Normal Incidence)
For each material:
1. Place material between transmitter and receiver (2m total distance)
2. Ensure material is perpendicular to line-of-sight
3. Measure exact thickness with calipers
4. For each channel (2, 45, 80):
   - Transmit 1000 packets
   - Record: RSSI (mean, min, max), PER, material notes
   - Calculate attenuation: Attenuation = RSSI_reference - RSSI_material
5. Repeat measurement 3 times, rotating material between tests

### Phase 3: Thickness Variation (Drywall Only)
Using drywall samples of different thicknesses:
- 6mm (1/4")
- 12mm (1/2", standard)
- 18mm (3/4")
- 25mm (1", double layer)

Measure attenuation at channel 45, plot attenuation vs. thickness.

### Phase 4: Frequency Dependence
For concrete block (most frequency-dependent expected):
1. Sweep channels 0-125 (2.400-2.525 GHz) in 5-channel steps
2. At each channel, transmit 100 packets
3. Record RSSI, calculate attenuation relative to baseline
4. Plot attenuation vs. frequency

### Phase 5: Oblique Incidence
For drywall and concrete:
1. Set material at 45° angle to line-of-sight
2. Calculate effective thickness: t_effective = t / cos(45°) = 1.414t
3. Measure attenuation at channel 45
4. Compare with normal incidence (corrected for effective thickness)

### Phase 6: Multiple Layers
Test combinations:
1. Drywall + insulation (fiberglass batt)
2. Drywall + air gap + drywall (simulating wall cavity)
3. Brick + mortar joint
Measure attenuation and compare with sum of individual attenuations.

---

## Data Collection

### Parameters Recorded
- **Independent Variables:**
  - Material type
  - Thickness (mm)
  - Channel (frequency)
  - Incidence angle (degrees)
  - Layer configuration

- **Dependent Variables:**
  - Attenuation (dB)
  - RSSI through material (dBm)
  - PER through material (%)
  - RSSI reference (dBm)
  - PER reference (%)

- **Material Properties:**
  - Density (if known)
  - Moisture content (%)
  - Surface roughness
  - Composition notes

### Data Format
```csv
timestamp,material,thickness_mm,channel,frequency_mhz,incidence_deg,layers,rssi_reference,rssi_material,attenuation_db,per_reference,per_material,moisture_percent,density_kgm3,notes
2024-01-15T10:00:00Z,drywall,12,45,2445,0,1,-65.2,-68.5,3.3,0.1,0.3,8.5,680,"standard interior wall"
```

### Measurement Protocol
1. **Material preparation:**
   - Measure exact dimensions
   - Record moisture content (for porous materials)
   - Note any defects or irregularities
   - Clean surfaces if necessary

2. **Positioning:**
   - Use laser to align transmitter, material, receiver
   - Ensure material covers entire Fresnel zone
   - Mark material orientation for repeatability

3. **Measurement:**
   - Allow equipment to stabilize (30 seconds after movement)
   - Take multiple measurements (minimize positioning errors)
   - Record environmental conditions (temperature, humidity)

4. **Validation:**
   - Re-measure baseline after material tests
   - Check for equipment drift
   - Verify consistency across trials

---

## Results

### Phase 1: Baseline
*(To be filled after experiment)*

**Expected:** Consistent RSSI across channels, PER < 1%.

### Phase 2: Material Attenuation
*(To be filled after experiment)*

**Data Table Template:**
| Material | Thickness (mm) | Attenuation @ 2.4 GHz (dB) | Attenuation @ 2.45 GHz (dB) | Attenuation @ 2.5 GHz (dB) | Notes |
|----------|----------------|----------------------------|-----------------------------|----------------------------|-------|
| Drywall  | 12             | TBD                        | TBD                         | TBD                        |       |
| Plywood  | 18             | TBD                        | TBD                         | TBD                        |       |
| OSB      | 15             | TBD                        | TBD                         | TBD                        |       |
| Brick    | 100            | TBD                        | TBD                         | TBD                        |       |
| Concrete | 150            | TBD                        | TBD                         | TBD                        |       |
| Glass    | 6              | TBD                        | TBD                         | TBD                        |       |
| Metal    | 1              | >50                        | >50                         | >50                        | Reflection |

### Phase 3: Thickness Dependence
*(To be filled after experiment)*

**Expected:** Approximately linear relationship: Attenuation ∝ thickness.

### Phase 4: Frequency Dependence
*(To be filled after experiment)*

**Expected:** Slight increase in attenuation with frequency (1-2 dB across band).

### Phase 5: Oblique Incidence
*(To be filled after experiment)*

**Expected:** Attenuation matches effective thickness prediction.

### Phase 6: Multiple Layers
*(To be filled after experiment)*

**Expected:** Attenuation approximately additive for separate layers.

---

## Analysis

### Attenuation Modeling
Fit data to models:

1. **Linear thickness model:**
   ```
   α = α₀ + k·t
   ```
   Where α₀ = surface reflection loss, k = attenuation coefficient (dB/mm)

2. **Frequency dependence:**
   ```
   α(f) = α(f₀) + β·(f - f₀)
   ```
   Where β = frequency coefficient (dB/MHz)

3. **Effective thickness for oblique incidence:**
   ```
   t_eff = t / cos(θ)
   ```

### Key Metrics
1. **Attenuation coefficient k** (dB/mm) for each material
2. **Surface reflection loss α₀** (dB)
3. **Frequency coefficient β** (dB/MHz)
4. **Comparison with literature values**

### Statistical Analysis
1. **Regression analysis:** Attenuation vs. thickness
2. **ANOVA:** Compare materials at same thickness
3. **Correlation:** Attenuation vs. material density/moisture
4. **Error analysis:** Measurement uncertainty propagation

### Visualization
Generate plots:
1. Attenuation vs. Material (bar chart)
2. Attenuation vs. Thickness (scatter with regression)
3. Attenuation vs. Frequency (line plot)
4. Material comparison at normalized thickness (e.g., dB/cm)

---

## Conclusion

*(To be filled after experiment)*

**Expected Conclusions:**
1. Concrete attenuates 2-3× more than drywall per cm thickness
2. Frequency dependence is minimal (<0.01 dB/MHz) for most materials
3. Oblique incidence follows effective thickness model
4. Multiple layers show approximately additive attenuation

**Practical Implications for Aether:**
- Interior walls reduce range by 3-6 dB (factor of 2-4 in distance)
- Exterior walls reduce range by 10-15 dB (factor of 10+ in distance)
- For through-wall experiments, increase TX power or reduce distance
- Consider material attenuation when planning experiment locations

---

## Future Work

### Follow-up Experiments
1. **Exp03b:** Measure attenuation of modern materials (aerogel, phase-change materials)
2. **Exp03c:** Test with different antenna polarizations
3. **Exp03d:** Measure diffraction around obstacles (knife-edge diffraction)
4. **Exp03e:** Test with moisture variation (wet vs. dry materials)

### Methodology Improvements
1. Use vector network analyzer for more accurate measurements
2. Implement automated material positioning system
3. Add temperature control for material testing
4. Develop standardized test fixtures for repeatability

### Theoretical Extensions
1. Model attenuation using complex dielectric constant
2. Calculate reflection and transmission coefficients
3. Compare with electromagnetic simulation (FDTD, FEM)
4. Develop empirical model for common construction assemblies

---

## References

1. ITU-R P.1238: Propagation data for indoor radio planning
2. IEEE 802.11 Channel Models (indoor office, residential)
3. Building material dielectric properties databases
4. Measurement of Wall Transmission Loss at 2.4 GHz (various papers)

---

## Safety Considerations

### Material Handling
1. Use proper lifting techniques for heavy materials (concrete, brick)
2. Wear safety glasses when cutting or handling materials
3. Handle glass with cut-resistant gloves
4. Ensure stable mounting of test materials

### RF Safety
1. Maintain distance from antennas (>10 cm)
2. Be aware of reflections from metal surfaces
3. Stop if interference with critical systems detected

---

## Data Files

*(Links to raw data files will be added after experiment)*

- `data/phase1_baseline.csv`
- `data/phase2_materials.csv`
- `data/phase3_thickness.csv`
- `data/phase4_frequency.csv`
- `data/phase5_oblique.csv`
- `data/phase6_layers.csv`
- `material_specs/` (photos and specifications)

---

## Revision History

| Date | Version | Changes | Author |
|------|---------|---------|--------|
| 2024-01-15 | 1.0 | Initial experiment design | RF Engineering Student |
| TBD | 1.1 | Add results and analysis | TBD |
