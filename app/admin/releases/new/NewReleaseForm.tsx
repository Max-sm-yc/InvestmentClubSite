"use client"

import { useFormState, useFormStatus } from "react-dom"
import { Upload, FileText, X } from "lucide-react"
import { useState, useRef } from "react"

type ActionResult = { error?: string } | undefined

const initialState: ActionResult = undefined

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold transition-colors"
    >
      {pending ? "Publishing…" : "Publish Release"}
    </button>
  )
}

export default function NewReleaseForm({ action }: { action: (prev: unknown, data: FormData) => Promise<any> }) {
  const [state, formAction] = useFormState(action, initialState)
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [dragging, setDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setDragging(false)
    const file = e.dataTransfer.files[0]
    if (file?.type === "application/pdf") {
      setPdfFile(file)
      // Sync to hidden file input
      const dt = new DataTransfer()
      dt.items.add(file)
      if (inputRef.current) inputRef.current.files = dt.files
    }
  }

  return (
    <form action={formAction} className="space-y-6">
      {/* Title */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-300">
          Title <span className="text-red-400">*</span>
        </label>
        <input
          name="title"
          type="text"
          required
          placeholder="e.g. Annual Report for 2026 Released"
          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Date */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-300">
          Date <span className="text-red-400">*</span>
        </label>
        <input
          name="date"
          type="text"
          required
          placeholder="e.g. March 17, 2026"
          defaultValue={new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Summary */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-300">
          Summary <span className="text-red-400">*</span>
        </label>
        <textarea
          name="summary"
          required
          rows={3}
          placeholder="A one-to-two sentence executive summary shown on the news listing page."
          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>

      {/* Content */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-300">
          Full Description <span className="text-red-400">*</span>
        </label>
        <textarea
          name="content"
          required
          rows={6}
          placeholder="The full body text of the release shown on the detail page."
          className="w-full px-4 py-2.5 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
        />
      </div>

      {/* PDF Upload */}
      <div className="space-y-1.5">
        <label className="block text-sm font-medium text-gray-300">
          PDF Attachment <span className="text-gray-500">(optional)</span>
        </label>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => !pdfFile && inputRef.current?.click()}
          className={`relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed transition-colors cursor-pointer
            ${dragging ? "border-blue-500 bg-blue-900/10" : "border-gray-700 hover:border-gray-600 bg-gray-800/50"}
            ${pdfFile ? "cursor-default" : ""}
          `}
        >
          {pdfFile ? (
            <div className="flex items-center gap-3 w-full">
              <FileText className="h-8 w-8 text-blue-400 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">{pdfFile.name}</p>
                <p className="text-xs text-gray-400">{(pdfFile.size / 1024).toFixed(0)} KB</p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation()
                  setPdfFile(null)
                  if (inputRef.current) inputRef.current.value = ""
                }}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-900/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <>
              <Upload className="h-8 w-8 text-gray-500" />
              <div className="text-center">
                <p className="text-sm text-gray-300">
                  <span className="text-blue-400 font-medium">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PDF only</p>
              </div>
            </>
          )}

          <input
            ref={inputRef}
            name="pdf"
            type="file"
            accept="application/pdf"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) setPdfFile(file)
            }}
          />
        </div>
      </div>

      {/* Error */}
      {state?.error && (
        <p className="text-sm text-red-400 bg-red-900/20 border border-red-800 rounded-lg px-4 py-3">
          {state.error}
        </p>
      )}

      <SubmitButton />
    </form>
  )
}
