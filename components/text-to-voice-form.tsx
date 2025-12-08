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
  const [voice, setVoice] = React.useState("adam")
  const [openaiVoice, setOpenaiVoice] = React.useState("alloy")
  const [lang, setLang] = React.useState("en")
  const submitInProgressRef = React.useRef(false)
  const allowSubmitRef = React.useRef(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (submitInProgressRef.current || !text.trim() || !allowSubmitRef.current) {
      return
    }

    submitInProgressRef.current = true
    allowSubmitRef.current = false
    onSearchAttempt()

    const selectedVoice = type === "openai" ? openaiVoice : voice
    onSearch(text, type, selectedVoice, lang)

    setTimeout(() => {
      submitInProgressRef.current = false
    }, 100)
  }

  const isValidInput = text.trim().length > 0

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

  const openaiVoices = [
    {
      value: "alloy",
      label: "Alloy",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Neutral",
      description: "Balanced and versatile voice, great for general use.",
    },
    {
      value: "echo",
      label: "Echo",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Deep",
      description: "Deep and resonant male voice with rich tones.",
    },
    {
      value: "fable",
      label: "Fable",
      gender: "Female" as const,
      accent: "British",
      language: "English",
      tone: "Storytelling",
      description: "Perfect for storytelling and narration.",
    },
    {
      value: "onyx",
      label: "Onyx",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Authoritative",
      description: "Deep and powerful male voice with authority.",
    },
    {
      value: "nova",
      label: "Nova",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Modern",
      description: "Modern and dynamic female voice.",
    },
    {
      value: "shimmer",
      label: "Shimmer",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Warm",
      description: "Warm and expressive female voice.",
    },
  ]

  const alphaTTSVoices = [
    {
      value: "adam",
      label: "Adam",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Professional",
      description: "Clear and professional American male voice.",
    },
    {
      value: "aiko",
      label: "Aiko",
      gender: "Female" as const,
      accent: "Japanese",
      language: "Japanese",
      tone: "Natural",
      description: "Natural Japanese female voice.",
    },
    {
      value: "alex",
      label: "Alex",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Professional",
      description: "Friendly American male voice.",
    },
    {
      value: "alice",
      label: "Alice",
      gender: "Female" as const,
      accent: "British",
      language: "English",
      tone: "Professional",
      description: "Refined British female voice.",
    },
    {
      value: "alloy",
      label: "Alloy",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Neutral",
      description: "Balanced and versatile voice.",
    },
    {
      value: "anaya",
      label: "Anaya",
      gender: "Female" as const,
      accent: "Indian",
      language: "English",
      tone: "Natural",
      description: "Natural Indian English female voice.",
    },
    {
      value: "antonio",
      label: "Antonio",
      gender: "Male" as const,
      accent: "Spanish",
      language: "Spanish",
      tone: "Professional",
      description: "Professional Spanish male voice.",
    },
    {
      value: "aoede",
      label: "Aoede",
      gender: "Female" as const,
      accent: "Greek",
      language: "English",
      tone: "Artistic",
      description: "Artistic and expressive voice.",
    },
    {
      value: "arjun",
      label: "Arjun",
      gender: "Male" as const,
      accent: "Indian",
      language: "English",
      tone: "Professional",
      description: "Professional Indian English male voice.",
    },
    {
      value: "bella",
      label: "Bella",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Friendly",
      description: "Warm and friendly American female voice.",
    },
    {
      value: "daniel",
      label: "Daniel",
      gender: "Male" as const,
      accent: "British",
      language: "English",
      tone: "Professional",
      description: "Professional British male voice.",
    },
    {
      value: "dora",
      label: "Dora",
      gender: "Female" as const,
      accent: "Icelandic",
      language: "Icelandic",
      tone: "Natural",
      description: "Natural Icelandic female voice.",
    },
    {
      value: "echo",
      label: "Echo",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Deep",
      description: "Deep and resonant male voice.",
    },
    {
      value: "emma",
      label: "Emma",
      gender: "Female" as const,
      accent: "British",
      language: "English",
      tone: "Professional",
      description: "Clear British female voice.",
    },
    {
      value: "eric",
      label: "Eric",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Casual",
      description: "Casual American male voice.",
    },
    {
      value: "fable",
      label: "Fable",
      gender: "Female" as const,
      accent: "British",
      language: "English",
      tone: "Storytelling",
      description: "Perfect for storytelling and narration.",
    },
    {
      value: "fenrir",
      label: "Fenrir",
      gender: "Male" as const,
      accent: "Nordic",
      language: "English",
      tone: "Strong",
      description: "Strong Nordic male voice.",
    },
    {
      value: "george",
      label: "George",
      gender: "Male" as const,
      accent: "British",
      language: "English",
      tone: "Professional",
      description: "Distinguished British male voice.",
    },
    {
      value: "heart",
      label: "Heart",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Warm",
      description: "Warm and caring female voice.",
    },
    {
      value: "isabella",
      label: "Isabella",
      gender: "Female" as const,
      accent: "Italian",
      language: "English",
      tone: "Elegant",
      description: "Elegant Italian-accented female voice.",
    },
    {
      value: "jessica",
      label: "Jessica",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Professional",
      description: "Professional American female voice.",
    },
    {
      value: "kabir",
      label: "Kabir",
      gender: "Male" as const,
      accent: "Indian",
      language: "Hindi",
      tone: "Natural",
      description: "Natural Hindi male voice.",
    },
    {
      value: "kore",
      label: "Kore",
      gender: "Female" as const,
      accent: "Greek",
      language: "English",
      tone: "Mystical",
      description: "Mystical and enchanting voice.",
    },
    {
      value: "kumo",
      label: "Kumo",
      gender: "Female" as const,
      accent: "Japanese",
      language: "Japanese",
      tone: "Soft",
      description: "Soft Japanese female voice.",
    },
    {
      value: "lewis",
      label: "Lewis",
      gender: "Male" as const,
      accent: "British",
      language: "English",
      tone: "Casual",
      description: "Casual British male voice.",
    },
    {
      value: "liam",
      label: "Liam",
      gender: "Male" as const,
      accent: "Irish",
      language: "English",
      tone: "Friendly",
      description: "Friendly Irish male voice.",
    },
    {
      value: "lily",
      label: "Lily",
      gender: "Female" as const,
      accent: "British",
      language: "English",
      tone: "Sweet",
      description: "Sweet British female voice.",
    },
    {
      value: "michael",
      label: "Michael",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Authoritative",
      description: "Authoritative American male voice.",
    },
    {
      value: "nova",
      label: "Nova",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Modern",
      description: "Modern and dynamic female voice.",
    },
    {
      value: "onyx",
      label: "Onyx",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Deep",
      description: "Deep and powerful male voice.",
    },
    {
      value: "puck",
      label: "Puck",
      gender: "Male" as const,
      accent: "British",
      language: "English",
      tone: "Playful",
      description: "Playful and mischievous voice.",
    },
    {
      value: "river",
      label: "River",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Calm",
      description: "Calm and soothing female voice.",
    },
    {
      value: "riya",
      label: "Riya",
      gender: "Female" as const,
      accent: "Indian",
      language: "Hindi",
      tone: "Natural",
      description: "Natural Hindi female voice.",
    },
    {
      value: "santa",
      label: "Santa",
      gender: "Male" as const,
      accent: "American",
      language: "English",
      tone: "Jolly",
      description: "Jolly and festive voice.",
    },
    {
      value: "santiago",
      label: "Santiago",
      gender: "Male" as const,
      accent: "Spanish",
      language: "Spanish",
      tone: "Warm",
      description: "Warm Spanish male voice.",
    },
    {
      value: "sara",
      label: "Sara",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Professional",
      description: "Professional American female voice.",
    },
    {
      value: "sarah",
      label: "Sarah",
      gender: "Female" as const,
      accent: "British",
      language: "English",
      tone: "Elegant",
      description: "Elegant British female voice.",
    },
    {
      value: "sky",
      label: "Sky",
      gender: "Female" as const,
      accent: "American",
      language: "English",
      tone: "Youthful",
      description: "Youthful and energetic voice.",
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
          className="w-full px-4 py-3 bg-amber-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 placeholder-slate-500 min-h-24 resize-none"
          disabled={loading}
        />

        <CustomSelect
          value={type}
          onChange={setType}
          options={[
            { value: "google", label: "Google TTS" },
            { value: "alpha", label: "Alpha TTS" },
            { value: "openai", label: "OpenAI TTS" },
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

        {type === "alpha" && (
          <VoiceSelector value={voice} onChange={setVoice} voices={alphaTTSVoices} disabled={loading} label="Voice" />
        )}

        {type === "openai" && (
          <VoiceSelector
            value={openaiVoice}
            onChange={setOpenaiVoice}
            voices={openaiVoices}
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
          className="px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:bg-amber-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap mt-4"
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
