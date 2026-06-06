<template>
  <div class="page-container">
    <div class="page-header">
      <div class="container text-center">
        <h1 class="page-title">Store & Accessories</h1>
        <p class="page-description">Shop for premium phone cases, chargers, screen protectors, and OEM parts directly from our store.</p>
      </div>
    </div>
    
    <div class="container section-padding">
      <!-- Search & Filters -->
      <div class="store-filters">
        <input 
          type="text" 
          v-model="searchQuery" 
          placeholder="Search products..." 
          class="search-input"
        />
        <div class="category-filters">
          <button 
            v-for="cat in categories" 
            :key="cat"
            :class="['filter-btn', { active: selectedCategory === cat }]"
            @click="selectedCategory = cat"
          >
            {{ cat === 'all' ? 'All' : cat }}
          </button>
        </div>
      </div>

      <div class="products-grid" v-if="filteredProducts.length > 0">
        <NuxtLink v-for="product in filteredProducts" :key="product.id" :to="`/store/${product.id}`" class="product-card glass-panel">
          <div class="product-image-wrap">
            <div v-if="product.images && product.images.length" class="product-image">
              <img :src="product.images[0]" :alt="product.title" />
            </div>
            <div v-else class="product-placeholder">{{ product.imageIcon || '📦' }}</div>
          </div>
          <div class="product-info">
            <span class="product-category">{{ product.category?.name || 'Accessories' }}</span>
            <h3 class="product-title">{{ product.title }}</h3>
            <p class="product-price">MAD{{ product.price.toFixed(2) }}</p>
            <button class="btn-primary product-action">View Details</button>
          </div>
        </NuxtLink>
      </div>

      <div v-else class="text-center no-results">
        <h3>No products found</h3>
        <p>Try adjusting your search or filters.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useSeoMeta, useFetch } from '#imports'

useSeoMeta({
  title: 'Store',
  description: 'Shop for premium phone accessories, screen protectors, OEM batteries, and professional repair toolkits at MustachPhone.',
})

const { data: productsData } = await useFetch<any[]>('/api/products')
const products = computed(() => productsData.value || [])

const searchQuery = ref('')
const selectedCategory = ref('all')

const categories = computed(() => {
  if (!products.value) return ['all']
  const catNames = products.value
    .map(p => p.category?.name)
    .filter(Boolean) as string[]
  return ['all', ...new Set(catNames)]
})

const filteredProducts = computed(() => {
  if (!products.value) return []
  return products.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.value.toLowerCase()) || 
                          (p.description && p.description.toLowerCase().includes(searchQuery.value.toLowerCase()))
    const matchesCategory = selectedCategory.value === 'all' || p.category?.name === selectedCategory.value
    
    return matchesSearch && matchesCategory
  })
})
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
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: var(--spacing-sm);
}

.page-description {
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
}

/* Store Filters */
.store-filters {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-xl);
  align-items: center;
}

.search-input {
  width: 100%;
  max-width: 400px;
  padding: 0.8rem 1rem;
  border-radius: var(--radius-md);
  border: 1px solid var(--border-color);
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-family: inherit;
  font-size: 1rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--brand-primary);
}

.category-filters {
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  justify-content: center;
}

.filter-btn {
  background: transparent;
  border: 1px solid var(--border-color);
  color: var(--text-secondary);
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  font-weight: 500;
  transition: all var(--transition-fast);
}

.filter-btn:hover {
  border-color: var(--brand-secondary);
  color: #fff;
}

.filter-btn.active {
  background: var(--brand-primary);
  border-color: var(--brand-primary);
  color: #fff;
}

.no-results {
  padding: var(--spacing-xl) 0;
  color: var(--text-secondary);
}
.no-results h3 {
  color: #fff;
  margin-bottom: var(--spacing-sm);
}

.section-padding {
  padding: var(--spacing-xl) var(--spacing-md);
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.product-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: transform var(--transition-normal), border-color var(--transition-fast);
  text-decoration: none; /* Add text-decoration none since it's now a link */
}

.product-card:hover {
  transform: translateY(-5px);
  border-color: var(--brand-secondary);
}

.product-image-wrap {
  height: 200px;
  background: var(--bg-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--border-color);
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-normal);
}

.product-card:hover .product-image img {
  transform: scale(1.1);
}

.product-placeholder {
  font-size: 4rem;
}

.product-info {
  padding: var(--spacing-md);
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.product-category {
  font-size: 0.8rem;
  text-transform: uppercase;
  color: var(--brand-primary);
  letter-spacing: 1px;
  margin-bottom: var(--spacing-sm);
}

.product-title {
  font-size: 1.2rem;
  color: #fff;
  margin-bottom: var(--spacing-sm);
}

.product-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
  margin-top: auto;
}

.product-action {
  width: 100%;
}
</style>
