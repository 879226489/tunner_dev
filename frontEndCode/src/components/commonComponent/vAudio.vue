<template>
  <div
    class="box"
    :style="{width: $attrs.width, height: $attrs.height, background: $attrs.background, backgroundImage: $attrs.backgroundImage}"
    ref="box"
  >
    <canvas ref="audio"></canvas>
  </div>
</template>

<script>
import { on, off } from "@/utils/common";
export default {
  data() {
    return {
      ac: null,
      source: null,
      analyser: null,
      size: 128,
      canvas: null,
      oCtx: null,
      width: "",
      height: "",
      first: false
    };
  },
  methods: {
    initAudio(url) {
      this.ac = new AudioContext();
      this.analyser = this.ac.createAnalyser();
      this.analyser.fftSize = this.size * 2;
      this.analyser.connect(this.ac.destination);
      this.canvas = this.$refs.audio;
      this.oCtx = this.canvas.getContext("2d");
      this.visualizer();
      this.getBuffer(url).then(buffer => {
        let bufferSource = this.ac.createBufferSource();
        bufferSource.buffer = buffer;
        bufferSource.connect(this.analyser);
        this.source = bufferSource;
      });
    },
    visualizer() {
      let arr = new Uint8Array(this.analyser.frequencyBinCount);
      let that = this;
      function v() {
        that.analyser.getByteFrequencyData(arr);
        that.draw(arr);
        requestAnimationFrame(v);
      }
      requestAnimationFrame(v);
    },
    draw(arr) {
      this.oCtx.clearRect(0, 0, this.width, this.height);
      let w = this.width / this.size;
      for (let i = 0; i < this.size; i++) {
        let h = (arr[i] / 256) * this.height;
        this.oCtx.fillRect(w * i, this.height - h, w * 0.6, h);
      }
    },
    getBuffer(link) {
      return new Promise((resolve, reject) => {
        if (this.ac) {
          let request = new XMLHttpRequest();
          request.open("GET", link, true);
          request.responseType = "arraybuffer";
          request.onload = () => {
            this.ac.decodeAudioData(
              request.response,
              function(buffer) {
                resolve(buffer);
              },
              function(e) {
                console.log("reject");
                reject(e);
              }
            );
          };
          request.send();
        } else {
          reject("not support AudioContext");
        }
      });
    },
    open() {
      this.source && this.source[this.source.start ? "start" : "noteOn"](0);
    },
    close() {
      this.source && this.source[this.source.stop ? "stop" : "noteOff"](0);
    },
    play() {
      this.ac.resume();
    },
    stop() {
      this.ac.suspend();
    },
    resize() {
      this.width = this.$refs.box.clientWidth;
      this.height = this.$refs.box.clientHeight;
      this.canvas.width = this.width;
      this.canvas.height = this.height;
      let line = this.oCtx.createLinearGradient(0, 0, 0, this.height);
      line.addColorStop(0, "red");
      line.addColorStop(0.5, "yellow");
      line.addColorStop(1, "blue");
      this.oCtx.fillStyle = line;
    }
  },
  mounted() {
    this.initAudio("http://images.81dd.cn/5fc46995d0b34fbf9c85bc35f222dec0");
    this.resize();
    on(window, "resize", this.resize);
  },
  beforeDestroy() {
    off(window, "resize", this.resize);
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100px;
  background: #ccc;
}
</style>