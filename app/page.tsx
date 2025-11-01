"use client"

import Link from "next/link"
import { Video, Volume2, ImageIcon, Download, QrCode, Music } from "lucide-react"

export default function Home() {
  return (
    <div className="min-h-screen bg-white/80 backdrop-blur-md flex items-center justify-center px-4">
      <div className="w-full max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Text to Video Panel */}
          <Link href="/text-to-video">
            <div className="bg-white rounded-2xl shadow-2xl hover:shadow-xl transition-shadow cursor-pointer p-8 h-full flex flex-col items-center justify-center text-center group">
              <div className="mb-4 group-hover:scale-110 transition-transform">
                <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
                  <Video className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Text to Video</h2>
              <div className="mt-auto pt-4">
                <span className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium group-hover:bg-cyan-600 transition-colors">
                  Get Started
                </span>
              </div>
            </div>
          </Link>

          {/* Text to Voice Panel */}
          <Link href="/text-to-voice">
            <div className="bg-white rounded-2xl shadow-2xl hover:shadow-xl transition-shadow cursor-pointer p-8 h-full flex flex-col items-center justify-center text-center group">
              <div className="mb-4 group-hover:scale-110 transition-transform">
                <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
                  <Volume2 className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Text to Voice</h2>
              <div className="mt-auto pt-4">
                <span className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium group-hover:bg-cyan-600 transition-colors">
                  Get Started
                </span>
              </div>
            </div>
          </Link>

          {/* Text to Image Panel */}
          <Link href="/text-to-image">
            <div className="bg-white rounded-2xl shadow-2xl hover:shadow-xl transition-shadow cursor-pointer p-8 h-full flex flex-col items-center justify-center text-center group">
              <div className="mb-4 group-hover:scale-110 transition-transform">
                <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                  <ImageIcon className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Text to Image</h2>
              <div className="mt-auto pt-4">
                <span className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium group-hover:bg-cyan-600 transition-colors">
                  Get Started
                </span>
              </div>
            </div>
          </Link>

          {/* Terabox Downloader Panel */}
          <Link href="/terabox-downloader">
            <div className="bg-white rounded-2xl shadow-2xl hover:shadow-xl transition-shadow cursor-pointer p-8 h-full flex flex-col items-center justify-center text-center group">
              <div className="mb-4 group-hover:scale-110 transition-transform">
                <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Download className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Terabox Downloader</h2>
              <div className="mt-auto pt-4">
                <span className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium group-hover:bg-cyan-600 transition-colors">
                  Get Started
                </span>
              </div>
            </div>
          </Link>

          {/* Link to QR Panel */}
          <Link href="/link-to-qr">
            <div className="bg-white rounded-2xl shadow-2xl hover:shadow-xl transition-shadow cursor-pointer p-8 h-full flex flex-col items-center justify-center text-center group">
              <div className="mb-4 group-hover:scale-110 transition-transform">
                <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                  <QrCode className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Link to QR</h2>
              <div className="mt-auto pt-4">
                <span className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium group-hover:bg-cyan-600 transition-colors">
                  Get Started
                </span>
              </div>
            </div>
          </Link>

          {/* Spotify Track Downloader Panel */}
          <Link href="/spotify-downloader">
            <div className="bg-white rounded-2xl shadow-2xl hover:shadow-xl transition-shadow cursor-pointer p-8 h-full flex flex-col items-center justify-center text-center group">
              <div className="mb-4 group-hover:scale-110 transition-transform">
                <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
                  <Music className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Spotify Track Downloader</h2>
              <div className="mt-auto pt-4">
                <span className="inline-block bg-cyan-500 text-white px-6 py-2 rounded-lg font-medium group-hover:bg-cyan-600 transition-colors">
                  Get Started
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
