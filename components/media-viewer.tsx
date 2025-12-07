"use client"

import type React from "react"

import { useState, useRef, useEffect, useCallback } from "react"
import {
  X,
  Download,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Repeat,
  ArrowLeft,
  RotateCcw,
  RotateCw,
  Loader2,
} from "lucide-react"

interface MediaViewerProps {
  type: "image" | "audio" | "video" | "qr"
  src: string
  title?: string
  artist?: string
  thumbnail?: string
  onClose: () => void
  onDownload?: () => void
}

export default function MediaViewer({ type, src, title, artist, thumbnail, onClose, onDownload }: MediaViewerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isLooping, setIsLooping] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [audioBlob, setAudioBlob] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (type === "audio" && src) {
      setIsLoading(true)

      const proxyUrl = `/api/proxy-audio?url=${encodeURIComponent(src)}`

      fetch(proxyUrl)
        .then((res) => res.blob())
        .then((blob) => {
          const blobUrl = URL.createObjectURL(blob)
          setAudioBlob(blobUrl)
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Failed to load audio:", error)
          setAudioBlob(src)
          setIsLoading(false)
        })

      return () => {
        if (audioBlob && audioBlob.startsWith("blob:")) {
          URL.revokeObjectURL(audioBlob)
        }
      }
    }
  }, [type, src])

  const getMediaElement = useCallback(() => {
    if (type === "audio") return audioRef.current
    if (type === "video") return videoRef.current
    return null
  }, [type])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === " " && (type === "audio" || type === "video")) {
        e.preventDefault()
        togglePlay()
      }
      if (e.key === "ArrowLeft" && (type === "audio" || type === "video")) {
        e.preventDefault()
        skipTime(-5)
      }
      if (e.key === "ArrowRight" && (type === "audio" || type === "video")) {
        e.preventDefault()
        skipTime(5)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [type, onClose, isLoaded])

  const togglePlay = useCallback(() => {
    const media = getMediaElement()
    if (!media) return

    if (media.paused) {
      media.play().catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Playback error:", error)
        }
      })
    } else {
      media.pause()
    }
  }, [getMediaElement])

  const toggleMute = () => {
    const media = getMediaElement()
    if (media) {
      media.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleTimeUpdate = () => {
    const media = getMediaElement()
    if (media) {
      setCurrentTime(media.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    const media = getMediaElement()
    if (media) {
      setDuration(media.duration)
      setIsLoaded(true)
    }
  }

  const handleCanPlayThrough = () => {
    const media = getMediaElement()
    if (media) {
      setDuration(media.duration)
      setIsLoaded(true)
    }
  }

  const seekTo = useCallback(
    (percentage: number) => {
      const media = getMediaElement()
      if (!media || !isLoaded) return

      const newTime = percentage * media.duration
      if (isNaN(newTime) || !isFinite(newTime)) return

      media.currentTime = newTime
      setCurrentTime(newTime)
    },
    [getMediaElement, isLoaded],
  )

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const percentage = Math.max(0, Math.min(1, clickX / rect.width))
    seekTo(percentage)
  }

  const handleProgressTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()

    const rect = e.currentTarget.getBoundingClientRect()
    const touchX = e.touches[0].clientX - rect.left
    const percentage = Math.max(0, Math.min(1, touchX / rect.width))
    seekTo(percentage)
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const vol = Number.parseFloat(e.target.value)
    const media = getMediaElement()
    if (media) {
      media.volume = vol
      setVolume(vol)
      setIsMuted(vol === 0)
    }
  }

  const skipTime = useCallback(
    (seconds: number) => {
      const media = getMediaElement()
      if (!media || !isLoaded) return

      const newTime = Math.max(0, Math.min(media.duration, media.currentTime + seconds))
      if (isNaN(newTime) || !isFinite(newTime)) return

      media.currentTime = newTime
      setCurrentTime(newTime)
    },
    [getMediaElement, isLoaded],
  )

  const toggleLoop = () => {
    const media = getMediaElement()
    if (media) {
      media.loop = !isLooping
      setIsLooping(!isLooping)
    }
  }

  const formatTime = (time: number) => {
    if (!time || isNaN(time)) return "0:00"
    const mins = Math.floor(time / 60)
    const secs = Math.floor(time % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleEnded = () => {
    setIsPlaying(false)
    setCurrentTime(0)
  }

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in p-4">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-[95vw] sm:max-w-lg md:max-w-xl lg:max-w-2xl mx-auto animate-scale-in">
        <div className="absolute -top-12 left-0 right-0 flex items-center justify-between">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full backdrop-blur-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <button onClick={onClose} className="p-2 text-white/70 hover:text-white transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Media Container */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 rounded-3xl overflow-hidden shadow-2xl border border-white/10">
          {/* Image/QR Viewer */}
          {(type === "image" || type === "qr") && (
            <div className="p-4 sm:p-6">
              <div className="relative rounded-2xl overflow-hidden bg-slate-800/50">
                <img
                  src={src || "/placeholder.svg"}
                  alt={title || "Media"}
                  className="w-full h-auto max-h-[50vh] sm:max-h-[60vh] object-contain"
                />
              </div>
              {title && <p className="text-white text-center mt-4 font-medium text-sm sm:text-base">{title}</p>}
              {onDownload && (
                <button
                  onClick={onDownload}
                  className="w-full mt-4 flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/25 text-sm sm:text-base"
                >
                  <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                  Download
                </button>
              )}
            </div>
          )}

          {/* Audio Player - Responsive */}
          {type === "audio" && (
            <div className="p-4 sm:p-6 md:p-8">
              {/* Album Art / Thumbnail - Responsive sizes */}
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-6 sm:mb-8">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-full blur-2xl" />
                <div
                  className="relative w-full h-full rounded-full overflow-hidden border-4 border-white/10 shadow-xl animate-spin-slow"
                  style={{ animationPlayState: isPlaying ? "running" : "paused" }}
                >
                  {thumbnail ? (
                    <img src={thumbnail || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                      <Volume2 className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-white/80" />
                    </div>
                  )}
                </div>
              </div>

              {/* Track Info - Responsive text */}
              <div className="text-center mb-4 sm:mb-6">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 truncate px-2">
                  {title || "Unknown Track"}
                </h3>
                {artist && <p className="text-white/60 text-xs sm:text-sm">{artist}</p>}
              </div>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-6 sm:py-8">
                  <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 text-purple-500 animate-spin mb-4" />
                  <p className="text-white/60 text-xs sm:text-sm">Loading audio...</p>
                </div>
              ) : (
                <>
                  {/* Progress Bar - Bigger touch target on mobile */}
                  <div className="mb-3 sm:mb-4">
                    <div
                      ref={progressBarRef}
                      className="relative w-full h-6 sm:h-5 md:h-4 bg-white/20 rounded-full cursor-pointer group flex items-center overflow-hidden"
                      onClick={handleProgressClick}
                      onTouchStart={handleProgressTouch}
                      role="slider"
                      aria-label="Seek"
                      aria-valuemin={0}
                      aria-valuemax={duration}
                      aria-valuenow={currentTime}
                    >
                      <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full pointer-events-none transition-[width] duration-100 ease-linear"
                        style={{ width: `${progressPercent}%` }}
                      />
                      <div
                        className="absolute top-1/2 -translate-y-1/2 w-5 h-5 sm:w-5 sm:h-5 bg-white rounded-full shadow-lg shadow-purple-500/50 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ left: `calc(${progressPercent}% - 10px)` }}
                      />
                    </div>
                    <div className="flex justify-between text-xs text-white/50 mt-1.5 sm:mt-2">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(duration)}</span>
                    </div>
                  </div>

                  {/* Playback Controls - Responsive spacing and sizing */}
                  <div className="flex items-center justify-center gap-4 sm:gap-5 md:gap-6 mb-4 sm:mb-6">
                    <button
                      onClick={() => skipTime(-5)}
                      className="p-2 sm:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all flex flex-col items-center active:scale-95"
                      title="Rewind 5 seconds"
                    >
                      <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                      <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">5s</span>
                    </button>

                    <button
                      onClick={togglePlay}
                      className="p-4 sm:p-5 bg-white rounded-full text-slate-900 hover:scale-105 active:scale-95 transition-transform shadow-lg shadow-white/25"
                    >
                      {isPlaying ? (
                        <Pause className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10" />
                      ) : (
                        <Play className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 ml-0.5 sm:ml-1" />
                      )}
                    </button>

                    <button
                      onClick={() => skipTime(5)}
                      className="p-2 sm:p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all flex flex-col items-center active:scale-95"
                      title="Forward 5 seconds"
                    >
                      <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                      <span className="text-[10px] sm:text-xs mt-0.5 sm:mt-1">5s</span>
                    </button>
                  </div>

                  {/* Volume & Extra Controls - Responsive */}
                  <div className="flex items-center justify-between">
                    <button
                      onClick={toggleLoop}
                      className={`p-1.5 sm:p-2 transition-colors ${isLooping ? "text-purple-400" : "text-white/50 hover:text-white/80"}`}
                    >
                      <Repeat className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>

                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button onClick={toggleMute} className="p-1.5 sm:p-2 text-white/70 hover:text-white">
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                      <input
                        type="range"
                        min={0}
                        max={1}
                        step={0.1}
                        value={isMuted ? 0 : volume}
                        onChange={handleVolumeChange}
                        className="w-16 sm:w-20 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white"
                      />
                    </div>

                    {onDownload && (
                      <button
                        onClick={onDownload}
                        className="p-1.5 sm:p-2 text-white/50 hover:text-white/80 transition-colors"
                      >
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}
                  </div>

                  <audio
                    ref={audioRef}
                    src={audioBlob || ""}
                    onTimeUpdate={handleTimeUpdate}
                    onLoadedMetadata={handleLoadedMetadata}
                    onCanPlayThrough={handleCanPlayThrough}
                    onEnded={handleEnded}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    preload="auto"
                  />
                </>
              )}
            </div>
          )}

          {/* Video Player - Responsive */}
          {type === "video" && (
            <div className="relative">
              <video
                ref={videoRef}
                src={src}
                className="w-full max-h-[50vh] sm:max-h-[60vh]"
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onCanPlayThrough={handleCanPlayThrough}
                onEnded={handleEnded}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onClick={togglePlay}
                preload="auto"
              />

              {/* Video Controls Overlay */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
                <div
                  className="relative w-full h-4 sm:h-3 bg-white/30 rounded-full cursor-pointer mb-2 sm:mb-3 group"
                  onClick={handleProgressClick}
                  onTouchStart={handleProgressTouch}
                >
                  <div
                    className="absolute top-0 left-0 h-full bg-white rounded-full pointer-events-none"
                    style={{ width: `${progressPercent}%` }}
                  />
                  <div
                    className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{ left: `calc(${progressPercent}% - 8px)` }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <button
                      onClick={() => skipTime(-5)}
                      className="p-1.5 sm:p-2 text-white/70 hover:text-white transition-colors"
                    >
                      <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      onClick={togglePlay}
                      className="p-1.5 sm:p-2 text-white hover:scale-110 transition-transform"
                    >
                      {isPlaying ? (
                        <Pause className="w-5 h-5 sm:w-6 sm:h-6" />
                      ) : (
                        <Play className="w-5 h-5 sm:w-6 sm:h-6" />
                      )}
                    </button>
                    <button
                      onClick={() => skipTime(5)}
                      className="p-1.5 sm:p-2 text-white/70 hover:text-white transition-colors"
                    >
                      <RotateCw className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button onClick={toggleMute} className="p-1.5 sm:p-2 text-white/70 hover:text-white">
                      {isMuted ? (
                        <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
                      ) : (
                        <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      )}
                    </button>
                    <span className="text-white/70 text-xs sm:text-sm">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 sm:gap-2">
                    {onDownload && (
                      <button onClick={onDownload} className="p-1.5 sm:p-2 text-white/70 hover:text-white">
                        <Download className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    )}
                    <button className="p-1.5 sm:p-2 text-white/70 hover:text-white">
                      <Maximize2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
