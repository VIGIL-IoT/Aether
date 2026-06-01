import { motion } from 'framer-motion';
import { useSimulationStore } from '../store/simulationStore';

export const NetworkView = () => {
  const { packets, radio1, radio2 } = useSimulationStore();
  
  const recentPackets = packets.slice(-10);

  return (
    <div className="bg-bg-panel border border-bg-border rounded-lg p-6 scanline">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-bold text-accent-primary tracking-wider">MESH NETWORK</h2>
        <div className="text-[8px] px-2 py-1 bg-accent-warning text-bg-primary font-bold">
          PLANNED FEATURE
        </div>
      </div>
      
      <div className="relative h-80 bg-bg-primary rounded border border-bg-border p-4">
        {/* Node A */}
        <motion.div
          className="absolute top-8 left-8 w-16 h-16 bg-bg-border border-2 border-accent-primary rounded flex flex-col items-center justify-center"
          animate={{ borderColor: radio1.state === 'TX' ? '#00FF9D' : '#00D4FF' }}
        >
          <div className="text-[10px] font-bold text-accent-primary">NODE A</div>
          <div className="text-[8px] text-text-secondary">CH: {radio1.channel}</div>
          <div className="text-[8px] text-accent-secondary">{radio1.packetCount}</div>
        </motion.div>

        {/* Node B */}
        <motion.div
          className="absolute top-8 right-8 w-16 h-16 bg-bg-border border-2 border-accent-primary rounded flex flex-col items-center justify-center"
          animate={{ borderColor: radio2.state === 'TX' ? '#00FF9D' : '#00D4FF' }}
        >
          <div className="text-[10px] font-bold text-accent-primary">NODE B</div>
          <div className="text-[8px] text-text-secondary">CH: {radio2.channel}</div>
          <div className="text-[8px] text-accent-secondary">{radio2.packetCount}</div>
        </motion.div>

        {/* Node C */}
        <div className="absolute bottom-8 left-1/4 w-16 h-16 bg-bg-border border border-bg-border rounded flex flex-col items-center justify-center opacity-40">
          <div className="text-[10px] font-bold text-text-secondary">NODE C</div>
          <div className="text-[8px] text-text-secondary">OFFLINE</div>
        </div>

        {/* Node D */}
        <div className="absolute bottom-8 right-1/4 w-16 h-16 bg-bg-border border border-bg-border rounded flex flex-col items-center justify-center opacity-40">
          <div className="text-[10px] font-bold text-text-secondary">NODE D</div>
          <div className="text-[8px] text-text-secondary">OFFLINE</div>
        </div>

        {/* Connection Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <motion.line
            x1="20%" y1="20%" x2="80%" y2="20%"
            stroke="#00D4FF"
            strokeWidth="1"
            strokeDasharray="4 4"
            animate={{ strokeDashoffset: [0, -8] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {/* Packet Animations */}
        {recentPackets.map((packet, i) => (
          <motion.div
            key={packet.id}
            className={`absolute w-2 h-2 rounded-full ${
              packet.status === 'success' ? 'bg-accent-secondary' :
              packet.status === 'retry' ? 'bg-accent-warning' :
              'bg-accent-danger'
            }`}
            initial={{ x: packet.radioId === 1 ? '20%' : '80%', y: '20%', opacity: 1 }}
            animate={{ 
              x: packet.radioId === 1 ? '80%' : '20%', 
              y: '20%',
              opacity: 0 
            }}
            transition={{ duration: 1, delay: i * 0.1 }}
          />
        ))}

        {/* Info Panel */}
        <div className="absolute bottom-4 left-4 right-4 bg-bg-border border border-bg-border rounded p-3 text-[10px]">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <div className="text-text-secondary">Sync Status</div>
              <div className="text-accent-warning">ASYNC</div>
            </div>
            <div>
              <div className="text-text-secondary">Clock Drift</div>
              <div className="text-accent-primary">±2.3ms</div>
            </div>
            <div>
              <div className="text-text-secondary">Hop Sync</div>
              <div className="text-accent-danger">DISABLED</div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex gap-4 text-[10px]">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-secondary"></div>
          <span className="text-text-secondary">Success</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-warning"></div>
          <span className="text-text-secondary">Retry</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-accent-danger"></div>
          <span className="text-text-secondary">Collision</span>
        </div>
      </div>
    </div>
  );
};
