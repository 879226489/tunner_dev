<template>
  <div>
    <div class="pageTitle">
      <h4 class="titleFont">告警设置</h4>
      <div class="setting">
        <span>是否开启：</span>
        <i-switch
          size="large"
          true-color="#19BE6B"
          false-color="#aaa"
          v-model="formCustom.isEnable"
        >
          <span slot="open">开启</span>
          <span slot="close">关闭</span>
        </i-switch>
      </div>
    </div>
    <div class="setting-container">
      <Form
        ref="formCustom"
        :model="formCustom"
        :rules="ruleCustom"
        :label-width="120"
        width="600px"
      >
        <FormItem label="报警方式" prop="mode">
          <RadioGroup v-model="formCustom.mode">
            <Radio :label="0">电话</Radio>
            <Radio :label="1">短信</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="告警号码" prop="alarmNum">
          <Input type="text" v-model="formCustom.alarmNum  " placehodler="请添加告警号码..."></Input>
        </FormItem>
        <FormItem label="告警内容" prop="alarmContent">
          <Input
            v-model="formCustom.alarmContent"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入告警内容"
          ></Input>
        </FormItem>
        <FormItem label="开机率预警值" prop="onWarnValue">
          <InputNumber
            :max="100"
            v-model="formCustom.onWarnValue  "
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          ></InputNumber>
          <Checkbox v-model="formCustom.onEnable" style="margin-left:310px;">是否开启</Checkbox>
        </FormItem>
        <FormItem label="在线率预警值" prop="onlineWarnValue">
          <InputNumber
            :max="100"
            v-model="formCustom.onlineWarnValue"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          ></InputNumber>
          <Checkbox v-model="formCustom.onlineEnable" style="margin-left:310px;">是否开启</Checkbox>
        </FormItem>
        <FormItem label="覆盖率预警值" prop="coverWarnValue">
          <InputNumber
            :max="100"
            v-model="formCustom.coverWarnValue"
            :formatter="value => `${value}%`"
            :parser="value => value.replace('%', '')"
          ></InputNumber>
          <Checkbox v-model="formCustom.coverEnable" style="margin-left:310px;">是否开启</Checkbox>
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
import { getAlarm, saveAlarmSetting } from "@/api/dataTotal";
export default {
  data() {
    const validatePhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else if (!/^1[34578]\d{9}$/.test(value)) {
        callback("手机号格式不正确");
      } else {
        callback();
      }
    };
    return {
      single: false,
      switch1: true,
      formCustom: {
        mode: "0",
        alarmNum: "",
        alarmContent: "",
        onWarnValue: 0,
        onlineWarnValue: 0,
        coverWarnValue: 0,
        coverEnable: false,
        onlineEnable: true,
        onEnable: true,
        isEnable: true
      },
      ruleCustom: {
        alarmNum: [
          { required: true, validator: validatePhone, trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    getData() {
      getAlarm().then(res => {
        console.log(res);
        this.formCustom = res.data.data;
      });
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          saveAlarmSetting(this.formCustom).then(res => {
            if (res.data.code == 200) {
              this.$Message.success("设置成功!");
              this.getData();
            } else {
              this.$Message.error(res.data.msg);
            }
          });
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
<style lang="scss">
@import "@/scss/mixins.scss";
@import "@/scss/common.scss";
.setting-container {
  width: 100%;
  background: #fff;
  min-height: 700px;
  form {
    width: 600px;
  }
}
</style>