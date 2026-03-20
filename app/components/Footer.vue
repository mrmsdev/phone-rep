<template>
  <footer class="footer">
    <div class="container footer-container">
      <div class="footer-brand">
        <div class="footer-logo">
          <NuxtImg 
            src="/images/logo.png" 
            alt="MustachPhone Logo" 
            class="mustache-icon" 
            format="webp"
            width="44"
            height="44"
            loading="lazy"
          />
          <span class="logo-text">Mustach<span class="logo-accent">Phone</span></span>
        </div>
        <p class="footer-desc">
          Professional on-site device repair at your convenience. We bring the experts to you.
        </p>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <h3>Services</h3>
          <NuxtLink to="/services">Phone Repair</NuxtLink>
          <NuxtLink to="/services">Tablet Repair</NuxtLink>
          <NuxtLink to="/services">Laptop Repair</NuxtLink>
        </div>
        <div class="link-group">
          <h3>Company</h3>
          <NuxtLink to="/contact">About Us</NuxtLink>
          <NuxtLink to="/contact">Contact</NuxtLink>
          <NuxtLink to="/services">Terms of Service</NuxtLink>
        </div>
      </div>

      <div class="footer-contact">
        <h3>Contact Us</h3>
        <p>1 (800) 123-4567</p>
        <p>support@mustachphone.email</p>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 MustachPhone. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-color);
  padding-top: var(--spacing-xl);
  margin-top: auto; /* Pushes footer to bottom */
}

.footer-container {
  display: grid;
  grid-template-columns: 2fr 3fr 1fr;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-xl);
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: var(--spacing-md);
}

.mustache-icon {
  width: 44px;
  height: 44px;
  object-fit: contain;
}

.footer-logo .logo-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.footer-logo .logo-accent {
  color: var(--brand-primary);
}

.footer-desc {
  color: var(--text-secondary);
  max-width: 300px;
}

.footer-links {
  display: flex;
  gap: var(--spacing-xl);
  justify-content: space-around;
}

.link-group h3, .footer-contact h3 {
  font-size: 1.1rem;
  color: #fff;
  margin-bottom: var(--spacing-md);
}

.link-group a {
  display: block;
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.link-group a:hover {
  color: var(--brand-primary);
}

.footer-contact p {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-sm);
}

.footer-bottom {
  text-align: center;
  padding: var(--spacing-md) 0;
  border-top: 1px solid var(--border-color);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
  }
  .footer-links {
    justify-content: flex-start;
  }
}
</style>
