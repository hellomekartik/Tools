export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const prompt = searchParams.get("prompt")

  if (!prompt) {
    return Response.json({ error: "Prompt is required" }, { status: 400 })
  }

  try {
    console.log("[v0] Fetching image from external API with prompt:", prompt)

    const apiUrl = `https://image-gen.rishuapi.workers.dev/?prompt=${encodeURIComponent(prompt)}`
    const response = await fetch(apiUrl, {
      method: "GET",
    })

    if (!response.ok) {
      console.error("[v0] API error:", response.status)
      return Response.json({ error: "Failed to generate image" }, { status: response.status })
    }

    const data = await response.json()
    console.log("[v0] API response:", data)

    if (!data.image_url) {
      console.error("[v0] No image_url in response")
      return Response.json({ error: "No image URL in response" }, { status: 500 })
    }

    console.log("[v0] Image URL extracted:", data.image_url)

    return Response.json({ url: data.image_url, prompt })
  } catch (error) {
    console.error("[v0] Error fetching image:", error)
    return Response.json({ error: "Failed to fetch image" }, { status: 500 })
  }
}
