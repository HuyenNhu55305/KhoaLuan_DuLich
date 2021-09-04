import DashboardLayout from "@/views/Layout/DashboardLayout.vue";
import AuthLayout from "@/views/Pages/AuthLayout.vue";
import TakeCareLayout from "../views/Page-take-care/TakeCareLayout.vue";
import Home from "@/views/Pages/Home.vue";
import NotFound from "@/views/NotFoundPage.vue";
import vue from "vue";
import Router from "vue-router";

vue.use(Router);
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      redirect: "login",
      component: AuthLayout,
      children: [
        {
          path: "/home",
          name: "home",
          component: Home
        },
        {
          path: "/login",
          name: "login",
          component: () =>
            import(/* webpackChunkName: "demo" */ "../views/Pages/Login.vue")
        }
      ]
    },
    {
      path: "/",
      redirect: "takecare",
      component: TakeCareLayout,
      children: [
        {
          path: "/check-bill",
          name: "check-bill",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Page-take-care/Check-bill.vue"
            )
        },
        {
          path: "/bill-cancel",
          name: "bill-cancel",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Page-take-care/Bill-cacel.vue"
            )
        },
        {
          path: "/tiket",
          name: "tiket",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Page-take-care/List-ticket.vue"
            )
        },
        {
          path: "/statistical",
          name: "statistical",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/statistical/Statistical.vue"
            )
        }
      ]
    },
    {
      path: "/",
      redirect: "dashboard",
      component: DashboardLayout,
      children: [
        {
          path: "/tour",
          name: "tour",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/Tour/Tour.vue"
            )
        },
        {
          path: "/CreateTour",
          name: "CreateTour",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/Tour/CreateTour.vue"
            )
        },
        {
          path: "/updateTour/:id",
          name: "updateTour",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/Tour/UpdateTour.vue"
            )
        },
        {
          path: "/Customer",
          name: "Customer",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/Customer/TableCustomer.vue"
            )
        },
        {
          path: "/Employee",
          name: "Employee",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/Employee/TableEmployee.vue"
            )
        },
        {
          path: "/Hotel",
          name: "Hotel",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/Hotel/TableHotel.vue"
            )
        },
        {
          path: "/Product",
          name: "Product",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/Product/TableProduct.vue"
            )
        },
        {
          path: "/Place",
          name: "Place",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/Place/TablePlace.vue"
            )
        },

        {
          path: "/profile",
          name: "profile",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/UserProfile.vue"
            )
        },
        {
          path: "/maps",
          name: "maps",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/UserProfile.vue"
            )
        },
        {
          path: "/tables",
          name: "tables",
          component: () =>
            import(
              /* webpackChunkName: "demo" */ "../views/Pages/UserProfile.vue"
            )
        },
        { path: "*", component: NotFound }
      ]
    }
  ]
});

export default router;
