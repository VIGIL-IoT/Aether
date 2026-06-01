import { motion } from 'framer-motion';
import { useSimulationStore } from '../store/simulationStore';

export const DeviceView = () => {
  const { radio1, radio2 } = useSimulationStore();

  return (
    <div className="bg-bg-panel border border-bg-border rounded-lg p-6 scanline">
      <h2 className="text-sm font-bold text-accent-primary mb-4 tracking-wider">DEVICE VIEW</h2>
      
      <div className="relative h-80 flex items-center justify-center">
        {/* ESP32 */}
        <motion.div
          className="absolute bg-bg-border border-2 border-accent-primary rounded p-4"
          animate={{ boxShadow: '0 0 20px rgba(0, 212, 255, 0.3)' }}
        >
          <div className="text-xs font-bold text-accent-primary">ESP32-WROOM-32</div>
          <div className="text-[10px] text-text-secondary mt-1">DUAL CORE</div>
        </motion.div>

        {/* Radio 1 - HSPI */}
        <motion.div
          className="absolute -left-8 top-12 bg-bg-border border border-accent-secondary rounded p-3"
          animate={{
            borderColor: radio1.state === 'TX' ? '#00FF9D' : radio1.state === 'HOPPING' ? '#FFC857' : '#18222E'
          }}
        >
          <div className="text-[10px] font-bold text-accent-secondary">NRF24 #1</div>
          <div className="text-[8px] text-text-secondary">HSPI</div>
          <div className="text-[10px] text-accent-primary mt-1">CH: {radio1.channel}</div>
          <div className={`text-[8px] mt-1 ${
            radio1.state === 'TX' ? 'text-accent-secondary' :
            radio1.state === 'HOPPING' ? 'text-accent-warning' :
            'text-text-secondary'
          }`}>
            {radio1.state}
          </div>
        </motion.div>

        {/* Radio 2 - VSPI */}
        <motion.div
          className="absolute -right-8 top-12 bg-bg-border border border-accent-secondary rounded p-3"
          animate={{
            borderColor: radio2.state === 'TX' ? '#00FF9D' : radio2.state === 'HOPPING' ? '#FFC857' : '#18222E'
          }}
        >
          <div className="text-[10px] font-bold text-accent-secondary">NRF24 #2</div>
          <div className="text-[8px] text-text-secondary">VSPI</div>
          <div className="text-[10px] text-accent-primary mt-1">CH: {radio2.channel}</div>
          <div className={`text-[8px] mt-1 ${
            radio2.state === 'TX' ? 'text-accent-secondary' :
            radio2.state === 'HOPPING' ? 'text-accent-warning' :
            'text-text-secondary'
          }`}>
            {radio2.state}
          </div>
        </motion.div>

        {/* SPI Traces */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {/* HSPI Lines */}
          <motion.line
            x1="50%" y1="50%" x2="20%" y2="30%"
            stroke="#00D4FF"
            strokeWidth="1"
            animate={{ opacity: radio1.state === 'HOPPING' ? [0.3, 1, 0.3] : 0.3 }}
            transition={{ duration: 0.5, repeat: radio1.state === 'HOPPING' ? Infinity : 0 }}
          />
          
          {/* VSPI Lines */}
          <motion.line
            x1="50%" y1="50%" x2="80%" y2="30%"
            stroke="#00D4FF"
            strokeWidth="1"
            animate={{ opacity: radio2.state === 'HOPPING' ? [0.3, 1, 0.3] : 0.3 }}
            transition={{ duration: 0.5, repeat: radio2.state === 'HOPPING' ? Infinity : 0 }}
          />
        </svg>

        {/* SPI Signal Labels */}
        <div className="absolute bottom-4 left-4 text-[8px] text-text-secondary space-y-1">
          <div>MOSI • MISO • SCK</div>
          <div>CSN • CE</div>
        </div>

        {/* Packet Count */}
        <div className="absolute bottom-4 right-4 text-[10px] text-accent-primary">
          <div>R1: {radio1.packetCount} PKT</div>
          <div>R2: {radio2.packetCount} PKT</div>
        </div>
      </div>
    </div>
  );
};
