import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Text to Voice - OsintX",
  description: "Convert text to speech with multiple voice options",
}

export default function TextToVoiceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
