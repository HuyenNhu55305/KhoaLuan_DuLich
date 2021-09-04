<script>
import { Line } from "vue-chartjs";

export default {
  extends: Line,
  props: {
    year: {
      type: Number
    }
  },
  data() {
    return {
      gradient: null,
      gradient2: null,

      post: {
        year: null,
        statusOrder: null
      },
      orderChecked: [],
      orderCancelled: []
    };
  },
  mounted() {
    this.getOrderchecked();
  },
  methods: {
    getOrderchecked() {
      this.post.year = this.year;
      this.post.statusOrder = "checked";

      let uri = `${process.env.VUE_APP_PORT}/statistic/order/month-year`;
      this.axios.post(uri, this.post).then(response => {
        this.orderChecked = response.data.statistic;
        this.getOrdercancelled();
      });
    },
    getOrdercancelled() {
      this.post.year = this.year;
      this.post.statusOrder = "cancelled";

      let uri = `${process.env.VUE_APP_PORT}/statistic/order/month-year`;
      this.axios.post(uri, this.post).then(response => {
        this.orderCancelled = response.data.statistic;
        this.fillData();
      });
    },
    fillData() {
      this.gradient = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);
      this.gradient2 = this.$refs.canvas
        .getContext("2d")
        .createLinearGradient(0, 0, 0, 450);

      this.gradient.addColorStop(0, "rgba(255, 0,0, 0.5)");
      this.gradient.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
      this.gradient.addColorStop(1, "rgba(255, 0, 0, 0)");

      this.gradient2.addColorStop(0, "rgba(0, 231, 255, 0.9)");
      this.gradient2.addColorStop(0.5, "rgba(0, 231, 255, 0.25)");
      this.gradient2.addColorStop(1, "rgba(0, 231, 255, 0)");

      this.renderChart(
        {
          labels: [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
            "7",
            "8",
            "9",
            "10",
            "11",
            "12"
          ],
          datasets: [
            {
              label: "Hóa đơn thành công",
              borderColor: "#05CBE1",
              pointBackgroundColor: "white",
              pointBorderColor: "white",
              borderWidth: 1,
              backgroundColor: this.gradient2,

              data: this.orderChecked
            },
            {
              label: "Hóa đơn bị hủy ",

              borderColor: "#FC2525",
              pointBackgroundColor: "white",
              borderWidth: 1,
              pointBorderColor: "white",
              backgroundColor: this.gradient,

              data: this.orderCancelled
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }
  }
};
</script>
