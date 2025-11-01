"use client"
import { DownloadIcon, AlertCircle } from "lucide-react"

interface TeraboxFile {
  name: string
  size: string
  thumbnail: string
  dlink: string
}

interface TeraboxData {
  files: TeraboxFile[]
  message: string
}

interface TeraboxResultsProps {
  teraboxData: TeraboxData | null
  loading: boolean
  searchAttempted: boolean
  error: string | null
}

export default function TeraboxResults({ teraboxData, loading, searchAttempted, error }: TeraboxResultsProps) {
  if (!searchAttempted && !teraboxData) {
    return null
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto px-4 mb-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 flex items-start gap-4">
          <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-red-900 mb-1">Error</h3>
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-slate-200">
          <div className="flex items-center justify-center gap-3">
            <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-600 font-medium">Fetching Terabox files...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!teraboxData || !teraboxData.files || teraboxData.files.length === 0) {
    return null
  }

  return (
    <div className="max-w-4xl mx-auto px-4 mb-12">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 border border-slate-200">
        <h3 className="text-2xl font-bold text-slate-900 mb-6">Files Found ({teraboxData.files.length})</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {teraboxData.files.map((file, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-lg overflow-hidden border border-slate-200 hover:shadow-lg transition-shadow"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-40 bg-slate-200 flex items-center justify-center overflow-hidden">
                <img
                  src={file.thumbnail || "/placeholder.svg"}
                  alt={file.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/placeholder.svg?height=160&width=320"
                  }}
                />
              </div>

              {/* File Info */}
              <div className="p-4">
                <h4 className="font-semibold text-slate-900 text-sm mb-2 truncate" title={file.name}>
                  {file.name}
                </h4>
                <p className="text-xs text-slate-600 mb-4">{file.size}</p>

                {/* Download Button */}
                <a
                  href={file.dlink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition flex items-center justify-center gap-2 text-sm"
                >
                  <DownloadIcon className="w-4 h-4" />
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
