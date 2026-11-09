<template>
  <div class="page">
    <div class="card">
      <h2 class="section-title">System Configuration</h2>
      <p class="section-sub">Changes take effect immediately and are audited.</p>

      <div v-if="loading" class="loading">Loading...</div>
      <div v-else class="settings-list">
        <div v-for="item in config" :key="item.config_key" class="setting-row">
          <div class="setting-info">
            <div class="setting-key">{{ item.config_key }}</div>
            <div class="setting-desc">{{ item.description }}</div>
            <div class="setting-meta">Type: {{ item.data_type }}</div>
          </div>
          <div class="setting-value">
            <input v-model="item.config_value" class="input" :placeholder="item.config_value" />
            <button class="btn-primary" @click="saveSetting(item)">Save</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() { return { config: [], loading: true } },
  mounted() { this.loadConfig() },
  methods: {
    async loadConfig() {
      try {
        const { data } = await this.$axios.get('/admin/config')
        this.config = data.data || []
      } catch (e) {
        alert('Failed to load config')
      } finally {
        this.loading = false
      }
    },
    async saveSetting(item) {
      if (!confirm(`Update "${item.config_key}" to "${item.config_value}"?`)) return
      try {
        await this.$axios.put('/admin/config', {
          key: item.config_key,
          value: item.config_value,
          dataType: item.data_type,
          description: item.description
        })
        alert('✅ Saved')
      } catch (e) {
        alert(e.response?.data?.message || 'Save failed')
      }
    }
  }
}
</script>

<style scoped>
.page { max-width: 800px; }
.card { background: white; padding: 24px; border-radius: 12px; border: 1px solid #e2e8f0; }
.section-title { font-size: 20px; font-weight: 800; margin: 0 0 8px; color: #0f172a; }
.section-sub { font-size: 13px; color: #64748b; margin: 0 0 24px; }
.setting-row { display: flex; gap: 24px; padding: 16px 0; border-bottom: 1px solid #f1f5f9; align-items: flex-start; }
.setting-row:last-child { border-bottom: none; }
.setting-info { flex: 1; }
.setting-key { font-weight: 700; font-size: 14px; color: #0f172a; font-family: monospace; }
.setting-desc { font-size: 13px; color: #64748b; margin-top: 4px; }
.setting-meta { font-size: 11px; color: #94a3b8; margin-top: 4px; text-transform: uppercase; }
.setting-value { display: flex; gap: 8px; min-width: 300px; }
.input { flex: 1; padding: 8px 12px; border: 1px solid #e2e8f0; border-radius: 8px; font-size: 13px; }
.btn-primary { background: #2563eb; color: white; padding: 8px 16px; border-radius: 8px; font-weight: 600; border: none; cursor: pointer; font-size: 13px; }
.loading { text-align: center; padding: 40px; color: #64748b; }
</style>