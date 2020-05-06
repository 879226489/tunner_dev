<template>
  <div>
    <Cascader
      v-model="value"
      :data="treeData"
      :change-on-select="true"
      :render-format="format"
      @on-change="getChange"
    ></Cascader>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    value: {
        type: Array,
    }
  },
  data() {
    return {
      select: []
    };
  },
  computed: {
    treeData() {
      return this.$store.state.area.treeData;
    }
  },
  methods: {
    ...mapActions(["setTreeData"]),
    format(label) {
      return label[label.length - 1];
    },
    getChange(val, selData) {
      console.log(val);
      if (val.length != 0) {
        this.$emit("change", {
          id: val[val.length - 1],
          arr: val,
          gbCode: selData[selData.length - 1].gbCode || ""
        });
      } else {
        this.$emit("change", {
          id: [],
          gbCode: ""
        });
      }
    }
  },
  mounted() {
    ///this.getAreaTree();
    this.setTreeData();
  }
};
</script>

<style>
</style>