import { useEffect, useRef } from 'react';
import { useSimulationStore } from '../store/simulationStore';

export const useSimulationEngine = () => {
  const frameRef = useRef<number>();
  const lastTimeRef = useRef<number>(0);
  const hopTimerRef = useRef<number>(0);
  
  const { 
    isRunning, 
    isPaused, 
    hopRate, 
    hopMode, 
    channelRange,
    radio1,
    radio2,
    tick,
    updateRadio,
    addPacket,
    incrementOccupancy,
    addEvent,
    currentExperiment
  } = useSimulationStore();

  useEffect(() => {
    if (!isRunning || isPaused) return;

    const animate = (time: number) => {
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;
      
      tick();
      hopTimerRef.current += delta;

      // Channel hopping logic
      if (hopTimerRef.current >= hopRate) {
        hopTimerRef.current = 0;
        
        const [minCh, maxCh] = channelRange;
        
        if (hopMode === 'SEQUENTIAL') {
          const newCh1 = radio1.channel >= maxCh ? minCh : radio1.channel + 1;
          const newCh2 = radio2.channel >= maxCh ? minCh : radio2.channel + 1;
          updateRadio(1, { channel: newCh1, state: 'HOPPING' });
          updateRadio(2, { channel: newCh2, state: 'HOPPING' });
          addEvent(`HSPI: CH${newCh1} | VSPI: CH${newCh2}`);
        } else if (hopMode === 'RANDOM') {
          const newCh1 = Math.floor(Math.random() * (maxCh - minCh + 1)) + minCh;
          const newCh2 = Math.floor(Math.random() * (maxCh - minCh + 1)) + minCh;
          updateRadio(1, { channel: newCh1, state: 'HOPPING' });
          updateRadio(2, { channel: newCh2, state: 'HOPPING' });
          addEvent(`Random hop: R1→CH${newCh1} R2→CH${newCh2}`);
        } else if (hopMode === 'COORDINATED') {
          const offset = 40;
          const newCh1 = (radio1.channel + 1) % (maxCh - minCh + 1) + minCh;
          const newCh2 = (newCh1 + offset) % (maxCh - minCh + 1) + minCh;
          updateRadio(1, { channel: newCh1, state: 'HOPPING' });
          updateRadio(2, { channel: newCh2, state: 'HOPPING' });
        }
        
        incrementOccupancy(radio1.channel);
        incrementOccupancy(radio2.channel);
      }

      // Packet transmission simulation
      if (Math.random() < 0.05) {
        const radioId = Math.random() < 0.5 ? 1 : 2;
        const radio = radioId === 1 ? radio1 : radio2;
        const status = Math.random() < 0.95 ? 'success' : Math.random() < 0.5 ? 'retry' : 'collision';
        
        addPacket({
          id: `${Date.now()}-${radioId}`,
          radioId,
          channel: radio.channel,
          timestamp: Date.now(),
          status
        });
        
        updateRadio(radioId, { 
          state: 'TX',
          packetCount: radio.packetCount + 1
        });
        
        setTimeout(() => {
          updateRadio(radioId, { state: 'RX' });
        }, 50);
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [isRunning, isPaused, hopRate, hopMode, channelRange, radio1, radio2]);
};
