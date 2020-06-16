<template>
  <div ref="bar"></div>
</template>

<script>
import echarts from 'echarts';
export default {
  props: {
    data: {
      type: Array,
      require: true,
    },
    graphType: {
      type: String,
      default: 'bar',
    },
  },
  data() {
    return {
      chart: null,
      resizeListener: null,
    };
  },
  mounted() {
    this.chart = echarts.init(this.$refs.bar);
    this.chart.setOption(this.option);

    this.resizeListener = () => {
      this.chart.resize();
    };
    window.addEventListener('resize', this.resizeListener);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  },
  watch: {
    option() {
      this.chart.setOption(this.option);
    },
  },
  computed: {
    sortedData() {
      const sorted = [...this.data].sort((a, b) => a.year - b.year);
      const max = new Date().getFullYear();
      const min = Math.min(max - 15, sorted[0] && sorted[0].year);
      const result = { years: [], values: [] };
      let p = 0;
      for (let i = min; i <= max; i++) {
        result.years.push(i);
        if (i == parseInt(sorted[p] && sorted[p].year)) {
          result.values.push(sorted[p].publicationCount);
          p++;
        } else {
          result.values.push(0);
        }
      }
      return result;
    },
    option() {
      return {
        grid: {
          left: 0,
          right: 0,
        },
        color: 'lightgrey',
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
          },
        },
        xAxis: {
          type: 'category',
          data: this.sortedData.years,
          axisTick: {
            alignWithLabel: true,
            show: false,
          },
        },
        yAxis: {
          type: 'value',
          axisLine: false,
          splitLine: {
            interval: 2,
            lineStyle: {
              color: 'rgba(0,0,0,0.1)',
            },
          },
        },
        series: [
          {
            name: '论文数量',
            type: this.graphType,
            barWidth: '60%',
            itemStyle: {
              color: '#80DEEA',
              opacity: this.graphType === 'line' ? 0 : 1,
            },
            smooth: 0.2,
            lineStyle: {
              width: 4,
            },
            label: {
              show: this.graphType === 'bar' ? true : false,
              position: 'top',
              color: 'rgba(0,0,0,0.5)',
              offset: [0, 5],
              formatter: function(params) {
                if (params.value > 0) {
                  return params.value;
                } else {
                  return '';
                }
              },
            },
            data: this.sortedData.values,
          },
        ],
      };
    },
  },
};
</script>
