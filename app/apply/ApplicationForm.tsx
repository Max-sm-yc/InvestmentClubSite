"use client"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { submitApplication } from "../actions/submit-application"
import { useToast } from "@/components/ui/use-toast"
import { ToastAction } from "@/components/ui/toast"

export default function ApplicationForm() {
  const searchParams = useSearchParams()
  const role = searchParams.get("role") || ""
  const { toast } = useToast()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const result = await submitApplication(formData)

    setIsSubmitting(false)

    if (result.success) {
      toast({
        title: "Application Submitted",
        description: "Your application has been successfully sent. We'll be in touch soon!",
      })
      e.currentTarget.reset()
    } else {
      toast({
        title: "Submission Failed",
        description: result.error || "An unexpected error occurred. Please try again.",
        variant: "destructive",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      })
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Apply for {role}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" required />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>
        <div>
          <Label htmlFor="role">Role</Label>
          <Input id="role" name="role" defaultValue={role} required />
        </div>
        <div>
          <Label htmlFor="school">School</Label>
          <Input id="school" name="school" required />
        </div>
        <div>
          <Label htmlFor="additionalInfo">Additional Information</Label>
          <Textarea id="additionalInfo" name="additionalInfo" rows={4} />
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </Button>
      </form>
    </div>
  )
}

