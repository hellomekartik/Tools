"use client"

import React from "react"
import { Volume2, Check, ChevronDown, Search } from "lucide-react"

interface VoiceOption {
  value: string
  label: string
  gender: "Male" | "Female"
  accent: string
  language: string
  tone: string
  description: string
}

interface VoiceSelectorProps {
  value: string
  onChange: (value: string) => void
  voices: VoiceOption[]
  disabled?: boolean
  label?: string
}

export default function VoiceSelector({
  value,
  onChange,
  voices,
  disabled = false,
  label = "Voice",
}: VoiceSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [searchQuery, setSearchQuery] = React.useState("")
  const searchInputRef = React.useRef<HTMLInputElement>(null)
  const containerRef = React.useRef<HTMLDivElement>(null)
  const selectedVoice = voices.find((v) => v.value === value)

  const filteredVoices = voices.filter(
    (voice) =>
      voice.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voice.language.toLowerCase().includes(searchQuery.toLowerCase()) ||
      voice.accent.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  React.useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus()
    }
  }, [isOpen])

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
        setSearchQuery("")
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="w-full" ref={containerRef}>
      {label && <label className="block text-sm font-semibold text-slate-900 mb-3">{label}</label>}

      <div className="relative">
        {/* Selected Voice Display */}
        <button
          onClick={() => !disabled && setIsOpen(!isOpen)}
          disabled={disabled}
          className="w-full px-4 py-3 bg-white border border-slate-300 rounded-lg text-left flex items-center justify-between hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          <div className="flex items-center gap-3 flex-1">
            <Volume2 className="w-5 h-5 text-cyan-500 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="font-medium text-slate-900 truncate">{selectedVoice?.label}</div>
              <div className="text-xs text-slate-500 truncate">
                {selectedVoice?.gender} • {selectedVoice?.accent}
              </div>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-slate-400 transition-transform flex-shrink-0 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>

        {/* Voice Options Dropdown */}
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-50 overflow-hidden">
            <div className="p-3 border-b border-slate-200 sticky top-0 bg-white">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search voice..."
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="max-h-80 overflow-y-auto p-3 space-y-2">
              {filteredVoices.length === 0 ? (
                <div className="px-4 py-3 text-slate-500 text-center">No voices found</div>
              ) : (
                filteredVoices.map((voice) => (
                  <button
                    key={voice.value}
                    onClick={() => {
                      onChange(voice.value)
                      setIsOpen(false)
                      setSearchQuery("")
                    }}
                    className={`w-full text-left p-4 rounded-lg border-2 transition ${
                      value === voice.value
                        ? "border-cyan-500 bg-cyan-50"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        {/* Voice Name and Check Icon */}
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-slate-900 text-base">{voice.label}</span>
                          {value === voice.value && <Check className="w-4 h-4 text-cyan-500 flex-shrink-0" />}
                        </div>

                        {/* Professional Description */}
                        <p className="text-sm text-slate-600 mb-3 leading-relaxed">{voice.description}</p>

                        {/* Voice Characteristics - Enhanced Badges */}
                        <div className="flex flex-wrap gap-2">
                          <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-50 to-blue-100 text-xs font-semibold text-blue-700 rounded-full border border-blue-200">
                            {voice.gender}
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-purple-50 to-purple-100 text-xs font-semibold text-purple-700 rounded-full border border-purple-200">
                            {voice.accent}
                          </span>
                          <span className="inline-flex items-center px-3 py-1.5 bg-gradient-to-r from-amber-50 to-amber-100 text-xs font-semibold text-amber-700 rounded-full border border-amber-200">
                            {voice.tone}
                          </span>
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
