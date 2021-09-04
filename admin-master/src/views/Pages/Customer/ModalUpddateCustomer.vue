<template>
  <b-modal
    id="modal-UploadCustomer"
    size="lg"
    title="Thông tin thay đổi"
    @ok="update($event)"
    @cancel="cancel($event)"
  >
    <form>
      <div>
        <b-container fluid>
          <b-row>
            <b-col cols="6">
              <b-form-group label="Họ tên">
                <b-form-input
                  v-model="data.fullName"
                  type="text"
                  required="required"
                >
                </b-form-input>
              </b-form-group>

              <b-form-group label="Ngày sinh">
                <b-form-datepicker
                  id="example-datepicker"
                  v-model="data.dateOfbirth"
                >
                </b-form-datepicker>
              </b-form-group>

              <b-form-group label="Giới tính">
                <b-form-select v-model="data.gender">
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </b-form-select>
              </b-form-group>

              <b-form-group label="Địa chỉ">
                <b-form-input
                  v-model="data.address"
                  type="text"
                  required="required"
                />
              </b-form-group>
            </b-col>

            <b-col cols="6">
              <b-form-group label="CMND">
                <b-form-input
                  v-model="data.identityCard"
                  type="text"
                  required="required"
                />
              </b-form-group>

              <b-form-group label="SDT">
                <b-form-input
                  v-model="data.phone"
                  type="number"
                  required="required"
                />
              </b-form-group>

              <b-form-group label="Email">
                <b-form-input
                  v-model="data.email"
                  type="email"
                  required="required"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
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
      type: Object,
      address: {
        city: String,
        district: String,
        apartmentNumber: String
      }
    }
  },
  methods: {
    update() {
      let uri = `${process.env.VUE_APP_PORT}/customer/${this.data._id}`;
      this.axios.put(uri, this.data).then(() => {
        this.$emit("reload");
      });
    },
    cancel() {
      this.$emit("reload");
    }
  }
};
</script>

<style></style>
