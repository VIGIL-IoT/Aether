# Aether Design Journal

## Purpose

This document records major engineering decisions made during the development of Aether. Each entry explains the problem, alternatives considered, and rationale for the chosen solution.

---

## Entry 1: Why ESP32?

**Date:** Initial design phase

**Problem:** Need a microcontroller capable of managing two independent SPI buses for dual NRF24L01+ operation.

**Alternatives Considered:**

1. **Arduino Mega 2560**
   - Pros: Familiar platform, plenty of GPIO
   - Cons: Single hardware SPI bus, 5V I/O requires level shifting, slower clock (16 MHz)
   
2. **STM32F4 (e.g., STM32F407)**
   - Pros: Multiple SPI buses, fast (168 MHz), excellent real-time performance
   - Cons: Steeper learning curve, less Arduino ecosystem support, more expensive
   
3. **ESP8266**
   - Pros: Low cost, WiFi capability, 3.3V I/O
   - Cons: Single hardware SPI bus (HSPI), limited GPIO, less processing power
   
4. **ESP32-WROOM-32** ✓
   - Pros: Dual hardware SPI (HSPI + VSPI), 240 MHz dual-core, 3.3V I/O, mature Arduino support, integrated WiFi/BT (can be disabled)
   - Cons: Slightly more expensive than ESP8266 (~$4 vs ~$2)

**Decision:** ESP32-WROOM-32

**Rationale:** The dual SPI buses are essential for true simultaneous radio operation. The ESP32's processing power allows for future features like real-time telemetry logging and mesh protocol implementation. The Arduino ecosystem support via ESP-IDF makes development accessible to students and makers.

---

## Entry 2: Why NRF24L01+?

**Date:** Initial design phase

**Problem:** Select 2.4 GHz transceiver for educational RF experimentation.

**Alternatives Considered:**

1. **ESP32 Built-in WiFi**
   - Pros: No external hardware needed, high data rate
   - Cons: Complex protocol stack, limited low-level control, can't easily implement custom modulation
   
2. **CC2500 (2.4 GHz transceiver)**
   - Pros: Similar capabilities to NRF24, good documentation
   - Cons: Less common, fewer Arduino libraries, harder to source
   
3. **RFM69HCW (433/915 MHz transceiver)**
   - Pros: Sub-GHz bands less crowded, better range
   - Cons: Different frequency band (not 2.4 GHz ISM), regional frequency variations
   
4. **NRF24L01+** ✓
   - Pros: Extremely common, well-documented, mature RF24 library, low cost ($1-3), 126 channels, configurable data rates, SPI interface
   - Cons: Limited TX power (0 dBm standard, +20 dBm with PA+LNA), no built-in frequency hopping

**Decision:** NRF24L01+

**Rationale:** The NRF24L01+ is the most accessible 2.4 GHz transceiver for educational purposes. The RF24 library provides register-level control while abstracting SPI complexity. The 2.4 GHz band is globally harmonized and crowded with WiFi/Bluetooth, making it ideal for studying interference and coexistence.

---

## Entry 3: Why Dual SPI Architecture?

**Date:** Initial design phase

**Problem:** Enable simultaneous transmission and reception on independent channels.

**Alternatives Considered:**

1. **Single SPI Bus with Time-Division Multiplexing**
   - Pros: Simpler wiring, fewer GPIO pins used
   - Cons: Cannot access both radios simultaneously, limits experiment types
   
2. **Software SPI (Bit-Banging) for Second Radio**
   - Pros: Can use any GPIO pins
   - Cons: Slower, CPU-intensive, unreliable at high speeds
   
3. **Dual Hardware SPI Buses** ✓
   - Pros: True simultaneous operation, no bus contention, hardware-accelerated
   - Cons: More complex wiring, uses more GPIO pins

**Decision:** Dual hardware SPI buses (HSPI + VSPI)

**Rationale:** The ability to operate both radios simultaneously is fundamental to Aether's educational mission. Experiments like "transmit on channel 10 while receiving on channel 50" or "measure interference radius with one radio while the other scans" require independent bus access. The ESP32's dual SPI controllers make this possible without performance compromise.

---

## Entry 4: Why Battery Powered?

**Date:** Initial design phase

**Problem:** Determine primary power source for portable operation.

**Alternatives Considered:**

1. **USB Power Only**
   - Pros: Simple, no battery management needed, unlimited runtime
   - Cons: Tethered to computer, limits mobility for range tests
   
2. **AA Battery Pack (4× AA = 6V)**
   - Pros: Easy to replace, no charging circuit needed
   - Cons: Requires voltage regulator, non-rechargeable (or expensive NiMH), bulky
   
3. **3.7V Li-ion with TP4056 Charger** ✓
   - Pros: Rechargeable, high energy density, single-cell simplicity, integrated charge controller
   - Cons: Requires protection circuit, fire risk if mishandled

**Decision:** 3.7V Li-ion (18650 cell) with TP4056 charge controller

**Rationale:** Portability is essential for distance testing and field experiments. Li-ion provides the best energy density (2500 mAh in 18650 form factor = ~23 hours runtime). The TP4056 module is inexpensive ($0.50) and includes overcharge protection. The 3.7V nominal voltage is close to the 3.3V rail, minimizing regulator dropout.

**Safety Consideration:** Added to documentation: proper Li-ion handling, protection circuit requirements, disposal procedures.

---

## Entry 5: Why 100µF Decoupling Capacitors?

**Date:** Early prototyping phase

**Problem:** NRF24L01+ modules failing to initialize, random SPI timeouts, inconsistent transmission.

**Initial Hypothesis:** Wiring error or defective modules.

**Investigation:**
- Verified wiring with multimeter (continuity test)
- Swapped NRF24 modules (problem persisted)
- Reduced SPI clock speed from 16 MHz to 10 MHz (slight improvement)
- Measured VCC rail with oscilloscope during TX burst

**Observation:** VCC drooped from 3.3V to 2.8V during transmission, lasting ~50 µs.

**Root Cause:** NRF24L01+ draws burst current up to 160 mA during PA ramp-up. PCB trace inductance and regulator response time cannot supply this transient demand fast enough.

**Solution Tested:**
- 10µF ceramic capacitor: Insufficient (still seeing 2.9V droop)
- 47µF electrolytic capacitor: Better (3.0V droop)
- 100µF electrolytic capacitor: Stable (3.2V droop, within tolerance)

**Decision:** Mandate 100µF electrolytic capacitor at each NRF24 VCC pin.

**Rationale:** The capacitor acts as a local charge reservoir, absorbing the transient current demand before it propagates back to the regulator. This is a hard requirement for reliable operation, not an optional improvement.

**Documentation Impact:** Added prominent warning in README, architecture.md, and setup-guide.md.

---

## Entry 6: Why Arduino Framework Instead of ESP-IDF?

**Date:** Initial design phase

**Problem:** Choose development framework for ESP32 firmware.

**Alternatives Considered:**

1. **ESP-IDF (Native Espressif Framework)**
   - Pros: Full hardware control, better performance, FreeRTOS integration
   - Cons: Steeper learning curve, more boilerplate code, less accessible to beginners
   
2. **Arduino Framework (ESP32 Arduino Core)** ✓
   - Pros: Familiar API, extensive library ecosystem (RF24, ezButton), faster prototyping
   - Cons: Slight performance overhead, abstracts some low-level details

**Decision:** Arduino framework via ESP32 Arduino Core

**Rationale:** Aether is an educational platform. The Arduino ecosystem lowers the barrier to entry for students and makers. The RF24 library is mature and well-documented in the Arduino context. Performance overhead is negligible for this application (channel hopping is limited by NRF24 PLL settling time, not CPU speed).

**Future Consideration:** May provide ESP-IDF version for advanced users who want FreeRTOS task management or lower-level control.

---

## Entry 7: Why Constant Carrier Mode?

**Date:** Firmware development phase

**Problem:** Need a simple way to verify RF transmission without implementing a receiver.

**Alternatives Considered:**

1. **Packet Transmission with Dummy Payload**
   - Pros: More realistic protocol behavior
   - Cons: Requires receiver to verify, harder to see on spectrum analyzer (bursty)
   
2. **Constant Carrier (Unmodulated CW)** ✓
   - Pros: Easy to verify with spectrum analyzer or RTL-SDR, continuous signal (easier to measure)
   - Cons: Violates FCC Part 15 hopping requirements (must use in shielded environment)

**Decision:** Implement constant carrier mode using `startConstCarrier()` function.

**Rationale:** For initial testing and educational demonstrations, constant carrier provides immediate visual feedback on spectrum analyzer. The regulatory limitation is acceptable because Aether is designed for laboratory use. Added prominent warnings in documentation about shielded environment requirement.

---

## Entry 8: Why RP-SMA Antenna Connectors?

**Date:** PCB design phase (planned for v2.0)

**Problem:** Choose antenna connection method for custom PCB.

**Alternatives Considered:**

1. **PCB Trace Antenna (Integrated)**
   - Pros: No external connector needed, lower cost, compact
   - Cons: Fixed radiation pattern, difficult to optimize, limited range
   
2. **U.FL Connector (Micro-Coax)**
   - Pros: Very compact, low cost
   - Cons: Fragile, requires adapter for standard antennas, limited mating cycles
   
3. **RP-SMA Connector** ✓
   - Pros: Robust, standard 2.4 GHz antennas widely available, many mating cycles
   - Cons: Larger footprint, slightly more expensive

**Decision:** RP-SMA connectors for external antennas (v2.0 PCB)

**Rationale:** Educational platform benefits from antenna experimentation (dipole, Yagi, patch, etc.). RP-SMA is the de facto standard for 2.4 GHz equipment. Robustness is important for repeated assembly/disassembly in classroom settings.

---

## Future Entries

As Aether evolves, document:
- PCB layout decisions (2-layer vs. 4-layer, ground plane strategy)
- Enclosure design choices (material, antenna placement, thermal management)
- Firmware architecture evolution (telemetry layer, mesh protocol)
- Component selection for production version (if applicable)

---

## Lessons for Future Projects

1. **Decoupling is not optional:** Always check datasheet for transient current requirements
2. **Dual SPI was worth the complexity:** Enabled experiments that would be impossible otherwise
3. **Arduino ecosystem accessibility:** Lowering barrier to entry increases educational impact
4. **Document as you go:** Easier to record decisions when context is fresh
5. **Regulatory compliance from day one:** Easier to design for compliance than retrofit
