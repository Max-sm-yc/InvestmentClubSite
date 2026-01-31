"use server"

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

export async function submitApplication(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const role = formData.get("role") as string
  const school = formData.get("school") as string
  const additionalInfo = formData.get("additionalInfo") as string

  try {
    // Send Discord notification
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `New application received!\nRole: ${role}\nName: ${name}\nEmail: ${email}\nSchool: ${school}`,
      }),
    })

    console.log("Application submitted and Discord notification sent")
    return { success: true }
  } catch (error) {
    console.error("Failed to submit application:", error)
    return { success: false, error: "Failed to submit application. Please try again." }
  }
}

