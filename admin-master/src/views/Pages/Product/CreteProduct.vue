<template>
  <b-modal
    id="modal-CreateProduct"
    title="Thông tin sản phẩm"
    @ok="addProduct($event)"
  >
    <form enctype="multipart/form-data">
      <b-form-group label="Mã sản phẩm">
        <b-form-input
          v-model="post.productCode"
          type="text"
          required="required"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Tên sản phẩm">
        <b-form-input
          v-model="post.productName"
          type="text"
          required="required"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Hình ảnh">
        <b-form-file
          v-model="post.file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
      <b-form-group label="Giá sản phẩm">
        <b-form-input v-model="post.price" type="text" required="required">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Số lượng">
        <b-form-input v-model="post.quantity" type="text" required="required">
        </b-form-input>
      </b-form-group>
      <b-form-group label="Loại hình gợi ý">
        <b-form-input
          v-model="post.typesOftourism"
          type="text"
          required="required"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Miêu tả">
        <b-form-textarea
          v-model="post.description"
          type="text"
          required="required"
        >
        </b-form-textarea>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      post: {
        file: null
      }
    };
  },
  methods: {
    addProduct() {
      const formData = new FormData();
      formData.append("files", this.post.file);
      formData.append("productCode", this.post.productCode);
      formData.append("productName", this.post.productName);
      formData.append("price", this.post.price);
      formData.append("quantity", this.post.quantity);
      formData.append("typesOftourism", this.post.typesOftourism);
      formData.append("description", this.post.description);

      let uri = `${process.env.VUE_APP_PORT}/product`;
      this.axios
        .post(uri, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        })
        .then(() => {
          this.$emit("reload");
        });
    }
  }
};
</script>
