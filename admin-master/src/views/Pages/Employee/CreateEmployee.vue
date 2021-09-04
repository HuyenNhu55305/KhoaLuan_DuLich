<template>
  <b-modal
    id="modal-CreateEmployee"
    title="Thông tin Nhân viên"
    @ok="addEmployee($event)"
  >
    <form enctype="multipart/form-data">
      <b-form-group label="Mã NV">
        <b-form-input
          v-model="post.employeeId"
          type="text"
          placeholder="NV00.."
          required="required"
        ></b-form-input>
      </b-form-group>
      <b-form-group label="Họ tên">
        <b-form-input
          v-model="post.fullName"
          type="text"
          placeholder="Họ và tên"
          required="required"
        >
        </b-form-input>
      </b-form-group>

      <b-form-group label="Ngày sinh">
        <b-form-datepicker
          id="example-datepicker"
          v-model="post.dateOfbirth"
          required="required"
        >
        </b-form-datepicker>
      </b-form-group>

      <b-form-group label="Giới tính">
        <b-form-select v-model="post.gender" required="required">
          <option value="Nam">Nam</option>
          <option value="Nữ">Nữ</option>
        </b-form-select>
      </b-form-group>

      <b-form-group label="Email">
        <b-form-input
          v-model="post.email"
          type="email"
          placeholder="Email"
          required="required"
        >
        </b-form-input>
      </b-form-group>
      <b-form-group label="Vai trò">
        <b-form-select v-model="post.role" required="required">
          <option value="Employee">Employee</option>
          <option value="Admin">Admin</option>
        </b-form-select>
      </b-form-group>
      <b-form-group label="Avata">
        <b-form-file
          v-model="post.file"
          placeholder="Choose a file or drop it here..."
          drop-placeholder="Drop file here..."
        ></b-form-file>
      </b-form-group>
    </form>
  </b-modal>
</template>

<script>
export default {
  data() {
    return {
      post: {},
      item: null
    };
  },
  methods: {
    addEmployee() {
      const formData = new FormData();
      formData.append("employeeId", this.post.employeeId);
      formData.append("fullName", this.post.fullName);
      formData.append("dateOfbirth", this.post.dateOfbirth);
      formData.append("gender", this.post.gender);
      formData.append("email", this.post.email);
      formData.append("role", this.post.role);
      formData.append("files", this.post.file);

      let uri = `${process.env.VUE_APP_PORT}/employee`;
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
