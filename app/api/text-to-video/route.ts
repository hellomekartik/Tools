export async function POST(request: Request) {
  try {
    const { prompt } = await request.json()

    if (!prompt || prompt.trim().length === 0) {
      return Response.json({ error: "Prompt is required" }, { status: 400 })
    }

    const encodedPrompt = encodeURIComponent(prompt)
    const apiUrl = `https://texttovideov2.alphaapi.workers.dev/api/?prompt=${encodedPrompt}`

    console.log("[v0] Calling external API:", apiUrl)

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
      },
    })

    console.log("[v0] External API response status:", response.status)

    if (!response.ok) {
      return Response.json({ error: `API error: ${response.status}` }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] External API response:", data)

    return Response.json(data)
  } catch (error) {
    console.error("[v0] Text-to-video API error:", error)
    return Response.json({ error: "Failed to generate video" }, { status: 500 })
  }
}
