"use server"

import { eq } from "drizzle-orm";

import { cookies } from "next/headers";

import { db } from "~/server/db";
import { users, accounts } from "~/server/db/schema";

export async function getUser() {
    const sessionid = (await cookies()).get("session")?.value;

    if (!sessionid) {
        return null
    }

    return await db.select().from(users).where(eq(users.email, sessionid))
}

export async function getAccounts() {
    const users = await getUser()

    if (!users || users.length === 0) {
        return null
    }

    return await db.select().from(accounts).where(eq(accounts.userId, users[0]!.id))
}