import {reqGetGoodsInfo ,reqPostAddtoShopCar} from "@/api/index"
const state = {
    goodsInfo:{}
}
const actions = {
    async getGoodsInfo({commit},params){
        let result = await reqGetGoodsInfo(params)
        if(result.code === 200){
            commit("GETGOODSINFO",result.data)
        }
    },
    async addShopCar({commit},{skuId,skuNum}){
        let result = await reqPostAddtoShopCar(skuId,skuNum)
        if(result.code === 200){
            return "成功"
        }
        else{
            return Promise.reject(new Error("faile"))
        }
    }
}
const mutations ={
    GETGOODSINFO(state,goodsInfo){
        state.goodsInfo = goodsInfo
    }
}
const getters = {
    categoryView(state){
        return state.goodsInfo.categoryView ||{}
    },
    skuInfo(state){
        return state.goodsInfo.skuInfo ||{}
    },
    spuSaleAttrList(state){
        return state.goodsInfo.spuSaleAttrList ||[]
    }
}
export default{
    state,
    actions,
    mutations,
    getters
}