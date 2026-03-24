<template>
  <div class="admin-categories">
    <div class="page-header">
      <div class="header-content">
        <h1>Categories Management</h1>
        <p>Organize your products by creating and managing categories.</p>
      </div>
      <button @click="showAddForm = !showAddForm" class="btn-toggle-add">
        {{ showAddForm ? 'Cancel' : '+ Add New Category' }}
      </button>
    </div>

    <div v-if="showAddForm" class="add-category-card animate-fade-in">
      <h3>Create New Category</h3>
      <form @submit.prevent="createCategory" class="category-form">
        <div class="form-group">
          <label>Category Name</label>
          <input v-model="newCategoryName" placeholder="e.g., iPhone Screen Repair" required />
        </div>
        <div class="form-group">
          <label>URL Slug</label>
          <input v-model="newCategorySlug" placeholder="e.g., iphone-screen-repair" required />
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="isSubmitting" class="btn-submit">
            {{ isSubmitting ? 'Creating...' : 'Create Category' }}
          </button>
        </div>
      </form>
    </div>

    <div class="categories-list-card">
      <div v-if="pending" class="loading-state">Loading categories...</div>
      <table v-else-if="categories?.length" class="admin-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Slug</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="cat in categories" :key="cat.id">
            <td class="cat-name">{{ cat.name }}</td>
            <td class="cat-slug"><code>{{ cat.slug }}</code></td>
            <td class="cat-actions">
              <button @click="deleteCategory(cat.id)" class="btn-delete" title="Delete Category">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="empty-state">
        <p>No categories found. Create your first one above!</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const { data: categories, refresh: refreshCategories, pending } = useFetch<any[]>('/api/admin/categories')

const showAddForm = ref(false)
const isSubmitting = ref(false)
const newCategoryName = ref('')
const newCategorySlug = ref('')

async function createCategory() {
  isSubmitting.value = true
  try {
    await $fetch('/api/admin/categories', {
      method: 'POST',
      body: { name: newCategoryName.value, slug: newCategorySlug.value }
    })
    newCategoryName.value = ''
    newCategorySlug.value = ''
    showAddForm.value = false
    refreshCategories()
  } catch (err) {
    alert('Failed to create category')
  } finally {
    isSubmitting.value = false
  }
}

async function deleteCategory(id: number) {
  if (confirm('Are you sure you want to delete this category? This might affect products using it.')) {
    await $fetch(`/api/admin/categories/${id}`, { method: 'DELETE' })
    refreshCategories()
  }
}

// Auto-generate slug from name
watch(newCategoryName, (val) => {
  if (!newCategorySlug.value || newCategorySlug.value === val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')) {
    newCategorySlug.value = val.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
})
</script>

<style scoped>
.admin-categories {
  padding: 1rem 0;
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
}

.header-content h1 {
  font-size: 1.75rem;
  color: #1a1a1a;
  margin-bottom: 0.25rem;
}

.header-content p {
  color: #666;
}

.btn-toggle-add {
  padding: 0.6rem 1.2rem;
  background: #333;
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-toggle-add:hover {
  background: #444;
}

.add-category-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.add-category-card h3 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.category-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .category-form {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #555;
}

.form-group input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-actions {
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
}

.btn-submit {
  padding: 0.75rem 2rem;
  background: #0070f3;
  color: #fff;
  border-radius: 6px;
  font-weight: 600;
  transition: all 0.2s;
}

.btn-submit:hover:not(:disabled) {
  background: #0060d3;
  transform: translateY(-1px);
}

.categories-list-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.admin-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.admin-table th {
  background: #f8f9fa;
  padding: 1rem 1.5rem;
  font-weight: 600;
  color: #666;
  font-size: 0.85rem;
  text-transform: uppercase;
  border-bottom: 1px solid #eee;
}

.admin-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f0f0f0;
}

.cat-name {
  font-weight: 700;
  color: #1a1a1a;
}

.cat-slug code {
  background: #f1f1f1;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.cat-actions {
  display: flex;
  gap: 0.5rem;
}

.btn-delete {
  color: #ff4d4f;
  padding: 0.4rem;
  border-radius: 4px;
  transition: all 0.2s;
}

.btn-delete:hover {
  background: #fff1f0;
  color: #f5222d;
}

.loading-state, .empty-state {
  padding: 4rem;
  text-align: center;
  color: #888;
}

.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
