<template>
  <div>
    <Row>
      <Col :span="this.$attrs.col" v-if="this.$attrs.range.indexOf(5) > 0">
        <Select
          v-model="provinceId"
          clearable
          label-in-value
          style="width:150px"
          placeholder="省级下拉框"
          @on-change="getCity"
          @on-clear="provinceClear"
        >
          <Option v-for="item in provinceList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col :span="this.$attrs.col" v-if="this.$attrs.range.indexOf(4) > 0">
        <Select
          v-model="cityId"
          clearable
          label-in-value
          style="width:150px"
          placeholder="市级下拉框"
          @on-change="getCounty"
          @on-clear="cityClear"
        >
          <Option v-for="item in cityList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col :span="this.$attrs.col" v-if="this.$attrs.range.indexOf(3) > 0">
        <Select
          v-model="countyId"
          clearable
          label-in-value
          style="width:150px"
          placeholder="县级下拉框"
          @on-change="getTown"
          @on-clear="countyClear"
        >
          <Option v-for="item in countyList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col :span="this.$attrs.col" v-if="this.$attrs.range.indexOf(2) > 0">
        <Select
          v-model="townId"
          clearable
          label-in-value
          style="width:150px"
          placeholder="镇级下拉框"
          @on-change="getVillage"
          @on-clear="townClear"
        >
          <Option v-for="item in townList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Col>
      <Col :span="this.$attrs.col" v-if="this.$attrs.range.indexOf(1) > 0">
        <Select
          v-model="villageId"
          clearable
          label-in-value
          style="width:150px"
          placeholder="村级下拉框"
          @on-change="getlastData"
          @on-clear="villageClear"
        >
          <Option v-for="item in villageList" :value="item.id" :key="item.id">{{ item.name }}</Option>
        </Select>
      </Col>
    </Row>
  </div>
</template>

<script>
import { getAreasByParentId } from "@/api/area";
export default {
  name: "areaSelect",
  data() {
    return {
      provinceName: "",
      provinceId: "",
      provinceList: [],
      cityName: "",
      cityId: "",
      cityList: [],
      countyName: "",
      countyId: "",
      countyList: [],
      townName: "",
      townId: "",
      townList: [],
      villageName: "",
      villageId: "",
      villageList: []
    };
  },
  methods: {
    getAreaById(id, type = 5) {
      getAreasByParentId({ id }).then(res => {
        if (type == 5) {
          this.provinceList = res.data.data;
        } else if (type == 4) {
          this.cityList = res.data.data;
        } else if (type == 3) {
          this.countyList = res.data.data;
        } else if (type == 2) {
          this.townList = res.data.data;
        } else if (type == 1) {
          this.villageList = res.data.data;
        }
      });
    },
    getCity(val) {
      if (val) {
        this.provinceName = val.label;
        this.getAreaById(val.value, 4);
        this.$emit("change", {
          id: val.value,
          type: 5,
          name: val.label
        });
      }
    },
    provinceClear() {
      this.cityList = [];
      this.cityId = "";
      this.countyList = [];
      this.countyId = "";
      this.townList = [];
      this.townId = "";
      this.villageList = [];
      this.villageId = "";
      this.$emit("change", {
        id: "",
        type: 5,
        name: ""
      });
    },
    getCounty(val) {
      if (val) {
        this.cityName = val.label;
        this.getAreaById(val.value, 3);
        this.$emit("change", {
          id: val.value,
          type: 4,
          name: val.label
        });
      }
    },
    cityClear() {
      this.countyList = [];
      this.countyId = "";
      this.townList = [];
      this.townId = "";
      this.villageList = [];
      this.villageId = "";
      this.$emit("change", {
        id: this.provinceId,
        type: 5,
        name: this.provinceName
      });
    },
    getTown(val) {
      if (val) {
        this.CountyName = val.label;
        this.getAreaById(val.value, 2);
        this.$emit("change", {
          id: val.value,
          type: 3,
          name: val.label
        });
      }
    },
    countyClear() {
      this.townList = [];
      this.townId = "";
      this.villageList = [];
      this.villageId = "";
      this.$emit("change", {
        id: this.cityId,
        type: 4,
        name: this.cityName
      });
    },
    getVillage(val) {
      if (val) {
        this.TownName = val.label;
        this.getAreaById(val.value, 1);
        this.$emit("change", {
          id: val.value,
          type: 2,
          name: val.label
        });
      }
    },
    townClear() {
      this.villageList = [];
      this.villageId = "";
      this.$emit("change", {
        id: this.countyId,
        type: 3,
        name: this.countyName
      });
    },
    getlastData(val) {
      if (val) {
        this.villageName = val.label;
        this.$emit("change", {
          id: val.value,
          type: 1,
          name: val.label
        });
      }
    },
    villageClear() {
      this.$emit("change", {
        id: this.townId,
        type: 2,
        name: this.townName
      });
    }
  },
  mounted() {
    this.getAreaById("");
  }
};
</script>
