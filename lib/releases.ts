import { list, put, del } from "@vercel/blob"
import staticNewsData from "./news-data.json"

export interface Release {
  slug: string
  title: string
  date: string
  summary: string
  content: string
  pdfUrl?: string
}

const RELEASES_KEY = "data/releases.json"

/** Read releases — from Blob in production, static JSON as fallback. */
export async function getReleases(): Promise<Release[]> {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return staticNewsData as Release[]
  }
  try {
    const { blobs } = await list({ prefix: RELEASES_KEY })
    if (blobs.length > 0) {
      const res = await fetch(blobs[0].url, { cache: "no-store" })
      if (res.ok) return res.json()
    }
  } catch {}
  // Blob not yet seeded — return static file
  return staticNewsData as Release[]
}

/** Persist releases array to Blob. */
export async function saveReleases(releases: Release[]): Promise<void> {
  await put(RELEASES_KEY, JSON.stringify(releases, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  })
}

/** Upload a PDF and return its public Blob URL. */
export async function uploadPdf(slug: string, file: File): Promise<string> {
  const blob = await put(`pdfs/${slug}.pdf`, file, {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/pdf",
  })
  return blob.url
}

/** Delete a PDF by its URL (no-op for legacy local paths). */
export async function deletePdf(url: string): Promise<void> {
  if (!url.startsWith("https://")) return // local /pdfs/ file — skip
  try {
    await del(url)
  } catch {}
}
