import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const videoUrl = searchParams.get("url")

    if (!videoUrl) {
      return NextResponse.json({ error: "Video URL is required" }, { status: 400 })
    }

    console.log("[v0] Downloading video from:", videoUrl)

    // Fetch the video from the external URL
    const response = await fetch(videoUrl)

    if (!response.ok) {
      console.log("[v0] Failed to fetch video:", response.status)
      return NextResponse.json({ error: "Failed to fetch video" }, { status: response.status })
    }

    const buffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(buffer)

    return new NextResponse(uint8Array, {
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": `attachment; filename="generated-video-${Date.now()}.mp4"`,
        "Content-Length": uint8Array.byteLength.toString(),
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.log("[v0] Download error:", error)
    return NextResponse.json({ error: "Failed to download video" }, { status: 500 })
  }
}
