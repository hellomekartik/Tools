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
      gradient: "from-purple-500 to-pink-600",
    },
    {
      href: "/text-to-image",
      title: "Text to Image",
      icon: ImageIcon,
      description: "Generate AI images",
      gradient: "from-pink-500 to-rose-600",
    },
    {
      href: "/terabox-downloader",
      title: "Terabox Downloader",
      icon: Download,
      description: "Download Terabox files",
      gradient: "from-emerald-500 to-teal-600",
    },
    {
      href: "/link-to-qr",
      title: "Link to QR",
      icon: QrCode,
      description: "Create QR codes instantly",
      gradient: "from-indigo-500 to-blue-600",
    },
    {
      href: "/spotify-downloader",
      title: "Spotify Track",
      icon: Music,
      description: "Play & download Spotify tracks",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      href: "https://skullurl.vercel.app/",
      title: "URL Shortener",
      icon: Link2,
      description: "Shorten your links",
      gradient: "from-blue-500 to-cyan-600",
    },
    {
      href: "/translator",
      title: "Translator",
      icon: Languages,
      description: "Translate text to any language",
      gradient: "from-orange-500 to-amber-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-80 h-80 bg-purple-200/40 rounded-full blur-3xl animate-float-gentle" />
        <div
          className="absolute bottom-20 right-10 w-72 h-72 bg-pink-200/30 rounded-full blur-3xl animate-float-gentle"
          style={{ animationDelay: "5s" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-16 space-y-6">
          <div className="animate-fade-in-up">
            <div className="relative inline-flex">
              <div className="absolute inset-0 bg-purple-300/40 rounded-full blur-xl" />
              <div className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white border border-purple-100 shadow-lg shadow-purple-200/50">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-60"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
                </span>
                <span className="text-lg font-semibold text-purple-600 tracking-wide">
                  {currentTime || "Loading..."}
                </span>
              </div>
            </div>
          </div>

          <h1
            className="text-6xl md:text-8xl font-bold text-foreground tracking-tight animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
          >
            Skull{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
              Tools
            </span>
          </h1>
        </div>

        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                  className="group animate-fade-in-up opacity-0"
                  style={{ animationDelay: `${index * 80 + 200}ms`, animationFillMode: "forwards" }}
                >
                  <div className="relative bg-white/90 backdrop-blur-sm border border-border rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center card-glow hover:scale-[1.02] transition-transform duration-300">
                    <div className="mb-6 relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300`}
                      />
                      <div
                        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center transition-transform duration-300 group-hover:scale-105`}
                      >
                        <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-600 transition-colors duration-300">
                      {tool.title}
                    </h2>

                    <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>

                    <div className="mt-2">
                      <span className="text-purple-600 text-sm font-semibold inline-flex items-center gap-1.5 transition-all duration-300 group-hover:gap-3">
                        Get Started
                        <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                      </span>
                    </div>
                  </div>
                </LinkComponent>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
