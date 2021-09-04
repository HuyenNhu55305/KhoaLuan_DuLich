<template>
  <div>
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
              <div>
                <form enctype="multipart/form-data">
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
                              required="required"
                            ></b-form-spinbutton>
                          </b-form-group>
                          <b-form-group label="Ngày Bắt đầu">
                            <b-form-datepicker
                              id="startDate"
                              v-model="data.startDate"
                              required="required"
                            >
                            </b-form-datepicker>
                          </b-form-group>
                          <b-form-group label="Ngày Kết thúc">
                            <b-form-datepicker
                              id="endDate"
                              required="required"
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
                              required="required"
                            >
                              <template slot="option">
                                <img :src="selectEmployee.image" />
                              </template>
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
                          <b-form-group label="Hình ảnh">
                            <b-form-file
                              placeholder="Chọn hình ảnh  ..."
                              drop-placeholder="Drop file here..."
                              multiple="multiple"
                              v-model="data.file"
                              ref="file"
                            ></b-form-file>
                          </b-form-group>
                        </b-col>
                        <b-col cols="4">
                          <b-form-group label="Giá người lớn">
                            <b-input-group prepend="$" append=".00">
                              <b-form-input
                                v-model="data.adult"
                                type="number"
                                required="required"
                              />
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label="Giá dưới 12 tuổi">
                            <b-input-group prepend="$" append=".00">
                              <b-form-input
                                v-model="data.underTheAgeOfTwelve"
                                type="number"
                                required="required"
                              />
                            </b-input-group>
                          </b-form-group>
                          <b-form-group label="Giá dưới 5 tuổi">
                            <b-input-group prepend="$" append=".00">
                              <b-form-input
                                v-model="data.underTheAgeOfTFive"
                                type="number"
                                required="required"
                              />
                            </b-input-group>
                          </b-form-group>
                        </b-col>
                      </b-row>
                      <b-row class="pl-5 pr-5">
                        <b-col>
                          <b-form-group label="Miêu tả">
                            <vue-editor v-model="data.description"></vue-editor>
                          </b-form-group>
                        </b-col>
                      </b-row>
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
                          v-for="(value, index) in tabs"
                          :key="'dyn-tab-' + index"
                          :title="'Ngày ' + (index + 1)"
                        >
                          <div>
                            <b-container>
                              <b-row class="pl-5 pr-5 pt-0">
                                <b-col cols="6">
                                  <b-form-group label="Địa điểm">
                                    <b-form-select
                                      v-model="data.place[index]"
                                      :options="selectPlace"
                                      text-field="placeName"
                                      value-field="_id"
                                      required="required"
                                    >
                                    </b-form-select>
                                  </b-form-group>
                                  <b-form-group label="Phương tiện">
                                    <b-form-select
                                      v-model="data.transportation[index]"
                                      required="required"
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
                                      v-model="data.hotel[index]"
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
                                    :label="
                                      'Chi tiết lịch trình ' + (index + 1)
                                    "
                                  >
                                    <vue-editor
                                      v-model="data.detail[index]"
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
                                @click="closeTab(index)"
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
                          >
                            <b-icon
                              icon="plus-circle-fill"
                              aria-label="Help"
                            ></b-icon>
                          </b-nav-item>
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
                        @click="addTour()"
                        variant="success"
                        style="width: 100%"
                      >
                        Thêm Tour
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
        place: [],
        hotel: [],
        transportation: [],
        detail: [],
      },
      tabCounter: 0,
      newtabPlus: false,
      selectHotel: [],
      selectEmployee: [],
      selectPlace: [],
    };
  },

  mounted() {
    this.getAllHotel();
    this.getAllEmployee();
    this.getAllPlace();
  },

  methods: {
    getAllHotel() {
      let uri = `${process.env.VUE_APP_PORT}/hotels`;
      this.axios.get(uri, this.ticket).then((response) => {
        this.selectHotel = response.data;
      });
    },
    getAllEmployee() {
      let uri = `${process.env.VUE_APP_PORT}/employees`;
      this.axios.get(uri, this.ticket).then((response) => {
        this.selectEmployee = response.data;
      });
    },
    getAllPlace() {
      let uri = `${process.env.VUE_APP_PORT}/places`;
      this.axios.get(uri, this.ticket).then((response) => {
        this.selectPlace = response.data;
      });
    },
    addTour() {
      const formData = new FormData();
      for (var i = 0; i < this.$refs.file.files.length; i++) {
        let file = this.$refs.file.files[i];
        formData.append("file", file);
      }

      formData.append("tourName", this.data.tourName);
      formData.append("numberOfParticipants", this.data.numberOfParticipants);
      formData.append("startDate", this.data.startDate);
      formData.append("endDate", this.data.endDate);
      formData.append("employee", this.data.employee);
      formData.append("startPlace", this.data.startPlace);
      formData.append("typesOftourism", this.data.typesOftourism);

      formData.append("adult", this.data.adult);
      formData.append("underTheAgeOfTwelve", this.data.underTheAgeOfTwelve);
      formData.append("underTheAgeOfFive", this.data.underTheAgeOfTFive);
      formData.append("description", this.data.description);
      for (let i = 0; i < this.data.hotel.length; i++) {
        formData.append("hotel", this.data.hotel[i]);
      }
      for (let i = 0; i < this.data.place.length; i++) {
        formData.append("place", this.data.place[i]);
      }
      for (let i = 0; i < this.data.transportation.length; i++) {
        formData.append("transportation", this.data.transportation[i]);
      }
      for (let i = 0; i < this.data.detail.length; i++) {
        formData.append("detail", this.data.detail[i]);
      }

      const timeDiff =
        new Date(this.data.endDate) - new Date(this.data.startDate);
      const days = timeDiff / (1000 * 60 * 60 * 24);
      if (this.tabCounter === days) {
        let uri = `${process.env.VUE_APP_PORT}/tour`;
        this.axios
          .post(uri, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          })
          .then((response) => {
            this.$router.push({ name: "tour" });
          });
      } else if (this.tabCounter > days) {
        this.$bvToast.toast(
          `Dư lịch trình của ${this.tabCounter - days} ngày`,
          {
            title: `Warning`,
            variant: "danger",
            solid: true,
          }
        );
      } else if (this.tabCounter < days) {
        this.$bvToast.toast(
          `Còn thiếu lịch trình của ${days - this.tabCounter} ngày`,
          {
            title: `Warning`,
            variant: "danger",
            solid: true,
          }
        );
      }
    },
    closeTab(x) {
      for (let i = 0; i < this.tabs.length; i++) {
        if (this.tabs[i] === x) {
          this.tabs.splice(i, 1);
          this.tabCounter--;
        }
      }
    },
    newTab() {
      this.newtabPlus = true;
      this.tabs.push(this.tabCounter++);
    },
  },
};
</script>
<style>
.box {
  box-shadow: 1px 2px 10px rgb(0 0 0 / 10%);
}
</style>
