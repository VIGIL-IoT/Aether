import { useSimulationStore } from '../store/simulationStore';

export const TelemetryPanel = () => {
  const { 
    radio1, 
    radio2, 
    hopRate, 
    uptime, 
    channelOccupancy,
    eventLog 
  } = useSimulationStore();

  const activeChannels = channelOccupancy.filter(v => v > 0).length;
  const avgOccupancy = (channelOccupancy.reduce((a, b) => a + b, 0) / 126).toFixed(1);

  return (
    <div className="bg-bg-panel border border-bg-border rounded-lg p-6 scanline">
      <h2 className="text-sm font-bold text-accent-primary mb-4 tracking-wider">TELEMETRY</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {/* Radio 1 Stats */}
        <div className="bg-bg-primary border border-bg-border rounded p-3">
          <div className="text-[8px] text-text-secondary mb-1">RADIO 1 (HSPI)</div>
          <div className="text-lg font-bold text-accent-primary">CH {radio1.channel}</div>
          <div className="text-[10px] text-text-secondary mt-1">
            {radio1.packetCount} PKT • {radio1.successRate.toFixed(1)}%
          </div>
          <div className="text-[10px] text-accent-secondary">
            RSSI: {radio1.rssi} dBm
          </div>
        </div>

        {/* Radio 2 Stats */}
        <div className="bg-bg-primary border border-bg-border rounded p-3">
          <div className="text-[8px] text-text-secondary mb-1">RADIO 2 (VSPI)</div>
          <div className="text-lg font-bold text-accent-secondary">CH {radio2.channel}</div>
          <div className="text-[10px] text-text-secondary mt-1">
            {radio2.packetCount} PKT • {radio2.successRate.toFixed(1)}%
          </div>
          <div className="text-[10px] text-accent-secondary">
            RSSI: {radio2.rssi} dBm
          </div>
        </div>

        {/* System Stats */}
        <div className="bg-bg-primary border border-bg-border rounded p-3">
          <div className="text-[8px] text-text-secondary mb-1">SYSTEM</div>
          <div className="text-lg font-bold text-accent-warning">{uptime.toFixed(1)}s</div>
          <div className="text-[10px] text-text-secondary mt-1">
            Hop: {hopRate}ms
          </div>
          <div className="text-[10px] text-accent-primary">
            60 FPS
          </div>
        </div>

        {/* Channel Stats */}
        <div className="bg-bg-primary border border-bg-border rounded p-3">
          <div className="text-[8px] text-text-secondary mb-1">CHANNELS</div>
          <div className="text-lg font-bold text-accent-secondary">{activeChannels}/126</div>
          <div className="text-[10px] text-text-secondary mt-1">
            Avg: {avgOccupancy}
          </div>
          <div className="text-[10px] text-accent-warning">
            {((activeChannels / 126) * 100).toFixed(1)}% Used
          </div>
        </div>
      </div>

      {/* Event Log */}
      <div className="bg-bg-primary border border-bg-border rounded p-3">
        <div className="text-[10px] font-bold text-accent-primary mb-2 tracking-wider">EVENT LOG</div>
        <div className="space-y-1 h-32 overflow-y-auto font-mono text-[9px] text-text-secondary">
          {eventLog.length === 0 ? (
            <div className="text-text-secondary opacity-50">No events yet...</div>
          ) : (
            eventLog.slice().reverse().map((event, i) => (
              <div key={i} className="hover:text-accent-primary transition-colors">
                {event}
              </div>
            ))
          )}
        </div>
      </div>

      {/* Additional Metrics */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-[10px]">
        <div className="bg-bg-primary border border-bg-border rounded p-2">
          <div className="text-text-secondary">Power</div>
          <div className="text-accent-primary font-bold">3.3V • 120mA</div>
        </div>
        <div className="bg-bg-primary border border-bg-border rounded p-2">
          <div className="text-text-secondary">Battery</div>
          <div className="text-accent-secondary font-bold">4.1V • 87%</div>
        </div>
        <div className="bg-bg-primary border border-bg-border rounded p-2">
          <div className="text-text-secondary">Temp</div>
          <div className="text-accent-warning font-bold">42°C</div>
        </div>
      </div>
    </div>
  );
};
