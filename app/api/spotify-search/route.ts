export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("q")

  if (!query) {
    return Response.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  try {
    const externalUrl = `https://spotify-track-finder-ten.vercel.app/api/spotify?q=${encodeURIComponent(query)}`

    const response = await fetch(externalUrl)

    if (!response.ok) {
      throw new Error(`External API error: ${response.status}`)
    }

    const data = await response.json()
    return Response.json(data)
  } catch (error) {
    console.error("[v0] Spotify search error:", error)
    return Response.json({ error: "Failed to search for tracks" }, { status: 500 })
  }
}
