import type React from "react"
import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Josh Lev - Portfolio",
  description: "Full Stack Developer & Creative Technologist Portfolio",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=aktiv-grotesk@400,500,600,700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-aktiv">{children}</body>
    </html>
  )
}
