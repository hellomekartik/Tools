"use client"

import { DownloadIcon, AlertCircle, Music, Play, Loader2 } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import MediaViewer from "./media-viewer"

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
  const [showPlayer, setShowPlayer] = useState(false)
  const [preloadedAudioBlob, setPreloadedAudioBlob] = useState<string | null>(null)
  const [waitingForAudio, setWaitingForAudio] = useState(false)
  const [isFetchingAudio, setIsFetchingAudio] = useState(false)
  const preloadAbortRef = useRef<AbortController | null>(null)

  useEffect(() => {
    if (trackInfo?.audio) {
      if (preloadAbortRef.current) {
        preloadAbortRef.current.abort()
      }

      preloadAbortRef.current = new AbortController()
      setPreloadedAudioBlob(null)

      const proxyUrl = `/api/proxy-audio?url=${encodeURIComponent(trackInfo.audio)}`

      setIsFetchingAudio(true)
      fetch(proxyUrl, { signal: preloadAbortRef.current.signal })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch")
          return res.blob()
        })
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob)
          setPreloadedAudioBlob(blobUrl)
          setIsFetchingAudio(false)
          if (waitingForAudio) {
            setShowPlayer(true)
            setWaitingForAudio(false)
          }
        })
        .catch((err) => {
          if (err.name !== "AbortError") {
            console.error("Failed to preload audio:", err)
            if (waitingForAudio) {
              setShowPlayer(true)
              setWaitingForAudio(false)
            }
          }
          setIsFetchingAudio(false)
        })

      return () => {
        if (preloadAbortRef.current) {
          preloadAbortRef.current.abort()
        }
      }
    }
  }, [trackInfo?.audio, waitingForAudio])

  useEffect(() => {
    return () => {
      if (preloadedAudioBlob) {
        URL.revokeObjectURL(preloadedAudioBlob)
      }
    }
  }, [preloadedAudioBlob])

  const handlePlayClick = () => {
    if (preloadedAudioBlob) {
      setShowPlayer(true)
    } else {
      setWaitingForAudio(true)
    }
  }

  const handleDownload = async () => {
    if (!trackInfo.audio) {
      alert("Download link not available for this track")
      return
    }

    setDownloading(true)
    try {
      const trackName = (trackInfo.title || "track").replace(/[^a-zA-Z0-9\s\-_.]/g, "").trim()
      const response = await fetch(
        `/api/download-media?url=${encodeURIComponent(trackInfo.audio)}&filename=${encodeURIComponent(trackName)}`,
      )

      if (!response.ok) {
        throw new Error("Download failed")
      }

      const blob = await response.blob()
      const blobUrl = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = blobUrl
      link.download = `${trackName}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => URL.revokeObjectURL(blobUrl), 1000)
    } catch (err) {
      console.error("Download error:", err)
      window.open(trackInfo.audio, "_blank")
    } finally {
      setDownloading(false)
    }
  }

  if (!trackInfo && !loading && !error) {
    return null
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 flex items-start gap-4">
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
        <div className="bg-white rounded-2xl shadow-sm p-8 border border-slate-100">
          <div className="flex items-center justify-center gap-3">
            <div className="w-5 h-5 border-2 border-green-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-500 font-medium">Finding Track...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!trackInfo) {
    return null
  }

  return (
    <>
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-slate-100">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Thumbnail */}
            <div className="md:w-44 flex-shrink-0">
              <div className="w-full aspect-square bg-slate-100 rounded-xl overflow-hidden flex items-center justify-center relative group">
                {trackInfo.image ? (
                  <>
                    <img
                      src={trackInfo.image || "/placeholder.svg"}
                      alt={trackInfo.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "/abstract-soundscape.png"
                      }}
                    />
                    {trackInfo.audio && (
                      <button
                        onClick={handlePlayClick}
                        disabled={waitingForAudio}
                        className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        <div className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">
                          {waitingForAudio || isFetchingAudio ? (
                            <Loader2 className="w-5 h-5 text-white animate-spin" />
                          ) : (
                            <Play className="w-5 h-5 text-white ml-0.5" />
                          )}
                        </div>
                      </button>
                    )}
                  </>
                ) : (
                  <Music className="w-14 h-14 text-slate-300" />
                )}
              </div>
            </div>

            {/* Track Details */}
            <div className="flex-1 flex flex-col justify-center">
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{trackInfo.title || "Unknown Title"}</h2>
                  {trackInfo.artists && <p className="text-sm text-slate-500 mt-1">{trackInfo.artists}</p>}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  {trackInfo.audio && (
                    <button
                      onClick={handlePlayClick}
                      disabled={waitingForAudio}
                      className="flex-1 bg-emerald-500 hover:bg-emerald-600 disabled:bg-emerald-400 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      {waitingForAudio ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Loading Audio...
                        </>
                      ) : (
                        <>
                          <Play className="w-4 h-4" />
                          Play Track
                        </>
                      )}
                    </button>
                  )}

                  <button
                    onClick={handleDownload}
                    disabled={downloading || !trackInfo.audio}
                    className="flex-1 bg-slate-800 hover:bg-slate-900 disabled:bg-slate-300 text-white font-medium py-2.5 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    {downloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Downloading...
                      </>
                    ) : (
                      <>
                        <DownloadIcon className="w-4 h-4" />
                        Download
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showPlayer && trackInfo.audio && (
        <MediaViewer
          type="audio"
          src={trackInfo.audio}
          preloadedBlob={preloadedAudioBlob}
          title={trackInfo.title}
          artist={trackInfo.artists}
          thumbnail={trackInfo.image}
          onClose={() => setShowPlayer(false)}
          onDownload={handleDownload}
        />
      )}
    </>
  )
}
