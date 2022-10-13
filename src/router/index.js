import Vue from "vue"
import VueRouter from "vue-router"

Vue.use(VueRouter)
import store from "@/store"

//重写push方法
const originPush = VueRouter.prototype.push; // 把官方的push方法暂存到originPush这个变量里面
VueRouter.prototype.push = function push(location) { // 参数是调用push方法传进来的参数
    return originPush.call(this, location).catch(() => { });
}
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
    return originReplace.call(this, location).catch(() => { })
}


const router = new VueRouter({
    routes: [
        {
            name: "home",
            path: "/home",
            component:()=>import("@/pages/Home"),
            meta: { show: true }
        },
        {
            name: "search",
            path: "/search/:keyword?",
            component:()=>import("@/pages/Search"),
            meta: { show: true }
        },
        {
            name: "login",
            path: "/login",
            component: ()=>import("@/pages/Login/index.vue"),
            meta: { show: false }
        },
        {
            name: "register",
            path: "/register",
            component: ()=>import("@/pages/Register/index.vue"),
            meta: { show: false }
        },
        {
            name: "detail",
            path: "/detail/:skuid",
            component: ()=>import("@/pages/Detail"),
            meta: { show: true }
        },
        {
            name: "addcartsuccess",
            path: "/addcartsuccess",
            component: ()=>import("@/pages/AddCartSuccess"),
            meta: { show: true }
        },
        {
            name: "ShopCart",
            path: "/shopcart",
            component: ()=>import("@/pages/ShopCart"),
            meta: { show: true }
        },
        {
            name: "trade",
            path: "/trade",
            component: ()=>import("@/pages/Trade"),
            meta: { show: true },
            beforeEnter(to,from,next){
                if(from.path == "/shopcart"){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            name: "pay",
            path: "/pay",
            component:()=>import("@/pages/Pay"),
            meta: { show: true },
            beforeEnter(to,from,next){
                if(from.path == "/trade"){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            name: "paysuccess",
            path: "/paysuccess",
            component:()=>import("@/pages/PaySuccess"),
            meta: { show: true },
            beforeEnter(to,from,next){
                if(from.path == "/pay"){
                    next()
                }else{
                    next(false)
                }
            }
        },
        {
            name: "center",
            path: "/center",
            component:()=>import("@/pages/Center"),
            meta: { show: true },
            children:[
                {
                    name:"myorder",
                    path:"myorder",
                    component:()=>import("@/pages/Center/MyOrder")
                },
                {
                    name:"grouporder",
                    path:"grouporder",
                    component:()=>import("@/pages/Center/GroupOrder")
                },
                {
                    path:"/center",
                    redirect:"/center/myorder"
                }
            ]
        },
        {
            // 重定向
            path: "*",
            redirect: "/home"
        }
    ],
    scrollBehavior(to, from, savedPosition) {
        return { y: 0 }
    }
})
router.beforeEach(async (to, from, next) => {
    let token = localStorage.getItem("token")
    let name = store.state.user.userInfo.name
    if (token) {
        if (to.path === "/login") {
            next("/home")
        }
        else {
            if (name) {
                next()
            } else {
                try {
                    await store.dispatch("getUserLoginInfo")
                    next()
                } catch (error) {
                    await store.dispatch("reqUserLogout")
                    next("/login")
                }
            }
        }
    }
    else{
        let toPath = to.path
        if(toPath.indexOf("trade") != -1 || toPath.indexOf("pay") != -1){
            next('/login?redirect='+toPath);
        }else{
            next()
            
        }
    }
})
export default router