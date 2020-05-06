<template>
  <div>
    <div>
      <Row>
        <i-col span="6">
          <Input v-model="searchForm.keyword" style="width: 250px;" placeholder="根据平台名称/地址搜索"></Input>
        </i-col>
        <i-col span="12">
          <AreaSelect range="[5,4]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col span="6">
          <div style="float: right;">
            <Button type="primary" @click="addDev">新增平台</Button>
            <Button icon="md-cloud-upload" @click="exportData">导出</Button>
            <UploadFile :uploadFunc="platformImport" @success="getData()" />
          </div>
        </i-col>
      </Row>
    </div>
    <div class="table-container">
      <Table
        border
        stripe
        :columns="columns"
        :data="data"
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
      :title="modalType == 'add' ? '新增平台': '编辑平台'"
      @on-ok="saveDevice"
      @on-cancel="resetForm"
      width="800px"
    >
      <Form ref="resourceForm" :model="addForm" label-position="right" :label-width="140">
        <Row>
          <i-col span="12">
            <FormItem label="平台名称：" prop="platformName">
              <Input v-model="addForm.platformName"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="所属区域：">
              <AreaTreeSelect
                :value="addForm.orgCodeArray"
                @change="addForm.gbCode = $event.gbCode; addForm.orgCode = $event.id; addForm.orgCodeArray = $event.arr"
              />
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="IP地址：" prop="ipAddress">
              <Input v-model="addForm.ipAddress"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="端口号：" prop="port">
              <Input v-model="addForm.port"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="接口地址：" prop="interfaceAddress">
              <Input v-model="addForm.interfaceAddress"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="产商：" prop="manufacturer">
              <Input v-model="addForm.manufacturer"></Input>
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
            <FormItem label="地区编码：">
              <Input v-model="addForm.gbCode" readonly></Input>
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
            <FormItem label="资源类型顺序码：">
              <Input v-model="addForm.typeOrderId"></Input>
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
            <FormItem label="资源子类型顺序码：">
              <Input v-model="addForm.childOrderId"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="资源编码：" prop="resourceCode">
              <!-- <Input v-model="addForm.resourceCode" readonly></Input> -->
              {{`${addForm.levelId}${addForm.gbCode}${addForm.typeId}${addForm.typeOrderId}${addForm.childId}${addForm.childOrderId}`}}
            </FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  queryPlatformSysList,
  platformExport,
  savePlatformInfoSys,
  getPlatformSysById,
  delPlatformSysById,
  platformImport
} from "@/api/device";
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
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "平台名称",
          align: "center",
          key: "platformName"
        },
        {
          title: "IP地址",
          align: "center",
          key: "ipAddress"
        },
        {
          title: "端口",
          align: "center",
          key: "port"
        },
        {
          title: "IP地址",
          align: "center",
          key: "ipAddress"
        },
        {
          title: "接口地址",
          align: "center",
          key: "interfaceAddress",
          width: 240
        },
        {
          title: "厂商",
          align: "center",
          key: "manufacturer"
        },
        {
          title: "资源编码",
          align: "center",
          key: "resourceCode",
          width: 240
        },
        {
          title: "创建时间",
          align: "center",
          key: "createTime",
          width: 120
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
                    this.deleteData(params.row.id);
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
                    this.getInfo(params.row.id);
                  }
                }
              },
              "编辑"
            );
            return [edit, del];
          }
        }
      ],
      data: [],
      ruleCustom: {
        platformName: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ],
        ipAddress: [
          { required: true, message: "请输入IP地址", trigger: "blur" }
        ],
        port: [{ required: true, message: "请输入端口号", trigger: "blur" }],
        interfaceAddress: [
          { required: true, message: "请输入接口地址", trigger: "blur" }
        ],
        manufacturer: [
          { required: true, message: "请输入厂商", trigger: "blur" }
        ],
        status: [
          {
            required: true,
            message: "请输入平台状态",
            trigger: "change"
          }
        ],
        resourceCode: [
          { required: true, message: "请输入资源编码", trigger: "blur" }
        ],
        createTime: [
          {
            required: true,
            type: "date",
            message: "请输入创建时间",
            trigger: "change"
          }
        ]
      },
      ruleCustom1: {
        platformName1: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ],
        ipAddress1: [
          { required: true, message: "请输入IP地址", trigger: "blur" }
        ],
        port1: [{ required: true, message: "请输入端口号", trigger: "blur" }],
        interfaceAddress1: [
          { required: true, message: "请输入接口地址", trigger: "blur" }
        ],
        manufacturer1: [
          { required: true, message: "请输入厂商", trigger: "blur" }
        ],
        status1: [
          {
            required: true,
            message: "请输入平台状态",
            trigger: "change"
          }
        ],
        resourceCode1: [
          { required: true, message: "请输入资源编码", trigger: "blur" }
        ],
        createTime1: [
          {
            required: true,
            type: "date",
            message: "请输入创建时间",
            trigger: "change"
          }
        ]
      },

      //新
      modalType: "add",
      showAdd: false,
      total: 0,
      searchForm: {
        areaId: "",
        keyword: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      addForm: {
        areaId: "",
        areaStruct: "",
        contactNumber: "",
        contacts: "",
        createTime: "",
        id: "",
        interfaceAddress: "",
        ipAddress: "",
        latitude: "",
        longitude: "",
        manufacturer: "",
        orgCode: "",
        platformFlag: "",
        platformName: "",
        platformType: "",
        port: "",
        resourceCode: "",
        rptTime: "",
        status: "",

        levelId: "",
        gbCode: "",
        typeId: "",
        typeOrderId: "",
        childId: "",
        childOrderId: "",
        orgCodeArray: []
      },
      ids: []
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
    ...mapActions(["setResourceId", "setResourceType", "setResourceChildType"]),
    // getSysList() {
    //   let params = {
    //     pageNum: this.page,
    //     pageSize: this.size,
    //     keyword: this.keyword,
    //     areaId: this.searchId
    //   };
    //   this.$axios({
    //     method: "get",
    //     url: "./platform/queryPlatformSysList?" + qs.stringify(params)
    //   }).then(res => {
    //     this.total = res.data.data.total;
    //     this.data = res.data.data.list;
    //   });
    // },
    // getBeginSelectList() {
    //   this.$axios({
    //     method: "get",
    //     url: "./area/getAreasByParentId"
    //   }).then(res => {
    //     if (res.data.code == 200) {
    //       this.provinceList = res.data.data;
    //     } else {
    //       this.$Message.error(res.data.msg);
    //     }
    //   });
    // },
    //搜索函数
    // search() {
    //   this.pageNum = 1;
    //   this.getSysList();
    // },
    //page改变触发函数
    // pageChange(page) {
    //   this.page = page;
    //   if (this.keyword == "") {
    //     this.getdepList();
    //   } else {
    //     this.search();
    //   }
    // },
    //size改变触发函数
    // pageSizeChange(size) {
    //   this.size = size;
    //   if (this.keyword == "") {
    //     this.getdepList();
    //   } else {
    //     this.search();
    //   }
    // },
    // onSelect(selections) {},
    //省级下拉框值变化函数
    // provinceChange() {
    //   this.searchId = this.provinceId;
    //   let params = { id: this.provinceId };
    //   this.$axios({
    //     method: "get",
    //     url: "./area/getAreasByParentId?" + qs.stringify(params)
    //   }).then(res => {
    //     console.log("我是市级数据");
    //     console.log(res.data);
    //     this.cityList = res.data.data;
    //   });
    // },
    //市级下拉框值变化函数
    // cityChange() {},
    //新增平台
    // addPlat(name) {
    //   this.$refs[name].validate(valid => {
    //     if (valid) {
    //       this.$axios({
    //         method: "post",
    //         url: "./platform/savePlatformInfoSys",
    //         data: this.formCustom
    //       }).then(res => {
    //         if (res.data.code == 200) {
    //           this.$Message.success(res.data.msg);
    //           this.$refs[name].resetFields();
    //           this.modal = false;
    //           this.getSysList();
    //         } else {
    //           this.$Message.error(res.data.msg);
    //         }
    //       });
    //     } else {
    //       this.$Message.error("请输入正确格式");
    //     }
    //   });
    // },
    // 编辑
    /*edit(index) {
      this.modal1 = true;
      this.formCustom1.platformName = this.data[index].platformName;
      this.formCustom1.ipAddress = this.data[index].ipAddress;
      this.formCustom1.port = this.data[index].port;
      this.formCustom1.interfaceAddress = this.data[index].interfaceAddress;
      this.formCustom1.manufacturer = this.data[index].manufacturer;
      this.formCustom1.status = ""+this.data[index].status;
      this.formCustom1.resourceCode = this.data[index].resourceCode;
      this.formCustom1.id = this.data[index].id;
      this.formCustom1.createTime = this.data[index].createTime;
      console.log(this.formCustom1.status);
    },*/
    // editPlat() {},
    //删除一个
    // remove(id) {
    //   this.platId.push(id);
    //   this.$Modal.confirm({
    //     title: "确认操作",
    //     content: "<p>你确认删除该平台吗?</p>",
    //     onOk: () => {
    //       this.$axios({
    //         url: `./platform/delPlatformSysById/` + this.ids,
    //         method: "delete"
    //         // data: { ids: this.ids }
    //       }).then(res => {
    //         if (res.data.code == 200) {
    //           this.$Message.success(res.data.msg);
    //           this.getSysList();
    //           this.ids = [];
    //         } else {
    //           this.$Message.error(res.data.msg);
    //         }
    //       });
    //     },
    //     onCancel: () => {
    //       this.ids = [];
    //       this.$Message.info("取消删除");
    //     }
    //   });
    // },
    //表格选中变化函数
    // onSelect(selections) {
    //   var platIds = [];
    //   selections.forEach(el => {
    //     platIds.push(el.id);
    //   });
    //   // for (let i = 0; i < selections.length; i++) {
    //   //   ids.push(selections[i].uuid);
    //   // }
    //   this.platIds = platIds;
    // },
    //删除多个
    // validatePlat(name) {
    //   this.$refs[name].resetFields();
    // },
    // removeMoreDep(platIds) {
    //   if (this.platIds.length == 0) {
    //     this.$Message.error("请选择所要删除的部门");
    //   } else {
    //     this.$Modal.confirm({
    //       title: "确认操作",
    //       content: "<p>你确认删除所选部门吗?</p>",
    //       onOk: () => {
    //         this.$axios({
    //           url: `./department/delDepartmentById/` + this.platIds,
    //           method: "delete"
    //           // data: { ids: this.ids }
    //         }).then(res => {
    //           if (res.data.code == 200) {
    //             this.$Message.success(res.data.msg);
    //             this.getdepList();
    //             this.platIds = [];
    //           } else {
    //             this.$Message.error(res.data.msg);
    //           }
    //         });
    //       },
    //       onCancel: () => {
    //         this.platIds = [];
    //         this.$Message.info("取消删除");
    //       }
    //     });
    //   }
    // },
    // pageChange(page) {
    //   this.page = page;
    //   if (this.keyword == "") {
    //     this.getSysList();
    //   } else {
    //     this.search();
    //   }
    // },
    // pageSizeChange(size) {
    //   this.size = size;
    //   if (this.keyword == "") {
    //     this.getSysList();
    //   } else {
    //     this.search();
    //   }
    // },

    //新
    platformImport,
    getData() {
      queryPlatformSysList(
        Object.assign(this.searchForm, this.searchPage)
      ).then(res => {
        this.total = res.data.data.total;
        this.data = res.data.data.list;
      });
    },
    selectData(sel) {
      this.ids = sel.map(v => v.id);
    },
    exportData() {
      if (this.ids.length == 0) {
        this.$Message.warning("请先选中要导出的数据");
      } else {
        platformExport(`ids=${this.ids}`);
      }
    },
    saveDevice() {
      let addForm = JSON.parse(JSON.stringify(this.addForm));
      addForm.resourceCode = `${addForm.levelId}${addForm.gbCode}${addForm.typeId}${addForm.typeOrderId}${addForm.childId}${addForm.childOrderId}`;
      addForm.orgCodeArray = JSON.stringify(addForm.orgCodeArray);
      savePlatformInfoSys(addForm).then(res => {
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg);
          this.$refs["resourceForm"].resetFields();
        }
        this.getData();
      });
    },
    resetForm() {
      this.$refs["resourceForm"].resetFields();
    },
    addDev() {
      this.modalType = "add";
      this.showAdd = true;
      this.addForm = {
        areaId: "",
        areaStruct: "",
        contactNumber: "",
        contacts: "",
        createTime: "",
        id: "",
        interfaceAddress: "",
        ipAddress: "",
        latitude: "",
        longitude: "",
        manufacturer: "",
        orgCode: "",
        platformFlag: "",
        platformName: "",
        platformType: "",
        port: "",
        resourceCode: "",
        rptTime: "",
        status: "",

        gbCode: "",
        levelId: "",
        typeId: "",
        typeOrderId: "",
        childId: "",
        childOrderId: "",
        orgCodeArray: []
      };
    },
    getInfo(id) {
      getPlatformSysById(id).then(res => {
        let { resourceCode } = res.data.data;
        this.addForm = res.data.data;
        this.addForm.levelId = Number(resourceCode.substring(0, 1));
        this.addForm.gbCode = Number(resourceCode.substring(1, 13));
        this.addForm.typeId = resourceCode.substring(13, 17);
        this.addForm.typeOrderId = resourceCode.substring(17, 19);
        this.addForm.childId = resourceCode.substring(19, 21);
        this.addForm.childOrderId = resourceCode.substring(21);
        this.addForm.orgCodeArray = JSON.parse(this.addForm.orgCodeArray);
      });
    },
    deleteData(id) {
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除吗?</p>",
        onOk: () => {
          delPlatformSysById(id).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.getData();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        }
      });
    }
  },

  mounted() {
    //this.getSysList();
    //this.getBeginSelectList();
    this.getData();
    this.setResourceId();
    this.setResourceType();
    this.setResourceChildType();
  }
};
</script>

<style lang="scss">
//@import "@/scss/mixins.scss";
//@import "@/scss/common.scss";
</style>