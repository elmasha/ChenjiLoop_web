<template>
  <div class="page">
    <div v-if="loading" class="loading">Loading tasks...</div>
    <div v-else>
      <div v-if="tasks.length === 0" class="card empty">
        <div class="icon">🎉</div>
        <h3>All clear</h3>
        <p>No pending operations tasks.</p>
      </div>

      <div v-else class="tasks-grid">
        <div v-for="t in tasks" :key="t.task_ref" :class="['card', 'task-card', `priority-${t.priority}`]">
          <div class="task-header">
            <div class="task-priority">{{ t.priority }}</div>
            <div class="task-type">{{ t.task_type }}</div>
          </div>
          <h3 class="task-title">{{ t.title }}</h3>
          <p class="task-desc">{{ t.description }}</p>
          <div v-if="t.related_txn_ref" class="task-ref mono">TXN: {{ t.related_txn_ref }}</div>
          <div class="task-footer">
            <span :class="['badge', t.status === 'OPEN' ? 'badge-warning' : 'badge-info']">{{ t.status }}</span>
            <div class="task-actions">
              <button v-if="t.status === 'OPEN'" class="btn-sm btn-primary" @click="update(t.task_ref, 'IN_PROGRESS')">Start</button>
              <button v-if="t.status === 'IN_PROGRESS'" class="btn-sm btn-success" @click="update(t.task_ref, 'RESOLVED')">Resolve</button>
              <button class="btn-sm btn-ghost" @click="update(t.task_ref, 'IGNORED')">Ignore</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() { return { tasks: [], loading: true } },
  mounted() { this.fetchTasks() },
  methods: {
    async fetchTasks() {
      this.loading = true
      try {
        const { data } = await this.$axios.get('/admin/tasks')
        this.tasks = data.data || []
      } catch (e) {
        console.error('Failed:', e)
      } finally {
        this.loading = false
      }
    },
    async update(taskRef, newStatus) {
      try {
        await this.$axios.patch(`/admin/tasks/${taskRef}`, { status: newStatus })
        this.fetchTasks()
      } catch (e) {
        alert('Update failed')
      }
    }
  }
}
</script>

<style scoped>
.page { max-width: 900px; }
.loading { text-align: center; padding: 60px; }
.tasks-grid { display: flex; flex-direction: column; gap: 12px; }
.card { background: white; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
.task-card { border-left: 4px solid #2563eb; }
.priority-CRITICAL { border-left-color: #dc2626; background: #fef2f2; }
.priority-HIGH { border-left-color: #f59e0b; }
.task-header { display: flex; gap: 12px; margin-bottom: 8px; }
.task-priority { font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px; background: #f1f5f9; color: #475569; }
.task-type { font-size: 11px; color: #64748b; font-weight: 600; }
.task-title { font-size: 16px; font-weight: 800; margin: 0 0 6px; color: #0f172a; }
.task-desc { font-size: 13px; color: #64748b; margin: 0 0 12px; }
.task-ref { font-size: 11px; color: #2563eb; background: #eff6ff; padding: 4px 8px; border-radius: 4px; display: inline-block; }
.task-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 16px; }
.task-actions { display: flex; gap: 8px; }
.btn-sm { padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; }
.btn-primary { background: #2563eb; color: white; }
.btn-success { background: #10b981; color: white; }
.btn-ghost { background: transparent; border: 1px solid #e2e8f0; color: #64748b; }
.badge { padding: 2px 8px; border-radius: 4px; font-size: 10px; font-weight: 700; text-transform: uppercase; }
.badge-warning { background: #fef3c7; color: #92400e; }
.badge-info { background: #dbeafe; color: #1e40af; }
.empty { text-align: center; padding: 60px; }
.empty .icon { font-size: 40px; margin-bottom: 12px; }
.empty h3 { font-size: 18px; color: #0f172a; margin: 0 0 6px; }
.empty p { color: #64748b; margin: 0; }
.mono { font-family: monospace; }
</style>