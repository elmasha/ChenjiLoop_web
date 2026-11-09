<template>
  <div class="d-flex bg-surface dashboard-root" style="min-height: 100vh;">
    <!-- DESKTOP SIDEBAR -->
    <v-navigation-drawer
      v-if="!nav_bars"
      permanent
      width="260"
      class="elevation-0 sidebar-glass"
    >
      <div class="pa-6 pb-4">
        <div class="d-flex align-center cursor-pointer brand-hover" @click="goTo(dashboardRoute)">
          <v-avatar color="#8051FF" size="46" class="elevation-3 mr-3 brand-avatar">
            <v-icon color="white" size="24">mdi-shield-account</v-icon>
          </v-avatar>
          <div>
            <div class="text-h6 font-weight-bold purple--text brand-text">Makaazi</div>
            <div class="text-caption text--secondary font-weight-medium">Official Console</div>
          </div>
        </div>
      </div>

      <v-divider class="mx-4 mb-2 opacity-30"></v-divider>

      <v-list dense nav class="px-3 py-2">
        <v-list-item
          v-for="(item, idx) in menuItems"
          :key="item.title"
          @click="goTo(item.route)"
          link
          class="mb-1 rounded-xl nav-item-premium"
          :class="{ 'nav-item-active': isActive(item.route) }"
          :style="{ 'animation-delay': idx * 50 + 'ms' }"
        >
          <v-list-item-icon class="mr-3">
            <v-icon :color="isActive(item.route) ? '#8051FF' : 'grey'" size="22">
              {{ item.icon }}
            </v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title
              class="font-weight-semibold text-body-2"
              :class="{ 'purple--text': isActive(item.route) }"
            >
              {{ item.title }}
            </v-list-item-title>
          </v-list-item-content>
          <v-list-item-action v-if="item.badge && item.badge > 0">
            <div class="nav-badge">{{ item.badge > 99 ? '99+' : item.badge }}</div>
          </v-list-item-action>
        </v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pa-4 pb-6">
          <div class="help-card mb-4">
            <v-icon color="#8051FF" size="22" class="mb-2">mdi-lifebuoy</v-icon>
            <div class="help-title">Questions?</div>
            <div class="help-sub">Contact your estate admin</div>
          </div>
          <v-btn
            block outlined color="#8051FF"
            class="rounded-xl text-capitalize font-weight-medium signout-btn"
            @click="$emit('logout')"
          >
            <v-icon left size="18" color="#8051FF">mdi-logout</v-icon>
            Sign Out
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- MOBILE BOTTOM NAV -->
    <v-bottom-navigation
      v-if="nav_bars"
      v-model="activeTab"
      color="#8051FF"
      grow
      fixed
      class="elevation-8 bottom-nav-premium"
      style="z-index: 100;"
      height="64"
    >
      <v-btn
        v-for="item in bottomMenuItems"
        :key="item.title"
        @click="goTo(item.route)"
        :value="item.route"
        class="mobile-nav-btn"
      >
        <v-icon size="22">{{ item.icon }}</v-icon>
        <span class="mobile-nav-label">{{ item.title }}</span>
        <span
          v-if="item.badge && item.badge > 0"
          class="mobile-badge"
        >{{ item.badge > 9 ? '9+' : item.badge }}</span>
      </v-btn>
    </v-bottom-navigation>

    <!-- MAIN -->
    <v-main :class="nav_bars ? 'pb-16' : ''" class="main-premium">
      <!-- HEADER -->
      <div class="sticky-header-premium px-4 px-sm-6 py-4">
        <v-container fluid class="pa-0">
          <v-row align="center" no-gutters>
            <v-col cols="8" sm="6">
              <div class="d-flex align-center">
                <v-btn
                  v-if="showBack"
                  icon
                  small
                  class="mr-2 back-btn"
                  @click="goTo(backRoute || dashboardRoute)"
                >
                  <v-icon size="20">mdi-arrow-left</v-icon>
                </v-btn>
                <div class="header-text">
                  <div class="d-flex align-center flex-wrap">
                    <h1 class="text-h6 text-sm-h5 font-weight-bold text--primary page-title">
                      {{ title }}
                    </h1>
                    <v-chip
                      v-if="chip"
                      x-small
                      label
                      color="purple lighten-5 purple--text"
                      class="ml-2 font-weight-bold hidden-xs-only"
                    >
                      {{ chip }}
                    </v-chip>
                  </div>
                  <div class="d-flex align-center mt-1">
                    <v-icon x-small color="success" class="mr-1">mdi-circle</v-icon>
                    <span class="text-caption text--secondary">{{ subtitle }}</span>
                  </div>
                </div>
              </div>
            </v-col>
            <v-col cols="4" sm="6" class="d-flex justify-end align-center">
              <slot name="header-actions"></slot>

              <button
                class="icon-btn mr-2"
                :disabled="loading"
                @click="$emit('refresh')"
              >
                <v-icon size="16" :class="{ spin: loading }">
                  {{ loading ? 'mdi-loading' : 'mdi-refresh' }}
                </v-icon>
              </button>

              <v-avatar color="#8051FF" size="38" class="ml-1 avatar-glow">
                <span class="white--text font-weight-bold text-caption">{{ initials }}</span>
              </v-avatar>
            </v-col>
          </v-row>
        </v-container>
      </div>

      <!-- PAGE CONTENT -->
      <v-container :fluid="nav_bars" class="px-4 px-sm-6 pt-3 pt-sm-5 pb-8">
        <slot></slot>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: 'OfficialLayout',
  props: {
    title: { type: String, default: 'Dashboard' },
    subtitle: { type: String, default: '' },
    chip: { type: String, default: '' },
    loading: { type: Boolean, default: false },
    showBack: { type: Boolean, default: true },
    backRoute: { type: String, default: null },
    estateId: { type: [Number, String], default: null },
    uid: { type: String, default: null },
    officialName: { type: String, default: '' },
    officialRole: { type: String, default: '' },
    pendingCount: { type: Number, default: 0 },
  },
  data() {
    return {
      nav_bars: false,
      activeTab: this.$route?.path || '',
    };
  },
  computed: {
    dashboardRoute() {
      return this.estateId
        ? `/officials/dashboard/${this.estateId}`
        : '/officials/dashboard';
    },
    initials() {
      const n = this.officialName || 'O';
      return n.split(' ').map((x) => x[0]).join('').slice(0, 2).toUpperCase();
    },
    menuItems() {
      return [
        { title: 'Dashboard', icon: 'mdi-view-dashboard', route: this.dashboardRoute },
        { title: 'Pending',   icon: 'mdi-account-clock',  route: '/officials/pending',   badge: this.pendingCount },
        { title: 'Residents', icon: 'mdi-home-group',     route: '/officials/residence' },
        { title: 'Payments',  icon: 'mdi-currency-usd',   route: '/officials/payments' },
        { title: 'Charges',   icon: 'mdi-tag-multiple',   route: '/officials/charges' },
        { title: 'Team',      icon: 'mdi-account-supervisor', route: '/officials/team' },
        { title: 'Cash',      icon: 'mdi-cash-register',  route: '/officials/cash' },
        { title: 'Settings',  icon: 'mdi-cog',            route: '/officials/settings' },
      ];
    },
    bottomMenuItems() {
      return [
        { title: 'Home',     icon: 'mdi-view-dashboard', route: this.dashboardRoute },
        { title: 'Pending',  icon: 'mdi-account-clock',  route: '/officials/pending', badge: this.pendingCount },
        { title: 'Payments', icon: 'mdi-currency-usd',   route: '/officials/payments' },
        { title: 'Settings', icon: 'mdi-cog',            route: '/officials/settings' },
      ];
    },
  },
  mounted() {
    this.onResize();
    window.addEventListener('resize', this.onResize);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.onResize);
  },
  methods: {
    onResize() {
      this.nav_bars = window.innerWidth < 768;
    },
    isActive(route) {
      return this.$route && this.$route.path === route;
    },
    goTo(path) {
      if (!path) return;
      if (this.$route && this.$route.path === path) return;
      try {
        const result = this.$router.push(path);
        if (result && typeof result.catch === 'function') result.catch(() => {});
      } catch {
        window.location.href = path;
      }
    },
  },
};
</script>

<style scoped>
/* ... same styles as your current official pages — sidebar-glass, nav-item-premium, help-card, sticky-header-premium, bottom-nav-premium, etc. ... */
</style>