"use client"

import React from "react"
import { Volume2 } from "lucide-react"
import CustomSelect from "./custom-select"
import VoiceSelector from "./voice-selector"

interface TextToVoiceFormProps {
  onSearch: (text: string, type: string, voice?: string, lang?: string) => void
  loading: boolean
  searchAttempted: boolean
  onSearchAttempt: () => void
}

export default function TextToVoiceForm({ onSearch, loading, searchAttempted, onSearchAttempt }: TextToVoiceFormProps) {
  const [text, setText] = React.useState("")
  const [type, setType] = React.useState("google")
  const [voice, setVoice] = React.useState("Brian")
  const [lang, setLang] = React.useState("en")
  const submitInProgressRef = React.useRef(false)
  const allowSubmitRef = React.useRef(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("[v0] Form submit attempt - allowSubmit:", allowSubmitRef.current)

    if (submitInProgressRef.current || !text.trim() || !allowSubmitRef.current) {
      console.log("[v0] Form submit blocked")
      return
    }

    submitInProgressRef.current = true
    allowSubmitRef.current = false
    onSearchAttempt()
    onSearch(text, type, voice, lang)

    setTimeout(() => {
      submitInProgressRef.current = false
    }, 100)
  }

  const isValidInput = text.trim().length > 0
  const showValidationError = searchAttempted && !isValidInput

  const googleLanguages = [
    { value: "en", label: "English (US)" },
    { value: "en-IN", label: "English (India)" },
    { value: "hi", label: "Hindi" },
    { value: "ta", label: "Tamil" },
    { value: "bn", label: "Bengali" },
    { value: "gu", label: "Gujarati" },
    { value: "mr", label: "Marathi" },
    { value: "ur", label: "Urdu" },
    { value: "ar", label: "Arabic" },
    { value: "es", label: "Spanish" },
    { value: "fr", label: "French" },
    { value: "de", label: "German" },
  ]

  const streamElementsVoices = [
    {
      value: "Brian",
      label: "Brian",
      gender: "Male" as const,
      accent: "British",
      language: "English (UK)",
      tone: "Professional",
      description: "English (UK Male) - Professional British male voice with clear articulation.",
    },
    {
      value: "Ivy",
      label: "Ivy",
      gender: "Female" as const,
      accent: "American",
      language: "English (US)",
      tone: "Child",
      description: "English (US Female Child) - Young, cheerful female voice suitable for children's content.",
    },
    {
      value: "Joey",
      label: "Joey",
      gender: "Male" as const,
      accent: "American",
      language: "English (US)",
      tone: "Professional",
      description: "English (US Male) - Clear American male voice for general use.",
    },
    {
      value: "Justin",
      label: "Justin",
      gender: "Male" as const,
      accent: "American",
      language: "English (US)",
      tone: "Child",
      description: "English (US Child Male) - Young male voice suitable for children's content.",
    },
    {
      value: "Kendra",
      label: "Kendra",
      gender: "Female" as const,
      accent: "American",
      language: "English (US)",
      tone: "Professional",
      description: "English (US Female) - Professional American female voice with clear pronunciation.",
    },
    {
      value: "Kimberly",
      label: "Kimberly",
      gender: "Female" as const,
      accent: "American",
      language: "English (US)",
      tone: "Professional",
      description: "English (US Female) - Warm and professional American female voice.",
    },
    {
      value: "Salli",
      label: "Salli",
      gender: "Female" as const,
      accent: "American",
      language: "English (US)",
      tone: "Professional",
      description: "English (US Female) - Clear and articulate American female voice.",
    },
    {
      value: "Matthew",
      label: "Matthew",
      gender: "Male" as const,
      accent: "American",
      language: "English (US)",
      tone: "Professional",
      description: "English (US Male) - Deep and authoritative American male voice.",
    },
    {
      value: "Geraint",
      label: "Geraint",
      gender: "Male" as const,
      accent: "Welsh",
      language: "English (Welsh)",
      tone: "Professional",
      description: "English (Welsh Male) - Professional Welsh male voice with distinctive accent.",
    },
    {
      value: "Amy",
      label: "Amy",
      gender: "Female" as const,
      accent: "British",
      language: "English (UK)",
      tone: "Professional",
      description: "English (UK Female) - Refined British female voice.",
    },
    {
      value: "Emma",
      label: "Emma",
      gender: "Female" as const,
      accent: "British",
      language: "English (UK)",
      tone: "Professional",
      description: "English (UK Female) - Clear British female voice.",
    },
    {
      value: "Aditi",
      label: "Aditi",
      gender: "Female" as const,
      accent: "Indian",
      language: "English + Hindi",
      tone: "Natural",
      description: "English + Hindi Female - Bilingual voice suitable for English and Hindi content.",
    },
    {
      value: "Raveena",
      label: "Raveena",
      gender: "Female" as const,
      accent: "Indian",
      language: "Hindi",
      tone: "Professional",
      description: "Indian Female (Hindi) - Professional Hindi female voice for Hindi-speaking audiences.",
    },
    {
      value: "Hans",
      label: "Hans",
      gender: "Male" as const,
      accent: "German",
      language: "German",
      tone: "Professional",
      description: "German (Male) - Professional German male voice.",
    },
    {
      value: "Nicole",
      label: "Nicole",
      gender: "Female" as const,
      accent: "Australian",
      language: "English (Australian)",
      tone: "Professional",
      description: "Australian Female - Clear Australian female voice.",
    },
    {
      value: "Russell",
      label: "Russell",
      gender: "Male" as const,
      accent: "Australian",
      language: "English (Australian)",
      tone: "Professional",
      description: "Australian Male - Friendly Australian male voice.",
    },
    {
      value: "Celine",
      label: "Celine",
      gender: "Female" as const,
      accent: "French",
      language: "French",
      tone: "Professional",
      description: "French Female - Professional French female voice.",
    },
    {
      value: "Mathieu",
      label: "Mathieu",
      gender: "Male" as const,
      accent: "French",
      language: "French",
      tone: "Professional",
      description: "French Male - Professional French male voice.",
    },
    {
      value: "Dora",
      label: "Dora",
      gender: "Female" as const,
      accent: "Icelandic",
      language: "Icelandic",
      tone: "Professional",
      description: "Icelandic Female - Clear Icelandic female voice.",
    },
    {
      value: "Karl",
      label: "Karl",
      gender: "Male" as const,
      accent: "Icelandic",
      language: "Icelandic",
      tone: "Professional",
      description: "Icelandic Male - Professional Icelandic male voice.",
    },
    {
      value: "Mizuki",
      label: "Mizuki",
      gender: "Female" as const,
      accent: "Japanese",
      language: "Japanese",
      tone: "Natural",
      description: "Japanese Female - Natural Japanese female voice.",
    },
    {
      value: "Takumi",
      label: "Takumi",
      gender: "Male" as const,
      accent: "Japanese",
      language: "Japanese",
      tone: "Professional",
      description: "Japanese Male - Professional Japanese male voice.",
    },
    {
      value: "Vicki",
      label: "Vicki",
      gender: "Female" as const,
      accent: "German",
      language: "German",
      tone: "Child",
      description: "German (Child Female) - Young German female voice suitable for children's content.",
    },
  ]

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Convert Text to Voice</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 flex flex-col gap-4"
      >
        <label className="block text-sm font-semibold text-slate-900">Text</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to convert to voice"
          className="w-full px-4 py-3 bg-blue-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 text-slate-900 placeholder-slate-500 min-h-24 resize-none"
          disabled={loading}
        />

        <CustomSelect
          value={type}
          onChange={setType}
          options={[
            { value: "google", label: "Google TTS" },
            { value: "streamelements", label: "StreamElements TTS" },
          ]}
          disabled={loading}
          label="Voice Type"
        />

        {type === "google" && (
          <CustomSelect
            value={lang}
            onChange={setLang}
            options={googleLanguages}
            disabled={loading}
            label="Language"
            searchable={true}
          />
        )}

        {type === "streamelements" && (
          <VoiceSelector
            value={voice}
            onChange={setVoice}
            voices={streamElementsVoices}
            disabled={loading}
            label="Voice"
          />
        )}

        <button
          type="submit"
          onClick={() => {
            allowSubmitRef.current = true
          }}
          disabled={loading || !isValidInput}
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 disabled:bg-cyan-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap mt-4"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Volume2 className="w-5 h-5" />
              Generate Voice
            </>
          )}
        </button>
      </form>
    </div>
  )
}
