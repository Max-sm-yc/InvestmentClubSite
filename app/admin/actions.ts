"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import fs from "fs"
import path from "path"

const DATA_PATH = path.join(process.cwd(), "lib", "news-data.json")
const PDF_DIR = path.join(process.cwd(), "public", "pdfs")

function readReleases(): Release[] {
  const raw = fs.readFileSync(DATA_PATH, "utf-8")
  return JSON.parse(raw)
}

function writeReleases(releases: Release[]) {
  fs.writeFileSync(DATA_PATH, JSON.stringify(releases, null, 2) + "\n", "utf-8")
}

export interface Release {
  slug: string
  title: string
  date: string
  summary: string
  content: string
  pdfUrl?: string
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export async function loginAction(_prevState: unknown, formData: FormData) {
  const password = formData.get("password") as string
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    // If no password set, reject all logins for safety
    return { error: "Admin access is not configured. Set ADMIN_PASSWORD env variable." }
  }

  if (password !== adminPassword) {
    return { error: "Incorrect password." }
  }

  const cookieStore = await cookies()
  cookieStore.set("admin_session", adminPassword, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 8, // 8 hours
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

  const title = (formData.get("title") as string).trim()
  const date = (formData.get("date") as string).trim()
  const summary = (formData.get("summary") as string).trim()
  const content = (formData.get("content") as string).trim()
  const pdfFile = formData.get("pdf") as File | null

  if (!title || !date || !summary || !content) {
    return { error: "Title, date, summary, and content are required." }
  }

  // Generate a unique slug
  const releases = readReleases()
  let slug = slugify(title)
  let counter = 1
  const existingSlugs = new Set(releases.map((r) => r.slug))
  while (existingSlugs.has(slug)) {
    slug = `${slugify(title)}-${counter++}`
  }

  // Save PDF if provided
  let pdfUrl: string | undefined
  if (pdfFile && pdfFile.size > 0) {
    if (!fs.existsSync(PDF_DIR)) {
      fs.mkdirSync(PDF_DIR, { recursive: true })
    }
    const filename = `${slug}.pdf`
    const buffer = Buffer.from(await pdfFile.arrayBuffer())
    fs.writeFileSync(path.join(PDF_DIR, filename), buffer)
    pdfUrl = `/pdfs/${filename}`
  }

  const newRelease: Release = { slug, title, date, summary, content, ...(pdfUrl ? { pdfUrl } : {}) }
  releases.unshift(newRelease) // newest first
  writeReleases(releases)

  redirect("/admin/releases")
}

export async function deleteReleaseFormAction(formData: FormData) {
  const slug = formData.get("slug") as string
  return deleteReleaseAction(slug)
}

export async function deleteReleaseAction(slug: string) {
  const isAuth = await checkAuth()
  if (!isAuth) return { error: "Unauthorized" }

  const releases = readReleases()
  const target = releases.find((r) => r.slug === slug)

  // Delete associated PDF file if it lives in /public/pdfs/ and is only used by this release
  if (target?.pdfUrl) {
    const usedElsewhere = releases.some((r) => r.slug !== slug && r.pdfUrl === target.pdfUrl)
    if (!usedElsewhere) {
      const pdfPath = path.join(process.cwd(), "public", target.pdfUrl)
      if (fs.existsSync(pdfPath)) {
        fs.unlinkSync(pdfPath)
      }
    }
  }

  writeReleases(releases.filter((r) => r.slug !== slug))
  redirect("/admin/releases")
}
