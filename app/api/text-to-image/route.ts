export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const prompt = searchParams.get("prompt")
  const platform = searchParams.get("platform") || "Platform A"
  const model = searchParams.get("model") || ""
  const style = searchParams.get("style") || ""

  if (!prompt) {
    return Response.json({ error: "Prompt is required" }, { status: 400 })
  }

  try {
    let apiUrl = ""

    switch (platform) {
      case "Platform A":
        apiUrl = `https://image-gen.rishuapi.workers.dev/?prompt=${encodeURIComponent(prompt)}`
        break
      case "Platform B":
        apiUrl = `https://cryyy.itz-ashlynn.workers.dev/txt2img?prompt=${encodeURIComponent(prompt)}`
        break
      case "Platform C":
        const modelC = model || "flux"
        apiUrl = `https://image-generator.apisimpacientes.workers.dev/generate?prompt=${encodeURIComponent(prompt)}&model=${modelC}`
        break
      case "Platform D":
        const modelD = (model || "flux").toLowerCase()
        apiUrl = `https://text2img.hideme.eu.org/image?prompt=${encodeURIComponent(prompt)}&model=${modelD}&style=${style}`
        break
      case "Platform E":
        apiUrl = `https://image-gen-api-j4tnx.vercel.app/?prompt=${encodeURIComponent(prompt)}`
        break
      case "Platform F":
        apiUrl = `https://magic-studio.ziddi-beatz.workers.dev/?prompt=${encodeURIComponent(prompt)}`
        break
      case "Platform G":
        apiUrl = `https://splexx-api-img.vercel.app/api/imggen?text=${encodeURIComponent(prompt)}&key=SPLEXXO`
        break
      default:
        apiUrl = `https://image-gen.rishuapi.workers.dev/?prompt=${encodeURIComponent(prompt)}`
    }

    console.log(`[v0] ${platform} API URL:`, apiUrl)

    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "application/json,image/avif,image/webp,image/apng,image/*,*/*;q=0.8",
        Referer: new URL(apiUrl).origin,
      },
    })

    if (!response.ok) {
      console.error(`[v0] ${platform} API error:`, response.status)
      throw new Error(`Platform ${platform} returned ${response.status}`)
    }

    const contentType = response.headers.get("content-type") || ""

    if (contentType.includes("image/")) {
      console.log(`[v0] ${platform} returned direct image`)
      return Response.json({ url: apiUrl, prompt })
    }

    const data = await response.json()
    console.log(`[v0] ${platform} JSON response:`, JSON.stringify(data).substring(0, 200))

    let imageUrl: string | null = null

    // Check all possible JSON response formats
    if (typeof data === "string" && data.startsWith("http")) {
      imageUrl = data
    } else if (data.image_url) {
      imageUrl = data.image_url
    } else if (data.url) {
      imageUrl = data.url
    } else if (data.result?.url) {
      imageUrl = data.result.url
    } else if (data.result?.image_url) {
      imageUrl = data.result.image_url
    } else if (data.data?.url) {
      imageUrl = data.data.url
    } else if (data.data?.image_url) {
      imageUrl = data.data.image_url
    } else if (Array.isArray(data) && data.length > 0 && typeof data[0] === "string") {
      imageUrl = data[0]
    } else if (data.data && Array.isArray(data.data) && data.data[0]?.url) {
      imageUrl = data.data[0].url
    } else if (data.images && Array.isArray(data.images) && data.images[0]) {
      imageUrl = data.images[0]
    }

    if (!imageUrl) {
      console.error(`[v0] ${platform} - No image URL found in response`)
      throw new Error("No image URL in response")
    }

    console.log(`[v0] ${platform} extracted URL:`, imageUrl)
    return Response.json({ url: imageUrl, prompt })
  } catch (error) {
    console.error("[v0] Image Generation Error:", error)
    return Response.json({ error: `Failed to generate image with ${platform}. Try another platform.` }, { status: 500 })
  }
}
