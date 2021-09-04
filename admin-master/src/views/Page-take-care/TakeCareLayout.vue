<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Kiểm tra vé thanh toán ',
            path: '/check-bill',
            icon: 'fa fa-credit-card text-success'
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Hóa đơn quá hạn',
            path: '/bill-cancel',
            icon: 'fa fa-minus-square text-yellow'
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Danh sách vé tour',
            path: '/tiket',
            icon: 'fa fa-sticky-note text-orange'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Thông kê',
            path: '/statistical',
            icon: 'fa fa-align-left text-primary'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Quản lý',
            path: '/tour',
            icon: 'fa fa-binoculars text-orange'
          }"
        >
        </sidebar-item>
      </template>
    </side-bar>

    <div class="main-content">
      <dashboard-navbar :type="$route.meta.navbarType"></dashboard-navbar>

      <div @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>
<script>
/* eslint-disable no-new */
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

import DashboardNavbar from "../Layout/DashboardNavbar";
import ContentFooter from "../Layout/ContentFooter.vue";
import DashboardContent from "../Layout/Content.vue";
import { FadeTransition } from "vue2-transitions";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    DashboardContent,
    FadeTransition
  },
  methods: {
    initScrollbar() {
      let isWindows = navigator.platform.startsWith("Win");
      if (isWindows) {
        initScrollbar("sidenav");
      }
    }
  },
  mounted() {
    this.initScrollbar();
  }
};
</script>
<style lang="scss"></style>
