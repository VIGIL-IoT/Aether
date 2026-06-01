import { useSimulationEngine } from './hooks/useSimulationEngine';
import { Header } from './components/Header';
import { DeviceView } from './components/DeviceView';
import { SpectrumView } from './components/SpectrumView';
import { OccupancyMap } from './components/OccupancyMap';
import { NetworkView } from './components/NetworkView';
import { TelemetryPanel } from './components/TelemetryPanel';
import { ControlPanel } from './components/ControlPanel';

function App() {
  useSimulationEngine();

  return (
    <div className="min-h-screen bg-bg-primary text-text-primary">
      <Header />
      
      <main className="container mx-auto p-6">
        {/* Top Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <DeviceView />
          <SpectrumView />
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <OccupancyMap />
          <NetworkView />
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TelemetryPanel />
          <ControlPanel />
        </div>
      </main>

      {/* Footer Info */}
      <footer className="border-t border-bg-border p-4 text-center text-[10px] text-text-secondary">
        <p>Interactive Digital Twin • Real-time RF Simulation • Future Mesh Protocol Support</p>
        <p className="mt-1">Built with React + TypeScript + Framer Motion</p>
      </footer>
    </div>
  );
}

export default App;
