import "./globals.css"
import { Inter } from "next/font/google"
import Navigation from "./components/navigation"
import { Toaster } from "@/components/ui/toaster"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "CCDS Investment Club",
  description: "Educating Future Investors",
  icons: {
    icon: [
      {
        url: "/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    shortcut: [
      {
        url: "/logo.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-900 text-gray-100 min-h-screen flex flex-col`}>
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        <footer className="bg-gray-800 py-6 text-center text-sm">
          <div className="container mx-auto px-4">
            <p className="mb-2">&copy; 2023 CCDS Investment Club</p>
            <p className="mb-2">
              Contact:{" "}
              <a href="mailto:sunm@countryday.net" className="hover:underline">
                sunm@countryday.net
              </a>
            </p>
            <p>6905 Given Road, Indian Hill, Ohio 45243</p>
          </div>
        </footer>
        <Toaster />
      </body>
    </html>
  )
}



import './globals.css'
