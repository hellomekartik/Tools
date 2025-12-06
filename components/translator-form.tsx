"use client"

import React from "react"
import { Languages } from "lucide-react"
import CustomSelect from "./custom-select"

interface TranslatorFormProps {
  onTranslate: (text: string, language: string, languageName: string) => void
  loading: boolean
  searchAttempted: boolean
  onSearchAttempt: () => void
}

const languages = [
  { value: "af", label: "Afrikaans" },
  { value: "sq", label: "Albanian" },
  { value: "am", label: "Amharic" },
  { value: "ar-SA", label: "Arabic (Saudi Arabia)" },
  { value: "ar", label: "Arabic" },
  { value: "hy", label: "Armenian" },
  { value: "az", label: "Azerbaijani" },
  { value: "eu", label: "Basque" },
  { value: "be", label: "Belarusian" },
  { value: "bn-IN", label: "Bengali (India)" },
  { value: "bn", label: "Bengali" },
  { value: "bs-Cyrl", label: "Bosnian (Cyrillic)" },
  { value: "bs", label: "Bosnian" },
  { value: "bg", label: "Bulgarian" },
  { value: "my", label: "Burmese" },
  { value: "ca", label: "Catalan" },
  { value: "zh-CN", label: "Chinese (China)" },
  { value: "zh-HK", label: "Chinese (Hong Kong)" },
  { value: "zh-Hans", label: "Chinese (Simplified)" },
  { value: "zh-TW", label: "Chinese (Taiwan)" },
  { value: "zh-Hant", label: "Chinese (Traditional)" },
  { value: "zh", label: "Chinese" },
  { value: "hr", label: "Croatian" },
  { value: "cs", label: "Czech" },
  { value: "da", label: "Danish" },
  { value: "nl-BE", label: "Dutch (Belgium)" },
  { value: "nl", label: "Dutch" },
  { value: "en-AU", label: "English (Australia)" },
  { value: "en-CA", label: "English (Canada)" },
  { value: "en-NZ", label: "English (New Zealand)" },
  { value: "en-PH", label: "English (Philippines)" },
  { value: "en-ZA", label: "English (South Africa)" },
  { value: "en-GB", label: "English (United Kingdom)" },
  { value: "en-US", label: "English (United States)" },
  { value: "en", label: "English" },
  { value: "et", label: "Estonian" },
  { value: "fil", label: "Filipino" },
  { value: "fi", label: "Finnish" },
  { value: "fr-CA", label: "French (Canada)" },
  { value: "fr-CH", label: "French (Switzerland)" },
  { value: "fr", label: "French" },
  { value: "fy", label: "Frisian" },
  { value: "gl", label: "Galician" },
  { value: "ka", label: "Georgian" },
  { value: "de", label: "German" },
  { value: "el", label: "Greek" },
  { value: "gn", label: "Guarani" },
  { value: "gu", label: "Gujarati" },
  { value: "ha", label: "Hausa" },
  { value: "he", label: "Hebrew" },
  { value: "iw", label: "Hebrew (iw)" },
  { value: "hi", label: "Hindi" },
  { value: "hu", label: "Hungarian" },
  { value: "is", label: "Icelandic" },
  { value: "ig", label: "Igbo" },
  { value: "id", label: "Indonesian" },
  { value: "ga", label: "Irish" },
  { value: "it", label: "Italian" },
  { value: "ja", label: "Japanese" },
  { value: "kn", label: "Kannada" },
  { value: "km", label: "Khmer" },
  { value: "ko", label: "Korean" },
  { value: "ky", label: "Kyrgyz" },
  { value: "lo", label: "Lao" },
  { value: "lv", label: "Latvian" },
  { value: "ln", label: "Lingala" },
  { value: "lt", label: "Lithuanian" },
  { value: "lb", label: "Luxembourgish" },
  { value: "mk", label: "Macedonian" },
  { value: "ms", label: "Malay" },
  { value: "ml", label: "Malayalam" },
  { value: "mt", label: "Maltese" },
  { value: "mr", label: "Marathi" },
  { value: "mn", label: "Mongolian" },
  { value: "ne", label: "Nepali" },
  { value: "nb", label: "Norwegian Bokmal" },
  { value: "no", label: "Norwegian" },
  { value: "or", label: "Odia" },
  { value: "fa", label: "Persian" },
  { value: "pl", label: "Polish" },
  { value: "pt-BR", label: "Portuguese (Brazil)" },
  { value: "pt-PT", label: "Portuguese (Portugal)" },
  { value: "pt", label: "Portuguese" },
  { value: "pa-PK", label: "Punjabi (Pakistan)" },
  { value: "pa", label: "Punjabi" },
  { value: "ro", label: "Romanian" },
  { value: "ru", label: "Russian" },
  { value: "gd", label: "Scots Gaelic" },
  { value: "sr", label: "Serbian" },
  { value: "sk", label: "Slovak" },
  { value: "sl", label: "Slovenian" },
  { value: "so", label: "Somali" },
  { value: "es-AR", label: "Spanish (Argentina)" },
  { value: "es-CL", label: "Spanish (Chile)" },
  { value: "es-CO", label: "Spanish (Colombia)" },
  { value: "es-CR", label: "Spanish (Costa Rica)" },
  { value: "es-EC", label: "Spanish (Ecuador)" },
  { value: "es-SV", label: "Spanish (El Salvador)" },
  { value: "es-GT", label: "Spanish (Guatemala)" },
  { value: "es-HT", label: "Spanish (Haiti)" },
  { value: "es-HN", label: "Spanish (Honduras)" },
  { value: "es-419", label: "Spanish (Latin America)" },
  { value: "es-MX", label: "Spanish (Mexico)" },
  { value: "es-NI", label: "Spanish (Nicaragua)" },
  { value: "es-PA", label: "Spanish (Panama)" },
  { value: "es-PY", label: "Spanish (Paraguay)" },
  { value: "es-PE", label: "Spanish (Peru)" },
  { value: "es-PR", label: "Spanish (Puerto Rico)" },
  { value: "es-ES", label: "Spanish (Spain)" },
  { value: "es-US", label: "Spanish (United States)" },
  { value: "es-UY", label: "Spanish (Uruguay)" },
  { value: "es-VE", label: "Spanish (Venezuela)" },
  { value: "es", label: "Spanish" },
  { value: "sw", label: "Swahili" },
  { value: "sv", label: "Swedish" },
  { value: "tl", label: "Tagalog" },
  { value: "tg", label: "Tajik" },
  { value: "ta", label: "Tamil" },
  { value: "te", label: "Telugu" },
  { value: "th", label: "Thai" },
  { value: "tr", label: "Turkish" },
  { value: "uk", label: "Ukrainian" },
  { value: "ur", label: "Urdu" },
  { value: "uz", label: "Uzbek" },
  { value: "vi", label: "Vietnamese" },
  { value: "cy", label: "Welsh" },
  { value: "zu", label: "Zulu" },
]

export default function TranslatorForm({
  onTranslate,
  loading,
  searchAttempted,
  onSearchAttempt,
}: TranslatorFormProps) {
  const [text, setText] = React.useState("")
  const [language, setLanguage] = React.useState("hi")
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

    const selectedLang = languages.find((l) => l.value === language)
    onTranslate(text, language, selectedLang?.label || language)

    setTimeout(() => {
      submitInProgressRef.current = false
    }, 100)
  }

  const isValidInput = text.trim().length > 0

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-slate-900 mb-2">Translate Text</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200 flex flex-col gap-4"
      >
        <label className="block text-sm font-semibold text-slate-900">Text to Translate</label>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to translate"
          className="w-full px-4 py-3 bg-orange-50 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-slate-900 placeholder-slate-500 min-h-32 resize-none"
          disabled={loading}
        />

        <CustomSelect
          value={language}
          onChange={setLanguage}
          options={languages}
          disabled={loading}
          label="Translate to"
          searchable={true}
        />

        <button
          type="submit"
          onClick={() => {
            allowSubmitRef.current = true
          }}
          disabled={loading || !isValidInput}
          className="px-6 py-3 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold rounded-lg transition flex items-center justify-center gap-2 whitespace-nowrap mt-4"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Translating...
            </>
          ) : (
            <>
              <Languages className="w-5 h-5" />
              Translate
            </>
          )}
        </button>
      </form>
    </div>
  )
}
