<template>
  <div class="wrapper">
    <notifications></notifications>
    <side-bar>
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'Tour ',
            path: '/tour',
            icon: 'fa fa-plane text-success'
          }"
        >
        </sidebar-item>

        <sidebar-item
          :link="{
            name: 'Khách hàng',
            path: '/Customer',
            icon: 'fa fa-users text-yellow'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Nhân viên',
            path: '/Employee',
            icon: 'fa fa-user text-primary'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Khách sạn',
            path: '/Hotel',
            icon: 'fa fa-bed text-primary'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Sản phẩm',
            path: '/Product',
            icon: 'fa fa-truck text-orange'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Địa điểm',
            path: '/Place',
            icon: 'ni ni-pin-3 text-primary'
          }"
        >
        </sidebar-item>
        <sidebar-item
          :link="{
            name: 'Chắm sóc khách hàng',
            path: '/check-bill',
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

import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";
import DashboardContent from "./Content.vue";
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
