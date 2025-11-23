"use client"

import React from "react"
import { QrCode } from "lucide-react"

interface LinkToQrFormProps {
  onSearch: (url: string) => void
  loading: boolean
  searchAttempted: boolean
  onSearchAttempt: () => void
}

export default function LinkToQrForm({ onSearch, loading, searchAttempted, onSearchAttempt }: LinkToQrFormProps) {
  const [url, setUrl] = React.useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearchAttempt()
    if (url.trim()) {
      onSearch(url)
    }
  }

  const isValidInput = url.trim().length > 0
  const showValidationError = searchAttempted && !isValidInput

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
          Generate QR Code from Link
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-primary/10 p-6 sm:p-8 border border-border/50"
      >
        <label className="block text-sm font-semibold text-foreground mb-3">Enter URL</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-3 bg-input/50 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground transition-all duration-200"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !isValidInput}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:scale-105 disabled:scale-100 whitespace-nowrap"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <QrCode className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
