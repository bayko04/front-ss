import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "./stores/auth.store.js";
import { useAlertStore } from "./stores/alert.store.js";
import Dashboard from "./pages/Dashboard.vue";
import Analytics from "./pages/Analytics.vue";
import Fintech from "./pages/Fintech.vue";
import UsersTabs from "./pages/community/UsersTabs.vue";
import Messages from "./pages/Messages.vue";
import Account from "./pages/settings/Account.vue";
import Notifications from "./pages/settings/Notifications.vue";
import Signin from "./pages/Signin.vue";
import Signup from "./pages/Signup.vue";
import ResetPassword from "./pages/ResetPassword.vue";
import CustomersList from "./pages/Customers/CustomersList.vue";
import CustomerCreate from "./pages/Customers/CustomerCreate.vue";
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
import RequestStatus from "./pages/systemSettings/RequestStatus.vue";
import Calendar from "./pages/Calendar/Calendar.vue";
import Comments from "./pages/Comments.vue";
import Onboarding01 from "./pages/Onboarding01.vue";
import Onboarding02 from "./pages/Onboarding02.vue";
import Onboarding03 from "./pages/Onboarding03.vue";
import Archive from "./pages/Archive.vue";
import AssignerSettings from "./pages/systemSettings/AssignerSettings.vue";
import Products from "./pages/Products/Products.vue";
import TaskType from "./pages/systemSettings/TaskType.vue";
import Script from "./partials/marketing/Script.vue";
import Scripts from "./pages/marketingSettings/Scripts.vue";
import Newsletters from "./pages/marketingSettings/Newsletters.vue";
import CreateNewsletter from "./partials/marketing/CreateNewsletter.vue";
import AutoClientRetention from "./pages/marketingSettings/AutoClientRetention.vue";
import CalendarForMiniApp from "./pages/Calendar/CalendarForMiniApp.vue";
import Transactions from "./pages/finance/Transactions.vue";
import UpdateNewsletter from "./partials/marketing/UpdateNewsletter.vue";
import ClientsList from "./pages/Customers/ClientsList.vue";
import MainLayout from "./pages/Layouts/MainLayout.vue";
import TransactionsList from "./pages/finance/TransactionsList.vue";
import Overview from "./pages/finance/Overview.vue";
import KanbanBoard from "./pages/KanbanBoard/KanbanBoard.vue";

const routerHistory = createWebHistory();

const router = createRouter({
  history: routerHistory,
  routes: [
    {
      path: "/",
      component: Dashboard,
    },
    {
      path: "/finance",
      component: Transactions,
      children: [
        {
          path: "overview",
          component: Overview,
        },
        {
          path: "transactions",
          component: TransactionsList,
        },
      ],
    },
    {
      path: "/kanban-board",
      component: MainLayout,
      children: [
        {
          path: "",
          component: KanbanBoard,
        },
      ],
    },
    {
      path: "/customers",
      component: CustomersList,
    },
    {
      path: "/customers/create",
      component: CustomerCreate,
    },
    {
      path: "/customers/update/:id",
      component: CustomerCreate,
    },
    {
      path: "/customers/profile/:id",
      name: "customerProfile",
      component: CustomerProfile,
    },
    {
      path: "/users",
      component: UsersTabs,
      meta: { permission: "users.view" },
    },
    {
      path: "/users/create",
      component: UserCreate,
      meta: { permission: "users.add" },
    },
    {
      path: "/users/update/:id",
      component: UserCreate,
    },
    {
      path: "/users/profile/:id",
      name: "userProfile",
      component: UserProfile,
    },
    {
      path: "/dashboard/analytics",
      component: Analytics,
    },
    {
      path: "/dashboard/fintech",
      component: Fintech,
    },
    {
      path: "/community/users-tabs",
      component: UsersTabs,
    },
    {
      path: "/messages",
      component: Messages,
    },
    {
      path: "/comments",
      component: Comments,
    },
    {
      path: "/settings/account",
      component: Account,
    },
    {
      path: "/settings/notifications",
      component: Notifications,
    },
    {
      path: "/settings/socials-panel",
      component: SocialsPanel,
    },
    {
      path: "/signin",
      component: Signin,
    },
    {
      path: "/signup",
      component: Signup,
    },
    {
      path: "/reset-password",
      component: ResetPassword,
    },
    {
      path: "/portfolio",
      component: PortfolioList,
    },
    {
      path: "/portfolio/create",
      component: PortfolioCreate,
    },
    {
      path: "/portfolio/repay",
      component: PortfolioRepay,
    },
    {
      path: "/portfolio/prolongation",
      component: PortfolioProlongation,
    },
    {
      path: "/portfolio/partrepayment",
      component: PortfolioPartrepayment,
    },
    {
      path: "/portfolio/addloan",
      component: PortfolioAddloan,
    },
    {
      path: "/systemSettings/requestStatus",
      component: RequestStatus,
    },
    {
      path: "/systemSettings/taskType",
      component: TaskType,
    },
    {
      path: "/systemSettings/AssignerSettings",
      component: AssignerSettings,
    },
    {
      path: "/calendar",
      component: Calendar,
    },
    {
      path: "/calendar-for-mini-app",
      component: CalendarForMiniApp,
    },
    {
      path: "/onboarding01",
      component: Onboarding01,
      meta: { permission: "companies.add" },
    },
    {
      path: "/onboarding02",
      component: Onboarding02,
      meta: { permission: "companies.add" },
    },
    {
      path: "/onboarding03",
      component: Onboarding03,
      meta: { permission: "companies.add" },
    },
    {
      path: "/products",
      component: Products,
    },
    {
      path: "/archive",
      component: Archive,
    },
    {
      path: "/marketingSettings/auto-client-retention",
      component: AutoClientRetention,
    },
    {
      path: "/marketingSettings/scripts",
      component: Scripts,
    },
    {
      path: "/marketingSettings/newsletters",
      component: Newsletters,
    },
    {
      path: "/marketing/scripts/create",
      component: Script,
    },
    {
      path: "/marketing/scripts/:id",
      component: Script,
      name: "script",
    },
    {
      path: "/marketing/newsletters/create",
      component: CreateNewsletter,
    },
    {
      path: "/marketing/newsletters/update/:id",
      component: UpdateNewsletter,
    },
  ],
});

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore();
  alertStore.clear();

  // redirect to login page if not logged in and trying to access a restricted page
  const publicPages = [
    "/signin",
    "/onboarding01",
    "/onboarding02",
    "/onboarding03",
  ];
  const authRequired = !publicPages.includes(to.path);
  const authStore = useAuthStore();

  if (!authStore.userData && window.Telegram.WebApp?.initData) {
    authStore.returnUrl = to.fullPath;
    await authStore.loginByTelegramMiniApp(window.Telegram.WebApp.initData);
  }

  if (!authStore.userData && to.query.user_id && to.query.integration_token) {
    authStore.returnUrl = to.fullPath;
    await authStore.loginByIntegrations(
      to.query.user_id,
      to.query.integration_token
    );
  }

  if (authRequired && !authStore.userData) {
    authStore.returnUrl = to.fullPath;
    return "/signin";
  }

  // const permission = to.meta.permission;
  // if (permission && !authStore.hasPermission(permission)) {
  //   return '/';
  // }
});

export default router;
