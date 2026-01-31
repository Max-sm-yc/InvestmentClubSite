import { Suspense } from "react"
import SupportForm from "./SupportForm"

export default function SupportPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SupportForm />
    </Suspense>
  )
}

