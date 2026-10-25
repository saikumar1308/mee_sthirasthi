import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { sign } from "hono/jwt"
import { z } from "zod"

export const userRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
}>()

// Helper to initialize Prisma with Accelerate
function getPrisma(databaseUrl: string) {
    return new PrismaClient({
        datasourceUrl: databaseUrl,
    }).$extends(withAccelerate())
}

// Zod schemas for input validation
const signupSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters").max(50),
    password: z.string().min(6, "Password must be at least 6 characters"),
    number: z.number().int().positive("A valid mobile number is required"),
    email: z.string().email("A valid email address is required"),
})

const signinSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(1, "Password is required"),
})

// ─── Sign Up ────────────────────────────────────────────────────────
userRoute.post("/signup", async (c) => {
    let rawBody: unknown
    try {
        rawBody = await c.req.json()
    } catch {
        return c.json({ error: "Invalid JSON payload" }, 400)
    }

    const validation = signupSchema.safeParse(rawBody)
    if (!validation.success) {
        return c.json(
            {
                error: "Validation failed",
                details: validation.error.issues.map((i) => i.message),
            },
            400
        )
    }

    const { username, password, number, email } = validation.data
    const prisma = getPrisma(c.env.DATABASE_URL)

    try {
        // Check if user already exists
        const existing = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }, { mobileNumber: number }],
            },
        })

        if (existing) {
            return c.json(
                {
                    error: "User with this username, email, or phone number already exists",
                },
                409
            )
        }

        const user = await prisma.user.create({
            data: {
                username,
                password,
                mobileNumber: number,
                email,
            },
        })

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json(token)
    } catch (error) {
        console.error("Signup error:", error)
        return c.json({ error: "An unexpected error occurred during signup" }, 500)
    }
})

// ─── Sign In ────────────────────────────────────────────────────────
userRoute.post("/signin", async (c) => {
    let rawBody: unknown
    try {
        rawBody = await c.req.json()
    } catch {
        return c.json({ error: "Invalid JSON payload" }, 400)
    }

    const validation = signinSchema.safeParse(rawBody)
    if (!validation.success) {
        return c.json(
            {
                error: "Validation failed",
                details: validation.error.issues.map((i) => i.message),
            },
            400
        )
    }

    const { username, password } = validation.data
    const prisma = getPrisma(c.env.DATABASE_URL)

    try {
        const user = await prisma.user.findUnique({
            where: {
                username,
                password,
            },
        })

        if (!user) {
            return c.json({ error: "Incorrect username or password" }, 401)
        }

        const token = await sign({ id: user.id }, c.env.JWT_SECRET)
        return c.json(token)
    } catch (error) {
        console.error("Signin error:", error)
        return c.json({ error: "An unexpected error occurred during signin" }, 500)
    }
})