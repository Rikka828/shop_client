import requests from "./requests";

// 获取三级列表数据
export const reqCategoryList = () => {
    return requests({
        method: "GET",
        url: "/api/product/getBaseCategoryList"
    })
}
// 获取mock home-bannner数据
export const reqGetBannerList = () => {
    return requests({
        method: "GET",
        url: "/mock/banner"
    })
}
// 获取mock home-floor数据
export const reqGetFloorList = () => {
    return requests({
        method: "GET",
        url: "/mock/floor"
    })
}
//获取search数据
export const reqGetSearchInfo = (params) => {
    return requests({
        method: "POST",
        url: "/api/list",
        data: params
    })
}
// 获取goods信息
export const reqGetGoodsInfo = (params) => {
    return requests({
        method: "GET",
        url: `/api/item/${params}`,
    })
}
// 添加购物车
export const reqPostAddtoShopCar = (skuId, skuNum) => {
    return requests({
        method: "POST",
        url: `/api/cart/addToCart/${skuId}/${skuNum}`,
    })
}
// 获取购物车列表
export const reqGetShopCarInfo = () => {
    return requests({
        method: "GET",
        url: "/api/cart/cartList"
    })
}
// 删除购物车商品
export const reqDeleteCartById = (skuId) => {
    return requests({
        method: "DELETE",
        url: `/api/cart/deleteCart/${skuId}`
    })
}
// 切换商品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => {
    return requests({
        method: "GET",
        url: `/api/cart/checkCart/${skuId}/${isChecked}`
    })
}
// 获取验证码
export const reqGetVerificationcode = (phone) => {
    return requests({
        method: "GET",
        url: `/api/user/passport/sendCode/${phone}`
    })
}
// 用户注册
export const reqUserAccountRegister = (phone, password, code) => {
    return requests({
        method: "POST",
        url: "/api/user/passport/register",
        data: {
            phone,
            password,
            code
        }
    })
}
// 用户登录
export const reqUserAccountLogin = (phone, password) => {
    return requests({
        method: "POST",
        url: "/api/user/passport/login",
        data: {
            phone,
            password,
        }
    })
}
// 通过token获取用户信息
export const reqGetUserInfo = () => {
    return requests({
        method: "GET",
        url: "/api/user/passport/auth/getUserInfo",
    })
}
// 退出登陆
export const reqUserLogout = () => {
    return requests({
        method: "GET",
        url: "/api/user/passport/logout",
    })
}
// 获取用户地址信息
export const reqGetUserAddressInfo = () => {
    return requests({
        method: "GET",
        url: "/api/user/userAddress/auth/findUserAddressList",
    })
}
// 获取交易页商品订单
export const reqOrderInfo = () => {
    return requests({
        method: "GET",
        url: "/api/order/auth/trade",
    })
}
// 提交订单
export const reqSubmitOrder = (tradeNo,data) => {
    return requests({
        method: "POST",
        url: `/api/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data
    })
}
// 获取支付金额信息
export const reqGetPayInfo =(orderId) =>{
    return requests({
        method: "GET",
        url:`/api/payment/weixin/createNative/${orderId}`,
    })
}
// 获取支付订单状态
export const reqGetPayStatus =(orderId) =>{
    return requests({
        method: "GET",
        url:`/api/payment/weixin/queryPayStatus/${orderId}`,
    })
}
// 获取个人中心信息
export const reqMyOrderList = (page,limit) =>{
    return requests({
        method: "GET",
        url:`/api/order/auth/${page}/${limit}`,
    })
}