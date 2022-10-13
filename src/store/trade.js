import { reqGetUserAddressInfo, reqOrderInfo } from "@/api"
const state = {
    userAddressInfoList: {},
    userOrderInfoList:{}
}
const actions = {
    // 获取用户地址信息
    async getUserAddress({ commit }) {
        let result = await reqGetUserAddressInfo()
        if (result.code === 200) {
            commit("GETUSERADDRESS", result.data)
            return "ok"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 获取交易页商品信息
    async getUserOrderInfo({commit}){
        let result = await reqOrderInfo()
        if(result.code === 200){
            commit("GETORDERINFO",result.data)
            return "ok"
        }else{
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations = {
    // 获取用户地址信息
    GETUSERADDRESS(state, userAddressInfoList) {
        state.userAddressInfoList = userAddressInfoList
    },
    // 获取交易页商品信息
    GETORDERINFO(state,userOrderInfoList){
        state.userOrderInfoList = userOrderInfoList
    }
}
const getters = {
}
export default {
    state,
    actions,
    mutations,
    getters
}