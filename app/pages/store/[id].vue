<template>
  <div class="page-container">
    <div class="container section-padding" v-if="product">
      <!-- Breadcrumbs -->
      <nav class="breadcrumb">
        <NuxtLink to="/store" class="breadcrumb-link">Store</NuxtLink>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ product.category?.name || 'Accessories' }}</span>
        <span class="breadcrumb-separator">/</span>
        <span class="breadcrumb-current">{{ product.title }}</span>
      </nav>

      <div class="product-detail-grid">
        <!-- Image Gallery -->
        <div class="product-gallery glass-panel">
          <div class="main-image">
            <template v-if="product.images && product.images.length">
              <img :src="product.images[activeImageIndex]" :alt="product.title" class="gallery-main" />
            </template>
            <span v-else class="product-placeholder">{{ product.imageIcon || '📦' }}</span>
          </div>
          <div class="thumbnail-grid" v-if="product.images && product.images.length > 1">
            <button 
              v-for="(img, index) in product.images" 
              :key="index" 
              :class="['thumbnail-btn', { active: Number(activeImageIndex) === Number(index) }]"
              @click="activeImageIndex = index"
            >
              <img :src="img" :alt="`${product.title} view ${index + 1}`" />
            </button>
          </div>
        </div>

        <!-- Product Details -->
        <div class="product-info-sec">
          <h1 class="product-title">{{ product.title }}</h1>
          <p class="product-price">${{ product.price.toFixed(2) }}</p>
          
          <div class="stock-status">
            <span v-if="product.inStock" class="status-badge in-stock">✓ In Stock</span>
            <span v-else class="status-badge out-of-stock">✗ Out of Stock</span>
          </div>

          <p class="product-description">{{ product.description }}</p>

          <div class="product-actions">
            <button class="btn-primary add-to-cart-btn" :disabled="!product.inStock" @click="handleAddToCart">
              {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
            </button>
            <transition name="fade">
              <span v-if="added" class="added-msg">Added to cart!</span>
            </transition>
          </div>

          <!-- Features -->
          <div class="product-features" v-if="product.features && product.features.length">
            <h3>Key Features</h3>
            <ul class="feature-list">
              <li v-for="(feature, index) in product.features" :key="index">
                <span class="feature-icon">✨</span> {{ feature }}
              </li>
            </ul>
          </div>

          <!-- Specs -->
          <div class="product-specs" v-if="product.specs">
             <h3>Specifications</h3>
             <table class="specs-table">
               <tbody>
                 <tr v-for="(value, key) in product.specs" :key="key">
                   <td class="spec-key">{{ key }}</td>
                   <td class="spec-value">{{ value }}</td>
                 </tr>
               </tbody>
             </table>
          </div>

        </div>
      </div>
    </div>
    
    <div class="container section-padding text-center" v-else>
      <h1 class="page-title">Product Not Found</h1>
      <p class="page-description">The product you are looking for does not exist or has been removed.</p>
      <NuxtLink to="/store" class="btn-primary mt-4" style="display: inline-block; margin-top: 2rem;">Return to Store</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useFetch, useSeoMeta } from '#imports'
import { useCart } from '~/composables/useCart'

const route = useRoute()
const productId = route.params.id as string

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  images: string[];
  category?: {
    name: string;
  };
  imageIcon?: string;
  inStock?: boolean;
  features?: string[];
  specs?: Record<string, string>;
}

const { data: product } = await useFetch<Product>(`/api/products/${productId}`)
const activeImageIndex = ref(0)
const cart = useCart()
const added = ref(false)

if (product.value) {
  useSeoMeta({
    title: product.value.title,
    description: product.value.description,
  })
}

const handleAddToCart = () => {
  if (product.value) {
    // Note: Database products don't have inStock yet, assuming true for now
    cart.addToCart(product.value, 1)
    added.value = true
    setTimeout(() => {
      added.value = false
    }, 2000)
  }
}
</script>

<style scoped>
.page-container {
  padding-top: 100px;
}

.section-padding {
  padding: var(--spacing-xl) var(--spacing-md);
}

.text-center {
  text-align: center;
}

/* Breadcrumbs */
.breadcrumb {
  margin-bottom: var(--spacing-lg);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
}

.breadcrumb-link {
  color: var(--brand-primary);
  text-decoration: none;
}

.breadcrumb-link:hover {
  text-decoration: underline;
}

.breadcrumb-separator {
  color: var(--text-secondary);
}

.breadcrumb-current {
  color: var(--text-secondary);
}

/* Grid Layout */
.product-detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

@media (max-width: 992px) {
  .product-detail-grid {
    grid-template-columns: 1fr;
  }
}

/* Image Gallery */
.product-gallery {
  padding: var(--spacing-lg);
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  border-radius: var(--radius-lg);
  background: var(--bg-secondary);
}

.main-image {
  width: 100%;
  aspect-ratio: 1/1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  border-radius: var(--radius-md);
  background: var(--bg-tertiary);
}

.gallery-main {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.thumbnail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
  gap: var(--spacing-sm);
}

.thumbnail-btn {
  aspect-ratio: 1/1;
  border-radius: var(--radius-sm);
  overflow: hidden;
  border: 2px solid transparent;
  padding: 0;
  cursor: pointer;
  background: var(--bg-tertiary);
  transition: border-color 0.2s;
}

.thumbnail-btn img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.thumbnail-btn.active {
  border-color: var(--brand-primary);
}

.product-placeholder {
  font-size: 8rem;
  filter: drop-shadow(0 10px 20px rgba(0,0,0,0.5));
}

/* Product Info */
.product-info-sec {
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: var(--spacing-sm);
  line-height: 1.2;
}

.product-price {
  font-size: 2rem;
  color: var(--brand-primary);
  font-weight: 700;
  margin-bottom: var(--spacing-md);
}

/* Stock Status */
.stock-status {
  margin-bottom: var(--spacing-md);
}

.status-badge {
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  display: inline-block;
}

.in-stock {
  background: rgba(46, 204, 113, 0.2);
  color: #2ecc71;
  border: 1px solid rgba(46, 204, 113, 0.3);
}

.out-of-stock {
  background: rgba(231, 76, 60, 0.2);
  color: #e74c3c;
  border: 1px solid rgba(231, 76, 60, 0.3);
}

.product-description {
  color: var(--text-secondary);
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: var(--spacing-lg);
}

/* Actions */
.product-actions {
  margin-bottom: var(--spacing-xl);
  padding-bottom: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.add-to-cart-btn {
  width: 100%;
  max-width: 300px;
  font-size: 1.1rem;
  padding: 1rem;
}

.add-to-cart-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.added-msg {
  display: block;
  margin-top: 0.8rem;
  color: #2ecc71;
  font-weight: 600;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Features List */
.product-features h3 {
  color: #fff;
  margin-bottom: var(--spacing-md);
  font-size: 1.3rem;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin-bottom: var(--spacing-xl);
}

.feature-list li {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-size: 1.05rem;
}

/* Specs Table */
.product-specs h3 {
  color: #fff;
  margin-bottom: var(--spacing-md);
  font-size: 1.3rem;
}

.specs-table {
  width: 100%;
  border-collapse: collapse;
}

.specs-table tr {
  border-bottom: 1px solid var(--border-color);
}

.specs-table td {
  padding: var(--spacing-sm) 0;
}

.spec-key {
  color: var(--text-secondary);
  font-weight: 600;
  width: 40%;
}

.spec-value {
  color: #fff;
}
</style>
