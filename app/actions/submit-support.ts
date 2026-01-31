"use server"

const DISCORD_WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL

export async function submitSupport(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const additionalInfo = formData.get("additionalInfo") as string

  try {
    // Send Discord notification
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        content: `New support inquiry received!\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAdditional Info: ${additionalInfo}`,
      }),
    })

    console.log("Support form submitted and Discord notification sent")
    return { success: true }
  } catch (error) {
    console.error("Failed to submit support form:", error)
    return { success: false, error: "Failed to submit form. Please try again." }
  }
}

