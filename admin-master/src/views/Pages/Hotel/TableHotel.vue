<template>
  <div>
    <base-header class="pb-6 pb-7 pt-8 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>
    <!--Charts-->
    <b-container fluid class="mt--7">
      <!-- End charts-->
      <b-row class="m-0">
        <b-col class="m-0 p-0">
          <b-card class="card-custom">
            <div class="app-section ml-2 mr-2 pt-4 fullcontainer">
              <div class="ml-4">
                <b-button v-b-modal.modal-CreateHotel variant="primary">
                  + Thêm khách sạn
                </b-button>
              </div>
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
              <div>
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
                      <template v-slot:cell(quality)="data">
                        <b-form-rating
                          v-model="data.item.quality"
                          variant="warning"
                          class="mb-2"
                          readonly
                        ></b-form-rating>
                      </template>

                      <template v-slot:cell(_id)="data">
                        <div style="width: 50px">
                          <div class="float-left">
                            <b-icon
                              icon="trash"
                              scale="1.5"
                              variant="danger"
                              @click.prevent="notifiedDeletHotel(data.item._id)"
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
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                      align="right"
                      pills
                      class="mt-3"
                    ></b-pagination>
                  </b-col>
                </b-row>
              </div>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <!--Tables-->
      <b-row class="mt-5"> </b-row>
      <!--End tables-->
    </b-container>
    <!-- modal cập nhất thông tin hotel  -->
    <modal-update-hotel v-bind:data="post" @reload="reloadTable">
    </modal-update-hotel>
    <!-- modal thêm mới thông tin hotel  -->
    <create-hotel @reload="reloadTable"></create-hotel>
  </div>
</template>
<script>
import CreateHotel from "./CreateHotel.vue";
import ModalUpdateHotel from "./ModalUpdateHotel.vue";
export default {
  components: { CreateHotel, ModalUpdateHotel },
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
        { key: "hotelName", label: "Tên Khách sạn", sortable: true },
        { key: "quality", label: "Chất lượng", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "phone", label: "SDT", sortable: true },
        { key: "city", label: "Địa chỉ", sortable: true },
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
    this.getListHotel();
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
    notifiedDeletHotel(id) {
      this.$confirm(
        "Bạn có chắc muốn xóa thông tin khách sạn",
        "Cảnh báo",
        "warning",
        {
          reverseButtons: true,
        }
      )
        .then(() => {
          this.deleteHotel(id);
        })
        .catch(() => {});
    },
    reloadTable() {
      this.getListHotel();
    },
    getListHotel() {
      let uri = `${process.env.VUE_APP_PORT}/hotels`;
      this.axios.get(uri, this.ticket).then((response) => {
        this.items = response.data;
        this.Total = this.items.length;
        this.totalRows = this.items.length;
      });
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    deleteHotel(id) {
      let uri = `${process.env.VUE_APP_PORT}/hotel/${id}`;
      this.axios.delete(uri).then(() => {
        this.getListHotel();
      });
    },
    initEdit(idEmployye) {
      this.idFind.id = idEmployye;
      let uri = `${process.env.VUE_APP_PORT}/get-hotel`;
      this.axios.post(uri, this.idFind).then((response) => {
        this.post = response.data;
      });
      this.$root.$emit("bv::show::modal", "modal-UploadHotel");
    },
  },
};
</script>
<style>
.box {
  box-shadow: 1px 2px 10px rgb(0 0 0 / 10%);
}
</style>
