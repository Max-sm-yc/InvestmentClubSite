import { checkAuth, logoutAction } from "../actions"
import { redirect } from "next/navigation"
import Link from "next/link"
import { getReleases } from "@/lib/releases"
import { FileDown, Plus, LogOut, ExternalLink } from "lucide-react"
import DeleteForm from "./DeleteForm"

export default async function AdminReleasesPage() {
  const isAuth = await checkAuth()
  if (!isAuth) redirect("/admin/login")

  const releases = await getReleases()
  const blobReady = !!process.env.BLOB_READ_WRITE_TOKEN

  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Manage Releases</h1>
          <p className="text-gray-400 mt-1 text-sm">
            {releases.length} release{releases.length !== 1 ? "s" : ""} published
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/news"
            className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 text-sm transition-colors"
          >
            <ExternalLink className="h-4 w-4" />
            View site
          </Link>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-700 text-gray-300 hover:text-white hover:border-gray-500 text-sm transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Sign out
            </button>
          </form>
          <Link
            href="/admin/releases/new"
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors"
          >
            <Plus className="h-4 w-4" />
            New Release
          </Link>
        </div>
      </div>

      {/* Storage warning */}
      {!blobReady && (
        <div className="bg-yellow-900/20 border border-yellow-700 rounded-xl px-5 py-4 text-sm text-yellow-300 space-y-1">
          <p className="font-semibold">Storage not configured — releases cannot be saved.</p>
          <p className="text-yellow-400/80">
            Go to your Vercel project → <strong>Storage</strong> → create a <strong>Blob</strong> store and connect it to this project. Vercel will automatically add <code className="bg-yellow-900/40 px-1 rounded">BLOB_READ_WRITE_TOKEN</code> to your environment variables.
          </p>
        </div>
      )}

      {/* Releases list */}
      {releases.length === 0 ? (
        <div className="text-center py-20 text-gray-500 border border-dashed border-gray-700 rounded-xl">
          No releases yet.{" "}
          <Link href="/admin/releases/new" className="text-blue-400 hover:underline">
            Add the first one →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {releases.map((release) => (
            <div
              key={release.slug}
              className="flex items-start gap-4 p-5 bg-gray-900 border border-gray-800 rounded-xl hover:border-gray-700 transition-colors"
            >
              <div className="flex-1 min-w-0 space-y-1">
                <div className="text-xs text-blue-400 font-medium">{release.date}</div>
                <h2 className="text-base font-semibold text-white truncate">{release.title}</h2>
                <p className="text-sm text-gray-400 line-clamp-2">{release.summary}</p>
                <div className="flex items-center gap-3 pt-1">
                  <Link
                    href={`/news/${release.slug}`}
                    className="text-xs text-gray-500 hover:text-blue-400 transition-colors"
                  >
                    /news/{release.slug}
                  </Link>
                  {release.pdfUrl && (
                    <span className="flex items-center gap-1 text-xs text-green-400">
                      <FileDown className="h-3 w-3" />
                      PDF attached
                    </span>
                  )}
                </div>
              </div>

              <DeleteForm slug={release.slug} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
