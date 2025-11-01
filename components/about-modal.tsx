"use client"

import { X, Code2, Video, Volume2, ImageIcon, Download, QrCode, Music } from "lucide-react"
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
}: AboutModalProps) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const renderToolIcon = () => {
    if (isSpotifyDownloader) {
      return (
        <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
          <Music className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isLinkToQr) {
      return (
        <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
          <QrCode className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isTextToVideo) {
      return (
        <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
          <Video className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isTextToVoice) {
      return (
        <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center">
          <Volume2 className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isTextToImage) {
      return (
        <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
          <ImageIcon className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    if (isTerabox) {
      return (
        <div className="w-20 h-16 rounded-xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center">
          <Download className="w-10 h-10 text-white" strokeWidth={1.5} />
        </div>
      )
    }
    return (
      <Image
        src={isAadhar ? "/aadhar-lookup-icon.png" : "/phone-lookup-icon.png"}
        alt={isAadhar ? "Aadhar Lookup" : "Phone Lookup"}
        width={80}
        height={64}
        className="w-16 h-16 rounded-xl"
      />
    )
  }

  const modalContent = (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-slate-200 sticky top-0 bg-white">
          <h2 className="text-2xl font-bold text-slate-900">About</h2>
          <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition">
            <X className="w-6 h-6 text-slate-600" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-slate-600 mb-6">About this application :-</p>

          <div className="space-y-6">
            <div className="flex flex-col items-center gap-4">
              {renderToolIcon()}
              <h3 className="font-bold text-slate-900 text-center">
                {isSpotifyDownloader
                  ? "Spotify Downloader Tool"
                  : isLinkToQr
                    ? "Link to QR Tool"
                    : isTextToVoice
                      ? "Text to Voice Tool"
                      : isTextToVideo
                        ? "Text to Video Tool"
                        : isTextToImage
                          ? "Text to Image Tool"
                          : isTerabox
                            ? "Terabox Downloader Tool"
                            : isAadhar
                              ? "Aadhar Lookup Tool"
                              : "Phone Lookup Tool"}
              </h3>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="flex gap-3 mb-4">
                <Code2 className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Made by Kartik Bansal</h4>
                  <p className="text-sm text-slate-600">
                    A tech enthusiast dedicated to creating powerful, user-friendly tools that solve real-world
                    problems. With expertise in modern web technologies and a keen eye for design, Kartik builds
                    applications that are both functional and beautiful.
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6">
              <div className="flex gap-3">
                <div className="w-5 h-5 text-cyan-600 flex-shrink-0 mt-1">✨</div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">About This Tool</h4>
                  <p className="text-sm text-slate-600">
                    {isSpotifyDownloader
                      ? "This Spotify downloader tool allows you to easily download songs from Spotify links. It extracts song information including artist, album, and direct download links with a simple and intuitive interface."
                      : isLinkToQr
                        ? "This link to QR code tool converts any URL into a scannable QR code. Built with cutting-edge technologies, it delivers fast and reliable results with a beautiful user experience."
                        : isTextToVoice
                          ? "This text to voice tool converts text into natural-sounding speech with multiple voice options and languages. Built with cutting-edge technologies, it delivers fast and reliable results with a beautiful user experience."
                          : isTextToVideo
                            ? "This text to video tool generates videos from text prompts using advanced AI technology. Built with cutting-edge technologies, it delivers fast and reliable results with a beautiful user experience."
                            : isTextToImage
                              ? "This text to image tool generates stunning images from text prompts using advanced AI technology. Built with cutting-edge technologies, it delivers fast and reliable results with a beautiful user experience."
                              : isTerabox
                                ? "This Terabox downloader tool allows you to easily download files from Terabox links. It extracts file information including thumbnails and direct download links with a simple and intuitive interface."
                                : isAadhar
                                  ? "This Aadhar lookup tool provides instant access to information through an intuitive and modern interface. Built with cutting-edge technologies, it delivers fast and reliable results with a beautiful user experience."
                                  : "This phone lookup tool provides instant access to contact information through an intuitive and modern interface. Built with cutting-edge technologies, it delivers fast and reliable results with a beautiful user experience."}
                  </p>
                </div>
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
