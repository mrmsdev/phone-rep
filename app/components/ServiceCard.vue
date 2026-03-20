<template>
  <div class="service-card glass-panel">
    <div class="service-icon">
      <slot name="icon"></slot>
    </div>
    <h3 class="service-title">{{ title }}</h3>
    <p class="service-description">{{ description }}</p>
    <NuxtLink :to="link" class="service-link">
      {{ linkText }}
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
    </NuxtLink>
  </div>
</template>

<script setup>
defineProps({
  title: String,
  description: String,
  link: {
    type: String,
    default: '/contact'
  },
  linkText: {
    type: String,
    default: 'Book Repair'
  }
})
</script>

<style scoped>
.service-card {
  padding: var(--spacing-lg);
  transition: all var(--transition-normal);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.service-card:hover {
  transform: translateY(-8px);
  border-color: var(--brand-primary);
  box-shadow: 0 10px 30px rgba(255, 94, 0, 0.1);
}

.service-icon {
  width: 60px;
  height: 60px;
  border-radius: var(--radius-md);
  background: rgba(255, 94, 0, 0.1);
  color: var(--brand-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: var(--spacing-md);
}

.service-title {
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: var(--spacing-sm);
}

.service-description {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin-bottom: var(--spacing-lg);
  flex-grow: 1;
}

.service-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-primary);
  font-weight: 600;
  font-size: 1rem;
}

.service-card:hover .service-link {
  color: var(--brand-primary);
}

.service-link svg {
  transition: transform var(--transition-fast);
}

.service-card:hover .service-link svg {
  transform: translateX(4px);
}
</style>
