# Lessons Learned

## Purpose

This document records mistakes, failures, and unexpected challenges encountered during Aether development. The goal is to help future contributors avoid the same pitfalls and to document the iterative nature of hardware/firmware development.

---

## Hardware Mistakes

### Mistake 1: Insufficient Decoupling Capacitance

**What Happened:**
Initial breadboard prototype used only the ESP32 dev board's onboard decoupling (typically 10µF). NRF24 modules exhibited random initialization failures, SPI timeouts, and failed transmissions.

**Symptoms:**
- Serial output: "HP couldn't start !!!" or "SP couldn't start !!!"
- Intermittent operation (worked sometimes, failed other times)
- Worse behavior during simultaneous TX on both radios

**Root Cause:**
NRF24L01+ draws burst current up to 160 mA during PA ramp-up. PCB trace inductance caused VCC rail to droop below minimum operating voltage (1.9V).

**Solution:**
Added 100µF electrolytic capacitor directly at each NRF24 VCC pin (within 1 cm).

**Lesson:**
Always check datasheet for transient current requirements. "Typical" current draw is not the same as "peak" current draw. Oscilloscope measurement of power rails during operation is essential.

**Prevention:**
- Read datasheet section on power supply recommendations
- Use oscilloscope to measure VCC during TX bursts
- Start with more capacitance than you think you need

---

### Mistake 2: Long Jumper Wires on Breadboard

**What Happened:**
Used 20 cm jumper wires for SPI connections on breadboard. Experienced occasional SPI communication errors at 16 MHz clock speed.

**Symptoms:**
- Intermittent radio initialization failures
- Occasional corrupted register reads
- Worse with both radios active simultaneously

**Root Cause:**
Long wires have higher inductance and capacitance, causing signal integrity issues at high SPI clock speeds. Crosstalk between parallel wires exacerbated the problem.

**Solution:**
- Reduced jumper wire length to <10 cm
- Routed SPI signals away from each other (no parallel runs)
- Reduced SPI clock from 16 MHz to 10 MHz (temporary workaround)

**Lesson:**
Signal integrity matters, even at "low" frequencies like 16 MHz. Wire length, routing, and proximity all affect high-speed digital signals.

**Prevention:**
- Keep high-speed signal wires as short as possible
- Avoid parallel routing of SPI signals (especially CLK and MOSI)
- Use twisted pairs for differential signals
- Consider PCB for production (controlled impedance, ground plane)

---

### Mistake 3: Forgot to Disable ESP32 WiFi/Bluetooth

**What Happened:**
Initial firmware did not disable ESP32's built-in WiFi and Bluetooth. Observed unexpected interference patterns and higher power consumption.

**Symptoms:**
- Spectrum analyzer showed additional signals in 2.4 GHz band
- Battery life shorter than calculated
- Occasional ESP32 crashes (WiFi stack conflicts)

**Root Cause:**
ESP32 WiFi and Bluetooth are enabled by default. They share the 2.4 GHz band with NRF24 experiments, causing self-interference.

**Solution:**
Added to setup():
```cpp
esp_bt_controller_deinit();
esp_wifi_stop();
esp_wifi_deinit();
```

**Lesson:**
Disable unused peripherals, especially those that share spectrum with your experiment. Default configurations are not always optimal for specialized applications.

**Prevention:**
- Review all enabled peripherals during initialization
- Measure baseline power consumption before adding features
- Use spectrum analyzer to verify no unexpected emissions

---

### Mistake 4: Used 5V-Tolerant Logic Assumption

**What Happened:**
Initially considered using Arduino Mega (5V logic) with NRF24 (3.3V logic) without level shifters, assuming "5V-tolerant inputs."

**Why This Would Have Failed:**
NRF24L01+ datasheet specifies maximum VIH (input high voltage) = VCC + 0.3V = 3.6V. Applying 5V would exceed absolute maximum ratings and potentially damage the chip.

**Lesson:**
"5V-tolerant" is not universal. Always check datasheet for absolute maximum ratings. When in doubt, use level shifters or choose components with matching logic levels.

**Prevention:**
- Read "Absolute Maximum Ratings" section of datasheet first
- Use 3.3V microcontrollers for 3.3V peripherals (simpler, safer)
- If level shifting is required, use proper bidirectional level shifter (not just voltage divider)

---

## PCB Mistakes (Planned for v2.0)

### Anticipated Issue 1: Ground Plane Splits

**Concern:**
Splitting ground plane between digital (ESP32) and RF (NRF24) sections might seem like good practice to reduce noise coupling.

**Why This Is Wrong:**
Ground plane splits force return currents to take longer paths, increasing loop area and EMI. For 2.4 GHz signals, this can cause radiation and coupling issues.

**Correct Approach:**
- Use single, continuous ground plane
- Place decoupling capacitors close to ICs
- Route high-speed signals over solid ground (no splits)
- Use star grounding only for very low-frequency analog signals

**Reference:**
- Henry Ott, "Electromagnetic Compatibility Engineering" (2009)
- Howard Johnson, "High-Speed Digital Design" (1993)

---

### Anticipated Issue 2: Antenna Placement Near Ground Plane Edge

**Concern:**
Placing RP-SMA connector at PCB edge with ground plane extending underneath.

**Why This Matters:**
Ground plane affects antenna radiation pattern. For monopole antennas, ground plane acts as counterpoise. Insufficient ground plane size or incorrect placement can detune antenna and reduce efficiency.

**Correct Approach:**
- Provide adequate ground plane (at least λ/4 radius around antenna = 3 cm at 2.4 GHz)
- Keep high-speed digital signals away from antenna area
- Consider coplanar waveguide (CPW) for antenna feed line
- Simulate with HFSS or similar EM solver if possible

---

## RF Mistakes

### Mistake 5: Assumed All Channels Are Equal

**What Happened:**
Initial experiments used random channel selection (0-125) without considering WiFi occupancy.

**Observation:**
Channels 1-78 showed significantly more interference than channels 79-125 in typical indoor environment.

**Root Cause:**
WiFi channels 1, 6, and 11 (most commonly used) overlap with NRF24 channels 1-78. Channels 79-125 (2479-2525 MHz) are above WiFi band (2401-2473 MHz).

**Lesson:**
Spectrum is not uniform. Real-world environments have non-uniform channel occupancy. Always survey spectrum before selecting channels for experiments.

**Prevention:**
- Use spectrum analyzer or RTL-SDR to survey environment
- Implement channel occupancy detection in firmware
- Prefer channels with least interference for critical experiments

---

### Mistake 6: Ignored Antenna Polarization

**What Happened:**
During range testing, placed one Aether unit horizontal and another vertical. Observed 15-20 dB signal loss compared to both vertical.

**Root Cause:**
Antenna polarization mismatch. Vertical antenna transmits vertically polarized wave. Horizontal antenna receives horizontally polarized wave. Cross-polarization loss is ~20 dB.

**Lesson:**
Antenna orientation matters. For maximum signal strength, transmit and receive antennas must have matching polarization.

**Prevention:**
- Document antenna orientation in experiment notes
- Use antenna mounts that enforce consistent orientation
- Consider circular polarization for applications where orientation varies

---

## Firmware Bugs

### Bug 1: Integer Overflow in Channel Hopping

**What Happened:**
Used `byte` type for channel variable. Incrementing beyond 125 caused wraparound to 0, then continued incrementing, eventually writing invalid values to RF_CH register.

**Code:**
```cpp
byte ch = 120;
ch += 10;  // ch = 130, but byte wraps to 130 - 256 = -126 (interpreted as 130)
radio.setChannel(ch);  // Invalid channel
```

**Symptom:**
Radio stopped transmitting after reaching channel 125.

**Solution:**
Added bounds checking:
```cpp
if (ch > 125) ch = 125;
```

**Lesson:**
Always validate inputs to hardware registers. Invalid register values can cause undefined behavior.

**Prevention:**
- Use assertions or bounds checking for all hardware register writes
- Test edge cases (minimum, maximum, wraparound)
- Use larger data types (int instead of byte) if overflow is possible

---

### Bug 2: Forgot to Clear TX_DS Flag

**What Happened:**
In early packet transmission code, forgot to clear TX_DS (data sent) flag in STATUS register after each transmission.

**Symptom:**
First packet transmitted successfully. Subsequent packets failed silently.

**Root Cause:**
NRF24 requires TX_DS flag to be cleared before next transmission. If flag remains set, radio assumes previous transmission is still in progress.

**Solution:**
Added after each transmission:
```cpp
radio.write(&payload, sizeof(payload));
// Clear TX_DS flag
uint8_t status = radio.read_register(STATUS);
radio.write_register(STATUS, status | (1 << TX_DS));
```

**Lesson:**
Read datasheet section on register flags and clearing conditions. Hardware state machines have specific requirements for flag management.

**Prevention:**
- Read datasheet "Operational Modes" section carefully
- Use logic analyzer to verify SPI transactions match expected sequence
- Test multiple consecutive operations, not just single operation

---

## Power Issues

### Issue 1: Brownout During Simultaneous TX

**What Happened:**
When both radios transmitted simultaneously at maximum power, ESP32 occasionally reset with "Brownout detector was triggered" message.

**Root Cause:**
Total current draw: ESP32 (80 mA) + 2× NRF24 TX (160 mA each) = 400 mA peak. USB port current limit is typically 500 mA, but voltage drop in USB cable reduced available current.

**Solution:**
- Added 1000µF bulk capacitor across ESP32 VIN and GND
- Used external 5V power supply (2A capable) instead of USB
- Reduced TX power to RF24_PA_HIGH when USB powered

**Lesson:**
Calculate worst-case current draw, including transients. USB power is convenient but limited. Design for external power if current exceeds 300 mA.

**Prevention:**
- Measure actual current draw with multimeter or current probe
- Add bulk capacitance (1000µF+) for transient loads
- Provide external power option for high-current applications

---

## Testing Methodology Failures

### Failure 1: Didn't Document Experiment Conditions

**What Happened:**
Conducted range tests on different days. Results were inconsistent (30m one day, 50m another day).

**Root Cause:**
Failed to document environmental conditions:
- Indoor vs. outdoor
- Weather (rain affects 2.4 GHz propagation)
- Nearby WiFi activity
- Antenna orientation
- TX power setting

**Lesson:**
Reproducibility requires documenting all variables. Environmental factors significantly affect RF experiments.

**Prevention:**
- Create experiment template with required fields (location, weather, TX power, antenna, etc.)
- Take photos of setup
- Record spectrum analyzer screenshots
- Use version control for firmware (git commit hash in logs)

---

### Failure 2: Assumed Spectrum Analyzer Was Calibrated

**What Happened:**
Measured TX power with spectrum analyzer, got -10 dBm. Expected 0 dBm. Suspected hardware failure.

**Root Cause:**
Spectrum analyzer had 10 dB attenuator enabled. Displayed power was 10 dB lower than actual.

**Lesson:**
Always check test equipment settings before measurements. Verify calibration date. Use known reference signal when possible.

**Prevention:**
- Create test equipment checklist (attenuator off, calibration valid, correct units)
- Measure known reference signal first (e.g., WiFi router at known power)
- Document test equipment model and settings in experiment notes

---

## Future Improvements

Based on lessons learned, future versions should include:

1. **Firmware:**
   - Automatic channel occupancy detection
   - Real-time current monitoring (via INA219 sensor)
   - Experiment metadata logging (timestamp, git hash, settings)
   - Bounds checking on all register writes

2. **Hardware:**
   - Onboard current measurement shunt
   - LED indicators for TX/RX activity
   - Test points for oscilloscope probing
   - Proper PCB with controlled impedance

3. **Documentation:**
   - Experiment templates with required fields
   - Pre-flight checklist
   - Troubleshooting flowchart
   - Video tutorials for common tasks

4. **Testing:**
   - Automated test suite (unit tests for firmware)
   - Hardware-in-the-loop testing
   - Regression tests for known bugs

---

## Contributing Your Lessons

If you encounter issues not listed here, please contribute:

1. Document the problem, symptoms, root cause, and solution
2. Add to this file via pull request
3. Include photos, oscilloscope screenshots, or code snippets if helpful

Learning from failures is how we improve. Share your mistakes so others can avoid them.
