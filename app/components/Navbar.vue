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
        <NuxtLink to="/contact" class="btn-primary desktop-only-btn">Get a Quote</NuxtLink>
        
        <button class="burger-menu-btn" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen" aria-label="Toggle menu">
          <span class="burger-bar" :class="{ 'open': isMobileMenuOpen }"></span>
          <span class="burger-bar" :class="{ 'open': isMobileMenuOpen }"></span>
          <span class="burger-bar" :class="{ 'open': isMobileMenuOpen }"></span>
        </button>
      </div>
    </div>

    <!-- Mobile Menu Drawer -->
    <div :class="['mobile-menu', { 'mobile-menu--open': isMobileMenuOpen }]">
      <nav class="mobile-menu-links">
        <NuxtLink to="/" class="mobile-nav-link" @click="closeMobileMenu">Home</NuxtLink>
        <NuxtLink to="/services" class="mobile-nav-link" @click="closeMobileMenu">Services</NuxtLink>
        <NuxtLink to="/store" class="mobile-nav-link" @click="closeMobileMenu">Store</NuxtLink>
        <NuxtLink to="/contact" class="mobile-nav-link" @click="closeMobileMenu">Contact</NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useCart } from '~/composables/useCart'

const { cartItemCount } = useCart()
const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
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
    display: none;
  }
  .desktop-only-btn {
    display: none !important;
  }
  .burger-menu-btn {
    display: flex !important;
  }
}

/* Burger menu button styling */
.burger-menu-btn {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: transparent;
  border: none;
  cursor: pointer;
  z-index: 1100;
}

.burger-bar {
  width: 100%;
  height: 2px;
  background-color: var(--text-primary);
  transition: all var(--transition-fast);
}

.burger-bar.open:nth-child(1) {
  transform: translateY(8px) rotate(45deg);
}

.burger-bar.open:nth-child(2) {
  opacity: 0;
}

.burger-bar.open:nth-child(3) {
  transform: translateY(-8px) rotate(-45deg);
}

/* Mobile Menu Panel */
.mobile-menu {
  position: fixed;
  top: 0;
  right: -100%;
  width: 280px;
  height: 100vh;
  background: var(--bg-secondary);
  border-left: 1px solid var(--border-color);
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.5);
  padding: 6rem 2rem 2rem;
  display: flex;
  flex-direction: column;
  transition: right var(--transition-normal);
  z-index: 1050;
}

.mobile-menu--open {
  right: 0;
}

.mobile-menu-links {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.mobile-nav-link {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-primary);
  opacity: 0.8;
  transition: all var(--transition-fast);
}

.mobile-nav-link:hover,
.mobile-nav-link.router-link-active {
  color: var(--brand-primary);
  opacity: 1;
  padding-left: 0.5rem;
}
</style>
