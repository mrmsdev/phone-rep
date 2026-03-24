<template>
  <header class="admin-navbar">
    <div class="container admin-navbar-container">
      <div class="admin-navbar-brand">
        <NuxtLink to="/admin" class="admin-logo-link">
          <NuxtImg 
            src="/images/logo.png" 
            alt="MustachPhone Logo" 
            class="admin-mustache-icon" 
            format="webp"
            width="32"
            height="32"
          />
          <span class="admin-logo-text">Mustach<span class="admin-logo-accent">Phone</span> <small class="admin-badge">Admin</small></span>
        </NuxtLink>
      </div>

      <div class="admin-navbar-actions">
        <div class="admin-user-info" v-if="user">
          <span class="admin-welcome">Welcome, {{ user.name }}</span>
          <button @click="handleLogout" class="admin-logout-btn">
            Logout
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const props = defineProps<{
  user?: {
    name: string;
    email: string;
  } | null
}>()

const emit = defineEmits(['logout'])

function handleLogout() {
  emit('logout')
}
</script>

<style scoped>
.admin-navbar {
  background: #1a1a1a;
  color: #ffffff;
  padding: 0.75rem 0;
  border-bottom: 1px solid #333;
}

.admin-navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.admin-logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.admin-mustache-icon {
  width: 32px;
  height: 32px;
}

.admin-logo-text {
  font-size: 1.25rem;
  font-weight: 700;
  color: #fff;
}

.admin-logo-accent {
  color: #0070f3;
}

.admin-badge {
  font-size: 0.7rem;
  background: #333;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  margin-left: 0.5rem;
  vertical-align: middle;
  text-transform: uppercase;
}

.admin-navbar-actions {
  display: flex;
  align-items: center;
}

.admin-user-info {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.admin-welcome {
  font-size: 0.9rem;
  color: #ccc;
}

.admin-logout-btn {
  padding: 0.4rem 1rem;
  background: #333;
  color: #fff;
  border: 1px solid #444;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: all 0.2s;
}

.admin-logout-btn:hover {
  background: #444;
  border-color: #555;
}
</style>
