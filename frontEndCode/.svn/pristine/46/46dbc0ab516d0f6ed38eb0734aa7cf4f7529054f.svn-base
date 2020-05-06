<template>
  <div>
    <div class="search-table">
      <Row>
        <i-col span="6">
          <Input placeholder="搜索终端类型" v-model="searchForm.keyword"></Input>
        </i-col>
        <i-col span="18">
          <Button
            style="float: right;"
            type="primary"
            @click="type = 'add'; showModal = true; resetForm();"
          >新增类型</Button>
        </i-col>
      </Row>
    </div>
    <div>
      <Table :columns="tableColumns" :data="tableData"></Table>
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
    <Modal v-model="showModal" title="新增终端类型">
      <Form :model="addForm" label-position="right" :label-width="100">
        <FormItem label="终端类型：">
          <Input v-model="addForm.typeName"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="showModal = false">取消</Button>
        <Button type="primary" @click="submitData">确定</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
import {
  querySrvTypeList,
  verifyTypeName,
  saveSrvType,
  delSrvType
} from "@/api/device";
export default {
  name: "terminalType",
  data() {
    return {
      showModal: false,
      type: "add",
      total: 0,
      searchForm: {
        keyword: ""
      },
      searchPage: {
        pageNum: 1,
        pageSize: 10
      },
      tableColumns: [
        {
          title: "终端类型",
          key: "typeName"
        },
        {
          title: "创建时间",
          key: "createTime"
        },
        {
          title: "操作",
          render: (h, params) => {
            let edit = h(
              "Button",
              {
                props: {
                  size: "small"
                },
                on: {
                  click: () => {
                    this.showModal = true;
                    this.type = "edit";
                    this.addForm = JSON.parse(JSON.stringify(params.row));
                  }
                }
              },
              "编辑"
            );
            let del = h(
              "Button",
              {
                props: {
                  type: "error",
                  size: "small"
                },
                style: {
                  marginLeft: "10px"
                },
                on: {
                  click: () => {
                    this.delData(params.row.id);
                  }
                }
              },
              "删除"
            );
            return [edit, del];
          }
        }
      ],
      tableData: [],
      addForm: {
        id: "",
        typeName: "",
        createTime: ""
      }
    };
  },
  watch: {
    searchForm: {
      handler() {
        this.searchPage.pageNum = 1;
        this.getData();
      },
      deep: true
    },
    searchPage: {
      handler() {
        this.getData();
      },
      deep: true
    }
  },
  methods: {
    getData() {
      querySrvTypeList(Object.assign(this.searchForm, this.searchPage)).then(
        res => {
          console.log(res, 25);
          this.tableData = res.data.data.list;
          this.total = res.data.data.total;
        }
      );
    },
    submitData() {
      verifyTypeName(this.addForm).then(res => {
        if (res.data) {
          if (this.type == "add") {
            this.addForm.createTime = new Date().format("yyyy-MM-dd hh:mm:ss");
          }
          saveSrvType(this.addForm).then(res => {
            this.showModal = false;
            this.getData();
          });
        }else {
          this.$Message.error("类型重复,请重新命名");
        }
      });
    },
    delData(id) {
      this.$Modal.confirm({
        title: "确认操作",
        content: "<p>你确认删除吗?</p>",
        onOk: () => {
          delSrvType(id).then(res => {
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
    resetForm() {
      this.addForm = {
        id: "",
        typeName: "",
        createTime: ""
      };
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
</style>