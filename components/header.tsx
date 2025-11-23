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
        <div className="w-14 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-green-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Music className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Video") {
      return (
        <div className="w-14 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/30">
          <Video className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Voice") {
      return (
        <div className="w-14 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-lg shadow-purple-500/30">
          <Volume2 className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Text to Image") {
      return (
        <div className="w-14 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center shadow-lg shadow-pink-500/30">
          <ImageIcon className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Terabox Downloader") {
      return (
        <div className="w-14 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
          <Download className="w-6 h-6 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (title === "Link to QR") {
      return (
        <div className="w-14 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
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
      <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-lg shadow-lg shadow-primary/50">
        {headerEmoji}
      </div>
    )
  }

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-border shadow-sm"
          : "bg-white/70 backdrop-blur-md border-b border-border/50"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showBackButton && (
            <Link href="/" className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-200 hover:scale-110">
              <ArrowLeft className="w-6 h-6 text-foreground" />
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
            className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-200 hover:scale-110"
          >
            <Menu className="w-6 h-6 text-foreground" />
          </button>

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl shadow-purple-200/50 border border-border overflow-hidden animate-fade-in">
              {!hideSettings && (
                <button
                  onClick={() => {
                    onSettingsClick()
                    setShowMenu(false)
                  }}
                  className="w-full px-4 py-3 flex items-center gap-3 hover:bg-purple-50 transition-all duration-200 text-left"
                >
                  <Settings className="w-5 h-5 text-purple-600" />
                  <span className="text-foreground font-medium">Settings</span>
                </button>
              )}
              <button
                onClick={() => {
                  onAboutClick()
                  setShowMenu(false)
                }}
                className={`w-full px-4 py-3 flex items-center gap-3 hover:bg-purple-50 transition-all duration-200 text-left ${!hideSettings ? "border-t border-border/50" : ""}`}
              >
                <Info className="w-5 h-5 text-purple-600" />
                <span className="text-foreground font-medium">About</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
