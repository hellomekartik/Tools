"use client"

import { Loader2, Play, Download, Volume2 } from "lucide-react"
import { useState } from "react"
import MediaViewer from "./media-viewer"

interface AudioData {
  url: string
  text: string
  type: string
  voice?: string
  lang?: string
}

interface AudioResultsProps {
  audioData: AudioData | null
  loading: boolean
  searchAttempted: boolean
}

export default function AudioResults({ audioData, loading, searchAttempted }: AudioResultsProps) {
  const [showPlayer, setShowPlayer] = useState(false)

  const handleDownload = () => {
    if (!audioData?.url) return

    const downloadUrl = `/api/download-media?url=${encodeURIComponent(audioData.url)}&filename=voice-${Date.now()}.mp3`
    const link = document.createElement("a")
    link.href = downloadUrl
    link.download = `voice-${Date.now()}.mp3`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-purple-500 mx-auto mb-4" />
        <p className="text-slate-600">Generating voice...</p>
      </div>
    )
  }

  if (!audioData) {
    return (
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 sm:p-12 border border-slate-200">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 flex items-center justify-center mb-4">
              <Volume2 className="w-8 h-8 text-purple-500" />
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">Ready to Convert</h3>
            <p className="text-slate-500">Enter your text and select a voice to get started</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Generated Audio</h3>

            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowPlayer(true)}
                  className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/25 hover:scale-105 transition-transform"
                >
                  <Play className="w-7 h-7 text-white ml-1" />
                </button>
                <div className="flex-1">
                  <p className="font-medium text-slate-900 mb-1">Voice Generated</p>
                  <p className="text-sm text-slate-600 line-clamp-2">{audioData.text}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setShowPlayer(true)}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-lg transition shadow-lg shadow-purple-500/25"
            >
              <Play className="w-5 h-5" />
              Play Audio
            </button>
            <button
              onClick={handleDownload}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-lg transition"
            >
              <Download className="w-5 h-5" />
              Download
            </button>
          </div>
        </div>
      </div>

      {showPlayer && (
        <MediaViewer
          type="audio"
          src={audioData.url}
          title="Generated Voice"
          onClose={() => setShowPlayer(false)}
          onDownload={handleDownload}
        />
      )}
    </>
  )
}
