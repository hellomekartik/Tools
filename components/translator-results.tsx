"use client"

import { Copy, Check, Languages } from "lucide-react"
import { useState } from "react"

interface TranslatorResultsProps {
  translatedText: string | null
  targetLanguage: string
  loading: boolean
  searchAttempted: boolean
}

export default function TranslatorResults({
  translatedText,
  targetLanguage,
  loading,
  searchAttempted,
}: TranslatorResultsProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    if (translatedText) {
      await navigator.clipboard.writeText(translatedText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mb-4" />
            <p className="text-slate-600">Translating your text...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!searchAttempted) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <Languages className="w-8 h-8 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Ready to Translate</h3>
            <p className="text-slate-600">Enter your text and select a language to get started</p>
          </div>
        </div>
      </div>
    )
  }

  if (!translatedText) {
    return (
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">:(</span>
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Translation Failed</h3>
            <p className="text-slate-600">Could not translate your text. Please try again.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4">
      <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-medium text-orange-600 flex items-center gap-2">
              <Languages className="w-4 h-4" />
              {targetLanguage}
            </span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-500" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
          <p className="text-slate-900 text-lg leading-relaxed whitespace-pre-wrap">{translatedText}</p>
        </div>
      </div>
    </div>
  )
}
