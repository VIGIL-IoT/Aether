# Aether Protocol Specification (Draft)

## Status

**DRAFT** - This protocol is not yet implemented. This document serves as a design specification for future development.

## Purpose

Define a lightweight protocol layer for Aether that enables:
- Multi-node communication
- Synchronized channel hopping
- Telemetry collection
- Mesh networking experiments
- Time-stamped packet logging

## Design Goals

1. **Simplicity:** Minimal overhead, easy to implement on resource-constrained devices
2. **Flexibility:** Support various experiment types (point-to-point, broadcast, mesh)
3. **Observability:** Include metadata for analysis (timestamps, RSSI, sequence numbers)
4. **Extensibility:** Allow future additions without breaking compatibility

## Non-Goals

- High-throughput data transfer (use WiFi instead)
- Encryption/authentication (educational platform, not production system)
- Guaranteed delivery (focus on observing RF behavior, not reliable transport)

---

## Packet Format

### Basic Packet Structure

```
┌─────────────┬──────────────┬─────────────┬──────────────┬─────────┐
│   Preamble  │    Header    │   Payload   │   Metadata   │   CRC   │
│   (1 byte)  │  (4 bytes)   │  (0-28 B)   │   (2 bytes)  │ (2 B)   │
└─────────────┴──────────────┴─────────────┴──────────────┴─────────┘
```

**Total Packet Size:** 9-37 bytes (within NRF24 32-byte FIFO limit)

### Preamble (1 byte)

```
┌───────────────────────────────────────┐
│  0xA5  (10100101)                     │
└───────────────────────────────────────┘
```

**Purpose:** Packet synchronization and identification

**Value:** 0xA5 (chosen for balanced 1s and 0s, easy to detect)

### Header (4 bytes)

```
Byte 0: Node ID (8 bits)
Byte 1: Packet Type (4 bits) | Flags (4 bits)
Byte 2-3: Sequence Number (16 bits)
```

**Node ID (8 bits):**
- 0x00: Broadcast (all nodes)
- 0x01-0xFE: Individual node addresses
- 0xFF: Reserved

**Packet Type (4 bits):**
- 0x0: Beacon (node announcement)
- 0x1: Data (user payload)
- 0x2: Telemetry (sensor data, RSSI, etc.)
- 0x3: Command (channel change, power adjust, etc.)
- 0x4: Acknowledgment
- 0x5-0xF: Reserved for future use

**Flags (4 bits):**
```
Bit 0: ACK_REQ (acknowledgment requested)
Bit 1: RETRANSMIT (this is a retransmission)
Bit 2: ENCRYPTED (payload is encrypted - future use)
Bit 3: Reserved
```

**Sequence Number (16 bits):**
- Increments with each packet from a given node
- Wraps around at 65535
- Used for detecting packet loss and reordering

### Payload (0-28 bytes)

Variable-length payload, content depends on packet type.

**Maximum Payload Size:** 28 bytes (to fit within 32-byte NRF24 FIFO after headers)

### Metadata (2 bytes)

```
Byte 0: TX Power (4 bits) | Data Rate (4 bits)
Byte 1: Channel (8 bits)
```

**TX Power (4 bits):**
- 0x0: -18 dBm
- 0x1: -12 dBm
- 0x2: -6 dBm
- 0x3: 0 dBm
- 0x4: +20 dBm (PA+LNA module)
- 0x5-0xF: Reserved

**Data Rate (4 bits):**
- 0x0: 250 kbps
- 0x1: 1 Mbps
- 0x2: 2 Mbps
- 0x3-0xF: Reserved

**Channel (8 bits):**
- 0-125: NRF24 channel number (2400-2525 MHz)

### CRC (2 bytes)

CRC-16-CCITT (polynomial 0x1021, initial value 0xFFFF)

Covers: Preamble + Header + Payload + Metadata

**Note:** NRF24 has built-in CRC, but this provides end-to-end integrity check at protocol layer.

---

## Packet Types

### Beacon Packet (Type 0x0)

**Purpose:** Node announces its presence and capabilities

**Payload Format:**
```
Byte 0-15: Node Name (ASCII, null-terminated)
Byte 16: Capabilities Flags
Byte 17-18: Firmware Version (major.minor)
```

**Capabilities Flags:**
- Bit 0: Dual radio capable
- Bit 1: Telemetry logging capable
- Bit 2: Mesh routing capable
- Bit 3-7: Reserved

**Example:**
```
Node Name: "Aether-01"
Capabilities: 0x03 (dual radio + telemetry)
Firmware: 1.0
```

### Data Packet (Type 0x1)

**Purpose:** User-defined payload for experiments

**Payload Format:** Application-specific (0-28 bytes)

**Example Use Cases:**
- Text messages between nodes
- Sensor readings
- Custom experiment data

### Telemetry Packet (Type 0x2)

**Purpose:** Report node status and RF metrics

**Payload Format:**
```
Byte 0-3: Timestamp (microseconds since boot, 32-bit)
Byte 4: RSSI (signed 8-bit, dBm)
Byte 5-6: Packet Count (16-bit)
Byte 7-8: Error Count (16-bit)
Byte 9-10: Battery Voltage (millivolts, 16-bit)
```

**Example:**
```
Timestamp: 1234567 µs
RSSI: -65 dBm
Packets: 1523
Errors: 12
Battery: 3700 mV
```

### Command Packet (Type 0x3)

**Purpose:** Remote control of node parameters

**Payload Format:**
```
Byte 0: Command ID
Byte 1-N: Command Parameters
```

**Command IDs:**
- 0x01: Set Channel (param: channel number)
- 0x02: Set TX Power (param: power level)
- 0x03: Set Data Rate (param: rate)
- 0x04: Start Hopping (param: hop pattern ID)
- 0x05: Stop Hopping
- 0x06: Reset Node
- 0x07-0xFF: Reserved

**Example:**
```
Command: Set Channel
Parameter: 50 (2450 MHz)
```

### Acknowledgment Packet (Type 0x4)

**Purpose:** Confirm receipt of packet

**Payload Format:**
```
Byte 0-1: Sequence Number of Acknowledged Packet (16-bit)
Byte 2: Status (0x00 = success, 0x01 = CRC error, 0x02 = buffer full)
```

---

## Channel Hopping Synchronization

### Problem

For multi-node experiments, nodes must hop to the same channel at the same time to communicate.

### Solution: Time-Slotted Hopping

1. **Master Node** broadcasts beacon with timestamp and hop schedule
2. **Slave Nodes** synchronize their clocks to master
3. All nodes hop to channel N at time T according to shared schedule

**Hop Schedule Format:**
```
Byte 0: Number of Channels (1-126)
Byte 1-N: Channel List
Byte N+1-N+2: Dwell Time (milliseconds, 16-bit)
```

**Example:**
```
Channels: [10, 20, 30, 40, 50]
Dwell Time: 100 ms
```

All nodes hop: 10 → 20 → 30 → 40 → 50 → 10 (repeat)

### Clock Synchronization

**Method:** Beacon-based synchronization (similar to Bluetooth)

1. Master sends beacon with its timestamp
2. Slave receives beacon, notes receive time
3. Slave calculates offset: `offset = master_time - slave_time`
4. Slave adjusts its clock by offset

**Accuracy:** ±1 ms (sufficient for 100 ms dwell times)

---

## Addressing Scheme

### Node ID Assignment

**Static Assignment (Current):**
- Manually configured in firmware
- Node IDs: 0x01-0xFE

**Future: Dynamic Assignment:**
- Nodes request ID from coordinator
- Coordinator maintains ID table
- Allows plug-and-play operation

### Broadcast Address

**Node ID 0x00:** All nodes receive and process packet

**Use Cases:**
- Beacon announcements
- Network-wide commands (e.g., "all nodes hop to channel 50")
- Time synchronization

---

## Error Handling

### Packet Loss Detection

**Method:** Sequence number gaps

If node receives sequence numbers [100, 101, 103, 104], packet 102 was lost.

**Logging:** Record loss events for analysis

### CRC Failure

**Action:** Discard packet, increment error counter

**Logging:** Record CRC failures for interference analysis

### Timeout

If no packet received within expected time (e.g., 10× dwell time), assume link failure.

**Action:** Return to beacon listening mode

---

## Implementation Notes

### Memory Requirements

**Per-Packet Buffer:** 37 bytes (max packet size)

**Transmit Queue:** 10 packets × 37 bytes = 370 bytes

**Receive Queue:** 10 packets × 37 bytes = 370 bytes

**Total:** ~1 KB (well within ESP32's 520 KB SRAM)

### Processing Overhead

**Packet Assembly:** ~50 µs (ESP32 @ 240 MHz)

**CRC Calculation:** ~100 µs (software CRC-16)

**Total:** ~150 µs per packet (negligible compared to RF transmission time)

### NRF24 Configuration

**Payload Size:** Dynamic (1-32 bytes)

**Auto-ACK:** Disabled (protocol-level ACK instead)

**CRC:** Enabled (hardware CRC as first line of defense)

**Retries:** 0 (protocol-level retransmission if needed)

---

## Example Packet Encoding

### Beacon Packet

```
Preamble:  0xA5
Node ID:   0x01
Type:      0x00 (Beacon)
Flags:     0x00
Seq Num:   0x0001
Payload:   "Aether-01\0" (10 bytes) + 0x03 (capabilities) + 0x0100 (v1.0)
TX Power:  0x3 (0 dBm)
Data Rate: 0x2 (2 Mbps)
Channel:   0x32 (50)
CRC:       0xABCD (calculated)

Hex: A5 01 00 00 01 41 65 74 68 65 72 2D 30 31 00 03 01 00 32 32 AB CD
```

### Data Packet

```
Preamble:  0xA5
Node ID:   0x02
Type:      0x01 (Data)
Flags:     0x01 (ACK_REQ)
Seq Num:   0x0042
Payload:   "Hello" (5 bytes)
TX Power:  0x3 (0 dBm)
Data Rate: 0x2 (2 Mbps)
Channel:   0x32 (50)
CRC:       0x1234 (calculated)

Hex: A5 02 11 00 42 48 65 6C 6C 6F 32 32 12 34
```

---

## Future Extensions

### Version 2.0 (Planned)

- **Encryption:** AES-128 for secure experiments
- **Mesh Routing:** Multi-hop packet forwarding
- **QoS:** Priority levels for different packet types
- **Compression:** Payload compression for efficiency

### Version 3.0 (Conceptual)

- **Frequency Agility:** Adaptive channel selection based on interference
- **TDMA:** Time-division multiple access for collision avoidance
- **GPS Sync:** Precise time synchronization for distributed experiments

---

## Testing Plan

### Unit Tests

- Packet encoding/decoding
- CRC calculation
- Sequence number handling

### Integration Tests

- Two-node communication
- Beacon synchronization
- Channel hopping coordination

### Field Tests

- Range testing with protocol overhead
- Packet loss measurement
- Interference resilience

---

## References

- IEEE 802.15.4: Low-Rate Wireless Personal Area Networks
- Bluetooth Core Specification v5.3 (for FHSS and synchronization concepts)
- NRF24L01+ Product Specification v1.0
- RFC 1071: Computing the Internet Checksum

---

## Contributing

This protocol is a work in progress. Feedback welcome:

- Is packet format efficient?
- Are there missing features for your experiments?
- Should we prioritize encryption or mesh routing?

Submit issues or pull requests with suggestions.
