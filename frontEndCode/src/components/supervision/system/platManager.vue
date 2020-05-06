<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">编辑平台信息</h4>
    </div>
    <div class="plat-container">
      <Form
        ref="formCustom"
        :model="formCustom"
        :rules="ruleCustom"
        :label-width="120"
        width="600px"
      >
        <FormItem label="平台名称" prop="platformName">
          <Input type="text" v-model="formCustom.platformName"></Input>
        </FormItem>
        <FormItem label="区域编码" prop="areaCode">
          <Input type="text" v-model="formCustom.areaCode"></Input>
        </FormItem>
        <FormItem label="平台级别" prop="platformLevel">
          <Select v-model="formCustom.platformLevel" placeholder="请选择平台级别">
            <Option :value="1">省级</Option>
            <Option :value="2">市级</Option>
            <Option :value="3">县级</Option>
          </Select>
        </FormItem>
        <FormItem label="经度" prop="longitude">
          <Input type="text" v-model="formCustom.longitude"></Input>
        </FormItem>
        <FormItem label="纬度" prop="latitude">
          <Input type="text" v-model="formCustom.latitude"></Input>
        </FormItem>
        <FormItem label="tar包存储路径" prop="tarUrl">
          <Input type="text" v-model="formCustom.tarUrl"></Input>
        </FormItem>
        <FormItem label="自动发送">
          <RadioGroup v-model="button1" type="button">
            <Radio label="是"></Radio>
            <Radio label="否"></Radio>
          </RadioGroup>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="handleSubmit('formCustom')">确认</Button>
          <Button @click="handleReset('formCustom')" style="margin-left: 8px">重置</Button>
        </FormItem>
      </Form>
    </div>
  </div>
</template>

<script>
import { getPlatformInfo, savePlatformInfo } from "@/api/system";
export default {
  data() {
    return {
      formCustom: {
        platformName: "",
        areaCode: "",
        platformLevel: "",
        longitude: "",
        latitude: "",
        tarUrl: ""
      },
      ruleCustom: {
        platformName: [
          { required: true, message: "请输入平台名称", trigger: "blur" }
        ],
        areaCode: [
          { required: true, message: "请输入区域编码", trigger: "blur" }
        ],
        platformLevel: [
          {
            type: "number",
            required: true,
            message: "请选择平台级别",
            trigger: "blur"
          }
        ],
        longitude: [
          {
            type: "number",
            required: true,
            message: "请输入经度",
            trigger: "blur"
          }
        ],
        latitude: [
          {
            type: "number",
            required: true,
            message: "请输入纬度",
            trigger: "blur"
          }
        ],
        tarUrl: [
          { required: true, message: "请输入tar包存储路径", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getData() {
      getPlatformInfo().then(res => {
        console.log(res);
        this.formCustom = res.data.data;
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          savePlatformInfo(this.formCustom).then(res => {
            if (res.data.code == 200) {
              this.$Message.success("设置成功");
              this.getData();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
          // this.$axios({
          //   method: "post",
          //   url: "./platform/savePlatformInfo",
          //   data: this.formCustom
          // }).then(res => {
          //   if (res.data.code == 200) {
          //     console.log(res);
          //   } else {
          //     this.$Message.error(res.data.msg);
          //   }
          // });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    }
  },
  mounted() {
    this.getData();
  }
};
</script>

<style  lang="scss" scoped>
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
.plat-container {
  width: 100%;
  padding: 20px 0;
  background: #fff;
  min-height: 700px;
  form {
    width: 600px;
  }
}
</style>