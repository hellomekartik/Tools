"use client"

import {
  Menu,
  Settings,
  Info,
  ArrowLeft,
  Video,
  Volume2,
  ImageIcon,
  Download,
  QrCode,
  Music,
  Languages,
} from "lucide-react"
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
  headerEmoji = "",
  headerIcon,
  subtitle = "Instant contact information retrieval",
  hideSettings = false,
}: HeaderProps) {
  const [showMenu, setShowMenu] = useState(false)

  const renderHeaderIcon = () => {
    if (title === "Spotify Track Downloader") {
      return (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-400/40 animate-glow-pulse">
          <Music className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Video") {
      return (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-400/40 animate-glow-pulse">
          <Video className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Voice") {
      return (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-400/40 animate-glow-pulse">
          <Volume2 className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Image") {
      return (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-400/40 animate-glow-pulse">
          <ImageIcon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Terabox Downloader") {
      return (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-400/40 animate-glow-pulse">
          <Download className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Link to QR") {
      return (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-400/40 animate-glow-pulse">
          <QrCode className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Translator") {
      return (
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-600 flex items-center justify-center shadow-lg shadow-orange-400/40 animate-glow-pulse">
          <Languages className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (headerIcon) {
      return (
        <Image
          src={headerIcon || "/placeholder.svg"}
          alt={title}
          width={48}
          height={48}
          className="w-12 h-12 rounded-xl object-cover shadow-lg"
          priority
        />
      )
    }
    return (
      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center text-lg shadow-lg shadow-purple-400/40 animate-glow-pulse">
        {headerEmoji}
      </div>
    )
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-500 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl border-b border-purple-100 shadow-lg shadow-purple-100/20"
          : "bg-white/80 backdrop-blur-md border-b border-purple-50"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4 animate-fade-in-up">
          {showBackButton && (
            <Link
              href="/"
              className="p-2.5 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-200/30"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Link>
          )}
          {renderHeaderIcon()}
          <div>
            <h1 className="text-xl font-bold text-foreground">{title}</h1>
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          </div>
        </div>

        <div className="relative">
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-2.5 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-200/30"
          >
            <Menu className="w-5 h-5 text-foreground" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl shadow-purple-200/40 border border-purple-100 overflow-hidden animate-fade-in-scale">
              {!hideSettings && (
                <button
                  onClick={() => {
                    onSettingsClick()
                    setShowMenu(false)
                  }}
                  className="w-full px-5 py-4 flex items-center gap-3 hover:bg-purple-50 transition-all duration-300 text-left group"
                >
                  <Settings className="w-5 h-5 text-purple-500 group-hover:animate-icon-float" />
                  <span className="text-foreground font-medium">Settings</span>
                </button>
              )}
              <button
                onClick={() => {
                  onAboutClick()
                  setShowMenu(false)
                }}
                className={`w-full px-5 py-4 flex items-center gap-3 hover:bg-purple-50 transition-all duration-300 text-left group ${!hideSettings ? "border-t border-purple-50" : ""}`}
              >
                <Info className="w-5 h-5 text-purple-500 group-hover:animate-icon-float" />
                <span className="text-foreground font-medium">About</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
