<template>
  <div>
    <RadioGroup v-model="type" type="button" @on-change="setData()">
        <Radio :label="0">小时</Radio>
        <Radio :label="1">日期</Radio>
    </RadioGroup>
    <div ref="dom" style="width:100%; height: 100%;"></div>
  </div>
</template>

<script>
import echarts from "echarts";
import { on, off } from "@/utils/common";
export default {
  props: {
    value: Object
  },
  data() {
    return {
      dom: null,
      type: 0
    };
  },
  watch: {
    value: {
      handler() {
        this.setData();
      },
      deep: true
    }
  },
  methods: {
    resize() {
      this.dom.resize();
    },
    setData() {
      let { dayList, hourList } = this.value;
      console.log(hourList, dayList);
      this.$nextTick(() => {
        let option = {
          xAxis: {
            name: `${this.type == 0 ? '时' : '日期'}`
          },
          yAxis: {
            name: `${this.type == 0 ? '秒' : '分'}`
          },
          series: [
            {
              symbolSize: 20,
              data: this.type == 0 ? hourList : dayList,
              type: "scatter"
            }
          ]
        };
        this.dom = echarts.init(this.$refs.dom);
        this.dom.setOption(option);
      });
    }
  },
  mounted() {
    this.setData();
    on(window, "resize", this.resize);
  },
  destroyed() {
    off(window, "resize", this.resize);
  }
};
</script>

<style>
</style>