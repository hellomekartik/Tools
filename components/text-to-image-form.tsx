"use client"

import React from "react"
import { ImageIcon, Sparkles, Layout, Box, Palette } from "lucide-react"
import CustomSelect from "./custom-select"

interface TextToImageFormProps {
  onSearch: (prompt: string, options: any) => void
  loading: boolean
  searchAttempted: boolean
  onSearchAttempt: () => void
}

const PLATFORMS = [
  { id: "Platform A", name: "VISION ENGINE", hasModel: false, hasStyle: false },
  { id: "Platform B", name: "DREAM WEAVER", hasModel: false, hasStyle: false },
  { id: "Platform C", name: "Neural Art", models: ["flux", "magicstudio", "creart-ai"], hasStyle: false },
  {
    id: "Platform D",
    name: "DEEP FUSION",
    models: ["FLUX", "SDXL"],
    styles: [
      "POINTILLISM",
      "TYPOGRAPHY",
      "LINE ART",
      "CARICATURE",
      "ADORABLE KAWAII",
      "PSYCHEDELIC",
      "WATERCOLOR",
      "COLORED PENCIL ART",
      "FUTURISTIC RETRO CYBERPUNK",
      "STAINED GLASS",
      "COMIC",
      "SUMI E SYMBOLIC",
      "MONOCHROME",
      "VAN GOGH",
      "MANGA",
      "SURREAL PAINTING",
      "PAPERCRAFT KIRIGAMI",
      "PAPERCRAFT PAPER QUILLING",
      "PIXEL ART",
      "CUBIST",
      "PAPERCRAFT PAPER MACHE",
      "LOWPOLY",
      "STICKER",
      "DRIPPING PAINT SPLATTER",
      "INK DRIPPING",
      "CROSS STITCHING",
      "GRAFFITI",
      "ALCOHOL INK",
      "TLINGIT ART",
      "POP ART",
      "FAUVISM",
    ],
  },
  { id: "Platform E", name: "Vivid Gen", hasModel: false, hasStyle: false },
  { id: "Platform F", name: "MAGIC STUDIO", hasModel: false, hasStyle: false },
  { id: "Platform G", name: "SPLEXX AI", hasModel: false, hasStyle: false },
]

export default function TextToImageForm({ onSearch, loading, searchAttempted, onSearchAttempt }: TextToImageFormProps) {
  const [prompt, setPrompt] = React.useState("")
  const [platform, setPlatform] = React.useState(PLATFORMS[0].id)
  const [model, setModel] = React.useState("")
  const [style, setStyle] = React.useState("")

  const activePlatform = PLATFORMS.find((p) => p.id === platform)

  React.useEffect(() => {
    if (activePlatform?.models && activePlatform.models.length > 0) {
      const firstModel = activePlatform.models[0]
      if (model !== firstModel && !loading) {
        setModel(firstModel)
      }
    } else {
      if (model !== "" && !loading) setModel("")
    }

    if (activePlatform?.styles && activePlatform.styles.length > 0) {
      const firstStyle = activePlatform.styles[0].toLowerCase()
      if (style !== firstStyle && !loading) {
        setStyle(firstStyle)
      }
    } else {
      if (style !== "" && !loading) setStyle("")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [platform])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSearchAttempt()
    if (prompt.trim()) {
      onSearch(prompt, { platform, model, style })
    }
  }

  const isValidInput = prompt.trim().length > 0

  return (
    <div className="max-w-2xl mx-auto mb-12 px-4">
      {/* ... existing header code ... */}
      <div className="text-center mb-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-lg shadow-emerald-200/20 mb-6 animate-glow-pulse">
          <Sparkles className="w-4 h-4 text-emerald-500 animate-icon-float" />
          <span className="text-sm font-medium text-foreground">Text to Image</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-3 tracking-tight">
          Generate{" "}
          <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-600 bg-clip-text text-transparent animate-gradient-x">
            Images
          </span>
        </h2>
        <p className="text-muted-foreground text-lg">Transform your ideas into stunning visuals</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="relative bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl shadow-emerald-500/5 p-6 sm:p-8 border border-white"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="space-y-2">
            <label className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2 mb-1">
              <Layout className="w-3 h-3" /> Platform
            </label>
            <CustomSelect
              value={platform}
              onChange={(val) => {
                setPlatform(val)
              }}
              options={PLATFORMS.map((p) => ({ value: p.id, label: p.name }))}
              searchable
            />
          </div>

          {activePlatform?.models && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2 mb-1">
                <Box className="w-3 h-3" /> Model
              </label>
              <CustomSelect
                value={model}
                onChange={setModel}
                options={activePlatform.models.map((m) => ({ value: m, label: m }))}
                searchable
              />
            </div>
          )}

          {activePlatform?.styles && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-600 uppercase tracking-widest flex items-center gap-2 mb-1">
                <Palette className="w-3 h-3" /> Style
              </label>
              <CustomSelect
                value={style}
                onChange={setStyle}
                options={activePlatform.styles.map((s) => ({ value: s.toLowerCase(), label: s.replace(/_/g, " ") }))}
                searchable
              />
            </div>
          )}
        </div>

        <label className="block text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
          <ImageIcon className="w-4 h-4 text-emerald-500" />
          Image Prompt
        </label>
        <div className="flex flex-col sm:flex-row gap-4 relative z-10">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the image you want to generate..."
            className="flex-1 px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-slate-900 placeholder-slate-400 min-h-[120px] resize-none transition-all duration-300 hover:border-emerald-300"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !isValidInput}
            className="w-full sm:w-auto px-8 py-4 bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-200 disabled:text-slate-400 text-white font-bold rounded-2xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/40 active:scale-95"
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
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-gradient-to-r from-emerald-400/10 via-teal-400/20 to-emerald-400/10 blur-2xl rounded-full -z-10" />
      </form>
    </div>
  )
}
