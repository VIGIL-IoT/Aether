export type HopMode = 'SEQUENTIAL' | 'SEEDED_RANDOM' | 'FIXED_OFFSET';
export type RadioBus = 'HSPI' | 'VSPI';
export interface ModelRadio {
  id: 1 | 2;
  bus: RadioBus;
  channel: number;
}
export interface SimulationModel {
  elapsedMs: number;
  seed: number;
  hopMode: HopMode;
  hopRateMs: number;
  channelRange: [number, number];
  radio1: ModelRadio;
  radio2: ModelRadio;
  visits1: number[];
  visits2: number[];
  steps: number;
}
export const CHANNEL_COUNT: 126;
export const INITIAL_SEED: number;
export const FIXED_CHANNEL_OFFSET: 32;
export function channelFrequencyMHz(channel: number): number;
export function createInitialModel(): SimulationModel;
export function stepModel(model: SimulationModel): SimulationModel;
