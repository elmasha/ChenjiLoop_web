<template>
  <div class="page">
    <div v-if="!data" class="loading">Loading metrics...</div>

    <template v-else>
      <!-- Money Flow -->
      <section class="section">
        <h2 class="section-heading">Today's Money Flow</h2>
        <div class="stats-grid">
          <div class="stat-box border-green">
            <div class="stat-icon">⬇️</div>
            <div class="stat-content">
              <div class="label">Float Loaded</div>
              <div class="value">KES {{ fmt(data.today.floatLoaded) }}</div>
            </div>
          </div>
          <div class="stat-box border-blue">
            <div class="stat-icon">🔄</div>
            <div class="stat-content">
              <div class="label">Change Issued</div>
              <div class="value">KES {{ fmt(data.today.changeIssued) }}</div>
            </div>
          </div>
          <div class="stat-box border-orange">
            <div class="stat-icon">⬆️</div>
            <div class="stat-content">
              <div class="label">Withdrawn</div>
              <div class="value">KES {{ fmt(data.today.withdrawals) }}</div>
            </div>
          </div>
          <div class="stat-box border-purple">
            <div class="stat-icon">🎁</div>
            <div class="stat-content">
              <div class="label">C2C Volume</div>
              <div class="value">KES {{ fmt(data.today.c2cVolume) }}</div>
            </div>
          </div>
        </div>
      </section>

      <!-- System Health -->
      <section class="section">
        <h2 class="section-heading">System Health</h2>
        <div class="stats-grid">
          <div class="stat-box">
            <div class="stat-icon">💰</div>
            <div class="stat-content">
              <div class="label">Platform Liability</div>
              <div class="value">KES {{ fmt(data.liability.totalOwed) }}</div>
            </div>
          </div>
          <div :class="['stat-box', data.reconciliation.ok ? 'border-green' : 'border-red']">
            <div class="stat-icon">{{ data.reconciliation.ok ? '✅' : '⚠️' }}</div>
            <div class="stat-content">
              <div class="label">Ledger Status</div>
              <div class="value">{{ data.reconciliation.ok ? 'Clean' : data.reconciliation.driftCount + ' Drifts' }}</div>
            </div>
          </div>
          <div :class="['stat-box', data.settlement.pending > 0 ? 'border-yellow' : 'border-green']">
            <div class="stat-icon">⏳</div>
            <div class="stat-content">
              <div class="label">Pending Settlements</div>
              <div class="value">{{ data.settlement.pending }} Records</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Failures -->
      <section class="section">
        <h2 class="section-heading">Recent Failures (Last 7 Days)</h2>
        <div class="card">
          <div v-if="failures.length === 0" class="empty-state">
            <div class="empty-icon">🎉</div>
            <div class="empty-text">No failures recorded</div>
          </div>
          <div v-else class="failure-list">
            <div v-for="(f, i) in failures" :key="i" class="failure-row">
              <div class="failure-info">
                <div class="fail-type">{{ f.type.replace(/_/g, ' ') }}</div>
                <div class="fail-meta">
                  <span v-if="f.reasonCode" class="fail-code">{{ f.reasonCode }}</span>
                  <span v-if="f.reasonText" class="fail-text">{{ f.reasonText }}</span>
                </div>
              </div>
              <div class="fail-count">{{ f.count }}×</div>
            </div>
          </div>
        </div>
      </section>
    </template>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  data() {
    return { data: null, failures: [] }
  },
  mounted() {
    this.load()
  },
  methods: {
    fmt(n) {
      return Number(n || 0).toLocaleString('en-KE', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    },
    async load() {
      try {
        const [ov, fails] = await Promise.all([
          this.$axios.get('/admin/analytics/overview'),
          this.$axios.get('/admin/analytics/failures?days=7')
        ])
        this.data = ov.data
        this.failures = fails.data.data || []
      } catch (e) {
        console.error('Analytics load failed:', e)
      }
    }
  }
}
</script>

<style scoped>
/* ============================================================
   PAGE CONTAINER
   ============================================================ */
.page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 4px;
}

.loading {
  text-align: center;
  padding: 60px 20px;
  color: #64748b;
  font-size: 14px;
}

/* ============================================================
   SECTIONS
   ============================================================ */
.section {
  margin-bottom: 28px;
}

.section-heading {
  font-size: 14px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  margin: 0 0 12px;
  padding: 0 4px;
}

/* ============================================================
   STATS GRID — the key responsive magic
   ------------------------------------------------------------
   `auto-fit` + `minmax` = columns auto-adjust to screen width
   • Mobile (320px)  → 1 column
   • Tablet (600px)  → 2 columns
   • Desktop (1200px)→ 4 columns
   No media queries needed.
   ============================================================ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 12px;
}

/* ============================================================
   STAT BOX
   ============================================================ */
.stat-box {
  background: white;
  border-radius: 12px;
  padding: 18px 20px;
  border: 1px solid #e2e8f0;
  border-left: 4px solid #94a3b8;
  display: flex;
  align-items: center;
  gap: 14px;
  transition: box-shadow 0.2s, transform 0.2s;
}

.stat-box:hover {
  box-shadow: 0 4px 12px rgba(15, 23, 42, 0.08);
  transform: translateY(-1px);
}

/* Border colors */
.border-green  { border-left-color: #10b981; }
.border-blue   { border-left-color: #2563eb; }
.border-orange { border-left-color: #f59e0b; }
.border-purple { border-left-color: #8b5cf6; }
.border-yellow { border-left-color: #f59e0b; }
.border-red    { border-left-color: #dc2626; }

/* Icon */
.stat-icon {
  font-size: 28px;
  line-height: 1;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f8fafc;
  border-radius: 10px;
}

/* Content */
.stat-content {
  flex: 1;
  min-width: 0;
}

.label {
  font-size: 11px;
  font-weight: 700;
  color: #64748b;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}

.value {
  font-size: 20px;
  font-weight: 800;
  color: #0f172a;
  line-height: 1.2;
  overflow-wrap: break-word;
  word-break: break-word;
}

/* ============================================================
   CARD (for failures table)
   ============================================================ */
.card {
  background: white;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

/* ============================================================
   FAILURE LIST
   ============================================================ */
.failure-list {
  display: flex;
  flex-direction: column;
}

.failure-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border-bottom: 1px solid #f1f5f9;
  gap: 12px;
}

.failure-row:last-child {
  border-bottom: none;
}

.failure-info {
  flex: 1;
  min-width: 0;
}

.fail-type {
  font-weight: 700;
  color: #0f172a;
  font-size: 13px;
  margin-bottom: 3px;
  text-transform: capitalize;
}

.fail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 11px;
  color: #64748b;
}

.fail-code {
  font-family: 'Courier New', monospace;
  background: #fef2f2;
  color: #dc2626;
  padding: 1px 6px;
  border-radius: 3px;
  font-weight: 600;
}

.fail-text {
  color: #64748b;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 300px;
}

.fail-count {
  font-weight: 800;
  color: #dc2626;
  font-size: 15px;
  flex-shrink: 0;
}

/* ============================================================
   EMPTY STATE
   ============================================================ */
.empty-state {
  text-align: center;
  padding: 40px 20px;
}

.empty-icon {
  font-size: 36px;
  margin-bottom: 8px;
}

.empty-text {
  color: #64748b;
  font-size: 14px;
}

/* ============================================================
   MOBILE TIGHTENING
   ============================================================ */
@media (max-width: 480px) {
  .stats-grid {
    grid-template-columns: 1fr;
    gap: 10px;
  }

  .stat-box {
    padding: 16px;
  }

  .stat-icon {
    width: 36px;
    height: 36px;
    font-size: 24px;
  }

  .value {
    font-size: 18px;
  }

  .failure-row {
    padding: 12px 14px;
  }

  .fail-text {
    max-width: 160px;
  }

  .section-heading {
    font-size: 12px;
    margin-bottom: 10px;
  }
}

/* ============================================================
   TABLET — 2 columns everywhere
   ============================================================ */
@media (min-width: 481px) and (max-width: 768px) {
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* ============================================================
   LARGER DESKTOP — 4 columns
   ============================================================ */
@media (min-width: 1024px) {
  .stats-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>