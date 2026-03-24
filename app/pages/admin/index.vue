<template>
  <div class="admin-overview">
    <div class="welcome-header">
      <h1>Dashboard Overview</h1>
      <p>Welcome to your administration panel. Here's a quick look at your store's status.</p>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-icon products-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
        </div>
        <div class="stat-info">
          <h3>Products</h3>
          <p class="stat-number">{{ productsCount }}</p>
          <NuxtLink to="/admin/products" class="stat-link">Manage Products →</NuxtLink>
        </div>
      </div>

      <div class="stat-card">
        <div class="stat-icon categories-icon">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
        </div>
        <div class="stat-info">
          <h3>Categories</h3>
          <p class="stat-number">{{ categoriesCount }}</p>
          <NuxtLink to="/admin/categories" class="stat-link">Manage Categories →</NuxtLink>
        </div>
      </div>
    </div>

    <div class="quick-actions">
      <h2>Quick Actions</h2>
      <div class="actions-grid">
        <NuxtLink to="/admin/products" class="action-card">
          <span class="action-title">Add New Product</span>
          <span class="action-desc">Add a new item to your store inventory</span>
        </NuxtLink>
        <NuxtLink to="/admin/categories" class="action-card">
          <span class="action-title">Create Category</span>
          <span class="action-desc">Organize your products with new categories</span>
        </NuxtLink>
        <NuxtLink to="/" class="action-card">
          <span class="action-title">View Website</span>
          <span class="action-desc">Preview your changes on the live site</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const { data: categories } = useFetch<any[]>('/api/admin/categories')
const { data: products } = useFetch<any[]>('/api/admin/products')

const categoriesCount = computed(() => categories.value?.length || 0)
const productsCount = computed(() => products.value?.length || 0)
</script>

<style scoped>
.admin-overview {
  padding: 1rem 0;
}

.welcome-header {
  margin-bottom: 3rem;
}

.welcome-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.welcome-header p {
  color: #666;
  font-size: 1.1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

.stat-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  border: 1px solid #eee;
  transition: transform 0.2s, box-shadow 0.2s;
}

.stat-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 15px rgba(0,0,0,0.1);
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.products-icon {
  background: rgba(0, 112, 243, 0.1);
  color: #0070f3;
}

.categories-icon {
  background: rgba(255, 94, 0, 0.1);
  color: #ff5e00;
}

.stat-info h3 {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #888;
  margin-bottom: 0.25rem;
}

.stat-number {
  font-size: 2rem;
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
}

.stat-link {
  font-size: 0.9rem;
  color: #0070f3;
  font-weight: 600;
}

.quick-actions h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.actions-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.action-card {
  background: #fff;
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #eee;
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
}

.action-card:hover {
  background: #fdfdfd;
  border-color: #0070f3;
  transform: scale(1.02);
}

.action-title {
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.action-desc {
  font-size: 0.9rem;
  color: #666;
}
</style>
