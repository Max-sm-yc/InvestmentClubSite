import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function Home() {
  const divisions = [
    {
      name: "QIS",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-jHl4z3Klolj3f7ZJNpjXVMV3TVUers.png",
    },
    {
      name: "Fundamental Team",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-o5DdPBVvaLLJReWfgnPSVcn36y7QuN.png",
    },
    {
      name: "SCO Fund",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ZZ49erlpbd52E0PtdYMkqAEfvyJKWV.png",
    },
    {
      name: "Birdfeeder",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-piOlLtwIL4IsacLZTgKuCGuRZ5Fry2.png",
    },
    {
      name: "Early Bird",
      image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-z2TQTshQoStmnWGW6ry8uE3ixEj4Al.png",
    },
  ]

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12">
      <div className="flex flex-col items-center justify-center space-y-12 max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-6 text-center">Welcome to the CCDS Investment Club</h1>
        <p className="text-xl mb-8 text-center">
          We are dedicated to educating the next generation of investors by giving students real world experience in the
          world of investing.
        </p>

        <section className="w-full py-8">
          <h2 className="text-2xl font-semibold text-center mb-2">Our Sponsors</h2>
          <p className="text-gray-400 text-center mb-6">Made possible by the generosity of our sponsors.</p>
          <div className="flex justify-center items-center gap-8">
            <div className="bg-gray-800 p-6 rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-byjY3e05j2G7zA7uORfrKoQKRufF5C.png"
                alt="The Vredeveld Family"
                width={240}
                height={48}
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/JaneStreet-r8U11JJsLjq5VPwXeWr5jAlLgysLTh.png"
                alt="Jane Street Logo"
                width={240}
                height={48}
                className="opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </section>

        <div className="flex space-x-4">
          <Button asChild>
            <Link href="/about">Learn More</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/jobs">View Opportunities</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link href="/support">Support Us</Link>
          </Button>
        </div>

        <section className="w-full py-8">
          <div className="grid grid-cols-3 gap-4 mb-4">
            {divisions.slice(0, 3).map((division) => (
              <div
                key={division.name}
                className="w-full aspect-[5/1] relative bg-gray-800 rounded-lg flex items-center justify-center"
              >
                <Image
                  src={division.image || "/placeholder.svg"}
                  alt={`${division.name} logo`}
                  fill
                  className="object-contain p-2 transition-opacity duration-200 hover:opacity-80"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
          <div className="grid grid-cols-2 gap-4">
            {divisions.slice(3).map((division) => (
              <div
                key={division.name}
                className={`w-full aspect-[5/1] relative rounded-lg flex items-center justify-center ${
                  division.name === "Birdfeeder" || division.name === "Early Bird" ? "bg-[#1a1f2d]" : "bg-gray-800"
                }`}
              >
                <Image
                  src={division.image || "/placeholder.svg"}
                  alt={`${division.name} logo`}
                  fill
                  className="object-contain p-2 transition-opacity duration-200 hover:opacity-80"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

