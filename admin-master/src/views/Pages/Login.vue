<template>
  <div>
    <!-- Header -->
    <div class="header bg-gradient-success py-6 py-lg-8 pt-lg-6">
      <b-container>
        <div class="header-body text-center mb-7">
          <b-row class="justify-content-center">
            <b-col xl="5" lg="6" md="8" class="px-5">
              <h1 class="text-white">Welcome!</h1>
              <p class="text-lead text-white">
                Trang chủ Website du lịch Banda Fly
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
    <b-container class="mt--9 pb-5">
      <b-row class="justify-content-center">
        <b-col lg="5" md="7">
          <b-card no-body class=" border-0 mb-0">
            <b-card-body class="px-lg-5 py-lg-5">
              <div class="text-center text-muted mb-4">
                <h3>Đăng nhập</h3>
              </div>
              <validation-observer
                v-slot="{ handleSubmit }"
                ref="formValidator"
              >
                <b-form role="form" @submit.prevent="handleSubmit(login)">
                  <base-input
                    alternative
                    class="mb-3"
                    name="Email"
                    :rules="{ required: true, email: true }"
                    prepend-icon="ni ni-email-83"
                    placeholder="Email"
                    v-model="model.email"
                  >
                  </base-input>

                  <base-input
                    alternative
                    class="mb-3"
                    name="Password"
                    :rules="{ required: true, min: 6 }"
                    prepend-icon="ni ni-lock-circle-open"
                    type="password"
                    placeholder="Password"
                    v-model="model.password"
                  >
                  </base-input>

                  <b-form-checkbox v-model="model.rememberMe"
                    >Remember me</b-form-checkbox
                  >
                  <div class="text-center">
                    <b-button class="mt-4" type="submit" variant="primary">
                      Đăng nhập
                    </b-button>
                  </div>
                </b-form>
              </validation-observer>
            </b-card-body>
          </b-card>
          <b-row class="mt-3">
            <b-col cols="6">
              <router-link to="/dashboard" class="text-light">
                <small>Forgot password?</small></router-link
              >
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
export default {
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
    notification(message) {
      console.log("a");
    },
    login() {
      let uri = `${process.env.VUE_APP_PORT}/account/login`;
      this.axios.post(uri, this.model).then(response => {
        if (response.data.message !== undefined) {
          this.$bvToast.toast(`${response.data.message}`, {
            title: `Warning`,
            variant: "danger",
            solid: true
          });
        } else {
          localStorage.setItem("user", JSON.stringify(response.data));
          this.$router.push({ name: "home" });
        }
      });
    }
  }
};
</script>
<style scoped>
.btn-primary {
  border-color: #007bff !important;
}
</style>
