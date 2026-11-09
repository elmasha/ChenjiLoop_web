<template>
  <div class="page">
    <div class="toolbar">
      <form @submit.prevent="fetchWallets" class="search-form">
        <input v-model="search" type="text" class="input" placeholder="Search MSISDN or name..." />
        <button type="submit" class="btn-primary">Search</button>
      </form>
      <div class="stats">
        {{ wallets.length }} result{{ wallets.length === 1 ? '' : 's' }}
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="!searched && loading" class="empty">Loading wallets...</div>

    <template v-else>
      <!-- DESKTOP TABLE VIEW (Hidden on mobile) -->
      <div class="table-wrap desktop-only">
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>MSISDN</th>
              <th>Name</th>
              <th>Status</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="w in wallets" :key="w.wallet_ref" @click="inspect(w.wallet_ref)">
              <td>
                <span :class="['badge', w.wallet_type === 'MERCHANT' ? 'badge-info' : 'badge-success']">
                  {{ w.wallet_type }}
                </span>
              </td>
              <td class="mono">{{ w.msisdn }}</td>
              <td>{{ w.display_name || '—' }}</td>
              <td>
                <span :class="['badge', w.status === 'ACTIVE' ? 'badge-success' : 'badge-danger']">
                  {{ w.status }}
                </span>
              </td>
              <td class="small">{{ formatDate(w.created_at) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- MOBILE CARD VIEW (Hidden on desktop) -->
      <div class="mobile-only wallet-list">
        <div v-for="w in wallets" :key="w.wallet_ref" class="wallet-card" @click="inspect(w.wallet_ref)">
          
          <div class="card-top">
            <div class="wallet-name">{{ w.display_name || 'No Name' }}</div>
            <span :class="['badge', w.wallet_type === 'MERCHANT' ? 'badge-info' : 'badge-success']">
              {{ w.wallet_type }}
            </span>
          </div>
          
          <div class="card-mid mono">
            {{ w.msisdn }}
          </div>

          <div class="card-bottom">
            <div class="wallet-date">Created {{ formatDate(w.created_at) }}</div>
            <span :class="['badge', w.status === 'ACTIVE' ? 'badge-success' : 'badge-danger']">
              {{ w.status }}
            </span>
          </div>
          
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="wallets.length === 0" class="empty">
        No wallets found{{ search ? ' for "' + search + '"' : '' }}.
      </div>
    </template>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() { 
    return { 
      search: '', 
      wallets: [], 
      page: 1, 
      searched: false,
      loading: true
    } 
  },
  mounted() { 
    this.fetchWallets() 
  },
  methods: {
    formatDate(d) {
      if (!d) return ''
      return new Date(d).toLocaleDateString('en-KE', { dateStyle: 'medium' })
    },
    async fetchWallets() {
      this.loading = true
      try {
        const params = { page: this.page }
        if (this.search && this.search.trim()) {
          params.msisdn = this.search.trim()
        }
        
        const { data } = await this.$axios.get('/admin/wallets', { params })
        this.wallets = data.data || []
        this.searched = true
      } catch (e) {
        alert(e.response?.data?.message || 'Failed to load wallets')
      } finally {
        this.loading = false
      }
    },
    inspect(walletRef) {
      this.$router.push(`/admin-master?inspect=${walletRef}`)
    }
  }
}
</script>

<style scoped>
/* =========================================
   BASE & TOOLBAR
   ========================================= */
.page { max-width: 1200px; margin: 0 auto; width: 100%; }

.toolbar { 
  display: flex; 
  justify-content: space-between; 
  align-items: center; 
  margin-bottom: 20px; 
  gap: 16px; 
  flex-wrap: wrap;
}

.search-form { 
  display: flex; 
  gap: 12px; 
  flex: 1; 
  max-width: 400px; 
}

.input { 
  flex: 1; 
  padding: 10px 14px; 
  border: 1px solid #e2e8f0; 
  border-radius: 8px; 
  font-size: 14px;
}
.input:focus { outline: none; border-color: #2563eb; box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1); }

.btn-primary { 
  background: #2563eb; 
  color: white; 
  padding: 10px 20px; 
  border-radius: 8px; 
  font-weight: 600; 
  border: none; 
  cursor: pointer; 
  white-space: nowrap;
}

.stats { 
  color: #64748b; 
  font-size: 13px; 
  font-weight: 600; 
}

/* =========================================
   DESKTOP TABLE VIEW
   ========================================= */
.table-wrap { 
  background: white; 
  border-radius: 12px; 
  border: 1px solid #e2e8f0; 
  overflow: hidden; 
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

table { 
  width: 100%; 
  border-collapse: collapse; 
}

th { 
  text-align: left; 
  padding: 12px 16px; 
  background: #f8fafc; 
  font-size: 11px; 
  font-weight: 700; 
  color: #64748b; 
  text-transform: uppercase; 
  border-bottom: 1px solid #e2e8f0;
}

td { 
  padding: 14px 16px; 
  border-top: 1px solid #f1f5f9; 
  font-size: 13px; 
}

tr:hover { 
  background: #f8fafc; 
  cursor: pointer; 
}

.mono { font-family: 'Courier New', monospace; font-weight: 600; }
.small { font-size: 12px; color: #64748b; }

/* =========================================
   MOBILE CARD VIEW
   ========================================= */
.wallet-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.wallet-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 16px;
  cursor: pointer;
  border-left: 4px solid #2563eb;
  transition: transform 0.15s;
}
.wallet-card:active {
  transform: scale(0.98);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}

.wallet-name {
  font-weight: 800;
  font-size: 15px;
  color: #0f172a;
}

.card-mid {
  font-size: 14px;
  color: #475569;
  margin-bottom: 12px;
  background: #f8fafc;
  padding: 6px 10px;
  border-radius: 6px;
  display: inline-block;
}

.card-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 12px;
  border-top: 1px solid #f1f5f9;
}

.wallet-date {
  font-size: 12px;
  color: #94a3b8;
}

/* =========================================
   BADGES & EMPTY STATE
   ========================================= */
.badge { 
  padding: 3px 8px; 
  border-radius: 4px; 
  font-size: 10px; 
  font-weight: 700; 
  text-transform: uppercase; 
  letter-spacing: 0.3px;
}
.badge-success { background: #d1fae5; color: #065f46; }
.badge-danger  { background: #fee2e2; color: #991b1b; }
.badge-info    { background: #dbeafe; color: #1e40af; }

.empty { 
  text-align: center; 
  padding: 60px 20px; 
  color: #64748b; 
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

/* =========================================
   RESPONSIVE VISIBILITY
   ========================================= */
.desktop-only { display: block; }
.mobile-only { display: none; }

@media (max-width: 768px) {
  /* Hide table, show cards */
  .desktop-only { display: none; }
  .mobile-only { display: flex; }

  /* Make search form full width */
  .search-form { 
    max-width: 100%; 
    width: 100%;
  }
  
  .stats {
    width: 100%;
    text-align: right;
    margin-top: -8px;
  }
}
</style>