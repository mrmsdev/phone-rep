<template>
  <div class="page-container">
    <div class="page-header">
      <div class="container text-center">
        <h1 class="page-title">Contact Us</h1>
        <p class="page-description">Get in touch with our experts. We're here to answer any questions or schedule your on-site repair.</p>
      </div>
    </div>
    
    <div class="container section-padding">
      <div class="contact-grid">
        <!-- Contact Info -->
        <div class="contact-info">
          <div class="info-card glass-panel">
            <h3>Let Us Know Or Call Us At</h3>
            <p class="phone-number">+1 (800) 123-4567</p>
            <p class="info-detail">support@mustachphone.email</p>
            
            <hr class="divider"/>
            
            <h3>Operating Hours</h3>
            <ul class="hours-list">
              <li><span>Monday - Friday:</span> <span>8:00 AM - 8:00 PM</span></li>
              <li><span>Saturday:</span> <span>9:00 AM - 6:00 PM</span></li>
              <li><span>Sunday:</span> <span>Closed</span></li>
            </ul>
            
            <hr class="divider"/>
            
            <h3>Service Area</h3>
            <p class="info-detail">We currently provide on-site repair services across the greater metropolitan area. Call to confirm if we serve your zip code.</p>
          </div>
        </div>
        
        <!-- Contact Form -->
        <div class="contact-form-wrap glass-panel">
          <h2>Send a Request</h2>
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">Name</label>
              <input type="text" id="name" v-model="formData.name" placeholder="Your full name" required />
            </div>
            
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="formData.email" placeholder="Your email address" required />
            </div>
            
            <div class="form-group">
              <label for="phone">Phone Number</label>
              <input type="tel" id="phone" v-model="formData.phone" placeholder="Your phone number" required />
            </div>
            
            <div class="form-group">
              <label for="device">Device & Issue</label>
              <input type="text" id="device" v-model="formData.device" placeholder="e.g. iPhone 13 Pro Max - Cracked Screen" required />
            </div>
            
            <div class="form-group">
              <label for="message">Additional Details</label>
              <textarea id="message" v-model="formData.message" rows="5" placeholder="Please describe the issue in detail..."></textarea>
            </div>
            
            <button type="submit" class="btn-primary form-submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSeoMeta } from '#imports'

useSeoMeta({
  title: 'Contact Us',
  description: 'Get in touch with MustachPhone to schedule your fast, reliable on-site device repair. Contact us via phone, email, or our online form.',
})

const formData = ref({
  name: '',
  email: '',
  phone: '',
  device: '',
  message: ''
})

const submitting = ref(false)

const submitForm = async () => {
  submitting.value = true
  try {
    const response = await $fetch('/api/contact', {
      method: 'POST',
      body: formData.value
    })
    
    alert('Thank you! Your request has been sent. We will contact you shortly.')
    
    // Reset form
    formData.value = {
      name: '',
      email: '',
      phone: '',
      device: '',
      message: ''
    }
  } catch (error: any) {
    alert(error.statusMessage || 'An error occurred while sending your request. Please try again or call us directly.')
  } finally {
    submitting.value = false
  }
}
</script>

<style scoped>
.page-container {
  padding-top: 100px;
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

.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-xl);
  align-items: start;
}

.info-card {
  padding: var(--spacing-xl);
}

.info-card h3 {
  color: #fff;
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
}

.phone-number {
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--brand-primary);
  margin-bottom: var(--spacing-sm);
}

.info-detail {
  color: var(--text-secondary);
  font-size: 1.1rem;
}

.divider {
  border: 0;
  height: 1px;
  background: var(--glass-border);
  margin: var(--spacing-lg) 0;
}

.hours-list {
  list-style: none;
  padding: 0;
}

.hours-list li {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: var(--text-secondary);
  border-bottom: 1px dashed var(--border-color);
}

.hours-list li:last-child {
  border-bottom: none;
}

.contact-form-wrap {
  padding: var(--spacing-xl);
}

.contact-form-wrap h2 {
  color: #fff;
  font-size: 2rem;
  margin-bottom: var(--spacing-lg);
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  color: var(--text-primary);
  font-weight: 500;
}

input, textarea {
  width: 100%;
  padding: 1rem;
  background: rgba(10, 10, 12, 0.5);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  color: #fff;
  font-family: inherit;
  font-size: 1rem;
  transition: all var(--transition-fast);
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--brand-primary);
  box-shadow: 0 0 0 2px rgba(255, 94, 0, 0.2);
}

.form-submit {
  margin-top: var(--spacing-md);
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
}

@media (max-width: 900px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
