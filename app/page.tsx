"use client"

import Link from "next/link"
import { Video, Volume2, ImageIcon, Download, QrCode, Music, Link2, Sparkles } from "lucide-react"

export default function Home() {
  const tools = [
    {
      href: "/text-to-video",
      title: "Text to Video",
      icon: Video,
      description: "Create videos from text",
      gradient: "from-violet-500 to-purple-600",
    },
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
      title: "Spotify Downloader",
      icon: Music,
      description: "Download Spotify tracks",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      href: "/url-shortener",
      title: "URL Shortener",
      icon: Link2,
      description: "Shorten your links",
      gradient: "from-blue-500 to-cyan-600",
    },
  ]

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float-gentle" />
        <div
          className="absolute bottom-20 right-10 w-80 h-80 bg-pink-200/25 rounded-full blur-3xl animate-float-gentle"
          style={{ animationDelay: "3s" }}
        />
        <div
          className="absolute top-1/2 left-1/2 w-72 h-72 bg-violet-200/20 rounded-full blur-3xl animate-float-gentle"
          style={{ animationDelay: "1.5s" }}
        />
      </div>

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-16">
        <div className="text-center mb-16 space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 border border-purple-200">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-medium text-purple-700">All-in-One Toolkit</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold text-foreground mb-6 tracking-tight">
            Tools{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-violet-600 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto font-light leading-relaxed">
            Powerful utilities designed for modern workflows
          </p>
        </div>

        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool, index) => {
              const Icon = tool.icon
              return (
                <Link
                  key={tool.href}
                  href={tool.href}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 100 + 200}ms` }}
                >
                  <div className="relative bg-white border border-border rounded-2xl p-8 h-full flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-200/50 hover:border-purple-300">
                    <div className="mb-6 relative">
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${tool.gradient} rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity`}
                      />
                      <div
                        className={`relative w-20 h-20 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center group-hover:animate-glow-subtle`}
                      >
                        <Icon className="w-10 h-10 text-white" strokeWidth={1.5} />
                      </div>
                    </div>

                    <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-purple-600 transition-colors">
                      {tool.title}
                    </h2>

                    <p className="text-sm text-muted-foreground mb-4">{tool.description}</p>

                    <div className="mt-2">
                      <span className="text-purple-600 text-sm font-semibold group-hover:gap-2 inline-flex items-center gap-1 transition-all">
                        Get Started
                        <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
                      </span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>

        <div className="mt-20 text-center animate-fade-in-up" style={{ animationDelay: "800ms" }}>
          <p className="text-muted-foreground text-sm font-light">Crafted with care for seamless productivity</p>
        </div>
      </div>
    </div>
  )
}
