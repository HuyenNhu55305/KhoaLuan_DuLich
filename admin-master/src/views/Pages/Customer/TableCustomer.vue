<template>
  <div>
    <modal-upddate-customer
      v-bind:data="post"
      @reload="reloadTable"
    ></modal-upddate-customer>
    <base-header class="pb-6 pb-7 pt-8 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <!--Charts-->
    <b-container fluid class="mt--7">
      <!-- End charts-->
      <b-row class="m-0">
        <b-col class="p-0">
          <b-card class="card-custom">
            <div>
              <div class="input-group mb-4 p-4">
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button :disabled="!filter" @click="filter = ''"
                    >Clear</b-button
                  >
                </b-input-group-append>
              </div>
              <b-row class="m-0">
                <b-col cols="12" class="p-0">
                  <b-table
                    :items="items"
                    :fields="fields"
                    :sort-by.sync="sortBy"
                    :sort-desc.sync="sortDesc"
                    sort-icon-left
                    responsive="sm"
                    :current-page="currentPage"
                    :per-page="10"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    :sort-direction="sortDirection"
                    stacked="md"
                    show-empty
                    hover
                    @filtered="onFiltered"
                    ref="table"
                  >
                    <template v-slot:cell(_id)="data">
                      <div style="width: 50px">
                        <div class="float-left">
                          <b-icon
                            icon="trash"
                            scale="1.5"
                            variant="danger"
                            @click.prevent="notifiedDeletCustomer(data.item._id)"
                          >
                          </b-icon>
                        </div>
                        <div class="float-right">
                          <b-icon
                            icon="journal-arrow-down"
                            scale="1.5"
                            variant="primary"
                            @click="initEdit(data.item._id)"
                          >
                          </b-icon>
                        </div>
                      </div>
                    </template>
                    <template v-slot:cell(activationStatus)="data">
                      <b-form-checkbox
                        v-model="data.item.activationStatus"
                        @change="update(data.item)"
                        switch
                      />
                    </template>
                  </b-table>
                </b-col>
              </b-row>
              <b-row class="m-0" style="border-top: 1px solid">
                <b-col cols="6">
                  <div class="pb-5 pr-5 pt-4 mr-5">
                    <span
                      >Total:
                      <b
                        ><span class="text-primary">{{ Total }}</span></b
                      >
                      item</span
                    >
                  </div>
                </b-col>
                <b-col cols="6">
                  <div class="pb-4 pt-4 pr-5 mr-5" style="float: right">
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      align="fill"
                      pills
                      class="my-0"
                      style="width: 200px"
                    ></b-pagination>
                  </div>
                </b-col>
              </b-row>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <!--Tables-->
      <b-row class="mt-5"> </b-row>
      <!--End tables-->
    </b-container>
  </div>
</template>
<script>
import moment from "moment";

import ModalUpddateCustomer from "./ModalUpddateCustomer.vue";

export default {
  components: { ModalUpddateCustomer },
  data() {
    return {
      sortBy: "age",
      sortDesc: false,
      state: "disabled",
      totalRows: 1,
      currentPage: 1,
      perPage: 8,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortDirection: "asc",
      filter: null,
      filterOn: [],

      fields: [
        { key: "activationStatus", label: "Trạng thái" },
        { key: "fullName", label: "Họ tên", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "phone", label: "SDT", sortable: true },
        {
          key: "dateOfbirth",
          formatter: "formatDate",
          label: "Ngày sinh",
          sortable: true,
        },
        { key: "gender", label: "Giới tính", sortable: true },
        { key: "identityCard", label: "CMND", sortable: true },
        { key: "gender", label: "Địa chỉ", sortable: true },
        { key: "_id", label: "Tác vụ" },
      ],
      items: [],
      post: {},
      Total: 0,
      idFind: {
        id: null,
      },
    };
  },

  mounted() {
    this.getListCustomer();
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  methods: {
    notifiedDeletCustomer(id) {
      this.$confirm(
        "Bạn có chắc muốn xóa tài khoản Khách hàng",
        "Cảnh báo",
        "warning",
        {
          reverseButtons: true,
        }
      )
        .then(() => {
          this.deleteCustomer(id);
        })
        .catch(() => {});
    },
    // reload lại mỗi khi thêm hoặc cập nhât
    reloadTable() {
      this.getListCustomer();
    },

    // lấy dữ liệu đẩy lên tbale
    getListCustomer() {
      let uri = `${process.env.VUE_APP_PORT}/customers`;
      this.axios.get(uri, this.ticket).then((response) => {
        this.items = response.data;
        this.Total = this.items.length;
        this.totalRows = this.items.length;
      });
    },
    update(value) {
      let uri = `${process.env.VUE_APP_PORT}/account/status/${value._id}`;
      this.axios.put(uri, value).then((response) => {
        if (value.activationStatus === true) {
          this.$bvToast.toast(`${response.data.message}`, {
            title: `Warning`,
            variant: "success",
            solid: true,
          });
        } else {
          this.$bvToast.toast(`${response.data.message}`, {
            title: `Warning`,
            variant: "danger",
            solid: true,
          });
        }
      });
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    formatDate(value) {
      return moment(value).format("MMMM DD YYYY");
    },
    deleteCustomer(id) {
      let uri = `${process.env.VUE_APP_PORT}/customer/${id}`;
      this.axios.delete(uri).then(() => {
        this.getListCustomer();
      });
    },
    initEdit(idCustomer) {
      this.idFind.id = idCustomer;
      let uri = `${process.env.VUE_APP_PORT}/get-customer`;
      this.axios.post(uri, this.idFind).then((response) => {
        this.post = response.data;
      });
      this.$root.$emit("bv::show::modal", "modal-UploadCustomer");
    },
  },
};
</script>

<style>
.md {
  margin: 6px;
  margin-top: 48px;
}
</style>
