<template>
  <b-modal
    id="modal-UploadPlace"
    title="Thông tin thay đổi"
    @ok="update($event)"
  >
    <form>
      <div class="d-block">
        <b-form-group label="Địa điểm">
          <b-form-input
            v-model="data.placeName"
            type="text"
            required="required"
          >
          </b-form-input>
        </b-form-group>
        <b-form-group label="Loại hình">
          <b-form-select v-model="data.type">
            <option value="Ăn uống">Ăn uống</option>
            <option value="Tham quan">Tham quan</option>
            <option value="Mua sắm">Mua sắm</option>
            <option value="Trải nghiệm">Trải nghiệm</option>
          </b-form-select>
        </b-form-group>
        <b-form-group label="Thành phố">
          <b-form-input v-model="data.city" type="text" required="required">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Đường">
          <b-form-input v-model="data.district" type="text" required="required">
          </b-form-input>
        </b-form-group>
        <b-form-group label="Địa chỉ">
          <b-form-input
            v-model="data.apartmentNumber"
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
    return {};
  },
  props: {
    data: {
      type: Object
    }
  },
  methods: {
    update() {
      let uri = `${process.env.VUE_APP_PORT}/place/${this.data._id}`;
      this.axios.put(uri, this.data).then(() => {
        this.$emit("reload");
      });
    }
  }
};
</script>

<style></style>
