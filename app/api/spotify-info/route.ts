export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const url = searchParams.get("url")

  if (!url) {
    return Response.json({ error: "URL parameter required" }, { status: 400 })
  }

  try {
    const apiUrl = `https://all-downloader.itxkaal.workers.dev/?url=${encodeURIComponent(url)}`

    const response = await fetch(apiUrl)

    if (!response.ok) {
      throw new Error(`Spotify API error: ${response.status}`)
    }

    const data = await response.json()

    return Response.json(data)
  } catch (error) {
    console.error("Spotify info error:", error)
    return Response.json({ error: "Failed to fetch track information" }, { status: 500 })
  }
}
