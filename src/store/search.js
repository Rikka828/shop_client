import { reqGetSearchInfo } from "@/api/index.js"
const state = {
    searchInfo: {}
}
const actions = {
    async getSearchInfo({ commit }, searchParams = {}) {
        let result = await reqGetSearchInfo(searchParams)
        if (result.code === 200) {
            commit("GETSEARCHINFO", result.data)
        }
    }
}
const mutations = {
    GETSEARCHINFO(state, searchInfo) {
        state.searchInfo = searchInfo
    }
}
const getters = {
    attrsList(state) {
        return state.searchInfo.attrsList || []
    },
    goodsList(state) {
        return state.searchInfo.goodsList || []
    },
    trademarkList(state) {
        return state.searchInfo.trademarkList || []
    },
    total(state){
        return state.searchInfo.total || 0
    },
    totalPages(state){
        return state.searchInfo.totalPages || 0
    }
}

export default {
    state,
    actions,
    mutations,
    getters
}