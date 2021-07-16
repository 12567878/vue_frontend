import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
    // 后台登陆
    {
        path:"/BackendLogin",
        name:"BackendLogin",
        component:() => import("../views/BackendRegLogin/BackendLogin.vue")
    },
    {
        path:"/SellerRegister",
        name:"SellerRegister",
        component:() => import("../views/BackendRegLogin/SellerRegister.vue")
    },



    {
        path: "/home/:sellerId",
        name: "Home",
        component:() => import("../components/Home.vue"),
        children: [
            {
                path: '/outline/:sellerId',
                component:() => import('../components/Outline.vue'),
            },
            {
                path: '/goodsList/:sellerId',
                component:() => import('../components/GoodsList.vue'),
            },
            {
                path: '/slotList/:sellerId',
                component:() => import('../components/SlotList.vue'),
            },
            {
                path: '/notification/:sellerId',
                component:() => import('../components/Notification.vue'),
            },
            {
                path: '/editInfo/:sellerId',
                component: () => import('../components/EditInfo.vue') ,
            },
            {
                path: '/releaseSlot/:sellerId',
                component: () => import('../components/ReleaseSlot.vue'),
            },
            {
                path: '/releaseGoods/:sellerId',
                component:() => import('../components/ReleaseGoods.vue') ,
            },
            {
                path: '/releaseShow/:sellerId',
                component:() => import('../components/ReleaseShow.vue'),
            },
        ]
    },

  // 顾客路由

    {
        path: "/",
        name: "CustomerIndex",
        component: () => import("../views/CustomerFeatures/CustomerIndex.vue"),
        children: [
            {
                path: "/",
                name: "CustomerMain",
                component: () => import("@/views/CustomerFeatures/CustomerMain.vue")
            },
            {
                path: "/Category",
                name: "Category",
                component: () => import("@/views/CustomerFeatures/Search.vue")
            },
            {
                path: "/CustomerInfoCenter/:id",
                name: "CustomerInfoCenter",
                component: () => import("@/views/CustomerFeatures/CustomerInfoCenter.vue")
            },
            {
                path: "/Orders/:id",
                name: "Orders",
                component: () => import("@/views/CustomerFeatures/CustomerInfoCenter.vue")
            },
            {
                path: "/SearchList/:input",
                name: "SearchList",
                component: () => import("@/views/CustomerFeatures/Search.vue")
            },
            {
                path: "/SearchList/",
                name: "SearchList",
                component: () => import("@/views/CustomerFeatures/Search.vue")
            },
            {
                path: "/NoticeBoard/:id",
                name: "NoticeBoard",
                component: () => import("@/views/CustomerFeatures/CustomerInfoCenter.vue")
            },
            {
                path: "/detailedInfo/:input",
                name: "detailedInfo",
                component: () => import("@/views/CustomerFeatures/detailedInfo")
            },


        ]
    },

    //管理员路由

    //{
    //  path: '/login', component: ()=>import('../components/Login')
    // },
    {
        path: '/home',
        component: ()=>import("../components/Home2"),
        redirect: '/welcome',
        children: [
            {path: '/home', redirect: '/user' },
            { path: '/user', component: ()=>import("../components/user/User") },
            { path: '/discuss', component: ()=>import("../components/discuss/Discuss") },
            {path: '/send', component: ()=>import("../components/user/inform")},
            {path: '/seller', component: ()=>import("../components/user/seller")}
        ]
    }



 
]

const router = new VueRouter({
  routes
})

export default router
