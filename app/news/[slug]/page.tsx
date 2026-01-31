import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

// In a real app, you'd fetch this from a database or a file.
// For now, this is a placeholder to show how the layout looks.
export default function PostLayout({ params }: { params: { slug: string } }) {
  return (
    <article className="max-w-3xl mx-auto py-12 px-4">
      <Button variant="ghost" asChild className="mb-8 -ml-4 text-gray-400 hover:text-white">
        <Link href="/news">
          <ChevronLeft className="mr-2 h-4 w-4" />
          Back to News
        </Link>
      </Button>

      <header className="space-y-4 mb-10">
        <div className="text-blue-400 font-medium text-sm tracking-wide uppercase">
          Press Release • January 31, 2026
        </div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          Example News Title: {params.slug.replace(/-/g, ' ')}
        </h1>
        <p className="text-xl text-gray-400 italic">
          A brief sub-headline or summary of the news event goes here to catch the reader's eye.
        </p>
      </header>

      <div className="prose prose-invert max-w-none text-gray-300 space-y-6 text-lg leading-relaxed">
        <p>
          CINCINNATI, OH — This is where your main news content begins. Since this is a dynamic 
          route, the URL you are currently visiting is <strong>/news/{params.slug}</strong>.
        </p>
        
        <h2 className="text-2xl font-semibold text-white mt-8">Key Developments</h2>
        <p>
          You can include quotes from club leadership, data regarding portfolio performance, 
          or details about upcoming student organization grants via the SCO Fund.
        </p>

        <blockquote className="border-l-4 border-blue-500 pl-6 my-8 italic text-gray-100">
          "Our goal has always been to bridge the gap between classroom theory and real-world 
          financial application." — Club Leadership
        </blockquote>

        <p>
          As we move forward into 2026, the CCDS Investment Club remains committed to 
          its mission of "making money and doing good."
        </p>
      </div>

      <footer className="mt-16 pt-8 border-t border-gray-800 text-sm text-gray-500">
        For media inquiries, please contact the CCDS Investment Club communications team.
      </footer>
    </article>
  )
}
