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
              <div class="input-group mb-4 p-4">
                <b-form-input
                  id="filter-input"
                  v-model="filter"
                  type="search"
                  placeholder="Type to Search"
                ></b-form-input>
                <b-input-group-append>
                  <b-button @click="clear()">Clear</b-button>
                </b-input-group-append>
              </div>

              <!-- layout tabel  -->
              <div v-if="data === null">
                <b-row class="m-0">
                  <b-col cols="12" class="p-0">
                    <b-table
                      :items="items"
                      :fields="fields"
                      :sort-by.sync="sortBy"
                      :sort-desc.sync="sortDesc"
                      :filter="filter"
                      sort-icon-left
                      responsive
                      :current-page="currentPage"
                      :per-page="10"
                      :sort-direction="sortDirection"
                      show-empty
                      hover
                      @filtered="onFiltered"
                    >
                      <template v-slot:cell(_id)="data">
                        <div class="float-left ml-4">
                          <b-icon
                            icon="credit-card2-back"
                            scale="1.5"
                            variant="danger"
                            @click.prevent="ordrDetail(data.item._id)"
                          >
                          </b-icon>
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
                      pills
                      align="right"
                      class="mt-3"
                    ></b-pagination>
                  </b-col>
                </b-row>
              </div>
              <!-- xem thông tin hóa đon  -->
              <div v-else>
                <b-container>
                  <b-row class="mt-3 mb-5">
                    <b-col class="text-center">
                      <h2 class="title-contract ">
                        Danh sách khách khách hàng
                      </h2>
                    </b-col>
                  </b-row>

                  <div class="m-4">
                    <b-row>
                      <b-col cols="4">
                        <b-img
                          :src="tour.listImage[2]"
                          fluid
                          alt="Fluid image"
                        ></b-img>
                      </b-col>
                      <b-col cols="8">
                        <b-row>
                          <b-col
                            cols="4"
                            class="text-right text-monospace font-weight-bold"
                            >Tên tour</b-col
                          >
                          <b-col cols="8" class=" text-monospace">{{
                            tour.tourName
                          }}</b-col>
                        </b-row>
                        <b-row>
                          <b-col
                            cols="4"
                            class="text-right text-monospace font-weight-bold"
                          >
                            Nơi khỏi tập trung</b-col
                          >
                          <b-col cols="8" class=" text-monospace">{{
                            tour.startPlace
                          }}</b-col>
                        </b-row>
                        <b-row>
                          <b-col
                            cols="4"
                            class="text-right text-monospace font-weight-bold"
                          >
                            Ngày đi</b-col
                          >
                          <b-col cols="8" class=" text-monospace">{{
                            formatDate(tour.startDate)
                          }}</b-col>
                        </b-row>
                        <!-- <b-row>
                          <b-col
                            cols="4"
                            class="text-right text-monospace font-weight-bold"
                          >
                            Giá</b-col
                          >
                          <b-col
                            cols="8"
                            class="title-customs  text-monospace"
                            >{{ formatMoney(tour.priceDetail.adult) }}</b-col
                          >
                        </b-row> -->
                      </b-col>
                    </b-row>
                  </div>

                  <b-table-simple outlined class="m-4">
                    <b-thead style="background-color: #e9ecef;">
                      <b-tr>
                        <b-th>#</b-th>
                        <b-th>Họ tên khách hàng</b-th>
                        <b-th>Ngày sinh</b-th>
                        <b-th>Giới tính</b-th>
                        <b-th>Loại vé</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody class=" text-monospace">
                      <b-tr v-for="(customer, index) in customers" :key="index">
                        <b-td>{{ index + 1 }}</b-td>
                        <b-td>{{ customer.nameCustomer }}</b-td>
                        <b-td>{{ formatDate(customer.birthDay) }}</b-td>
                        <b-td>{{ customer.gender }}</b-td>
                        <b-td>{{ customer.typeOfTicket }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                </b-container>
              </div>
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

export default {
  components: {},
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
        {
          key: "_id",
          label: "Dánh sách vé",
          sortable: true
        },
        {
          key: "tourId",
          label: "Mã tour",
          sortable: true
        },
        {
          key: "tourName",
          label: "Tên tour",
          sortable: true
        },
        {
          key: "startPlace",
          label: "Địa điểm tập trung",
          sortable: true
        },
        {
          key: "startDate",
          formatter: "formatDate",
          label: "Ngày khỏi hành",
          sortable: true
        }
      ],
      items: [],
      tour: {
        listImage: []
      },
      post: {
        id: null
      },
      data: null,
      customers: [],
      Total: 0,
      idFind: {
        id: null
      }
    };
  },

  mounted() {
    this.getListTourbyOrder();
  },
  computed: {},
  methods: {
    reloadTable() {
      this.getListTourbyOrder();
    },
    getListTourbyOrder() {
      const uri = `${process.env.VUE_APP_PORT}/orders/tours`;
      this.axios.get(uri, this.ticket).then(response => {
        this.items = response.data;
        this.Total = this.items.length;
        this.totalRows = this.items.length;
      });
    },

    ordrDetail(id) {
      this.post.id = id;
      const uri = `${process.env.VUE_APP_PORT}/getcustomerstour`;
      this.axios.post(uri, this.post).then(response => {
        this.data = response.data;
        response.data.forEach(element => {
          this.customers = this.customers.concat(element.listCutomerTour);
        });
      });
      // tim thông tin tour
      this.findTour(id);
    },
    findTour(id) {
      this.post.id = id;
      let uri = `${process.env.VUE_APP_PORT}/get-tour`;
      this.axios.post(uri, this.post).then(response => {
        this.tour = response.data;
      });
    },

    clear() {
      this.filter = null;
      this.customers = [];
      this.data = null;
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    formatDate(value) {
      return moment(value).format("MMMM DD YYYY");
    },
    formatMoney(money) {
      const formatter = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND"
      });
      return formatter.format(money);
    }
  }
};
</script>
<style>
.title-customs {
  color: #ff002d;
  font-weight: 600;
  font-size: 19px;
}
.title-contract {
  color: #ff002d;
  font-weight: 600;
  font-size: 26.5px;
}
</style>
