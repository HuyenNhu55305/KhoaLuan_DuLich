<template>
  <b-modal
    id="modal-CreatePlace"
    title="Thông tin Place"
    @ok="addPlace($event)"
  >
    <form>
      <div class="d-block">
        <b-form-group label="Địa điểm">
          <b-form-input
            v-model="post.placeName"
            type="text"
            required="required"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Loại hình">
          <b-form-select v-model="post.type">
            <option value="Ăn uống">Ăn uống</option>
            <option value="Tham quan">Tham quan</option>
            <option value="Mua sắm">Mua sắm</option>
            <option value="Trải nghiệm">Trải nghiệm</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Thành phố">
          <b-form-input v-model="post.city" type="text" required="required">
          </b-form-input>
        </b-form-group>

        <b-form-group label="Đường">
          <b-form-input v-model="post.district" type="text" required="required">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Địa chỉ">
          <b-form-input
            v-model="post.apartmentNumber"
            type="text"
            required="required"
          >
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
    addPlace() {
      let uri = `${process.env.VUE_APP_PORT}/place`;
      this.axios.post(uri, this.post).then(() => {
        this.$emit("reload");
      });
    }
  }
};
</script>
