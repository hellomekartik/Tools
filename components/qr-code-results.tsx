"use client"
import { Download } from "lucide-react"

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
  const handleDownload = async () => {
    if (!qrCodeData?.url) return

    try {
      const response = await fetch(qrCodeData.url)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `qr-code-${Date.now()}.jpg`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("[v0] Error downloading QR code:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Generating QR Code...</p>
        <p className="text-slate-600 dark:text-slate-400">This may take a moment</p>
      </div>
    )
  }

  if (!qrCodeData?.url) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 dark:text-slate-400">{searchAttempted ? "No results found." : ""}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b-4 border-cyan-500">
        Generated QR Code
      </h3>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h4 className="font-semibold text-slate-900 dark:text-white">📱 QR Code Result</h4>
        </div>

        <div className="p-6 space-y-4">
          {/* QR Code Image */}
          <div className="flex justify-center bg-slate-100 dark:bg-slate-700 rounded-lg p-8">
            <img
              src={qrCodeData.url || "/placeholder.svg"}
              alt="Generated QR code"
              className="max-w-sm w-full h-auto rounded-lg"
              onError={(e) => {
                console.error("[v0] QR Code image failed to load")
                e.currentTarget.style.display = "none"
              }}
            />
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition"
          >
            <Download className="w-5 h-5" />
            Download QR Code
          </button>
        </div>
      </div>
    </div>
  )
}
