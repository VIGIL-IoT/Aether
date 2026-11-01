import { useSimulationStore, type HopMode } from '../store/simulationStore';
import { channelFrequencyMHz } from '../domain/rfModel.mjs';

const MODE_LABELS: Record<HopMode, string> = {
  SEQUENTIAL: 'Sequential',
  SEEDED_RANDOM: 'Seeded random',
  FIXED_OFFSET: 'Fixed separation',
};

export const ControlPanel = () => {
  const isRunning = useSimulationStore((state) => state.isRunning);
  const isPaused = useSimulationStore((state) => state.isPaused);
  const hopMode = useSimulationStore((state) => state.hopMode);
  const hopRateMs = useSimulationStore((state) => state.hopRateMs);
  const radio1 = useSimulationStore((state) => state.radio1);
  const radio2 = useSimulationStore((state) => state.radio2);
  const start = useSimulationStore((state) => state.start);
  const pause = useSimulationStore((state) => state.pause);
  const stop = useSimulationStore((state) => state.stop);
  const setHopMode = useSimulationStore((state) => state.setHopMode);
  const setHopRate = useSimulationStore((state) => state.setHopRate);

  return (
    <section className="panel controls-panel" aria-label="Simulation controls">
      <div className="controls-intro">
        <h2>Run a hop pattern</h2>
        <p>One model step moves both radios once; time advances by the selected interval.</p>
      </div>

      <div className="transport-controls">
        <button className="primary-button" type="button" onClick={isRunning && !isPaused ? stop : start}>
          {isRunning ? (isPaused ? 'Resume' : 'Stop') : 'Start'}
        </button>
        <button className="secondary-button" type="button" onClick={pause} disabled={!isRunning || isPaused}>
          {isPaused ? 'Paused' : 'Pause'}
        </button>
      </div>

      <div className="mode-control">
        <label className="field-label" htmlFor="hop-mode">Hop policy</label>
        <select
          id="hop-mode"
          value={hopMode}
          onChange={(event) => setHopMode(event.target.value as HopMode)}
        >
          {Object.entries(MODE_LABELS).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
        </select>
        <p className="field-help">
          {hopMode === 'SEQUENTIAL' && 'Both advance one channel; their starting separation stays constant.'}
          {hopMode === 'SEEDED_RANDOM' && 'A repeatable pseudo-random sequence selects each channel.'}
          {hopMode === 'FIXED_OFFSET' && 'Radio 2 follows Radio 1 at a 32-channel offset.'}
        </p>
      </div>

      <div className="rate-control">
        <div className="rate-label-row">
          <label className="field-label" htmlFor="hop-rate">Hop interval</label>
          <output htmlFor="hop-rate">{hopRateMs} ms</output>
        </div>
        <input
          id="hop-rate"
          className="rate-slider"
          type="range"
          min="50"
          max="1000"
          step="50"
          value={hopRateMs}
          onChange={(event) => setHopRate(Number(event.target.value))}
        />
        <div className="range-ends"><span>50 ms</span><span>1000 ms</span></div>
      </div>

      <div className="radio-readouts">
        <div className="radio-readout">
          <div className="readout-top"><span className="readout-dot dot-one" />Radio 1 <span className="bus-name">HSPI</span></div>
          <strong>RF_CH {radio1.channel}</strong>
          <span>{channelFrequencyMHz(radio1.channel)} MHz</span>
        </div>
        <div className="radio-readout">
          <div className="readout-top"><span className="readout-dot dot-two" />Radio 2 <span className="bus-name">VSPI</span></div>
          <strong>RF_CH {radio2.channel}</strong>
          <span>{channelFrequencyMHz(radio2.channel)} MHz</span>
        </div>
      </div>
    </section>
  );
};
