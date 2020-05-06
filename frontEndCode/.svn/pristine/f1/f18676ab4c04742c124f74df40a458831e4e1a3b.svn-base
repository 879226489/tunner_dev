
<style lang="scss">
@import "../scss/login.scss";
.border-box {
  box-sizing: border-box;
}
.ivu-input-group {
  font-size: 16px;
}
.ivu-input-group i {
  font-size: 16px;
  // color: #555;
}
</style>
<template>
  <div class="login" style="overflow:hidden">
    <div class="login-container">
      <h1>欢迎登陆</h1>
      <Form ref="formInline" :model="formInline" :rules="ruleInline">
        <FormItem prop="userName">
          <Input
            type="text"
            v-model="formInline.userName"
            placeholder="请输入用户名"
            size="large"
            clearable
          >
            <span slot="prefix" style="font-size:18px;color:#fff;">账号</span>
          </Input>
        </FormItem>
        <FormItem prop="password">
          <Input
            type="password"
            password
            v-model="formInline.password"
            placeholder="请输入密码"
            size="large"
            clearable
          >
            <span slot="prefix" style="font-size:18px;color:#fff;">密码</span>
          </Input>
        </FormItem>
        <div class="remember_box">
          <Checkbox v-model="ifRemember">记住密码</Checkbox>
          <span @click="resetForm" style="color:#fff;">重置</span>
        </div>
        <FormItem style="margin-top:16%;text-align:center;">
          <Button type="primary" @click="handleSubmit('formInline')">登录</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ifRemember: false,
      formInline: {
        userName: "",
        password: ""
      },
      ruleInline: {
        userName: [
          { required: true, message: "请输入您的名字", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入您的密码", trigger: "blur" },
          {
            type: "string",
            min: 5,
            message: "密码最少是五位数",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    remember() {
      if (document.cookie.length > 0) {
        this.ifRemember = true;
      } else {
        this.ifRemember = false;
      }
    },
    setCookie(c_name, c_pwd, exdays) {
      var exdate = new Date(); //获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); //保存的天数
      //字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + c_name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + c_pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    getCookie: function() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); //这里显示的格式需要切割一下自己可输出看下
        console.log(arr);
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); //再次切割
          console.log(arr2);
          //判断查找相对应的值
          if (arr2[0] == "userName") {
            this.formInline.userName = arr2[1]; //保存到保存数据的地方
          } else if (arr2[0] == "userPwd") {
            this.formInline.password = arr2[1];
          }
        }
      }
    },
    //清除cookie
    clearCookie: function() {
      this.setCookie("", "", -1); //修改2值都为空，天数为负1天就好了
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          let param = new URLSearchParams();
          param.append("userName", this.formInline.userName);
          param.append("password", this.formInline.password);
          this.$axios({
            method: "post",
            // url: "/api/login/user",
            url: "./login/user",
            data: param
          }).then(
            res => {
              if (res.data.state == 1) {
                // 1.将登陆成功之后的token，保存到sessionStorage中
                window.sessionStorage.setItem(
                  "token",
                  JSON.stringify(res.data.data)
                );
                //登录成功,提示成功信息，然后跳转到首页，同时将返回信息保存到localstorage中, 将登录名使用vuex传递到layout页面
                let information = res.data.data;
                this.$store.commit("handleUserName", information);
                this.$router.push("/supervision");
                if (this.ifRemember) {
                  this.setCookie(
                    this.formInline.userName,
                    this.formInline.password,
                    7
                  );
                } else {
                  this.clearCookie();
                
                }
              } else {
                this.$Message.error(res.data.info);
              }
            },
            err => {
              console.log(err);
            }
          );
        } else {
          this.$router.push("/supervision");
          this.$Message.error("Fail!");
        }
      });
    },
    //表单重置
    resetForm() {
      console.log(this.$refs.formInline);
      this.$refs.formInline.resetFields();
    }
    //确认是否保存密码 删除cookie还是保存cookie
  },
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.handleSubmit("formInline");
        return false;
      }
    };
    this.getCookie();
    this.remember();
  }
};
</script>
