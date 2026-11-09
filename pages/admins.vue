<template>
  <div class="page">
    <!-- Header -->
    <div class="toolbar">
      <div>
        <h2 class="section-title">Admin Users</h2>
        <p class="section-sub">{{ admins.length }} admin{{ admins.length === 1 ? '' : 's' }} total</p>
      </div>
      <button class="btn-primary" @click="openCreate">+ Create Admin</button>
    </div>

    <!-- List -->
    <div v-if="loading" class="loading">Loading admins...</div>

    <div v-else-if="admins.length === 0" class="card empty">
      <div class="empty-icon">👤</div>
      <div>No admins yet.</div>
    </div>

    <div v-else class="card">
      <div v-for="a in admins" :key="a.admin_ref" class="admin-row">
        <div class="admin-info">
          <div class="admin-name">
            {{ a.full_name }}
            <span :class="['badge', roleBadge(a.role)]">{{ formatRole(a.role) }}</span>
            <span :class="['badge', a.status === 'ACTIVE' ? 'badge-success' : 'badge-danger']">{{ a.status }}</span>
          </div>
          <div class="admin-email">{{ a.email }}</div>
          <div class="admin-phone" v-if="a.phone">📱 {{ a.phone }}</div>
          <div class="admin-meta">
            Last login: {{ a.last_login_at ? formatDate(a.last_login_at) : 'never' }}
            · Created: {{ formatDate(a.created_at) }}
          </div>
        </div>

        <div class="admin-actions">
          <button class="btn-sm btn-ghost" @click="openResetPassword(a)">Reset Password</button>
          <button
            v-if="a.status === 'ACTIVE'"
            class="btn-sm btn-danger"
            @click="toggleStatus(a, 'SUSPENDED')"
          >
            Suspend
          </button>
          <button
            v-else
            class="btn-sm btn-success"
            @click="toggleStatus(a, 'ACTIVE')"
          >
            Activate
          </button>
        </div>
      </div>
    </div>

    <!-- Create Modal -->
    <div v-if="showCreate" class="modal-backdrop" @click.self="closeCreate">
      <div class="modal">
        <h3>Create New Admin</h3>

        <div class="form-group">
          <label>Email</label>
          <input v-model="form.email" type="email" class="input" placeholder="admin@chenjiloop.com" />
        </div>

        <div class="form-group">
          <label>Full Name</label>
          <input v-model="form.fullName" type="text" class="input" placeholder="Jane Doe" />
        </div>

        <div class="form-group">
          <label>Phone (for SMS Alerts)</label>
          <input v-model="form.phone" type="tel" class="input" placeholder="254712345678" />
        </div>

        <div class="form-group">
          <label>Role</label>
          <select v-model="form.role" class="input">
            <option value="SUPER_ADMIN">Super Admin — full access</option>
            <option value="ADMIN">Admin — full access except managing admins</option>
            <option value="OPS">Operations — suspend wallets, resolve tasks</option>
            <option value="AUDITOR">Auditor — read-only access</option>
            <option value="SUPPORT">Support — read-only (limited)</option>
          </select>
        </div>

        <div class="form-group">
          <label>Password (min 12 chars)</label>
          <input v-model="form.password" type="password" class="input" placeholder="Strong password..." />
        </div>

        <div v-if="error" class="error-box">{{ error }}</div>

        <div class="modal-actions">
          <button class="btn-ghost" @click="closeCreate">Cancel</button>
          <button class="btn-primary" :disabled="creating" @click="createAdmin">
            {{ creating ? 'Creating...' : 'Create Admin' }}
          </button>
        </div>
      </div>
    </div>

    <!-- Reset Password Modal -->
    <div v-if="showReset" class="modal-backdrop" @click.self="closeReset">
      <div class="modal">
        <h3>Reset Password</h3>
        <p class="modal-sub">For: <strong>{{ resetTarget?.full_name }}</strong> ({{ resetTarget?.email }})</p>

        <div class="form-group">
          <label>New Password (min 12 chars)</label>
          <input v-model="resetPassword" type="password" class="input" placeholder="New strong password..." />
        </div>

        <div v-if="error" class="error-box">{{ error }}</div>

        <div class="modal-actions">
          <button class="btn-ghost" @click="closeReset">Cancel</button>
          <button class="btn-primary" :disabled="resetting" @click="doResetPassword">
            {{ resetting ? 'Resetting...' : 'Reset Password' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      admins: [],
      loading: true,
      showCreate: false,
      showReset: false,
      creating: false,
      resetting: false,
      error: null,
      form: { email: '', fullName: '', phone: '', role: 'OPS', password: '' },
      resetTarget: null,
      resetPassword: ''
    }
  },
  mounted() {
    this.loadAdmins()
  },
  methods: {
    async loadAdmins() {
      this.loading = true
      try {
        const { data } = await this.$axios.get('/admin/admins')
        this.admins = data.data || []
      } catch (e) {
        alert(e.response?.data?.message || 'Failed to load admins')
      } finally {
        this.loading = false
      }
    },
    openCreate() {
      this.form = { email: '', fullName: '', phone: '', role: 'OPS', password: '' }
      this.error = null
      this.showCreate = true
    },
    closeCreate() {
      this.showCreate = false
      this.error = null
    },
    async createAdmin() {
      this.error = null
      if (!this.form.email || !this.form.fullName || !this.form.phone || !this.form.password) {
        this.error = 'All fields are required'
        return
      }
      if (!/^254\d{9}$/.test(this.form.phone)) {
        this.error = 'Phone must be in format: 254XXXXXXXXX (e.g. 254712345678)'
        return
      }
      if (this.form.password.length < 12) {
        this.error = 'Password must be at least 12 characters'
        return
      }
      this.creating = true
      try {
        await this.$axios.post('/admin/admins', this.form)
        this.showCreate = false
        await this.loadAdmins()
      } catch (e) {
        this.error = e.response?.data?.message || 'Failed to create admin'
      } finally {
        this.creating = false
      }
    },
    openResetPassword(admin) {
      this.resetTarget = admin
      this.resetPassword = ''
      this.error = null
      this.showReset = true
    },
    closeReset() {
      this.showReset = false
      this.resetTarget = null
      this.resetPassword = ''
      this.error = null
    },
    async doResetPassword() {
      this.error = null
      if (!this.resetPassword || this.resetPassword.length < 12) {
        this.error = 'Password must be at least 12 characters'
        return
      }
      this.resetting = true
      try {
        await this.$axios.post(
          `/admin/admins/${this.resetTarget.admin_ref}/reset-password`,
          { newPassword: this.resetPassword }
        )
        this.showReset = false
        alert('Password reset successfully')
      } catch (e) {
        this.error = e.response?.data?.message || 'Failed to reset password'
      } finally {
        this.resetting = false
      }
    },
    async toggleStatus(admin, newStatus) {
      if (!confirm(`Mark ${admin.full_name} as ${newStatus}?`)) return
      try {
        await this.$axios.patch(
          `/admin/admins/${admin.admin_ref}/status`,
          { status: newStatus }
        )
        await this.loadAdmins()
      } catch (e) {
        alert(e.response?.data?.message || 'Failed to update status')
      }
    },
    formatRole(role) {
      const map = {
        SUPER_ADMIN: 'Super Admin',
        ADMIN: 'Admin',
        OPS: 'Operations',
        AUDITOR: 'Auditor',
        SUPPORT: 'Support'
      }
      return map[role] || role
    },
    roleBadge(role) {
      const map = {
        SUPER_ADMIN: 'badge-danger',
        ADMIN: 'badge-warning',
        OPS: 'badge-info',
        AUDITOR: 'badge-gray',
        SUPPORT: 'badge-gray'
      }
      return map[role] || 'badge-gray'
    },
    formatDate(d) {
      if (!d) return ''
      return new Date(d).toLocaleDateString('en-KE', { dateStyle: 'medium' })
    }
  }
}
</script>

<style scoped>
.page { max-width: 1000px; margin: 0 auto; width: 100%; }

.toolbar { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 20px; 
  gap: 16px; 
  flex-wrap: wrap; 
}
.section-title { font-size: 22px; font-weight: 800; color: #0f172a; margin: 0 0 4px; }
.section-sub { font-size: 13px; color: #64748b; margin: 0; }
.loading { text-align: center; padding: 40px; color: #64748b; }

.card { 
  background: white; 
  border-radius: 12px; 
  border: 1px solid #e2e8f0; 
  overflow: hidden; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.admin-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 16px 20px;
  border-bottom: 1px solid #f1f5f9;
  gap: 16px;
}
.admin-row:last-child { border-bottom: none; }

.admin-info { flex: 1; min-width: 0; }
.admin-name {
  font-weight: 700;
  font-size: 15px;
  color: #0f172a;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}
.admin-email { font-size: 13px; color: #64748b; font-family: monospace; margin-bottom: 4px; }
.admin-phone { font-size: 12px; color: #2563eb; font-family: monospace; font-weight: 600; margin-bottom: 6px; }
.admin-meta { font-size: 11px; color: #94a3b8; }
.admin-actions { display: flex; gap: 8px; flex-shrink: 0; flex-wrap: wrap; }

.badge {
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.badge-success { background: #d1fae5; color: #065f46; }
.badge-warning { background: #fef3c7; color: #92400e; }
.badge-danger  { background: #fee2e2; color: #991b1b; }
.badge-info    { background: #dbeafe; color: #1e40af; }
.badge-gray    { background: #f1f5f9; color: #475569; }

.btn-primary {
  background: #2563eb; color: white;
  padding: 10px 18px; border-radius: 8px;
  font-weight: 600; border: none; cursor: pointer;
}
.btn-primary:hover { background: #3b82f6; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-danger { background: #dc2626; color: white; }
.btn-danger:hover { background: #b91c1c; }
.btn-success { background: #10b981; color: white; }
.btn-success:hover { background: #059669; }
.btn-ghost { background: transparent; border: 1px solid #e2e8f0; color: #64748b; }
.btn-ghost:hover { border-color: #2563eb; color: #2563eb; }
.btn-sm { padding: 6px 12px; border-radius: 6px; font-size: 12px; font-weight: 600; border: none; cursor: pointer; }

.empty { text-align: center; padding: 60px 20px; color: #64748b; }
.empty-icon { font-size: 40px; margin-bottom: 12px; }

/* Modal */
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 23, 42, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 16px;
}
.modal {
  background: white;
  border-radius: 12px;
  padding: 24px;
  width: 100%;
  max-width: 440px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  overflow-y: auto;
}
.modal h3 { margin: 0 0 8px; font-size: 18px; color: #0f172a; }
.modal-sub { font-size: 13px; color: #64748b; margin: 0 0 16px; }
.form-group { margin-bottom: 14px; }
.form-group label {
  display: block; font-size: 12px; font-weight: 700;
  color: #64748b; text-transform: uppercase; margin-bottom: 4px;
}
.input {
  width: 100%; padding: 10px 12px;
  border: 1px solid #e2e8f0; border-radius: 8px;
  font-size: 14px; font-family: inherit; box-sizing: border-box;
  background: #f8fafc;
}
.input:focus { outline: none; border-color: #2563eb; background: white; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.15); }
.error-box {
  background: #fee2e2; color: #991b1b;
  padding: 10px 12px; border-radius: 8px;
  font-size: 13px; margin: 12px 0;
}
.modal-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 20px; }

/* Mobile Responsive */
@media (max-width: 600px) {
  .admin-row { flex-direction: column; gap: 12px; }
  .admin-actions { width: 100%; }
  .admin-actions .btn-sm { flex: 1; padding: 10px; }
  .btn-primary { width: 100%; }
  .toolbar { flex-direction: column; align-items: flex-start; }
}
</style>