import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const newsReleases = [
  {
    title: "CCDS Investment Club Expands QIS Division",
    date: "January 24, 2026",
    summary: "Our Quantitative Investment Strategies group has launched three new algorithmic trading models.",
    link: "/news/qis-expansion" // You can create sub-pages later
  },
  {
    title: "Annual Philanthropy Report Released",
    date: "December 15, 2025",
    summary: "The SCO Fund successfully distributed grants to four student-led organizations this semester.",
    link: "/news/philanthropy-2025"
  },
]

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">News & Press Releases</h1>
      <p className="text-xl text-gray-300">
        Stay up to date with the latest developments, milestones, and community impact from the CCDS Investment Club.
      </p>

      <div className="grid gap-6">
        {newsReleases.map((release, index) => (
          <Card key={index} className="bg-gray-800 border-none hover:bg-gray-750 transition-colors">
            <CardHeader>
              <div className="text-sm text-blue-400 font-medium mb-1">{release.date}</div>
              <CardTitle className="text-2xl">{release.title}</CardTitle>
              <CardDescription className="text-gray-300 text-base">
                {release.summary}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link href={release.link} className="text-sm font-semibold text-white hover:underline">
                Read full release →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
