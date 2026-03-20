<template>
  <div class="page-container">
    <div class="page-header">
      <div class="container text-center">
        <h1 class="page-title">Your Cart</h1>
      </div>
    </div>
    
    <div class="container section-padding">
      <div class="cart-container" v-if="cart.length > 0">
        <div class="cart-items glass-panel">
          <div v-for="item in cart" :key="item.id" class="cart-item">
            <div class="item-icon">{{ item.imageIcon }}</div>
            <div class="item-details">
              <h3 class="item-title">{{ item.title }}</h3>
              <p class="item-price">${{ item.price.toFixed(2) }}</p>
            </div>
            <div class="item-quantity">
              <button @click="updateQuantity(item.id, item.quantity - 1)" class="qty-btn" :disabled="item.quantity <= 1">-</button>
              <span class="qty">{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, item.quantity + 1)" class="qty-btn">+</button>
            </div>
            <div class="item-total">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
            <button @click="removeFromCart(item.id)" class="remove-btn" title="Remove Item">
              ✕
            </button>
          </div>
        </div>
        
        <div class="cart-summary glass-panel">
          <h3>Order Summary</h3>
          <div class="summary-line">
            <span>Subtotal ({{ cartItemCount }} items)</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
          <div class="summary-line">
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <hr class="summary-divider"/>
          <div class="summary-line total">
            <span>Total</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
          <NuxtLink to="/checkout" class="btn-primary checkout-btn">Proceed to Checkout</NuxtLink>
        </div>
      </div>
      
      <div v-else class="empty-cart text-center">
        <span class="empty-icon">🛒</span>
        <h2>Your cart is currently empty.</h2>
        <p>Looks like you haven't added anything yet. Explore our store to find premium repair parts and accessories.</p>
        <NuxtLink to="/store" class="btn-primary mt-4" style="display: inline-block; margin-top: 2rem;">Return to Store</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCart } from '~/composables/useCart'
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Your Cart',
  description: 'Review the items in your MustachPhone shopping cart before proceeding to checkout.',
})

const { cart, cartTotal, cartItemCount, updateQuantity, removeFromCart } = useCart()
</script>

<style scoped>
.page-container {
  padding-top: 100px;
}

.page-header {
  padding: var(--spacing-xl) 0;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.text-center {
  text-align: center;
}

.page-title {
  font-size: 3rem;
  color: #fff;
}

.section-padding {
  padding: var(--spacing-xl) var(--spacing-md);
}

.cart-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

@media (max-width: 992px) {
  .cart-container {
    grid-template-columns: 1fr;
  }
}

.cart-items {
  padding: var(--spacing-lg);
}

.cart-item {
  display: flex;
  align-items: center;
  padding: var(--spacing-md) 0;
  border-bottom: 1px solid var(--border-color);
  gap: var(--spacing-md);
}

.cart-item:last-child {
  border-bottom: none;
  padding-bottom: 0;
}

.item-icon {
  font-size: 3rem;
  width: 80px;
  text-align: center;
  background: var(--bg-secondary);
  padding: var(--spacing-sm);
  border-radius: var(--radius-md);
}

.item-details {
  flex-grow: 1;
}

.item-title {
  color: #fff;
  font-size: 1.1rem;
  margin-bottom: 0.2rem;
}

.item-price {
  color: var(--text-secondary);
  font-weight: 500;
}

.item-quantity {
  display: flex;
  align-items: center;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  background: var(--bg-tertiary);
}

.qty-btn {
  background: transparent;
  border: none;
  color: #fff;
  padding: 0.5rem 0.8rem;
  cursor: pointer;
}

.qty-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.qty-btn:hover:not(:disabled) {
  background: rgba(255,255,255,0.1);
}

.qty {
  padding: 0 0.5rem;
  color: #fff;
  font-weight: bold;
  min-width: 30px;
  text-align: center;
}

.item-total {
  font-weight: 700;
  color: var(--brand-primary);
  width: 100px;
  text-align: right;
}

.remove-btn {
  background: transparent;
  border: none;
  color: var(--text-secondary);
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: color var(--transition-fast);
}

.remove-btn:hover {
  color: #e74c3c;
}

.cart-summary {
  padding: var(--spacing-lg);
}

.cart-summary h3 {
  color: #fff;
  margin-bottom: var(--spacing-lg);
  font-size: 1.4rem;
}

.summary-line {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--spacing-md);
  color: var(--text-secondary);
}

.summary-divider {
  border-color: var(--border-color);
  margin: var(--spacing-md) 0;
}

.summary-line.total {
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: var(--spacing-xl);
}

.checkout-btn {
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
}

.empty-cart {
  padding: 4rem 0;
}

.empty-icon {
  font-size: 6rem;
  display: block;
  margin-bottom: var(--spacing-lg);
  opacity: 0.5;
}

.empty-cart h2 {
  color: #fff;
  margin-bottom: var(--spacing-sm);
}

.empty-cart p {
  color: var(--text-secondary);
  max-width: 500px;
  margin: 0 auto;
}
</style>
