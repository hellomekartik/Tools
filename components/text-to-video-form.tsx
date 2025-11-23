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
        <h2 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
          Generate Video from Text
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl shadow-purple-200/30 p-6 sm:p-8 border border-border"
      >
        <label className="block text-sm font-semibold text-foreground mb-4">Video Prompt</label>

        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Describe the video you want to generate..."
            className="flex-1 px-4 py-3 bg-violet-50/50 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500 text-foreground placeholder-muted-foreground resize-none min-h-20"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !isValidInput}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 disabled:scale-100 whitespace-nowrap"
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
