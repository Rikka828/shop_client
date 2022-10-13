import Mock from "mockjs"

import banner from "./banner.json"
import floor from "./floor.json"

// mock数据:第一个参数请求地址 第二个参数:请求数据
Mock.mock("http://gmall-h5-api.atguigu.cn/mock/banner",{code:200,data:banner})
Mock.mock("http://gmall-h5-api.atguigu.cn/mock/floor",{code:200,data:floor})