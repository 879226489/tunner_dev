<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">我的证书</h4>
    </div>
    <div class="filter-container">
      <div class="select-container">
        <Button icon="ios-add-circle" @click="modal1=true;">
          <span style="position:relative;bottom:6px;">安装证书</span>
        </Button>
      </div>
      <div class="function-container">
        <Input
          search
          v-model="keyword"
          enter-button
          placeholder="按证书名证书类型搜索.. ."
          @on-search="search"
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
        :page-size-opts="[5,10,15,20]"
        show-elevator
        show-sizer
        show-total
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange"
      />
    </div>
    <!-- 新增证书 -->
    <Modal
      title="新增平台"
      footer-hide
      v-model="modal1"
      class-name="vertical-center-modal"
      @on-visible-change="cancel('formCustom')"
    >
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="90">
        <FormItem label="证书名" prop="certificateName">
          <Input type="text" v-model="formCustom.certificateName"></Input>
        </FormItem>
        <FormItem label="证书类型" prop="certificateType">
          <Select v-model="formCustom.certificateType" placeholder="请选择证书类型">
            <Option value="0">用户证书</Option>
            <Option value="1">本平台证书</Option>
            <Option value="2">其他平台证书</Option>
            <Option value="3">USB证书</Option>
          </Select>
        </FormItem>
        <FormItem label="上传证书" prop="upload">
          <Upload multiple type="drag" action="http://192.168.4.102:8096/certificate/importCertificate">
            <div style="padding: 20px 0">
              <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
              <p>点击或者拖动文件上传</p>
            </div>
          </Upload>
        </FormItem>
        <FormItem style="margin-left:-60px;text-align:center;">
          <Button type="primary" @click="addCert('formCustom')">确认</Button>
          <Button @click="validateCert('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 查看详情 -->
    <Modal title="证书详情" v-model="modal2" class-name="vertical-center-modal">
      <Form ref="formCustom1" :model="formCustom1" :label-width="100" disabled>
        <FormItem label="证书编号">
          <Input type="text" v-model="formCustom1.certificateNumber"></Input>
        </FormItem>
        <FormItem label="证书名">
          <Input type="text" v-model="formCustom1.certificateName"></Input>
        </FormItem>
        <FormItem label="证书类型">
          <Input type="text" v-model="formCustom1.certificateType"></Input>
        </FormItem>
        <FormItem label="创建时间">
          <Input type="text" v-model="formCustom1.createTime"></Input>
        </FormItem>
        <FormItem label="证书有效期">
          <Input type="text" v-model="formCustom1.validityTime"></Input>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>

<script>
import qs from "qs";
export default {
  data() {
    return {
      columns: [
        {
          type: "index",
          width: 60,
          align: "center"
        },
        {
          title: "证书编号",
          align: "center",
          key: "certificateNumber"
        },
        {
          title: "证书名",
          align: "center",
          key: "certificateName"
        },
        {
          title: "证书类型",
          align: "center",
          key: "certificateType"
        },
        {
          title: "上传日期",
          align: "center",
          key: "createTime"
        },
        {
          title: "证书有效期",
          align: "center",
          key: "validityTime"
        },
        {
          title: "是否启用",
          align: "center",
          render: (h, params) => {
            let _this = this;
            return h("div", [
              // <Switch true-color="#13ce66" false-color="#ff4949" />
              h(
                "i-switch",
                {
                  props: {
                    //这里可以设置它的属性
                    size: "large",
                    value: params.row.isEnable == 1 ? true : false, //设置它的值比如：true或false
                    trueColor: "#13ce66",
                    falseColor: "#aaa"
                    //   disabled: !params.row.online     // 设置是否可以操作，变灰
                  },
                  scopedSlots: {
                    open: () => h("span", "启用"),
                    close: () => h("span", "禁用")
                  },
                  on: {
                    //操作事件
                    input: function(event) {
                      //这里会起到监听的作用
                      if (event) {
                        params.row.isEnable = true;
                      } else {
                        params.row.isEnable = false;
                      }
                    },
                    "on-change": function() {
                      //值发生了改变调用方法
                      _this.changeStatus(params.row.id, params.row.isEnable); // 方法自定义
                    }
                  }
                }
                // 编辑
              )
            ]);
          }
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
                      this.showDetail(params.index);
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
                      this.removeCert(params.row.id);
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
      formCustom: {
        certificateName: "",
        certificateType: ""
      },
      ruleCustom: {
        certificateName: [
          { required: true, message: "请输入证书名称", trigger: "blur" }
        ],
        certificateType: [
          { required: true, message: "请输入证书类型", trigger: "change" }
        ]
      },
      formCustom1: {
        certificateNumber: "",
        certificateName: "",
        certificateType: "",
        createTime: "",
        validityTime: ""
      },
      total: 0,
      page: 1,
      size: 5,
      keyword: "",
      modal1: false,
      modal2: false
    };
  },
  methods: {
    //获取表格数据
    getCertList() {
      let params = { pageNum: this.page, pageSize: this.size,flag:2 };
      this.$axios({
        method: "get",
        url:
          "./certificate/queryCertificateList?" +
          qs.stringify(params)
      }).then(res => {
        if (res.data.code == 200) {
          this.data = res.data.data.list;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    //搜索
    search() {
      this.page = 1;
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        keyword: this.keyword,
        flag:2
      };
      this.$axios({
        method: "get",
        url:
          "./certificate/queryCertificateList?" +
          qs.stringify(params)
      }).then(res => {
        if (res.data.code == 200) {
          this.data = res.data.data.list;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    //启用状态改变函数
    changeStatus(id, status) {
    //   let params = {status: status };
      this.$axios({
        method: "patch",
        url:
          "./certificate/updateCertifiStatus/" +
          id+"/"+status,
        // data:JSON.stringify(params)
      }).then(res => {
        if(res.data.code == 200){
            this.$Message.success("状态更改成功");
        }else{
            this.$Message.error("res.data.msg");
        }
      });
    },
    //展示详情
    showDetail(index) {
      this.formCustom1.certificateNumber = this.data[index].certificateNumber;
      this.formCustom1.certificateName = this.data[index].certificateName;
      this.formCustom1.certificateType = this.data[index].certificateType;
      this.formCustom1.createTime = this.data[index].createTime;
      this.formCustom1.validityTime = this.data[index].validityTime;
      this.modal2 = true;
    },
    //新增证书
    addCert(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "./department/saveDepartment",
            data: this.formCustom
          }).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.$refs[name].resetFields();
              this.modal1 = false;
              this.getCertList();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        } else {
          this.$Message.error("请输入正确格式");
        }
      });
    },
    validateDep(name) {
      this.$refs[name].resetFields();
    },
    cancel(name) {
      this.$refs[name].resetFields();
    },
    // 删除证书
    removeCert(id) {
      console.log(id);
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除该证书吗?</p>",
        onOk: () => {
          this.$axios({
            url: `./certificate/delCertificate/` + id,
            method: "delete"
            // data: { ids: this.ids }
          }).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.getCertList();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        },
        onCancel: () => {
          this.$Message.info("取消删除");
        }
      });
    },
    //page监听函数
    pageChange(page) {
      this.page = page;
      if (this.keyword == "") {
        this.getCertList();
      } else {
        this.search();
      }
    },
    //size监听函数
    pageSizeChange(size) {
      this.size = size;
      if (this.keyword == "") {
        this.getCertList();
      } else {
        this.search();
      }
    }
  },
  created() {
    this.getCertList();
  }
};
</script>

<style  lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
</style>