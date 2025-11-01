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
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Generate QR Code from Link</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 flex flex-col gap-4"
      >
        <label className="block text-sm font-semibold text-slate-900">Enter URL</label>
        <div className="flex gap-3 items-center">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="flex-1 px-4 py-3 bg-blue-50 border border-cyan-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 placeholder-slate-500"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !isValidInput}
            className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap flex-shrink-0"
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
