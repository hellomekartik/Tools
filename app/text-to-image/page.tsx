"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import TextToImageForm from "@/components/text-to-image-form"
import ImageResults from "@/components/image-results"
import AboutModal from "@/components/about-modal"

interface ImageData {
  url: string
  prompt: string
}

export default function TextToImage() {
  const [imageData, setImageData] = useState<ImageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [searchAttempted, setSearchAttempted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = async (prompt: string) => {
    if (!prompt.trim()) {
      return
    }

    setLoading(true)
    setSearchAttempted(true)

    try {
      const apiUrl = `/api/text-to-image?prompt=${encodeURIComponent(prompt)}`
      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.url) {
        setImageData({
          url: data.url,
          prompt,
        })
      } else {
        setImageData(null)
      }
    } catch (error) {
      console.error("Error fetching image:", error)
      setImageData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-300/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/3 w-72 h-72 bg-indigo-200/30 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </div>

      <div className="relative z-10">
        <Header
          onSettingsClick={() => {}}
          onAboutClick={() => setShowAbout(true)}
          isScrolled={headerScrolled}
          title="Text to Image"
          showBackButton={true}
          subtitle="Generate images from text prompts"
          hideSettings={true}
        />

        <main className="container mx-auto px-4 py-8 animate-fade-in-up">
          <TextToImageForm
            onSearch={handleSearch}
            loading={loading}
            searchAttempted={searchAttempted}
            onSearchAttempt={() => setSearchAttempted(true)}
          />
          <ImageResults imageData={imageData} loading={loading} searchAttempted={searchAttempted} />
        </main>

        {showAbout && <AboutModal onClose={() => setShowAbout(false)} isTextToImage={true} />}
      </div>
    </div>
  )
}
