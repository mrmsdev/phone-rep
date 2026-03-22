import { createRouter, defineEventHandler, useBase, readBody, createError } from 'h3'
import { getServerSession } from '#auth'
import { prisma } from '../../utils/prisma'
const router = createRouter()

// Middleware to protect all /api/admin routes
router.use('/', defineEventHandler(async (event) => {
    const session = await getServerSession(event)
    if (!session || session.user?.role !== 'ADMIN') {
        throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
    }
}))

// Categories CRUD
router.get('/categories', defineEventHandler(async () => {
    return await prisma.category.findMany({ include: { products: true } })
}))
router.post('/categories', defineEventHandler(async (event) => {
    const body = await readBody(event)
    return await prisma.category.create({ data: { name: body.name, slug: body.slug } })
}))
router.put('/categories/:id', defineEventHandler(async (event) => {
    const id = Number(event.context.params.id)
    const body = await readBody(event)
    return await prisma.category.update({ where: { id }, data: body })
}))
router.delete('/categories/:id', defineEventHandler(async (event) => {
    const id = Number(event.context.params.id)
    return await prisma.category.delete({ where: { id } })
}))

// Products CRUD
router.get('/products', defineEventHandler(async () => {
    return await prisma.product.findMany({ include: { category: true } })
}))
router.post('/products', defineEventHandler(async (event) => {
    const body = await readBody(event)
    return await prisma.product.create({
        data: {
            title: body.title, price: Number(body.price), description: body.description,
            image: body.image, categoryId: Number(body.categoryId)
        }
    })
}))
router.put('/products/:id', defineEventHandler(async (event) => {
    const id = Number(event.context.params.id)
    const body = await readBody(event)
    if (body.price) body.price = Number(body.price)
    if (body.categoryId) body.categoryId = Number(body.categoryId)
    return await prisma.product.update({ where: { id }, data: body })
}))
router.delete('/products/:id', defineEventHandler(async (event) => {
    const id = Number(event.context.params.id)
    return await prisma.product.delete({ where: { id } })
}))

export default useBase('/api/admin', router.handler)
