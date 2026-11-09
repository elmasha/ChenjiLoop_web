<template>
  <div class="website-wrapper">
    <!-- Top App Bar -->
    <header class="top-bar">
      <div class="logo-container">
        <img src="https://www.image2url.com/r2/default/images/1794230572486-61df54f7-969b-4321-8aa9-c3c623214ae1.png" alt="ChenjiLoop Logo" class="app-logo" />
        <span class="brand-name">ChenjiLoop</span>
      </div>
      
      <div class="nav-actions">
        
        <a href="/downloads/chenjiloop.apk" class="nav-btn" download>Download App</a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="landing-page">
      <div class="content-side">
        <div class="brand-badge">
          <span class="dot"></span> Now available on Android
        </div>
        
        <h1>
          Digital change, <br />
          <span class="highlight">simplified.</span>
        </h1>
        
        <p>
          The smartest way for Kenyan merchants to issue change and for consumers to save, send, and withdraw. No more hunting for coins. Just tap, accept, and grow.
        </p>

        <div class="action-row">
          <a href="/downloads/chenjiloop.apk" class="primary-btn" download>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="7 10 12 15 17 10"></polyline>
              <line x1="12" y1="15" x2="12" y2="3"></line>
            </svg>
            Download APK
          </a>
          <span class="file-info">v1.0 • Android 8.0+</span>
        </div>

        <div class="features-list">
          <div class="feature-item">
            <div class="check-icon">✓</div>
            <span>Instant M-PESA top-ups</span>
          </div>
          <div class="feature-item">
            <div class="check-icon">✓</div>
            <span>Zero-fee change transfers</span>
          </div>
          <div class="feature-item">
            <div class="check-icon">✓</div>
            <span>Secure ledger reconciliation</span>
          </div>
        </div>
      </div>

      <!-- Right Side: Real Screenshot in Phone Frame -->
      <div class="visual-side">
        <div class="phone-frame">
          <div class="phone-screen">
            <!-- UPDATED: Using the new hosted mockup URL -->
            <img src="https://www.image2url.com/r2/default/images/1794230810770-b52bfec8-03ce-4a1d-a1ab-25e8f71dbc4e.png" alt="ChenjiLoop App Mockup" class="app-screenshot" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;800&display=swap');

.website-wrapper {
  font-family: 'Inter', sans-serif;
  min-height: 100vh;
  background-color: #FFFFFF;
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
}

.app-logo {
  width: 40px;
  height: 40px;
  object-fit: contain;
  border-radius: 10px;
}

.brand-name {
  font-size: 20px;
  font-weight: 800;
  color: #1A1A1A;
  letter-spacing: -0.5px;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}

.nav-link {
  text-decoration: none;
  color: #767676;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s;
}

.nav-link:hover {
  color: #0EA5E9;
}

.nav-btn {
  text-decoration: none;
  background: #F4F5F7;
  color: #1A1A1A;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  transition: background 0.2s;
}

.nav-btn:hover {
  background: #E5E7EB;
}

/* --- MAIN LANDING AREA --- */
.landing-page {
  display: flex;
  flex: 1;
  overflow: hidden;
}

.content-side {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px 80px;
  max-width: 650px;
}

.brand-badge { display: inline-flex; align-items: center; gap: 8px; background: #F4F5F7; padding: 6px 16px; border-radius: 20px; font-size: 13px; font-weight: 600; color: #4A4A4A; width: fit-content; margin-bottom: 32px; }
.dot { width: 8px; height: 8px; background: #0EA5E9; border-radius: 50%; }
h1 { font-size: 56px; font-weight: 800; color: #1A1A1A; line-height: 1.1; letter-spacing: -1.5px; margin: 0 0 24px 0; }
.highlight { color: #0EA5E9; }
p { font-size: 18px; color: #767676; line-height: 1.6; margin: 0 0 40px 0; max-width: 480px; }
.action-row { display: flex; align-items: center; gap: 20px; margin-bottom: 48px; }
.primary-btn { display: inline-flex; align-items: center; gap: 10px; background: #0EA5E9; color: #FFFFFF; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-weight: 600; font-size: 16px; box-shadow: 0 10px 20px rgba(14, 165, 233, 0.2); transition: all 0.2s ease; }
.primary-btn:hover { background: #0284C7; transform: translateY(-2px); box-shadow: 0 14px 24px rgba(14, 165, 233, 0.3); }
.file-info { font-size: 14px; color: #B8B8B8; font-weight: 500; }
.features-list { display: flex; flex-direction: column; gap: 16px; }
.feature-item { display: flex; align-items: center; gap: 12px; font-size: 15px; color: #4A4A4A; font-weight: 500; }
.check-icon { width: 24px; height: 24px; background: #E0F2FE; color: #0284C7; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; font-weight: bold; }

.visual-side {
  flex: 1;
  background: linear-gradient(135deg, #E0F2FE 0%, #F4F5F7 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 40px;
  border-top-left-radius: 40px;
  border-bottom-left-radius: 40px;
}

.phone-frame {
  width: 320px;
  height: 660px;
  background: #1A1A1A;
  border-radius: 40px;
  padding: 12px;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.15);
  transform: rotate(-5deg) translateY(20px);
  transition: transform 0.4s ease;
}

.phone-frame:hover {
  transform: rotate(0deg) translateY(0);
}

.phone-screen {
  width: 100%;
  height: 100%;
  background: #FFFFFF;
  border-radius: 30px;
  overflow: hidden;
  position: relative;
}

.app-screenshot {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}

/* Mobile Responsiveness */
@media (max-width: 900px) {
  .top-bar {
    padding: 16px 24px;
  }
  .nav-link {
    display: none;
  }
  .landing-page {
    flex-direction: column;
  }
  .content-side {
    padding: 40px 24px;
    text-align: center;
    align-items: center;
  }
  h1 { font-size: 40px; }
  p { font-size: 16px; }
  .action-row { flex-direction: column; width: 100%; }
  .primary-btn { width: 100%; justify-content: center; }
  .features-list { align-items: flex-start; }
  .visual-side { border-radius: 0; padding: 60px 24px; }
  .phone-frame { transform: none; }
}
</style>