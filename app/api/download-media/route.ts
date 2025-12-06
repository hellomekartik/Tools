export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mediaUrl = searchParams.get("url")
  const filename = searchParams.get("filename") || "download"

  if (!mediaUrl) {
    return Response.json({ error: "URL parameter required" }, { status: 400 })
  }

  try {
    console.log("[v0] Proxying media download from:", mediaUrl)

    const response = await fetch(mediaUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "*/*",
        "Accept-Encoding": "identity",
        Connection: "keep-alive",
        Referer: "https://spotify.com/",
      },
    })

    if (!response.ok) {
      console.error("[v0] Media fetch failed:", response.status, response.statusText)
      throw new Error(`Media fetch error: ${response.status}`)
    }

    const buffer = await response.arrayBuffer()
    console.log("[v0] Downloaded buffer size:", buffer.byteLength)

    const contentType = response.headers.get("content-type") || "audio/mpeg"

    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9\s\-_.]/g, "").trim() || "track"
    const finalFilename = sanitizedFilename.endsWith(".mp3") ? sanitizedFilename : `${sanitizedFilename}.mp3`

    return new Response(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Length": buffer.byteLength.toString(),
        "Content-Disposition": `attachment; filename="${finalFilename}"`,
        "Cache-Control": "no-cache",
      },
    })
  } catch (error) {
    console.error("[v0] Media download error:", error)
    return Response.json({ error: "Failed to download media" }, { status: 500 })
  }
}
