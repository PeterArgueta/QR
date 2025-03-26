import React, { useState, useRef } from 'react'
import { QRCodeCanvas } from 'qrcode.react'

function QRGenerator() {
  const [url, setUrl] = useState('')
  const [qrOptions, setQROptions] = useState({
    fgColor: '#000000',
    bgColor: '#ffffff',
    size: 256,
    errorCorrectionLevel: 'M'
  })
  const [error, setError] = useState('')
  const [showQR, setShowQR] = useState(false)
  const qrRef = useRef(null)

  const validateURL = (url) => {
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const handleGenerate = () => {
    if (!validateURL(url)) {
      setError('⚠️ URL inválida. Asegúrate de incluir https://')
      setShowQR(false)
      return
    }
    setError('')
    setShowQR(true)
  }

  const handleDownload = () => {
    const canvas = qrRef.current.querySelector('canvas')
    const urlImg = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = urlImg
    link.download = 'codigo-qr.png'
    link.click()
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 px-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg transition-all">
        <h2 className="text-xl font-semibold mb-2 text-center">🔗 Genera tu Código QR</h2>
        <div className="text-center mb-6">
          <a
            href="https://github.com/PeterArgueta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              style={{ width: '16px', height: '16px' }}
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577v-2.17c-3.338.726-4.033-1.416-4.033-1.416-.546-1.386-1.333-1.754-1.333-1.754-1.089-.745.083-.729.083-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.76-1.604-2.665-.304-5.467-1.335-5.467-5.933 0-1.311.468-2.382 1.235-3.222-.123-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.3 1.23a11.5 11.5 0 0 1 3.003-.404c1.02.005 2.045.137 3.003.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.12 3.176.77.84 1.233 1.911 1.233 3.222 0 4.61-2.807 5.625-5.48 5.922.43.37.813 1.1.813 2.218v3.293c0 .322.218.694.825.576C20.565 21.796 24 17.298 24 12c0-6.63-5.37-12-12-12z" />
            </svg>
            Visita mi GitHub
          </a>
        </div>

        <input
          type="text"
          placeholder="URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-4 mb-4">
          <label className="flex-1 text-sm font-medium">
            Color
            <input
              type="color"
              value={qrOptions.fgColor}
              onChange={(e) =>
                setQROptions({ ...qrOptions, fgColor: e.target.value })
              }
              className="w-full mt-1"
            />
          </label>
          <label className="flex-1 text-sm font-medium">
            Fondo
            <input
              type="color"
              value={qrOptions.bgColor}
              onChange={(e) =>
                setQROptions({ ...qrOptions, bgColor: e.target.value })
              }
              className="w-full mt-1"
            />
          </label>
        </div>

        <div className="mb-4">
          <label className="text-sm font-medium block mb-1">Tamaño</label>
          <select
            value={qrOptions.size}
            onChange={(e) =>
              setQROptions({ ...qrOptions, size: parseInt(e.target.value) })
            }
            className="w-full p-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="128">Pequeño</option>
            <option value="256">Mediano</option>
            <option value="512">Grande</option>
          </select>
        </div>

        <div className="mb-6">
          <label className="text-sm font-medium block mb-1">
            Corrección de errores
          </label>
          <select
            value={qrOptions.errorCorrectionLevel}
            onChange={(e) =>
              setQROptions({ ...qrOptions, errorCorrectionLevel: e.target.value })
            }
            className="w-full p-2 rounded-md border dark:border-gray-600 bg-white dark:bg-gray-700"
          >
            <option value="L">L (7%)</option>
            <option value="M">M (15%)</option>
            <option value="Q">Q (25%)</option>
            <option value="H">H (30%)</option>
          </select>
        </div>

        <button
          onClick={handleGenerate}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all transform hover:scale-105 mb-4"
        >
          🚀 Generar Código QR
        </button>

        {error && <p className="text-red-500 mt-2 text-center text-sm">{error}</p>}

        {showQR && (
          <div className="mt-4 flex flex-col items-center" ref={qrRef}>
            <QRCodeCanvas
              value={url}
              size={qrOptions.size}
              fgColor={qrOptions.fgColor}
              bgColor={qrOptions.bgColor}
              level={qrOptions.errorCorrectionLevel}
              marginSize={4}
            />
            <button
              onClick={handleDownload}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg transition-all transform hover:scale-105"
            >
              📥 Descargar como PNG
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default QRGenerator
