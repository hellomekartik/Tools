"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import LinkToQrForm from "@/components/link-to-qr-form"
import QrCodeResults from "@/components/qr-code-results"
import AboutModal from "@/components/about-modal"

interface QrCodeData {
  url: string
  inputUrl: string
}

export default function LinkToQr() {
  const [qrCodeData, setQrCodeData] = useState<QrCodeData | null>(null)
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

  const handleSearch = async (url: string) => {
    if (!url.trim()) {
      return
    }

    setLoading(true)
    setSearchAttempted(true)

    try {
      const apiUrl = `/api/link-to-qr?url=${encodeURIComponent(url)}`
      console.log("[v0] Fetching from:", apiUrl)

      const response = await fetch(apiUrl)
      console.log("[v0] Response status:", response.status)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Response data received")

      if (data.url) {
        setQrCodeData({
          url: data.url,
          inputUrl: url,
        })
      } else {
        setQrCodeData(null)
      }
    } catch (error) {
      console.error("[v0] Error generating QR code:", error)
      setQrCodeData(null)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-indigo-200/20 rounded-full blur-3xl animate-float-gentle" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-purple-200/15 rounded-full blur-3xl animate-float-gentle"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative z-10">
        <Header
          onSettingsClick={() => {}}
          onAboutClick={() => setShowAbout(true)}
          isScrolled={headerScrolled}
          title="Link to QR"
          showBackButton={true}
          subtitle="Convert links to QR codes"
          hideSettings={true}
        />

        <main className="container mx-auto px-4 py-8">
          <LinkToQrForm
            onSearch={handleSearch}
            loading={loading}
            searchAttempted={searchAttempted}
            onSearchAttempt={() => setSearchAttempted(true)}
          />
          <QrCodeResults qrCodeData={qrCodeData} loading={loading} searchAttempted={searchAttempted} />
        </main>

        {showAbout && <AboutModal onClose={() => setShowAbout(false)} isLinkToQr={true} />}
      </div>
    </div>
  )
}
