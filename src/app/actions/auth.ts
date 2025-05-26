"use server"

import { redirect } from "next/navigation"
import { eq } from "drizzle-orm"
import { cookies } from "next/headers"

import bcrypt from "bcryptjs"
import crypto from "crypto"

import { db } from "~/server/db"
import { session, users } from "~/server/db/schema"

export async function login(formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const remember = formData.get("remember") as string

  if (!email || !password) {
    throw new Error("Email and password are required")
  }

  if(!remember) {
    throw new Error("Remember me is required")
  }

  // TODO: Implement actual login logic
  /*
  const user = await db.query.users.findFirst({
    where: eq(users.email, email),
  })

  if (!user) {
    throw new Error("User not found")
  }

  if (user.password !== password) {
    throw new Error("Invalid password")
  }

  const session = crypto.randomUUID()

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  */

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

  const hashedPassword = await bcrypt.hash(password, 10)

  const userid = BigInt(Date.now())

  const user = await db.insert(users).values({
    id: userid,
    email: email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  if (!user) {
    throw new Error("Failed to create user")
  }

  (await cookies()).set("session", crypto.randomUUID(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  })

  const sessionid = crypto.randomUUID()

  await db.insert(session).values({
    userId: userid,
    token: sessionid,
    maxAge: BigInt(60 * 60 * 24 * 30), // 30 days
  })

  redirect("/dashboard")
}

export async function logout() {
  // TODO: Implement actual logout logic
  // In a real app, you would:
  // 1. Clear session/JWT token
  // 2. Clear cookies
  // 3. Invalidate session in database

  (await cookies()).delete("session")

  const sessionid = (await cookies()).get("session")?.value;

  if (!sessionid) {
    throw new Error("No session found")
  }

  await db.delete(session).where(eq(session.token, sessionid));

  // Redirect to home page
  redirect("/")
}
