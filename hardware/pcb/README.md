# PCB Design

## Purpose

This directory contains PCB layout files, design rules, and fabrication documentation for Aether's custom printed circuit board.

## Design Overview

### Board Specifications

| Parameter | Value | Notes |
|-----------|-------|-------|
| **Layers** | 2 (Top + Bottom) | Cost-optimized for educational use |
| **Dimensions** | 50mm × 75mm | Compact handheld form factor |
| **Thickness** | 1.6mm | Standard FR4 thickness |
| **Via Size** | 0.2mm drill, 0.45mm pad | Standard manufacturing capability |
| **Trace Width** | 0.1mm minimum | Conservative for reliability |
| **Copper Weight** | 1oz (35µm) | Standard for low-power applications |

### Design Philosophy

**Educational Focus:**
- Large component spacing for hand assembly
- Clear silkscreen labeling for learning
- Test points on critical signals
- Modular layout for understanding signal flow

**Cost Optimization:**
- 2-layer design (vs. 4-layer for cost)
- Standard via sizes and trace widths
- Panelization-friendly dimensions
- Common PCB thickness and materials

**Performance Balance:**
- Adequate signal integrity for 16 MHz SPI
- Proper power distribution for NRF24 current spikes
- RF considerations without excessive cost

## Layer Stack-up

### 2-Layer Configuration

```
Layer 1 (Top):    Signal routing, component placement
                  ├─ ESP32 module and support components
                  ├─ NRF24 modules and RF traces
                  └─ Power distribution traces

Layer 2 (Bottom): Ground plane + power routing
                  ├─ Continuous ground plane (where possible)
                  ├─ Power supply routing
                  └─ Return paths for high-speed signals
```

### Signal Integrity Considerations

1. **SPI Trace Routing**
   - Keep HSPI and VSPI traces separated
   - Match trace lengths within ±2mm
   - Use 50Ω controlled impedance where critical
   - Minimize via count on high-speed signals

2. **Ground Plane Strategy**
   - Maximize continuous ground area on bottom layer
   - Use ground stitching vias around board perimeter
   - Separate analog and digital ground regions
   - Provide solid return paths under signal traces

3. **Power Distribution**
   - Wide traces for battery and 3.3V distribution
   - Star ground configuration from regulator
   - Dedicated power planes for NRF24 modules
   - Local decoupling at each IC

## Component Placement

### Placement Strategy

```
    [Antenna 1]     [ESP32]      [Antenna 2]
         │             │              │
    [NRF24 #1] ←─── [Power] ────→ [NRF24 #2]
         │         [Battery]          │
    [Decoupling]   [Charging]   [Decoupling]
```

### Critical Placement Rules

1. **NRF24L01+ Modules**
   - Minimum 15mm separation between modules
   - Orient away from each other to minimize coupling
   - Place 100µF decoupling capacitors within 5mm of VCC pins
   - Keep antenna connectors at board edges

2. **ESP32 Module**
   - Central location for equal trace lengths to both radios
   - Away from antenna areas to minimize interference
   - Access to programming pins at board edge
   - Thermal relief for heat dissipation

3. **Power Components**
   - Battery connector at board edge for easy access
   - Charging circuit near USB connector
   - Voltage regulator with thermal relief
   - Power switch accessible from enclosure

### Thermal Management

1. **Heat Sources**
   - ESP32: Moderate heat during operation
   - AMS1117 regulator: Primary heat source
   - NRF24 PA: Minimal heat at low power levels

2. **Thermal Relief**
   - Large copper areas under power components
   - Thermal vias connecting top and bottom layers
   - Component spacing for air circulation
   - Consider heat sink mounting for regulator

## Routing Guidelines

### High-Speed Signals (SPI)

1. **Trace Geometry**
   - Width: 0.15mm for 50Ω impedance (2-layer PCB)
   - Spacing: 3× trace width minimum between signals
   - Length matching: ±2mm for clock/data pairs
   - Via minimization: <2 vias per trace if possible

2. **Routing Priority**
   ```
   Priority 1: Clock signals (SCK)
   Priority 2: Chip select signals (CSN, CE)
   Priority 3: Data signals (MOSI, MISO)
   Priority 4: Power and ground connections
   Priority 5: Auxiliary signals (LED, switch)
   ```

### Power Routing

1. **Trace Widths**
   - Battery (3.7V): 1.0mm minimum
   - Regulated 3.3V: 0.8mm minimum
   - NRF24 supply: 0.5mm minimum
   - Ground connections: 0.8mm minimum

2. **Current Capacity**
   - 1oz copper, 0.5mm trace: ~1A continuous
   - 1oz copper, 1.0mm trace: ~2A continuous
   - Via current: ~0.5A per via (0.2mm drill)

### RF Considerations

1. **Antenna Routing**
   - 50Ω controlled impedance to antenna connectors
   - Minimize trace length from NRF24 to connector
   - Keep antenna traces away from digital signals
   - Use ground guard traces around RF paths

2. **EMI Mitigation**
   - Continuous ground plane under high-speed traces
   - Minimize loop areas in signal paths
   - Use ferrite beads on power supplies if needed
   - Proper component orientation to minimize coupling

## Design Rules Check (DRC)

### Minimum Design Rules

| Parameter | Value | Reason |
|-----------|-------|--------|
| **Trace Width** | 0.1mm | Manufacturing capability |
| **Trace Spacing** | 0.1mm | Manufacturing capability |
| **Via Drill** | 0.2mm | Standard drill size |
| **Via Pad** | 0.45mm | Adequate annular ring |
| **Pad to Pad** | 0.1mm | Component placement |
| **Silkscreen Width** | 0.15mm | Legibility |

### Preferred Design Rules

| Parameter | Value | Reason |
|-----------|-------|--------|
| **Trace Width** | 0.15mm | Better yield, easier inspection |
| **Trace Spacing** | 0.15mm | Reduced crosstalk |
| **Via Drill** | 0.25mm | Better reliability |
| **Via Pad** | 0.5mm | Larger annular ring |

## Fabrication Specifications

### Standard PCB Specification

```
Board Size: 50mm × 75mm
Layer Count: 2
Board Thickness: 1.6mm ±10%
Copper Weight: 1oz (35µm)
Surface Finish: HASL (Hot Air Solder Leveling)
Solder Mask: Green, both sides
Silkscreen: White, both sides
Min Trace/Space: 0.1mm/0.1mm
Min Via Size: 0.2mm drill / 0.45mm pad
```

### Recommended Suppliers

1. **JLCPCB (China)**
   - Cost: $2-5 for 5 pieces
   - Lead time: 2-5 days + shipping
   - Quality: Good for prototypes
   - Assembly: SMT assembly available

2. **PCBWay (China)**
   - Cost: $5-10 for 5 pieces
   - Lead time: 3-7 days + shipping
   - Quality: Higher quality control
   - Assembly: Full turnkey available

3. **OSH Park (USA)**
   - Cost: $10-15 for 3 pieces
   - Lead time: 8-12 days including shipping
   - Quality: Excellent, purple solder mask
   - Assembly: PCB only, no assembly

### Panelization

For volume production (25+ units):

```
Panel Size: 100mm × 80mm
Boards per Panel: 2 (1×2 arrangement)
Tab Width: 2mm
Breakaway Method: V-scoring or tab routing
Fiducials: 3 per panel (corners + center)
Tooling Holes: 4 corners, 2.5mm diameter
```

## Assembly Considerations

### Component Packages

| Component Type | Package | Pitch | Assembly Method |
|----------------|---------|-------|-----------------|
| ESP32 Module | Castellated | 1.27mm | Hand solder or reflow |
| NRF24L01+ | Pin header | 2.54mm | Hand solder |
| Passives | 0603 | - | Hand solder or reflow |
| Connectors | Through-hole | 2.54mm | Hand solder |
| Regulator | SOT-223 | 2.3mm | Hand solder or reflow |

### Assembly Sequence

1. **SMD Components** (if using reflow)
   - Apply solder paste using stencil
   - Place components with tweezers or pick-and-place
   - Reflow in oven or with hot air

2. **Through-Hole Components**
   - Insert components from top side
   - Solder from bottom side
   - Trim excess leads

3. **Modules and Connectors**
   - ESP32 module (if castellated)
   - NRF24L01+ modules
   - Antenna connectors
   - Battery connector

### Testing Points

Critical test points for assembly verification:

| Test Point | Signal | Expected Value |
|------------|--------|----------------|
| TP1 | Battery voltage | 3.0-4.2V |
| TP2 | Regulated 3.3V | 3.15-3.45V |
| TP3 | NRF24 #1 VCC | 3.15-3.45V |
| TP4 | NRF24 #2 VCC | 3.15-3.45V |
| TP5 | HSPI SCK | Clock signal |
| TP6 | VSPI SCK | Clock signal |

## Design Files

### File Structure

```
hardware/pcb/
├── aether-v1.0.kicad_pcb     # Main PCB layout file
├── aether-v1.0.sch           # Schematic file
├── aether.kicad_pro          # KiCad project file
├── gerbers/                  # Fabrication files
│   ├── aether-v1.0-F_Cu.gbr # Top copper layer
│   ├── aether-v1.0-B_Cu.gbr # Bottom copper layer
│   ├── aether-v1.0-F_Mask.gbr # Top solder mask
│   ├── aether-v1.0-B_Mask.gbr # Bottom solder mask
│   ├── aether-v1.0-F_SilkS.gbr # Top silkscreen
│   ├── aether-v1.0-B_SilkS.gbr # Bottom silkscreen
│   └── aether-v1.0-NPTH.drl # Non-plated holes
├── assembly/                 # Assembly documentation
│   ├── aether-v1.0-top.pdf  # Top assembly drawing
│   ├── aether-v1.0-bottom.pdf # Bottom assembly drawing
│   └── pick-and-place.csv   # Component placement data
└── 3d-models/               # 3D visualization
    ├── aether-v1.0-3d.step  # 3D model for mechanical
    └── renders/              # Rendered images
```

### Version History

| Version | Date | Changes | Status |
|---------|------|---------|--------|
| v1.0 | 2026-05-30 | Initial design | Current |
| v1.1 | TBD | Improved routing, test points | Planned |
| v2.0 | TBD | 4-layer design, optimized RF | Future |

## Related Documents

- [Schematics](../schematics/README.md) - Circuit design and component selection
- [BOM](../BOM.md) - Component specifications and sourcing
- [Assembly Guide](../../docs/assembly-guide.md) - Step-by-step build instructions
- [Pin Mapping](../../docs/pinout.md) - Signal connections and GPIO assignments
