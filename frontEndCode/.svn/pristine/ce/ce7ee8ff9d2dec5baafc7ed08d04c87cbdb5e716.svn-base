<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">信息接入</h4>
    </div>
    <div class="filter-container">
      <div class="select-container">
        <Button icon="ios-add-circle" @click="showAdd">新建接口</Button>
      </div>
      <div class="function-container">
        <Input
          search
          enter-button
          v-model="keyword"
          @on-search="search"
          placeholder="请输入接口名称或地区查询..."
        />
      </div>
    </div>
    <div class="table-container">
      <Table border stripe :columns="columns" :data="data" align="center"></Table>
      <Page
        style="text-align:center;margin-top:20px;"
        :total="total"
        size="small"
        :page-size="size"
        :page-size-opts="[10,15,20]"
        show-elevator
        show-sizer
        show-total
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
    <!-- 新增接口 -->
    <Modal
      title="新增接口"
      footer-hide
      v-model="modal"
      class-name="vertical-center-modal"
      @on-visible-change="validateInt('formCustom')"
    >
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
        <FormItem label="接口名称" prop="interfaceName">
          <Input type="text" v-model="formCustom.interfaceName"></Input>
        </FormItem>
        <FormItem label="接口类型" prop="interfaceType">
          <Select v-model="formCustom.interfaceType" placeholder="请选择接口类型">
            <Option :value="0">对接上级</Option>
            <Option :value="1">对接下级</Option>
          </Select>
        </FormItem>
        <FormItem label="服务端口" prop="serverPort">
          <Input type="text" v-model="formCustom.serverPort"></Input>
        </FormItem>
        <FormItem label="接入端口" prop="accessPort">
          <Input type="text" v-model="formCustom.accessPort"></Input>
        </FormItem>
        <FormItem label="协议名" prop="protocol">
          <Select v-model="formCustom.protocol" placeholder="请选择协议类型">
            <Option value="1">HTTP</Option>
            <Option value="2">WebService</Option>
            <Option value="3">TCP</Option>
          </Select>
        </FormItem>
        <FormItem label="证书" prop="certificate">
          <Select v-model="formCustom.certificate" placeholder="请选择证书">
            <Option value="证书1">证书1</Option>
            <Option value="证书2">证书2</Option>
            <Option value="证书3">证书3</Option>
          </Select>
        </FormItem>
        <FormItem label="所属地区" prop="areaId">
          <Input type="text" v-model="formCustom.areaId"></Input>
        </FormItem>
        <FormItem style="margin-left:-60px;text-align:center;">
          <Button type="primary" @click="addInt('formCustom')">确认</Button>
          <Button @click="validateInt('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Modal>
    <Modal title="接口详情" v-model="modal1" class-name="vertical-center-modal">
      <Form ref="formCustom1" :model="formCustom" :label-width="100" disabled>
        <FormItem label="接口名称" prop="interfaceName">
          <Input type="text" v-model="formCustom.interfaceName"></Input>
        </FormItem>
        <FormItem label="接口类型" prop="interfaceType">
          <Input type="text" v-model="formCustom.interfaceType"></Input>
        </FormItem>
        <FormItem label="服务端口" prop="serverPort">
          <Input type="text" v-model="formCustom.serverPort"></Input>
        </FormItem>
        <FormItem label="接入端口" prop="accessPort">
          <Input type="text" v-model="formCustom.accessPort"></Input>
        </FormItem>
        <FormItem label="协议名" prop="protocol">
          <Select v-model="formCustom.protocol" placeholder="请选择协议类型">
            <Option value="1">正在播放</Option>
            <Option value="2">故障</Option>
            <Option value="3">停播</Option>
          </Select>
        </FormItem>
        <FormItem label="证书" prop="protocol">
          <Select v-model="formCustom.protocol" placeholder="请选择证书">
            <Option value="1">正在播放</Option>
            <Option value="2">故障</Option>
            <Option value="3">停播</Option>
          </Select>
        </FormItem>
        <FormItem label="所属地区" prop="area">
          <Input type="text" v-model="formCustom.area"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
import {
  queryInforAccessList,
  saveInforAccess,
  getInforAccessById,
  delInforAccessById
} from "@/api/infoAccess";
export default {
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
          title: "接口名称",
          align: "center",
          key: "interfaceName"
        },
        {
          title: "接口类型",
          align: "center",
          key: "interfaceType"
        },
        {
          title: "服务端口",
          align: "center",
          key: "serverPort"
        },
        {
          title: "接入端口",
          align: "center",
          key: "accessPort"
        },
        {
          title: "协议",
          align: "center",
          key: "protocol"
        },
        {
          title: "所属地区",
          align: "center",
          key: "area"
        },
        {
          title: "创建时间",
          width: 120,
          align: "center",
          key: "editTime"
        },
        {
          title: "消息数量",
          align: "center",
          key: "msgCount"
        },
        {
          title: "操作",
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  domProps: {
                    title: "查看详情"
                  },
                  on: {
                    click: () => {
                      this.modal = true;
                      this.showDetail(params.row.id);
                    }
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "md-paper",
                      size: "24",
                      color: "#6283AE"
                    }
                  })
                ]
              ),
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginLeft: "10px"
                  },
                  domProps: {
                    title: "删除"
                  },
                  on: {
                    click: () => {
                      this.removeAccess(params.row.id);
                    }
                  }
                },
                [
                  h("Icon", {
                    props: {
                      type: "md-close",
                      size: "24",
                      color: "#ed4014"
                    }
                  })
                ]
              )
            ]);
          }
        }
      ],
      data: [],
      keyword: "",
      total: 0,
      size: 10,
      page: 1,
      modal: false,
      modal1: false,
      formCustom: {
        interfaceName: "",
        interfaceType: "",
        serverPort: "",
        accessPort: "",
        protocol: "",
        certificate: "",
        areaId: ""
      },
      ruleCustom: {
        interfaceName: [
          { required: true, message: "请输入接口名称", trigger: "blur" }
        ],
        interfaceType: [
          {
            type: "number",
            required: true,
            message: "请选择接口类型",
            trigger: "change"
          }
        ],
        serverPort: [
          { required: true, message: "请输入服务端口", trigger: "blur" }
        ],
        accessPort: [
          { required: true, message: "请输入接入端口", trigger: "blur" }
        ],
        protocol: [
          { required: true, message: "请选择协议名", trigger: "change" }
        ],
        certificate: [
          { required: true, message: "请选择证书", trigger: "change" }
        ],
        areaId: [{ required: true, message: "请选择所属地区", trigger: "blur" }]
      }
    };
  },
  methods: {
    getAccessList() {
      let data = { page: this.page, size: this.size };
      queryInforAccessList(data).then(res => {
        if (res.data.code == 200) {
          this.data = res.data.data.list;
          console.log(res);
          this.total = res.data.data.total;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    search() {
      this.pageNum = 1;
      let data = { page: this.page, size: this.size, keyword: this.keyword };
      queryInforAccessList(data).then(res => {
        if (res.data.code == 200) {
          this.data = res.data.data.list;
          console.log(res);
          this.total = res.data.data.total;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    pageChange(page) {
      this.page = page;
      if (this.keyword == "") {
        this.getAccessList();
      } else {
        this.search();
      }
    },
    pageSizeChange(size) {
      this.size = size;
      if (this.keyword == "") {
        this.getAccessList();
      } else {
        this.search();
      }
    },
    addInt(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          saveInforAccess(this.formCustom).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.$refs[name].resetFields();
              this.modal = false;
              this.getAccessList();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
          // this.$axios({
          //   method: "post",
          //   url: "./department/saveDepartment",
          //   data: this.formCustom
          // }).then(res => {});
        } else {
          this.$Message.error("请输入正确格式");
        }
      });
    },
    validateInt(name) {
      this.$refs[name].resetFields();
    },
    showDetail(id) {
      getInforAccessById(id).then(res => {
        this.formCustom = res.data.data;
      });
    },
    removeAccess(id) {
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除该部门吗?</p>",
        onOk: () => {
          delInforAccessById(id).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.getAccessList();
            }
          });
        },
        onCancel: () => {
          this.ids = [];
          this.$Message.info("取消删除");
        }
      });
    },
    showAdd() {
      this.modal = true;
      this.formCustom = {
        interfaceName: "",
        interfaceType: "",
        serverPort: "",
        accessPort: "",
        protocol: "",
        certificate: "",
        areaId: ""
      };
    }
  },
  created() {
    this.getAccessList();
  }
};
</script>
<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
</style>