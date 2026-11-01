import { channelFrequencyMHz } from '../domain/rfModel.mjs';
import { useSimulationStore } from '../store/simulationStore';

const PLOT_LEFT = 146;
const PLOT_RIGHT = 1030;
const PLOT_WIDTH = PLOT_RIGHT - PLOT_LEFT;
const CHANNEL_MAX = 125;

const xForChannel = (channel: number) => PLOT_LEFT + (channel / CHANNEL_MAX) * PLOT_WIDTH;

const majorTicks = [0, 25, 50, 75, 100, 125];
const wifiChannels = [
  { label: '1', rfCh: 12 },
  { label: '6', rfCh: 37 },
  { label: '11', rfCh: 62 },
];
const bleAdvertisingChannels = [2, 26, 80];

export const SpectrumView = () => {
  const radio1 = useSimulationStore((state) => state.radio1);
  const radio2 = useSimulationStore((state) => state.radio2);
  const isRunning = useSimulationStore((state) => state.isRunning);
  const isPaused = useSimulationStore((state) => state.isPaused);
  const bandEdge = xForChannel(83.5);

  return (
    <section className="panel spectrum-panel" aria-labelledby="spectrum-title">
      <div className="panel-heading">
        <div>
          <h2 id="spectrum-title">Where each radio is tuned</h2>
        </div>
        <span className={`run-state ${isRunning && !isPaused ? 'is-running' : ''}`}>
          <span className="state-dot" aria-hidden="true" />
          {isRunning ? (isPaused ? 'Paused' : 'Running') : 'Ready'}
        </span>
      </div>

      <p className="chart-scroll-hint">Swipe horizontally to inspect all 126 RF_CH values.</p>
      <div className="chart-scroll" tabIndex={0} aria-label="Scrollable frequency chart">
        <svg
          className="spectrum-chart"
          viewBox="0 0 1080 356"
          role="img"
          aria-labelledby="spectrum-svg-title spectrum-svg-desc"
        >
          <title id="spectrum-svg-title">Current nRF24 channel positions</title>
          <desc id="spectrum-svg-desc">
            Radio one is on RF channel {radio1.channel} at {channelFrequencyMHz(radio1.channel)} megahertz.
            Radio two is on RF channel {radio2.channel} at {channelFrequencyMHz(radio2.channel)} megahertz.
            The chart spans 2400 to 2525 megahertz and does not show measured signal power.
          </desc>

          <rect x={PLOT_LEFT} y="66" width={bandEdge - PLOT_LEFT} height="207" className="band-region" />
          <text x={PLOT_LEFT + 12} y="52" className="region-label">2400–2483.5 MHz reference range · regional rules vary</text>
          <line x1={bandEdge} y1="61" x2={bandEdge} y2="274" className="band-edge" />
          <text x={bandEdge + 7} y="76" className="edge-label">2483.5</text>

          {Array.from({ length: 26 }, (_, index) => index * 5).map((channel) => (
            <line
              key={`minor-${channel}`}
              x1={xForChannel(channel)}
              y1="267"
              x2={xForChannel(channel)}
              y2={channel % 25 === 0 ? '281' : '274'}
              className={channel % 25 === 0 ? 'major-tick' : 'minor-tick'}
            />
          ))}
          <line x1={PLOT_LEFT} y1="267" x2={PLOT_RIGHT} y2="267" className="frequency-axis" />

          <text x="18" y="135" className="lane-name radio-one-label">RADIO 1</text>
          <text x="18" y="153" className="lane-detail">HSPI · RF_CH</text>
          <text x="18" y="210" className="lane-name radio-two-label">RADIO 2</text>
          <text x="18" y="228" className="lane-detail">VSPI · RF_CH</text>
          <line x1={PLOT_LEFT} y1="139" x2={PLOT_RIGHT} y2="139" className="radio-lane" />
          <line x1={PLOT_LEFT} y1="214" x2={PLOT_RIGHT} y2="214" className="radio-lane" />

          {majorTicks.map((channel) => (
            <g key={`tick-${channel}`}>
              <text x={xForChannel(channel)} y="301" textAnchor="middle" className="tick-channel">CH {channel}</text>
              <text x={xForChannel(channel)} y="322" textAnchor="middle" className="tick-frequency">{channelFrequencyMHz(channel)} MHz</text>
            </g>
          ))}

          {wifiChannels.map(({ label, rfCh }) => (
            <g key={`wifi-${label}`}>
              <line x1={xForChannel(rfCh)} y1="242" x2={xForChannel(rfCh)} y2="258" className="wifi-marker" />
              <circle cx={xForChannel(rfCh)} cy="242" r="3.2" className="wifi-dot" />
              <text x={xForChannel(rfCh)} y="235" textAnchor="middle" className="reference-label">Wi-Fi {label}</text>
            </g>
          ))}

          {bleAdvertisingChannels.map((channel) => (
            <path
              key={`ble-${channel}`}
              d={`M ${xForChannel(channel)} 253 l 4 7 h -8 z`}
              className="ble-marker"
            />
          ))}

          <g className="radio-marker radio-one-marker" transform={`translate(${xForChannel(radio1.channel)} 139)`}>
            <line y1="-29" y2="31" className="marker-line" />
            <circle r="7" className="marker-shape" />
            <text x="0" y="-38" textAnchor="middle" className="marker-value">CH {radio1.channel}</text>
          </g>
          <g className="radio-marker radio-two-marker" transform={`translate(${xForChannel(radio2.channel)} 214)`}>
            <line y1="-29" y2="28" className="marker-line" />
            <rect x="-6" y="-6" width="12" height="12" className="marker-shape" />
            <text x="0" y="-38" textAnchor="middle" className="marker-value">CH {radio2.channel}</text>
          </g>
        </svg>
      </div>
      <div className="chart-legend" aria-label="Chart legend">
        <span><i className="legend-radio-one" aria-hidden="true" />Radio 1</span>
        <span><i className="legend-radio-two" aria-hidden="true" />Radio 2</span>
        <span><i className="legend-wifi" aria-hidden="true" />Wi-Fi channel centres</span>
        <span><i className="legend-ble" aria-hidden="true" />BLE advertising centres (37, 38, 39)</span>
      </div>
      <p className="chart-note">Position only. The plot does not model occupied bandwidth, signal strength, interference, or packet delivery.</p>
    </section>
  );
};
