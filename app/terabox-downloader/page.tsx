"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import TeraboxForm from "@/components/terabox-form"
import TeraboxResults from "@/components/terabox-results"
import AboutModal from "@/components/about-modal"

interface TeraboxFile {
  name: string
  size: string
  thumbnail: string
  dlink: string
}

interface TeraboxData {
  files: TeraboxFile[]
  message: string
}

export default function TeraboxDownloader() {
  const [teraboxData, setTeraboxData] = useState<TeraboxData | null>(null)
  const [loading, setLoading] = useState(false)
  const [showAbout, setShowAbout] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [searchAttempted, setSearchAttempted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = async (url: string) => {
    if (!url.trim()) {
      setError("Please enter a Terabox URL")
      return
    }

    setLoading(true)
    setSearchAttempted(true)
    setError(null)

    try {
      const apiUrl = `/api/terabox-downloader?url=${encodeURIComponent(url)}`

      const response = await fetch(apiUrl)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.success && data.files) {
        setTeraboxData({
          files: data.files,
          message: data.message,
        })
        setError(null)
      } else {
        setError(data.message || "Failed to fetch Terabox data")
        setTeraboxData(null)
      }
    } catch (err) {
      setError("Failed to fetch Terabox data. Please check the URL and try again.")
      setTeraboxData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-cyan-50/20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-teal-300/30 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-cyan-300/25 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative z-10">
        <Header
          onAboutClick={() => setShowAbout(true)}
          onSettingsClick={() => {}}
          isScrolled={headerScrolled}
          title="Terabox Downloader"
          showBackButton={true}
          subtitle="Download files from Terabox links"
          hideSettings={true}
        />

        <main className="container mx-auto px-4 py-8">
          <TeraboxForm onSearch={handleSearch} loading={loading} />
          <TeraboxResults teraboxData={teraboxData} loading={loading} searchAttempted={searchAttempted} error={error} />
        </main>

        {showAbout && <AboutModal onClose={() => setShowAbout(false)} isTerabox={true} />}
      </div>
    </div>
  )
}
