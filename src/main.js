import Vue from 'vue'
import App from './App.vue'

// 加载路由router
import router from "@/router"
// 加载vuex的store
import store from "@/store"
// 注册三级列表 全局组件
import TypeNav from "@/components/TypeNav"
// 引入mockServer.js --mock数据
import "@/mock/mockServer.js"
// 引入swiper轮播图
import "swiper/css/swiper.css"
// 注册分页器 全局组件
import Pagination from "@/components/Pagination"
// 引入Api
import * as API from "@/api"

Vue.component(Pagination.name,Pagination)
Vue.component(TypeNav.name,TypeNav)

// 使用element-ui
import { MessageBox } from 'element-ui';
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入图片懒加载
import rikka from "@/assets/rikka.jpg"
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  loading: rikka,
})

//---------   vee-validate插件 start    ---------

import VeeValidate from "vee-validate";
import zh_CN from "vee-validate/dist/locale/zh_CN";
Vue.use(VeeValidate);
//表单验证
VeeValidate.Validator.localize("zh_CN", {
  messages: {
    ...zh_CN.messages,
    is: (field) => `${field}必须与密码相同`, // 修改内置规则的 message，让确认密码和密码相同
  },
  attributes: {
    phone: "手机号",
    code: "验证码",
    password: "密码",
    password1: "确认密码",
    agree:'协议'
  },
});
//自定义校验规则
VeeValidate.Validator.extend("tongyi", {
  validate: (value) => {
    return value;
  },
  getMessage: (field) => field + "必须同意",
});

//---------   vee-validate插件 end    ---------

Vue.config.productionTip = false

new Vue({
  el:"#app",
  beforeCreate() {
    Vue.prototype.$bus = this // 安装全局事件总线，$bus 就是当前应用的 vm
    Vue.prototype.$API = API
  },
  render: h => h(App),
  router,
  store
})
