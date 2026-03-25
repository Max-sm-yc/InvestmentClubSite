"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"
import { getReleases, saveReleases, uploadPdf, deletePdf, type Release } from "@/lib/releases"

export type { Release }

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAction(_prevState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    return { error: "Admin access is not configured. Set ADMIN_PASSWORD env variable." }
  }
  if (password !== adminPassword) {
    return { error: "Incorrect password." }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_session", adminPassword, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 8,
    path: "/",
  })

  redirect("/admin/releases")
}

export async function logoutAction() {
  const cookieStore = await cookies()
  cookieStore.delete("admin_session")
  redirect("/admin/login")
}

export async function checkAuth(): Promise<boolean> {
  const adminPassword = process.env.ADMIN_PASSWORD
  if (!adminPassword) return false
  const cookieStore = await cookies()
  return cookieStore.get("admin_session")?.value === adminPassword
}

// ── Releases CRUD ─────────────────────────────────────────────────────────────

function blobConfigured() {
  return !!process.env.BLOB_READ_WRITE_TOKEN
}

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
}

export async function createReleaseAction(_prevState: unknown, formData: FormData) {
  const isAuth = await checkAuth()
  if (!isAuth) return { error: "Unauthorized" }
  if (!blobConfigured()) return { error: "Storage is not configured. Add BLOB_READ_WRITE_TOKEN to your Vercel environment variables (Storage → Blob → Connect Store)." }

  const title = (formData.get("title") as string).trim()
  const date = (formData.get("date") as string).trim()
  const summary = (formData.get("summary") as string).trim()
  const content = (formData.get("content") as string).trim()
  const pdfFile = formData.get("pdf") as File | null

  if (!title || !date || !summary || !content) {
    return { error: "Title, date, summary, and content are required." }
  }

  const releases = await getReleases()

  // Generate a unique slug
  let slug = slugify(title)
  let counter = 1
  const existingSlugs = new Set(releases.map((r) => r.slug))
  while (existingSlugs.has(slug)) {
    slug = `${slugify(title)}-${counter++}`
  }

  // Upload PDF to Vercel Blob if provided
  let pdfUrl: string | undefined
  if (pdfFile && pdfFile.size > 0) {
    pdfUrl = await uploadPdf(slug, pdfFile)
  }

  const newRelease: Release = { slug, title, date, summary, content, ...(pdfUrl ? { pdfUrl } : {}) }
  releases.unshift(newRelease)
  await saveReleases(releases)

  revalidatePath("/news")
  revalidatePath("/")
  redirect("/admin/releases")
}

export async function deleteReleaseFormAction(formData: FormData) {
  const slug = formData.get("slug") as string
  return deleteReleaseAction(slug)
}

export async function deleteReleaseAction(slug: string) {
  const isAuth = await checkAuth()
  if (!isAuth) return { error: "Unauthorized" }
  if (!blobConfigured()) return { error: "Storage is not configured. Add BLOB_READ_WRITE_TOKEN to your Vercel environment variables." }

  const releases = await getReleases()
  const target = releases.find((r) => r.slug === slug)

  if (target?.pdfUrl) {
    const usedElsewhere = releases.some((r) => r.slug !== slug && r.pdfUrl === target.pdfUrl)
    if (!usedElsewhere) {
      await deletePdf(target.pdfUrl)
    }
  }

  await saveReleases(releases.filter((r) => r.slug !== slug))

  revalidatePath("/news")
  revalidatePath("/")
  redirect("/admin/releases")
}
