# Aether Design Journal

## Introduction

This journal documents the design decisions, learning process, and evolution of Aether from initial concept to working prototype. Unlike typical project documentation that presents polished final results, this journal preserves the actual thought process, uncertainties, and iterative nature of building something new.

Aether started as a learning project, not an expert system. I'm a first-year ECE student trying to bridge the gap between textbook theory and real wireless hardware. This document is honest about what I knew, what I didn't know, and why I made the choices I made.

---

## Project Origin

### The Spark

The project started after watching a YouTube video demonstrating ESP32 and NRF24L01+ modules being used for RF experimentation. I didn't fully understand what was happening in the video, but something about seeing wireless signals being manipulated in real-time was fascinating.

I had taken an introductory circuits course and done some Arduino projects, but wireless communication felt like magic. How do antennas actually transmit information? How do devices on the same frequency not interfere with each other? How does frequency hopping work?

### The Motivation

I wasn't trying to become an RF expert overnight. I knew I'd be taking courses like Signal Processing, Communication Systems, and Wireless Networks in the future. I wanted to build something now that would make those courses easier to understand later.

The idea was simple: build a physical platform that lets me experiment with wireless concepts hands-on. When I eventually learn about modulation, propagation, or interference in class, I'll have hardware to test those concepts immediately.

### The Philosophy

I decided to follow a "Build First, Understand Deeper Later" approach. Rather than waiting until I understood every RF concept, I'd start building and learn the theory alongside the hardware. This meant accepting that:
- I'd make mistakes
- I'd have to iterate
- Some design choices would be suboptimal
- I'd learn more from building than from reading

This project is as much about the learning process as it is about the final hardware.

---

## Design Philosophy

### Learn by Building

Textbooks teach theory. YouTube teaches techniques. But neither teaches the intuition that comes from debugging a circuit at 2 AM when nothing works. Aether exists because I believe the best way to learn wireless communication is to build wireless communication systems.

### Build First, Optimize Later

Perfect is the enemy of done. Version 1.0 doesn't need to be optimal. It needs to work well enough to teach me something. I can always build v2.0 with the lessons learned from v1.0.

### Embrace Iteration

Every mistake is a learning opportunity. Every failed design is data. The goal isn't to avoid failure - it's to fail quickly, learn from it, and improve.

---

## Major Design Decisions

### Why ESP32?

**The Honest Answer:** I already had ESP32 boards.

I'd used them for previous Arduino projects, and they worked. When I started researching RF experimentation platforms, nearly every project I found used ESP32. The ecosystem was mature, documentation was abundant, and community support was strong.

**Did I consider alternatives?**

Not really. I looked briefly at STM32 and RP2040, but:
- STM32 felt more complex to set up
- RP2040 didn't have as many wireless examples
- Arduino Mega was too slow and used 5V logic

**What made ESP32 attractive:**
- Dual-core processor (seemed powerful enough)
- Multiple SPI peripherals (important for dual-radio design)
- Integrated WiFi and Bluetooth (useful for future experiments)
- 3.3V I/O (direct interface with NRF24)
- Flexible GPIO matrix
- Compact form factor
- Good balance of capability and cost (~$5-10)

**What I didn't know at the time:**
- How to use both cores effectively
- Whether 240 MHz was actually necessary
- How the SPI peripherals differed from each other
- What "flexible GPIO matrix" actually meant in practice

I chose ESP32 because it was practical, available, and had a low barrier to entry. That was enough.

### Why NRF24L01+?

**The Honest Answer:** The YouTube video used them.

When I started researching, NRF24L01+ modules appeared everywhere:
- Cheap (~$1-3 per module)
- Widely available
- Tons of tutorials
- Existing Arduino libraries
- Simple SPI interface

**Did I know about alternatives?**

Not initially. I later learned about:
- CC2500 (similar 2.4 GHz transceiver)
- nRF52840 (more capable, integrated MCU)
- SX127x family (LoRa, different use case)

But by then, I'd already ordered NRF24 modules and started learning the RF24 library.

**What I liked about NRF24:**
- 2.4 GHz ISM band (globally unlicensed)
- 126 channels (seemed like a lot)
- Configurable data rates and TX power
- Low cost meant I could buy extras without worry
- If I broke one, replacement was cheap

**What I didn't understand:**
- What "GFSK modulation" meant
- Why there were 126 channels but only 1 MHz spacing
- How this compared to WiFi or Bluetooth
- What "auto-acknowledgment" actually did

I chose NRF24 because it was accessible and had a low learning curve. I could start experimenting immediately without getting lost in datasheets.

### Why Dual NRF24 Modules?

**The Honest Answer:** It looked cooler.

Initially, the motivation was aesthetic. A single radio felt boring. Two radios with dual antennas looked more interesting, more capable, more like a "real" RF tool.

But as I researched, I found technical justification:
- **Independent operation:** Each radio on its own SPI bus
- **Simultaneous experiments:** Transmit on one, receive on another
- **Channel studies:** Test interference between channels
- **Protocol coexistence:** Simulate multiple devices

**The ESP32 advantage:**

ESP32 has two hardware SPI controllers (HSPI and VSPI). This meant I could control both radios independently without bus contention. I didn't fully understand what "bus contention" meant at first, but I knew it was bad.

**What I was thinking:**
- More radios = more experiments
- Dual antennas look professional
- If one radio breaks, I have a backup
- Future experiments might need simultaneous TX/RX

**What I wasn't thinking:**
- Power consumption doubles
- Firmware complexity increases
- Debugging two radios is harder than one
- Do I actually need simultaneous operation?

In hindsight, dual radios was probably overkill for v1.0. But it pushed me to learn about SPI bus management, GPIO allocation, and concurrent hardware control. The "unnecessary" complexity taught me more than a simple design would have.

### Why Battery Power?

**The Practical Answer:** I wanted it to be portable.

I envisioned Aether as something I could throw in my backpack and use anywhere:
- In the lab
- In the dorm
- Outside on the quad
- At a coffee shop

A USB cable tethering it to a laptop defeated that vision.

**The Learning Answer:** I wanted to design a battery-powered system.

I'd never integrated a rechargeable battery into a project before. This was an opportunity to learn:
- Li-ion battery characteristics
- Charging circuits (TP4056)
- Voltage regulation
- Power budgeting
- Battery protection

**Design goals:**
- Self-contained operation
- No external power bank
- Clean appearance (no cables)
- Easy to charge (USB input)
- Safe (overcharge/overdischarge protection)

**Component choices:**
- **Battery:** 18650 Li-ion cell (2000-3500 mAh)
  - Why? Cheap, available, good capacity
  - Downside: Bulky, requires holder
- **Charger:** TP4056 module
  - Why? Cheap, simple, includes protection
  - Downside: 1A charge current (slow)
- **Regulator:** AMS1117-3.3 LDO
  - Why? Simple, cheap, 1A output
  - Downside: Inefficient (linear regulator)

**What I didn't consider:**
- Buck converter for better efficiency
- Battery voltage monitoring
- Low-battery shutdown
- Sleep modes for extended runtime

Battery power made Aether feel like a real product, not just a breadboard experiment. It also forced me to think about power consumption, which is critical for any portable wireless device.

### Why No OLED Display?

**The Honest Answer:** I didn't want to deal with it yet.

An OLED display would be cool. It could show:
- Current channel
- TX power level
- Packet count
- Battery voltage

But adding a display meant:
- More power consumption
- More firmware complexity
- More cost
- More things to debug

For v1.0, I wanted to focus on getting the RF hardware working. Serial output to a laptop was good enough for initial experiments. If Aether proves useful, v2.0 can add a display.

**The minimalist philosophy:**

Every feature added is a feature that can break. Start minimal, add features incrementally. This keeps the project manageable and reduces the chance of getting overwhelmed.

---

## Learning Objectives

### What I Wanted to Learn

**RF Fundamentals:**
- How do antennas work?
- What is frequency hopping?
- How do signals propagate through space?
- What causes interference?

**Embedded Systems:**
- Multi-device SPI communication
- GPIO management
- Interrupt handling
- Power management

**Hardware Design:**
- PCB layout for RF circuits
- Power distribution
- Decoupling strategies
- Antenna placement

**Practical Skills:**
- Using a spectrum analyzer
- Debugging with a logic analyzer
- Measuring RF power
- Characterizing range and interference

### What I Didn't Know

At the start of this project, I had massive knowledge gaps:
- I didn't know what "GFSK modulation" meant
- I didn't know why 100µF capacitors were critical
- I didn't know how WiFi and Bluetooth coexisted
- I didn't know what "path loss" was
- I didn't know how to read a datasheet properly

**And that was okay.**

The point of Aether is to fill those gaps through hands-on experimentation. Every time something doesn't work, I learn something new. Every time I have to debug a problem, I understand the system better.

---

## Vision for Aether v1.0

### Design Goals

Aether v1.0 should be:
- **Compact:** Fits in a backpack
- **Affordable:** Total cost under $50
- **Portable:** Battery-powered, no cables
- **Practical:** Actually useful for experiments
- **Minimal:** No unnecessary features

### Planned Hardware

**Core Components:**
- ESP32-WROOM-32 development board
- 2× NRF24L01+ modules (PA+LNA variant for better range)
- 2× External antennas (RP-SMA connectors)
- 18650 Li-ion battery (2500 mAh)
- TP4056 charging module
- AMS1117-3.3 voltage regulator
- Slide switch (power on/off)
- Power LED (3mm, current-limited)

**What's NOT included in v1.0:**
- OLED display (adds complexity, power consumption, cost)
- SD card logging (can use serial output for now)
- GPS module (not needed for initial experiments)
- Multiple battery cells (single cell is simpler)

### The Philosophy

Aether v1.0 should feel like a purpose-built engineering tool, not a feature-packed development board. Every component should have a clear purpose. If a feature doesn't directly support RF experimentation or learning, it can wait for v2.0.

---

## Aether Design Principles

### 1. Learn by Building

**Principle:** The best way to understand wireless communication is to build wireless communication systems.

Reading about modulation is useful. Debugging why your modulated signal isn't being received is educational. Theory provides the map, but building provides the territory.

### 2. Simplicity Over Features

**Principle:** Start with the minimum viable design. Add features only when needed.

It's tempting to add every cool feature you can think of. But every feature is a potential failure point. Start simple, prove the concept, then iterate. A working simple design beats a broken complex one.

### 3. Portability Matters

**Principle:** A tool you can carry is a tool you'll actually use.

Aether should be something I can grab and use anywhere. Portability isn't just convenience - it enables spontaneous experimentation. If I see an interesting RF environment, I want to be able to test it immediately.

### 4. Educational Value First

**Principle:** Optimize for learning, not performance.

Aether isn't trying to be the best RF platform. It's trying to be the best learning platform. If a design choice makes the system easier to understand, that's more valuable than a 10% performance improvement.

### 5. Affordability Enables Accessibility

**Principle:** Keep costs low so others can build their own.

If Aether costs $500, only a few people will build it. If it costs $50, many more people can experiment with RF concepts. Affordability democratizes learning.

### 6. Function Before Complexity

**Principle:** Get it working first, optimize later.

Version 1.0 doesn't need to be perfect. It needs to work well enough to teach something. Once it works, you can measure, analyze, and improve. But you can't improve something that doesn't work at all.

### 7. Grow Through Iteration

**Principle:** Every version teaches you how to build the next version.

Aether v1.0 will have flaws. That's expected. The goal is to learn from those flaws and build a better v2.0. Embrace iteration as part of the design process.

---

## Future Revisions

### Lessons for v2.0

As I build v1.0, I'm keeping notes on what to improve:

**Hardware:**
- Custom PCB (eliminate breadboard fragility)
- Better antenna connectors (RP-SMA on PCB)
- Battery voltage monitoring (ADC input)
- Proper decoupling (100µF caps directly on PCB)
- Test points for debugging (SPI signals, power rails)

**Firmware:**
- Telemetry logging (timestamp, channel, RSSI)
- Serial command interface (configure without recompiling)
- Battery monitoring (warn before shutdown)
- Sleep modes (extend battery life)

**Features to Consider:**
- OLED display (if v1.0 proves useful)
- SD card logging (for long experiments)
- External LNA (for RSSI measurement)
- Rotary encoder (menu navigation)

### Long-Term Vision

If Aether proves valuable as a learning tool, future versions could:
- Support 5 GHz band (ESP32 + additional transceiver)
- Add GPS (outdoor propagation studies)
- Include IMU (orientation effects on signal)
- Support mesh networking (multi-node experiments)
- Integrate with GNU Radio (software-defined radio)

But all of that depends on whether v1.0 actually teaches me something useful.

---

## Reflection

### What This Project Is

Aether is a learning platform disguised as an RF tool. It's a way to make abstract wireless concepts tangible. It's a bridge between textbook theory and real-world systems.

### What This Project Isn't

Aether isn't trying to be:
- A commercial product
- A research-grade instrument
- The optimal RF platform
- A finished, polished system

It's a student project. It's messy, iterative, and imperfect. And that's exactly what makes it valuable for learning.

### Why Document This?

I'm documenting this design process because I wish more projects did. Most project documentation shows the final result, not the journey. It hides the mistakes, the dead ends, the moments of confusion.

But the journey is where the learning happens.

If someone else reads this and thinks "I could build that," then this documentation has succeeded. If they read this and think "I would have made different choices," even better - that means they're thinking critically about design tradeoffs.

### The Real Goal

The goal of Aether isn't to build the perfect RF platform. The goal is to learn enough about wireless communication that when I take Signal Processing, Communication Systems, and Wireless Networks courses, I'll have a mental model to hang the theory on.

If Aether helps me understand one concept more deeply, it's a success.

If it helps someone else learn too, even better.

---

## Acknowledgments

This project wouldn't exist without:
- The YouTube creator whose video sparked the idea
- The open-source community that documented ESP32 and NRF24
- The RF24 library maintainers
- Everyone who shared their RF experiments online

And to future me: I hope this project taught you something useful. If not, at least you learned what doesn't work.

---

*Last Updated: January 2024*  
*Status: v1.0 in progress*
