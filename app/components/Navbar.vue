<template>
  <header :class="['navbar', { 'navbar--scrolled': isScrolled }]">
    <div class="container navbar-container">
      <div class="navbar-logo">
        <NuxtLink to="/" class="logo-link">
          <NuxtImg 
            src="/images/logo.png" 
            alt="MustachPhone Logo" 
            class="mustache-icon" 
            format="webp"
            width="44"
            height="44"
          />
          <span class="logo-text">Mustach<span class="logo-accent">Phone</span></span>
        </NuxtLink>
      </div>

      <nav class="navbar-links">
        <NuxtLink to="/" class="nav-link">Home</NuxtLink>
        <NuxtLink to="/services" class="nav-link">Services</NuxtLink>
        <NuxtLink to="/store" class="nav-link">Store</NuxtLink>
        <NuxtLink to="/contact" class="nav-link">Contact</NuxtLink>
      </nav>

      <div class="navbar-actions">
        <NuxtLink to="/cart" class="cart-link" aria-label="Cart">
          <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          <span class="cart-badge" v-if="cartItemCount > 0">{{ cartItemCount }}</span>
        </NuxtLink>
        <NuxtLink to="/contact" class="btn-primary">Get a Quote</NuxtLink>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '~/composables/useCart'

const { cartItemCount } = useCart()
const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.addEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  padding: 1.5rem 0;
  transition: all var(--transition-normal);
  background: transparent;
}

.navbar--scrolled {
  padding: 1rem 0;
  background: var(--glass-bg);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border-bottom: 1px solid var(--glass-border);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
}

.navbar-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.navbar-logo .logo-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.mustache-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.navbar-logo .logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}

.navbar-logo .logo-accent {
  color: var(--brand-primary);
}

.navbar-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  font-weight: 500;
  font-size: 1rem;
  color: var(--text-primary);
  opacity: 0.8;
  position: relative;
}

.nav-link:hover,
.nav-link.router-link-active {
  color: var(--brand-primary);
  opacity: 1;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--brand-primary);
  transition: width var(--transition-fast);
}

.nav-link:hover::after,
.nav-link.router-link-active::after {
  width: 100%;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.cart-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  transition: transform var(--transition-fast), color var(--transition-fast);
}

.cart-link:hover {
  transform: scale(1.1);
  color: var(--brand-primary);
}

.cart-link.router-link-active {
  color: var(--brand-primary);
}

.cart-badge {
  position: absolute;
  top: -8px;
  right: -10px;
  background: var(--brand-primary);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--bg-primary);
}

@media (max-width: 768px) {
  .navbar-links {
    display: none; /* Hide on mobile for now, add hamburger menu later */
  }
}
</style>
