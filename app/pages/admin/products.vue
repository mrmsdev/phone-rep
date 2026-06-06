<template>
  <div class="admin-products">
    <div class="page-header">
      <div class="header-content">
        <h1>Products Management</h1>
        <p>Manage your store inventory, prices, and descriptions.</p>
      </div>
      <button @click="showAddForm = !showAddForm" class="btn-toggle-add">
        {{ showAddForm ? 'Cancel' : '+ Add New Product' }}
      </button>
    </div>

    <div v-if="showAddForm" class="add-product-card animate-fade-in">
      <h3>Create New Product</h3>
      <form @submit.prevent="createProduct" class="product-form">
        <div class="form-group">
          <label>Product Title</label>
          <input v-model="newProduct.title" placeholder="e.g., iPhone 15 Pro Max Screen" required />
        </div>
        <div class="form-group">
          <label>Price (MAD)</label>
          <input v-model="newProduct.price" type="number" step="0.01" placeholder="99.99" required />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select v-model="newProduct.categoryId">
            <option :value="null">No Category</option>
            <option v-for="cat in categories" :key="cat.id" :value="cat.id">{{ cat.name }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Product Images</label>
          <div class="upload-wrapper">
            <input type="file" @change="handleFileChange" accept="image/*" class="file-input" id="file-upload" multiple />
            <label for="file-upload" class="file-label">
              <span v-if="!isUploading">Click to upload images (can select multiple)</span>
              <span v-else>Uploading... {{ uploadProgress }}%</span>
            </label>
            <div v-if="newProduct.images.length" class="images-preview-grid">
              <div v-for="(img, index) in newProduct.images" :key="index" class="upload-preview">
                <img :src="img" />
                <button @click.prevent="removeImage(index)" class="btn-remove-img" type="button">×</button>
              </div>
            </div>
          </div>
        </div>
        <div class="form-group full-width">
          <label>Description</label>
          <textarea v-model="newProduct.description" placeholder="A brief description of the product..."></textarea>
        </div>
        <div class="form-actions">
          <button type="submit" :disabled="isSubmitting || isUploading" class="btn-submit">
            {{ isSubmitting ? 'Creating...' : 'Create Product' }}
          </button>
        </div>
      </form>
    </div>

    <div class="products-list-card">
      <div v-if="pending" class="loading-state">Loading products...</div>
      <div v-else-if="products?.length" class="table-container">
        <table class="admin-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="prod in products" :key="prod.id">
              <td class="product-cell">
                <div class="product-info">
                  <div class="product-image-mini">
                    <img :src="prod.images?.[0] || '/images/placeholder.png'" :alt="prod.title" />
                  </div>
                  <div class="product-text">
                    <span class="product-title">{{ prod.title }}</span>
                    <span class="product-id">ID: #{{ prod.id }}</span>
                  </div>
                </div>
              </td>
              <td>
                <span v-if="prod.category" class="category-badge">{{ prod.category.name }}</span>
                <span v-else class="no-category">Uncategorized</span>
              </td>
              <td class="price-cell">MAD{{ prod.price.toFixed(2) }}</td>
              <td class="cat-actions">
                <button @click="deleteProduct(prod.id)" class="btn-delete" title="Delete Product">
                  <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                    <polyline points="3 6 5 6 21 6"></polyline>
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else class="empty-state">
        <p>No products found. Add your first item above!</p>
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
const { data: products, refresh: refreshProducts, pending } = useFetch<any[]>('/api/admin/products')

const showAddForm = ref(false)
const isSubmitting = ref(false)
const isUploading = ref(false)
const uploadProgress = ref(0)
const config = useRuntimeConfig()

const newProduct = ref({
  title: '',
  price: '',
  description: '',
  images: [] as string[],
  categoryId: null as number | null
})

function removeImage(index: number) {
  newProduct.value.images.splice(index, 1)
}

async function handleFileChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files
  if (!files || files.length === 0) return

  for (let i = 0; i < files.length; i++) {
    const file = files.item(i)
    if (file) await uploadImage(file)
  }
}

async function uploadImage(file: File) {
  const cloudName = config.public.cloudinaryCloudName
  const uploadPreset = config.public.cloudinaryUploadPreset

  if (!cloudName || !uploadPreset || cloudName === 'your-cloud-name') {
    alert('Cloudinary is not configured. Please set NUXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NUXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET in .env')
    return
  }

  isUploading.value = true
  uploadProgress.value = 0

  const formData = new FormData()
  formData.append('file', file as any)
  formData.append('upload_preset', uploadPreset)

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: formData
    })

    const data = await response.json()
    if (data.secure_url) {
      // Use optimization parameters for fast loading
      newProduct.value.images.push(data.secure_url.replace('/upload/', '/upload/f_auto,q_auto/'))
    } else {
      throw new Error(data.error?.message || 'Upload failed')
    }
  } catch (err: any) {
    alert('Upload failed: ' + err.message)
  } finally {
    isUploading.value = false
  }
}

async function createProduct() {
  isSubmitting.value = true
  try {
    await $fetch('/api/admin/products', {
      method: 'POST',
      body: newProduct.value
    })
    newProduct.value = { title: '', price: '', description: '', images: [], categoryId: null }
    showAddForm.value = false
    refreshProducts()
  } catch (err) {
    alert('Failed to create product')
  } finally {
    isSubmitting.value = false
  }
}

async function deleteProduct(id: number) {
  if (confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
    await $fetch(`/api/admin/products/${id}`, { method: 'DELETE' })
    refreshProducts()
  }
}
</script>

<style scoped>
.admin-products {
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

.add-product-card {
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  border: 1px solid #eee;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
  margin-bottom: 2rem;
}

.add-product-card h3 {
  margin-bottom: 1.5rem;
  font-size: 1.25rem;
}

.product-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .product-form {
    grid-template-columns: 1fr;
  }
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
  color: #555;
}

.form-group input, .form-group select, .form-group textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group textarea {
  min-height: 100px;
  resize: vertical;
}

.upload-wrapper {
  position: relative;
}

.file-input {
  opacity: 0;
  width: 0.1px;
  height: 0.1px;
  position: absolute;
}

.file-label {
  display: block;
  padding: 0.75rem;
  background: #f8f9fa;
  border: 2px dashed #ddd;
  border-radius: 6px;
  text-align: center;
  cursor: pointer;
  color: #666;
  font-size: 0.9rem;
  transition: all 0.2s;
}

.file-label:hover {
  background: #f1f1f1;
  border-color: #0070f3;
}

.images-preview-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}

.upload-preview {
  position: relative;
  width: 80px;
  height: 80px;
}

.upload-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
  border: 1px solid #eee;
}

.btn-remove-img {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ff4d4f;
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
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

.products-list-card {
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0,0,0,0.05);
}

.table-container {
  overflow-x: auto;
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

.product-cell {
  min-width: 300px;
}

.product-info {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.product-image-mini {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  overflow: hidden;
  background: #f8f9fa;
  border: 1px solid #eee;
  flex-shrink: 0;
}

.product-image-mini img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-text {
  display: flex;
  flex-direction: column;
}

.product-title {
  font-weight: 700;
  color: #1a1a1a;
  line-height: 1.2;
}

.product-id {
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.2rem;
}

.category-badge {
  background: rgba(0, 112, 243, 0.1);
  color: #0070f3;
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 600;
}

.no-category {
  color: #999;
  font-size: 0.85rem;
  font-style: italic;
}

.price-cell {
  font-weight: 600;
  color: #1a1a1a;
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
