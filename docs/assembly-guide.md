# Assembly Guide

## Purpose

This guide provides step-by-step instructions for assembling Aether hardware, from breadboard prototype to custom PCB installation.

## Prerequisites

### Tools Required
- Soldering iron (temperature controlled, 350°C)
- Solder (60/40 rosin core, 0.8mm diameter)
- Wire strippers and cutters
- Multimeter with continuity testing
- Breadboard (830 tie points minimum)
- Jumper wires (male-to-male, various lengths)
- Heat shrink tubing (optional, for wire management)

### Components
See [Bill of Materials](../hardware/BOM.md) for complete component list and sourcing information.

## Assembly Methods

### Method 1: Breadboard Prototype (Recommended for Beginners)

**Advantages:**
- No soldering required for initial testing
- Easy to modify connections
- Quick to assemble and debug
- Ideal for learning and experimentation

**Disadvantages:**
- Less reliable connections
- Larger physical footprint
- Not suitable for portable use

#### Step 1: Power System Setup

1. **Install TP4056 Module**
   - Place TP4056 on breadboard
   - Connect 18650 battery holder to B+ and B- pads
   - Verify charging LED behavior (red = charging, blue = complete)

2. **Add Voltage Regulation**
   - Install AMS1117-3.3 regulator
   - Connect TP4056 OUT+ to regulator VIN
   - Connect TP4056 OUT- to regulator GND
   - Verify 3.3V output with multimeter

3. **Power Distribution**
   - Create 3.3V and GND rails on breadboard
   - Add slide switch between battery and TP4056 for power control
   - Install power LED with 330Ω current limiting resistor

#### Step 2: ESP32 Installation

1. **Mount ESP32 Development Board**
   - Place ESP32 board on breadboard
   - Connect 3.3V rail to ESP32 VIN pin
   - Connect GND rail to ESP32 GND pin
   - Verify power-on (onboard LED should illuminate)

#### Step 3: NRF24 Module Installation

1. **Install 100µF Decoupling Capacitors**
   - **CRITICAL:** Install capacitors BEFORE connecting NRF24 modules
   - Place one 100µF capacitor near each NRF24 mounting location
   - Connect positive terminal to 3.3V rail
   - Connect negative terminal to GND rail
   - Keep leads as short as possible (<2cm)

2. **Mount NRF24 Modules**
   - Place both NRF24L01+ modules on breadboard
   - Ensure adequate spacing (minimum 5 holes between modules)
   - Orient modules with pin 1 (GND) clearly identified

3. **Power Connections**
   - Connect each NRF24 VCC (pin 2) to 3.3V rail
   - Connect each NRF24 GND (pin 1) to GND rail
   - Verify 3.3V at each module with multimeter

#### Step 4: SPI Wiring

**HSPI Bus (Radio #1):**
```
ESP32 Pin → NRF24 Pin
GPIO 14   → Pin 5 (SCK)
GPIO 12   → Pin 7 (MISO)
GPIO 13   → Pin 6 (MOSI)
GPIO 15   → Pin 4 (CSN)
GPIO 16   → Pin 3 (CE)
```

**VSPI Bus (Radio #2):**
```
ESP32 Pin → NRF24 Pin
GPIO 18   → Pin 5 (SCK)
GPIO 19   → Pin 7 (MISO)
GPIO 23   → Pin 6 (MOSI)
GPIO 21   → Pin 4 (CSN)
GPIO 22   → Pin 3 (CE)
```

**Wiring Tips:**
- Use different colored wires for each signal type
- Keep wire lengths under 10cm to minimize signal integrity issues
- Route power and signal wires separately
- Double-check connections with multimeter continuity test

#### Step 5: Antenna Installation

1. **Remove Onboard Antennas (if present)**
   - Some NRF24 modules have PCB trace antennas
   - These should be disconnected when using external antennas
   - Check module documentation for antenna selection jumpers

2. **Connect External Antennas**
   - Attach RP-SMA antennas to antenna connectors
   - Ensure secure connection (hand-tight, do not over-torque)
   - Position antennas for optimal radiation pattern

### Method 2: Custom PCB Assembly

**Prerequisites:**
- PCB fabrication completed (see [PCB Design](../hardware/pcb/README.md))
- Surface-mount soldering experience recommended
- Reflow oven or hot air station for SMD components

#### Component Placement Order

1. **SMD Components First**
   - Resistors and capacitors (smallest first)
   - Voltage regulator IC
   - Decoupling capacitors (critical placement)

2. **Through-Hole Components**
   - ESP32 module socket (if using socketed design)
   - NRF24 module sockets
   - Battery connector
   - Power switch
   - Status LED

3. **Mechanical Components**
   - RP-SMA antenna connectors
   - Enclosure mounting hardware

#### Critical Assembly Notes

1. **Decoupling Capacitor Placement**
   - Must be within 5mm of NRF24 VCC pins
   - Use shortest possible traces
   - Verify capacitor polarity (electrolytic types)

2. **Ground Plane Integrity**
   - Ensure continuous ground plane under RF sections
   - Minimize via count in RF signal paths
   - Use ground stitching vias around board perimeter

3. **Antenna Connector Orientation**
   - Mount RP-SMA connectors perpendicular to PCB
   - Ensure adequate clearance for antenna rotation
   - Verify 50Ω impedance matching

## Testing and Verification

### Power System Test

1. **Battery Voltage Check**
   ```
   Expected: 3.0V - 4.2V (depending on charge state)
   Measure: Battery terminals with multimeter
   ```

2. **Regulated Voltage Check**
   ```
   Expected: 3.15V - 3.45V
   Measure: 3.3V rail with multimeter
   ```

3. **Current Consumption Test**
   ```
   Expected: <100mA idle, <300mA peak transmission
   Measure: In series with battery positive terminal
   ```

### SPI Communication Test

1. **Load Test Firmware**
   ```cpp
   // Use firmware/esp32/hspi_single_radio.ino for initial testing
   // This tests one radio at a time to isolate issues
   ```

2. **Verify SPI Signals**
   - Use logic analyzer or oscilloscope
   - Check for clean clock signals on SCK pins
   - Verify CSN pulses during transactions
   - Confirm MOSI/MISO data transitions

3. **Radio Detection Test**
   ```cpp
   // Firmware should report successful radio initialization
   // Check serial monitor for "Radio 1 OK" and "Radio 2 OK" messages
   ```

### RF Performance Test

1. **Basic Transmission Test**
   - Load dual_radio_hopping.ino firmware
   - Monitor serial output for packet statistics
   - Verify transmission on both radios

2. **Range Test**
   - Start with antennas 1 meter apart
   - Gradually increase distance
   - Monitor packet success rate vs. distance

3. **Interference Test**
   - Enable WiFi on nearby devices
   - Observe packet loss correlation with WiFi activity
   - Test different channel configurations

## Troubleshooting

### Common Issues

1. **No Power**
   - Check battery charge level
   - Verify switch position
   - Test continuity of power connections
   - Confirm regulator output voltage

2. **SPI Communication Failure**
   - Verify 100µF capacitors are installed
   - Check all SPI wire connections
   - Test with single radio first
   - Use logic analyzer to verify signal integrity

3. **Intermittent Operation**
   - Usually indicates power supply issues
   - Check capacitor ESR and placement
   - Verify ground connections
   - Monitor supply voltage during transmission

4. **Poor RF Performance**
   - Check antenna connections
   - Verify antenna orientation
   - Test in different physical locations
   - Check for nearby interference sources

### Debug Procedures

1. **Systematic Testing**
   - Test power system first
   - Verify single radio operation before dual-radio
   - Use known-good components for comparison
   - Document all measurements and observations

2. **Signal Analysis**
   - Use logic analyzer for SPI debugging
   - Monitor power rails with oscilloscope
   - Check RF output with spectrum analyzer (if available)

## Safety Considerations

### Electrical Safety
- Always disconnect power before making wiring changes
- Use proper ESD precautions when handling components
- Verify polarity before connecting battery
- Never short-circuit battery terminals

### RF Safety
- Operate within legal power limits (<100mW EIRP)
- Use appropriate antennas for frequency band
- Avoid continuous transmission at maximum power
- Respect local RF regulations and spectrum allocations

### Battery Safety
- Use quality Li-ion cells from reputable manufacturers
- Never exceed 4.2V charging voltage
- Monitor battery temperature during charging
- Implement proper charge termination

## Next Steps

After successful assembly:

1. **Firmware Development**
   - Explore different transmission modes
   - Implement custom protocols
   - Add data logging capabilities

2. **Experiment Design**
   - Try structured experiments from [experiments/](../experiments/)
   - Design custom RF propagation studies
   - Analyze protocol coexistence scenarios

3. **Hardware Modifications**
   - Add OLED display for status information
   - Implement SD card logging
   - Design custom enclosure

## Related Documents

- [Pin Mapping](pinout.md) - Detailed connection diagrams
- [Power Budget](power-budget.md) - Current consumption analysis
- [Setup Guide](setup-guide.md) - Software toolchain installation
- [BOM](../hardware/BOM.md) - Component specifications and sourcing