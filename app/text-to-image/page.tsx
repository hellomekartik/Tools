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
      console.log("[v0] Fetching from:", apiUrl)

      const response = await fetch(apiUrl)
      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Response data received")

      if (data.url) {
        setImageData({
          url: data.url,
          prompt,
        })
      } else {
        setImageData(null)
      }
    } catch (error) {
      console.error("[v0] Error fetching image:", error)
      setImageData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-md">
      <Header
        onSettingsClick={() => {}}
        onAboutClick={() => setShowAbout(true)}
        isScrolled={headerScrolled}
        title="Text to Image"
        showBackButton={true}
        subtitle="Generate images from text prompts"
        hideSettings={true}
      />

      <main className="container mx-auto px-4 py-8">
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
  )
}
