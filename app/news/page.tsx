import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import newsData from "@/lib/news-data.json" // Import the same data

export default function NewsPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">News & Press Releases</h1>
      <p className="text-xl text-gray-300">
        Stay up to date with the latest developments from the CCDS Investment Club.
      </p>

      <div className="grid gap-6">
        {newsData.map((release) => (
          <Card key={release.slug} className="bg-gray-800 border-none hover:bg-gray-750 transition-colors">
            <CardHeader>
              <div className="text-sm text-blue-400 font-medium mb-1">{release.date}</div>
              <CardTitle className="text-2xl">{release.title}</CardTitle>
              <CardDescription className="text-gray-300 text-base">
                {release.summary}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {/* This link is now automatically correct because it uses the slug */}
              <Link href={`/news/${release.slug}`} className="text-sm font-semibold text-white hover:underline">
                Read full release →
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
