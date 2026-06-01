import { useSimulationStore } from '../store/simulationStore';

export const OccupancyMap = () => {
  const { channelOccupancy, resetOccupancy } = useSimulationStore();

  const getColor = (value: number) => {
    if (value === 0) return '#0B1016';
    if (value < 20) return '#00D4FF22';
    if (value < 40) return '#00D4FF44';
    if (value < 60) return '#00FF9D66';
    if (value < 80) return '#FFC85788';
    return '#FF4D6DAA';
  };

  return (
    <div className="bg-bg-panel border border-bg-border rounded-lg p-6 scanline">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-accent-primary tracking-wider">CHANNEL OCCUPANCY</h2>
        <button
          onClick={resetOccupancy}
          className="text-[10px] px-3 py-1 bg-bg-border border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-bg-primary transition-colors"
        >
          RESET
        </button>
      </div>
      
      <div className="grid grid-cols-21 gap-[2px] h-64">
        {channelOccupancy.map((value, channel) => (
          <div
            key={channel}
            className="relative group cursor-pointer transition-all hover:scale-110"
            style={{
              backgroundColor: getColor(value),
              border: value > 0 ? '1px solid rgba(0, 212, 255, 0.3)' : 'none'
            }}
            title={`CH${channel}: ${value}`}
          >
            {value > 50 && (
              <div className="absolute inset-0 flex items-center justify-center text-[6px] text-text-primary font-bold">
                {channel}
              </div>
            )}
            
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-bg-primary border border-accent-primary text-[8px] whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              CH{channel}: {value}
            </div>
          </div>
        ))}
      </div>

      {/* Scale */}
      <div className="mt-4 flex items-center gap-2 text-[8px] text-text-secondary">
        <span>Low</span>
        <div className="flex-1 h-2 bg-gradient-to-r from-bg-panel via-accent-primary via-accent-secondary via-accent-warning to-accent-danger"></div>
        <span>High</span>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-4 text-[10px]">
        <div>
          <div className="text-text-secondary">Active Channels</div>
          <div className="text-accent-primary font-bold">
            {channelOccupancy.filter(v => v > 0).length}
          </div>
        </div>
        <div>
          <div className="text-text-secondary">Max Occupancy</div>
          <div className="text-accent-secondary font-bold">
            {Math.max(...channelOccupancy)}
          </div>
        </div>
        <div>
          <div className="text-text-secondary">Avg Occupancy</div>
          <div className="text-accent-warning font-bold">
            {(channelOccupancy.reduce((a, b) => a + b, 0) / 126).toFixed(1)}
          </div>
        </div>
      </div>
    </div>
  );
};
