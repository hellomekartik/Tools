"use client"

import { Loader2 } from "lucide-react"

interface AudioData {
  url: string
  text: string
  type: string
  voice?: string
  lang?: string
}

interface AudioResultsProps {
  audioData: AudioData | null
  loading: boolean
  searchAttempted: boolean
}

export default function AudioResults({ audioData, loading, searchAttempted }: AudioResultsProps) {
  if (loading) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <Loader2 className="w-12 h-12 animate-spin text-cyan-500 mx-auto mb-4" />
        <p className="text-slate-600">Generating voice...</p>
      </div>
    )
  }

  if (!audioData) {
    return null
  }

  return (
    <div className="max-w-2xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Generated Audio</h3>
          <audio controls className="w-full rounded-lg" src={audioData.url}>
            Your browser does not support the audio element.
          </audio>
        </div>
      </div>
    </div>
  )
}
