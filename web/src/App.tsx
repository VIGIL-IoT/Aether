import { useSimulationEngine } from './hooks/useSimulationEngine';
import { ChannelHistory } from './components/OccupancyMap';
import { ControlPanel } from './components/ControlPanel';
import { Header } from './components/Header';
import { SpectrumView } from './components/SpectrumView';

function App() {
  useSimulationEngine();

  return (
    <div className="app-shell">
      <Header />

      <main className="main-content">
        <section className="intro-row" aria-labelledby="page-title">
          <div>
            <h1 id="page-title">Two radios. One shared band.</h1>
            <p className="intro-copy">
              Explore how two nRF24 radios select channels as they hop. Every value here is
              simulated; this page does not transmit or measure RF.
            </p>
          </div>
          <p className="model-stamp">Deterministic model · 126 RF_CH values</p>
        </section>

        <ControlPanel />

        <div className="visual-column">
          <SpectrumView />
          <ChannelHistory />
        </div>

        <footer className="page-footer">
          <p>Frequency model: 2400 MHz + RF_CH · channels 0–125</p>
          <p>Reference markers show common Wi-Fi and BLE advertising channel centres.</p>
        </footer>
      </main>
    </div>
  );
}

export default App;
