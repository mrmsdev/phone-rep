import { useState } from '#app'
import { computed } from 'vue'

export interface CartItem {
    id: string
    title: string
    price: number
    quantity: number
    imageIcon: string
}

export const useCart = () => {
    const cart = useState<CartItem[]>('cart', () => [])

    const addToCart = (product: any, quantity: number = 1) => {
        const existing = cart.value.find(item => item.id === product.id)
        if (existing) {
            existing.quantity += quantity
        } else {
            cart.value.push({
                id: product.id,
                title: product.title,
                price: product.price,
                imageIcon: product.imageIcon,
                quantity
            })
        }
    }

    const removeFromCart = (productId: string) => {
        cart.value = cart.value.filter(item => item.id !== productId)
    }

    const updateQuantity = (productId: string, quantity: number) => {
        const item = cart.value.find(i => i.id === productId)
        if (item && quantity > 0) {
            item.quantity = quantity
        }
    }

    const cartTotal = computed(() => {
        return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    const cartItemCount = computed(() => {
        return cart.value.reduce((count, item) => count + item.quantity, 0)
    })

    return {
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartItemCount
    }
}
