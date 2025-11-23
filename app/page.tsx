"use client"

import Link from "next/link"
import { Video, Volume2, ImageIcon, Download, QrCode, Music, Link2 } from "lucide-react"

export default function Home() {
  const tools = [
    {
      href: "/text-to-video",
      title: "Text to Video",
      icon: Video,
      gradient: "from-cyan-500 via-blue-500 to-cyan-600",
    },
    {
      href: "/text-to-voice",
      title: "Text to Voice",
      icon: Volume2,
      gradient: "from-purple-500 via-pink-500 to-purple-600",
    },
    {
      href: "/text-to-image",
      title: "Text to Image",
      icon: ImageIcon,
      gradient: "from-orange-500 via-red-500 to-orange-600",
    },
    {
      href: "/terabox-downloader",
      title: "Terabox Downloader",
      icon: Download,
      gradient: "from-green-500 via-emerald-500 to-green-600",
    },
    {
      href: "/link-to-qr",
      title: "Link to QR",
      icon: QrCode,
      gradient: "from-indigo-500 via-purple-500 to-indigo-600",
    },
    {
      href: "/spotify-downloader",
      title: "Spotify Downloader",
      icon: Music,
      gradient: "from-emerald-500 via-green-500 to-emerald-600",
    },
    {
      href: "/url-shortener",
      title: "URL Shortener",
      icon: Link2,
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-purple-500/10 to-pink-500/10 animate-gradient" />

      <div className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-3xl animate-float" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      />

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-12">
        <div className="text-center mb-12 space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-4 animate-fade-in">
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
              Tools Hub
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful utilities at your fingertips
          </p>
        </div>

        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Link key={tool.href} href={tool.href} className="group" style={{ animationDelay: `${index * 100}ms` }}>
                  <div className="relative bg-card border border-border rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/20 animate-fade-in">
                    <div className="mb-6 relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-2xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity`}
                      />
                      <div
                        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:animate-glow-pulse`}
                      >
                        <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                      {tool.title}
                    </h2>

                    <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-primary text-sm font-medium">Get Started →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            Made with <span className="text-primary">❤</span> for productivity
          </p>
        </div>
      </div>
    </div>
  )
}
