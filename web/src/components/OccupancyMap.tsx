import { useState } from 'react';
import { CHANNEL_COUNT, channelFrequencyMHz } from '../domain/rfModel.mjs';
import { useSimulationStore } from '../store/simulationStore';

const PLOT_LEFT = 92;
const PLOT_RIGHT = 1040;
const PLOT_WIDTH = PLOT_RIGHT - PLOT_LEFT;
const xForChannel = (channel: number) => PLOT_LEFT + (channel / 125) * PLOT_WIDTH;

export const ChannelHistory = () => {
  const [showDataTable, setShowDataTable] = useState(false);
  const visits1 = useSimulationStore((state) => state.visits1);
  const visits2 = useSimulationStore((state) => state.visits2);
  const steps = useSimulationStore((state) => state.steps);
  const elapsedMs = useSimulationStore((state) => state.elapsedMs);
  const reset = useSimulationStore((state) => state.reset);
  const maxVisit = Math.max(1, ...visits1, ...visits2);
  const activeChannels = visits1.reduce((active, count, channel) => active + (count + visits2[channel] > 0 ? 1 : 0), 0);

  return (
    <section className="panel history-panel" aria-labelledby="history-title">
      <div className="panel-heading history-heading">
        <div>
          <h2 id="history-title">Channel visit history</h2>
          <p className="panel-subtitle">Counts show simulated channel selections, not measured RF energy.</p>
        </div>
        <button className="quiet-button" type="button" onClick={reset}>Reset model</button>
      </div>

      <div className="history-overview">
        <span><strong>{(elapsedMs / 1000).toFixed(2)} s</strong> simulated time</span>
        <span><strong>{steps * 2}</strong> radio selections</span>
        <span><strong>{activeChannels}</strong> channels visited</span>
        <span><strong>{CHANNEL_COUNT}</strong> channels in range</span>
      </div>

      <div className="history-scroll" role="region" tabIndex={0} aria-label="Scrollable channel visit chart">
        <svg
          className="history-chart"
          viewBox="0 0 1080 256"
          role="img"
          aria-labelledby="history-svg-title history-svg-desc"
        >
          <title id="history-svg-title">Simulated channel visits by radio</title>
          <desc id="history-svg-desc">
            Two bar lanes show how many times each of 126 channels was selected during this model session.
            The chart is a simulation history and does not show RF energy.
          </desc>
          <text x="16" y="75" className="history-lane radio-one-label">RADIO 1</text>
          <text x="16" y="169" className="history-lane radio-two-label">RADIO 2</text>
          <line x1={PLOT_LEFT} y1="96" x2={PLOT_RIGHT} y2="96" className="history-baseline" />
          <line x1={PLOT_LEFT} y1="190" x2={PLOT_RIGHT} y2="190" className="history-baseline" />

          {Array.from({ length: CHANNEL_COUNT }, (_, channel) => {
            const count1 = visits1[channel];
            const count2 = visits2[channel];
            const height1 = count1 === 0 ? 0 : Math.max(2, (count1 / maxVisit) * 50);
            const height2 = count2 === 0 ? 0 : Math.max(2, (count2 / maxVisit) * 50);
            const x = xForChannel(channel) - 2;

            return (
              <g key={channel}>
                {count1 > 0 && <rect x={x} y={96 - height1} width="4" height={height1} className="history-bar-one">
                  <title>Radio 1 · RF_CH {channel} · {channelFrequencyMHz(channel)} MHz · {count1} selections</title>
                </rect>}
                {count2 > 0 && <rect x={x} y={190 - height2} width="4" height={height2} className="history-bar-two">
                  <title>Radio 2 · RF_CH {channel} · {channelFrequencyMHz(channel)} MHz · {count2} selections</title>
                </rect>}
              </g>
            );
          })}

          {[0, 25, 50, 75, 100, 125].map((channel) => (
            <g key={`axis-${channel}`}>
              <line x1={xForChannel(channel)} y1="199" x2={xForChannel(channel)} y2="207" className="history-tick" />
              <text x={xForChannel(channel)} y="224" textAnchor="middle" className="history-axis-channel">CH {channel}</text>
              <text x={xForChannel(channel)} y="242" textAnchor="middle" className="history-axis-frequency">{channelFrequencyMHz(channel)} MHz</text>
            </g>
          ))}

          {steps === 0 && <text x="566" y="145" textAnchor="middle" className="history-empty">Start the model to add channel visits.</text>}
        </svg>
      </div>

      <div className="history-legend" role="group" aria-label="Channel history legend">
        <span><i className="legend-radio-one" aria-hidden="true" />Radio 1 · HSPI</span>
        <span><i className="legend-radio-two" aria-hidden="true" />Radio 2 · VSPI</span>
        <span>Taller bar = more simulated selections</span>
      </div>

      <details className="history-data" onToggle={(event) => setShowDataTable(event.currentTarget.open)}>
        <summary>View channel visit data as a table</summary>
        {showDataTable && (
          <div className="history-table-scroll" role="region" tabIndex={0} aria-label="Channel visit count data">
            <table className="history-table">
              <caption>Simulated selections per channel. These values are not RF measurements.</caption>
              <thead>
                <tr>
                  <th scope="col">RF_CH</th>
                  <th scope="col">Frequency (MHz)</th>
                  <th scope="col">Radio 1 selections</th>
                  <th scope="col">Radio 2 selections</th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: CHANNEL_COUNT }, (_, channel) => (
                  <tr key={channel}>
                    <th scope="row">{channel}</th>
                    <td>{channelFrequencyMHz(channel)}</td>
                    <td>{visits1[channel]}</td>
                    <td>{visits2[channel]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </details>
    </section>
  );
};
