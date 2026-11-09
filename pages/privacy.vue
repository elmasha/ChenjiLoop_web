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
        <h1>Privacy Policy</h1>
        <p class="last-updated">Last updated: November 2026</p>

        <section>
          <h2>1. Introduction</h2>
          <p>Welcome to ChenjiLoop. We are committed to protecting your personal information and your right to privacy. This policy explains what information we collect, how we use it, and what rights you have in relation to it. If you have any questions or concerns about this policy, please contact us.</p>
        </section>

        <section>
          <h2>2. Information We Collect</h2>
          <p>We collect personal information that you voluntarily provide to us when you register on the app, express an interest in obtaining information about us or our products, or otherwise contact us.</p>
          <ul>
            <li><strong>Personal Data:</strong> Mobile phone number (MSISDN), display name, and transaction history.</li>
            <li><strong>Financial Data:</strong> M-PESA transaction records required to process float loads, change transfers, and withdrawals.</li>
            <li><strong>Device Data:</strong> We may collect device information (such as your mobile device ID, model, and operating system) and push notification tokens to send you transaction alerts.</li>
          </ul>
        </section>

        <section>
          <h2>3. How We Use Your Information</h2>
          <p>We use the information we collect or receive to:</p>
          <ul>
            <li>Facilitate account creation and logon process.</li>
            <li>Process transactions and send related information (confirmations, receipts, and invoices).</li>
            <li>Send administrative information to you (e.g., changes to our terms, conditions, and policies).</li>
            <li>Respond to user inquiries and offer support.</li>
            <li>Protect our services (e.g., fraud monitoring and prevention).</li>
          </ul>
        </section>

        <section>
          <h2>4. Sharing Your Information</h2>
          <p>We only share information with third parties when necessary to process your transactions (e.g., Safaricom for M-PESA services) or when required by law. We do not sell your personal data to third parties.</p>
        </section>

        <section>
          <h2>5. Data Security</h2>
          <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards, no system is 100% secure.</p>
        </section>

        <section>
          <h2>6. Contact Us</h2>
          <p>If you have questions or comments about this policy, you may contact us at support@chenjiloop.com.</p>
        </section>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.legal-page {
  min-height: 100vh;
  background-color: #F4F5F7;
  font-family: 'Inter', sans-serif;
  display: flex;
  flex-direction: column;
}

/* --- TOP APP BAR --- */
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

/* --- CONTENT AREA --- */
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

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .top-bar {
    padding: 16px 24px;
  }
  .content-area {
    padding: 24px 16px;
  }
  .legal-container {
    padding: 32px 24px;
    border-radius: 16px;
  }
  h1 { font-size: 28px; }
}
</style>