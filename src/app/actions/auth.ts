"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { db } from "~/server/db"
import { users } from "~/server/db/schema"
import { cookies } from "next/headers"
import bcrypt from "bcryptjs"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const remember = formData.get("remember") as string

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  console.log("Login attempt:", { email, password, remember })

  if (!user) {
    throw new Error("User not found")
  }

  if (user.password !== password) {
    throw new Error("Invalid password")
  }

  const session = crypto.randomUUID()  // TODO: Store session in database

  ;(await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  // Redirect to dashboard after successful login
  redirect("/dashboard")
}

export async function signup(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const terms = formData.get("terms") as string

  // TODO: Implement actual signup logic
  console.log("Signup attempt:", { email, password, confirmPassword, terms })

  // Basic validation
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match")
  }

  if (!terms) {
    throw new Error("You must agree to the terms and conditions")
  }

  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (user) {
    throw new Error("User already exists")
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  await db.insert(users).values({
    id: crypto.randomUUID(),
    name: email,
    createdAt: new Date(),
    updatedAt: new Date(),
    email,
    password: hashedPassword,
    firstName: "",
    lastName: "",
    balance: 0,
  })

  redirect("/")
}

export async function logout() {
  // TODO: Implement actual logout logic
  // In a real app, you would:
  // 1. Clear session/JWT token
  // 2. Clear cookies
  // 3. Invalidate session in database

  console.log("User logged out")

  // Redirect to home page
  redirect("/")
}
