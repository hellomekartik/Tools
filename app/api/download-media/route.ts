export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const mediaUrl = searchParams.get("url")

  if (!mediaUrl) {
    return Response.json({ error: "URL parameter required" }, { status: 400 })
  }

  try {
    console.log("[v0] Proxying media download from:", mediaUrl)
    const response = await fetch(mediaUrl)

    if (!response.ok) {
      throw new Error(`Media fetch error: ${response.status}`)
    }

    const buffer = await response.arrayBuffer()

    return new Response(buffer, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "audio/mpeg",
        "Content-Length": buffer.byteLength.toString(),
      },
    })
  } catch (error) {
    console.error("[v0] Media download error:", error)
    return Response.json({ error: "Failed to download media" }, { status: 500 })
  }
}
