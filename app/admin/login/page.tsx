import { checkAuth } from "../actions"
import { redirect } from "next/navigation"
import LoginForm from "./LoginForm"

export default async function AdminLoginPage() {
  const isAuth = await checkAuth()
  if (isAuth) redirect("/admin/releases")

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="w-full max-w-sm space-y-6 p-8 bg-gray-900 rounded-2xl border border-gray-800 shadow-xl">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold text-white">Admin Access</h1>
          <p className="text-sm text-gray-400">Enter your password to manage releases</p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
