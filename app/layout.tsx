import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { MainHeader } from "@/components/main-header"
import { StatusBar } from "@/components/status-bar"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "SKZ Cafe Pro - Cyber Cafe Management",
  description: "Modern cyber cafe management system",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <div className="flex flex-col h-screen bg-slate-50 dark:bg-slate-900">
            <MainHeader />
            <main className="flex-1 overflow-auto">{children}</main>
            <StatusBar />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'