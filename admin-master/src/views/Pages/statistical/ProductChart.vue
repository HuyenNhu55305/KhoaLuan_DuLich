<script>
import { isThisSecond } from "date-fns";
import { Pie } from "vue-chartjs";
export default {
  extends: Pie,
  props: { year: { type: Number }, month: { type: Number } },
  data() {
    return { post: { year: null, month: null }, label: [], datas: [] };
  },
  mounted() {
    this.getProductChar();
  },
  methods: {
    getProductChar() {
      this.post.year = this.year;
      this.post.month = this.month;
      let uri = `${process.env.VUE_APP_PORT}/statistic/product/month`;
      this.axios.post(uri, this.post).then(response => {
        response.data.analyProduct.forEach(element => {
          this.datas.push(element.quantity);
          this.label.push(element.productName);
        });
        this.loadDataChart();
      });
    },
    loadDataChart() {
      this.renderChart(
        {
          labels: this.label,
          datasets: [
            {
              backgroundColor: ["#41B883", "#E46651", "#00D8FF", "#DD1B16"],
              data: this.datas
            }
          ]
        },
        { responsive: true, maintainAspectRatio: false }
      );
    }
  }
};
</script>
