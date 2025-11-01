"use client"

import React from "react"
import { Volume2, Check, ChevronDown } from "lucide-react"

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
  const selectedVoice = voices.find((v) => v.value === value)

  return (
    <div className="w-full">
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
          <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-300 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
            <div className="p-3 space-y-2">
              {voices.map((voice) => (
                <button
                  key={voice.value}
                  onClick={() => {
                    onChange(voice.value)
                    setIsOpen(false)
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
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />}
    </div>
  )
}
