<template>
  <div class="admin-dashboard">
    <header>
      <h1>Admin Dashboard</h1>
      <div class="user-info">
        <span>Welcome, {{ data?.user?.name }}</span>
        <button @click="signOut({ callbackUrl: '/' })">Logout</button>
      </div>
    </header>

    <main>
      <section class="admin-section">
        <h2>Categories</h2>
        <div class="card">
          <ul>
            <li v-for="cat in categories" :key="cat.id">
              {{ cat.name }} ({{ cat.slug }})
              <button @click="deleteCategory(cat.id)" class="danger-btn">Delete</button>
            </li>
          </ul>
          <form @submit.prevent="createCategory" class="add-form">
            <input v-model="newCategoryName" placeholder="Category Name" required />
            <input v-model="newCategorySlug" placeholder="Slug" required />
            <button type="submit">Add Category</button>
          </form>
        </div>
      </section>

      <section class="admin-section">
        <h2>Products</h2>
        <div class="card">
          <ul>
            <li v-for="prod in products" :key="prod.id">
              <strong>{{ prod.title }}</strong> - ${{ prod.price }}
              <span v-if="prod.category">({{ prod.category.name }})</span>
              <button @click="deleteProduct(prod.id)" class="danger-btn">Delete</button>
            </li>
          </ul>
          <form @submit.prevent="createProduct" class="add-form product-form">
            <input v-model="newProduct.title" placeholder="Title" required />
            <input v-model="newProduct.price" type="number" step="0.01" placeholder="Price" required />
            <input v-model="newProduct.description" placeholder="Description" />
            <input v-model="newProduct.image" placeholder="Image URL" />
            <select v-model="newProduct.categoryId">
              <option :value="null">No Category</option>
              <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
            </select>
            <button type="submit">Add Product</button>
          </form>
        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth'
})

const { data, signOut } = useAuth()

const { data: categories, refresh: refreshCategories } = useFetch<any[]>('/api/admin/categories')
const { data: products, refresh: refreshProducts } = useFetch<any[]>('/api/admin/products')

const newCategoryName = ref('')
const newCategorySlug = ref('')

const newProduct = ref({
  title: '',
  price: '',
  description: '',
  image: '',
  categoryId: null as number | null
})

async function createCategory() {
  await $fetch('/api/admin/categories', {
    method: 'POST',
    body: { name: newCategoryName.value, slug: newCategorySlug.value }
  })
  newCategoryName.value = ''
  newCategorySlug.value = ''
  refreshCategories()
}

async function deleteCategory(id: number) {
  if (confirm('Are you sure?')) {
    await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    refreshCategories()
    refreshProducts()
  }
}

async function createProduct() {
  await $fetch('/api/admin/products', {
    method: 'POST',
    body: newProduct.value
  })
  newProduct.value = { title: '', price: '', description: '', image: '', categoryId: null }
  refreshProducts()
}

async function deleteProduct(id: number) {
  if (confirm('Are you sure?')) {
    await $fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    refreshProducts()
  }
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eaeaea;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
}
.user-info span {
  margin-right: 1rem;
  font-weight: bold;
}
.user-info button {
  padding: 0.5rem 1rem;
  background: #333;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
.admin-section {
  margin-bottom: 3rem;
}
.card {
  background: #f9f9f9;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #ddd;
}
ul {
  list-style: none;
  padding: 0;
  margin-bottom: 1.5rem;
}
li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 0;
  border-bottom: 1px solid #eee;
}
.danger-btn {
  background: #ff4d4f;
  color: white;
  border: none;
  padding: 0.3rem 0.6rem;
  border-radius: 4px;
  cursor: pointer;
}
.add-form {
  display: flex;
  gap: 1rem;
}
.add-form input, .add-form select {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}
.product-form {
  flex-wrap: wrap;
}
button[type="submit"] {
  padding: 0.5rem 1.5rem;
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
