<template>
  <b-modal
    id="modal-UploadProduct"
    title="Thông tin thay đổi"
    @ok="update($event)"
  >
    <form enctype="multipart/form-data">
      <b-form-group label="Tên sản phẩm">
        <b-form-input
          v-model="data.productName"
          type="text"
          required="required"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Hình ảnh">
        <b-form-file
          v-model="data.file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
      <b-form-group label="Giá sản phẩm">
        <b-form-input v-model="data.price" type="text" required="required">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Số lượng">
        <b-form-input v-model="data.quantity" type="text" required="required">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Loại hình gợi ý">
        <b-form-input
          v-model="data.typesOftourism"
          type="text"
          required="required"
        >
        </b-form-input>
      </b-form-group>
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
      let uri = `${process.env.VUE_APP_PORT}/product/${this.data._id}`;
      this.axios.put(uri, this.data).then(() => {
        this.$emit("reload");
      });
    }
  }
};
</script>

<style></style>
