export const Header = () => {
  return (
    <header className="bg-bg-panel border-b border-bg-border p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-accent-primary tracking-wider">
            AETHER
          </h1>
          <p className="text-sm text-text-secondary mt-1">
            Educational RF Research Platform • ESP32 + Dual NRF24L01+
          </p>
        </div>
        
        <div className="flex items-center gap-6 text-[10px]">
          <div className="text-right">
            <div className="text-text-secondary">DUAL RADIOS</div>
            <div className="text-accent-primary font-bold">HSPI + VSPI</div>
          </div>
          <div className="text-right">
            <div className="text-text-secondary">FREQUENCY</div>
            <div className="text-accent-secondary font-bold">2.4 GHz ISM</div>
          </div>
          <div className="text-right">
            <div className="text-text-secondary">CHANNELS</div>
            <div className="text-accent-warning font-bold">0-125</div>
          </div>
        </div>
      </div>
    </header>
  );
};
