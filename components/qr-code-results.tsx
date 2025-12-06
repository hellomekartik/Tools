"use client"
import { Download, Maximize2 } from "lucide-react"
import { useState } from "react"
import MediaViewer from "./media-viewer"

interface QrCodeData {
  url: string
  inputUrl: string
}

interface QrCodeResultsProps {
  qrCodeData: QrCodeData | null
  loading: boolean
  searchAttempted: boolean
}

export default function QrCodeResults({ qrCodeData, loading, searchAttempted }: QrCodeResultsProps) {
  const [showViewer, setShowViewer] = useState(false)

  const handleDownload = async () => {
    if (!qrCodeData?.url) return

    try {
      const downloadUrl = `/api/download-media?url=${encodeURIComponent(qrCodeData.url)}&filename=qr-code-${Date.now()}.jpg`
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `qr-code-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("[v0] Error downloading QR code:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-500 rounded-full animate-spin mb-4" />
        <p className="text-lg font-semibold text-slate-900">Generating QR Code...</p>
        <p className="text-slate-600">This may take a moment</p>
      </div>
    )
  }

  if (!qrCodeData?.url) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600">{searchAttempted ? "No results found." : ""}</p>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b-4 border-indigo-500">Generated QR Code</h3>

        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 px-6 py-4 border-b border-slate-200">
            <h4 className="font-semibold text-slate-900">QR Code Result</h4>
          </div>

          <div className="p-6 space-y-4">
            <div
              className="flex justify-center bg-slate-100 rounded-lg p-8 cursor-pointer group relative"
              onClick={() => setShowViewer(true)}
            >
              <img
                src={qrCodeData.url || "/placeholder.svg"}
                alt="Generated QR code"
                className="max-w-sm w-full h-auto rounded-lg"
                onError={(e) => {
                  console.error("[v0] QR Code image failed to load")
                  e.currentTarget.style.display = "none"
                }}
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors rounded-lg flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 rounded-full p-3 shadow-lg">
                  <Maximize2 className="w-6 h-6 text-slate-700" />
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowViewer(true)}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition"
              >
                <Maximize2 className="w-5 h-5" />
                View Full
              </button>
              <button
                onClick={handleDownload}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-semibold rounded-lg transition shadow-lg shadow-indigo-500/25"
              >
                <Download className="w-5 h-5" />
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      {showViewer && (
        <MediaViewer
          type="qr"
          src={qrCodeData.url}
          title={`QR Code for: ${qrCodeData.inputUrl}`}
          onClose={() => setShowViewer(false)}
          onDownload={handleDownload}
        />
      )}
    </>
  )
}
