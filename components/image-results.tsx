"use client"
import { Download, Maximize2 } from "lucide-react"
import type React from "react"
import { useState } from "react"
import MediaViewer from "./media-viewer"

interface ImageData {
  url: string
  prompt: string
}

interface ImageResultsProps {
  imageData: ImageData | null
  loading: boolean
  searchAttempted: boolean
}

export default function ImageResults({ imageData, loading, searchAttempted }: ImageResultsProps) {
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null)
  const [showViewer, setShowViewer] = useState(false)

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
  }

  const handleDownload = async () => {
    if (!imageData?.url) return

    try {
      const downloadUrl = `/api/download-media?url=${encodeURIComponent(imageData.url)}&filename=generated-image-${Date.now()}.jpg`
      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = `generated-image-${Date.now()}.jpg`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error("[v0] Error downloading image:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mb-4" />
        <p className="text-lg font-semibold text-slate-900">Generating Image...</p>
        <p className="text-slate-600">This may take a moment</p>
      </div>
    )
  }

  if (!imageData?.url) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600">{searchAttempted ? "No results found." : ""}</p>
      </div>
    )
  }

  const aspectRatio = imageDimensions ? (imageDimensions.width / imageDimensions.height) * 100 : null

  const proxiedUrl = `/api/proxy-image?url=${encodeURIComponent(imageData.url)}`

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 pb-4 border-b-4 border-emerald-500">Generated Image</h3>

        <div className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden">
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 px-6 py-4 border-b border-slate-200">
            <h4 className="font-semibold text-slate-900">Image Result</h4>
          </div>

          <div className="p-6 space-y-4">
            <div
              className="relative bg-slate-100 rounded-lg overflow-hidden w-full cursor-pointer group"
              style={aspectRatio ? { paddingBottom: `${aspectRatio}%` } : { height: "400px" }}
              onClick={() => setShowViewer(true)}
            >
              <img
                src={proxiedUrl || "/placeholder.svg"}
                alt="Generated image"
                className="absolute inset-0 w-full h-full object-contain"
                onLoad={handleImageLoad}
                onError={(e) => {
                  console.error("[v0] Image failed to load from:", imageData.url)
                  e.currentTarget.style.display = "none"
                }}
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
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
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-lg transition shadow-lg shadow-emerald-500/25"
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
          type="image"
          src={proxiedUrl}
          title={imageData.prompt}
          onClose={() => setShowViewer(false)}
          onDownload={handleDownload}
        />
      )}
    </>
  )
}
