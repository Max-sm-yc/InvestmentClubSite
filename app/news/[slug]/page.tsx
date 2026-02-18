import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, FileDown, Clock } from "lucide-react"
import { notFound } from "next/navigation"
import newsData from "@/lib/news-data.json" 

export default function PostLayout({ params }: { params: { slug: string } }) {
  // Look up the specific article by its slug
  const post = newsData.find((p) => p.slug === params.slug)

  // If the slug doesn't exist in our JSON, show the 404 page
  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      {/* Navigation Back */}
      <Button variant="ghost" asChild className="mb-8 -ml-4 text-gray-400 hover:text-white transition-colors">
        <Link href="/news">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to all news
        </Link>
      </Button>

      <header className="space-y-6 mb-12">
        <div className="flex items-center gap-4 text-blue-400 font-medium text-sm tracking-wide uppercase">
          <span>{post.category || "News Release"}</span>
          <span className="text-gray-600">•</span>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {post.date}
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          {post.title}
        </h1>

        <div className="bg-gray-800/50 border border-gray-700 p-6 rounded-xl">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">Executive Summary</h2>
          <p className="text-xl text-gray-200 leading-relaxed">
            {post.summary}
          </p>
        </div>
      </header>

      <div className="prose prose-invert max-w-none text-gray-300 space-y-8">
        {/* Conditional Rendering: Only shows if post.pdfUrl exists in the JSON */}
        {post.pdfUrl && (
          <section className="bg-blue-900/10 border-l-4 border-blue-500 p-8 rounded-r-lg flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
              <h3 className="text-white text-lg font-semibold m-0">Official Document Available</h3>
              <p className="text-gray-400 m-0">Download the full verified press release in PDF format.</p>
            </div>
            <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 shrink-0">
              <a href={post.pdfUrl} download={`${post.slug}.pdf`}>
                <FileDown className="mr-2 h-5 w-5" />
                Download PDF
              </a>
            </Button>
          </section>
        )}

        <div className="pt-4">
          <h3 className="text-2xl font-semibold text-white mb-4">Description</h3>
          <p className="text-lg leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500 flex flex-col gap-2">
        <p>Release ID: {post.slug.toUpperCase()}</p>
        <p>For media inquiries or further information regarding the CCDS Investment Club, please contact our communications department.</p>
      </footer>
    </article>
  )
}
