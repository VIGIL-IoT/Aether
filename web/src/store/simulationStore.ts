import { create } from 'zustand';

export type RadioState = 'TX' | 'RX' | 'HOPPING' | 'IDLE';
export type HopMode = 'SEQUENTIAL' | 'RANDOM' | 'COORDINATED';
export type ExperimentType = 'CHANNEL_HOPPING' | 'WIFI_COEX' | 'BLE_COEX' | 'DISTANCE_RSSI' | 'BODY_ATTENUATION' | 'INTERFERENCE_MAP' | 'MESH_SYNC';

export interface Radio {
  id: 1 | 2;
  bus: 'HSPI' | 'VSPI';
  channel: number;
  state: RadioState;
  packetCount: number;
  successRate: number;
  rssi: number;
}

export interface Packet {
  id: string;
  radioId: 1 | 2;
  channel: number;
  timestamp: number;
  status: 'success' | 'retry' | 'collision';
}

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  uptime: number;
  fps: number;
  
  radio1: Radio;
  radio2: Radio;
  
  hopMode: HopMode;
  hopRate: number;
  channelRange: [number, number];
  
  packets: Packet[];
  channelOccupancy: number[];
  
  currentExperiment: ExperimentType;
  
  wifiChannels: number[];
  bleChannels: number[];
  
  nodeDistance: number;
  bodyAttenuation: number;
  
  eventLog: string[];
  
  start: () => void;
  stop: () => void;
  pause: () => void;
  reset: () => void;
  setExperiment: (exp: ExperimentType) => void;
  setHopMode: (mode: HopMode) => void;
  setHopRate: (rate: number) => void;
  updateRadio: (radioId: 1 | 2, updates: Partial<Radio>) => void;
  addPacket: (packet: Packet) => void;
  incrementOccupancy: (channel: number) => void;
  resetOccupancy: () => void;
  addEvent: (event: string) => void;
  tick: () => void;
}

export const useSimulationStore = create<SimulationState>((set, get) => ({
  isRunning: false,
  isPaused: false,
  uptime: 0,
  fps: 60,
  
  radio1: {
    id: 1,
    bus: 'HSPI',
    channel: 2,
    state: 'IDLE',
    packetCount: 0,
    successRate: 100,
    rssi: -45,
  },
  
  radio2: {
    id: 2,
    bus: 'VSPI',
    channel: 40,
    state: 'IDLE',
    packetCount: 0,
    successRate: 100,
    rssi: -48,
  },
  
  hopMode: 'SEQUENTIAL',
  hopRate: 100,
  channelRange: [0, 125],
  
  packets: [],
  channelOccupancy: new Array(126).fill(0),
  
  currentExperiment: 'CHANNEL_HOPPING',
  
  wifiChannels: [1, 6, 11],
  bleChannels: [0, 12, 39],
  
  nodeDistance: 5,
  bodyAttenuation: 0,
  
  eventLog: [],
  
  start: () => set({ isRunning: true, isPaused: false }),
  stop: () => set({ isRunning: false }),
  pause: () => set({ isPaused: true }),
  
  reset: () => set({
    isRunning: false,
    isPaused: false,
    uptime: 0,
    packets: [],
    channelOccupancy: new Array(126).fill(0),
    eventLog: [],
    radio1: { ...get().radio1, packetCount: 0, successRate: 100, state: 'IDLE' },
    radio2: { ...get().radio2, packetCount: 0, successRate: 100, state: 'IDLE' },
  }),
  
  setExperiment: (exp) => set({ currentExperiment: exp }),
  setHopMode: (mode) => set({ hopMode: mode }),
  setHopRate: (rate) => set({ hopRate: rate }),
  
  updateRadio: (radioId, updates) => set((state) => ({
    [`radio${radioId}`]: { ...state[`radio${radioId}` as 'radio1' | 'radio2'], ...updates }
  })),
  
  addPacket: (packet) => set((state) => ({
    packets: [...state.packets.slice(-50), packet]
  })),
  
  incrementOccupancy: (channel) => set((state) => {
    const newOccupancy = [...state.channelOccupancy];
    newOccupancy[channel] = Math.min(newOccupancy[channel] + 1, 100);
    return { channelOccupancy: newOccupancy };
  }),
  
  resetOccupancy: () => set({ channelOccupancy: new Array(126).fill(0) }),
  
  addEvent: (event) => set((state) => ({
    eventLog: [...state.eventLog.slice(-20), `[${state.uptime.toFixed(1)}s] ${event}`]
  })),
  
  tick: () => set((state) => ({ uptime: state.uptime + 0.016 })),
}));
