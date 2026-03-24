import { defineEventHandler, createError } from 'h3'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async (event) => {
    const id = Number(event.context.params!.id)
    if (isNaN(id)) {
        throw createError({ statusCode: 400, statusMessage: 'Invalid ID' })
    }

    const product = await prisma.product.findUnique({
        where: { id },
        include: {
            category: true
        }
    })

    if (!product) {
        throw createError({ statusCode: 404, statusMessage: 'Product not found' })
    }

    return product
})
