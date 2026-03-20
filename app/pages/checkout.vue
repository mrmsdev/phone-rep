<template>
  <div class="page-container">
    <div class="page-header">
      <div class="container text-center">
        <h1 class="page-title">Checkout</h1>
      </div>
    </div>
    
    <div class="container section-padding">
      <div class="checkout-grid" v-if="cart.length > 0 && !orderPlaced">
        <div class="checkout-form glass-panel">
          <h2>Shipping Information</h2>
          <form @submit.prevent="placeOrder">
            <div class="form-row">
              <div class="form-group">
                <label for="firstName">First Name</label>
                <input type="text" id="firstName" required class="form-input">
              </div>
              <div class="form-group">
                <label for="lastName">Last Name</label>
                <input type="text" id="lastName" required class="form-input">
              </div>
            </div>
            
            <div class="form-group">
              <label for="email">Email Address</label>
              <input type="email" id="email" required class="form-input">
            </div>
            
            <div class="form-group">
              <label for="address">Address</label>
              <input type="text" id="address" required class="form-input">
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="city">City</label>
                <input type="text" id="city" required class="form-input">
              </div>
              <div class="form-group">
                <label for="zip">Zip / Postal Code</label>
                <input type="text" id="zip" required class="form-input">
              </div>
            </div>

            <h2 class="mt-xl">Payment Details</h2>
            <div class="payment-mock">
              <p>💳 Mock Payment Gateway (No real card needed)</p>
            </div>
            
            <button type="submit" class="btn-primary submit-btn">
              Pay ${{ cartTotal.toFixed(2) }}
            </button>
          </form>
        </div>
        
        <div class="order-summary glass-panel">
          <h3>Order Summary</h3>
          <div class="summary-items">
            <div v-for="item in cart" :key="item.id" class="summary-item">
              <span class="item-title">{{ item.quantity }}x {{ item.title }}</span>
              <span class="item-price">${{ (item.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <hr class="divider"/>
          <div class="summary-line total">
            <span>Total</span>
            <span>${{ cartTotal.toFixed(2) }}</span>
          </div>
        </div>
      </div>
      
      <!-- Success State -->
      <div v-else-if="orderPlaced" class="success-state glass-panel text-center">
        <span class="success-icon">🎉</span>
        <h2>Order Confirmed!</h2>
        <p>Thank you for shopping with MustachPhone. Your order has been placed successfully.</p>
        <NuxtLink to="/store" class="btn-primary mt-4" style="display: inline-block; margin-top: 2rem;">Continue Shopping</NuxtLink>
      </div>
      
      <!-- Empty State -->
      <div v-else class="empty-state text-center">
        <h2>No items to checkout</h2>
        <NuxtLink to="/store" class="btn-primary mt-4" style="display: inline-block; margin-top: 2rem;">Return to Store</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCart } from '~/composables/useCart'
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Secure Checkout',
  description: 'Complete your purchase securely. MustachPhone guarantees data safety for all replacement parts and accessories.',
})

const { cart, cartTotal } = useCart()
const orderPlaced = ref(false)

const placeOrder = () => {
  // Mock order placement
  orderPlaced.value = true
  cart.value = [] // Clear the cart
}
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

.checkout-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

@media (max-width: 992px) {
  .checkout-grid {
    grid-template-columns: 1fr;
  }
}

.checkout-form {
  padding: var(--spacing-xl);
}

.checkout-form h2 {
  color: #fff;
  margin-bottom: var(--spacing-lg);
  font-size: 1.5rem;
}

.mt-xl {
  margin-top: var(--spacing-xl);
}

.form-row {
  display: flex;
  gap: var(--spacing-md);
}

.form-row .form-group {
  flex: 1;
}

.form-group {
  margin-bottom: var(--spacing-md);
}

.form-group label {
  display: block;
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.form-input {
  width: 100%;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-color);
  background: var(--bg-primary);
  color: #fff;
  font-family: inherit;
  transition: border-color var(--transition-fast);
}

.form-input:focus {
  outline: none;
  border-color: var(--brand-primary);
}

.payment-mock {
  padding: 1.5rem;
  background: rgba(255, 255, 255, 0.05);
  border: 1px dashed var(--border-color);
  border-radius: var(--radius-sm);
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-xl);
}

.submit-btn {
  width: 100%;
  font-size: 1.2rem;
  padding: 1rem;
}

.order-summary {
  padding: var(--spacing-lg);
}

.order-summary h3 {
  color: #fff;
  margin-bottom: var(--spacing-lg);
  font-size: 1.3rem;
}

.summary-items {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.summary-item {
  display: flex;
  justify-content: space-between;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.item-title {
  max-width: 70%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-price {
  color: #fff;
}

.divider {
  border-color: var(--border-color);
  margin: var(--spacing-md) 0;
}

.summary-line.total {
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: 1.3rem;
  font-weight: 700;
}

.success-state {
  max-width: 600px;
  margin: 0 auto;
  padding: 4rem 2rem;
}

.success-icon {
  font-size: 5rem;
  display: block;
  margin-bottom: var(--spacing-lg);
}

.success-state h2 {
  color: #2ecc71;
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.success-state p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
}

.empty-state {
  padding: 4rem 0;
}
.empty-state h2 {
  color: #fff;
}
</style>
