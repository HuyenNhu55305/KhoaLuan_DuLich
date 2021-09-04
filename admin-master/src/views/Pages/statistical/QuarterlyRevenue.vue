<script>
import { Bar } from "vue-chartjs";

export default {
  extends: Bar,
  props: {
    year: {
      type: Number
    }
  },
  data() {
    return {
      post: {
        year: null,
        month: null
      },
      revenueCustomer: [],
      revenueProduct: [],
      revenueTotal: []
    };
  },
  mounted() {
    this.getProductChar();
  },
  methods: {
    getProductChar() {
      this.post.year = this.year;
      let uri = `${process.env.VUE_APP_PORT}/statistic/revenue/quarter`;
      this.axios.post(uri, this.post).then(response => {
        response.data.forEach(element => {
          this.revenueCustomer.push(element.revenueCustomer);
          this.revenueProduct.push(element.revenueProduct);
          this.revenueTotal.push(element.revenueTotal);
        });
        this.loadDataChart();
      });
    },
    loadDataChart() {
      this.renderChart(
        {
          labels: ["Quý 1", "Quý 2", "Quý 3", "Quý 4"],
          datasets: [
            {
              label: "Doanh thu tour",
              backgroundColor: "#00BFFF",
              data: this.revenueCustomer
            },
            {
              label: "Doanh thu sản phẩm",
              backgroundColor: "#FCF54C",
              data: this.revenueProduct
            },
            {
              label: "Tổng doanh thu",
              backgroundColor: "#FF0000",
              data: this.revenueTotal
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }
  }
};
</script>
