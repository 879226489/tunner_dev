<template>
  <div>
    <div style="margin-bottom: 15px;">
      <Row>
        <i-col span="6">
          <Input v-model="searchForm.keyword" style="width: 250px;" placeholder="根据设备名搜索"></Input>
        </i-col>
        <i-col span="12">
          <AreaSelect range="[5,4]" col="8" @change="searchForm.areaId = $event.id" />
        </i-col>
        <i-col span="6">
          <div style="float: right;">
            <Button type="primary" @click="addDev">新增设备</Button>
            <Button icon="md-cloud-upload" @click="exportData">导出</Button>
            <UploadFile :uploadFunc="adapterImport" @success="getData()" />
          </div>
        </i-col>
      </Row>
    </div>
    <div class="table">
      <Table border :columns="columns12" :data="tableData" @on-selection-change="selectData">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
        <template slot-scope="{ row, index }" slot="action">
          <Button size="small" style="margin-right: 5px" @click="edit(row.id)">编辑</Button>
          <Button type="error" size="small" @click="remove(row.id)">删除</Button>
        </template>
      </Table>
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
      :title="modalType == 'add' ? '添加终端设备': '编辑终端设备'"
      @on-ok="saveDevice"
      @on-cancel="resetForm"
      width="800px"
    >
      <Form ref="adapterForm" :model="addForm" label-position="right" :label-width="140">
        <Row>
          <i-col span="12">
            <FormItem label="设备名称：" prop="ebrName">
              <Input v-model="addForm.ebrName"></Input>
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="IP地址：" prop="ipAddress">
              <Input v-model="addForm.ipAddress"></Input>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="端口号">
              <Input v-model="addForm.port" />
            </FormItem>
          </i-col>
          <i-col span="12">
            <FormItem label="接口地址">
              <Input v-model="addForm.interfaceAddress" />
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem label="所属区域">
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
            <FormItem label="应急播发启用：" prop="isEnable">
              <i-switch v-model="addForm.isEnable" size="large">
                <span slot="open">启用</span>
                <span slot="close">停用</span>
              </i-switch>
            </FormItem>
          </i-col>
        </Row>
        <Row>
          <i-col span="12">
            <FormItem
              label="资源编码："
            >{{`${addForm.levelId}${addForm.gbCode}${addForm.typeId}${addForm.typeOrderId}${addForm.childId}${addForm.childOrderId}`}}</FormItem>
          </i-col>
        </Row>
      </Form>
    </Modal>
  </div>
</template>

<script>
import {
  deviceList,
  adapterExport,
  saveAdapter,
  delAdapterById,
  getAdapterById,
  adapterImport
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
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      searchForm: {
        flag: 0,
        areaId: "",
        keyword: "",
        type: ""
      },
      addForm: {
        ebrName: "",
        ebrId: "",
        ipAddress: "",
        isEnable: true,
        orgCode: "",
        interfaceAddress: "",
        port: "",

        levelId: "",
        gbCode: "",
        typeId: "",
        typeOrderId: "",
        childId: "",
        childOrderId: "",
        orgCodeArray: []
      },
      modalType: "add",
      showAdd: false,
      total: 0,
      columns12: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          type: "index",
          title: "序号",
          slot: "index",
          align: "center"
        },
        {
          title: "设备名称",
          key: "ebrName",
          align: "center"
        },
        {
          title: "所属村村响系统",
          key: "platformName",
          align: "center"
        },
        {
          title: "资源编码 ",
          key: "ebrId",
          align: "center"
        },
        {
          title: "IP地址",
          key: "ipAddress",
          align: "center"
        },
        {
          title: "应急播发启用",
          key: "isEnable",
          align: "center",
          render: (h, params) => {
            let text = params.row.isEnable ? "启用" : "停用";
            return h("div", text);
          }
        },
        {
          title: " 故障展示",
          key: "faultReason",
          align: "center"
        },
        {
          title: " 操作",
          slot: "action",
          width: 160,
          align: "center"
        }
      ],
      tableData: [],
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
    adapterImport,
    getData() {
      deviceList(Object.assign(this.searchForm, this.searchPage)).then(res => {
        this.tableData = res.data.data.list;
        this.total = res.data.data.total;
      });
    },
    selectData(sel) {
      this.ids = sel.map(v => v.id);
    },
    exportData() {
      if (this.ids.length == 0) {
        this.$Message.warning("请先选中要导出的数据");
      } else {
        adapterExport(`ids=${this.ids}`);
      }
    },
    addDev() {
      this.modalType = "add";
      (this.addForm = {
        ebrName: "",
        ebrId: "",
        ipAddress: "",
        isEnable: true,
        orgCode: "",
        interfaceAddress: "",
        port: "",
        levelId: "",
        gbCode: "",
        typeId: "",
        typeOrderId: "",
        childId: "",
        childOrderId: "",
        orgCodeArray: []
      }),
        (this.showAdd = true);
    },
    edit(id) {
      this.modalType = "edit";
      this.showAdd = true;
      getAdapterById(id).then(res => {
        let { ebrId } = res.data.data;
        this.addForm = res.data.data;

        this.addForm.levelId = Number(ebrId.substring(0, 1));
        this.addForm.gbCode = Number(ebrId.substring(1, 13));
        this.addForm.typeId = ebrId.substring(13, 17);
        this.addForm.typeOrderId = ebrId.substring(17, 19);
        this.addForm.childId = ebrId.substring(19, 21);
        this.addForm.childOrderId = ebrId.substring(21);
        this.addForm.orgCodeArray = JSON.parse(this.addForm.orgCodeArray);
      });
    },
    saveDevice() {
      let addForm = JSON.parse(JSON.stringify(this.addForm));
      addForm.ebrId = `${addForm.levelId}${addForm.gbCode}${addForm.typeId}${addForm.typeOrderId}${addForm.childId}${addForm.childOrderId}`;
      addForm.orgCodeArray = JSON.stringify(addForm.orgCodeArray);
      saveAdapter(addForm).then(res => {
        if (res.data.code == 200) {
          this.$Message.success(res.data.msg);
          this.$refs["adapterForm"].resetFields();
        }
        this.getData();
      });
    },
    resetForm() {
      this.$refs["adapterForm"].resetFields();
    },
    remove(id) {
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除吗?</p>",
        onOk: () => {
          delAdapterById(id).then(res => {
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
    this.getData();
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
</style> scoped>

