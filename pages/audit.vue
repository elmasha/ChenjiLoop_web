<template>
  <div class="page">
    <div class="card">
      <h2 class="section-title">Audit Log</h2>
      <form @submit.prevent="search" class="search-form">
        <select v-model="action" class="input">
          <option value="">All actions</option>
          <option value="LOGIN_SUCCESS">Login Success</option>
          <option value="WALLET_CREATED">Wallet Created</option>
          <option value="PIN_SET">PIN Set</option>
          <option value="CHANGE_TRANSFER_POSTED">Change Posted</option>
          <option value="C2C_TRANSFER_POSTED">C2C Posted</option>
          <option value="WALLET_STATUS_CHANGED">Status Changed</option>
          <option value="WALLET_MANUAL_ADJUSTMENT">Manual Adjustment</option>
          <option value="TXN_FORCE_RESOLVED">Txn Force Resolved</option>
          <option value="CONFIG_UPDATED">Config Updated</option>
        </select>
        <button type="submit" class="btn-primary">Search</button>
      </form>
    </div>

    <div v-if="results.length > 0" class="card">
      <div v-for="entry in results" :key="entry.event_ref" class="audit-row">
        <div class="audit-main">
          <div class="audit-action">{{ entry.action }}</div>
          <div class="audit-meta">
            {{ entry.actor_type }} · {{ entry.entity_type }}
            <span v-if="entry.entity_id">#{{ entry.entity_id }}</span>
          </div>
          <div class="audit-time">{{ formatDate(entry.created_at) }}</div>
        </div>
        <div v-if="entry.after_state" class="audit-state mono">
          {{ JSON.stringify(entry.after_state) }}
        </div>
      </div>
    </div>
    <div v-else-if="searched" class="card empty">No audit entries found.</div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() { return { action: '', results: [], searched: false } },
  methods: {
    formatDate(d) {
      if (!d) return ''
      return new Date(d).toLocaleString('en-KE')
    },
    async search() {
      try {
        const { data } = await this.$axios.get('/admin/audit', { params: { action: this.action, limit: 100 } })
        this.results = data.data || []
        this.searched = true
      } catch (e) {
        alert('Search failed')
      }
    }
  }
}
</script>

<style scoped>
.page { max-width: 1000px; }
.card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 24px; }
.section-title { font-size: 18px; font-weight: 800; margin: 0 0 20px; }
.search-form { display: flex; gap: 12px; }
.input { flex: 1; padding: 10px 14px; border: 1px solid #e2e8f0; border-radius: 8px; }
.btn-primary { background: #2563eb; color: white; padding: 10px 20px; border-radius: 8px; font-weight: 600; border: none; cursor: pointer; }
.audit-row { display: flex; justify-content: space-between; padding: 14px 0; border-bottom: 1px solid #f1f5f9; }
.audit-row:last-child { border-bottom: none; }
.audit-action { font-weight: 700; font-size: 14px; color: #0f172a; }
.audit-meta { font-size: 12px; color: #64748b; margin-top: 4px; }
.audit-time { font-size: 11px; color: #94a3b8; margin-top: 4px; }
.audit-state { font-size: 11px; color: #475569; background: #f8fafc; padding: 8px; border-radius: 6px; max-width: 400px; overflow-x: auto; }
.mono { font-family: monospace; }
.empty { text-align: center; padding: 40px; color: #64748b; }
</style>