<template>
  <div>
    <div>
      <Row>
        <i-col span="6">
          <Input placeholder="请输入终端名称" v-model="searchForm.keyword" style="width: 200px" />
        </i-col>
        <i-col span="6">
          <Select clearable v-model="searchForm.type" style="width:200px">
            <Option v-for="item in srvTypeList" :value="item.id" :key="item.id">{{item.typeName}}</Option>
          </Select>
        </i-col>
        <i-col span="12">
          <AreaSelect @change="searchForm.areaId = $event.id" range="[5,4,3]" col="8" />
        </i-col>
      </Row>
    </div>
    <div class="table">
      <div style="width: 100%;height: 40px;">
        <span style="float: right;">
          <Button type="primary" @click="addDev">新增终端</Button>
          <Button icon="md-cloud-upload" @click="exportData" style="margin-left:15px;">导出</Button>
          <UploadFile :uploadFunc="srvImport" @success="getData()" />
        </span>
      </div>
      <Table
        border
        stripe
        :columns="columns"
        :data="tablelist"
        align="center"
        @on-selection-change="selectData"
      ></Table>
      <Page
        :total="total"
        show-total
        show-elevator
        show-sizer
        style="margin-top: 10px; text-align: center;"
        @on-change="searchPage.pageNum = $event"
        @on-page-size-change="searchPage.pageSize = $event"
      />
    </div>
    <Modal
      v-model="showAdd"
      :title="modalType == 'add' ? '新增设备': '编辑设备'"
      @on-ok="saveDevice"
      @on-cancel="resetForm"
      width="800px"
    >
      <Form ref="devForm" :model="addForm" label-position="right" :label-width="140">
        <Row>
          <i-col span="12">
            <FormItem label="终端名称：" prop="ebrName">
              <Input v-model="addForm.ebrName"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="安装位置：" prop="detailAddr">
              <Input v-model="addForm.detailAddr"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="物理码：" prop="physicalCode">
              <Input v-model="addForm.physicalCode"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="逻辑码：" prop="logicCode">
              <Input v-model="addForm.logicCode"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="覆盖半径：" prop="coverageRadius">
              <Input v-model="addForm.coverageRadius"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="覆盖人口：" prop="population">
              <Input v-model="addForm.population"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="所属区域：">
              <AreaTreeSelect
                :value="addForm.orgCodeArray"
                @change="addForm.gbCode = $event.gbCode; addForm.orgCode = $event.id; addForm.orgCodeArray = $event.arr"
              />
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="地区编码：">
              <Input v-model="addForm.gbCode" readonly></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="资源级别识别码：" prop="levelId">
              <Select clearable v-model="addForm.levelId">
                <Option v-for="item in resourceId" :value="item.id" :key="item.id">{{ item.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="资源类型顺序码：" prop="typeOrderId">
              <Input v-model="addForm.typeOrderId"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="资源类型码：" prop="typeId">
              <Select clearable v-model="addForm.typeId">
                <Option
                  v-for="item in resourceType"
                  :value="item.code"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="资源子类型顺序码：">
              <Input v-model="addForm.childOrderId"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="资源子类型码：" prop="childId">
              <Select clearable v-model="addForm.childId">
                <Option
                  v-for="item in resourceChildType"
                  :value="item.code"
                  :key="item.id"
                >{{ item.name }}</Option>
              </Select>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="终端类型：" prop="srvTypeId">
              <Select clearable v-model="addForm.srvTypeId">
                <Option
                  v-for="item in srvTypeList"
                  :value="item.id"
                  :key="item.id"
                >{{item.typeName}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem
              label="资源编码："
              prop="ebrId"
            >{{`${addForm.levelId}${addForm.gbCode}${addForm.typeId}${addForm.typeOrderId}${addForm.childId}${addForm.childOrderId}`}}</FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="所属村村响系统：" prop="relationEbrId">
              <Select clearable v-model="addForm.relationEbrId">
                <Option
                  v-for="item in villData"
                  :value="item.resourceCode"
                  :key="item.resourceCode"
                >{{item.platformName}}</Option>
              </Select>
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  deviceList,
  srvExport,
  delSrvById,
  saveSrv,
  getSrvById,
  srvImport,
  getVillagePlatform
} from "@/api/device";
import { deviceType } from "@/utils/common";
import AreaSelect from "@/components/commonComponent/areaSelect";
import UploadFile from "@/components/commonComponent/uploadFile";
import AreaTreeSelect from "@/components/commonComponent/areaTreeSelect";
import { mapActions } from "vuex";
export default {
  components: {
    AreaSelect,
    UploadFile,
    AreaTreeSelect
  },
  data() {
    return {
      tablelist: [],
      modalType: "add",
      showAdd: false,
      deviceType,
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      searchForm: {
        flag: 1,
        areaId: "",
        keyword: "",
        type: ""
      },
      addForm: {
        ebrName: "",
        ebrId: "",
        detailAddr: "",
        physicalCode: "",
        logicCode: "",
        coverageRadius: "",
        population: "",
        srvTypeId: "",
        relationEbrId: "",

        orgCode: "",
        levelId: "",
        gbCode: "",
        typeId: "",
        typeOrderId: "",
        childId: "",
        childOrderId: "",
        orgCodeArray: []
      },
      total: 0,
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "序号",
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "终端名称 ",
          key: "ebrName",
          align: "center"
        },
        {
          title: "安装位置 ",
          key: "detailAddr",

          align: "center"
        },
        {
          title: "经度  ",
          key: "longitude",

          align: "center"
        },
        {
          title: "纬度  ",
          key: "latitude",

          align: "center"
        },
        {
          title: "物理码",
          key: "physicalCode",

          align: "center"
        },

        {
          title: "逻辑码",
          key: "logicCode",

          align: "center"
        },
        {
          title: " 覆盖入口 ",
          key: "population",

          align: "center"
        },
        {
          title: " 覆盖半径",
          key: "coverageRadius",

          align: "center"
        },
        {
          title: "操作",
          align: "center",
          width: 130,
          render: (h, params) => {
            let del = h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                style: {
                  marginLeft: "5px"
                },
                on: {
                  click: () => {
                    this.delete(params.row.id);
                  }
                }
              },
              "删除"
            );
            let edit = h(
              "Button",
              {
                props: {
                  size: "small"
                },
                on: {
                  click: () => {
                    this.modalType = "edit";
                    this.showAdd = true;
                    this.getSrvInfo(params.row.id);
                  }
                }
              },
              "编辑"
            );
            return [edit, del];
          }
        }
      ],
      ids: [],
      villData: []
    };
  },
  computed: {
    resourceId() {
      return this.$store.state.device.resourceId;
    },
    resourceType() {
      return this.$store.state.device.resourceType;
    },
    resourceChildType() {
      return this.$store.state.device.resourceChildType;
    },
    srvTypeList() {
      return this.$store.state.device.srvTypeList;
    }
  },
  watch: {
    searchPage: {
      handler() {
        this.getData();
      },
      deep: true
    },
    searchForm: {
      handler() {
        this.searchPage.pageNum = 1;
        this.getData();
      },
      deep: true
    }
  },
  methods: {
    ...mapActions([
      "setResourceId",
      "setResourceType",
      "setResourceChildType",
      "setSrvType"
    ]),
    srvImport,
    getData() {
      deviceList(Object.assign(this.searchForm, this.searchPage)).then(res => {
        this.tablelist = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    delete(id) {
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除吗?</p>",
        onOk: () => {
          delSrvById(id).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.getData();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        }
      });
    },
    addDev() {
      this.modalType = "add";
      this.addForm = {
        ebrName: "",
        ebrId: "",
        detailAddr: "",
        physicalCode: "",
        logicCode: "",
        coverageRadius: "",
        population: "",
        srvTypeId: "",
        relationEbrId: "",

        orgCode: "",
        levelId: "",
        gbCode: "",
        typeId: "",
        typeOrderId: "",
        childId: "",
        childOrderId: "",
        orgCodeArray: []
      };
      this.showAdd = true;
    },
    saveDevice() {
      let addForm = JSON.parse(JSON.stringify(this.addForm));
      addForm.ebrId = `${addForm.levelId}${addForm.gbCode}${addForm.typeId}${addForm.typeOrderId}${addForm.childId}${addForm.childOrderId}`;
      addForm.orgCodeArray = JSON.stringify(addForm.orgCodeArray);
      saveSrv(addForm).then(res => {
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg);
          this.$refs["devForm"].resetFields();
        }
        this.getData();
      });
    },
    resetForm() {
      this.$refs["devForm"].resetFields();
    },
    exportData() {
      if (this.ids.length == 0) {
        this.$Message.warning("请先选中要导出的数据");
      } else {
        srvExport(`ids=${this.ids}`);
      }
    },
    selectData(sel) {
      this.ids = sel.map(v => v.id);
    },
    getSrvInfo(id) {
      getSrvById(id).then(res => {
        let { ebrId } = res.data.data;
        this.addForm = res.data.data;

        this.addForm.levelId = Number(ebrId.substring(0, 1));
        this.addForm.gbCode = Number(ebrId.substring(1, 13));
        this.addForm.typeId = ebrId.substring(13, 17);
        console.log(this.addForm.typeId);
        this.addForm.typeOrderId = ebrId.substring(17, 19);
        this.addForm.childId = ebrId.substring(19, 21);
        this.addForm.childOrderId = ebrId.substring(21);
        this.addForm.orgCodeArray = JSON.parse(this.addForm.orgCodeArray);
      });
    },
    getVillData() {
      getVillagePlatform().then(res => {
        console.log(res.data.data);
        this.villData = res.data.data;
      });
    }
  },
  mounted() {
    this.getData();

    this.getVillData();
    this.setSrvType();
    this.setResourceId();
    this.setResourceType();
    this.setResourceChildType();
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  justify-content: space-around;
}
.table {
  width: 98%;
  margin-left: 1%;
  margin-top: 1%;
}
.anniu {
  display: flex;
  margin-top: 1%;
  justify-content: flex-end;
  margin-bottom: 10px;
}
</style> scoped>

