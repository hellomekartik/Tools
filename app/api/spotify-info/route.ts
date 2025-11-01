export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return Response.json({ error: "URL parameter required" }, { status: 400 })
  }

  try {
    console.log("[v0] Fetching Spotify info for:", url)
    const apiUrl = `https://spotify.anshapi.workers.dev/?url=${encodeURIComponent(url)}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Spotify info received:", data)

    return Response.json(data)
  } catch (error) {
    console.error("[v0] Spotify info error:", error)
    return Response.json({ error: "Failed to fetch track information" }, { status: 500 })
  }
}
