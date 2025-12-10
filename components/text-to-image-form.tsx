"use client"

import React from "react"
import { ImageIcon, Sparkles } from "lucide-react"

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

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-pink-200/50 shadow-lg shadow-pink-200/20 mb-6 animate-glow-pulse">
          <Sparkles className="w-4 h-4 text-pink-500 animate-icon-float" />
          <span className="text-sm font-medium text-foreground">Text to Image</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
          Generate{" "}
          <span className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 bg-clip-text text-transparent animate-gradient-x">
            Images
          </span>
        </h2>
        <p className="text-muted-foreground text-lg">Transform your ideas into stunning visuals</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/90 backdrop-blur-xl rounded-3xl shadow-xl shadow-purple-200/30 p-6 sm:p-8 border border-purple-100/50 animate-fade-in-scale card-glow hover-glow transition-all duration-500"
      >
        <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-purple-500" />
          Image Prompt
        </label>
        <div className="flex flex-col sm:flex-row gap-4">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="flex-1 px-5 py-4 bg-purple-50/50 border border-purple-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent text-foreground placeholder-muted-foreground min-h-24 resize-none transition-all duration-300 hover:border-purple-200 hover:shadow-inner"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !isValidInput}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-purple-400/30 hover:shadow-xl hover:shadow-purple-400/40 hover:scale-105 disabled:scale-100 disabled:shadow-none animate-glow-pulse"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" />
                <span>Generate</span>
              </>
            )}
          </button>
        </div>

        {/* Decorative glow element */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-gradient-to-r from-pink-400/20 via-purple-400/30 to-pink-400/20 blur-xl rounded-full" />
      </form>
    </div>
  )
}
