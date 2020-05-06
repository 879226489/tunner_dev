<template>
  <Row>
    <i-col span="2">{{index + 1}}</i-col>
    <i-col span="2">{{value.areaName}}</i-col>
    <i-col span="2">
      <Icon type="md-volume-up" size="25" style="cursor: pointer" @click="open" />
    </i-col>
    <i-col span="18">
      <VAudio ref="va" backgroundImage="linear-gradient(to right, #183145 85%, #000224)" />
    </i-col>
  </Row>
</template>

<script>
import VAudio from "@/components/commonComponent/vAudio";
export default {
  components: {
    VAudio
  },
  props: {
    value: Object,
    index: Number
  },
  data() {
    return {
      isOpen: false,
      isStop: true,
    };
  },
  methods: {
    open() {
      if (!this.isOpen) {
        this.$refs.va.open();
        this.isOpen = true;
        this.isStop = false;
      } else {
          if(this.isStop) {
              this.$refs.va.play();
          }else {
              this.$refs.va.stop();
          }
          this.isStop = !this.isStop;
      }
    }
  }
};
</script>

<style>
</style>