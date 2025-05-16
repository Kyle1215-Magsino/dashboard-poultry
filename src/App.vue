<template>
  <v-app>
    <!-- Sidebar -->
    <v-navigation-drawer
      v-if="showSidebar"
      app
      permanent
      width="240"
      class="drawer-gradient"
    >
      <v-list class="pa-0 ma-0 d-flex flex-column fill-height justify-space-between">
        <!-- Navigation Links -->
        <div>
          <!-- Dashboard -->
          <v-list-item to="/dashboardview" link exact-active-class="active-link">
            <v-list-item-icon>
              <v-icon>mdi-view-dashboard</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-black font-weight-bold">Dashboard</v-list-item-title>
          </v-list-item>

          <!-- Profile -->
          <v-list-item to="/profile" link exact-active-class="active-link">
            <v-list-item-icon>
              <v-icon>mdi-account-circle</v-icon>
            </v-list-item-icon>
            <v-list-item-title class="text-black font-weight-bold">Profile</v-list-item-title>
          </v-list-item>
        </div>

        <!-- Logout Button -->
        <div class="pa-4">
          <v-btn color="brown" block @click="logoutDialog = true">
            Logout
          </v-btn>
        </div>
      </v-list>
    </v-navigation-drawer>

    <!-- Logout Confirmation Dialog -->
    <v-dialog v-model="logoutDialog" max-width="400">
      <v-card>
        <v-card-title class="text-h6">Confirm Logout</v-card-title>
        <v-card-text>Are you sure you want to log out?</v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="logoutDialog = false">Cancel</v-btn>
          <v-btn color="brown" @click="confirmLogout">Logout</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-6">
        <router-view />
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

// Hide sidebar on login ("/") and signup ("/signup") pages
const showSidebar = computed(() => route.path !== '/' && route.path !== '/signup')

const logoutDialog = ref(false)

function confirmLogout() {
  logoutDialog.value = false
  localStorage.clear()
  router.push('/')
}
</script>

<style scoped>
.drawer-gradient {
  background: linear-gradient(to bottom, #ffe082, #8d6e63) !important;
  height: 100vh;
  width: 240px;
  padding: 0 !important;
  margin: 0 !important;
  box-shadow: none !important;
  border: none !important;
}

.v-navigation-drawer__content {
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
}

.v-navigation-drawer {
  position: fixed !important;
  top: 0;
  left: 0;
  bottom: 0;
  z-index: 2;
}

.active-link {
  background-color: rgba(0, 0, 0, 0.08);
  border-radius: 8px;
}
</style>

<style>
html,
body {
  margin: 0;
  padding: 0;
  height: 100%;
  width: 100%;
  overflow: hidden;
}
</style>
