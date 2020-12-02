<template>
  <div :id="id" :class="className" :style="{ minHeight: height, minWidth: '350px', Width: width }" />
</template>

<script>
import echarts from "echarts";
import resize from "@/components/Charts/mixins/resize";

const defaultOption = {
  xAxis: {
    type: "category",
    data: ["2016", "2017", "2018", "2019", "2020"],
  },
  yAxis: {
    type: "value",
  },
  name: "lntjfb",
  symbolSize: 5,
  lineStyle: {
    normal: {
      label: {
        show: true,
      },
      width: 5,
      color: "#fe4857",
    },
  },
  series: [
    {
      itemStyle: { normal: { label: { show: true } } },
      data: ["820", "932", "901", "934", "1290"],
      type: "line",
      smooth: true,
      areaStyle: {
        normal: {
          //右，下，左，上
          color: new echarts.graphic.LinearGradient(
            0,
            0,
            0,
            1,
            [
              {
                offset: 0,
                color: "#fe4857",
              },
              {
                offset: 1,
                color: "#FFFFFF",
              },
            ],
            false
          ),
        },
      },
    },
  ],
};
export default {
  name: 'Cur',
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "cur",
    },
    id: {
      type: String,
      default: "cur",
    },
    width: {
      type: String,
      default: "345px",
    },
    height: {
      type: String,
      default: "300px",
    },
    option: {
      type: Object,
      default: () => defaultOption,
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    option: {
      handler: function (val, oldval) {
        //console.log('监听到数据变化，饼图初始化....')
        this.initChart();
      },
      // 声明后立刻执行,echarts演示需要dom初始化完成，此处不要打开
      // immediate: true,
      deep: true,
    },
  },
  mounted() {
    //console.log('饼图初始化,注意此mounted处执行的初始化只是用来演示组件')
    this.initChart();
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id));

      this.chart.setOption(this.option);
    },
    resizeChart(){
      this.chart.resize()
    }
  },
};
</script>
