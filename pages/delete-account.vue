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
        <h1>Delete Your Account</h1>
        <p class="last-updated">Request the permanent deletion of your ChenjiLoop account and data.</p>

        <section class="warning-box">
          <div class="warning-icon">!</div>
          <div>
            <h3>Important: Read before proceeding</h3>
            <p>Deleting your account is permanent. You will lose access to your wallet balance, transaction history, and the ability to receive or send change via ChenjiLoop. <strong>Any remaining balance in your wallet must be withdrawn to M-PESA before deletion.</strong></p>
          </div>
        </section>

        <section>
          <h2>How to delete your account</h2>
          <p>You can request the deletion of your account by sending an email to our support team. Please follow the steps below:</p>
          
          <div class="steps-container">
            <div class="step">
              <div class="step-number">1</div>
              <div class="step-content">
                <h4>Send an Email</h4>
                <p>Email us at <strong>support@chenjiloop.com</strong> using the same phone number you use to log in.</p>
              </div>
            </div>
            
            <div class="step">
              <div class="step-number">2</div>
              <div class="step-content">
                <h4>Use the Subject Line</h4>
                <p>Set the subject to <strong>"Account Deletion Request"</strong> so our team can process it quickly.</p>
              </div>
            </div>

            <div class="step">
              <div class="step-number">3</div>
              <div class="step-content">
                <h4>Verification</h4>
                <p>We will verify your identity and confirm that your wallet balance is zero before proceeding with the deletion.</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2>What data is deleted?</h2>
          <p>Once your request is processed, we will delete the following data associated with your account:</p>
          <ul>
            <li>Your profile information (Display name, MSISDN).</li>
            <li>Your wallet and digital balance.</li>
            <li>Your device tokens (for push notifications).</li>
          </ul>
        </section>

        <section>
          <h2>What data is retained?</h2>
          <p>To comply with financial regulations and anti-money laundering laws, we are required to retain a history of all completed transactions (ledgers and receipts) for a period of <strong>7 years</strong>. This data is anonymized where possible, but the transaction records themselves cannot be deleted.</p>
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
  font-size: 15px;
  margin-bottom: 40px;
  border-bottom: 1px solid #E5E7EB;
  padding-bottom: 24px;
}

h2 {
  font-size: 20px;
  font-weight: 700;
  color: #1A1A1A;
  margin-top: 32px;
  margin-bottom: 16px;
}

h3 { font-size: 16px; font-weight: 700; color: #991B1B; margin-bottom: 8px; }
h4 { font-size: 15px; font-weight: 700; color: #1A1A1A; margin-bottom: 4px; }

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

/* --- WARNING BOX --- */
.warning-box {
  display: flex;
  gap: 16px;
  background: #FEF2F2;
  border: 1px solid #FECACA;
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 32px;
}

.warning-icon {
  width: 24px;
  height: 24px;
  background: #EF4444;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  flex-shrink: 0;
  margin-top: 2px;
}

.warning-box p { margin-bottom: 0; color: #991B1B; font-size: 14px; }

/* --- STEPS CONTAINER --- */
.steps-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 24px;
  margin-bottom: 32px;
}

.step {
  display: flex;
  gap: 16px;
}

.step-number {
  width: 32px;
  height: 32px;
  background: #E0F2FE;
  color: #0284C7;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 14px;
  flex-shrink: 0;
}

.step-content p { margin-bottom: 0; font-size: 14px; }

/* Mobile Responsiveness */
@media (max-width: 600px) {
  .top-bar { padding: 16px 24px; }
  .content-area { padding: 24px 16px; }
  .legal-container { padding: 32px 24px; border-radius: 16px; }
  h1 { font-size: 28px; }
}
</style>