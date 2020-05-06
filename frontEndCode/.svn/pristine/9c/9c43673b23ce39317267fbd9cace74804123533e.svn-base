<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">部门管理</h4>
    </div>
    <!-- <div class="filter-container">
      <div class="select-container">
        <Button icon="ios-add-circle" @click="modal1=true;">
          <span style="position:relative;bottom:6px;">新建部门</span>
        </Button>
        <Button icon="md-remove-circle" @click="removeMoreDep(idsAll)" class="margin">
          <span style="position:relative;bottom:6px;">批量删除</span>
        </Button>
      </div>
      <div class="function-container">
        <Input
          search
          v-model="keyword"
          enter-button
          placeholder="按部门负责人搜索.. ."
          @on-search="search"
        />
      </div>
    </div>-->
    <div style="background: #fff; padding: 15px;">
      <Row>
        <i-col span="6">
          <Input
            v-model="keyword"
            placeholder="按部门负责人搜索.. ."
          />
        </i-col>
        <i-col span="18">
          <Button icon="ios-add-circle" @click="modal1=true;" style="float: right;">新建部门</Button>
        </i-col>
      </Row>
    </div>
    <Table
      border
      stripe
      :columns="columns"
      :data="data"
      align="center"
      @on-selection-change="onSelect"
    ></Table>
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
    <!-- 新增部门 -->
    <Modal
      title="新增部门"
      footer-hide
      v-model="modal1"
      class-name="vertical-center-modal"
      @on-visible-change="cancel('formCustom')"
    >
      <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="70">
        <FormItem label="部门" prop="depName">
          <Input type="text" v-model="formCustom.depName"></Input>
        </FormItem>
        <FormItem label="负责人" prop="depPerson">
          <Input type="text" v-model="formCustom.depPerson"></Input>
        </FormItem>
        <FormItem style="margin-left:-60px;text-align:center;">
          <Button type="primary" @click="addDep('formCustom')">确认</Button>
          <Button @click="validateDep('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Modal>
    <!-- 编辑部门 -->
    <Modal
      title="编辑部门"
      footer-hide
      v-model="modal2"
      class-name="vertical-center-modal"
      @on-visible-change="cancel('formCustom')"
    >
      <Form ref="formCustom1" :model="formCustom1" :rules="ruleCustom1" :label-width="70">
        <FormItem label="部门" prop="depName">
          <Input type="text" v-model="formCustom1.depName"></Input>
        </FormItem>
        <FormItem label="负责人" prop="depPerson">
          <Input type="text" v-model="formCustom1.depPerson"></Input>
        </FormItem>
        <FormItem style="margin-left:-60px;text-align:center;">
          <Button type="primary" @click="editDep('formCustom1')">确认</Button>
          <Button @click="validateDep('formCustom1')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
import qs from "qs";
import { queryDepartList } from "@/api/system";
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
          title: "部门",
          align: "center",
          key: "depName"
        },
        {
          title: "负责人",
          align: "center",
          key: "depPerson"
        },
        // {
        //   title: "操作",
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             size: "small"
        //           },
        //           domProps: {
        //             title: "编辑"
        //           },
        //           on: {
        //             click: () => {
        //               this.edit(params.index);
        //             }
        //           }
        //         },
        //         // 编辑
        //         [
        //           h("Icon", {
        //             props: {
        //               type: "ios-create-outline",
        //               size: "24",
        //               color: "#4db4f0"
        //             },
        //             style: {
        //               marginLeft: "3px"
        //             }
        //           })
        //         ]
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             size: "small"
        //           },
        //           domProps: {
        //             title: "删除"
        //           },
        //           on: {
        //             click: () => {
        //               this.removeDep(params.row.id);
        //             }
        //           }
        //         },
        //         [
        //           h("Icon", {
        //             props: {
        //               type: "md-close",
        //               size: "24",
        //               color: "#ed4014"
        //             }
        //           })
        //         ]
        //       )
        //     ]);
        //   }
        // },
        {
          title: '操作',
          align: 'center',
          render: (h, params) => {
            let del = h('Button',{
              props: {
                type: 'error',
                size: 'small'
              },
              style: {
                marginLeft: '5px'
              },
              on: {
                click: () => {
                  this.removeDep(params.row.id);
                }
              }
            },'删除')
            let edit = h('Button',{
              props: {
                size: 'small'
              },
              on: {
                click: () => {
                  this.edit(params.index);
                }
              }
            }, '编辑')
            return [edit, del]
          }
        }
      ],
      data: [],
      page: 1,
      size: 5,
      total: 0,
      keyword: "",
      modal1: false,
      modal2: false,
      //新增部门
      formCustom: {
        depName: "",
        depPerson: ""
      },
      ruleCustom: {
        depName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        depPerson: [
          { required: true, message: "请输入部门负责人", trigger: "blur" }
        ]
      },
      //编辑部门
      formCustom1: {
        depName: "",
        depPerson: "",
        id: null
      },
      ruleCustom1: {
        depName: [
          { required: true, message: "请输入部门名称", trigger: "blur" }
        ],
        depPerson: [
          { required: true, message: "请输入部门负责人", trigger: "blur" }
        ]
      },
      //是否删除
      ids: [],
      idsAll: []
    };
  },
  watch: {
    keyword() {
      this.search();
    }
  },
  methods: {
    getdepList() {
      let params = {
        pageNum: this.page,
        pageSize: this.size,
        keyword: this.keyword
      };
      queryDepartList(params).then(res => {
        if (res.data.code == 200) {
          this.total = res.data.data.total;
          this.data = res.data.data.list;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
      // this.$axios({
      //   method: "get",
      //   url:
      //     "./department/queryDepartList?" +
      //     qs.stringify(params)
      //   // data:qs.stringify(params)
      // }).then(res => {
      //   if (res.data.code == 200) {
      //     this.total = res.data.data.total;
      //     this.data = res.data.data.list;
      //   } else {
      //     this.$Message.error(res.data.msg);
      //   }
      // });
    },
    search() {
      this.pageNum = 1;
      this.getdepList();
    },
    pageChange(page) {
      this.page = page;
      if (this.keyword == "") {
        this.getdepList();
      } else {
        this.search();
      }
    },
    pageSizeChange(size) {
      this.size = size;
      if (this.keyword == "") {
        this.getdepList();
      } else {
        this.search();
      }
    },
    //新增部门
    addDep(name) {
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
              this.getdepList();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        } else {
          this.$Message.error("请输入正确格式");
        }
      });
    },
    //编辑部门
    edit(index) {
      // this.formCustom1.id = id;
      // this.$axios({
      //   method: "get",
      //   url: "./department/getDepartmentById/" + id
      // }).then(res => {
      //   if (res.data.code == 200) {
      //     this.formCustom1.depName = res.data.data.depName;
      //     this.formCustom1.depPerson = res.data.data.depPerson;
      //     this.modal2 = true;
      //   } else {
      //     this.$Message.error(res.data.msg);
      //   }
      // });
      this.formCustom1.depName = this.data[index].depName;
      this.formCustom1.depPerson = this.data[index].depPerson;
      this.formCustom1.id = this.data[index].id;
      console.log(this.formCustom1);
      this.modal2 = true;
    },
    editDep(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          this.$axios({
            method: "post",
            url: "./department/saveDepartment",
            data: this.formCustom1
          }).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.$refs[name].resetFields();
              this.modal2 = false;
              this.getdepList();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        } else {
          this.$Message.error("请输入正确格式");
        }
      });
    },
    //删除部门
    //表格选中项变化
    onSelect(selections) {
      var idsAll = [];
      selections.forEach(el => {
        idsAll.push(el.id);
      });
      // for (let i = 0; i < selections.length; i++) {
      //   ids.push(selections[i].uuid);
      // }
      this.idsAll = idsAll;
    },
    removeDep(id) {
      this.ids.push(id);
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除该部门吗?</p>",
        onOk: () => {
          this.$axios({
            url: `./department/delDepartmentById/` + this.ids,
            method: "delete"
            // data: { ids: this.ids }
          }).then(res => {
            if (res.data.code == 200) {
              this.$Message.success(res.data.msg);
              this.getdepList();
              this.ids = [];
            } else {
              this.$Message.error(res.data.msg);
            }
          });
        },
        onCancel: () => {
          this.ids = [];
          this.$Message.info("取消删除");
        }
      });
    },
    removeMoreDep(idsAll) {
      if (this.idsAll.length == 0) {
        this.$Message.error("请选择所要删除的部门");
      } else {
        this.$Modal.confirm({
          title: "确认操作",
          content: "<p>你确认删除所选部门吗?</p>",
          onOk: () => {
            this.$axios({
              url: `./department/delDepartmentById/` + this.idsAll,
              method: "delete"
              // data: { ids: this.ids }
            }).then(res => {
              if (res.data.code == 200) {
                this.$Message.success(res.data.msg);
                this.getdepList();
                this.idsAll = [];
              } else {
                this.$Message.error(res.data.msg);
              }
            });
          },
          onCancel: () => {
            this.$Message.info("已取消删除");
          }
        });
      }
    },
    validateDep(name) {
      this.$refs[name].resetFields();
    },
    cancel(name) {
      this.$refs[name].resetFields();
    }
  },
  created() {
    this.getdepList();
  }
};
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
</style>