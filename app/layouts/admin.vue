<template>
  <div class="admin-layout-wrapper">
    <AdminNavbar :user="user" @logout="handleLogout" />
    <main class="admin-main-content">
      <div class="container">
        <slot />
      </div>
    </main>
    <footer class="admin-footer">
      <div class="container">
        <p>&copy; 2024 MustachPhone Admin Dashboard</p>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
const { data: user } = await useFetch<any>('/api/auth/user')

async function handleLogout() {
  await $fetch('/api/auth/logout', { method: 'POST' })
  navigateTo('/admin/login')
}
</script>

<style scoped>
.admin-layout-wrapper {
  --bg-primary: #f8f9fa;
  --bg-secondary: #ffffff;
  --text-primary: #1a1a1a;
  --text-secondary: #6c757d;
  --border-color: #dee2e6;
  
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

.admin-main-content {
  flex-grow: 1;
  padding: 2rem 0;
}

.admin-footer {
  padding: 1.5rem 0;
  border-top: 1px solid #dee2e6;
  background: #fff;
  text-align: center;
  font-size: 0.9rem;
  color: #6c757d;
}
</style>
