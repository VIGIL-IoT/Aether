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
      <footer className="border-t border-bg-border p-4 flex items-center justify-between">
        <div className="text-center flex-1">
          <p className="text-[10px] text-text-primary">Interactive Digital Twin • Real-time RF Simulation • Future Mesh Protocol Support</p>
          <p className="text-[10px] text-text-secondary mt-1">Built with React + TypeScript + Framer Motion</p>
        </div>
        
        {/* GitHub Button */}
        <a
          href="https://github.com/shaxntanu/Aether"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-4 w-10 h-10 rounded-full bg-bg-border border-2 border-bg-border hover:bg-white hover:border-white flex items-center justify-center transition-all hover:rotate-360"
        >
          <svg
            viewBox="0 0 20 20"
            width="22px"
            className="btn-svg"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            fill="#D9E2EC"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
            <g id="SVGRepo_iconCarrier">
              <path d="M10,0.5 C4.75,0.5 0.5,4.75 0.5,10 C0.5,14.4375 3.34375,18.1719 7.34375,19.3281 C7.84375,19.4219 8.03125,19.1094 8.03125,18.8438 C8.03125,18.5938 8.021875,17.8125 8.021875,16.9688 C5.5,17.5313 4.825,16.4531 4.59375,15.9375 C4.46875,15.6875 3.96875,14.8125 3.53125,14.5625 C3.171875,14.375 2.671875,13.8125 3.521875,13.8031 C4.3125,13.7938 4.875,14.625 5.0625,14.9375 C5.96875,16.5625 7.40625,15.9875 8.0625,15.7219 C8.15625,15.1094 8.421875,14.6875 8.71875,14.4375 C6.46875,14.1875 4.09375,13.3125 4.09375,9.625 C4.09375,8.7656 4.46875,8.0625 5.09375,7.5156 C5,7.2656 4.6875,6.4688 5.1875,5.375 C5.1875,5.375 5.96875,5.1094 8.03125,6.2188 C8.78125,6.0156 9.59375,5.9063 10.4062,5.9063 C11.2188,5.9063 12.0313,6.0156 12.7813,6.2188 C14.8438,5.1 15.625,5.375 15.625,5.375 C16.125,6.4688 15.8125,7.2656 15.7188,7.5156 C16.3438,8.0625 16.7188,8.7656 16.7188,9.625 C16.7188,13.3219 14.3438,14.1875 12.0938,14.4375 C12.46875,14.75 12.78125,15.3438 12.78125,16.2344 C12.78125,17.5 12.771875,18.5 12.771875,18.8438 C12.771875,19.1094 12.95875,19.4313 13.46875,19.3281 C17.46875,18.1719 20.3125,14.4375 20.3125,10 C20.3125,4.75 16.25,0.5 10,0.5 Z" fill="#D9E2EC"></path>
            </g>
          </svg>
        </a>
      </footer>
    </div>
  );
}

export default App;
