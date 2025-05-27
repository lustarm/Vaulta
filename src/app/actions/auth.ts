"use server"

import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import bcrypt from "bcryptjs"
import crypto from "crypto"

import { eq } from "drizzle-orm"

import { db } from "~/server/db"
import { sessions, users } from "~/server/db/schema"

export async function login(_: { error: string | null }, formData: FormData) {
  // check if use is already logged in
  const isAuthenticated = await checkAuthenticated()

  if (isAuthenticated) {
    redirect("/dashboard")
  }

  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const remember = formData.get("remember") as string

  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const userArray = await db.select().from(users).where(eq(users.email, email))

  if (userArray.length === 0) {
    return { error: "User not found" }
  }

  if (userArray.length > 1) {
    return { error: "Multiple users found" }
  }

  const user = userArray[0]!

  const isPasswordValid = await bcrypt.compare(password, user.password)

  if (!isPasswordValid) {
    return { error: "Invalid password" }
  }

  const session = crypto.randomUUID() as string

  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: remember === "on" ? 60 * 60 * 24 * 30 : 60 * 60 * 24, // 30 days or 1 day
  })

  await db.insert(sessions).values({
    userId: user.id,
    token: session,
    maxAge: remember === "on" ? BigInt(60 * 60 * 24 * 30) : BigInt(60 * 60 * 24), // 30 days or 1 day
  })

  redirect("/dashboard")
}

export async function signup(_: { error: string | null }, formData: FormData) {
  const email = formData.get("email") as string
  const password = formData.get("password") as string
  const confirmPassword = formData.get("confirmPassword") as string
  const terms = formData.get("terms") as string

  // Basic validation
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  if (!terms) {
    return { error: "You must agree to the terms and conditions" }
  }

  const existingUser = await db.select().from(users).where(eq(users.email, email))

  if (existingUser.length > 0) {
    return { error: "User already exists" }
  }

  const userid = BigInt(Date.now())
  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await db.insert(users).values({
    id: userid,
    email: email,
    password: hashedPassword,
    createdAt: new Date(),
    updatedAt: new Date(),
  })

  if (!user) {
    return { error: "Failed to create user" }
  }

  const sessionid = crypto.randomUUID() as string

  (await cookies()).set("session", sessionid, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30, // 30 days
  })

  await db.insert(sessions).values({
    userId: userid,
    token: sessionid,
    maxAge: BigInt(60 * 60 * 24 * 30), // 30 days
  })

  redirect("/dashboard")
}

export async function logout(currentState: { error: string | null }, formData: FormData) {
  (await cookies()).delete("session")

  const sessionid = (await cookies()).get("session")?.value;

  if (!sessionid) {
    return { error: "No session found" }
  }

  await db.delete(sessions).where(eq(sessions.token, sessionid))

  redirect("/")
}

export async function checkAuthenticated() {
  const sessionid = (await cookies()).get("session")?.value;

  if (!sessionid) {
    return false
  }

  const session = await db.select().from(sessions).where(eq(sessions.token, sessionid))

  if (session.length === 0) {
    return false
  }

  return true
}