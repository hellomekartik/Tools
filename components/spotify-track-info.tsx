"use client"

import { DownloadIcon, AlertCircle, Music } from "lucide-react"
import { useState } from "react"

interface TrackInfo {
  title?: string
  artist?: string
  artists?: string
  album?: string
  image?: string
  url?: string
  audio?: string
  [key: string]: any
}

interface SpotifyTrackInfoProps {
  trackInfo: TrackInfo | null
  loading: boolean
  error: string | null
  onDownload: (downloadUrl: string) => void
}

export default function SpotifyTrackInfo({ trackInfo, loading, error, onDownload }: SpotifyTrackInfoProps) {
  const [downloading, setDownloading] = useState(false)

  if (!trackInfo && !loading && !error) {
    return null
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 font-medium">Finding Track Information...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!trackInfo) {
    return null
  }

  const handleDownload = async () => {
    if (!trackInfo.audio) {
      alert("Download link not available for this track")
      return
    }

    setDownloading(true)
    try {
      const response = await fetch(trackInfo.audio)
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${trackInfo.title || "track"}.mp3`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (err) {
      console.error("[v0] Download error:", err)
      alert("Failed to download track")
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Track Information</h3>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Thumbnail */}
          <div className="md:w-48 flex-shrink-0">
            <div className="w-full aspect-square bg-slate-200 rounded-lg overflow-hidden flex items-center justify-center">
              {trackInfo.image ? (
                <img
                  src={trackInfo.image || "/placeholder.svg"}
                  alt={trackInfo.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/abstract-soundscape.png"
                  }}
                />
              ) : (
                <Music className="w-16 h-16 text-slate-400" />
              )}
            </div>
          </div>

          {/* Track Details */}
          <div className="flex-1 flex flex-col justify-center">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">{trackInfo.title || "Unknown Title"}</h2>
                {trackInfo.artists && <p className="text-sm text-slate-600 mt-1">{trackInfo.artists}</p>}
              </div>

              {/* Download Button */}
              <button
                onClick={handleDownload}
                disabled={downloading || !trackInfo.audio}
                className="w-full bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-semibold py-3 px-4 rounded-lg transition flex items-center justify-center gap-2"
              >
                {downloading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Downloading...
                  </>
                ) : (
                  <>
                    <DownloadIcon className="w-5 h-5" />
                    Download Track
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
