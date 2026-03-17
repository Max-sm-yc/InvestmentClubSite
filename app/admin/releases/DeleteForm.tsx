"use client"

import { deleteReleaseFormAction } from "../actions"
import { Trash2 } from "lucide-react"
import { useState } from "react"

export default function DeleteForm({ slug }: { slug: string }) {
  const [confirming, setConfirming] = useState(false)

  if (!confirming) {
    return (
      <button
        type="button"
        onClick={() => setConfirming(true)}
        className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-900/20 transition-colors"
        title="Delete release"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    )
  }

  return (
    <form action={deleteReleaseFormAction} className="flex items-center gap-2">
      <input type="hidden" name="slug" value={slug} />
      <button
        type="button"
        onClick={() => setConfirming(false)}
        className="px-2 py-1 text-xs text-gray-400 hover:text-white transition-colors"
      >
        Cancel
      </button>
      <button
        type="submit"
        className="px-3 py-1 text-xs rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition-colors"
      >
        Delete
      </button>
    </form>
  )
}
