"use client"

import { Menu, Settings, Info, ArrowLeft, Video, Volume2, ImageIcon, Download, QrCode, Music } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import Image from "next/image"

interface HeaderProps {
  onSettingsClick: () => void
  onAboutClick: () => void
  isScrolled: boolean
  title?: string
  showBackButton?: boolean
  headerEmoji?: string
  headerIcon?: string
  subtitle?: string
  hideSettings?: boolean
}

export default function Header({
  onSettingsClick,
  onAboutClick,
  isScrolled,
  title = "Phone Lookup",
  showBackButton = false,
  headerEmoji = "📞",
  headerIcon,
  subtitle = "Instant contact information retrieval",
  hideSettings = false,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false)

  const renderHeaderIcon = () => {
    if (title === "Spotify Track Downloader") {
      return (
        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
          <Music className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Video") {
      return (
        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
          <Video className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Voice") {
      return (
        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <Volume2 className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Image") {
      return (
        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
          <ImageIcon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Terabox Downloader") {
      return (
        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
          <Download className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Link to QR") {
      return (
        <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
          <QrCode className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (headerIcon) {
      return (
        <Image
          src={headerIcon || "/placeholder.svg"}
          alt={title}
          width={40}
          height={40}
          className="w-10 h-10 rounded-lg object-cover"
          priority
        />
      )
    }
    return (
      <div className="w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-lg">{headerEmoji}</div>
    )
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200/50" : "bg-white border-b border-slate-200"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Link href="/" className="p-2 hover:bg-slate-100 rounded-lg transition">
              <ArrowLeft className="w-6 h-6 text-slate-600" />
            </Link>
          )}
          {renderHeaderIcon()}
          <div>
            <h1 className="text-xl font-bold text-slate-900">{title}</h1>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>
        </div>

        <div className="relative">
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 hover:bg-slate-100 rounded-lg transition">
            <Menu className="w-6 h-6 text-slate-600" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden">
              {!hideSettings && (
                <button
                  onClick={() => {
                    onSettingsClick()
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition text-left"
                >
                  <Settings className="w-5 h-5 text-slate-600" />
                  <span className="text-slate-900">Settings</span>
                </button>
              )}
              <button
                onClick={() => {
                  onAboutClick()
                  setShowMenu(false)
                }}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-slate-100 transition text-left ${!hideSettings ? "border-t border-slate-200" : ""}`}
              >
                <Info className="w-5 h-5 text-slate-600" />
                <span className="text-slate-900">About</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
