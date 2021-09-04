<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-7 py-lg-8 pt-lg-9">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">
                Use these awesome forms to login or create new account in your
                project for free.
              </p>
            </b-col>
          </b-row>
        </div>
      </b-container>
      <div class="separator separator-bottom separator-skew zindex-100">
        <svg
          x="0"
          y="0"
          viewBox="0 0 2560 100"
          preserveAspectRatio="none"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon
            class="fill-default"
            points="2560 0 2560 100 0 100"
          ></polygon>
        </svg>
      </div>
    </div>
    <!-- Page content -->
    <b-container class="mt--8 pb-5">
      <b-row class="justify-content-center" style="padding-bottom: 179px;">
        <b-col cols="6" lg="5" md="7">
          <b-card no-body class=" border-0 mb-0" v-on:click="goPageTakecare()">
            <b-card-header class="bg-transparent pb-5">
              <div class="text-center mt-5">
                <span class="btn-inner--text font-weight-bold"
                  >Chăm sóc khách hàng</span
                >
              </div>
            </b-card-header>
          </b-card>
        </b-col>

        <b-col cols="6" lg="5" md="7">
          <b-card no-body class=" border-0 mb-0" v-on:click="goPageAmin()">
            <b-card-header class="bg-transparent  pb-5">
              <div class="btn-wrapper text-center mt-5">
                <span class="btn-inner--text font-weight-bold">Quản lý</span>
              </div>
            </b-card-header>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import BaseNav from "../../components/Navbar/BaseNav.vue";
export default {
  components: { BaseNav },
  data() {
    return {
      model: {
        email: "",
        password: "",
        rememberMe: false
      }
    };
  },
  methods: {
    onSubmit() {
      // this will be called only after form is valid. You can do api call here to login
    },
    goPageAmin() {
      this.$router.push({ name: "tour" });
    },
    goPageTakecare() {
      this.$router.push({ name: "check-bill" });
    }
  }
};
</script>
