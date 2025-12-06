"use client"

import { X, Code2, Video, Volume2, ImageIcon, Download, QrCode, Music, Sparkles, Languages } from "lucide-react"
import Image from "next/image"
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"

interface AboutModalProps {
  onClose: () => void
  isAadhar?: boolean
  isTextToVideo?: boolean
  isTextToVoice?: boolean
  isTextToImage?: boolean
  isTerabox?: boolean
  isLinkToQr?: boolean
  isSpotifyDownloader?: boolean
  isTranslator?: boolean
}

export default function AboutModal({
  onClose,
  isAadhar = false,
  isTextToVideo = false,
  isTextToVoice = false,
  isTextToImage = false,
  isTerabox = false,
  isLinkToQr = false,
  isSpotifyDownloader = false,
  isTranslator = false,
}: AboutModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderToolIcon = () => {
    if (isTranslator) {
      return (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-500 flex items-center justify-center shadow-xl shadow-orange-400/40 animate-glow-pulse">
          <Languages className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isSpotifyDownloader) {
      return (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-400/40 animate-glow-pulse">
          <Music className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isLinkToQr) {
      return (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center shadow-xl shadow-indigo-400/40 animate-glow-pulse">
          <QrCode className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isTextToVideo) {
      return (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-xl shadow-cyan-400/40 animate-glow-pulse">
          <Video className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isTextToVoice) {
      return (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-400/40 animate-glow-pulse">
          <Volume2 className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isTextToImage) {
      return (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center shadow-xl shadow-orange-400/40 animate-glow-pulse">
          <ImageIcon className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isTerabox) {
      return (
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center shadow-xl shadow-emerald-400/40 animate-glow-pulse">
          <Download className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    return (
      <Image
        src={isAadhar ? "/aadhar-lookup-icon.png" : "/phone-lookup-icon.png"}
        alt={isAadhar ? "Aadhar Lookup" : "Phone Lookup"}
        width={80}
        height={80}
        className="w-20 h-20 rounded-2xl shadow-xl"
      />
    )
  }

  const modalContent = (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl shadow-purple-200/40 max-w-md w-full max-h-[90vh] overflow-hidden animate-fade-in-scale">
        <div className="flex items-center justify-between p-6 border-b border-purple-100 sticky top-0 bg-white z-10">
          <h2 className="text-2xl font-bold text-foreground">About</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-purple-50 rounded-xl transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-purple-200/30"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>

        <div className="p-6 space-y-8 max-h-[calc(90vh-88px)] overflow-y-auto">
          {/* Tool Icon & Name */}
          <div className="flex flex-col items-center gap-4 animate-fade-in-up">
            {renderToolIcon()}
            <h3 className="font-bold text-xl text-foreground text-center">
              {isTranslator
                ? "Translator"
                : isSpotifyDownloader
                  ? "Spotify Downloader"
                  : isLinkToQr
                    ? "Link to QR"
                    : isTextToVoice
                      ? "Text to Voice"
                      : isTextToVideo
                        ? "Text to Video"
                        : isTextToImage
                          ? "Text to Image"
                          : isTerabox
                            ? "Terabox Downloader"
                            : isAadhar
                              ? "Aadhar Lookup"
                              : "Phone Lookup"}
            </h3>
          </div>

          {/* Creator Section */}
          <div className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100/50 animate-fade-in-up stagger-1 hover-glow transition-all duration-300">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-400/30">
                <Code2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">Made by Kartik Bansal</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A tech enthusiast dedicated to creating powerful, user-friendly tools that solve real-world problems.
                </p>
              </div>
            </div>
          </div>

          {/* About Tool Section */}
          <div className="bg-gradient-to-br from-purple-50/80 to-pink-50/50 rounded-2xl p-5 border border-purple-100/50 animate-fade-in-up stagger-2 hover-glow transition-all duration-300">
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-orange-400/30">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-2">About This Tool</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isTranslator
                    ? "Translate text between 50+ languages instantly with high accuracy using advanced translation API."
                    : isSpotifyDownloader
                      ? "Download songs from Spotify links easily. Extract song info including artist, album, and direct download links."
                      : isLinkToQr
                        ? "Convert any URL into a scannable QR code instantly with a beautiful, modern interface."
                        : isTextToVoice
                          ? "Convert text into natural-sounding speech with multiple voice options and languages."
                          : isTextToVideo
                            ? "Generate videos from text prompts using advanced AI technology."
                            : isTextToImage
                              ? "Generate stunning images from text prompts using cutting-edge AI."
                              : isTerabox
                                ? "Download files from Terabox links with thumbnails and direct download links."
                                : "Access information instantly through an intuitive, modern interface."}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (!mounted) return null
  return createPortal(modalContent, document.body)
}
