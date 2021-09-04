<template>
  <div>
    <base-header class="pb-6 pb-8 pt-8 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <!-- End charts-->
      <b-row class="m-0">
        <b-col class="m-0 p-0">
          <b-card class="card-custom">
            <b-tabs pills card>
              <b-tab title="Tất cả tour" active>
                <div class="ml-2 mr-2 pt-4">
                  <div class="ml-4">
                    <b-button to="/CreateTour" variant="primary">
                      + Tour mới
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
                      <b-button @click="cleartData()"> Clear </b-button>
                    </b-input-group-append>
                  </div>
                  <div v-if="tour === null">
                    <b-row class="m-0">
                      <b-col cols="12" class="p-0">
                        <b-table
                          :items="items"
                          :fields="fields"
                          :sort-by.sync="sortBy"
                          :sort-desc.sync="sortDesc"
                          sort-icon-left
                          responsive
                          :sticky-header="true"
                          :current-page="currentPage"
                          :per-page="10"
                          :filter="filter"
                          :filter-included-fields="filterOn"
                          :sort-direction="sortDirection"
                          show-empty
                          hover
                          @filtered="onFiltered"
                        >
                          <template v-slot:cell(image)="data">
                            <b-img
                              thumbnail
                              style="width: 50px; height: 50px"
                              :src="data.item.image"
                              alt="Left image"
                            >
                            </b-img>
                          </template>
                          <template v-slot:cell(_id)="data">
                            <div style="width: 150px">
                              <div class="float-left pr-3">
                                <b-icon
                                  icon="trash"
                                  scale="1.5"
                                  variant="danger"
                                  @click.prevent="
                                    notifiedDeletTour(data.item._id)
                                  "
                                >
                                </b-icon>
                              </div>
                              <div class="float-left pr-3">
                                <b-icon
                                  icon="journal-arrow-down"
                                  scale="1.5"
                                  variant="primary"
                                  @click="initEdit(data.item._id)"
                                >
                                </b-icon>
                              </div>

                              <div>
                                <b-button
                                  pill
                                  variant="outline-secondary"
                                  size="sm"
                                  @click="findTour(data.item._id)"
                                  style="width: 100px"
                                >
                                  Chi tiết
                                </b-button>
                              </div>
                            </div>
                          </template>

                          <!-- <template #cell(show_details)="row">
                        <b-button
                          pill
                          variant="outline-secondary"
                          size="sm"
                          @click="row.toggleDetails"
                          style="width: 100px"
                        >
                          Chi tiết
                        </b-button>
                      </template> -->

                          <!-- <template #row-details="row">
                        <b-card>
                          <b-card class="mt-3 ml-3 mr-3 mb-2">
                            <b-row>
                              <b-col cols="4" class="pr-0">
                                <b-carousel
                                  id="carousel-1"
                                  v-model="slide"
                                  :interval="2000"
                                  controls
                                  indicators
                                  background="#ababab"
                                  style="text-shadow: 1px 1px 2px #333"
                                >
                                  <b-carousel-slide
                                    style="height: 150px"
                                    v-for="i in row.item.listImage.length"
                                    :key="i + 1"
                                    :img-src="row.item.listImage[i]"
                                  >
                                  </b-carousel-slide>
                                </b-carousel>
                              </b-col>
                              <b-col cols="4" class="ml-0">
                                <b-row class="mb-2">
                                  <b-col cols="6" class="text-sm-right">
                                    <b> Địa điểm tập trung: </b>
                                  </b-col>
                                  <b-col>{{ row.item.startPlace }}</b-col>
                                </b-row>
                                <b-row class="mb-2">
                                  <b-col cols="6" class="text-sm-right">
                                    <b> Số người tham gia: </b>
                                  </b-col>
                                  <b-col>{{
                                    row.item.numberOfParticipants
                                  }}</b-col>
                                </b-row>
                                <b-row class="mb-2">
                                  <b-col cols="6" class="text-sm-right">
                                    <b> Miêu tả: </b>
                                  </b-col>
                                  <b-col>{{ row.item.description }}</b-col>
                                </b-row>
                              </b-col>
                              <b-col cols="4">
                                <b-row class="mb-2">
                                  <b-col cols="6" class="text-sm-right">
                                    <b> Giá người lớn: </b>
                                  </b-col>
                                  <b-col>{{
                                    row.item.priceDetail.adult
                                  }}</b-col>
                                </b-row>
                                <b-row class="mb-2">
                                  <b-col cols="6" class="text-sm-right">
                                    <b> Giá trẻ dưới 12 tuổi: </b>
                                  </b-col>
                                  <b-col>{{
                                    row.item.priceDetail.underTheAgeOfTwelve
                                  }}</b-col>
                                </b-row>
                                <b-row class="mb-2">
                                  <b-col cols="6" class="text-sm-right">
                                    <b> Giá trẻ dưới 5 tuổi: </b>
                                  </b-col>
                                  <b-col>{{
                                    row.item.priceDetail.underTheAgeOfFive
                                  }}</b-col>
                                </b-row>
                              </b-col>
                            </b-row>
                          </b-card>
                          <b-card
                            class="ml-3 m-5"
                            v-for="i in row.item.numDay.length"
                            :key="i"
                            :header="'Ngày ' + i"
                          >
                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right">
                                <b> Địa điểm: </b>
                              </b-col>
                              <b-col>{{ row.item.place[i].placeName }}</b-col>
                            </b-row>

                            <b-row class="mb-2">
                              <b-col sm="3" class="text-sm-right">
                                <b> Phương tiện: </b>
                              </b-col>
                              <b-col>{{ row.item.transportation[i] }}</b-col>
                            </b-row>
                            <b-row class="mb-2">
                              <b-col class="ml-3">
                                <b> Lịch trình: </b>
                              </b-col>
                            </b-row>
                            <b-row class="mb-2">
                              <b-col cols="6" class="m-3">
                                <span v-html="row.item.detail[i]"></span>
                              </b-col>
                              <b-col cols="6" class="m-3"> </b-col>
                            </b-row>
                          </b-card>
                        </b-card>
                      </template> -->
                        </b-table>
                      </b-col>
                    </b-row>
                    <b-row class="m-0">
                      <b-col cols="6">
                        <div class="pb-5 pr-5 pt-3 mr-5">
                          <span>
                            Total:
                            <b>
                              <span class="text-primary">{{ Total }}</span>
                            </b>
                            item
                          </span>
                        </div>
                      </b-col>
                      <b-col cols="6">
                        <b-pagination
                          v-model="currentPage"
                          :total-rows="totalRows"
                          :per-page="perPage"
                          pills
                          size="sm  "
                          align="right"
                          class="mt-3"
                        ></b-pagination>
                      </b-col>
                    </b-row>
                  </div>
                  <div v-else>
                    <b-row class="text-center">
                      <b-col>
                        <h2 class="title-contract">Thông tin tour</h2>
                      </b-col>
                    </b-row>
                    <div class="m-4">
                      <b-row>
                        <b-col cols="4">
                          <b-carousel
                            id="carousel-1"
                            v-model="slide"
                            :interval="2000"
                            controls
                            indicators
                            background="#ababab"
                            img-width="1024"
                            img-height="480"
                            style="text-shadow: 1px 1px 2px #333"
                          >
                            <div
                              v-for="(value, index) in tour.listImage"
                              :key="index"
                            >
                              <b-carousel-slide :img-src="value">
                              </b-carousel-slide>
                            </div>
                          </b-carousel>
                        </b-col>
                        <b-col cols="8">
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              ID Tour</b-col
                            >
                            <b-col cols="8" class="text-monospace">
                              {{ tour.tourId }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Tên tour
                            </b-col>
                            <b-col cols="8" class="text-monospace">
                              {{ tour.tourName }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Nơi khỏi tập trung</b-col
                            >
                            <b-col cols="8" class="text-monospace">{{
                              tour.startPlace
                            }}</b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Ngày đi</b-col
                            >
                            <b-col cols="8" class="text-monospace">{{
                              formatDate(tour.startDate)
                            }}</b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Ngày về
                            </b-col>
                            <b-col cols="8" class="text-monospace">
                              {{ formatDate(tour.endDate) }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Giá
                            </b-col>
                            <b-col
                              cols="8"
                              class="title-customs text-monospace"
                            >
                              <b-row>
                                <b-col
                                  cols="4"
                                  class="text-monospace font-weight-bold"
                                >
                                  Người lớn
                                </b-col>

                                <b-col
                                  cols="4"
                                  class="title-customs text-monospace"
                                >
                                  {{ formatMoney(tour.priceDetail.adult) }}
                                </b-col>
                              </b-row>
                              <b-row>
                                <b-col
                                  cols="4"
                                  class="text-monospace font-weight-bold"
                                >
                                  Trẻ em
                                </b-col>

                                <b-col
                                  cols="4"
                                  class="title-customs text-monospace"
                                >
                                  {{
                                    formatMoney(
                                      tour.priceDetail.underTheAgeOfFive
                                    )
                                  }}
                                </b-col>
                              </b-row>
                              <b-row>
                                <b-col
                                  cols="4"
                                  class="text-monospace font-weight-bold"
                                >
                                  Em bé
                                </b-col>

                                <b-col
                                  cols="4"
                                  class="title-customs text-monospace"
                                >
                                  {{
                                    formatMoney(
                                      tour.priceDetail.underTheAgeOfTwelve
                                    )
                                  }}
                                </b-col>
                              </b-row>
                              <b-row>
                                <b-col
                                  cols="4"
                                  class="text-monospace font-weight-bold"
                                >
                                  Phụ thu
                                </b-col>

                                <b-col
                                  cols="4"
                                  class="title-customs text-monospace"
                                >
                                  {{ formatMoney(tour.surcharge) }}
                                </b-col>
                              </b-row>
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Số vé:
                            </b-col>
                            <b-col cols="8" class="text-monospace">
                              {{ tour.numberOfParticipants }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Địa điểm xuất phát:
                            </b-col>
                            <b-col cols="8" class="text-monospace">
                              {{ tour.startPlace }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Loại hình du lịch:
                            </b-col>
                            <b-col cols="8" class="text-monospace">
                              {{ tour.typesOftourism }}
                            </b-col>
                          </b-row>
                          <b-row>
                            <b-col
                              cols="3"
                              class="text-right text-monospace font-weight-bold"
                            >
                              Địa điểm
                            </b-col>
                            <b-col
                              cols="8"
                              class="title-customs text-monospace"
                            >
                              <b-row v-for="pl in tour.place" :key="pl._id">
                                <b-col
                                  cols="4"
                                  class="title-customs text-monospace"
                                >
                                  {{ pl.placeName }}
                                </b-col>
                              </b-row>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                      <b-row class="text-center mt-3 border-top">
                        <b-col class="mt-2">
                          <h2 class="title-contract">Lịch trình tour</h2>
                        </b-col>
                      </b-row>
                      <b-row>
                        <b-col>
                          <b-row
                            class="mt-4 flex-grow-1 pb-2 text-center"
                            v-for="(value, index) in tour.numberOfDays"
                            :key="index"
                          >
                            <b-col
                              cols="3"
                              class="
                                d-flex
                                align-items-center
                                border-right border-danger
                                flex-grow-1
                              "
                            >
                              <div>
                                <h3
                                  class="font-weight-bold"
                                  style="color: #ff002d"
                                >
                                  {{ tour.numDay[index] }}
                                </h3>
                                <span class="font-weight-bold">
                                  Phương tiên di chuyển:
                                  {{ tour.transportation[index] }}
                                </span>
                                <br />
                              </div>
                            </b-col>
                            <b-col cols="9" class="text-left">
                              <div v-html="tour.detail[index]"></div>
                            </b-col>
                          </b-row>
                        </b-col>
                      </b-row>
                    </div>
                  </div>
                </div>
              </b-tab>
              <b-tab title="Tour đang hoạt động  ">
                <tour-status-true></tour-status-true>
              </b-tab>
              <b-tab title="Tour hết hạn  ">
                <tour-status-fail></tour-status-fail>
              </b-tab>
            </b-tabs>
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
import TourStatusFail from './TourStatusFail.vue';
import TourStatusTrue from './TourStatusTrue.vue';
export default {
  components: {TourStatusFail, TourStatusTrue},
  data() {
    return {
      stickyHeader: true,
      noCollapse: false,
      sortBy: "age",
      sortDesc: false,
      state: "disabled",
      totalRows: 1,
      perPage: 8,
      currentPage: 1,
      pageOptions: [5, 10, 15, { value: 100, text: "Show a lot" }],
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      fields: [
        { key: "_id", label: "Tác vụ" },
        { key: "seatStatus", label: "Trạng thái vé", sortable: true },
        { key: "tourId", label: "ID", sortable: true },
        { key: "tourName", label: "TOUR", sortable: true },

        { key: "employee.fullName", label: "HƯỚNG DẪN VIÊN", sortable: true },
        {
          key: "startDate",
          formatter: "formatDate",
          label: "NGÀY ĐI",
          sortable: true,
        },
        {
          key: "endDate",
          formatter: "formatDate",
          label: "NGÀY VỀ",
          sortable: true,
        },

        { key: "typesOftourism", label: "LOẠI HÌNH", sortable: true },
      ],
      items: [],
      post: {},
      cart: 0,
      slide: 0,
      sliding: null,
      Total: 0,
      tour: null,
      idFind: {
        id: null,
      },
    };
  },

  mounted() {
    this.getAllTour();
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
    notifiedDeletTour(id) {
      this.$confirm("Bạn có chắc muốn xóa Tour", "Cảnh báo", "warning", {
        reverseButtons: true,
      })
        .then(() => {
          this.deleteTour(id);
        })
        .catch(() => {});
    },
    getAllTour() {
      let uri = `${process.env.VUE_APP_PORT}/tours`;
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

    formatDate(value) {
      return moment(value).format("MMMM DD YYYY");
    },
    // xóa tour
    deleteTour(id) {
      let uri = `${process.env.VUE_APP_PORT}/tour/${id}`;
      this.axios.delete(uri).then(() => {
        this.getAllTour();
      });
    },
    // chi tiết tour
    initEdit(idTour) {
      this.$router.push({ name: "updateTour", params: { id: idTour } });
    },

    findTour(id) {
      this.idFind.id = id;
      let uri = `${process.env.VUE_APP_PORT}/get-tour`;
      this.axios.post(uri, this.idFind).then((response) => {
        this.tour = response.data;
      });
    },
    cleartData() {
      this.tour = null;
      this.filter = "";
    },

    formatMoney(money) {
      const formatter = new Intl.NumberFormat("vi", {
        style: "currency",
        currency: "VND",
      });
      return formatter.format(money);
    },
  },
};
</script>
<style>
.el-table .cell {
  padding-left: 0px;
  padding-right: 0px;
}
.card-custom .card-body {
  padding: 0 !important;
}
.b-table-sticky-header {
  max-height: none !important;
}
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
