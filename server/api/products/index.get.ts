import { defineEventHandler } from 'h3'
import { prisma } from '../../utils/prisma'

export default defineEventHandler(async () => {
    return await prisma.product.findMany({
        include: {
            category: true
        },
        orderBy: {
            createdAt: 'desc'
        }
    })
})
