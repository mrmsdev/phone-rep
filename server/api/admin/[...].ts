import { createRouter, defineEventHandler, useBase, readBody, createError } from 'h3'
import { prisma } from '../../utils/prisma'
const router = createRouter()

// Middleware to protect all /api/admin routes
router.use('/', defineEventHandler((event) => {
    const user = event.context.user
    if (!user || user.role !== 'ADMIN') {
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
    const id = Number(event.context.params!.id)
    const body = await readBody(event)
    return await prisma.category.update({ where: { id }, data: body })
}))
router.delete('/categories/:id', defineEventHandler(async (event) => {
    const id = Number(event.context.params!.id)
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
            title: body.title,
            price: Number(body.price),
            description: body.description,
            images: body.images || [],
            categoryId: Number(body.categoryId)
        }
    })
}))
router.put('/products/:id', defineEventHandler(async (event) => {
    const id = Number(event.context.params!.id)
    const body = await readBody(event)

    // Prepare data for update
    const updateData: any = { ...body }
    if (updateData.price) updateData.price = Number(updateData.price)
    if (updateData.categoryId) updateData.categoryId = Number(updateData.categoryId)
    if (updateData.images) updateData.images = body.images

    return await prisma.product.update({ where: { id }, data: updateData })
}))
// Messages Management
router.get('/messages', defineEventHandler(async () => {
    return await prisma.contactMessage.findMany({
        orderBy: { createdAt: 'desc' }
    })
}))
router.patch('/messages/:id/read', defineEventHandler(async (event) => {
    const id = Number(event.context.params!.id)
    return await prisma.contactMessage.update({
        where: { id },
        data: { isRead: true }
    })
}))
router.delete('/messages/:id', defineEventHandler(async (event) => {
    const id = Number(event.context.params!.id)
    return await prisma.contactMessage.delete({ where: { id } })
}))

router.delete('/products/:id', defineEventHandler(async (event) => {
    const id = Number(event.context.params!.id)
    return await prisma.product.delete({ where: { id } })
}))

export default useBase('/api/admin', router.handler)
