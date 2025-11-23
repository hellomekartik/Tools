"use client"

import React from "react"
import { ImageIcon } from "lucide-react"

interface TextToImageFormProps {
  onSearch: (prompt: string) => void
  loading: boolean
  searchAttempted: boolean
  onSearchAttempt: () => void
}

export default function TextToImageForm({ onSearch, loading, searchAttempted, onSearchAttempt }: TextToImageFormProps) {
  const [prompt, setPrompt] = React.useState("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearchAttempt()
    if (prompt.trim()) {
      onSearch(prompt)
    }
  }

  const isValidInput = prompt.trim().length > 0
  const showValidationError = searchAttempted && !isValidInput

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-foreground mb-2 bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
          Generate Images from Text
        </h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-card/50 backdrop-blur-xl rounded-2xl shadow-2xl shadow-primary/10 p-6 sm:p-8 border border-border/50"
      >
        <label className="block text-sm font-semibold text-foreground mb-3">Image Prompt</label>
        <div className="flex flex-col sm:flex-row gap-3">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="flex-1 px-4 py-3 bg-input/50 backdrop-blur-sm border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary text-foreground placeholder-muted-foreground min-h-20 resize-none transition-all duration-200"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !isValidInput}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-gray-500 disabled:to-gray-600 text-white font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:scale-105 disabled:scale-100"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <ImageIcon className="w-5 h-5" />
                Generate
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}
