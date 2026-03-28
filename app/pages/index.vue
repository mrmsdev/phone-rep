<template>
  <div>
    <HeroSection />
    
    <!-- Services Banner / Why Choose Us -->
    <section class="services-banner section-padding">
      <div class="container">
        <div class="section-header text-center">
          <h4 class="subtitle">WHY CHOOSE US</h4>
          <h2 class="title">Gadget Repair for Everyone</h2>
          <p class="description">We provide fast, reliable, and affordable repair services right at your location.</p>
        </div>
        
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🛡️</div>
            <h4>Warranty Service</h4>
            <p>All our repairs come with a standard 90-day warranty on parts and labor.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">👨‍🔧</div>
            <h4>Expert Technicians</h4>
            <p>Our team consists of certified professionals with years of experience.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⚡</div>
            <h4>Fast Turnaround</h4>
            <p>Most common repairs are completed in under 60 minutes on-site.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">🔒</div>
            <h4>Data Security</h4>
            <p>Your privacy is guaranteed. We never access your personal data.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Services Preview -->
    <section class="top-services section-padding bg-alt">
      <div class="container">
        <div class="section-header">
          <h4 class="subtitle">OUR EXPERTISE</h4>
          <h2 class="title">Services We Offer</h2>
        </div>
        
        <div class="services-grid">
          <LazyServiceCard 
            title="iPhone Repair" 
            description="Screen replacements, battery swaps, charging port repairs, and water damage diagnostics."
            link="/services#phone"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </template>
          </LazyServiceCard>
          
          <LazyServiceCard 
            title="Tablet Repair" 
            description="Glass digitizer replacements, battery issues, and charging problems solved quickly."
            link="/services#tablet"
          >
            <template #icon>
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>
            </template>
          </LazyServiceCard>
        </div>
        
        <div class="text-center" style="margin-top: 3rem;">
          <NuxtLink to="/services" class="btn-primary">View All Services</NuxtLink>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="cta-section section-padding">
      <div class="container text-center">
        <h2 class="title">Ready to get your device fixed?</h2>
        <p class="description">Call us today or schedule an appointment online. We come to your home or office.</p>
        <NuxtLink to="/contact" class="btn-primary" style="margin-top: 1.5rem;">Schedule Now</NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Home',
  description: 'MustachPhone is your local expert for fast, reliable, and professional phone and tablet screen repair. We come to you!',
})
</script>

<style scoped>
.section-padding {
  padding: var(--spacing-xl) 0;
}

.bg-alt {
  background-color: var(--bg-secondary);
}

.text-center {
  text-align: center;
}

.section-header {
  margin-bottom: var(--spacing-xl);
}

.subtitle {
  color: var(--brand-primary);
  letter-spacing: 2px;
  font-size: 0.9rem;
  margin-bottom: var(--spacing-sm);
}

.title {
  font-size: 2.5rem;
  color: #fff;
  margin-bottom: var(--spacing-md);
}

.description {
  color: var(--text-secondary);
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
}

/* Features Grid */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--spacing-lg);
  margin-top: var(--spacing-xl);
}

.feature-item {
  text-align: center;
  padding: var(--spacing-lg);
  background: var(--bg-secondary);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
  transition: transform var(--transition-normal);
}

.feature-item:hover {
  transform: translateY(-5px);
  border-color: var(--brand-secondary);
}

.feature-icon {
  font-size: 2.5rem;
  margin-bottom: var(--spacing-md);
}

.feature-item h4 {
  color: #fff;
  margin-bottom: var(--spacing-sm);
}

.feature-item p {
  color: var(--text-secondary);
  font-size: 0.95rem;
}

/* Services Grid */
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-lg);
}

/* CTA */
.cta-section {
  background: linear-gradient(135deg, rgba(255, 94, 0, 0.1) 0%, var(--bg-primary) 100%);
  border-top: 1px solid rgba(255, 94, 0, 0.2);
}
</style>
