# RF Theory and 2.4 GHz Band Analysis

## Purpose

This document provides the RF theory foundation needed to understand Aether's operation, including frequency allocation, modulation, interference mechanisms, and propagation characteristics in the 2.4 GHz ISM band.

## The 2.4 GHz ISM Band

### Frequency Allocation

The 2.4 GHz Industrial, Scientific, and Medical (ISM) band is a globally harmonized unlicensed spectrum allocation:

- **Frequency Range:** 2.400-2.4835 GHz (83.5 MHz bandwidth)
- **ITU Region 1 (Europe, Africa):** 2.400-2.4835 GHz
- **ITU Region 2 (Americas):** 2.400-2.4835 GHz  
- **ITU Region 3 (Asia, Oceania):** 2.400-2.4835 GHz

### Why 2.4 GHz?

**Historical Context:**
- Originally allocated for industrial heating, medical diathermy, and microwave ovens
- Unlicensed use permitted because interference from ISM equipment was expected
- First wireless data use: 1985 FCC ruling allowing spread spectrum in ISM bands

**Technical Advantages:**
- Wavelength λ = c/f = 12.5 cm (practical antenna sizes)
- Propagates through walls better than 5 GHz
- Global harmonization (single design works worldwide)
- Mature, low-cost RF components

**Disadvantages:**
- Extremely crowded (WiFi, Bluetooth, Zigbee, cordless phones, baby monitors, etc.)
- Interference from microwave ovens (2.45 GHz magnetron frequency)
- Limited bandwidth compared to 5 GHz WiFi

## NRF24L01+ Channel Mapping

The NRF24L01+ divides the 2.4 GHz band into 126 channels:

```
Channel Number:  0      1      2    ...   125
Frequency (MHz): 2400   2401   2402  ...  2525
```

**Formula:** `f_channel = 2400 MHz + (channel × 1 MHz)`

### Overlap with WiFi

WiFi 802.11b/g/n uses 22 MHz wide channels in 2.4 GHz:

```
WiFi Ch 1:  2401-2423 MHz (center: 2412 MHz) → NRF24 Ch 1-23
WiFi Ch 6:  2426-2448 MHz (center: 2437 MHz) → NRF24 Ch 26-48
WiFi Ch 11: 2451-2473 MHz (center: 2462 MHz) → NRF24 Ch 51-73
```

**Implication:** NRF24 channels 0-78 overlap with WiFi. Channels 79-125 (2479-2525 MHz) have less WiFi interference but may exceed regulatory limits in some countries (e.g., Japan limits to 2.497 GHz).

### Overlap with Bluetooth

Bluetooth Classic uses 79 channels @ 1 MHz spacing (2402-2480 MHz) with frequency hopping.

Bluetooth Low Energy (BLE) uses 40 channels @ 2 MHz spacing:
- **Advertising channels:** 37 (2402 MHz), 38 (2426 MHz), 39 (2480 MHz)
- **Data channels:** 0-36 (2404-2478 MHz, excluding advertising channels)

**Implication:** BLE advertising channels map to NRF24 channels 2, 26, and 80. Interfering with these disrupts BLE device discovery.

## Modulation and Data Rates

### NRF24L01+ Modulation

The NRF24 uses **Gaussian Frequency Shift Keying (GFSK)**:
- Binary 1: Frequency deviation +160 kHz
- Binary 0: Frequency deviation -160 kHz
- Gaussian filter reduces spectral sidelobes

**Data Rates:**
- 250 kbps: Narrower bandwidth, better sensitivity, longer range
- 1 Mbps: Balanced performance (default)
- 2 Mbps: Wider bandwidth, lower sensitivity, higher throughput

**Occupied Bandwidth:**
- 250 kbps: ~1 MHz
- 1 Mbps: ~1 MHz  
- 2 Mbps: ~2 MHz

### Constant Carrier Mode

When `startConstCarrier()` is called, the NRF24 transmits an unmodulated carrier (no data, no frequency deviation). This is useful for:
- Measuring interference radius
- Characterizing channel occupancy
- Testing receiver sensitivity

**Warning:** Constant carrier violates FCC Part 15 frequency hopping requirements. Use only in shielded environments.

## Propagation Characteristics

### Free Space Path Loss (FSPL)

In ideal conditions (no obstacles), signal strength decreases with distance:

```
FSPL (dB) = 20 log₁₀(d) + 20 log₁₀(f) + 32.45
```

Where:
- d = distance in kilometers
- f = frequency in MHz

**At 2.4 GHz:**
```
FSPL (dB) = 20 log₁₀(d_km) + 100
```

**Example:** At 10 meters (0.01 km):
```
FSPL = 20 log₁₀(0.01) + 100 = -40 + 100 = 60 dB
```

### Real-World Attenuation

Obstacles introduce additional loss:

| Material | Thickness | Attenuation @ 2.4 GHz |
|----------|-----------|----------------------|
| Air | - | 0 dB |
| Drywall | 10 cm | 3-5 dB |
| Wood | 5 cm | 4-6 dB |
| Brick | 10 cm | 6-10 dB |
| Concrete | 15 cm | 10-15 dB |
| Metal | Any | 50-100 dB (reflection) |
| Human body | 20 cm | 20-30 dB (water absorption) |

**Water Absorption:** The 2.4 GHz band is near the 2.45 GHz water resonance frequency. Human bodies (60% water) significantly attenuate signals.

### Fresnel Zones

For line-of-sight links, the Fresnel zone must be clear of obstacles:

```
r = √(n × λ × d₁ × d₂ / (d₁ + d₂))
```

Where:
- n = Fresnel zone number (1st zone is most critical)
- λ = wavelength (12.5 cm at 2.4 GHz)
- d₁, d₂ = distances from obstacle to transmitter and receiver

**Rule of Thumb:** Keep 60% of the 1st Fresnel zone clear for reliable links.

## Interference Mechanisms

### Co-Channel Interference

Two transmitters on the same frequency cause destructive interference:
- Signals add vectorially (phase matters)
- Receiver sees corrupted waveform
- Packet errors increase

**Mitigation:**
- Time-division multiplexing (take turns)
- Frequency-division multiplexing (use different channels)
- Spread spectrum (both transmitters hop)

### Adjacent-Channel Interference

Transmitters on nearby channels can interfere due to:
- Spectral sidelobes (GFSK is not perfectly band-limited)
- Receiver filter roll-off (finite selectivity)

**NRF24 Adjacent-Channel Rejection:**
- 1 MHz spacing: ~6 dB rejection (poor)
- 2 MHz spacing: ~18 dB rejection (moderate)
- 5 MHz spacing: >40 dB rejection (good)

**Recommendation:** Use ≥2 MHz channel spacing for simultaneous operation.

### Intermodulation

When two strong signals mix in a nonlinear device (amplifier, mixer), they create spurious products:

```
f_im = m × f₁ ± n × f₂
```

**Example:** WiFi on 2437 MHz + Bluetooth on 2450 MHz:
```
3rd-order intermod: 2 × 2437 - 2450 = 2424 MHz
```

This can interfere with channels not directly occupied by either signal.

## Frequency Hopping Spread Spectrum (FHSS)

### Concept

Instead of transmitting on a single channel, hop rapidly across multiple channels in a pseudorandom sequence. Interference affects only a fraction of packets.

**Advantages:**
- Resistance to narrowband interference
- Resistance to multipath fading (frequency diversity)
- Multiple users can share spectrum (different hop sequences)

**Disadvantages:**
- Requires time synchronization between transmitter and receiver
- Increased complexity
- Regulatory requirements (FCC: ≥15 channels, <0.4s dwell time)

### Bluetooth FHSS

Bluetooth Classic hops at 1600 hops/second (625 µs per channel):
- 79 channels (2402-2480 MHz)
- Adaptive Frequency Hopping (AFH) avoids occupied channels
- Master-slave synchronization via clock

### Aether FHSS Implementation

Current firmware implements simple hopping patterns:
- Sequential sweep (0 → 125)
- Bidirectional sweep (0 → 125 → 0)
- Random hopping
- User-defined channel list

**Limitation:** No receiver synchronization (transmit-only experiments).

**Future Work:** Implement synchronized hopping with packet timestamps.

## Antenna Theory

### Dipole Antenna

The NRF24L01+ modules typically use:
- PCB trace antenna (integrated, 0 dBi gain)
- External wire antenna (1/4 wave monopole, ~2 dBi gain)
- RP-SMA connector for external antenna

**Quarter-Wave Monopole Length:**
```
L = λ/4 = (c/f)/4 = (3×10⁸ m/s / 2.4×10⁹ Hz) / 4 = 3.1 cm
```

### Antenna Gain

Gain (dBi) measures directivity relative to isotropic radiator:
- 0 dBi: Omnidirectional (equal radiation in all directions)
- 2 dBi: Slight directivity (typical dipole)
- 5 dBi: Moderate directivity (Yagi antenna)
- 10+ dBi: High directivity (parabolic dish)

**EIRP Calculation:**
```
EIRP (dBm) = TX Power (dBm) + Antenna Gain (dBi) - Cable Loss (dB)
```

**Example:** NRF24 at +20 dBm with 2 dBi antenna:
```
EIRP = 20 + 2 - 0 = 22 dBm (158 mW)
```

### Polarization

Antennas have polarization (orientation of electric field):
- Vertical: Wire perpendicular to ground
- Horizontal: Wire parallel to ground
- Circular: Rotating electric field

**Polarization Mismatch Loss:** Vertical antenna transmitting to horizontal antenna: ~20 dB loss.

**Recommendation:** Keep all Aether antennas in same orientation.

## Receiver Sensitivity

### Definition

Minimum signal strength required for successful packet reception at a given error rate (typically 1% PER).

**NRF24L01+ Sensitivity:**
- 250 kbps: -94 dBm
- 1 Mbps: -90 dBm
- 2 Mbps: -82 dBm

**Interpretation:** At 2 Mbps, receiver needs 100× stronger signal than at 250 kbps.

### Link Budget

Calculate maximum range:

```
RX Power (dBm) = TX Power (dBm) + TX Gain (dBi) - Path Loss (dB) + RX Gain (dBi)
```

**Example:** 
- TX: +20 dBm, 2 dBi antenna
- RX: -82 dBm sensitivity, 2 dBi antenna
- Path loss at 10m: 60 dB

```
RX Power = 20 + 2 - 60 + 2 = -36 dBm
```

Margin: -36 - (-82) = 46 dB (excellent link)

## Spectrum Analyzer Interpretation

When viewing 2.4 GHz band on spectrum analyzer:

- **Noise floor:** Baseline power level (~-90 to -100 dBm)
- **WiFi signals:** 22 MHz wide, -30 to -50 dBm, bursty
- **Bluetooth:** 1 MHz wide, hopping rapidly, -40 to -60 dBm
- **Microwave oven:** Broadband noise, 2440-2460 MHz, -20 to -40 dBm when active
- **Aether constant carrier:** Single spike, 1 MHz wide, power depends on TX setting

## Experimental Questions

Aether enables hands-on exploration of:

1. **How does distance affect packet loss?** (measure RSSI vs. range)
2. **How much does a wall attenuate 2.4 GHz?** (compare indoor/outdoor)
3. **Can two NRF24 modules communicate while WiFi is active?** (interference testing)
4. **What channel spacing prevents adjacent-channel interference?** (sweep spacing)
5. **How does human body affect signal?** (stand between TX and RX)

## References

- IEEE 802.11-2020: Wireless LAN Standard
- Bluetooth Core Specification v5.3
- NRF24L01+ Product Specification v1.0 (Nordic Semiconductor)
- ITU Radio Regulations, Article 5 (Frequency Allocations)
- Friis Transmission Equation (1946)
- Rappaport, "Wireless Communications: Principles and Practice" (2002)

## Future Work

- Measure actual NRF24 spectral mask with spectrum analyzer
- Characterize adjacent-channel rejection experimentally
- Map RSSI vs. distance in different environments
- Document interference patterns from common 2.4 GHz devices
