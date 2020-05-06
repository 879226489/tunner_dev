<template>
  <div>
    <Row style="padding: 15px;">
      <i-col span="20">
        <AreaSelect range="[5,4,3,2,1]" col="4" @change="searchForm.areaId = $event.id; getData()" />
      </i-col>
    </Row>

    <Row>
      <i-col span="24">
        <p class="title">音频实时监听</p>
        <Table :columns="columns" :data="tableData"></Table>
        <div>
          <p class="title">当前播放</p>
          <div style="padding: 15px;border: 1px solid #ccc;">
            <Row>
              <i-col span="4" style="line-height: 60px;">序号</i-col>
              <i-col span="4" style="line-height: 60px;">所属地区</i-col>
              <i-col span="4" style="line-height: 60px;">播发状态</i-col>
              <i-col span="12">
                <audio
                  :src="src"
                  controls="controls"
                  style="float: right;"
                >Your browser does not support the audio element.</audio>
              </i-col>
            </Row>
          </div>
        </div>
      </i-col>
      <i-col span="24">
        <p class="title">音频回溯监听</p>
        <Table :columns="backColumns" :data="backData"></Table>
        <div>
          <p class="title">当前播放</p>
          <div style="padding: 15px;border: 1px solid #ccc;">
            <Row>
              <i-col span="4" style="line-height: 60px;">序号</i-col>
              <i-col span="4" style="line-height: 60px;">所属地区</i-col>
              <i-col span="4" style="line-height: 60px;">播发状态</i-col>
              <i-col span="12">
                <audio
                  :src="backSrc"
                  controls="controls"
                  style="float: right;"
                >Your browser does not support the audio element.</audio>
              </i-col>
            </Row>
          </div>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
import { realTimeAudio } from "@/api/compre";
import AreaSelect from "@/components/commonComponent/areaSelect";
export default {
  components: {
    AreaSelect
  },
  data() {
    return {
      index: "",
      src: "",
      backSrc: "",
      backIndex: "",
      searchForm: {
        areaId: ""
      },
      columns: [
        {
          type: "index"
        },
        {
          title: "系统名称",
          key: "platformName"
        },
        {
          title: "所属地区",
          key: "areaName"
        },
        {
          title: "操作",
          render: (h, params) => {
            let stop = h("Icon", {
              props: {
                type: "md-volume-off"
              },
              style: {
                cursor: "pointer"
              },
              on: {
                click: () => {
                  console.log(params.row);
                  this.src = params.row.url;
                  this.index = params.index;
                }
              }
            });
            let play = h("Icon", {
              props: {
                type: "md-volume-up"
              },
              style: {
                cursor: "pointer"
              },
              on: {
                click: () => {
                  this.index = "";
                }
              }
            });
            return this.index === params.index ? [play] : [stop];
          }
        }
      ],
      tableData: [],
      backColumns: [
        {
          type: "index"
        },
        {
          title: "系统名称",
          key: "platformName"
        },
        {
          title: "所属地区",
          key: "areaName"
        },
        {
          title: "操作",
          render: (h, params) => {
            let stop = h("Icon", {
              props: {
                type: "md-volume-off"
              },
              style: {
                cursor: "pointer"
              },
              on: {
                click: () => {
                  console.log(params.row);
                  this.backSrc = params.row.url;
                  this.backIndex = params.index;
                }
              }
            });
            let play = h("Icon", {
              props: {
                type: "md-volume-up"
              },
              style: {
                cursor: "pointer"
              },
              on: {
                click: () => {
                  this.backIndex = "";
                }
              }
            });
            return this.backIndex === params.index ? [play] : [stop];
          }
        }
      ],
      backData: []
    };
  },
  methods: {
    getData() {
      realTimeAudio(this.searchForm).then(res => {
        console.log(res);
        this.tableData = res.data.realTimeList;
        this.backData = res.data.backList;
      });
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style scoped>
.title {
  padding: 15px;
  font-size: 20px;
  font-weight: 600;
}
</style>