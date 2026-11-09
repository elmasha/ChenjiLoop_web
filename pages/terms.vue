<template>
  <div class="legal-page">
    <!-- Top App Bar -->
    <header class="top-bar">
      <NuxtLink to="/" class="logo-container">
        <img src="https://www.image2url.com/r2/default/images/1794230572486-61df54f7-969b-4321-8aa9-c3c623214ae1.png" alt="ChenjiLoop Logo" class="app-logo" />
        <span class="brand-name">ChenjiLoop</span>
      </NuxtLink>
      
      <div class="nav-actions">
        <NuxtLink to="/" class="back-link">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Back to Home
        </NuxtLink>
      </div>
    </header>

    <!-- Content Area -->
    <main class="content-area">
      <div class="legal-container">
        <h1>Terms of Service</h1>
        <p class="last-updated">Last updated: November 2026</p>

        <section>
          <h2>1. Agreement to Terms</h2>
          <p>These Terms of Service constitute a legally binding agreement made between you (whether personally or on behalf of an entity) and ChenjiLoop, concerning your access to and use of the ChenjiLoop mobile application.</p>
        </section>

        <section>
          <h2>2. User Registration</h2>
          <p>To use the app, you must register using a valid Safaricom M-PESA phone number. You agree to keep your PIN confidential and accept responsibility for all activities that occur under your account.</p>
        </section>

        <section>
          <h2>3. Financial Services & Transactions</h2>
          <ul>
            <li><strong>Float Loading:</strong> Merchants can load float via M-PESA STK push. ChenjiLoop acts as a digital record-keeper and does not hold your funds directly.</li>
            <li><strong>Change Transfers:</strong> Merchants can issue digital change to consumers. Consumers must accept the change with their PIN for the transaction to be finalized.</li>
            <li><strong>Withdrawals:</strong> Consumers may withdraw funds to their M-PESA account once they meet the minimum threshold (KES 1,000).</li>
            <li><strong>Reversals:</strong> Merchants may request a reversal for an incorrect transaction. A reversal will only be processed if the consumer explicitly consents.</li>
          </ul>
        </section>

        <section>
          <h2>4. Prohibited Activities</h2>
          <p>You may not access or use the app for any purpose other than that for which we make the app available. Prohibited activities include using the app for money laundering, fraud, or attempting to bypass our security and ledger systems.</p>
        </section>

        <section>
          <h2>5. Limitation of Liability</h2>
          <p>In no event will ChenjiLoop be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages arising from your use of the app.</p>
        </section>

        <section>
          <h2>6. Modifications and Interruptions</h2>
          <p>We reserve the right to change, modify, or remove the contents of the app at any time or for any reason without notice. We cannot guarantee the app will be available at all times due to maintenance or network issues.</p>
        </section>

        <section>
          <h2>7. Governing Law</h2>
          <p>These Terms shall be governed by and defined following the laws of the Republic of Kenya.</p>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
/* You can copy the exact same CSS from privacy.vue here */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.legal-page {
  min-height: 100vh;
  background-color: #F4F5F7;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 48px;
  background: #FFFFFF;
  border-bottom: 1px solid #E5E7EB;
  position: sticky;
  top: 0;
  z-index: 10;
}

.logo-container {
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
}

.app-logo {
  width: 36px;
  height: 36px;
  object-fit: contain;
  border-radius: 8px;
}

.brand-name {
  font-size: 20px;
  font-weight: 800;
  color: #1A1A1A;
  letter-spacing: -0.5px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: #4A4A4A;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s;
}

.back-link:hover {
  color: #0EA5E9;
}

.content-area {
  flex: 1;
  padding: 48px 20px;
  display: flex;
  justify-content: center;
}

.legal-container {
  max-width: 800px;
  width: 100%;
  background: #FFFFFF;
  padding: 48px;
  border-radius: 24px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
}

h1 {
  font-size: 32px;
  font-weight: 800;
  color: #1A1A1A;
  margin-bottom: 8px;
  letter-spacing: -0.5px;
}

.last-updated {
  color: #767676;
  font-size: 14px;
  margin-bottom: 40px;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 24px;
}

h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1A1A1A;
  margin-top: 32px;
  margin-bottom: 12px;
}

p {
  color: #4A4A4A;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 16px;
}

ul {
  color: #4A4A4A;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 16px;
  padding-left: 24px;
}

li {
  margin-bottom: 8px;
}

@media (max-width: 600px) {
  .top-bar { padding: 16px 24px; }
  .content-area { padding: 24px 16px; }
  .legal-container { padding: 32px 24px; border-radius: 16px; }
  h1 { font-size: 28px; }
}
</style>