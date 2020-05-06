import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const router =  new Router({
	routes: [
		{
			path: '/',
			redirect:'/login'
			// redirect:'/supervision'
		},
		{
			path: '/login',
			name: 'login',
			meta: {
				title: '登录'
			},
			component: () => import('@/components/Login')
		},
		{
			path: '/allScreen',
			name: 'allScreen',
			meta: {
				title: "一键投屏"
			},
			component: () => import("@/components/supervision/screen/allScreen")
		},
		{
			path: '/supervision',
			name: '监管平台',
			meta: {
				title: '监管平台'
			},
			component: () => import('@/components/layout'),
			redirect:'/Home',
			children: [
				{
					path: '/Home',
					name: 'Home',
					component: () => import('@/components/home'),
				},
				{
					path: '/person',
					name: '个人设置',
					component: () => import('@/components/person'),
				},
				//实时监测
				{
					path: '/ccxSystem',
					name: '村村响系统',
					component: () => import('@/components/supervision/detection/ccxSystem'),
				},
				{
					path: '/ccxAdapter',
					name: '村村响适配器',
					component: () => import('@/components/supervision/detection/ccxAdapter'),
				},
				{
					path: '/ccxTerminal',
					name: '村村响终端',
					component: () => import('@/components/supervision/detection/ccxTerminal'),
				},
				//播出记录
				{
					path: '/emergency',
					name: '省级应急广播播发记录',
					component: () => import('@/components/supervision/record/emergency'),
				},
				{
					path: '/daily',
					name: '村村响广播播发记录',
					component: () => import('@/components/supervision/record/daily'),
				},
				//信息接入
				{
					path: '/access',
					name: '信息接入',
					component: () => import('@/components/supervision/access/access'),
				},
				//内容监管（实时监听）
				{
					path: '/live',
					name: '实时监听',
					component: () => import('@/components/supervision/content/live'),
				},
				//分析评估
				{
					path: '/recordAnalysis',
					name: '播发记录分类统计',
					component: () => import('@/components/supervision/analysis/recordAnalysis'),
				},
				{
					path: '/timeAnalysis',
					name: '播发时间统计',
					component: () => import('@/components/supervision/analysis/timeAnalysis'),
				},
				{
					path: '/terminalAnalysis',
					name: '终端状态分析',
					component: () => import('@/components/supervision/analysis/terminalAnalysis'),
				},
				{
					path: '/alarmTotal',
					name: '告警信息统计',
					component: () => import('@/components/supervision/analysis/alarmTotal')
				},
				{
					path: '/warnSettings',
					name: '告警设置',
					component: () => import('@/components/supervision/analysis/warnSettings'),
				},
				//综合展示
				{
					path: '/screen',
					name: '综合展示',
					component: () => import('@/components/supervision/screen/screen'),
				},
				//系统拓扑
				{
					path: '/topology',
					name: '系统拓扑',
					component: () => import('@/components/supervision/topology/topology'),
				},
				//安全管理
				{
					path: '/updatedCert',
					name: '上传的证书',
					component: () => import('@/components/supervision/safety/updatedCert'),
				},
				{
					path: '/myCert',
					name: '我的证书',
					component: () => import('@/components/supervision/safety/myCert'),
				},
				{
					path: '/certManager',
					name: '平台证书管理',
					component: () => import('@/components/supervision/safety/certManager'),
				},
				{
					path: '/userCertManager',
					name: '用户证书管理',
					component: () => import('@/components/supervision/safety/userCertManager'),
				},
				{
					path: '/securityServe',
					name: '安全服务器',
					component: () => import('@/components/supervision/safety/securityServe'),
				},
				//资源管理
				{
					path: '/resourceSystem',
					name: '村村响平台系统',
					component: () => import('@/components/supervision/resources/resourceSystem'),
				},
				{
					path: '/monitorManager',
					name: '监测设备',
					component: () => import('@/components/supervision/resources/monitorManager'),
				},
				{
					path: '/terminalManager',
					name: '终端设备',
					component: () => import('@/components/supervision/resources/terminalManager'),
				},
				{
					path: '/terminalType',
					name: '终端类型设置',
					component: () => import("@/components/supervision/resources/terminalType")
				},
				//系统管理
				{
					path: '/userManager',
					name: '用户管理',
					component: () => import('@/components/supervision/system/userManager'),
				},
				{
					path: '/roleManager',
					name: '权限管理',
					component: () => import('@/components/supervision/system/roleManager'),
				},
				{
					path: '/dutyManager',
					name: '值班管理',
					component: () => import('@/components/supervision/system/dutyManager'),
				},
				{
					path: '/dailyManager',
					name: '日志管理',
					component: () => import('@/components/supervision/system/dailyManager'),
				},
				{
					path: '/platManager',
					name: '平台管理',
					component: () => import('@/components/supervision/system/platManager'),
				},
				{
					path: '/departmentManager',
					name: '部门管理',
					component: () => import('@/components/supervision/system/departmentManager'),
				},
			]
		},
	]
})
//导航守卫
// router.beforeEach((to,from,next)=>{
	// 如果用户访问的登录页，直接放行
	// if(to.path==='/login') return next()
	//如果sessionStorage中不存在token则直接跳转到login页面
	// const tokenStr = window.sessionStorage.getItem('token')
	// if(!tokenStr) return next('/login')
	// next()
// })

router.beforeEach((to, from,next)=> {
	next();
})

export default router;