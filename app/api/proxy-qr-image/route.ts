export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const imageUrl = searchParams.get("imageUrl")

  if (!imageUrl) {
    return Response.json({ error: "Image URL is required" }, { status: 400 })
  }

  try {
    const response = await fetch(imageUrl)

    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.status}`)
    }

    const blob = await response.blob()

    return new Response(blob, {
      headers: {
        "Content-Type": response.headers.get("content-type") || "image/jpeg",
        "Cache-Control": "public, max-age=3600",
      },
    })
  } catch (error) {
    console.error("[v0] Error proxying image:", error)
    return Response.json({ error: "Failed to load image" }, { status: 500 })
  }
}
