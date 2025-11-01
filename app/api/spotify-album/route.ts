export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return Response.json({ error: "URL parameter required" }, { status: 400 })
  }

  try {
    console.log("[v0] Fetching album info for:", url)
    const apiUrl = `https://spotify.anshapi.workers.dev/?url=${encodeURIComponent(url)}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Album API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("[v0] Album info received:", JSON.stringify(data).substring(0, 500))

    // Extract track links from album response
    if (data.data?.tracks && Array.isArray(data.data.tracks)) {
      const trackUrls = data.data.tracks
        .filter((track: any) => track.url && track.url.includes("/track/"))
        .map((track: any) => ({
          url: track.url,
          title: track.name || track.title || "Unknown",
          artist: track.artist || "",
        }))

      console.log("[v0] Extracted", trackUrls.length, "tracks from album")
      return Response.json({
        tracks: trackUrls,
        albumName: data.data?.name || "Unknown Album",
        totalTracks: trackUrls.length,
      })
    }

    return Response.json({
      tracks: [],
      albumName: data.data?.name || "Unknown Album",
      totalTracks: 0,
    })
  } catch (error) {
    console.error("[v0] Album fetch error:", error)
    return Response.json({ error: "Failed to fetch album information" }, { status: 500 })
  }
}
