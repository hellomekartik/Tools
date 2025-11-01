"use client"

import { useState, useEffect, useRef } from "react"
import Header from "@/components/header"
import TextToVoiceForm from "@/components/text-to-voice-form"
import AudioResults from "@/components/audio-results"
import AboutModal from "@/components/about-modal"

interface AudioData {
  url: string
  text: string
  type: string
  voice?: string
  lang?: string
}

export default function TextToVoice() {
  const [audioData, setAudioData] = useState<AudioData | null>(null)
  const [loading, setLoading] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [searchAttempted, setSearchAttempted] = useState(false)
  const isUserInitiatedRef = useRef(false)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = async (text: string, type: string, voice?: string, lang?: string) => {
    if (!text.trim()) {
      console.log("[v0] Search blocked - empty text")
      return
    }

    setLoading(true)
    setSearchAttempted(true)

    try {
      const apiUrl = `/api/text-to-voice?text=${encodeURIComponent(text)}&type=${type}${voice ? `&voice=${voice}` : ""}${lang ? `&lang=${lang}` : ""}`
      console.log("[v0] Fetching voice from:", apiUrl)

      const response = await fetch(apiUrl)
      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Voice generation response received")

      if (data.url) {
        setAudioData({
          url: data.url,
          text,
          type,
          voice,
          lang,
        })
      } else {
        setAudioData(null)
      }
    } catch (error) {
      console.error("[v0] Error generating voice:", error)
      setAudioData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchAttempt = () => {
    setSearchAttempted(true)
  }

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-md">
      <Header
        onAboutClick={() => setShowAbout(true)}
        isScrolled={headerScrolled}
        title="Text to Voice"
        showBackButton={true}
        headerIcon="/text-to-voice-icon.jpg"
        subtitle="Instant voice generation from text"
        hideSettings={true}
      />

      <main className="container mx-auto px-4 py-8">
        <TextToVoiceForm
          onSearch={handleSearch}
          loading={loading}
          searchAttempted={searchAttempted}
          onSearchAttempt={handleSearchAttempt}
        />
        <AudioResults audioData={audioData} loading={loading} searchAttempted={searchAttempted} />
      </main>

      {showAbout && <AboutModal onClose={() => setShowAbout(false)} isTextToVoice={true} />}
    </div>
  )
}
