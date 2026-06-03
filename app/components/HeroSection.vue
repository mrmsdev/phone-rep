<template>
  <section class="hero-section">
    <div class="hero-bg">
      <div class="hero-image-wrapper">
          <NuxtImg 
            src="/images/hero.png" 
            alt="Professional Device Repair" 
            class="hero-image"
            preload
            format="webp"
            sizes="sm:100vw md:50vw lg:600px"
          />
          <div class="glow-effect"></div>
        </div>
      <div class="hero-overlay"></div>
    </div>
    
    <div class="container hero-content">
      <div class="hero-text animate-fade-in">
        <h4 class="hero-subtitle">WELCOME TO MUSTACHPHONE</h4>
        <h1 class="hero-title">
          Don't Delay,<br />
          <span class="text-accent">Repair Today.</span>
        </h1>
        <p class="hero-description">
          Trust MustachPhone - We mustache you to trust our pros!
          <br /><br />
          Don't let technical troubles slow you down. At MustachPhone, we're here to breathe new life into your devices, swiftly & seamlessly. We come to you.
        </p>
        
        <div class="hero-actions">
          <NuxtLink to="/services" class="btn-primary">
            Schedule Repair 
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </NuxtLink>
          <NuxtLink to="/contact" class="btn-secondary">
            Get a Quote
          </NuxtLink>
        </div>
      </div>
      
      <div class="hero-stats animate-fade-in" style="animation-delay: 0.2s;">
        <div class="stat-card glass-panel">
          <h2 class="stat-number">34.5k <span class="text-accent">+</span></h2>
          <p class="stat-label">CLIENTS SERVED</p>
          <div class="stat-divider"></div>
          <div class="expert-profile">
            <div class="expert-avatar"></div>
            <p class="expert-text">
              Our experts are ready to diagnose your device completely free. <strong>Write us!</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 80px; /* Offset for navbar */
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.hero-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: right center; /* Focus on the glowing phone on the right */
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, var(--bg-primary) 0%, var(--bg-primary) 40%, rgba(10, 10, 12, 0.4) 100%);
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: center;
  position: relative;
  z-index: 10;
}

.hero-subtitle {
  color: var(--brand-primary);
  font-size: 0.9rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: var(--spacing-md);
}

.hero-title {
  font-size: 4.5rem;
  line-height: 1.1;
  font-weight: 700;
  margin-bottom: var(--spacing-lg);
  color: #fff;
}

.text-accent {
  color: var(--brand-primary);
}

.hero-description {
  font-size: 1.1rem;
  color: var(--text-secondary);
  max-width: 500px;
  margin-bottom: var(--spacing-xl);
}

.hero-actions {
  display: flex;
  gap: var(--spacing-md);
  align-items: center;
}

.stat-card {
  padding: var(--spacing-xl);
  max-width: 400px;
  margin-left: auto;
}

.stat-number {
  font-size: 4rem;
  line-height: 1;
  margin-bottom: var(--spacing-sm);
  color: #fff;
}

.stat-label {
  font-size: 0.9rem;
  letter-spacing: 2px;
  color: var(--text-secondary);
  text-transform: uppercase;
}

.stat-divider {
  height: 1px;
  background: var(--glass-border);
  margin: var(--spacing-lg) 0;
}

.expert-profile {
  display: flex;
  gap: var(--spacing-md);
  align-items: flex-start;
}

.expert-avatar {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--bg-tertiary); /* Placeholder avatar */
  flex-shrink: 0;
}

.expert-text {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.expert-text strong {
  color: #fff;
}

@media (max-width: 992px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    padding-top: var(--spacing-xl);
  }
  
  .hero-overlay {
    background: linear-gradient(180deg, rgba(10, 10, 12, 0.7) 0%, var(--bg-primary) 100%);
  }
  
  .hero-description {
    margin: 0 auto var(--spacing-lg);
  }
  
  .hero-actions {
    justify-content: center;
    margin-bottom: var(--spacing-xl);
  }
  
  .stat-card {
    margin: 0 auto;
  }
  
  .hero-title {
    font-size: 3.5rem;
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: 2.5rem;
  }
  
  .hero-actions {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary, .btn-secondary {
    width: 100%;
  }
}
</style>
