<template>
  <div class="login-wrapper">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2>Admin Login</h2>
      <div class="input-group">
        <label>Email</label>
        <input v-model="email" type="email" required />
      </div>
      <div class="input-group">
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button :disabled="loading" type="submit">Sign In</button>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  loading.value = true
  error.value = ''
  try {
    await $fetch('/api/auth/login', {
      method: 'POST',
      body: { email: email.value, password: password.value }
    })
    navigateTo('/admin')
  } catch (err: any) {
    if (err?.response?.status === 401 || err?.response?.status === 400) {
      error.value = 'Invalid email or password'
    } else {
      error.value = 'An error occurred during sign in.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f4f4f9;
}
.login-form {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  width: 100%;
  max-width: 400px;
}
.login-form h2 {
  margin-top: 0;
  margin-bottom: 1.5rem;
}
.input-group {
  margin-bottom: 1rem;
}
.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
}
.input-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 0.75rem;
  background: #0070f3;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}
button:disabled {
  background: #ccc;
}
.error {
  color: red;
  margin-top: 1rem;
  text-align: center;
}
</style>
