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
              <div v-if="tour === null">
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
                      <template v-slot:cell(statusOrder)="data">
                        <div v-if="data.item.statusOrder === 'checked'">
                          <b-icon
                            icon="check-circle"
                            variant="success"
                            scale="1"
                            class="float-left"
                          ></b-icon>
                        </div>
                        <div v-else-if="data.item.statusOrder === 'waiting'">
                          <b-icon
                            icon="exclamation-circle"
                            variant="warning"
                            scale="1"
                            class="float-left"
                          ></b-icon>
                        </div>
                        <div v-else>
                          <b-icon
                            icon="x-octagon-fill"
                            variant="danger"
                            scale="1"
                            class="float-left"
                          ></b-icon>
                        </div>
                        <div class="float-left ml-4">
                          <b-icon
                            icon="credit-card2-back"
                            scale="1.5"
                            variant="danger"
                            @click.prevent="ordrDetail(data.item.orderCode)"
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
                  <!-- Content here -->
                  <b-row class="mt-3 mb-5">
                    <b-col class="text-center">
                      <h2 class="title-contract ">Hợp đồng đăng ký tour</h2>
                    </b-col>
                  </b-row>

                  <b-row>
                    <b-col>
                      <h2 class="title-customs ">
                        Thông tin liên lạc khách hàng khách hàng
                      </h2>
                    </b-col>
                  </b-row>

                  <b-table-simple outlined class="m-4">
                    <b-thead style="background-color: #e9ecef;">
                      <b-tr>
                        <b-th>#</b-th>
                        <b-th>Họ tên khách hàng</b-th>
                        <b-th>Email</b-th>
                        <b-th>Số điện thoại</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody class=" text-monospace">
                      <b-tr>
                        <b-td>1</b-td>
                        <b-td>{{ tour.seatDetail.customer.fullName }}</b-td>
                        <b-td>{{ tour.seatDetail.customer.email }}</b-td>
                        <b-td>{{ tour.seatDetail.customer.phone }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>

                  <b-row>
                    <b-col>
                      <h2 class="title-customs ">
                        Danh sách vé
                      </h2>
                    </b-col>
                  </b-row>
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
                      <b-tr
                        v-for="(ticket, index) in tour.seatDetail
                          .listCutomerTour"
                        :key="ticket._id"
                      >
                        <b-td>{{ index + 1 }}</b-td>
                        <b-td>{{ ticket.nameCustomer }}</b-td>
                        <b-td>{{ formatDate(ticket.birthDay) }}</b-td>
                        <b-td>{{ ticket.gender }}</b-td>
                        <b-td>{{ ticket.typeOfTicket }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                  <b-row>
                    <b-col>
                      <h2 class="title-customs ">
                        Thông tin tour và sản phẩm
                      </h2>
                    </b-col>
                  </b-row>
                  <div class="m-4">
                    <b-row>
                      <b-col cols="4">
                        <b-img
                          :src="tour.seatDetail.tour.listImage[2]"
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
                            tour.seatDetail.tour.tourName
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
                            tour.seatDetail.tour.startPlace
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
                            formatDate(tour.seatDetail.tour.startDate)
                          }}</b-col>
                        </b-row>
                        <b-row>
                          <b-col
                            cols="4"
                            class="text-right text-monospace font-weight-bold"
                          >
                            Giá</b-col
                          >
                          <b-col
                            cols="8"
                            class="title-customs  text-monospace"
                            >{{
                              formatMoney(
                                tour.seatDetail.tour.priceDetail.adult
                              )
                            }}</b-col
                          >
                        </b-row>
                      </b-col>
                    </b-row>
                  </div>

                  <b-table-simple outlined class="m-4">
                    <b-thead style="background-color: #e9ecef;">
                      <b-tr>
                        <b-th>#</b-th>
                        <b-th>Sản phẩm</b-th>
                        <b-th>Giá</b-th>
                        <b-th>Số lượng</b-th>
                        <b-th>Thành tiền</b-th>
                      </b-tr>
                    </b-thead>
                    <b-tbody class=" text-monospace">
                      <b-tr
                        v-for="(ticket, index) in tour.orderDetail"
                        :key="ticket._id"
                      >
                        <b-td>{{ index + 1 }}</b-td>
                        <b-td>{{ ticket.product.productName }}</b-td>
                        <b-td>{{ formatMoney(ticket.price) }}</b-td>
                        <b-td>{{ ticket.quantity }}</b-td>
                        <b-td class="title-customs ">{{
                          formatMoney(ticket.totalPrice)
                        }}</b-td>
                      </b-tr>
                    </b-tbody>
                  </b-table-simple>
                  <!-- gạch ngang  -->

                  <b-row class="ml-4">
                    <b-col class="p-0">
                      <hr />
                    </b-col>
                  </b-row>
                  <b-row class="ml-4">
                    <b-col cols="7"> </b-col>
                    <b-col cols="3" class="title-customs text-right p-0 pt-1">
                      Tổng Tiền: {{ formatMoney(tour.total) }}
                    </b-col>
                    <b-col
                      v-if="tour.statusOrder === 'waiting'"
                      cols="2"
                      class="text-right p-0"
                    >
                      <b-button @click="payment()" variant="outline-primary">
                        Thanh toán
                      </b-button>
                      <b-button
                        @click="cancelPayment()"
                        variant="outline-primary"
                        class="m-2"
                      >
                        Hủy hoán đơn</b-button
                      >
                    </b-col>
                    <b-col
                      v-else-if="tour.statusOrder === 'cancelled'"
                      cols="2"
                      class="text-right p-0"
                    >
                      <h2 class="title-customs text-right p-0 pt-1">
                        Đa hủy order
                      </h2>
                    </b-col>
                    <b-col v-else cols="2" class="text-right p-0">
                      <h2 class="title-customs text-right p-0 pt-1">
                        Đa thanh toán
                      </h2>
                    </b-col>
                  </b-row>
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
          key: "statusOrder",
          label: "Thanh toán",
          sortable: true
        },
        {
          key: "orderDate",
          formatter: "formatDate",
          label: "Ngày đặt tour",
          sortable: true
        },
        {
          key: "seatDetail.listCutomerTour.length",
          label: "Số vé",
          sortable: true
        },
        {
          key: "seatDetail.totalPrice",
          formatter: "formatMoney",
          label: "Tồng tiền",
          sortable: true
        },
        {
          key: "seatDetail.customer.fullName",
          label: "Tên khách hàng",
          sortable: true
        },
        { key: "seatDetail.customer.email", label: "Email", sortable: true },
        { key: "orderCode", label: "Mã Hóa Đơn", sortable: true },
        { key: "seatDetail.tour.tourName", label: "Tour chọn", sortable: true }
      ],
      items: [],

      post: null,
      detail: {
        orderCode: null
      },
      tour: null,
      Total: 0,
      idFind: {
        id: null
      }
    };
  },

  mounted() {
    this.getListOder();
  },
  computed: {},
  methods: {
    reloadTable() {
      this.getListOder();
    },
    getListOder() {
      const uri = `${process.env.VUE_APP_PORT}/orders/fail`;
      this.axios.get(uri, this.post).then(response => {
        if (response.data.message !== undefined) {
          this.items = [];
          this.Total = 0;
          this.totalRows = 0;
        } else {
          this.items = response.data;
          this.Total = this.items.length;
          this.totalRows = this.items.length;
        }
      });
    },

    ordrDetail(orderCode) {
      this.detail.orderCode = orderCode;
      const uri = `${process.env.VUE_APP_PORT}/orders/detail`;
      this.axios.post(uri, this.detail).then(response => {
        this.tour = response.data[0];
      });
    },

    payment() {
      const uri = `${process.env.VUE_APP_PORT}/checkorder/${this.tour._id}`;
      this.axios.put(uri, this.post).then(response => {
        this.reloadTable();
      });
    },
    cancelPayment() {
      const uri = `${process.env.VUE_APP_PORT}/cancelorder/${this.tour._id}`;
      this.axios.put(uri, this.post).then(response => {
        this.reloadTable();
      });
    },
    clear() {
      this.filter = null;
      this.tour = null;
      this.post.orderCode = null;
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
