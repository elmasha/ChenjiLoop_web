<template>
  <div class="legal-root">
    <!-- Top bar -->
    <v-app-bar app flat color="white" class="legal-nav" height="70" elevate-on-scroll>
      <v-container class="d-flex align-center pa-0">
        <div class="d-flex align-center cursor-pointer" @click="goHome">
          <v-avatar color="#8051FF" size="38" class="mr-3 elevation-2">
            <v-icon color="white" size="20">mdi-home-city</v-icon>
          </v-avatar>
          <span class="text-h6 font-weight-bold brand-text">
            <span style="color: #8051FF;">Ma</span><span style="color: #7cb300;">kaazi</span>
          </span>
        </div>

        <v-spacer />

        <v-btn text class="text-capitalize font-weight-medium d-none d-sm-flex" @click="goHome">
          <v-icon left small>mdi-arrow-left</v-icon>
          Back to home
        </v-btn>
        <v-btn icon class="d-flex d-sm-none" @click="goHome">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-main class="pa-0">
      <slot />
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'LegalLayout',
  methods: {
    goHome() {
      try {
        if (this.$router) this.$router.push('/');
        else window.location.href = '/';
      } catch (e) {
        window.location.href = '/';
      }
    },
  },
};
</script>

<style scoped>
.legal-root {
  background: #ffffff;
  min-height: 100vh;
}
.legal-nav {
  border-bottom: 1px solid #f1f5f9 !important;
}
.brand-text { letter-spacing: -0.5px; }
</style>

<style>
/* ============================================================
   Shared legal-page styles — GLOBAL (not scoped)
   Both /privacy and /terms use these via the legal layout.
   ============================================================ */

/* Hero */
.legal-hero {
  background: linear-gradient(135deg, #fafafa 0%, #f5f3ff 100%);
  padding: 56px 0 48px;
  position: relative;
  overflow: hidden;
}
.legal-hero::before {
  content: "";
  position: absolute;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(128, 81, 255, 0.15), transparent 70%);
  top: -150px;
  right: -100px;
  pointer-events: none;
}
.legal-title {
  font-size: 2.4rem;
  font-weight: 900;
  color: #0f0d24;
  letter-spacing: -0.8px;
  line-height: 1.15;
  margin: 0 0 12px;
}
.legal-sub {
  font-size: 1rem;
  color: #64748b;
  max-width: 620px;
  line-height: 1.65;
  margin: 0 0 22px;
}
.legal-meta {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}
.meta-item {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.78rem;
  color: #94a3b8;
  font-weight: 600;
}

/* Content wrapper */
.legal-content {
  padding: 48px 0 80px;
}

/* Table of contents */
.toc {
  position: sticky;
  top: 100px;
  padding: 20px;
  background: #fafaff;
  border: 1px solid #e9e7f2;
  border-radius: 16px;
}
.toc-title {
  font-size: 0.68rem;
  font-weight: 800;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 14px;
}
.toc-link {
  display: block;
  padding: 6px 10px;
  border-radius: 8px;
  font-size: 0.82rem;
  font-weight: 600;
  color: #64748b;
  text-decoration: none;
  transition: all 0.15s ease;
  margin-bottom: 2px;
}
.toc-link:hover {
  background: #f3eeff;
  color: #8051FF;
}
.toc-link-active {
  background: #f3eeff;
  color: #8051FF;
  font-weight: 800;
}

/* Prose */
.prose {
  max-width: 720px;
  font-size: 0.95rem;
  line-height: 1.75;
  color: #334155;
}
.prose-section {
  margin-bottom: 44px;
  scroll-margin-top: 90px;
}
.prose-h2 {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 1.35rem;
  font-weight: 800;
  color: #0f0d24;
  letter-spacing: -0.4px;
  line-height: 1.3;
  margin: 0 0 18px;
}
.prose-num {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 10px;
  background: linear-gradient(135deg, #8051FF, #a855f7);
  color: white;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.3px;
  box-shadow: 0 8px 18px -8px rgba(128, 81, 255, 0.6);
  flex-shrink: 0;
}
.prose p { margin: 0 0 14px; }
.prose h3 {
  font-size: 0.98rem;
  font-weight: 800;
  color: #1e1b4b;
  letter-spacing: -0.2px;
  margin: 22px 0 10px;
}
.prose ul {
  margin: 0 0 16px;
  padding-left: 0;
  list-style: none;
}
.prose ul li {
  position: relative;
  padding-left: 26px;
  margin-bottom: 8px;
}
.prose ul li::before {
  content: "";
  position: absolute;
  left: 8px;
  top: 11px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #8051FF;
}
.prose strong {
  color: #0f0d24;
  font-weight: 800;
}
.prose a {
  color: #8051FF;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid rgba(128, 81, 255, 0.3);
  transition: border-color 0.15s ease;
}
.prose a:hover {
  border-bottom-color: #8051FF;
}

/* Contact card */
.contact-card {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 20px;
  background: linear-gradient(135deg, #fafaff 0%, #f3eeff 100%);
  border: 1px solid #e9e0ff;
  border-radius: 18px;
  margin-bottom: 32px;
}
.contact-icon {
  width: 46px;
  height: 46px;
  border-radius: 13px;
  background: linear-gradient(135deg, #8051FF, #a855f7);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 10px 22px -10px rgba(128, 81, 255, 0.6);
}
.contact-title {
  font-size: 0.92rem;
  font-weight: 800;
  color: #0f0d24;
  margin-bottom: 4px;
}
.contact-sub {
  font-size: 0.82rem;
  color: #64748b;
  line-height: 1.5;
}
.contact-sub a {
  color: #8051FF;
  font-weight: 700;
  text-decoration: none;
}

/* Footer actions */
.legal-footer {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  padding-top: 20px;
  border-top: 1px solid #f1f5f9;
}

/* Responsive */
@media (max-width: 960px) {
  .legal-title { font-size: 1.8rem; }
  .prose { font-size: 0.9rem; }
  .prose-h2 { font-size: 1.15rem; }
}
@media (max-width: 599px) {
  .legal-hero { padding: 40px 0 32px; }
  .legal-title { font-size: 1.6rem; }
  .prose-num { width: 28px; height: 28px; font-size: 0.66rem; }
  .contact-card { flex-direction: column; align-items: flex-start; text-align: left; }
}
</style>