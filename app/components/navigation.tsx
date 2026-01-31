"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"

const navItems = [
  { name: "Home", href: "/" },
  { name: "Roles", href: "/jobs" },
  { name: "About", href: "/about" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <Image
              src="/logo.png"
              alt="CCDS Investment Club Logo"
              width={36}
              height={32}
              className="w-9 h-8"
            />
            <Link href="/" className="text-white font-bold text-xl">
              CCDS Investment Club
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-gray-900 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

