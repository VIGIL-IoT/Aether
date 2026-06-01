import { useSimulationStore, ExperimentType, HopMode } from '../store/simulationStore';

const EXPERIMENTS: { id: ExperimentType; label: string }[] = [
  { id: 'CHANNEL_HOPPING', label: 'Channel Hopping' },
  { id: 'WIFI_COEX', label: 'WiFi Coexistence' },
  { id: 'BLE_COEX', label: 'BLE Coexistence' },
  { id: 'DISTANCE_RSSI', label: 'Distance vs RSSI' },
  { id: 'BODY_ATTENUATION', label: 'Body Attenuation' },
  { id: 'INTERFERENCE_MAP', label: 'Interference Map' },
  { id: 'MESH_SYNC', label: 'Mesh Sync' },
];

const HOP_MODES: { id: HopMode; label: string }[] = [
  { id: 'SEQUENTIAL', label: 'Sequential' },
  { id: 'RANDOM', label: 'Random' },
  { id: 'COORDINATED', label: 'Coordinated' },
];

export const ControlPanel = () => {
  const {
    isRunning,
    isPaused,
    currentExperiment,
    hopMode,
    hopRate,
    start,
    stop,
    pause,
    reset,
    setExperiment,
    setHopMode,
    setHopRate,
  } = useSimulationStore();

  return (
    <div className="bg-bg-panel border border-bg-border rounded-lg p-6 scanline">
      <h2 className="text-sm font-bold text-accent-primary mb-4 tracking-wider">EXPERIMENT CONTROL</h2>
      
      {/* Control Buttons */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={isRunning ? stop : start}
          className={`flex-1 py-2 px-4 text-sm font-bold transition-all ${
            isRunning
              ? 'bg-accent-danger text-bg-primary hover:shadow-glow-primary'
              : 'bg-accent-primary text-bg-primary hover:shadow-glow-primary'
          }`}
        >
          {isRunning ? 'STOP' : 'START'}
        </button>
        
        <button
          onClick={pause}
          disabled={!isRunning}
          className="px-4 py-2 bg-accent-warning text-bg-primary font-bold text-sm disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-glow-secondary transition-all"
        >
          PAUSE
        </button>
        
        <button
          onClick={reset}
          className="px-4 py-2 bg-bg-border border border-accent-primary text-accent-primary font-bold text-sm hover:bg-accent-primary hover:text-bg-primary transition-all"
        >
          RESET
        </button>
      </div>

      {/* Experiment Presets */}
      <div className="mb-6">
        <div className="text-[10px] text-text-secondary mb-2 tracking-wider">EXPERIMENT PRESET</div>
        <div className="grid grid-cols-2 gap-2">
          {EXPERIMENTS.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setExperiment(exp.id)}
              className={`py-2 px-3 text-[10px] font-bold transition-all ${
                currentExperiment === exp.id
                  ? 'bg-accent-primary text-bg-primary shadow-glow-primary'
                  : 'bg-bg-border border border-bg-border text-text-secondary hover:border-accent-primary hover:text-accent-primary'
              }`}
            >
              {exp.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hop Mode */}
      <div className="mb-6">
        <div className="text-[10px] text-text-secondary mb-2 tracking-wider">HOP MODE</div>
        <div className="flex gap-2">
          {HOP_MODES.map((mode) => (
            <button
              key={mode.id}
              onClick={() => setHopMode(mode.id)}
              className={`flex-1 py-2 px-3 text-[10px] font-bold transition-all ${
                hopMode === mode.id
                  ? 'bg-accent-secondary text-bg-primary shadow-glow-secondary'
                  : 'bg-bg-border border border-bg-border text-text-secondary hover:border-accent-secondary hover:text-accent-secondary'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>
      </div>

      {/* Hop Rate */}
      <div className="mb-4">
        <div className="flex justify-between text-[10px] text-text-secondary mb-2">
          <span className="tracking-wider">HOP RATE</span>
          <span className="text-accent-primary font-bold">{hopRate}ms</span>
        </div>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={hopRate}
          onChange={(e) => setHopRate(Number(e.target.value))}
          className="w-full h-1 bg-bg-border rounded-lg appearance-none cursor-pointer accent-accent-primary"
        />
        <div className="flex justify-between text-[8px] text-text-secondary mt-1">
          <span>Fast (50ms)</span>
          <span>Slow (1000ms)</span>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="mt-6 p-3 bg-bg-primary border border-bg-border rounded">
        <div className="flex items-center justify-between">
          <div className="text-[10px] text-text-secondary">STATUS</div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              isRunning && !isPaused ? 'bg-accent-secondary animate-pulse' :
              isPaused ? 'bg-accent-warning' :
              'bg-bg-border'
            }`}></div>
            <span className="text-[10px] font-bold text-accent-primary">
              {isRunning && !isPaused ? 'RUNNING' : isPaused ? 'PAUSED' : 'STOPPED'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
