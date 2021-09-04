<template>
  <b-modal
    id="modal-CreateHotel"
    title="Thông tin Hotel"
    @ok="addHotel($event)"
  >
    <form>
      <div class="d-block">
        <b-form-group label="Tên Hotel">
          <b-form-input
            v-model="post.hotelName"
            type="text"
            required="required"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Chất lượng">
          <b-form-rating
            v-model="post.quality"
            variant="warning"
            class="mb-2"
          ></b-form-rating>
        </b-form-group>

        <b-form-group label="SDT">
          <b-form-input v-model="post.phone" type="number" required="required">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Email">
          <b-form-input v-model="post.email" type="email" required="required">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Địa chỉ">
          <b-form-input v-model="post.city" type="text" required="required">
          </b-form-input>
        </b-form-group>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      post: {}
    };
  },
  methods: {
    addHotel() {
      let uri = `${process.env.VUE_APP_PORT}/hotel`;
      this.axios.post(uri, this.post).then(() => {
        this.$emit("reload");
      });
    }
  }
};
</script>
