"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import TranslatorForm from "@/components/translator-form"
import TranslatorResults from "@/components/translator-results"
import AboutModal from "@/components/about-modal"

export default function Translator() {
  const [translatedText, setTranslatedText] = useState<string | null>(null)
  const [targetLanguage, setTargetLanguage] = useState<string>("")
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

  const handleTranslate = async (text: string, language: string, languageName: string) => {
    if (!text.trim()) return

    setLoading(true)
    setSearchAttempted(true)
    setTargetLanguage(languageName)

    try {
      const response = await fetch(`/api/translator?text=${encodeURIComponent(text)}&language=${language}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()

      if (data.translatedText) {
        setTranslatedText(data.translatedText)
      } else {
        setTranslatedText(null)
      }
    } catch (error) {
      console.error("Error translating:", error)
      setTranslatedText(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearchAttempt = () => {
    setSearchAttempted(true)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-orange-200/20 rounded-full blur-3xl animate-float-gentle" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-amber-200/15 rounded-full blur-3xl animate-float-gentle"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative z-10">
        <Header
          onAboutClick={() => setShowAbout(true)}
          onSettingsClick={() => {}}
          isScrolled={headerScrolled}
          title="Translator"
          showBackButton={true}
          subtitle="Translate text to any language"
          hideSettings={true}
        />

        <main className="container mx-auto px-4 py-8">
          <TranslatorForm
            onTranslate={handleTranslate}
            loading={loading}
            searchAttempted={searchAttempted}
            onSearchAttempt={handleSearchAttempt}
          />
          <TranslatorResults
            translatedText={translatedText}
            targetLanguage={targetLanguage}
            loading={loading}
            searchAttempted={searchAttempted}
          />
        </main>

        {showAbout && <AboutModal onClose={() => setShowAbout(false)} isTranslator={true} />}
      </div>
    </div>
  )
}
