<template>
  <div class="page">
    <!-- Search Section -->
    <div class="card search-card">
      <h2 class="section-title">Search Transactions</h2>

      <form @submit.prevent="search" class="search-form">
        <!-- Main Search Input -->
        <input
          v-model="q"
          type="search"
          class="input main-input"
          placeholder="TXN ref, receipt, or phone..."
        />

        <!-- Side-by-side Filters -->
        <div class="filter-row">
          <select v-model="type" class="input half-input">
            <option value="">All types</option>
            <option value="CHANGE_TRANSFER">Change Transfer</option>
            <option value="FLOAT_LOAD">Float Load</option>
            <option value="WITHDRAWAL">Withdrawal</option>
            <option value="REVERSAL">Reversal</option>
            <option value="C2C_TRANSFER">C2C Transfer</option>
          </select>
          
          <select v-model="status" class="input half-input">
            <option value="">All statuses</option>
            <option value="POSTED">Posted</option>
            <option value="PENDING_AUTHENTICATION">Pending Auth</option>
            <option value="INITIATED">Initiated</option>
            <option value="FAILED">Failed</option>
            <option value="REVERSED">Reversed</option>
            <option value="UNDER_REVIEW">Under Review</option>
          </select>
        </div>

        <button type="submit" class="btn-primary search-btn" :disabled="loading">
          {{ loading ? 'Searching...' : 'Search' }}
        </button>
      </form>
    </div>

    <!-- Results Section -->
    <div v-if="results.length > 0" class="results-container">
      <div class="results-header">
        <h3>Results ({{ results.length }})</h3>
      </div>
      
      <div class="txn-list">
        <div v-for="tx in results" :key="tx.transaction_ref" class="txn-card">
          
          <!-- Top Row: Type & Amount -->
          <div class="txn-top">
            <div class="txn-type">{{ tx.type.replace(/_/g, ' ') }}</div>
            <div class="txn-amount">KES {{ fmt(tx.amount) }}</div>
          </div>

          <!-- Middle: Ref & M-PESA -->
          <div class="txn-mid">
            <div class="txn-ref mono">{{ tx.transaction_ref }}</div>
            <div v-if="tx.mpesa_receipt" class="txn-mpesa">
              M-PESA: <span class="mono">{{ tx.mpesa_receipt }}</span>
            </div>
          </div>

          <!-- Bottom Row: Parties & Status -->
          <div class="txn-bottom">
            <div class="txn-parties">
              <span v-if="tx.merchant_msisdn">{{ tx.merchant_msisdn }}</span>
              <span v-if="tx.merchant_msisdn && tx.consumer_msisdn"> → </span>
              <span v-if="tx.consumer_msisdn">{{ tx.consumer_msisdn }}</span>
            </div>
            <span :class="['badge', statusBadge(tx.status)]">{{ tx.status }}</span>
          </div>

          <!-- Error state (if failed) -->
          <div v-if="tx.failure_reason_code" class="txn-error">
            {{ tx.failure_reason_code }}: {{ tx.failure_reason_text }}
          </div>

        </div>
      </div>
    </div>

    <div v-else-if="searched && !loading" class="empty-state">
      No transactions found.
    </div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return {
      q: '',
      type: '',
      status: '',
      loading: false,
      searched: false,
      results: []
    }
  },
  methods: {
    fmt(n) {
      return Number(n || 0).toLocaleString('en-KE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    },
    statusBadge(status) {
      if (status === 'POSTED') return 'badge-success'
      if (status === 'FAILED' || status === 'REVERSED') return 'badge-danger'
      if (status === 'PENDING_AUTHENTICATION' || status === 'UNDER_REVIEW') return 'badge-warning'
      return 'badge-gray'
    },
    async search() {
      this.loading = true
      this.searched = false
      try {
        const params = {}
        if (this.q.trim()) params.q = this.q.trim()
        if (this.type) params.type = this.type
        if (this.status) params.status = this.status
        params.limit = 50

        const { data } = await this.$axios.get('/admin/transactions', { params })
        this.results = data.data || []
        this.searched = true
      } catch (e) {
        alert(e.response?.data?.message || 'Search failed')
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
/* =========================================
   LAYOUT & BASE
   ========================================= */
.page { 
  max-width: 1000px; 
  margin: 0 auto; 
  /* Fix horizontal overflow issues on mobile */
  width: 100%;
  overflow-x: hidden;
}

.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.02);
}

.search-card {
  padding: 20px;
}

.section-title {
  font-size: 16px;
  font-weight: 800;
  color: #0f172a;
  margin: 0 0 16px;
}

/* =========================================
   SEARCH FORM
   ========================================= */
.search-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.input {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-size: 14px;
  color: #0f172a;
  background: #f8fafc;
  box-sizing: border-box;
  appearance: none; /* Removes default iOS styling */
}
.input:focus { 
  outline: none;
  border-color: #2563eb; 
  background: white;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Side-by-side filters on mobile */
.filter-row {
  display: flex;
  gap: 12px;
}
.half-input {
  flex: 1;
  min-width: 0; /* Prevents flex blowout */
}

.btn-primary {
  background: #2563eb;
  color: white;
  padding: 14px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  width: 100%;
}
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }

/* =========================================
   RESULTS LIST
   ========================================= */
.results-header {
  padding: 0 4px 8px;
}
.results-header h3 {
  font-size: 12px;
  color: #64748b;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: 700;
}

.txn-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.txn-card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  padding: 16px;
  border-left: 4px solid #2563eb;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Top row: Type & Amount */
.txn-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.txn-type {
  font-weight: 800;
  font-size: 14px;
  color: #0f172a;
  text-transform: capitalize;
}
.txn-amount {
  font-weight: 800;
  font-size: 16px;
  color: #0f172a;
}

/* Mid: Ref & Receipt */
.txn-mid {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.txn-ref {
  font-size: 12px;
  color: #64748b;
  word-break: break-all; /* Stops long refs from bleeding out */
}
.txn-mpesa {
  font-size: 12px;
  color: #2563eb;
  font-weight: 600;
}

/* Bottom: Parties & Status */
.txn-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10px;
  border-top: 1px solid #f1f5f9;
}
.txn-parties {
  font-size: 12px;
  color: #64748b;
}
.badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 11px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.badge-success { background: #d1fae5; color: #065f46; }
.badge-warning { background: #fef3c7; color: #92400e; }
.badge-danger { background: #fee2e2; color: #991b1b; }
.badge-gray { background: #f1f5f9; color: #475569; }

/* Error block */
.txn-error {
  background: #fef2f2;
  color: #991b1b;
  padding: 8px 12px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.mono { font-family: 'Courier New', monospace; }

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #64748b;
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  font-size: 14px;
}
</style>