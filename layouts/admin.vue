<template>
  <v-app>
    <div class="d-flex admin-root">
      <!-- Desktop Sidebar -->
      <aside v-if="!isMobile" class="admin-sidebar">
        <div class="brand-block">
          <div class="brand-mark">
            <v-icon color="white" size="22">mdi-shield-crown</v-icon>
          </div>
          <div>
            <div class="brand-name">ChenjiLoop</div>
            <div class="brand-sub">{{ roleLabel }}</div>
          </div>
        </div>

        <div v-if="adminEmail" class="admin-chip">
          <v-avatar size="32" class="admin-chip-avatar">
            <span>{{ adminInitials }}</span>
          </v-avatar>
          <div class="admin-chip-text">
            <div class="admin-chip-name">{{ adminEmail }}</div>
            <div class="admin-chip-role">{{ roleLabel }}</div>
          </div>
        </div>

        <nav class="nav-list">
          <button
            v-for="item in menuItems"
            :key="item.view"
            class="nav-item"
            :class="{ 'nav-item-active': currentView === item.view }"
            @click="go(item.route)"
          >
            <span class="nav-icon-wrap">
              <v-icon size="18">{{ item.icon }}</v-icon>
            </span>
            <span class="nav-label">{{ item.title }}</span>
            <span v-if="item.badge && item.badge > 0" class="nav-badge">
              {{ item.badge > 99 ? '99+' : item.badge }}
            </span>
          </button>

          <button class="nav-item nav-item-logout" @click="logout">
            <span class="nav-icon-wrap">
              <v-icon size="18">mdi-logout</v-icon>
            </span>
            <span class="nav-label">Sign Out</span>
          </button>
        </nav>
      </aside>

      <!-- Main -->
      <main class="admin-main" :class="{ 'admin-main-mobile': isMobile }">
        <header class="admin-topbar">
          <button v-if="isMobile" class="topbar-icon-btn" @click="drawer = true">
            <v-icon size="20">mdi-menu</v-icon>
          </button>

          <div class="topbar-title">
            <h1 class="topbar-heading">{{ currentTitle }}</h1>
            <p class="topbar-sub">
              <span class="topbar-dot"></span>
              {{ adminEmail || 'Admin' }}
            </p>
          </div>

          <v-spacer></v-spacer>

          <button class="topbar-icon-btn topbar-bell" title="Alerts" @click="go('/tasks')">
            <v-icon size="20">mdi-bell-outline</v-icon>
            <span v-if="alertCount > 0" class="topbar-bell-badge">
              {{ alertCount > 99 ? '99+' : alertCount }}
            </span>
          </button>

          <button class="topbar-avatar" @click="logout">
            {{ adminInitials }}
          </button>
        </header>

        <div class="admin-content">
          <nuxt />
        </div>
      </main>

      <!-- Mobile Drawer -->
      <v-navigation-drawer v-model="drawer" temporary fixed width="280" class="mobile-drawer">
        <div class="mobile-drawer-inner">
          <div class="drawer-brand">
            <div class="brand-mark">
              <v-icon color="white" size="22">mdi-shield-crown</v-icon>
            </div>
            <div>
              <div class="brand-name">ChenjiLoop</div>
              <div class="brand-sub">{{ roleLabel }}</div>
            </div>
          </div>

          <nav class="drawer-scroll">
            <button
              v-for="item in menuItems"
              :key="item.view"
              class="nav-item"
              :class="{ 'nav-item-active': currentView === item.view }"
              @click="go(item.route); drawer = false"
            >
              <span class="nav-icon-wrap">
                <v-icon size="18">{{ item.icon }}</v-icon>
              </span>
              <span class="nav-label">{{ item.title }}</span>
              <span v-if="item.badge && item.badge > 0" class="nav-badge">
                {{ item.badge > 99 ? '99+' : item.badge }}
              </span>
            </button>

            <button class="nav-item nav-item-logout" @click="logout(); drawer = false">
              <span class="nav-icon-wrap">
                <v-icon size="18">mdi-logout</v-icon>
              </span>
              <span class="nav-label">Sign Out</span>
            </button>
          </nav>
        </div>
      </v-navigation-drawer>

      <!-- Mobile Bottom Nav -->
      <nav v-if="isMobile" class="bottom-nav">
        <button
          v-for="item in bottomNavItems"
          :key="item.view"
          class="bottom-nav-btn"
          :class="{ 'bottom-nav-btn-active': currentView === item.view }"
          @click="go(item.route)"
        >
          <v-icon size="20">{{ item.icon }}</v-icon>
          <span class="bottom-nav-label">{{ item.shortTitle || item.title }}</span>
        </button>
      </nav>
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'AdminLayout',
  data() {
    return {
      isMobile: false,
      drawer: false,
      adminEmail: null,
      adminRole: null,
      alertCount: 0,
      _pollInterval: null
    }
  },
  computed: {
    isSuperAdmin() {
      return ['SUPER_ADMIN', 'ADMIN'].includes(this.adminRole)
    },
    roleLabel() {
      const map = {
        SUPER_ADMIN: 'Super Admin',
        ADMIN: 'Admin',
        OPS: 'Operations',
        AUDITOR: 'Auditor',
        SUPPORT: 'Support'
      }
      return map[this.adminRole] || 'Admin'
    },
    allMenuItems() {
      return [
        { title: 'Overview',     view: 'overview',     icon: 'mdi-view-dashboard-outline', route: '/admin-master' },
        { title: 'Analytics',    view: 'analytics',    icon: 'mdi-chart-line',             route: '/analytics' },
        { title: 'Transactions', view: 'transactions', icon: 'mdi-magnify',                route: '/transactions' },
        { title: 'Wallets',      view: 'wallets',      icon: 'mdi-wallet',                 route: '/wallets' },
        { title: 'Tasks',        view: 'tasks',        icon: 'mdi-clipboard-list-outline', route: '/tasks', badge: this.alertCount },
        { title: 'Settings',     view: 'settings',     icon: 'mdi-cog-outline',            route: '/settings' },
        { title: 'Admins', view: 'admins', icon: 'mdi-shield-crown-outline', route: '/admins' },
        { title: 'Audit',        view: 'audit',        icon: 'mdi-history',                route: '/audit' }
      ]
    },
    menuItems() { return this.allMenuItems },
    bottomNavItems() { return this.menuItems.slice(0, 4) },
    currentView() {
      const p = this.$route.path
      if (p.startsWith('/admin-master')) return 'overview'
      if (p.startsWith('/analytics'))    return 'analytics'
      if (p.startsWith('/transactions')) return 'transactions'
      if (p.startsWith('/wallets'))      return 'wallets'
      if (p.startsWith('/tasks'))        return 'tasks'
      if (p.startsWith('/settings'))     return 'settings'
      if (p.startsWith('/admins'))       return 'admins'
      if (p.startsWith('/audit'))        return 'audit'
      return 'overview'
    },
    currentTitle() {
      const found = this.menuItems.find((i) => i.view === this.currentView)
      return found ? found.title : 'ChenjiLoop Admin'
    },
    adminInitials() {
      if (!this.adminEmail) return 'CL'
      const local = this.adminEmail.split('@')[0]
      return local.split(/[._-]/).map((w) => w[0]).join('').slice(0, 2).toUpperCase() || 'CL'
    }
  },
  watch: {
    '$route.path'() { this.fetchAlertCount() }
  },
  mounted() {
    this.onResize()
    window.addEventListener('resize', this.onResize)
    this.adminEmail = localStorage.getItem('adminEmail')
    this.adminRole = localStorage.getItem('adminRole')
    this.fetchAlertCount()
    this._pollInterval = setInterval(this.fetchAlertCount, 60000)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize)
    if (this._pollInterval) clearInterval(this._pollInterval)
  },
  methods: {
    onResize() { this.isMobile = window.innerWidth < 960 },
    async fetchAlertCount() {
      if (!this.isSuperAdmin) { this.alertCount = 0; return }
      try {
        const { data } = await this.$axios.get('/admin/analytics/overview')
        this.alertCount = Number(data?.reconciliation?.driftCount || 0) + Number(data?.settlement?.pending || 0)
      } catch (e) {
        // silent — layout shouldn't crash on failed poll
      }
    },
    go(path) {
      if (!path || this.$route.path === path) return
      const result = this.$router.push(path)
      if (result && result.catch) {
        result.catch((err) => {
          if (err && err.name !== 'NavigationDuplicated') console.error(err)
        })
      }
    },
    logout() {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminEmail')
      localStorage.removeItem('adminRole')
      this.adminEmail = null
      this.adminRole = null
      this.alertCount = 0
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
.admin-root {
  background: #f8fafc;
  display: flex;
  min-height: 100vh;
  width: 100%;
}
.admin-sidebar {
  width: 268px;
  flex-shrink: 0;
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: sticky;
  top: 0;
  padding: 24px 0;
  overflow: hidden;
}
.brand-block {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 0 22px 26px;
}
.brand-mark {
  width: 42px;
  height: 42px;
  border-radius: 12px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px -6px rgba(59, 130, 246, 0.7);
}
.brand-name {
  font-size: 1.05rem;
  font-weight: 800;
  color: white;
  line-height: 1.1;
}
.brand-sub {
  font-size: 0.68rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
  letter-spacing: 0.6px;
  margin-top: 2px;
  text-transform: uppercase;
}
.admin-chip {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 18px 26px;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
}
.admin-chip-avatar {
  background: linear-gradient(135deg, #2563eb, #3b82f6) !important;
  color: white !important;
  font-size: 0.68rem !important;
  font-weight: 800;
}
.admin-chip-text { min-width: 0; flex: 1; }
.admin-chip-name {
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.admin-chip-role {
  font-size: 0.62rem;
  color: rgba(255, 255, 255, 0.45);
  margin-top: 2px;
  text-transform: uppercase;
  font-weight: 600;
}
.nav-list {
  flex: 1;
  overflow-y: auto;
  padding: 0 14px 24px;
}
.nav-item {
  width: 100%;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 14px;
  background: transparent;
  border: none;
  border-radius: 10px;
  color: rgba(255, 255, 255, 0.62);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  font-family: inherit;
  text-align: left;
  margin-bottom: 3px;
  transition: all 0.2s;
}
.nav-item:hover {
  background: rgba(255, 255, 255, 0.06);
  color: white;
}
.nav-item-active {
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white !important;
  box-shadow: 0 8px 22px -8px rgba(59, 130, 246, 0.75);
}
.nav-icon-wrap {
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.05);
}
.nav-label { flex: 1; }
.nav-badge {
  min-width: 22px;
  height: 22px;
  padding: 0 7px;
  border-radius: 999px;
  background: #ef4444;
  color: #fff;
  font-size: 0.68rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.nav-item-logout {
  margin-top: 18px;
  padding-top: 18px;
  color: #fca5a5;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-radius: 0;
}
.admin-main { flex: 1; display: flex; flex-direction: column; min-width: 0; }
.admin-topbar {
  position: sticky;
  top: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 28px;
  background: rgba(248, 250, 252, 0.92);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid #e2e8f0;
}
.topbar-heading {
  font-size: 1.25rem;
  font-weight: 800;
  color: #0f172a;
  margin: 0;
}
.topbar-sub {
  font-size: 0.78rem;
  color: #64748b;
  margin: 3px 0 0;
  display: flex;
  align-items: center;
  gap: 6px;
}
.topbar-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #10b981;
}
.topbar-avatar {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: linear-gradient(135deg, #2563eb, #3b82f6);
  color: white;
  font-weight: 800;
  font-size: 0.78rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
}
.topbar-icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 11px;
  background: white;
  border: 1px solid #e2e8f0;
  color: #475569;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.topbar-bell-badge {
  position: absolute;
  top: -6px;
  right: -6px;
  min-width: 20px;
  height: 20px;
  padding: 0 6px;
  border-radius: 999px;
  background: #ef4444;
  color: white;
  font-size: 0.62rem;
  font-weight: 800;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #f8fafc;
}
.admin-content { flex: 1; padding: 28px 32px 48px; }
.admin-main-mobile .admin-content { padding: 18px 18px 104px; }
.mobile-drawer {
  background: linear-gradient(180deg, #0f172a 0%, #1e293b 100%) !important;
}
.mobile-drawer-inner { display: flex; flex-direction: column; height: 100%; }
.drawer-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}
.drawer-scroll { flex: 1; overflow-y: auto; padding: 14px; }
.bottom-nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 30;
  display: flex;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(14px);
  border-top: 1px solid #e2e8f0;
  padding: 6px 0;
}
.bottom-nav-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  padding: 6px 4px;
  background: transparent;
  border: none;
  color: #94a3b8;
  font-size: 0.65rem;
  font-weight: 600;
  cursor: pointer;
}
.bottom-nav-btn-active { color: #2563eb; }
.bottom-nav-label { line-height: 1; }
</style>