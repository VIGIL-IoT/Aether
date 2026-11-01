import { useSyncExternalStore } from 'react';
import { createInitialModel, stepModel, type HopMode } from '../domain/rfModel.mjs';

export type { HopMode } from '../domain/rfModel.mjs';
export type Radio = ReturnType<typeof createInitialModel>['radio1'];

export interface SimulationState {
  isRunning: boolean;
  isPaused: boolean;
  elapsedMs: number;
  seed: number;
  hopMode: HopMode;
  hopRateMs: number;
  channelRange: [number, number];
  radio1: Radio;
  radio2: Radio;
  visits1: number[];
  visits2: number[];
  steps: number;
  start: () => void;
  stop: () => void;
  pause: () => void;
  reset: () => void;
  setHopMode: (mode: HopMode) => void;
  setHopRate: (rate: number) => void;
  step: () => void;
}

type StorePatch = Partial<SimulationState>;
type StoreHook = {
  <T>(selector: (state: SimulationState) => T): T;
  getState: () => SimulationState;
};

const listeners = new Set<() => void>();
let state: SimulationState;

const setState = (patch: StorePatch | ((current: SimulationState) => StorePatch)) => {
  const update = typeof patch === 'function' ? patch(state) : patch;
  if (Object.keys(update).length === 0) return;
  state = { ...state, ...update };
  listeners.forEach((listener) => listener());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => listeners.delete(listener);
};

const selectSnapshot = <T,>(selector: (current: SimulationState) => T) => selector(state);

const useStore = <T,>(selector: (current: SimulationState) => T) =>
  useSyncExternalStore(subscribe, () => selectSnapshot(selector), () => selectSnapshot(selector));

state = {
  ...createInitialModel(),
  isRunning: false,
  isPaused: false,
  start: () => setState({ isRunning: true, isPaused: false }),
  stop: () => setState({ isRunning: false, isPaused: false }),
  pause: () => setState({ isPaused: true }),
  reset: () => {
    const { hopMode, hopRateMs } = state;
    setState({ ...createInitialModel(), hopMode, hopRateMs, isRunning: false, isPaused: false });
  },
  setHopMode: (hopMode) => setState({ hopMode }),
  setHopRate: (hopRateMs) => setState({ hopRateMs }),
  step: () => setState((current) => {
    if (!current.isRunning || current.isPaused) return {};
    const next = stepModel(current);
    return {
      elapsedMs: next.elapsedMs,
      seed: next.seed,
      radio1: next.radio1,
      radio2: next.radio2,
      visits1: next.visits1,
      visits2: next.visits2,
      steps: next.steps,
    };
  }),
};

export const useSimulationStore: StoreHook = Object.assign(useStore, {
  getState: () => state,
});
