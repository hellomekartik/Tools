"use client"
import { Download } from "lucide-react"
import type React from "react"

import { useState } from "react"

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

  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget
    setImageDimensions({ width: img.naturalWidth, height: img.naturalHeight })
  }

  const handleDownload = async () => {
    if (!imageData?.url) return

    try {
      if (imageData.url.startsWith("data:")) {
        const arr = imageData.url.split(",")
        if (arr.length < 2) {
          console.error("[v0] Invalid data URL format")
          return
        }

        const mime = arr[0].match(/:(.*?);/)?.[1] || "image/jpeg"
        const bstr = atob(arr[1])
        const n = bstr.length
        const u8arr = new Uint8Array(n)
        for (let i = 0; i < n; i++) {
          u8arr[i] = bstr.charCodeAt(i)
        }
        const blob = new Blob([u8arr], { type: mime })
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement("a")
        link.href = url
        link.download = `generated-image-${Date.now()}.jpg`
        link.click()
        window.URL.revokeObjectURL(url)
      } else {
        // For regular URLs, fetch normally
        const response = await fetch(imageData.url)
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const a = document.createElement("a")
        a.href = url
        a.download = `generated-image-${Date.now()}.jpg`
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
        document.body.removeChild(a)
      }
    } catch (error) {
      console.error("[v0] Error downloading image:", error)
    }
  }

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Generating Image...</p>
        <p className="text-slate-600 dark:text-slate-400">This may take a moment</p>
      </div>
    )
  }

  if (!imageData?.url) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 dark:text-slate-400">{searchAttempted ? "No results found." : ""}</p>
      </div>
    )
  }

  const aspectRatio = imageDimensions ? (imageDimensions.width / imageDimensions.height) * 100 : null

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b-4 border-cyan-500">
        Generated Image
      </h3>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h4 className="font-semibold text-slate-900 dark:text-white">🖼️ Image Result</h4>
        </div>

        <div className="p-6 space-y-4">
          <div
            className="relative bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden w-full"
            style={aspectRatio ? { paddingBottom: `${aspectRatio}%` } : { height: "400px" }}
          >
            <img
              src={imageData.url || "/placeholder.svg"}
              alt="Generated image"
              className="absolute inset-0 w-full h-full object-contain"
              onLoad={handleImageLoad}
              onError={(e) => {
                console.error("[v0] Image failed to load from:", imageData.url)
                e.currentTarget.style.display = "none"
              }}
              crossOrigin="anonymous"
            />
          </div>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg transition"
          >
            <Download className="w-5 h-5" />
            Download Image
          </button>
        </div>
      </div>
    </div>
  )
}
