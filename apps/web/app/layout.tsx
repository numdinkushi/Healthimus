import { Geist, Geist_Mono } from "next/font/google"
import type { Metadata } from "next"

import "./globals.css"
import { AppProviders } from "@/components/providers/app-providers"
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Healthimus · Caregiver copilot",
  description:
    "Coordinate care, log symptoms, and prepare doctor visits — with AI support.",
};

const geist = Geist({subsets:['latin'],variable:'--font-sans'})

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", geist.variable)}
    >
      <body>
        <AppProviders convexUrl={convexUrl}>{children}</AppProviders>
      </body>
    </html>
  )
}
