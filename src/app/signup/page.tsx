import { redirect } from "next/navigation"

import { checkAuthenticated } from "~/app/actions/auth"
import SignupForm from "~/app/signup/signup-form"

export default async function SignupPage() {
  const isAuthenticated = await checkAuthenticated()

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignupForm />
    </div>
  )
}
