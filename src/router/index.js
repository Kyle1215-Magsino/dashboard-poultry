import { createRouter, createWebHistory } from 'vue-router'

import AccountView from '@/views/AccountView.vue'  // your login page
import SignUp from '@/views/SignUp.vue'            // signup page if you have it
import DashboardView from '@/views/DashboardView.vue'
import Profile from '@/views/Profile.vue'

const routes = [
  { path: '/', component: AccountView },          // login page at "/"
  { path: '/SignUp', component: SignUp },         // signup with uppercase U
  { path: '/dashboardview', component: DashboardView },
  { path: '/profile', component: Profile }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
