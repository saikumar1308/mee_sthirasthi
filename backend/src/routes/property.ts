import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const propertyRoute = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    },
    Variables: {
        userId: string,
    }
}>()

propertyRoute.use('/sell/*', async (c, next) => {
    const token = c.req.header("Authorization") || ""

    try {
        const user = await verify(token, c.env.JWT_SECRET)
        if (user) {
            // @ts-ignore
            c.set("userId", user.id)
            await next()
        }
    } catch (error) {
        return c.json({
            error: "Invalid"
        }, 401)
    }

})

propertyRoute.post('/sell', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body = await c.req.json()

    const userId = c.get("userId")

    if (!userId) {
        return c.json("Unauthenticated!!!!")
    }

    try {
        const property = await prisma.property.create({
            data: {
                price: body.price,
                location: body.location,
                description: body.description,
                selection: body.selection,
                image: body.image,
                no_bedroooms: body.no_bedroooms,
                no_kitchens: body.no_kitchens,
                no_toilets: body.no_toilets,
                car_parking: body.car_parking,
                amenities: body.amenities,
                buildup_area: body.buildup_area,
                ownerId: body.ownerId
            }
        })
        return c.json(property.id)
    } catch (error) {
        console.log(error)
        return c.json("errorr!!!!")
    }

})

propertyRoute.get('/sell/owner', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const userId = c.get("userId")

    if (!userId) {
        return c.json("Unauthenticated!!!!")
    }

    const body = await c.req.json()

    const user = await prisma.user.findFirst({
        where: {
            id: body.id,
        },
    })

    return c.json(user)
})

propertyRoute.get('/selection', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json()

    const properties = await prisma.property.findMany({
        where: {
            selection: body.selection,
        },
    })

    return c.json(properties)

})

propertyRoute.get('/selection/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const body = await c.req.json()
    const property = await prisma.property.findFirst({
        where: {
            id: body.id,
        }
    })
    return c.json(property)
})
