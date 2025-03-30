import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import './QRGenerator.css';

function QRGenerator() {
  const [url, setUrl] = useState('');
  const [qrOptions, setQROptions] = useState({
    fgColor: '#000000', // Negro por defecto
    bgColor: '#ffffff',
    size: 200,
    errorCorrectionLevel: 'Q', // Nivel Q (25%) por defecto
    logoImage: null
  });
  const [showQR, setShowQR] = useState(false);
  
  // Solo mostrar la sección de URL expandida por defecto
  const [sectionsVisible, setSectionsVisible] = useState({
    content: true,
    colors: false,
    logo: false,
    customize: false
  });
  
  const qrRef = useRef(null);
  const fileInputRef = useRef(null);

  const toggleSection = (section) => {
    setSectionsVisible({
      ...sectionsVisible,
      [section]: !sectionsVisible[section]
    });
  };

  const handleGenerate = () => {
    if (url.trim()) {
      setShowQR(true);
    } else {
      alert('Introduce una URL válida');
      setShowQR(false);
    }
  };

  const handleDownload = () => {
    if (!showQR) return;

    const canvas = qrRef.current.querySelector('canvas');
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = url;
    link.download = 'codigo-qr.png';
    link.click();
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setQROptions({
          ...qrOptions,
          logoImage: event.target.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    setQROptions({
      ...qrOptions,
      logoImage: null
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const colorPresets = [
    { fg: '#000000', bg: '#ffffff' },
    { fg: '#054A91', bg: '#ffffff' },
    { fg: '#3A7D44', bg: '#ffffff' },
    { fg: '#9C1E1E', bg: '#ffffff' },
    { fg: '#374151', bg: '#ffffff' }
  ];

  return (
    <div className="container">
      {/* Barra de navegación */}
      <div className="nav-bar">
        <div className="logo-container">
          <a href="https://github.com/PeterArgueta" target="_blank" rel="noopener noreferrer">
            <div className="github-logo">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </div>
          </a>
          <div>
            <h1 className="app-title">Generá tu QR sin publicidad</h1>
            <p className="app-subtitle">THE 100% FREE QR CODE GENERATOR</p>
          </div>
        </div>
        <div className="nav-links">
          <a href="https://github.com/PeterArgueta" target="_blank" rel="noopener noreferrer" className="nav-link">
            GITHUB
          </a>
        </div>
      </div>
      
      <div className="qr-content">
        {/* Panel izquierdo */}
        <div className="left-panel">
          <div className="card">
            {/* Sección de contenido */}
            <div className="section">
              <div 
                className="section-header"
                onClick={() => toggleSection('content')}
              >
                <span className="section-icon">🌐</span>
                <h3 className="section-title">INTRODUCE CONTENIDO</h3>
                <span className="section-toggle">
                  {sectionsVisible.content ? '−' : '+'}
                </span>
              </div>
              
              {sectionsVisible.content && (
                <div className="section-content">
                  <label className="label">Tu URL</label>
                  <input
                    type="text"
                    placeholder="https://www.ejemplo.com"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="input"
                  />
                </div>
              )}
            </div>

            {/* Sección de colores */}
            <div className="section">
              <div 
                className="section-header"
                onClick={() => toggleSection('colors')}
              >
                <span className="section-icon">🎨</span>
                <h3 className="section-title">ESCOGE COLORES</h3>
                <span className="section-toggle">
                  {sectionsVisible.colors ? '−' : '+'}
                </span>
              </div>
              
              {sectionsVisible.colors && (
                <div className="section-content">
                  <div className="color-presets">
                    {colorPresets.map((preset, index) => (
                      <div
                        key={index}
                        className={`preset ${qrOptions.fgColor === preset.fg ? 'preset-active' : ''}`}
                        style={{
                          backgroundColor: preset.bg
                        }}
                        onClick={() => setQROptions({...qrOptions, fgColor: preset.fg, bgColor: preset.bg})}
                      >
                        <div
                          className="preset-sample"
                          style={{
                            backgroundColor: preset.fg
                          }}
                        ></div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="grid">
                    <div>
                      <label className="label">Color QR</label>
                      <input
                        type="color"
                        value={qrOptions.fgColor}
                        onChange={(e) => setQROptions({...qrOptions, fgColor: e.target.value})}
                        className="color-input"
                      />
                    </div>
                    <div>
                      <label className="label">Color Fondo</label>
                      <input
                        type="color"
                        value={qrOptions.bgColor}
                        onChange={(e) => setQROptions({...qrOptions, bgColor: e.target.value})}
                        className="color-input"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sección del logo */}
            <div className="section">
              <div 
                className="section-header"
                onClick={() => toggleSection('logo')}
              >
                <span className="section-icon">🖼️</span>
                <h3 className="section-title">AÑADIR IMAGEN DEL LOGO</h3>
                <span className="section-toggle">
                  {sectionsVisible.logo ? '−' : '+'}
                </span>
              </div>
              
              {sectionsVisible.logo && (
                <div className="section-content">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleLogoUpload}
                    accept="image/*"
                    id="logo-upload"
                    className="file-input"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="file-label"
                  >
                    {qrOptions.logoImage ? 'Cambiar logo' : 'Subir logo'}
                  </label>
                  
                  {qrOptions.logoImage && (
                    <button
                      onClick={handleRemoveLogo}
                      className="button secondary-button"
                    >
                      Eliminar logo
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Sección de personalización */}
            <div className="section">
              <div 
                className="section-header"
                onClick={() => toggleSection('customize')}
              >
                <span className="section-icon">⚙️</span>
                <h3 className="section-title">PERSONALIZAR DISEÑO</h3>
                <span className="section-toggle">
                  {sectionsVisible.customize ? '−' : '+'}
                </span>
              </div>
              
              {sectionsVisible.customize && (
                <div className="section-content">
                  <div className="grid">
                    <div>
                      <label className="label">Tamaño</label>
                      <select
                        value={qrOptions.size}
                        onChange={(e) => setQROptions({...qrOptions, size: parseInt(e.target.value)})}
                        className="select"
                      >
                        <option value="128">Pequeño</option>
                        <option value="200">Mediano</option>
                        <option value="256">Grande</option>
                      </select>
                    </div>
                    <div>
                      <label className="label">Corrección</label>
                      <select
                        value={qrOptions.errorCorrectionLevel}
                        onChange={(e) => setQROptions({...qrOptions, errorCorrectionLevel: e.target.value})}
                        className="select"
                      >
                        <option value="L">L (7%)</option>
                        <option value="M">M (15%)</option>
                        <option value="Q">Q (25%)</option>
                        <option value="H">H (30%)</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Botón generar */}
            <div className="button-container">
              <button
                onClick={handleGenerate}
                className="button primary-button"
              >
                Crea Código QR
              </button>
            </div>
          </div>
        </div>

        {/* Panel derecho */}
        <div className="right-panel">
          <div className="card preview-container">
            <div className="qr-container" ref={qrRef}>
              {showQR ? (
                <QRCodeCanvas
                  value={url || 'https://ejemplo.com'}
                  size={qrOptions.size}
                  fgColor={qrOptions.fgColor}
                  bgColor={qrOptions.bgColor}
                  level={qrOptions.errorCorrectionLevel}
                  imageSettings={
                    qrOptions.logoImage
                      ? {
                          src: qrOptions.logoImage,
                          width: qrOptions.size * 0.2,
                          height: qrOptions.size * 0.2,
                          excavate: true,
                        }
                      : undefined
                  }
                />
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📱</div>
                  <p>Introduce una URL y presiona "Crea Código QR"</p>
                </div>
              )}
            </div>
            
            {showQR && (
              <div className="download-container">
                <div className="size-text">1000 x 1000 Px</div>
                
                {/* Solo mostrar el botón de PNG como solicitado */}
                <button
                  onClick={handleDownload}
                  className="button primary-button"
                >
                  Descarga PNG
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default QRGenerator;