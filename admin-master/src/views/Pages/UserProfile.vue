<template>
  <div>
    <div
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center profile-header"
      style="min-height: 300px; background-image: url(img/theme/profile-cover.jpg); background-size: cover; background-position: center top;"
    >
      <b-container fluid>
        <!-- Mask -->
        <span class="mask bg-gradient-success opacity-8"></span>
        <!-- Header container -->
      </b-container>
    </div>

    <b-container fluid class="mt--6">
      <b-row>
        <b-col class=" text-center">
          <!-- <user-card></user-card> -->
          <b-card no-body class="card-profile" alt="Image placeholder" img-top>
            <b-row class="justify-content-center">
              <b-col lg="3" class="order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <b-img :src="post.image" rounded="circle" />
                  </a>
                </div>
              </b-col>
            </b-row>

            <b-card-header
              class="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"
            >
              <div class="d-flex justify-content-between">
                <a href="#" class="btn btn-sm btn-info mr-4">Connect</a>
                <a href="#" class="btn btn-sm btn-default float-right"
                  >Message</a
                >
              </div>
            </b-card-header>

            <b-card-body class="pt-0">
              <b-row>
                <b-col>
                  <div
                    class="card-profile-stats d-flex justify-content-center mt-md-5"
                  >
                    <div>
                      <span class="heading">22</span>
                      <span class="description">Friends</span>
                    </div>
                    <div>
                      <span class="heading">10</span>
                      <span class="description">Photos</span>
                    </div>
                    <div>
                      <span class="heading">89</span>
                      <span class="description">Comments</span>
                    </div>
                  </div>
                </b-col>
              </b-row>
              <div class="text-center">
                <h5 class="h3">
                  {{ post.fullName }}
                </h5>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>{{ post.role }}
                </div>
              </div>
            </b-card-body>
          </b-card>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import moment from "moment";

export default {
  components: {},
  data() {
    return {
      post: null
    };
  },
  mounted() {
    this.getUserLogin();
  },
  methods: {
    getUserLogin() {
      this.post = JSON.parse(localStorage.getItem("user"));
    }
  }
};
</script>
<style></style>
