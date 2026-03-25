import { checkAuth, createReleaseAction } from "../../actions"
import { redirect } from "next/navigation"
import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import NewReleaseForm from "./NewReleaseForm"

export default async function NewReleasePage() {
  const isAuth = await checkAuth()
  if (!isAuth) redirect("/admin/login")

  return (
    <div className="max-w-2xl mx-auto py-12 px-6 space-y-8">
      <div>
        <Link
          href="/admin/releases"
          className="inline-flex items-center gap-1 text-sm text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to releases
        </Link>
        <h1 className="text-3xl font-bold">New Release</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Fill in the details below. The slug is auto-generated from the title.
        </p>
      </div>

      <NewReleaseForm action={createReleaseAction} />
    </div>
  )
}
