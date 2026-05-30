# Aether Setup Guide

## Purpose

This guide walks through the complete process of building and programming Aether, from toolchain installation to first transmission. Assumes basic familiarity with Arduino IDE and command-line tools.

## Prerequisites

### Hardware Requirements

**Minimum (Breadboard Prototype):**
- ESP32 development board (ESP32-WROOM-32 or similar)
- 2× NRF24L01+ modules (standard or PA+LNA variant)
- 2× 100µF electrolytic capacitors (16V or higher)
- Breadboard and jumper wires
- USB cable (micro-USB or USB-C depending on ESP32 board)
- 3.7V Li-ion battery (optional, can power via USB)

**Recommended:**
- Logic analyzer (for debugging SPI communication)
- Multimeter (for power rail verification)
- Spectrum analyzer or RTL-SDR (for RF verification)
- External antennas with RP-SMA connectors

### Software Requirements

- **Arduino IDE** 1.8.19 or later (or Arduino IDE 2.x)
- **ESP32 Board Support** via Arduino Board Manager
- **RF24 Library** by TMRh20
- **ezButton Library** (for toggle switch support)
- **USB-to-Serial Driver** (CP210x or CH340, depending on ESP32 board)

**Operating System:** Windows, macOS, or Linux (tested on Ubuntu 22.04)

## Toolchain Installation

### Step 1: Install Arduino IDE

**Download:** https://www.arduino.cc/en/software

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install arduino
```

**macOS (Homebrew):**
```bash
brew install --cask arduino
```

**Windows:** Download installer from Arduino website.

### Step 2: Add ESP32 Board Support

1. Open Arduino IDE
2. Go to **File → Preferences**
3. In "Additional Board Manager URLs", add:
   ```
   https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
   ```
4. Go to **Tools → Board → Boards Manager**
5. Search for "esp32"
6. Install "esp32 by Espressif Systems" (version 2.0.x or later)

**Verify Installation:**
- Go to **Tools → Board → ESP32 Arduino**
- You should see "ESP32 Dev Module" and other ESP32 boards

### Step 3: Install Required Libraries

**Method 1: Library Manager (Recommended)**

1. Go to **Sketch → Include Library → Manage Libraries**
2. Search for "RF24" → Install "RF24 by TMRh20"
3. Search for "ezButton" → Install "ezButton by ArduinoGetStarted"

**Method 2: Manual Installation**

```bash
cd ~/Arduino/libraries/
git clone https://github.com/nRF24/RF24.git
git clone https://github.com/ArduinoGetStarted/ezButton.git
```

Restart Arduino IDE after manual installation.

### Step 4: Install USB Driver

**ESP32 boards use either CP210x or CH340 USB-to-serial chip.**

**Check which chip your board uses:**
- Look at the small IC near the USB connector
- Or try both drivers and see which works

**CP210x Driver:**
- Download from: https://www.silabs.com/developers/usb-to-uart-bridge-vcp-drivers

**CH340 Driver:**
- Download from: http://www.wch-ic.com/downloads/CH341SER_ZIP.html

**Linux:** Usually works out-of-box. If not:
```bash
sudo usermod -a -G dialout $USER
# Log out and back in
```

## Hardware Assembly

### Breadboard Wiring

**HSPI Bus (Radio #1):**
```
ESP32 Pin → NRF24 Pin
─────────────────────
GPIO 14   → SCK
GPIO 12   → MISO
GPIO 13   → MOSI
GPIO 15   → CSN
GPIO 16   → CE
3.3V      → VCC
GND       → GND
```

**VSPI Bus (Radio #2):**
```
ESP32 Pin → NRF24 Pin
─────────────────────
GPIO 18   → SCK
GPIO 19   → MISO
GPIO 23   → MOSI
GPIO 21   → CSN
GPIO 22   → CE
3.3V      → VCC
GND       → GND
```

**Critical: Decoupling Capacitors**

Place 100µF capacitor directly across VCC and GND pins of each NRF24 module:
- Positive leg → VCC
- Negative leg → GND
- Keep leads short (<2 cm)

**Optional: Toggle Switch**

Connect toggle switch between GPIO 33 and GND (internal pull-up enabled in firmware).

### Power Considerations

**USB Power:**
- ESP32 dev boards have onboard 3.3V regulator
- Sufficient for testing (both NRF24 modules draw ~30 mA total in RX mode)
- May brownout during simultaneous TX bursts (monitor serial output for resets)

**Battery Power:**
- Use 3.7V Li-ion cell with TP4056 charge controller
- Connect TP4056 output to ESP32 VIN pin (not 3.3V pin)
- ESP32 onboard regulator converts to 3.3V

**Warning:** Never connect >3.6V directly to ESP32 3.3V pin (bypasses regulator, will damage chip).

### Antenna Connection

**PCB Trace Antenna (Default):**
- No external connection needed
- Range: ~10-30 meters line-of-sight

**External Antenna:**
- If NRF24 module has RP-SMA connector, attach 2.4 GHz antenna
- Keep antenna vertical (perpendicular to ground plane)
- Do not operate without antenna (can damage PA)

## Firmware Upload

### Step 1: Open Example Sketch

1. Clone Aether repository:
   ```bash
   git clone https://github.com/shaxntanu/Aether.git
   cd Aether
   ```

2. Open `firmware/esp32/dual_radio_hopping.ino` in Arduino IDE

### Step 2: Configure Board Settings

Go to **Tools** menu and set:
- **Board:** "ESP32 Dev Module"
- **Upload Speed:** 921600
- **CPU Frequency:** 240 MHz
- **Flash Frequency:** 80 MHz
- **Flash Mode:** QIO
- **Flash Size:** 4MB (or match your board)
- **Partition Scheme:** "Default 4MB with spiffs"
- **Core Debug Level:** "None" (or "Info" for debugging)
- **Port:** Select your ESP32's serial port (e.g., COM3, /dev/ttyUSB0)

### Step 3: Compile and Upload

1. Click **Verify** (checkmark icon) to compile
2. Check for errors (common issues below)
3. Click **Upload** (arrow icon)
4. Wait for "Hard resetting via RTS pin..." message

**If upload fails:**
- Hold BOOT button on ESP32 while clicking Upload
- Release BOOT button when "Connecting..." appears
- Check USB cable (some cables are charge-only, no data)

### Step 4: Open Serial Monitor

1. Go to **Tools → Serial Monitor**
2. Set baud rate to **115200**
3. You should see:
   ```
   HP Started !!!
   SP Started !!!
   ```

**If you see "HP couldn't start !!!" or "SP couldn't start !!!":**
- Check wiring (especially CSN and CE pins)
- Verify 100µF capacitors are installed
- Measure 3.3V on NRF24 VCC pins with multimeter

## Verification Tests

### Test 1: SPI Communication

Both radios should initialize successfully. Serial output should show:
```
HP Started !!!
SP Started !!!
```

**If one radio fails:**
- Swap the two NRF24 modules (isolate bad module vs. bad wiring)
- Check solder joints on NRF24 pins
- Verify SPI signals with logic analyzer

### Test 2: Channel Hopping

With `dual_radio_hopping.ino` uploaded:
- Toggle switch LOW: Random channel hopping
- Toggle switch HIGH: Coordinated hopping (2-channel and 4-channel spacing)

**Verification:**
- Uncomment the `Serial.print()` lines in the `two()` function
- Recompile and upload
- Serial monitor should show channel numbers changing

### Test 3: RF Transmission (Requires Spectrum Analyzer)

1. Connect spectrum analyzer to 2.4 GHz antenna
2. Set center frequency: 2.450 GHz
3. Set span: 200 MHz (to see full 2.4 GHz band)
4. Set RBW: 1 MHz
5. Power on Aether
6. You should see a spike hopping across channels

**Without spectrum analyzer:**
- Use RTL-SDR with GQRX or SDR# software
- Or use another NRF24 module as receiver (requires separate sketch)

## Troubleshooting

### Problem: ESP32 Won't Connect

**Symptoms:** Arduino IDE shows "Connecting..." indefinitely

**Solutions:**
- Hold BOOT button during upload
- Try different USB cable
- Try lower upload speed (115200)
- Check USB driver installation
- Try different USB port

### Problem: Radio Initialization Fails

**Symptoms:** "HP couldn't start !!!" or "SP couldn't start !!!"

**Solutions:**
- Verify wiring (especially CSN and CE pins)
- Check 3.3V power rail with multimeter
- Install 100µF capacitors if missing
- Try lower SPI speed (change 16000000 to 10000000 in sketch)
- Test with single radio first (use `hspi_single_radio.ino`)

### Problem: Brownouts During TX

**Symptoms:** ESP32 resets randomly, "Brownout detector was triggered" in serial output

**Solutions:**
- Add bulk capacitance (470µF or 1000µF) across ESP32 VIN and GND
- Use external power supply (not USB)
- Reduce TX power (change RF24_PA_MAX to RF24_PA_HIGH)

### Problem: No RF Output

**Symptoms:** Spectrum analyzer shows no signal

**Solutions:**
- Verify antenna is connected (or PCB antenna is intact)
- Check TX power setting (should be RF24_PA_MAX)
- Verify channel is within spectrum analyzer span
- Try constant carrier mode (easier to see than hopping)
- Check NRF24 module with multimeter (should draw 11-160 mA during TX)

### Problem: Interference with WiFi

**Symptoms:** WiFi networks drop or slow down when Aether is powered on

**Solutions:**
- Operate in shielded enclosure (Faraday cage)
- Reduce TX power
- Use channels 79-125 (less WiFi overlap)
- Maintain distance from WiFi routers (>5 meters)

## Next Steps

### Experiment Ideas

1. **Range Test:** Measure maximum distance for reliable communication
2. **Wall Attenuation:** Compare signal strength indoor vs. outdoor
3. **Interference Study:** Operate near WiFi router, measure packet loss
4. **Channel Occupancy:** Map which channels are busy in your environment

### Firmware Modifications

1. **Custom Hopping Pattern:** Edit channel array in `custom_channel_hopping.ino`
2. **Telemetry Logging:** Add SD card module, log channel and timestamp
3. **OLED Display:** Add I2C OLED, show current channel and packet count
4. **Receiver Mode:** Implement packet reception and RSSI measurement

### Hardware Upgrades

1. **PCB Design:** Create custom PCB integrating ESP32 and NRF24 modules
2. **Enclosure:** 3D print case with antenna mounts
3. **Battery Monitoring:** Add voltage divider to measure battery level
4. **External LNA:** Add low-noise amplifier for better RX sensitivity

## Safety Reminders

- Operate only in controlled environments (lab, Faraday cage)
- Check local RF regulations before transmitting
- Start with low TX power, increase only if needed
- Monitor for unintended interference
- Stop immediately if interference detected

## References

- Arduino ESP32 Documentation: https://docs.espressif.com/projects/arduino-esp32/
- RF24 Library Documentation: https://nrf24.github.io/RF24/
- ESP32 Pinout Reference: https://randomnerdtutorials.com/esp32-pinout-reference-gpios/
- NRF24L01+ Datasheet: https://www.nordicsemi.com/products/nrf24l01

## Future Work

- Add PlatformIO setup instructions (alternative to Arduino IDE)
- Document logic analyzer setup for SPI debugging
- Create video tutorial for hardware assembly
- Add automated test suite for firmware validation
