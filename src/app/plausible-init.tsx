"use client"

import { useEffect } from "react"

export default function PlausibleInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return
    ;(async () => {
      const { init } = await import("@plausible-analytics/tracker")
      init({
        domain: "mostrascti.com.br",
        bindToWindow: true,
        outboundLinks: true,
        fileDownloads: true,
        formSubmissions: true,
      })
    })()
  }, [])
  return null
}