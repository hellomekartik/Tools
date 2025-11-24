"use client"

import React from "react"
import { Search } from "lucide-react"

interface SpotifySearchFormProps {
  onSearch: (query: string) => void
  loading: boolean
}

export default function SpotifySearchForm({ onSearch, loading }: SpotifySearchFormProps) {
  const [query, setQuery] = React.useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim()) {
      onSearch(query)
    }
  }

  const isValidInput = query.trim().length > 0

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
          Download Spotify Tracks
        </h2>
        <p className="text-muted-foreground">Search for your favorite songs or paste a Spotify link</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-emerald-200/30 p-6 sm:p-8 border border-border flex flex-col gap-4"
      >
        <label className="block text-sm font-semibold text-foreground">Song Name or Spotify Link</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song or paste a Spotify link..."
          className="w-full px-4 py-3 bg-emerald-50/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-foreground placeholder-muted-foreground"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !isValidInput}
          className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:scale-105 disabled:scale-100 whitespace-nowrap mt-4"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Searching...
            </>
          ) : (
            <>
              <Search className="w-5 h-5" />
              Search Tracks
            </>
          )}
        </button>
      </form>
    </div>
  )
}
