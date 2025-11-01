"use client"

import { Wand2 } from "lucide-react"
import React from "react"

interface TextToVideoFormProps {
  onSearch: (prompt: string) => void
  loading: boolean
  prompt: string
  searchAttempted: boolean
}

export default function TextToVideoForm({ onSearch, loading, prompt, searchAttempted }: TextToVideoFormProps) {
  const [inputValue, setInputValue] = React.useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (inputValue.trim().length > 0) {
      onSearch(inputValue)
    }
  }

  const isValidInput = inputValue.trim().length > 0
  const showValidationError = searchAttempted && inputValue.trim().length === 0

  return (
    <div className="max-w-3xl mx-auto mb-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Generate Video from Text</h2>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
        <label className="block text-sm font-semibold text-slate-900 mb-4">Video Prompt</label>

        <div className="flex gap-3 items-center">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe the video you want to generate..."
            className="flex-1 px-4 py-3 bg-blue-50 border-2 border-cyan-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 placeholder-slate-500 resize-none h-24"
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
                <span className="hidden sm:inline">Generating...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span className="hidden sm:inline">Generate</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
