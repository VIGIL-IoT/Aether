import { useEffect } from 'react';
import { useSimulationStore } from '../store/simulationStore';

export const useSimulationEngine = () => {
  const isRunning = useSimulationStore((state) => state.isRunning);
  const isPaused = useSimulationStore((state) => state.isPaused);
  const hopRateMs = useSimulationStore((state) => state.hopRateMs);

  useEffect(() => {
    if (!isRunning || isPaused) return undefined;

    const timer = window.setInterval(() => useSimulationStore.getState().step(), hopRateMs);
    return () => window.clearInterval(timer);
  }, [isRunning, isPaused, hopRateMs]);
};
