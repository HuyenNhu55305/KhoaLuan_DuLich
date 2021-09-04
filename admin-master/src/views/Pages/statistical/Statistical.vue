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
            <!-- biểu đồ tổng số hợp đồng trong 1 năm  -->
            <div class="Chart">
              <b-row class="m-0 text-center">
                <b-col class="m-0 p-0">
                  <h3
                    style="float: left; padding-left: 33rem; padding-right: 22px;"
                  >
                    Hợp đồng trong năm
                  </h3>
                  <div style="float: left;">
                    <date-picker
                      v-model="timeOder"
                      type="year"
                      format="YYYY"
                      @change="reloadOder()"
                      class="input-custom"
                    ></date-picker>
                  </div>
                </b-col>
              </b-row>
              <contract v-if="loadedOder" :year="yearOder" />
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="m-0">
        <b-col cols="6" class="m-0 p-0">
          <b-card class="card-custom">
            <!-- biểu đồ doan thu trong một năm  -->
            <div class="Chart">
              <b-row class="m-0 text-center">
                <b-col class="m-0 p-0">
                  <h3
                    style="float: left; padding-left: 9rem; padding-right: 22px;"
                  >
                    Doanh thu trong năm
                  </h3>
                  <div style="float: left;">
                    <date-picker
                      v-model="timeRevenue"
                      type="year"
                      format="YYYY"
                      @change="reloadRevenue()"
                      class="input-custom"
                    ></date-picker>
                  </div>
                </b-col>
              </b-row>
              <revenue
                v-if="loadedRevenue"
                :height="590"
                :year="yearRevenue"
              ></revenue>
            </div>
          </b-card>
        </b-col>
        <b-col cols="6" class="m-0 p-0">
          <b-row>
            <b-col>
              <!-- biểu đồ sản phẩm bán nhiều nhất trong một tháng -->
              <b-card class="card-custom">
                <h3 style="text-align:center;">
                  Sản phẩm bán nhiều nhất trong tháng
                </h3>
                <product-chart
                  v-if="loadedProduct"
                  :height="200"
                  :year="yearProduct"
                  :month="monthProduct"
                ></product-chart>
                <div style="margin-left: 506px;">
                  <date-picker
                    v-model="timeProduct"
                    type="month"
                    format="M-YYYY"
                    class="input-custom"
                    @change="reloadProduct()"
                  ></date-picker>
                </div>
              </b-card>
            </b-col>
          </b-row>
          <b-row>
            <b-col>
              <!-- tour có nhiều người đăng ký nhất trong một tháng  -->
              <b-card class="card-custom">
                <h3 style="text-align:center;">
                  Tour được đăng ký nhiểu nhất
                </h3>
                <tour-chart
                  v-if="loadedTour"
                  :height="240"
                  :year="yearTour"
                  :month="monthTour"
                ></tour-chart>
                <div style="margin-left: 506px;">
                  <date-picker
                    v-model="timeTour"
                    type="month"
                    format="M-YYYY"
                    class="input-custom"
                    @change="reloadTour()"
                  ></date-picker>
                </div>
              </b-card>
            </b-col>
          </b-row>
        </b-col>
      </b-row>
      <b-row class="m-0">
        <b-col class="m-0 p-0">
          <b-card class="card-custom">
            <!-- biểu đồ tổng số hợp đồng trong 1 năm  -->
            <div class="Chart">
              <b-row class="m-0 text-center">
                <b-col class="m-0 p-0">
                  <h3
                    style="float: left; padding-left: 33rem; padding-right: 22px;"
                  >
                    Doanh thu theo quý
                  </h3>
                  <div style="float: left;">
                    <date-picker
                      v-model="timeQuarterlyRemvenue"
                      type="year"
                      format="YYYY"
                      @change="reloadQuarterlyRemvenue()"
                      class="input-custom"
                    ></date-picker>
                  </div>
                </b-col>
              </b-row>
              <quarterly-revenue
                v-if="loadedQuarterlyRemvenue"
                :year="yearQuarterlyRemvenue"
              ></quarterly-revenue>
            </div>
          </b-card>
        </b-col>
      </b-row>
      <b-row class="mt-5"> </b-row>
    </b-container>
  </div>
</template>
<script>
import Contract from "./Contract.vue";
import ProductChart from "./ProductChart.vue";
import TourChart from "./TourChart.vue";
import Revenue from "./Revenue.vue";
import QuarterlyRevenue from "./QuarterlyRevenue.vue";

import DatePicker from "vue2-datepicker";
import "vue2-datepicker/index.css";
import moment from "moment";

export default {
  components: {
    Contract,
    ProductChart,
    TourChart,
    Revenue,
    DatePicker,
    QuarterlyRevenue
  },
  data() {
    return {
      orderChecked: [],
      orderCancelled: [],
      picker: null,

      loadedOder: false,
      loadedProduct: false,
      loadedTour: false,
      loadedRevenue: false,
      loadedQuarterlyRemvenue: false,

      timeOder: new Date(),
      timeProduct: new Date(),
      timeTour: new Date(),
      timeRevenue: new Date(),
      timeQuarterlyRemvenue: new Date(),

      yearOder: null,
      yearProduct: null,
      monthProduct: null,
      yearTour: null,
      monthTour: null,
      yearRevenue: null,
      yearQuarterlyRemvenue: null
    };
  },
  mounted() {
    this.reloadOder();
    this.reloadRevenue();
    this.reloadProduct();
    this.reloadTour();
    this.reloadQuarterlyRemvenue();
    this.loadedOder = true;
    this.loadedProduct = true;
    this.loadedTour = true;
    this.loadedRevenue = true;
    this.loadedQuarterlyRemvenue = true;
  },
  methods: {
    reloadQuarterlyRemvenue() {
      this.loadedQuarterlyRemvenue = false;
      this.yearQuarterlyRemvenue = this.timeQuarterlyRemvenue.getFullYear();
      this.$nextTick(() => {
        this.loadedQuarterlyRemvenue = true;
      });
    },
    reloadOder() {
      this.loadedOder = false;
      this.yearOder = this.timeOder.getFullYear();
      this.$nextTick(() => {
        this.loadedOder = true;
      });
    },
    reloadProduct() {
      this.loadedProduct = false;
      this.yearProduct = this.timeProduct.getFullYear();
      this.monthProduct = this.timeProduct.getMonth() + 1;
      this.$nextTick(() => {
        this.loadedProduct = true;
      });
    },
    reloadTour() {
      this.loadedTour = false;
      this.yearTour = this.timeTour.getFullYear();
      this.monthTour = this.timeTour.getMonth() + 1;
      this.$nextTick(() => {
        this.loadedTour = true;
      });
    },
    reloadRevenue() {
      this.loadedRevenue = false;
      this.yearRevenue = this.timeRevenue.getFullYear();
      this.$nextTick(() => {
        this.loadedRevenue = true;
      });
    },

    formatYear(value) {
      return moment(value).format("yyy");
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

.input-custom .mx-input {
  background: none !important;
  color: black;
  font-size: 23px;
  padding: 10px 10px 10px 5px;
  display: block;
  border: none;
  box-shadow: none;
  border-radius: 0;
  border-bottom: 1px solid #c6c6c6;
}
</style>
