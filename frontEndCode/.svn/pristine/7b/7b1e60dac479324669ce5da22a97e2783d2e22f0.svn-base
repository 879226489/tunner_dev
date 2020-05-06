<style lang="scss">
  @import "@/scss/mixins.scss";
  @import "@/scss/common.scss";
</style>
<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">用户管理</h4>
    </div>
    <!-- 用户新增 -->
    <Modal v-model="modal" @on-visible-change="watchmodal" title="用户新增" :mask-closable="false" footer-hide class-name="vertical-center-modal">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
        <FormItem label="用户名" prop="loggerName" >
          <Input style="width:94%" v-model="formValidate.loggerName" placeholder="请输入用户名"></Input>
        </FormItem>
        <FormItem label="姓名" prop="userName">
          <Input style="width:94%" v-model="formValidate.userName" placeholder="请输入姓名"></Input>
        </FormItem>
        <FormItem label="性别" prop="sysSex">
          <RadioGroup v-model="formValidate.sysSex">
            <Radio :label="0">男</Radio>
            <Radio :label="1">女</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="身份证号" prop="sysCard">
          <Input style="width:94%" v-model="formValidate.sysCard" placeholder="请输入身份证号码"></Input>
        </FormItem>
        <FormItem label="所属部门" prop="orgId">
          <Select v-model="formValidate.orgId" filterable clearable style="width:94%">
            <Option v-for="item in departMentList" :value="item.uuid" :key="item.uuid">{{ item.orgName }}</Option>
          </Select>
        </FormItem>
        <FormItem label="职位" prop="sysPosition">
           <Input style="width:94%" v-model="formValidate.sysPosition" placeholder="请输入职位"></Input>
        </FormItem>
        <FormItem label="登陆密码" prop="loggerPassword">
          <Input style="width:94%"  v-model="formValidate.loggerPassword" placeholder="请输入登陆密码，例：tn123456"></Input>
        </FormItem>
        <FormItem label="联系电话" prop="userPhone">
          <Input style="width:94%" v-model="formValidate.userPhone" placeholder="请输入手机号或固定号码"></Input>
        </FormItem>
        <FormItem label="角色选择" prop="userRole">
          <Select style="width:94%" multiple v-model="formValidate.userRole" placeholder="请选择角色" filterable>
            <Option v-for="item in userRoleData" :value="item.uuid" :key="item.uuid">{{item.roleName}}</Option>
          </Select>
        </FormItem>
        <FormItem class="fuck" style="width:95%;margin-bottom:25px">
          <div style="float: right;">
            <Button @click="handleSubmit('formValidate')" class="subBtn">提交</Button>
            <Button @click="handleReset('formValidate')" style="margin-left: 8px" class="resetBtn">重置</Button>
          </div>
        </FormItem>
      </Form>
    </Modal>
    <!-- 用户详情 -->
    <Modal v-model="modal1" draggable scrollable title="用户详情">
      <template>
        <Form :label-width="80">
          <FormItem label="编码">
              <Input v-model="modal1Value.sysCode" readonly></Input>
          </FormItem>
          <FormItem label="登录名">
              <Input v-model="modal1Value.loggerName" readonly></Input>
          </FormItem>
          <FormItem label="姓名">
              <Input v-model="modal1Value.userName" readonly></Input>
          </FormItem>
          <FormItem label="Gender">
            <RadioGroup v-model="modal1Value.sysSex">
                <Radio :label="0" disabled>Male</Radio>
                <Radio :label="1" disabled>Female</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="身份证号">
              <Input v-model="modal1Value.sysCard" readonly></Input>
          </FormItem>
          <FormItem label="所属部门">
              <Input v-model="modal1Value.organization.orgName" readonly></Input>
          </FormItem>
          <FormItem label="职位">
              <Input v-model="modal1Value.sysPosition" readonly></Input>
          </FormItem>
          <FormItem label="电话">
              <Input v-model="modal1Value.userPhone" readonly></Input>
          </FormItem>
          <FormItem label="角色选择">
              <Input v-model="modal1Value.roleName" readonly></Input>
          </FormItem>
          <FormItem label="添加时间">
              <Input v-model="modal1Value.time" readonly></Input>
          </FormItem>
        </Form>
      </template>
    </Modal>
    <div class="filter-container">
      <div class="select-container">
        <Button icon="ios-add-circle"  @click="addUser"><span style="position:relative;bottom:6px;">添加用户</span></Button>
      </div>
      <div class="function-container">
        <div class="search-box">
        <Input search v-model="searchValue" enter-button placeholder="Enter something..." @on-search="search"/>
      </div>
      </div>
    </div>
    <Table border stripe :columns="columns" :data="data" align='center'></Table>
    <Page style="text-align:center;margin-top:20px;" :total="total" size="small" :page-size="size" :page-size-opts=[5,10,15,20]  show-elevator show-sizer show-total @on-change="pageChange" @on-page-size-change="pageSizeChange" />
  </div>
</template>

<script>
  export default {
    data(){
      return {
        departMentList:[],
        formValidate:{
          sysCode:"",
          loggerName:"",
          userName:"",
          sysSex:0,
          sysCard:"",
          orgId:"",
          loggerPassword:"",
          sysPosition:"",
          userPhone:"",
          userRole:"",
        },
        ruleValidate: {
          sysCode: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          loggerName: [
              { required: true, message: 'The name cannot be empty', trigger: 'blur' }
          ],
          userName: [
              { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          sysCard: [
              { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          loggerPassword: [
            { required: true, message: "登录密码不能为空", trigger: "blur" },
            { pattern:  /[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/, message: '密码需包含数字及字母', trigger: 'blur'}
          ],
          orgId: [
              { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          sysPosition: [
              { required: true, message: 'Please select the city', trigger: 'change' }
          ],
          userPhone: [
              { required: true, message: 'Please select the city', trigger: 'change' },
              { pattern: /^((0\d{2,3}-\d{7,8})|(1[3456789]\d{9}))$/, message: '手机号码或固定号码格式不正确', trigger: 'blur'}
          ],
          roleName: [
              { required: true, message: 'Please select the city', trigger: 'change' }
          ],
        },
        modal:false,
        modal1:false,
        modal1Value:{
          sysCode:"",
          loggerName:"",
          userName:"",
          sysSex:'',
          sysCard:"",
          organization:"",
          sysPosition:"",
          userPhone:"",
          roleName:"",
          time:""
        },
        //通过id查找此用户的详情
        id:"",
        columns: [
          {
              type: 'selection',
              width: 60,
              align: 'center'
          },
          {
              title: '编号',
              align:'center',
              key: 'sysCode'
          },
          {
              title: '用户名',
              align:'center',
              key: 'loggerName'
          },
          {
              title: '姓名',
              align:'center',
              key: 'userName'
          },
          {
              title: '部门',
              align:'center',
              key: "organization",
              render: (h, params) => {
                let text = params.row.organization.orgName
                return h("span", {
                  domProps: {
                    innerHTML: '<p class="el-icon-circle-plus">' + text + "</p>"
                  }
                });
              }
          },
          {
              title: '职位',
              align:'center',
              key: 'sysPosition'
          },
          {
              title: '联系电话',
              align:'center',
              key: 'userPhone'
          },
          {
              title: '所属角色',
              align:'center',
              key: "sysRole",
              render: (h, params) => {
                console.log(params)
                let text = params.row.sysRole[0].roleName
                return h("span", {
                  domProps: {
                    innerHTML: '<p class="el-icon-circle-plus">' + text + "</p>"
                  }
                });
              }
          },
          {
              title: '功能',
              align:'center',
              render: (h, params) => {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      size: "small",
                      title: "查看详情"
                    },
                    domProps: {
                      title: "查看详情"
                    },
                    on: {
                      click: () => {
                        this.showDetails(params.index);
                      }
                    }
                  },
                  // "查看详情"
                  [
                    h("Icon", {
                      props: {
                        type: "ios-more",
                        size: "24",
                        color: "#FFA100"
                      }
                    })
                  ]
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small",
                      disabled:params.row.loggerName=='admin'?true:false
                    },
                    domProps: {
                      title: "编辑"
                    },
                    on: {
                      click: () => {
                        this.edit(params.index);
                      }
                    }
                  },
                  // 编辑
                  [
                    h("Icon", {
                      props: {
                        type: "ios-create-outline",
                        size: "24",
                        color: "#4db4f0"
                      },
                      style: {
                        marginLeft:'3px'
                      }
                    })
                  ]
                ),
                h(
                  "Button",
                  {
                    props: {
                      size: "small",
                      disabled:params.row.loggerName=='admin'?true:false
                    },
                    domProps: {
                      title: "删除"
                    },
                    on: {
                      click: () => {
                        this.remove(params.row.id);
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
        data:[],
        page:1,
        size:5,
        total:0,
        searchValue:"",
        userRoleData:""
      }
    },
    created(){
      this.getUserList();
      this.getDepartment();
      this.getrole();
    },
    methods:{
      //获取部门
      getDepartment(){
        this.$axios({
          methods:'post',
          url:'./organization/findAllOrganization',
        }).then(res=>{
          console.log(res)
          if (res.data.length != 0) {
            this.departMentList=res.data
          }
        })
      },
      //获取用户角色
      getrole() {
        this.$axios({
          method: "get",
          url: './role/findAllRole'
        }).then(res => {
          console.log(res);
          this.userRoleData = res.data;
          this.userRoleData1 = res.data;
        });
      },
      //增加用户
      addUser(){
        this.modal=true
      },
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            let params = new URLSearchParams();
            params.append("roleId", this.formValidate.userRole);
            params.append("userName", this.formValidate.userName);
            params.append("loggerName", this.formValidate.loggerName);
            params.append("loggerPassword", this.formValidate.loggerPassword);
            let Number = this.formValidate.userPhone;
            params.append("userPhone", this.formValidate.userPhone);
            params.append("id", '');
            params.append('sysSex', this.formValidate.sysSex)
            params.append('sysCard', this.formValidate.sysCard)
            params.append('orgId', this.formValidate.orgId)
            params.append('sysPosition', this.formValidate.sysPosition)
            this.axios({
              url: `${this.baseUrl}/user/addOrUpdate`,
              method: "post",
              data: params
            }).then(res => {
              console.log(res);
              if (res.data.state == 1) {
                this.$Message.info("提交成功");
                this.$refs[name].resetFields();
                this.modal = false;
                this.getData();
              } else {
                this.$Message.error(res.data.info);
              }
            });
          } else {
              this.$Message.error('Fail!');
          }
        })
      },
      handleReset (name) {
          this.$refs[name].resetFields();
      },
      //获取全部用户数据
      getUserList(){
        let params = new URLSearchParams()
        params.append('page', JSON.stringify(this.page))
        params.append('size', JSON.stringify(this.size))
        this.$axios({
          method:'post',
          url:'./user/findAll',
          data:params,
        }).then(res=>{
          // var arr1 = [];
          // this.total = res.data.totalCount
          // 遍历循环，推到同一个数组对象中
          // res.data.dataList.forEach(element => {
          //   let elObj={}
          //   elObj.sysCode = element.sysCode
          //   elObj.loggerName = element.loggerName
          //   elObj.userName = element.userName
          //   elObj.orgName = element.organization.orgName
          //   elObj.sysPosition = element.sysPosition
          //   elObj.userPhone = element.userPhone
          //   elObj.roleName = element.sysRole[0].roleName
          //   console.log(elObj)
          //   arr1.push(elObj)
          res.data.dataList.forEach(element => {
            element._disabled = element.loggerName =='admin'? true:false;
          })
          this.total = res.data.totalCount
          this.data = res.data.dataList
        },err=>{
          console.log(err)
        })
      },
      //监听modal框变化
      watchmodal(){
        if (this.modal == false) {
          this.$refs["formValidate"].resetFields();
        }
      },
      pageChange(page){
        this.page=page
        if(this.searchValue == ""){
          this.getUserList()
        }else{
          this.search();
        }
        
      },
      pageSizeChange(size){
        this.size=size
        if(this.searchValue == ""){
          this.getUserList()
        }else{
          this.search();
        }
      },
      search(){
        this.page = 1;
        let params = new URLSearchParams()
        params.append('page', JSON.stringify(this.page))
        params.append('size', JSON.stringify(this.size))
        params.append('message', this.searchValue)
        this.$axios({
          method:'post',
          url:'./user/findByNameOrLoggerName',
          data:params
        }).then(res=>{
          console.log(res);
           res.data.dataList.forEach(element => {
            element._disabled = element.loggerName =='admin'? true:false;
          })
          this.total = res.data.totalCount
          this.data = res.data.dataList
        },err=>{
          console.log(err)
        })
      },
      // 查看详情
      showDetails(index){
        this.modal1 = true;
        this.id     = this.data[index].id
        let params  = new URLSearchParams();
        params.append("id", this.id);
        this.$axios({
          method:"post",
          url:"./user/findUserById",
          data:params
        }).then(res=>{
          console.log(res.data)
          this.modal1Value.sysCode = res.data.sysCode
          this.modal1Value.loggerName = res.data.loggerName
          this.modal1Value.userName = res.data.userName
          this.modal1Value.organization = res.data.organization
          this.modal1Value.sysPosition = res.data.sysPosition
          this.modal1Value.userPhone = res.data.userPhone
          this.modal1Value.roleName = res.data.sysRole[0].roleName
          this.modal1Value.userPhone = res.data.userPhone
          this.modal1Value.sysCard = res.data.sysCard
          this.modal1Value.time = res.data.time
          this.modal1Value.sysSex = res.data.sysSex
        },err=>{
          console.log(err)
        })
      },

    },
  }
</script>