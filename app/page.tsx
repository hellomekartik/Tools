"use client"

import Link from "next/link"
import { Volume2, ImageIcon, Download, QrCode, Music, Link2, Languages } from "lucide-react"
import { useState, useEffect } from "react"

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>("")

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const hours = now.getHours()
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")
      const ampm = hours >= 12 ? "PM" : "AM"
      const displayHours = (hours % 12 || 12).toString().padStart(2, "0")
      setCurrentTime(`${displayHours}:${minutes}:${seconds} ${ampm}`)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  const tools = [
    {
      href: "/text-to-voice",
      title: "Text to Voice",
      icon: Volume2,
      description: "Convert text to speech",
      gradient: "from-emerald-400 to-teal-500",
      shadow: "shadow-emerald-400/40",
    },
    {
      href: "/text-to-image",
      title: "Text to Image",
      icon: ImageIcon,
      description: "Generate AI images",
      gradient: "from-teal-400 to-cyan-500",
      shadow: "shadow-teal-400/40",
    },
    {
      href: "/terabox-downloader",
      title: "Terabox Downloader",
      icon: Download,
      description: "Download Terabox files",
      gradient: "from-green-400 to-emerald-500",
      shadow: "shadow-green-400/40",
    },
    {
      href: "/link-to-qr",
      title: "Link to QR",
      icon: QrCode,
      description: "Create QR codes instantly",
      gradient: "from-cyan-400 to-teal-500",
      shadow: "shadow-cyan-400/40",
    },
    {
      href: "/spotify-downloader",
      title: "Spotify Track",
      icon: Music,
      description: "Play & download tracks",
      gradient: "from-teal-400 to-green-500",
      shadow: "shadow-teal-400/40",
    },
    {
      href: "https://skullurl.vercel.app/",
      title: "URL Shortener",
      icon: Link2,
      description: "Shorten your links",
      gradient: "from-emerald-400 to-cyan-500",
      shadow: "shadow-emerald-400/40",
    },
    {
      href: "/translator",
      title: "Translator",
      icon: Languages,
      description: "Translate to any language",
      gradient: "from-green-400 to-teal-500",
      shadow: "shadow-green-400/40",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/20 relative overflow-hidden">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-emerald-400/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-20 right-1/4 w-96 h-96 bg-teal-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "-2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-400/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16 space-y-8 animate-fade-in-up">
          {/* Clock pill */}
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-emerald-400/30 rounded-full blur-xl" />
            <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/80 backdrop-blur-sm border border-emerald-200/50 shadow-lg shadow-emerald-200/30">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-lg font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                {currentTime || "..."}
              </span>
            </div>
          </div>

          {/* Title */}
          <div>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tight">
              <span className="text-slate-800">Skull</span>{" "}
              <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent animate-neon-glow">
                Tools
              </span>
            </h1>
            <p className="mt-4 text-slate-500 text-lg">Powerful utilities for modern workflows</p>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="w-full max-w-5xl animate-fade-in-up" style={{ animationDelay: "0.2s" }}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              const isExternal = tool.href.startsWith("http")
              const LinkComponent = isExternal ? "a" : Link
              const linkProps = isExternal
                ? { href: tool.href, target: "_blank", rel: "noopener noreferrer" }
                : { href: tool.href }

              return (
                <LinkComponent
                  key={tool.href}
                  {...linkProps}
                  className="group"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative bg-white/70 backdrop-blur-sm border border-emerald-100/50 rounded-2xl p-6 h-full transition-all duration-300 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-200/30 hover:-translate-y-1">
                    {/* Glow effect on hover */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-400/0 to-teal-400/0 group-hover:from-emerald-400/5 group-hover:to-teal-400/5 transition-all duration-300" />

                    <div className="relative flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center flex-shrink-0 shadow-lg ${tool.shadow} group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className="w-7 h-7 text-white" strokeWidth={1.5} />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h2 className="text-lg font-semibold text-slate-800 group-hover:text-emerald-600 transition-colors">
                          {tool.title}
                        </h2>
                        <p className="text-sm text-slate-500 truncate">{tool.description}</p>
                      </div>

                      <span className="text-emerald-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all text-xl">
                        →
                      </span>
                    </div>
                  </div>
                </LinkComponent>
              )
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 text-center animate-fade-in-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-lg md:text-xl font-bold text-slate-600 animate-pulse">
            Built with <span className="text-emerald-500 animate-bounce inline-block">♥</span> by{" "}
            <span className="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 bg-clip-text text-transparent">
              Kartik Bansal
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}
