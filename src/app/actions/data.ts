"use server"

import { eq } from "drizzle-orm";

import { cookies } from "next/headers";

import { db } from "~/server/db";
import { users, accounts, sessions } from "~/server/db/schema";

export async function getUser() {
    const sessionid = (await cookies()).get("session")?.value;

    if (!sessionid) {
        return null
    }

    const session = await db.select().from(sessions).where(eq(sessions.token, sessionid));

    if (session.length === 0) {
        return null
    }

    const user = await db.select().from(users).where(eq(users.id, session[0]!.userId))

    if (user.length === 0) {
        return null
    }

    return user[0]!
}

export async function getAccounts() {
    const user = await getUser()

    if (!user) {
        return null
    }

    const accountsArray = await db.select().from(accounts).where(eq(accounts.userId, user.id))

    if (accountsArray.length === 0) {
        return null
    }

    return accountsArray
}