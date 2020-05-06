<template>
  <Layout class="main" style="height: 100%;">
    <Sider
      ref="side1"
      hide-trigger
      collapsible
      :collapsed-width="0"
      v-model="isCollapsed"
      class="left-sider"
      width="250px"
      style="overflow: hidden;"
    >
      <div class="logo"></div>
      <Menu
        :active-name="activeName"
        :open-names="openName"
        theme="dark"
        width="250px"
        :class="menuitemClasses"
        accordion
      >
        <template v-for="menu in menus">
          <Submenu :name="menu.menuNumber" v-if="menu.listMenu.length!=0">
            <template slot="title">
              <Icon :type="menu.imgPath"></Icon>
              {{menu.menuName}}
            </template>
            <MenuItem
              :name="menuItem.menuUrl"
              :to="menuItem.menuUrl"
              v-for="(menuItem,index) in menu.listMenu"
              :key="index"
              @click.native="saveNavState(menuItem.menuNumber)"
            >{{menuItem.menuName}}</MenuItem>
          </Submenu>
          <MenuItem :name="menu.menuUrl" :to="menu.menuUrl" v-if="menu.listMenu.length==0">
            <Icon :type="menu.imgPath"></Icon>
            {{menu.menuName}}
          </MenuItem>
        </template>
        <!-- <MenuItem name="index" to="/supervision">
            <Icon type="ios-home"></Icon>首页
          </MenuItem>
          <Submenu name="1">
            <template slot="title">
              <Icon type="ios-navigate"></Icon>实时监测
            </template>
            <MenuItem name="1-1" to="/ccxSystem">村村响系统</MenuItem>
            <MenuItem name="1-2" to="/ccxAdapter">村村响适配器</MenuItem>
            <MenuItem name="1-3" to="/ccxTerminal">村村响终端</MenuItem>
          </Submenu>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>播出记录
            </template>
            <MenuItem name="2-1" to="/emergency">应急广播播发记录</MenuItem>
            <MenuItem name="2-2" to="/daily">村村响广播播发记录</MenuItem>
          </Submenu>
          <MenuItem name="信息接入" to="/access">
            <Icon type="ios-analytics"></Icon>信息接入
          </MenuItem>
          <MenuItem name="音频监听" to="/live">
            <Icon type="ios-analytics"></Icon>音频监听
          </MenuItem>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>分析评估
            </template>
            <MenuItem name="3-1" to="/recordAnalysis">播发记录分类统计</MenuItem>
            <MenuItem name="3-2" to="/timeAnalysis">播发时间统计</MenuItem>
            <MenuItem name="3-3" to="/terminalAnalysis">村村响终端状态</MenuItem>
            <MenuItem name="3-4" to="/warnSettings">告警设置</MenuItem>
          </Submenu>
          <MenuItem name="综合展示" to="/screen">
            <Icon type="ios-analytics"></Icon>综合展示
          </MenuItem>
          <MenuItem name="系统拓扑" to="/topology">
            <Icon type="ios-analytics"></Icon>系统拓扑
          </MenuItem>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>安全管理
            </template>
            <MenuItem name="4-1" to="/updatedCert">上传的证书</MenuItem>
            <MenuItem name="4-2" to="/myCert">我的证书</MenuItem>
            <MenuItem name="4-3" to="/certManager">平台证书管理</MenuItem>
            <MenuItem name="4-4" to="/userCertManager">用户证书管理</MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>资源管理
            </template>
            <MenuItem name="5-1" to="/resourceSystem">村村响平台系统</MenuItem>
            <MenuItem name="5-2" to="/monitorManager">监测设备</MenuItem>
            <MenuItem name="5-3" to="/terminalManager">终端设备</MenuItem>
          </Submenu>
          <Submenu name="6">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>系统管理
            </template>
            <MenuItem name="6-1" to="/userManager">用户管理</MenuItem>
            <MenuItem name="6-2" to="/roleManager">角色管理</MenuItem>
            <MenuItem name="6-3" to="/dutyManager">值班管理</MenuItem>
            <MenuItem name="6-4" to="/dailyManager">日志管理</MenuItem>
            <MenuItem name="6-5" to="/platManager">平台管理</MenuItem>
            <MenuItem name="6-6" to="/departmentManager">部门管理</MenuItem>
        </Submenu>-->
      </Menu>
    </Sider>
    <Layout>
      <Header class="layout-header-bar">
        <Icon
          @click.native="collapsedSider"
          :class="rotateIcon"
          :style="{margin: '0 20px'}"
          type="md-menu"
          size="24"
        ></Icon>
        <h2 class="logo-title">湖北省应急广播监管平台</h2>
        <div class="header-operation">
          <span class="header-name">{{userName}},欢迎您</span>
          <router-link to="person">
            <span>
              <Icon type="md-person" />个人设置
            </span>
          </router-link>
          <span @click="logout">
            <Icon type="md-power" />退出
          </span>
        </div>
      </Header>
      <Content class="main-content-con">
        <Layout class="main-layout-con">
          <Content class="content-wrapper">
            <router-view></router-view>
          </Content>
        </Layout>
      </Content>
    </Layout>
  </Layout>
</template>

<script>
export default {
  data() {
    return {
      isCollapsed: false,
      userId: "",
      userName: "",
      menuList: [],
      menus: [
        {
          uuid: "1",
          menuName: "首页",
          menuParent: "1",
          menuUrl: "/Home",
          menuNumber: 1,
          listMenu: [],
          imgPath: "ios-home"
        },
        {
          uuid: "2",
          menuName: "实时监测",
          menuParent: "0",
          menuUrl: "/SystemSet",
          menuNumber: 2,
          listMenu: [
            {
              uuid: "2-1",
              menuName: "村村响系统",
              menuParent: "402884f76e49f85d016e4a5502c00008",
              menuUrl: "/ccxSystem",
              menuNumber: 2,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "2-2",
              menuName: "村村响适配器",
              menuParent: "402884f76e49f85d016e4a5502c00008",
              menuUrl: "/ccxAdapter",
              menuNumber: 2,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "2-3",
              menuName: "村村响终端",
              menuParent: "402884f76e49f85d016e4a5502c00008",
              menuUrl: "/ccxTerminal",
              menuNumber: 2,
              listMenu: null,
              imgPath: ""
            }
          ],
          imgPath: "md-settings"
        },
        {
          uuid: "3",
          menuName: "播出记录",
          menuParent: "0",
          menuUrl: "/resource",
          menuNumber: 3,
          listMenu: [
            {
              uuid: "3-1",
              menuName: "省级应急广播播发记录",
              menuParent: "402884f76e583d28016e58454b4f0000",
              menuUrl: "/emergency",
              menuNumber: 3,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "3-2",
              menuName: "村村响广播播发记录",
              menuParent: "402884f76e583d28016e58454b4f0000",
              menuUrl: "/daily",
              menuNumber: 3,
              listMenu: null,
              imgPath: ""
            }
          ],
          imgPath: "md-bookmarks"
        },
        {
          uuid: "4",
          menuName: "信息接入",
          menuParent: "402884f76e583d28016e58454b4f0000",
          menuUrl: "/access",
          menuNumber: 4,
          listMenu: [],
          imgPath: "md-options"
        },
        {
          uuid: "5",
          menuName: "实时监听",
          menuParent: "402884f76e583d28016e58454b4f0000",
          menuUrl: "/live",
          menuNumber: 5,
          listMenu: [],
          imgPath: "md-options"
        },
        {
          uuid: "6",
          menuName: "分析评估",
          menuParent: "0",
          menuUrl: "/configuration",
          menuNumber: 6,
          listMenu: [
            {
              uuid: "6-1",
              menuName: "播发记录分类统计",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/recordAnalysis",
              menuNumber: 6,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "6-2",
              menuName: "播发时间统计",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/timeAnalysis",
              menuNumber: 6,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "6-3",
              menuName: "村村响终端统计",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/terminalAnalysis",
              menuNumber: 6,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "6-4",
              menuName: "告警信息统计",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/alarmTotal",
              menuNumber: 6,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "6-5",
              menuName: "告警设置",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/warnSettings",
              menuNumber: 6,
              listMenu: null,
              imgPath: ""
            }
          ],
          imgPath: "md-options"
        },
        {
          uuid: "7",
          menuName: "综合展示",
          menuParent: "0",
          menuUrl: "/screen",
          menuNumber: 7,
          listMenu: [],
          imgPath: "md-options"
        },
        {
          uuid: "8",
          menuName: "系统拓扑",
          menuParent: "0",
          menuUrl: "/topology",
          menuNumber: 8,
          listMenu: [],
          imgPath: "md-options"
        },
        {
          uuid: "9",
          menuName: "安全管理",
          menuParent: "0",
          menuUrl: "/configuration",
          menuNumber: 9,
          listMenu: [
            {
              uuid: "9-1",
              menuName: "上传的证书",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/updatedCert",
              menuNumber: 9,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "9-2",
              menuName: "我的证书",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/myCert",
              menuNumber: 9,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "9-3",
              menuName: "平台证书管理",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/certManager",
              menuNumber: 9,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "9-4",
              menuName: "用户证书管理",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/userCertManager",
              menuNumber: 9,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "9-5",
              menuName: "安全服务器",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/securityServe",
              menuNumber: 9,
              listMenu: null,
              imgPath: ""
            }
          ],
          imgPath: "md-options"
        },
        {
          uuid: "10",
          menuName: "资源管理",
          menuParent: "0",
          menuUrl: "/resourceSystem",
          menuNumber: 10,
          listMenu: [
            {
              uuid: "10-1",
              menuName: "村村响平台系统",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/resourceSystem",
              menuNumber: 10,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "10-2",
              menuName: "适配器",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/monitorManager",
              menuNumber: 10,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "10-3",
              menuName: "终端设备",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/terminalManager",
              menuNumber: 10,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "10-4",
              menuName: "终端类型设置",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/terminalType",
              menuNumber: 10,
              listMenu: null,
              imgPath: ""
            }
          ],
          imgPath: "md-options"
        },
        {
          uuid: "11",
          menuName: "系统管理",
          menuParent: "0",
          menuUrl: "/resourceSystem",
          menuNumber: 11,
          listMenu: [
            {
              uuid: "11-1",
              menuName: "用户管理",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/userManager",
              menuNumber: 11,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "11-2",
              menuName: "权限管理",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/roleManager",
              menuNumber: 11,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "11-3",
              menuName: "值班管理",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/dutyManager",
              menuNumber: 11,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "11-4",
              menuName: "日志管理",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/dailyManager",
              menuNumber: 11,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "11-5",
              menuName: "平台信息",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/platManager",
              menuNumber: 11,
              listMenu: null,
              imgPath: ""
            },
            {
              uuid: "11-6",
              menuName: "部门管理",
              menuParent: "402884f76e583d28016e5847c1a70001",
              menuUrl: "/departmentManager",
              menuNumber: 11,
              listMenu: null,
              imgPath: ""
            }
          ],
          imgPath: "md-options"
        }
      ],
      openName: [],
      activeName: ""
    };
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    logout() {
      // 清楚sessionStorage中的值,然后跳转到login页面
      window.sessionStorage.clear();
      this.$router.push("/login");
    },
    //获取导航栏
    getMenuList() {
      // let param = new URLSearchParams();
      // param.append("userId", this.userId);
      // param.append("code", "BD20191104");
      // this.$axios({
      //   method: "post",
      //   url: "/api/menu/findMenuByPlatformCode",
      //   data: 'param'
      // }).then(
      //   res => {
      //     //获取侧边栏列表
      //     this.menus = res.data;
      //     console.log(this.menus)
      //   },
      //   err => {
      //     console.log(err);
      //   }
      // );
      // console.log(this.menus)
    },
    getUserName() {
      this.userId = this.$store.getters.information.id;
      this.userName = this.$store.getters.information.userName;
    },
    //当刷新页面时需要保存页面状态，点击使用sessionStorage保存menuNumber
    saveNavState(openName) {
      window.sessionStorage.setItem("openName", openName);
    }
  },
  created() {
    this.getUserName();
    this.getMenuList();
    //
    this.activeName = this.$route.path;
    var openName = window.sessionStorage.getItem("openName");
    if (openName) {
      this.openName.push(parseInt(openName));
    } else {
      return;
    }
  }
};
</script>

<style lang="scss">
@import "../scss/layout.scss";
.ivu-menu-submenu {
  box-shadow: 0 0 1px #000;
}
.ivu-menu-item {
  box-shadow: 0 0 1px #000;
}
.ivu-menu-item-selected {
  border-right: none;
  color: #fff !important;
  background: #2d8cf0 !important;
}
.logo-title {
  font-size: 30px;
  font-weight: bold;
}
.sider-left .ivu-layout-sider-children {
  overflow-y: scroll;
}
</style>
