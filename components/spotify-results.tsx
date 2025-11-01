"use client"

import { AlertCircle, Music } from "lucide-react"

interface TrackDetail {
  url: string
  title?: string
  artist?: string
  artists?: string | string[]
  thumbnail?: string
}

interface SpotifyResultsProps {
  tracks: TrackDetail[]
  loading: boolean
  searchAttempted: boolean
  error: string | null
  onUrlSelect: (url: string) => void
  selectedUrl: string | null
}

export default function SpotifyResults({
  tracks,
  loading,
  searchAttempted,
  error,
  onUrlSelect,
  selectedUrl,
}: SpotifyResultsProps) {
  if (!searchAttempted && !tracks.length) {
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
            <p className="text-slate-600 font-medium">Searching for tracks...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!tracks || tracks.length === 0) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Found {tracks.length} Track(s)</h3>

        <div className="space-y-3">
          {tracks.map((track, index) => (
            <button
              key={index}
              onClick={() => onUrlSelect(track.url)}
              className={`w-full p-4 rounded-lg border-2 transition text-left flex items-center gap-4 group ${
                selectedUrl === track.url
                  ? "bg-green-50 border-green-500"
                  : "bg-slate-50 border-slate-200 hover:border-green-400"
              }`}
            >
              {/* Thumbnail */}
              <div className="flex-shrink-0 w-16 h-16 rounded bg-slate-200 overflow-hidden flex items-center justify-center">
                {track.thumbnail ? (
                  <img
                    src={track.thumbnail || "/placeholder.svg"}
                    alt={track.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                ) : (
                  <Music className="w-8 h-8 text-slate-400" />
                )}
              </div>

              {/* Track Info */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 group-hover:text-green-600 transition">{track.title}</p>
                {(track.artist || track.artists) && (
                  <p className="text-sm text-slate-600">
                    {typeof track.artists === "string"
                      ? track.artists
                      : Array.isArray(track.artists)
                        ? track.artists.join(", ")
                        : track.artist}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
