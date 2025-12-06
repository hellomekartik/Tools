import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url")

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 })
  }

  try {
    // Fetch the full audio file
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "audio/*,*/*",
        Referer: "https://spotify.com/",
      },
    })

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch audio" }, { status: response.status })
    }

    const arrayBuffer = await response.arrayBuffer()
    const contentType = response.headers.get("content-type") || "audio/mpeg"

    // Return the audio with headers that support seeking
    return new NextResponse(arrayBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": arrayBuffer.byteLength.toString(),
        "Accept-Ranges": "bytes",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("[v0] Proxy audio error:", error)
    return NextResponse.json({ error: "Failed to proxy audio" }, { status: 500 })
  }
}
