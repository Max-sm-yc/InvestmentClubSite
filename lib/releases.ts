import { put, del } from "@vercel/blob"
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

/**
 * Derive the public blob URL for a pathname without calling any SDK function.
 * Token format: vercel_blob_rw_{storeId}_{secret}
 * Blob URL format: https://{storeId}.public.blob.vercel-storage.com/{pathname}
 */
function blobUrl(pathname: string): string | null {
  const token = process.env.BLOB_READ_WRITE_TOKEN
  if (!token) return null
  const storeId = token.split("_")[3]
  if (!storeId) return null
  return `https://${storeId}.public.blob.vercel-storage.com/${pathname}`
}

/** Read releases — fetches public blob URL directly (no SDK token needed), falls back to static JSON. */
export async function getReleases(): Promise<Release[]> {
  try {
    const url = blobUrl(RELEASES_KEY)
    if (url) {
      const res = await fetch(url, { cache: "no-store" })
      if (res.ok) return await res.json()
    }
  } catch {
    // fall through to static file
  }
  return staticNewsData as Release[]
}

/** Persist releases array to Blob (requires token — admin only). */
export async function saveReleases(releases: Release[]): Promise<void> {
  await put(RELEASES_KEY, JSON.stringify(releases, null, 2), {
    access: "public",
    addRandomSuffix: false,
    contentType: "application/json",
  })
}

/** Upload a PDF and return its public Blob URL (requires token — admin only). */
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
  if (!url.startsWith("https://")) return
  try {
    await del(url)
  } catch {}
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
