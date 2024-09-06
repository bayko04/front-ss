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
import CustomerProfile from "./pages/Customers/CustomerProfile.vue";
import UserCreate from "./partials/community/UserCreate.vue";
import UserProfile from "./partials/community/UserProfile.vue";
import SocialsPanel from "./pages/SocialsPanel.vue";
import PortfolioList from "./pages/Portfolio/PortfolioList.vue";
import PortfolioCreate from "./pages/Portfolio/PortfolioCreate.vue";
import PortfolioRepay from "./pages/Portfolio/PortfolioRepay.vue";
import PortfolioProlongation from "./pages/Portfolio/PortfolioProlongation.vue";
import PortfolioPartrepayment from "./pages/Portfolio/PortfolioPartrepayment.vue";
import PortfolioAddloan from "./pages/Portfolio/PortfolioAddloan.vue";
import TransactionsList from "./pages/Transactions/TransactionsList.vue";
import RequestStatus from "./pages/systemSettings/RequestStatus.vue";
import Calendar from "./pages/Calendar.vue";
import Comments from "./pages/Comments.vue";
import Onboarding01 from "./pages/Onboarding01.vue";
import Onboarding02 from "./pages/Onboarding02.vue";
import Onboarding03 from "./pages/Onboarding03.vue";
import Triggers from "./pages/marketingSettings/Triggers.vue";
import Archive from "./pages/Archive.vue";
import AssignerSettings from "./pages/systemSettings/AssignerSettings.vue";
import Products from "./pages/Products/Products.vue";
import TaskType from "./pages/systemSettings/TaskType.vue";
import TriggerTemplate from "./partials/marketing/Autoresponder.vue";
import Reminders from "./pages/marketingSettings/Reminders.vue";
import Newsletters from "./pages/marketingSettings/Newsletters.vue";
import CreateNewsletter from "./partials/marketing/CreateNewsletter.vue";
import UserUpdate from "./partials/community/UserUpdate.vue";

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
      component: CustomersList,
    },
    {
      path: '/customers/create',
      component: CustomerCreate
    },
    {
      path: '/customers/update/:id',
      component: CustomerCreate
    },
    {
      path: '/customers/profile/:id',
      name: 'customerProfile',
      component: CustomerProfile
    },
    {
      path: '/users',
      component: UsersTabs,
      meta: {permission:'users.view'}
    },
    {
      path: '/users/create',
      component: UserCreate,
      meta: {permission :'users.add'}
    },
    {
      path: '/users/update/:id',
      component: UserCreate
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
      path: '/comments',
      component: Comments
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
      path: '/settings/socials-panel',
      component: SocialsPanel
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
    {
      path: '/portfolio',
      component: PortfolioList
    },
    {
      path: '/portfolio/create',
      component: PortfolioCreate
    },
    {
      path: '/portfolio/repay',
      component: PortfolioRepay
    },
    {
      path: '/portfolio/prolongation',
      component: PortfolioProlongation
    },
    {
      path: '/portfolio/partrepayment',
      component: PortfolioPartrepayment
    },
    {
      path: '/portfolio/addloan',
      component: PortfolioAddloan
    },
    {
      path: '/transactions',
      component: TransactionsList
    },
    {
      path: '/systemSettings/requestStatus',
      component: RequestStatus
    },
    {
      path: '/systemSettings/taskType',
      component: TaskType
    },
    {
      path: '/systemSettings/AssignerSettings',
      component: AssignerSettings
    },
    {
      path: '/calendar',
      component: Calendar
    },
    {
      path: '/onboarding01',
      component: Onboarding01,
      meta: {permission:'companies.add'}
    },
    {
      path: '/onboarding02',
      component: Onboarding02,
      meta: {permission:'companies.add'}
    },
    {
      path: '/onboarding03',
      component: Onboarding03,
      meta: {permission:'companies.add'}
    },
    {
      path: '/products',
      component: Products
    },
    {
      path: '/archive',
      component: Archive
    },
    {
      path: '/marketingSettings/triggers',
      component: Triggers
    },
    {
      path: '/marketingSettings/reminders',
      component: Reminders
    },
    {
      path: '/marketingSettings/newsletters',
      component: Newsletters
    },
    {
      path: '/marketing/autoresponder',
      component: TriggerTemplate
    },
    {
      path: '/marketing/autoresponder/:id',
      component: TriggerTemplate,
      name: 'autoresponder'
    },
    {
      path: '/marketing/create-newsletter',
      component: CreateNewsletter
    },
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = ['/signin', '/onboarding01', '/onboarding02', '/onboarding03'];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (authRequired && !authStore.userData) {
    authStore.returnUrl = to.fullPath;
    return '/signin';
  }

  // const permission = to.meta.permission;
  // if (permission && !authStore.hasPermission(permission)) {
  //   return '/';
  // }
});

export default router
