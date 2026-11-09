<template>
  <div class="page">
    <div v-if="loading" class="loading">Loading overview...</div>

    <template v-else>
      <!-- Stats Row -->
      <div v-if="stats" class="stats-grid">
        <div class="stat-card">
          <div class="stat-label">Total Wallets</div>
          <div class="stat-value">{{ stats.wallets.total }}</div>
          <div class="stat-sub">{{ stats.wallets.merchants }} merchants · {{ stats.wallets.consumers }} consumers</div>
        </div>
        <div class="stat-card">
          <div class="stat-label">Total Liability</div>
          <div class="stat-value">KES {{ fmt(stats.liability.totalOwed) }}</div>
          <div class="stat-sub">Consumer + merchant balances</div>
        </div>
        <div class="stat-card" :class="{ 'stat-danger': stats.reconciliation.driftCount > 0 }">
          <div class="stat-label">Ledger Drift</div>
          <div class="stat-value">{{ stats.reconciliation.driftCount }}</div>
          <div class="stat-sub">{{ stats.reconciliation.ok ? '✓ Clean' : '⚠ Needs attention' }}</div>
        </div>
        <div class="stat-card" :class="{ 'stat-warning': stats.settlement.pending > 0 }">
          <div class="stat-label">Pending Settlements</div>
          <div class="stat-value">{{ stats.settlement.pending }}</div>
          <div class="stat-sub">KES {{ fmt(stats.settlement.pendingAmount) }} stuck</div>
        </div>
      </div>

      <!-- Search -->
      <div class="card search-card">
        <h2 class="section-title">Find & Fix Wallets</h2>
        <form @submit.prevent="searchWallets" class="search-form">
          <input
            v-model="search"
            type="text"
            class="input"
            placeholder="Search by MSISDN (e.g. 254712345678) or name..."
          />
          <button type="submit" class="btn-primary" :disabled="searching">
            {{ searching ? 'Searching...' : 'Search' }}
          </button>
        </form>
      </div>

      <!-- Wallet List -->
      <div v-if="wallets.length > 0" class="wallets-grid">
        <div
          v-for="w in wallets"
          :key="w.wallet_ref"
          class="wallet-card"
          :class="{ 'wallet-selected': selectedWallet && selectedWallet.wallet.walletRef === w.wallet_ref }"
          @click="inspectWallet(w.wallet_ref)"
        >
          <div class="wallet-header">
            <div>
              <div class="wallet-name">{{ w.display_name || 'No Name' }}</div>
              <div class="wallet-msisdn">{{ w.msisdn }}</div>
            </div>
            <span :class="['badge', w.wallet_type === 'MERCHANT' ? 'badge-info' : 'badge-success']">
              {{ w.wallet_type }}
            </span>
          </div>
          <div class="wallet-footer">
            <span :class="['badge', statusBadge(w.status)]">{{ w.status }}</span>
          </div>
        </div>
      </div>

      <div v-else-if="searched && !searching" class="empty-state">
        No wallets found for "{{ lastSearch }}"
      </div>

      <!-- Wallet Detail -->
      <div v-if="selectedWallet" class="card wallet-detail">
        <div class="detail-header">
          <div>
            <h2>{{ selectedWallet.wallet.displayName || 'Unknown' }}</h2>
            <p class="mono">{{ selectedWallet.wallet.msisdn }}</p>
            <p class="mono small">{{ selectedWallet.wallet.walletRef }}</p>
            <span :class="['badge', statusBadge(selectedWallet.wallet.status)]">
              {{ selectedWallet.wallet.status }}
            </span>
          </div>
          <div class="balance-block">
            <div class="balance-label">Cached Balance</div>
            <div class="balance-value">KES {{ fmt(selectedWallet.account?.balanceCached || 0) }}</div>
            <div class="balance-sub">Ledger: KES {{ fmt(selectedWallet.account?.balanceLedger || 0) }}</div>
            <div :class="['drift-badge', Math.abs(selectedWallet.account?.drift || 0) > 0.01 ? 'drift-alert' : 'drift-ok']">
              Drift: {{ fmt(selectedWallet.account?.drift || 0) }}
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="actions-block">
          <h3 class="actions-title">Actions</h3>
          <div class="actions-row">
            <button
              v-if="selectedWallet.wallet.status === 'ACTIVE'"
              class="btn-danger"
              @click="changeStatus('SUSPENDED')"
            >
              Suspend Wallet
            </button>
            <button
              v-else
              class="btn-success"
              @click="changeStatus('ACTIVE')"
            >
              Activate Wallet
            </button>
            <button class="btn-warning" @click="changeStatus('RESTRICTED')">Restrict</button>
            <button class="btn-secondary" @click="adjustBalance('CREDIT')">+ Credit</button>
            <button class="btn-secondary" @click="adjustBalance('DEBIT')">− Debit</button>
          </div>
        </div>

        <!-- Recent Transactions -->
        <div class="recent-block">
          <h3 class="actions-title">Recent Transactions</h3>
          <div v-if="recentTxns.length === 0" class="empty-small">No transactions yet.</div>
          <div v-else class="txn-list">
            <div v-for="tx in recentTxns" :key="tx.transaction_ref" class="txn-row">
              <div class="txn-left">
                <div class="txn-type">{{ tx.type.replace(/_/g, ' ') }}</div>
                <div class="txn-ref mono small">{{ tx.transaction_ref }}</div>
              </div>
              <div class="txn-right">
                <div class="txn-amount">KES {{ fmt(tx.amount) }}</div>
                <span :class="['badge', statusBadge(tx.status)]">{{ tx.status }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      loading: true,
      stats: null,
      search: '',
      lastSearch: '',
      searching: false,
      searched: false,
      wallets: [],
      selectedWallet: null,
      recentTxns: []
    }
  },
  mounted() {
    this.loadStats()
  },
  methods: {
    fmt(n) {
      return Number(n || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    statusBadge(status) {
      if (status === 'ACTIVE' || status === 'POSTED') return 'badge-success'
      if (status === 'FAILED' || status === 'SUSPENDED' || status === 'CLOSED') return 'badge-danger'
      if (status === 'PENDING_AUTHENTICATION' || status === 'RESTRICTED' || status === 'UNDER_REVIEW') return 'badge-warning'
      return 'badge-gray'
    },
    async loadStats() {
      try {
        const { data } = await this.$axios.get('/admin/analytics/overview')
        this.stats = data
      } catch (e) {
        console.warn('Stats load failed:', e.message)
      } finally {
        this.loading = false
      }
    },
    async searchWallets() {
      if (!this.search.trim()) return
      this.searching = true
      this.searched = false
      this.selectedWallet = null
      this.recentTxns = []
      this.lastSearch = this.search.trim()

      try {
        const { data } = await this.$axios.get('/admin/wallets', {
          params: { msisdn: this.lastSearch, limit: 50 }
        })
        this.wallets = data.data || []
        this.searched = true

        // If no match by MSISDN, try search by name field on backend (if supported)
        if (this.wallets.length === 0) {
          // Fallback: use the searchTransactions pattern — but MSISDN-only for now
        }
      } catch (e) {
        console.error('Search failed:', e.response?.data || e.message)
        alert(e.response?.data?.message || 'Search failed')
      } finally {
        this.searching = false
      }
    },
    async inspectWallet(walletRef) {
      try {
        const { data } = await this.$axios.get(`/admin/wallets/${walletRef}`)
        this.selectedWallet = data

        // Also load recent txns
        const txRes = await this.$axios.get(`/admin/wallets/${walletRef}/transactions`, {
          params: { limit: 10 }
        })
        this.recentTxns = txRes.data.data || []
      } catch (e) {
        alert(e.response?.data?.message || 'Failed to load wallet')
      }
    },
    async changeStatus(newStatus) {
      if (!confirm(`Mark this wallet as ${newStatus}?`)) return
      try {
        await this.$axios.patch(`/admin/wallets/${this.selectedWallet.wallet.walletRef}/status`, {
          status: newStatus
        })
        alert(`Wallet marked as ${newStatus}`)
        this.inspectWallet(this.selectedWallet.wallet.walletRef)
        this.loadStats()
      } catch (e) {
        alert(e.response?.data?.message || 'Status change failed')
      }
    },
    async adjustBalance(type) {
      const amount = prompt(`Enter amount to ${type} (KES):`)
      if (!amount) return
      const num = Number(amount)
      if (!Number.isFinite(num) || num <= 0) {
        alert('Invalid amount')
        return
      }
      const reason = prompt('Reason for adjustment (required for audit):')
      if (!reason) {
        alert('Reason is required')
        return
      }
      try {
        await this.$axios.post(`/admin/wallets/${this.selectedWallet.wallet.walletRef}/adjust`, {
          amount: num,
          type,
          reason
        })
        alert(`Adjusted ${type} KES ${num}`)
        this.inspectWallet(this.selectedWallet.wallet.walletRef)
        this.loadStats()
      } catch (e) {
        alert(e.response?.data?.message || 'Adjustment failed')
      }
    }
  }
}
</script>

<style scoped>
.page { max-width: 1200px; }
.loading { text-align: center; padding: 60px; color: #64748b; }

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}
.stat-card {
  background: white;
  border-radius: 12px;
  padding: 20px;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #2563eb;
}
.stat-card.stat-danger { border-left-color: #dc2626; background: #fef2f2; }
.stat-card.stat-warning { border-left-color: #f59e0b; background: #fffbeb; }
.stat-label {
  font-size: 11px; font-weight: 700; color: #64748b;
  text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 6px;
}
.stat-value { font-size: 24px; font-weight: 800; color: #0f172a; }
.stat-sub { font-size: 12px; color: #64748b; margin-top: 4px; }

.card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  margin-bottom: 24px;
}
.section-title {
  font-size: 16px; font-weight: 800; color: #0f172a;
  margin: 0 0 16px;
}
.search-form {
  display: flex; gap: 12px;
}
.input {
  flex: 1;
  padding: 10px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #0f172a;
}
.input:focus {
  outline: 2px solid #2563eb; border-color: #2563eb;
}
.btn-primary {
  background: #2563eb; color: white;
  padding: 10px 20px; border-radius: 8px;
  font-weight: 600; border: none; cursor: pointer;
}
.btn-primary:hover { background: #3b82f6; }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-danger {
  background: #dc2626; color: white;
  padding: 8px 16px; border-radius: 8px;
  font-weight: 600; border: none; cursor: pointer; font-size: 13px;
}
.btn-success {
  background: #10b981; color: white;
  padding: 8px 16px; border-radius: 8px;
  font-weight: 600; border: none; cursor: pointer; font-size: 13px;
}
.btn-warning {
  background: #f59e0b; color: white;
  padding: 8px 16px; border-radius: 8px;
  font-weight: 600; border: none; cursor: pointer; font-size: 13px;
}
.btn-secondary {
  background: white; color: #0f172a;
  padding: 8px 16px; border-radius: 8px;
  font-weight: 600; border: 1px solid #e2e8f0; cursor: pointer; font-size: 13px;
}
.btn-secondary:hover { border-color: #2563eb; color: #2563eb; }

.wallets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}
.wallet-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
}
.wallet-card:hover {
  border-color: #2563eb;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.1);
}
.wallet-selected {
  border-color: #2563eb;
  background: #eff6ff;
}
.wallet-header {
  display: flex; justify-content: space-between; align-items: flex-start;
  margin-bottom: 8px;
}
.wallet-name { font-weight: 700; color: #0f172a; font-size: 14px; }
.wallet-msisdn { font-size: 12px; color: #64748b; margin-top: 2px; }
.wallet-footer { margin-top: 8px; }

.empty-state {
  text-align: center; padding: 40px;
  color: #64748b; background: white;
  border-radius: 12px; border: 1px solid #e2e8f0;
}

.wallet-detail { border-left: 4px solid #2563eb; }
.detail-header {
  display: flex; justify-content: space-between; gap: 24px;
  padding-bottom: 20px; margin-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
}
.detail-header h2 { font-size: 22px; margin: 0 0 6px; color: #0f172a; }
.mono { font-family: 'Courier New', monospace; color: #64748b; margin: 2px 0; }
.mono.small { font-size: 11px; }
.balance-block { text-align: right; }
.balance-label { font-size: 12px; color: #64748b; text-transform: uppercase; }
.balance-value { font-size: 28px; font-weight: 800; color: #0f172a; margin-top: 4px; }
.balance-sub { font-size: 12px; color: #64748b; margin-top: 4px; }
.drift-badge {
  display: inline-block; margin-top: 8px;
  padding: 3px 8px; border-radius: 4px;
  font-size: 11px; font-weight: 700;
}
.drift-ok { background: #d1fae5; color: #065f46; }
.drift-alert { background: #fee2e2; color: #991b1b; }

.actions-block {
  margin-bottom: 24px; padding-bottom: 24px;
  border-bottom: 1px solid #e2e8f0;
}
.actions-title {
  font-size: 14px; font-weight: 700; color: #0f172a;
  margin: 0 0 12px; text-transform: uppercase; letter-spacing: 0.5px;
}
.actions-row { display: flex; gap: 8px; flex-wrap: wrap; }

.txn-list { display: flex; flex-direction: column; gap: 8px; }
.txn-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px; background: #f8fafc; border-radius: 8px;
}
.txn-type { font-weight: 700; font-size: 13px; color: #0f172a; }
.txn-ref { margin-top: 2px; }
.txn-right { text-align: right; }
.txn-amount { font-weight: 700; font-size: 14px; margin-bottom: 4px; }
.empty-small {
  text-align: center; color: #64748b; padding: 20px;
}

.badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.4px;
}
.badge-success { background: #d1fae5; color: #065f46; }
.badge-warning { background: #fef3c7; color: #92400e; }
.badge-danger { background: #fee2e2; color: #991b1b; }
.badge-info { background: #dbeafe; color: #1e40af; }
.badge-gray { background: #f1f5f9; color: #475569; }
</style>