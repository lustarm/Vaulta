import LoginForm from "./login-form"
import { redirect } from "next/navigation"
import { checkAuthenticated } from "../actions/auth"

export default async function LoginPage() {
  const isAuthenticated = await checkAuthenticated()

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  return (
    <LoginForm />
  )
}
