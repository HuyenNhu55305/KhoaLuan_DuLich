<script>
import { Doughnut } from "vue-chartjs";

export default {
  extends: Doughnut,
  props: {
    year: {
      type: Number
    },
    month: {
      type: Number
    }
  },
  data() {
    return {
      post: {
        year: null,
        month: null
      },
      label: [],
      datas: []
    };
  },
  mounted() {
    this.getProductChar();
  },
  methods: {
    getProductChar() {
      this.post.year = this.year;
      this.post.month = this.month;

      let uri = `${process.env.VUE_APP_PORT}/statistic/tour/month`;
      this.axios.post(uri, this.post).then(response => {
        response.data.analyTour.forEach(element => {
          this.datas.push(element.quantity);
          this.label.push(element.tourName);
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
