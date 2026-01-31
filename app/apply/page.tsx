import { Suspense } from "react"
import ApplicationForm from "./ApplicationForm"

export default function ApplyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ApplicationForm />
    </Suspense>
  )
}

