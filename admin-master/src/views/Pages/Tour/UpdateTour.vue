<template>
  <div>
    <base-header class="pb-6 pb-8 pt-8 pt-md-8 bg-gradient-success">
      <!-- Card stats -->
      <!-- <b-row>
        <b-col xl="3" md="6">
          <stats-card
            title="Total traffic"
            type="gradient-red"
            sub-title="350,897"
            icon="ni ni-active-40"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">3.48%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
        <b-col xl="3" md="6">
          <stats-card
            title="Total traffic"
            type="gradient-orange"
            sub-title="2,356"
            icon="ni ni-chart-pie-35"
            class="mb-4"
          >
            <template slot="footer">
              <span class="text-success mr-2">12.18%</span>
              <span class="text-nowrap">Since last month</span>
            </template>
          </stats-card>
        </b-col>
      </b-row> -->
    </base-header>

    <!--Charts-->
    <b-container fluid class="mt--7">
      <!-- End charts-->
      <b-row class="m-0">
        <b-col class="p-0">
          <b-card class="card-custom">
            <div class="md">
              <div
                class="app-section"
                v-bind:class="[newtabPlus ? '' : 'testbind']"
              >
                <form>
                  <div>
                    <b-alert variant="primary" show> THÔNG TIN TOUR </b-alert>
                    <b-container>
                      <b-row class="pl-5 pr-5">
                        <b-col cols="4">
                          <b-form-group label="Tên Tour">
                            <b-form-input
                              v-model="data.tourName"
                              type="text"
                              required="required"
                            />
                          </b-form-group>
                          <b-form-group label="Số người tham gia">
                            <b-form-spinbutton
                              v-model="data.numberOfParticipants"
                              min="1"
                              max="100"
                            ></b-form-spinbutton>
                          </b-form-group>
                          <b-form-group label="Ngày Bắt đầu">
                            <b-form-datepicker
                              id="startDate"
                              v-model="data.startDate"
                            >
                            </b-form-datepicker>
                          </b-form-group>
                          <b-form-group label="Ngày Kết thúc">
                            <b-form-datepicker
                              id="endDate"
                              v-model="data.endDate"
                            >
                            </b-form-datepicker>
                          </b-form-group>
                        </b-col>
                        <b-col cols="4">
                          <b-form-group label="Hướng dẫn viên">
                            <b-form-select
                              v-model="data.employee"
                              :options="selectEmployee"
                              text-field="fullName"
                              value-field="_id"
                            >
                            </b-form-select>
                          </b-form-group>
                          <b-form-group label="Địa điểm bắt đầu">
                            <b-form-input
                              v-model="data.startPlace"
                              type="text"
                              required="required"
                            />
                          </b-form-group>
                          <b-form-group label="Loại hình du lich">
                            <b-form-input
                              v-model="data.typesOftourism"
                              type="text"
                              required="required"
                            />
                          </b-form-group>
                        </b-col>
                        <b-col cols="4">
                          <b-form-group label="Giá người lớn">
                            <b-input-group prepend="$" append=".00">
                              <b-form-input
                                v-model="data.priceDetail.adult"
                                type="number"
                                required="required"
                              />
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label="Giá dưới 12 tuổi">
                            <b-input-group prepend="$" append=".00">
                              <b-form-input
                                v-model="data.priceDetail.underTheAgeOfTwelve"
                                type="text"
                                required="required"
                              />
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label="Giá dưới 5 tuổi">
                            <b-input-group prepend="$" append=".00">
                              <b-form-input
                                v-model="data.priceDetail.underTheAgeOfTwelve"
                                type="text"
                                required="required"
                              />
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <!-- <b-row class="pl-5 pr-5">
                        <b-col>
                          <b-form-group label="Miêu tả">
                            <vue-editor v-model="data.description"></vue-editor>
                          </b-form-group>
                        </b-col>
                      </b-row> -->
                    </b-container>
                  </div>
                  <div>
                    <b-alert class="mb-0" variant="primary" show>
                      LỊCH TRÌNH TOUR HÀNG NGÀY
                    </b-alert>
                    <b-card no-body>
                      <b-tabs card>
                        <!-- Render Tabs, supply a unique `key` to each tab -->
                        <b-tab
                          v-for="i in tabs"
                          :key="'dyn-tab-' + i"
                          :title="'Ngày ' + (i + 1)"
                        >
                          <div>
                            <b-container>
                              <b-row class="pl-5 pr-5 pt-0">
                                <b-col cols="6">
                                  <b-form-group label="Địa điểm">
                                    <b-form-select
                                      v-model="data.place[i]"
                                      :options="selectPlace"
                                      text-field="placeName"
                                      value-field="_id"
                                    >
                                    </b-form-select>
                                  </b-form-group>
                                  <b-form-group label="Phương tiện">
                                    <b-form-select
                                      v-model="data.transportation[i]"
                                    >
                                      <option value="Máy bay">Máy bay</option>
                                      <option value="Xe lửa">Xe lửa</option>
                                      <option value="Grap">Grap</option>
                                      <option value="Xe hoi">Xe hoi</option>
                                    </b-form-select>
                                  </b-form-group>
                                </b-col>
                                <b-col cols="6">
                                  <b-form-group label="Khách sạn">
                                    <b-form-select
                                      v-model="data.hotel[i]"
                                      :options="selectHotel"
                                      text-field="hotelName"
                                      value-field="_id"
                                    >
                                    </b-form-select>
                                  </b-form-group>
                                </b-col>
                              </b-row>
                              <b-row class="pl-5 pr-5 pt-0">
                                <b-col>
                                  <b-form-group
                                    :label="'Lịch trình  ngày ' + (i + 1)"
                                  >
                                    <vue-editor
                                      v-model="data.detail[0]"
                                    ></vue-editor>
                                  </b-form-group>
                                </b-col>
                              </b-row>
                            </b-container>
                          </div>
                          <div>
                            <div>
                              <b-button
                                variant="danger"
                                @click="closeTab(i)"
                                style="width: 100%"
                              >
                                Xóa ngày
                              </b-button>
                            </div>
                          </div>
                        </b-tab>
                        <!-- New Tab Button (Using tabs-end slot) -->
                        <template #tabs-end>
                          <b-nav-item
                            role="presentation"
                            @click.prevent="newTab"
                            href="#"
                            ><b>+</b></b-nav-item
                          >
                        </template>
                        <!-- Render this if no tabs -->
                        <template #empty>
                          <div class="text-center text-muted">
                            There are no open tabs<br />
                            Open a new tab using the <b>+</b> button above.
                          </div>
                        </template>
                      </b-tabs>
                    </b-card>
                    <div>
                      <b-button
                        @click="updateTour()"
                        variant="success"
                        style="width: 100%"
                      >
                        Cập nhật tour
                      </b-button>
                    </div>
                  </div>
                </form>
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
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  data() {
    return {
      post: {},
      tabs: [],
      data: {
        priceDetail: [],
        place: [],
        hotel: [],
        transportation: [],
        detail: []
      },
      tabCounter: 0,
      newtabPlus: false,
      selectHotel: [],
      selectEmployee: [],
      selectPlace: [],
      idFind: {
        id: null
      }
    };
  },

  mounted() {
    this.findTour();
    this.getAllHotel();
    this.getAllEmployee();
    this.getAllPlace();
  },

  methods: {
    getAllHotel() {
      let uri = `${process.env.VUE_APP_PORT}/hotels`;
      this.axios.get(uri, this.ticket).then(response => {
        this.selectHotel = response.data;
      });
    },
    getAllEmployee() {
      let uri = `${process.env.VUE_APP_PORT}/employees`;
      this.axios.get(uri, this.ticket).then(response => {
        this.selectEmployee = response.data;
      });
    },
    getAllPlace() {
      let uri = `${process.env.VUE_APP_PORT}/places`;
      this.axios.get(uri, this.ticket).then(response => {
        this.selectPlace = response.data;
      });
    },
    findTour() {
      this.idFind.id = this.$route.params.id;
      let uri = `${process.env.VUE_APP_PORT}/get-tour-update`;
      this.axios.post(uri, this.idFind).then(response => {
        this.data = response.data;
        this.data.priceDetail = response.data.priceDetail;

        this.tabCounter = this.data.detail.length;
        for (let i = 0; i < this.data.detail.length; i++) {
          this.tabs.push(i);
        }
      });
    },
    updateTour() {
      let uri = `${process.env.VUE_APP_PORT}/tour/${this.$route.params.id}`;
      this.axios.put(uri, this.data).then(() => {
        this.$router.push({ name: "tour" });
      });
    },
    closeTab(x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
          this.tabs.splice(i, 1);
          this.data.place.splice(i, 1);
          this.data.transportation.splice(i, 1);
          this.data.hotel.splice(i, 1);
          this.data.morning.splice(i, 1);
          this.data.afternoon.splice(i, 1);
          this.data.evening.splice(i, 1);
          this.tabCounter = this.data.hotel.length;
        }
      }
    },
    newTab() {
      this.newtabPlus = true;
      this.tabs.push(this.tabCounter++);
    }
  }
};
</script>
<style>
.c-day {
  padding-top: 20rem;
}
.box {
  box-shadow: 1px 2px 10px rgb(0 0 0 / 10%);
}

</style>
