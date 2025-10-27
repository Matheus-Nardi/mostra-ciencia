import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://mostrascti.com.br/sitemap.xml",
    host: "https://mostrascti.com.br",
  }
}