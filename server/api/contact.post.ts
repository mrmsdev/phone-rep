import { defineEventHandler, readBody, createError } from 'h3'
import { prisma } from '../utils/prisma'

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { name, email, phone, device, message } = body

        // Basic validation
        if (!name || !email || !phone || !device) {
            throw createError({
                statusCode: 400,
                statusMessage: 'Please provide all required fields (name, email, phone, device).',
            })
        }

        // Create contact message in database
        const contactMessage = await prisma.contactMessage.create({
            data: {
                name,
                email,
                phone,
                device,
                message: message || '',
            },
        })

        return {
            success: true,
            message: 'Your request has been sent successfully.',
            data: contactMessage
        }
    } catch (error: any) {
        throw createError({
            statusCode: error.statusCode || 500,
            statusMessage: error.statusMessage || 'Internal Server Error',
        })
    }
})
