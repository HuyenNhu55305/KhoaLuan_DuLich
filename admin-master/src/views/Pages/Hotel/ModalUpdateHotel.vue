<template>
  <b-modal
    id="modal-UploadHotel"
    title="Thông tin thay đổi"
    @ok="update($event)"
  >
    <form>
      <div class="d-block">
        <b-form-group label="Tên Hotel">
          <b-form-input
            v-model="data.hotelName"
            type="text"
            required="required"
          >
          </b-form-input>
        </b-form-group>

        <b-form-group label="Chất lượng">
          <b-form-rating
            v-model="data.quality"
            variant="warning"
            class="mb-2"
          ></b-form-rating>
        </b-form-group>

        <b-form-group label="SDT">
          <b-form-input v-model="data.SDT" type="number" required="required">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Email">
          <b-form-input v-model="data.email" type="email" required="required">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Địa chỉ">
          <b-form-input v-model="data.city" type="text" required="required">
          </b-form-input>
        </b-form-group>
      </div>
    </form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    update() {
      let uri = `${process.env.VUE_APP_PORT}/hotel/${this.data._id}`;
      this.axios.put(uri, this.data).then(() => {
        this.$emit("reload");
      });
    }
  }
};
</script>

<style></style>
