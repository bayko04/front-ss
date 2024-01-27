import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from './stores/auth.store.js'
import { useAlertStore } from './stores/alert.store.js'
import Dashboard from './pages/Dashboard.vue'
import Analytics from './pages/Analytics.vue'
import Fintech from './pages/Fintech.vue'
import UsersTabs from './pages/community/UsersTabs.vue'
import Messages from './pages/Messages.vue'
import Account from './pages/settings/Account.vue'
import Notifications from './pages/settings/Notifications.vue'
import Signin from './pages/Signin.vue'
import Signup from './pages/Signup.vue'
import ResetPassword from './pages/ResetPassword.vue'
import CustomersList from './pages/Customers/CustomersList.vue'
import CustomerCreate from './pages/Customers/CustomerCreate.vue'
import CustomerUpdate from './pages/Customers/CustomerUpdate.vue'
import CustomerProfile from "./pages/Customers/CustomerProfile.vue";
import UserCreate from "./partials/community/UserCreate.vue";
import UserUpdate from "./partials/community/UserUpdate.vue";
import UserProfile from "./partials/community/UserProfile.vue";

const routerHistory = createWebHistory()

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: '/',
      component: Dashboard
    },
    {
      path: '/customers',
      component: CustomersList
    },
    {
      path: '/customers/create',
      component: CustomerCreate
    },
    {
      path: '/customers/update/:id',
      component: CustomerUpdate
    },
    {
      path: '/customers/profile/:id',
      name: 'customerProfile',
      component: CustomerProfile
    },
    {
      path: '/users',
      component: UsersTabs
    },
    {
      path: '/users/create',
      component: UserCreate
    },
    {
      path: '/users/update/:id',
      component: UserUpdate
    },
    {
      path: '/users/profile/:id',
      name: 'userProfile',
      component: UserProfile
    },
    {
      path: '/dashboard/analytics',
      component: Analytics
    },
    {
      path: '/dashboard/fintech',
      component: Fintech
    },
    {
      path: '/community/users-tabs',
      component: UsersTabs
    },
    {
      path: '/messages',
      component: Messages
    },
    {
      path: '/settings/account',
      component: Account
    },
    {
      path: '/settings/notifications',
      component: Notifications
    },
    {
      path: '/signin',
      component: Signin
    },
    {
      path: '/signup',
      component: Signup
    },
    {
      path: '/reset-password',
      component: ResetPassword
    },

  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/signin'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.userData) {
    authStore.returnUrl = to.fullPath;
    return '/signin';
  }
});

export default router
