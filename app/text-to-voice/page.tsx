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
      return
    }

    setLoading(true)
    setSearchAttempted(true)

    try {
      const apiUrl = `/api/text-to-voice?text=${encodeURIComponent(text)}&type=${type}${voice ? `&voice=${voice}` : ""}${lang ? `&lang=${lang}` : ""}`

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-sky-300/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-blue-300/25 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative z-10">
        <Header
          onAboutClick={() => setShowAbout(true)}
          onSettingsClick={() => {}}
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
    </div>
  )
}
