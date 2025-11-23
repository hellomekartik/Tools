"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"

export default function URLShortener() {
  const router = useRouter()

  useEffect(() => {
    // Redirect to the URL shortener website
    window.location.href = "https://skullurl.vercel.app/"
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center space-y-4">
        <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
        <p className="text-foreground text-lg">Redirecting to URL Shortener...</p>
      </div>
    </div>
  )
}
