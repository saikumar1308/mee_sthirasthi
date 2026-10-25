import { PrismaClient } from "@prisma/client/edge"
import { withAccelerate } from "@prisma/extension-accelerate"
import { Hono } from "hono"
import { verify } from "hono/jwt"
import { z } from "zod"

export const propertyRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string
        JWT_SECRET: string
    }
    Variables: {
        userId: string
    }
}>()

// Helper to initialize Prisma with Accelerate
function getPrisma(databaseUrl: string) {
    return new PrismaClient({
        datasourceUrl: databaseUrl,
    }).$extends(withAccelerate())
}

// Zod schemas for Property validation
const createPropertySchema = z.object({
    price: z.number().positive("Price must be greater than 0"),
    location: z.string().min(1, "Location is required"),
    description: z.string().min(1, "Description is required"),
    selection: z.string().min(1, "Selection type is required"),
    image: z.string().min(1, "Image URL is required"),
    no_bedroooms: z.number().int().nonnegative(),
    no_kitchens: z.number().int().nonnegative(),
    no_toilets: z.number().int().nonnegative(),
    car_parking: z.boolean(),
    amenities: z.string().optional().default(""),
    buildup_area: z.number().int().positive("Buildup area must be greater than 0"),
})

const getOwnerSchema = z.object({
    id: z.string().min(1, "Owner ID is required"),
})

// ─── Auth Middleware for /sell and /sell/* ─────────────────────────
async function authMiddleware(c: any, next: () => Promise<void>) {
    const authHeader = c.req.header("Authorization") || ""
    const token = authHeader.replace(/^Bearer\s+/i, "").trim()

    if (!token) {
        return c.json({ error: "Missing authorization token" }, 401)
    }

    try {
        const payload = await verify(token, c.env.JWT_SECRET)
        if (payload && payload.id) {
            c.set("userId", String(payload.id))
            await next()
        } else {
            return c.json({ error: "Invalid token payload" }, 401)
        }
    } catch {
        return c.json({ error: "Invalid or expired token" }, 401)
    }
}

propertyRoute.use("/sell", authMiddleware)
propertyRoute.use("/sell/*", authMiddleware)

// ─── Create Property (List Property) ──────────────────────────────
propertyRoute.post("/sell", async (c) => {
    const userId = c.get("userId")
    if (!userId) {
        return c.json({ error: "Unauthenticated" }, 401)
    }

    let rawBody: unknown
    try {
        rawBody = await c.req.json()
    } catch {
        return c.json({ error: "Invalid JSON payload" }, 400)
    }

    const validation = createPropertySchema.safeParse(rawBody)
    if (!validation.success) {
        return c.json(
            {
                error: "Validation failed",
                details: validation.error.issues.map((i) => i.message),
            },
            400
        )
    }

    const data = validation.data
    const prisma = getPrisma(c.env.DATABASE_URL)

    try {
        const property = await prisma.property.create({
            data: {
                price: data.price,
                location: data.location,
                description: data.description,
                selection: data.selection.toLowerCase(),
                image: data.image,
                no_bedroooms: data.no_bedroooms,
                no_kitchens: data.no_kitchens,
                no_toilets: data.no_toilets,
                car_parking: data.car_parking,
                amenities: data.amenities || "",
                buildup_area: data.buildup_area,
                ownerId: userId,
            },
        })
        return c.json(property.id, 201)
    } catch (error) {
        console.error("Error creating property:", error)
        return c.json({ error: "Failed to create property listing" }, 500)
    }
})

// ─── Get Property Owner Details (Protected) ───────────────────────
propertyRoute.post("/sell/owner", async (c) => {
    const userId = c.get("userId")
    if (!userId) {
        return c.json({ error: "Unauthenticated" }, 401)
    }

    let rawBody: unknown
    try {
        rawBody = await c.req.json()
    } catch {
        return c.json({ error: "Invalid JSON payload" }, 400)
    }

    const validation = getOwnerSchema.safeParse(rawBody)
    if (!validation.success) {
        return c.json({ error: "Invalid owner ID parameter" }, 400)
    }

    const prisma = getPrisma(c.env.DATABASE_URL)
    try {
        const user = await prisma.user.findFirst({
            where: {
                id: validation.data.id,
            },
            select: {
                id: true,
                username: true,
                mobileNumber: true,
                email: true,
            },
        })

        if (!user) {
            return c.json({ error: "Owner not found" }, 404)
        }

        return c.json(user)
    } catch (error) {
        console.error("Error fetching owner:", error)
        return c.json({ error: "Failed to retrieve owner details" }, 500)
    }
})

// ─── Get Top Picks (Featured on Home) ─────────────────────────────
propertyRoute.get("/", async (c) => {
    const prisma = getPrisma(c.env.DATABASE_URL)
    try {
        const topPicks = await prisma.property.findMany({
            take: 12,
            orderBy: {
                id: "desc",
            },
        })
        return c.json(topPicks)
    } catch (error) {
        console.error("Error fetching top picks:", error)
        return c.json([], 500)
    }
})

// ─── Get Properties by Selection (Rent, Buy, Lease) ───────────────
propertyRoute.get("/:selection", async (c) => {
    const selection = c.req.param("selection")?.toLowerCase()
    const prisma = getPrisma(c.env.DATABASE_URL)

    try {
        const properties = await prisma.property.findMany({
            where: {
                selection: selection,
            },
            orderBy: {
                id: "desc",
            },
        })
        return c.json(properties)
    } catch (error) {
        console.error("Error fetching properties by selection:", error)
        return c.json([], 500)
    }
})

// ─── Get Property Details by ID ───────────────────────────────────
propertyRoute.get("/:selection/:id", async (c) => {
    const id = c.req.param("id")
    const prisma = getPrisma(c.env.DATABASE_URL)

    try {
        const property = await prisma.property.findFirst({
            where: {
                id: id,
            },
            select: {
                description: true,
                price: true,
                location: true,
                buildup_area: true,
                id: true,
                selection: true,
                image: true,
                amenities: true,
                car_parking: true,
                no_bedroooms: true,
                no_toilets: true,
                no_kitchens: true,
                owner: {
                    select: {
                        username: true,
                        mobileNumber: true,
                        id: true,
                        email: true,
                    },
                },
            },
        })

        if (!property) {
            return c.json({ error: "Property not found" }, 404)
        }

        return c.json(property)
    } catch (error) {
        console.error("Error fetching property detail:", error)
        return c.json({ error: "Failed to retrieve property" }, 500)
    }
})
