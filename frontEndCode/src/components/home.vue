<template>
  <div>
    <Button @click="goScreen">一键投屏</Button>
    <div class="Home" style="width:100%;height:calc(100vh - 138px);background:#eee;">
      <div class="stage">
        <div class="parent">
          <div class="animation"></div>
          <div class="animation"></div>
          <div class="animation"></div>
          <div class="animation"></div>
          <div class="animation"></div>
          <div class="animation"></div>
          <div class="animation"></div>
          <div class="animation"></div>
          <div class="animation"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import VAudio from '@/components/commonComponent/vAudio'
export default {
  name: "Home",
  components: {
    VAudio
  },
  data() {
    return {};
  },
  methods: {
    goScreen() {
      let { href } = this.$router.resolve({
        path: "/allScreen", // 这里写的是要跳转的路由地址
        query: { goodsId: "1111" } // 这里写的是页面参数
      });
      window.open(href, "_blank");
    }
  }
};
</script>
<style lang="scss" scoped>
.stage {
  width: 600px;
  height: 300px;
  // border: 1px solid #333;
  margin: 0 auto;
  /*perspective*/
  perspective: 1200px;
  padding-top: 170px;
}
.parent {
  width: 600px;
  height: 300px;
  // border: 1px solid red;
  transform: rotatex(0deg) rotatey(0deg) rotatez(30deg);
  position: relative;
  transform-style: preserve-3d;
  animation: action 15s linear infinite;
}
.animation {
  width: 150px;
  height: 150px;
  background: #e4393c;
  position: absolute;
  left: 225px;
  top: 125px;
  transform: scale(1);
  box-shadow: 0px 0px 35px #000;
}
.parent div:hover {
  background: blue;
  transform: scale(1.5);
}
.parent div:nth-child(1) {
  transform: rotatey(0deg) translatez(25vw);
}
.parent div:nth-child(2) {
  transform: rotatey(40deg) translatez(25vw);
}
.parent div:nth-child(3) {
  transform: rotatey(80deg) translatez(25vw);
}
.parent div:nth-child(4) {
  transform: rotatey(120deg) translatez(25vw);
}
.parent div:nth-child(5) {
  transform: rotatey(160deg) translatez(25vw);
}
.parent div:nth-child(6) {
  transform: rotatey(200deg) translatez(25vw);
}
.parent div:nth-child(7) {
  transform: rotatey(240deg) translatez(25vw);
}
.parent div:nth-child(8) {
  transform: rotatey(280deg) translatez(25vw);
}
.parent div:nth-child(9) {
  transform: rotatey(320deg) translatez(25vw);
}
@keyframes action {
  from {
    transform: rotateY(0);
  }
  to {
    transform: rotateY(360deg);
  }
}
.animation:hover ~ .animation {
  animation-play-state: paused;
}
</style>
