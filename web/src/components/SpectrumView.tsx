import { motion } from 'framer-motion';
import { useSimulationStore } from '../store/simulationStore';

const FREQ_MIN = 2400;
const FREQ_MAX = 2483.5;
const CHANNEL_WIDTH = 1;

export const SpectrumView = () => {
  const { radio1, radio2, wifiChannels, bleChannels } = useSimulationStore();

  const channelToFreq = (ch: number) => FREQ_MIN + ch * CHANNEL_WIDTH;

  const getXPosition = (freq: number) => {
    return ((freq - FREQ_MIN) / (FREQ_MAX - FREQ_MIN)) * 100;
  };

  return (
    <div className="bg-bg-panel border border-bg-border rounded-lg p-6 scanline">
      <h2 className="text-sm font-bold text-accent-primary mb-4 tracking-wider">RF SPECTRUM</h2>
      
      <div className="relative h-80 bg-bg-primary rounded border border-bg-border p-4">
        {/* Frequency Scale */}
        <div className="absolute top-2 left-0 right-0 flex justify-between text-[8px] text-text-secondary px-4">
          <span>2400 MHz</span>
          <span>2441 MHz</span>
          <span>2483.5 MHz</span>
        </div>

        {/* Noise Floor */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="noiseGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0" />
            </linearGradient>
          </defs>
          
          {/* Noise floor visualization */}
          {Array.from({ length: 100 }).map((_, i) => (
            <motion.rect
              key={i}
              x={`${i}%`}
              y="60%"
              width="1%"
              height={`${Math.random() * 10 + 5}%`}
              fill="url(#noiseGradient)"
              animate={{ height: `${Math.random() * 10 + 5}%` }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: 'reverse' }}
            />
          ))}
        </svg>

        {/* WiFi Channels */}
        {wifiChannels.map((ch) => {
          const freq = 2412 + (ch - 1) * 5;
          const x = getXPosition(freq);
          return (
            <div
              key={`wifi-${ch}`}
              className="absolute top-16 h-32 w-8 border-l border-r border-dashed border-accent-warning opacity-30"
              style={{ left: `${x}%` }}
            >
              <div className="text-[8px] text-accent-warning -rotate-90 origin-left mt-2">
                WiFi {ch}
              </div>
            </div>
          );
        })}

        {/* BLE Channels */}
        {bleChannels.map((ch) => {
          const freq = 2402 + ch * 2;
          const x = getXPosition(freq);
          return (
            <div
              key={`ble-${ch}`}
              className="absolute top-16 h-32 w-1 bg-accent-secondary opacity-20"
              style={{ left: `${x}%` }}
            />
          );
        })}

        {/* Radio 1 Marker */}
        <motion.div
          className="absolute top-12 w-2 h-48 bg-accent-primary"
          style={{ left: `${getXPosition(channelToFreq(radio1.channel))}%` }}
          animate={{
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.8)',
            height: radio1.state === 'TX' ? '60%' : '40%'
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -top-6 -left-8 text-[10px] text-accent-primary whitespace-nowrap">
            R1: {channelToFreq(radio1.channel).toFixed(1)} MHz
          </div>
        </motion.div>

        {/* Radio 2 Marker */}
        <motion.div
          className="absolute top-12 w-2 h-48 bg-accent-secondary"
          style={{ left: `${getXPosition(channelToFreq(radio2.channel))}%` }}
          animate={{
            boxShadow: '0 0 20px rgba(0, 255, 157, 0.8)',
            height: radio2.state === 'TX' ? '60%' : '40%'
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -bottom-6 -left-8 text-[10px] text-accent-secondary whitespace-nowrap">
            R2: {channelToFreq(radio2.channel).toFixed(1)} MHz
          </div>
        </motion.div>

        {/* Grid Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 10 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-full border-t border-bg-border opacity-20"
              style={{ top: `${i * 10}%` }}
            />
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-6 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent-primary"></div>
          <span className="text-text-secondary">Radio 1 (HSPI)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-accent-secondary"></div>
          <span className="text-text-secondary">Radio 2 (VSPI)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-accent-warning"></div>
          <span className="text-text-secondary">WiFi</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-1 bg-accent-secondary opacity-50"></div>
          <span className="text-text-secondary">BLE</span>
        </div>
      </div>
    </div>
  );
};
