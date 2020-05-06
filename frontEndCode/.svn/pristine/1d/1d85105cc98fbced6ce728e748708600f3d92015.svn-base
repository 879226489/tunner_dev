<style lang="scss" scoped>
  .person h1{
      font-size: 36px;font-weight: bold;
      text-align: center;
      margin-top: 50px;
  }
  .person-container{
      width: 500px;
      margin: 50px auto;
  }
</style>
<template>
  <div class="person">
        <h1>个人设置</h1>
        <div class="person-container">
            <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="100">
                <FormItem label="用户名" prop="userName" readonly>
                    <Input type="text" v-model="userName"></Input>
                </FormItem>
                <FormItem label="原密码" prop="originalPwd">
                    <Input type="password" v-model="formCustom.originalPwd"></Input>
                </FormItem>
                 <FormItem label="新密码" prop="newPwd">
                    <Input type="password" v-model="formCustom.newPwd"></Input>
                </FormItem>
                <FormItem label="确认新密码" prop="repeatPwd">
                    <Input type="password" v-model="formCustom.repeatPwd"></Input>
                </FormItem>
                <FormItem  style="margin-left:-85px;text-align:center;">
                    <Button type="primary" @click="handleSubmit('formCustom')">确定</Button>
                    <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </div>
    </div>
</template>

<script>
export default {
        data () {
            const pwdCheckValidate = (rule, value, callback) => {
                if (this.formCustom.passwd != "" && value == "") {
                    callback(new Error("确认密码不能为空"));
                } else if (
                    this.formCustom.passwd != value &&
                    this.formCustom.passwd != ""
                ) {
                    callback(new Error("新密码和确认密码应相同"));
                } else {
                    callback();
            }
            };
            return {
                userName:"",
                formCustom: {
                    // userName:"",
                    originalPwd: '',
                    newPwd: '',
                    repeatPwd: ''
                },
                ruleCustom: {
                    // userName: [
                    //    { required: true, message: "请输入您的名字", trigger: "blur" }
                    // ],
                    originalPwd: [
                        { required: true, message: "请输入您的密码", trigger: "blur" },
                        {
                            type: "string",
                            min: 5,
                            message: "密码最少是五位数",
                            trigger: "blur"
                        }
                    ],
                    newPwd: [
                        { required: true, message: "请输入您的新密码", trigger: "blur" },
                        {
                            type: "string",
                            min: 5,
                            message: "密码最少是五位数",
                            trigger: "blur"
                        }
                    ],
                    repeatPwd: [
                        { validator:pwdCheckValidate, trigger: "blur" },
                        {
                            type: "string",
                            min: 5,
                            message: "密码最少是五位数",
                        }
                    ]
                }
            }
        },
        created(){
           this.getUserName();
        },
        methods: {
            getUserName() {
                this.userId = this.$store.getters.information.id;
                this.userName = this.$store.getters.information.userName;
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>
