import { reqGetVerificationcode, reqUserAccountLogin, reqUserAccountRegister,reqGetUserInfo, reqUserLogout } from "@/api/index.js"

const state = {
    VerificationCode:"",
    userToken:{},
    userInfo:{}
}
const actions = {
    // 发送验证码
    async VerificationCode({ commit }, phone) {
        let result = await reqGetVerificationcode(phone)
        if (result.code === 200){
            commit("VERIFICATIONCODE",result.data)
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 注册
    async UserAccountRegister({commit},{phone,password,code}){
        let result = await reqUserAccountRegister(phone,password,code)
        if(result.code === 200){
            return "成功"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 登陆
    async reqUserAccountLogin({commit},{phone,password}){
        let result = await reqUserAccountLogin(phone,password)
        if(result.code === 200){
            commit("REQUSERACCOUNTLOGIN",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 获取登陆信息
    async getUserLoginInfo({commit}){
        let result = await reqGetUserInfo()
        if(result.code === 200){
            commit("GETUSERLOGININFO",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    },
    // 退出登陆
    async reqUserLogout({state}){
        let result = await reqUserLogout()
        if(result.code === 200){
            state.userToken = {}
            state.userInfo = {}
            localStorage.clear("token")
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations = {
    // 发送验证码
    VERIFICATIONCODE(state,VerificationCode){
        state.VerificationCode = VerificationCode
    },
    // 登陆
    REQUSERACCOUNTLOGIN(state,userToken){
        state.userToken = userToken
    },
    // 获取登陆信息
    GETUSERLOGININFO(state,userInfo){
        state.userInfo = userInfo
    }
}
const getters = {}
export default {
    state,
    actions,
    mutations,
    getters
}