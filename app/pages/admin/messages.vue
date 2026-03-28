<template>
  <div class="admin-messages">
    <div class="page-header">
      <h1>Contact Messages</h1>
      <p>Manage inquiries from your customers.</p>
    </div>

    <div class="messages-list glass-panel" v-if="messages && messages.length > 0">
      <div v-for="msg in messages" :key="msg.id" class="message-card" :class="{ 'unread': !msg.isRead }">
        <div class="message-header">
          <div class="sender-info">
            <h3>{{ msg.name }}</h3>
            <span class="device-tag">{{ msg.device }}</span>
          </div>
          <div class="message-meta">
            <span class="date">{{ formatDate(msg.createdAt) }}</span>
            <div class="actions">
              <button v-if="!msg.isRead" @click="markAsRead(msg.id)" class="btn-icon" title="Mark as Read">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </button>
              <button @click="deleteMessage(msg.id)" class="btn-icon delete" title="Delete Message">
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none">
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div class="message-body">
          <div class="contact-details">
            <p><strong>Email:</strong> <a :href="'mailto:' + msg.email">{{ msg.email }}</a></p>
            <p><strong>Phone:</strong> <a :href="'tel:' + msg.phone">{{ msg.phone }}</a></p>
          </div>
          <p class="message-text" v-if="msg.message">{{ msg.message }}</p>
          <p class="message-text empty" v-else>No message content provided.</p>
        </div>
      </div>
    </div>
    <div class="empty-state glass-panel" v-else>
      <p>No messages found.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'admin'
})

const { data: messages, refresh } = await useFetch<any[]>('/api/admin/messages')

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const markAsRead = async (id: number) => {
  try {
    await $fetch(`/api/admin/messages/${id}/read`, { method: 'PATCH' })
    refresh()
  } catch (error) {
    alert('Failed to update message status.')
  }
}

const deleteMessage = async (id: number) => {
  if (!confirm('Are you sure you want to delete this message?')) return
  try {
    await $fetch(`/api/admin/messages/${id}`, { method: 'DELETE' })
    refresh()
  } catch (error) {
    alert('Failed to delete message.')
  }
}
</script>

<style scoped>
.page-header {
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #1a1a1a;
}

.messages-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  background: #fff;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #eee;
}

.message-card {
  padding: 1.5rem;
  border-radius: 10px;
  border: 1px solid #f0f0f0;
  background: #fafafa;
  transition: all 0.2s;
}

.message-card.unread {
  border-left: 4px solid #0070f3;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0,0,0,0.02);
}

.message-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1rem;
}

.sender-info h3 {
  margin: 0;
  font-size: 1.2rem;
  color: #1a1a1a;
}

.device-tag {
  display: inline-block;
  font-size: 0.8rem;
  background: #e9ecef;
  color: #495057;
  padding: 0.2rem 0.6rem;
  border-radius: 4px;
  margin-top: 0.4rem;
  font-weight: 600;
}

.message-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.5rem;
}

.date {
  font-size: 0.85rem;
  color: #888;
}

.actions {
  display: flex;
  gap: 0.5rem;
}

.btn-icon {
  background: none;
  border: 1px solid #ddd;
  padding: 0.4rem;
  border-radius: 6px;
  cursor: pointer;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.btn-icon:hover {
  background: #f0f0f0;
  color: #0070f3;
  border-color: #0070f3;
}

.btn-icon.delete:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
  background: #fff1f0;
}

.message-body {
  border-top: 1px solid #eee;
  padding-top: 1rem;
}

.contact-details {
  display: flex;
  gap: 2rem;
  margin-bottom: 1rem;
  font-size: 0.95rem;
}

.contact-details p {
  margin: 0;
}

.contact-details a {
  color: #0070f3;
  text-decoration: none;
}

.message-text {
  color: #444;
  line-height: 1.6;
  white-space: pre-wrap;
  margin: 0;
}

.message-text.empty {
  font-style: italic;
  color: #999;
}

.empty-state {
  text-align: center;
  padding: 4rem;
  background: #fff;
  border-radius: 12px;
  color: #888;
  border: 1px solid #eee;
}
</style>
