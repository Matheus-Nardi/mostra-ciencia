import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: "https://unitinscti.com.br/sitemap.xml",
    host: "https://unitinscti.com.br",
  }
}