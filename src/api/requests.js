import axios from "axios"
// 对axios进行二次封装
const requests = axios.create({
    baseURL: "http://gmall-h5-api.atguigu.cn",
    timeout: 5000
})
// nprogress进度条样式
import nprogress from "nprogress"
import "nprogress/nprogress.css"
// uuid检测
import getUUID from "@/utils/uuid_token.js"
// 请求拦截器:再发送请求之前,请求拦截器可以检测到,可以在请求发出去之前做一些事情
requests.interceptors.request.use((config)=>{
    // config:配置对象,对象里一个重要的属性--headers请求头

    // uuid
    let uuid = getUUID()
    config.headers.userTempId = uuid
    // 登陆用户的token
    if(localStorage.getItem("token")){
        config.headers.token = localStorage.getItem("token")
    }

    // 进度条
    nprogress.start()
    return config
})
// 响应拦截器
requests.interceptors.response.use((res)=>{
    // 成功的回调函数,服务器响应数据回来后,响应拦截器可以检测到,做一些事情
    nprogress.done()
    return res.data
},(error)=>{
    // 响应失败的回调函数
    console.log("响应失败"+error)
    return Promise.reject(new Error('fail'))
})

export default requests
