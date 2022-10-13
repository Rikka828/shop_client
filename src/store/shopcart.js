import { reqGetShopCarInfo, reqDeleteCartById, reqUpdateCheckedById } from "@/api/index.js"

const state = {
    shopCartList: []
}
const actions = {
    // 获取购物车信息
    async getShopCarInfo({ commit }) {
        let result = await reqGetShopCarInfo()
        if (result.code === 200) {
            commit("GETSEARCHINFO", result.data)
        }
    },
    // 删除商品
    async delCartById({ commit }, skuId) {
        let result = await reqDeleteCartById(skuId)
        if (result.code === 200) {
            return "成功"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 商品是否被选中
    async updateCheckedById({ commit }, { skuId, isChecked }) {
        let result = await reqUpdateCheckedById(skuId, isChecked)
        if (result.code === 200) {
            return "成功"
        } else {
            return Promise.reject(new Error("faile"))
        }
    },
    // 删除所有被选中的商品
    deleteCheckedcart({ getters, dispatch }) {
        let PromiseAll = []
        let result = ""
        getters.carList.cartInfoList.forEach(item => {
            if (item.isChecked === 1) {
                result = dispatch("delCartById", item.skuId)
            } else {
                result = ""
            }
            PromiseAll.push(result)
        });
        return Promise.all(PromiseAll)
    },
    // 全选
    updataAllchecked({ getters, dispatch }, isChecked) {
        let PromiseAll = []
        let result = ""
        getters.carList.cartInfoList.forEach(item => {
            result = dispatch("updateCheckedById", { skuId: item.skuId, isChecked: isChecked })
            PromiseAll.push(result)
        })
        return Promise.all(PromiseAll)
    }
}
const mutations = {
    GETSEARCHINFO(state, shopCartList) {
        state.shopCartList = shopCartList
    }
}
const getters = {
    carList() {
        return state.shopCartList[0] || {}
    }
}
export default {
    state,
    actions,
    mutations,
    getters
}