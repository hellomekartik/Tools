"use client"

interface VideoData {
  success: boolean
  url: string
  developer: string
}

interface VideoResultsProps {
  results: VideoData | null
  loading: boolean
  searchAttempted: boolean
}

export default function VideoResults({ results, loading, searchAttempted }: VideoResultsProps) {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-500 rounded-full animate-spin mb-4" />
        <p className="text-lg font-semibold text-slate-900 dark:text-white">Generating Video...</p>
        <p className="text-slate-600 dark:text-slate-400">This may take a moment</p>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="text-center py-16">
        <p className="text-slate-600 dark:text-slate-400">{searchAttempted ? "No results found." : ""}</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 pb-4 border-b-4 border-cyan-500">
        Generated Video
      </h3>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 dark:from-slate-700 dark:to-slate-600 px-6 py-4 border-b border-slate-200 dark:border-slate-700">
          <h4 className="font-semibold text-slate-900 dark:text-white">🎬 Video Result</h4>
        </div>

        <div className="p-6 space-y-4">
          <div className="w-full bg-black rounded-lg overflow-hidden">
            <video src={results.url} controls className="w-full h-auto">
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </div>
  )
}
