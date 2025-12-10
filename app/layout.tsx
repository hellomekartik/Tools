import type React from "react"
import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skull Tools - Powerful Utilities Collection",
  description: "Access powerful tools for text-to-image, text-to-video, QR generation, and more",
  generator: "v0.app",
}

export const viewport: Viewport = {
  width: 1024,
  initialScale: 0.5,
  minimumScale: 0.3,
  maximumScale: 2,
  userScalable: true,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://all-downloader.itxkaal.workers.dev" />
        <link rel="preconnect" href="https://svaradl.aculix.org" />
        <link rel="preconnect" href="https://cdn-spotify-inter.zm.io.vn" />
        <link rel="dns-prefetch" href="https://all-downloader.itxkaal.workers.dev" />
        <link rel="dns-prefetch" href="https://svaradl.aculix.org" />
        <link rel="dns-prefetch" href="https://cdn-spotify-inter.zm.io.vn" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
