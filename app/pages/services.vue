<template>
  <div class="page-container">
    <div class="page-header">
      <div class="container text-center">
        <h1 class="page-title">Our Repair Services</h1>
        <p class="page-description">We specialize in repairing a wide range of devices. From shattered screens to dead batteries, our experts handle it all on-site.</p>
      </div>
    </div>
    
    <div class="container section-padding">
      <div class="services-list">
        
        <!-- Phone Repairs -->
        <div class="service-category" id="phone">
          <div class="category-info">
            <h2>Phone Repairs</h2>
            <p>We repair all major brands including Apple iPhone, Samsung Galaxy, Google Pixel, and more.</p>
            <ul class="service-details-list">
              <li>Screen & Glass Replacement</li>
              <li>Battery Replacement</li>
              <li>Charging Port Repair</li>
              <li>Water Damage Diagnostic</li>
              <li>Camera Repair</li>
            </ul>
            <NuxtLink to="/contact" class="btn-primary mt-4">Book Phone Repair</NuxtLink>
          </div>
          <div class="category-image glass-panel">
            <div class="placeholder-img" style="background-image: url('/images/hero.png'); background-position: right;"></div>
          </div>
        </div>
        
        <!-- Laptop Repairs -->
        <div class="service-category reverse" id="laptop">
          <div class="category-info">
            <h2>Laptop Repairs</h2>
            <p>Expert logic board and hardware repairs for MacBooks and PC laptops.</p>
            <ul class="service-details-list">
              <li>LCD/Screen Replacement</li>
              <li>Keyboard Replacement</li>
              <li>Battery & Power Issues</li>
              <li>Data Recovery & Backup</li>
              <li>Motherboard Micro-soldering</li>
            </ul>
            <NuxtLink to="/contact" class="btn-primary mt-4">Book Laptop Repair</NuxtLink>
          </div>
          <div class="category-image glass-panel">
            <div class="placeholder-img" style="background-image: url('/images/laptop_repair.png');"></div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Repair Services',
  description: 'Explore our complete list of on-site repair services for phones, tablets, and laptops. We replace screens, batteries, ports, and logic boards.',
})
</script>

<style scoped>
.page-container {
  padding-top: 100px; /* offset navbar */
}

.page-header {
  padding: var(--spacing-xl) 0;
  background: var(--bg-secondary);
  border-bottom: 1px solid var(--border-color);
}

.text-center {
  text-align: center;
}

.page-title {
  font-size: 3.5rem;
  color: #fff;
  margin-bottom: var(--spacing-sm);
}

.page-description {
  color: var(--text-secondary);
  font-size: 1.2rem;
  max-width: 700px;
  margin: 0 auto;
}

.section-padding {
  padding: var(--spacing-xl) var(--spacing-md);
}

.services-list {
  display: flex;
  flex-direction: column;
  gap: 6rem;
}

.service-category {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
}

.service-category.reverse {
  direction: rtl;
}

.service-category.reverse > * {
  direction: ltr; /* Reset text direction inside */
}

.category-info h2 {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: var(--spacing-md);
}

.category-info p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
}

.service-details-list {
  list-style-type: none;
  padding: 0;
  margin-bottom: var(--spacing-lg);
}

.service-details-list li {
  padding: 0.5rem 0;
  color: var(--text-primary);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border-bottom: 1px solid var(--border-color);
}

.service-details-list li::before {
  content: '✓';
  color: var(--brand-primary);
  font-weight: bold;
}

.category-image {
  height: 400px;
  overflow: hidden;
  border-radius: var(--radius-lg);
}

.placeholder-img {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: transform 0.5s ease;
}

.category-image:hover .placeholder-img {
  transform: scale(1.05);
}

.mt-4 {
  margin-top: 1rem;
}

@media (max-width: 900px) {
  .service-category {
    grid-template-columns: 1fr;
  }
  .service-category.reverse {
    direction: ltr;
  }
  .category-image {
    height: 300px;
    order: -1; /* Image always on top on mobile */
  }
}
</style>
