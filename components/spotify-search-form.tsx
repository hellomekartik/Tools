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
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Download Spotify Tracks</h2>
        <p className="text-slate-600">Search for your favorite songs</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 flex flex-col gap-4"
      >
        <label className="block text-sm font-semibold text-slate-900">Song Name</label>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song, artist, or album..."
          className="w-full px-4 py-3 bg-green-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-slate-900 placeholder-slate-500"
          disabled={loading}
        />

        <button
          type="submit"
          disabled={loading || !isValidInput}
          className="px-6 py-3 bg-green-500 hover:bg-green-600 disabled:bg-green-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap mt-4"
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
