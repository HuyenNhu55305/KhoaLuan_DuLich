<template>
  <b-modal
    id="modal-UploadEmployye"
    title="Thông tin thay đổi"
    @ok="update($event)"
  >
    <form enctype="multipart/form-data">
      <b-form-group label="Họ tên">
        <b-form-input
          v-model="data.fullName"
          type="text"
          placeholder="Họ và tên"
          required="required"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Ngày sinh">
        <b-form-datepicker
          id="example-datepicker"
          v-model="data.dateOfbirth"
          required="required"
        >
        </b-form-datepicker>
      </b-form-group>

      <b-form-group label="Giới tính">
        <b-form-select v-model="data.gender" required="required">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </b-form-select>
      </b-form-group>

      <b-form-group label="Email">
        <b-form-input
          v-model="data.email"
          type="email"
          placeholder="Email"
          required="required"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Vai trò">
        <b-form-select v-model="data.role" required="required">
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </b-form-select>
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
      let uri = `${process.env.VUE_APP_PORT}/employee/${this.data._id}`;
      this.axios.put(uri, this.data).then(response => {
        this.$emit("reload");
      });
    }
  }
};
</script>

<style></style>
