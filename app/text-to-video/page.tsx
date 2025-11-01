"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import TextToVideoForm from "@/components/text-to-video-form"
import VideoResults from "@/components/video-results"
import AboutModal from "@/components/about-modal"

interface VideoData {
  success: boolean
  url: string
  developer: string
}

export default function TextToVideo() {
  const [results, setResults] = useState<VideoData | null>(null)
  const [loading, setLoading] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [prompt, setPrompt] = useState("")
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [searchAttempted, setSearchAttempted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = async (text: string) => {
    if (!text || text.trim().length === 0) {
      return
    }

    setLoading(true)
    setPrompt(text)
    setSearchAttempted(true)

    try {
      console.log("[v0] Fetching from internal API with prompt:", text)

      const response = await fetch("/api/text-to-video", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: text }),
      })

      console.log("[v0] Internal API response status:", response.status)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] API response data:", data)

      if (data.success && data.url) {
        setResults(data)
      } else {
        console.log("[v0] No valid response from API")
        setResults(null)
      }
    } catch (error) {
      console.error("[v0] Error fetching video:", error)
      setResults(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-md">
      <Header
        onSettingsClick={() => setShowSettings(true)}
        onAboutClick={() => setShowAbout(true)}
        isScrolled={headerScrolled}
        title="Text to Video"
        showBackButton={true}
        headerIcon="/text-to-video-icon.png"
        subtitle="Generate videos from text prompts"
        hideSettings={true}
      />

      <main className="container mx-auto px-4 py-8">
        <TextToVideoForm onSearch={handleSearch} loading={loading} prompt={prompt} searchAttempted={searchAttempted} />
        <VideoResults results={results} loading={loading} searchAttempted={searchAttempted} />
      </main>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} isTextToVideo={true} />}
    </div>
  )
}
