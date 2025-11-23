"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import SpotifySearchForm from "@/components/spotify-search-form"
import SpotifyTrackInfo from "@/components/spotify-track-info"
import SpotifyResults from "@/components/spotify-results"
import AboutModal from "@/components/about-modal"

interface TrackInfo {
  title?: string
  artist?: string
  artists?: string
  album?: string
  image?: string
  url?: string
  audio?: string
  [key: string]: any
}

interface TrackDetail {
  url: string
  title?: string
  artist?: string
  artists?: string
  thumbnail?: string
}

export default function SpotifyDownloader() {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingType, setLoadingType] = useState<"search" | "track-info">("search")
  const [showAbout, setShowAbout] = useState(false)
  const [headerScrolled, setHeaderScrolled] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null)
  const [searchResults, setSearchResults] = useState<TrackDetail[]>([])
  const [searchAttempted, setSearchAttempted] = useState(false)
  const [selectedTrackData, setSelectedTrackData] = useState<TrackDetail | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setHeaderScrolled(window.scrollY > 0)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setError("Please enter a song name")
      return
    }

    setLoading(true)
    setLoadingType("search")
    setError(null)
    setSearchAttempted(true)
    setTrackInfo(null)
    setSearchResults([])

    try {
      console.log("[v0] Searching for:", query)
      const response = await fetch(`/api/spotify-search?q=${encodeURIComponent(query)}`)

      if (!response.ok) {
        throw new Error(`Search API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Search results received:", data)

      // Parse results from the external API response
      const results = data.tracks || data.results || data.data || []
      const formattedResults = (Array.isArray(results) ? results : []).map((track: any) => ({
        url: track.url || track.link || "",
        title: track.name || track.title || "Unknown",
        artist: track.artist || track.artists || "Unknown",
        artists: track.artists || track.artist || "Unknown",
        thumbnail: track.image || track.thumbnail || track.cover || "",
      }))

      if (formattedResults.length === 0) {
        setError("No tracks found. Try a different search.")
      } else {
        setSearchResults(formattedResults)
      }
    } catch (err) {
      console.error("[v0] Search error:", err)
      setError("Failed to search for tracks. Please try again.")
      setSearchResults([])
    } finally {
      setLoading(false)
    }
  }

  const handleUrlSelect = async (url: string) => {
    const selectedTrack = searchResults.find((t) => t.url === url)
    setSelectedTrackData(selectedTrack || null)

    setSelectedUrl(url)
    setLoading(true)
    setLoadingType("track-info")
    setError(null)
    setTrackInfo(null)

    try {
      console.log("[v0] Fetching track info for:", url)
      const response = await fetch(`/api/spotify-info?url=${encodeURIComponent(url)}`)

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }

      const data = await response.json()
      console.log("[v0] Track info received:", data)

      const trackData = data.data?.data || data.data || data
      setTrackInfo({
        title: selectedTrack?.title || trackData.title,
        artist: selectedTrack?.artists || trackData.author,
        artists: selectedTrack?.artists || trackData.author,
        album: trackData.album,
        image: trackData.thumbnail,
        url: trackData.url,
        audio: trackData.medias?.[0]?.url,
      })
      setError(null)
    } catch (err) {
      console.error("[v0] Track fetch error:", err)
      setError("Failed to fetch track information. Please try again.")
      setTrackInfo(null)
    } finally {
      setLoading(false)
    }
  }

  const handleBackToResults = () => {
    setTrackInfo(null)
    setSelectedUrl(null)
    setSelectedTrackData(null)
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-96 h-96 bg-emerald-200/20 rounded-full blur-3xl animate-float-gentle" />
        <div
          className="absolute bottom-20 left-20 w-80 h-80 bg-green-200/15 rounded-full blur-3xl animate-float-gentle"
          style={{ animationDelay: "2s" }}
        />
      </div>
      <div className="relative z-10">
        <Header
          onAboutClick={() => setShowAbout(true)}
          onSettingsClick={() => {}}
          isScrolled={headerScrolled}
          title="Spotify Track Downloader"
          showBackButton={true}
          subtitle="Download your favorite tracks"
          hideSettings={true}
        />

        <main className="container mx-auto px-4 py-8">
          <SpotifySearchForm onSearch={handleSearch} loading={loading && loadingType === "search"} />

          {loading && loadingType === "track-info" && (
            <div className="max-w-2xl mx-auto px-4 mb-12">
              <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 p-8 border border-border">
                <div className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-2 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                  <p className="text-muted-foreground font-medium">Finding Track Information...</p>
                </div>
              </div>
            </div>
          )}

          {!trackInfo && (
            <SpotifyResults
              tracks={searchResults}
              loading={loading && loadingType === "search"}
              searchAttempted={searchAttempted}
              error={error}
              onUrlSelect={handleUrlSelect}
              selectedUrl={selectedUrl}
            />
          )}

          {trackInfo ? (
            <div>
              {trackInfo && (
                <button
                  onClick={handleBackToResults}
                  className="mb-4 px-4 py-2 text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors"
                >
                  ← Back to Results
                </button>
              )}
              <SpotifyTrackInfo trackInfo={trackInfo} loading={false} error={error} onDownload={() => {}} />
            </div>
          ) : null}
        </main>

        {showAbout && <AboutModal onClose={() => setShowAbout(false)} isSpotifyDownloader={true} />}
      </div>
    </div>
  )
}
