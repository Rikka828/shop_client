<template>
  <div>
    <TypeNav />
    <ListContainer />
    <TodayRecommend/>
    <Rank/>
    <Like/>
    <Floor v-for="floor in floorList" :key="floor.id" :list="floor"/>
    <Brand/>
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import TodayRecommend from "./TodayRecommend";
import Rank from "./Rank"
import Like from "./Like"
import Floor from "./Floor"
import Brand from "./Brand"

import {mapState} from "vuex"
export default {
  name: "Home",
  components: { ListContainer,TodayRecommend,Rank,Like,Floor,Brand},
  mounted() {
    this.$store.dispatch("getFloorList")
  },
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  }
}
</script>

<style scoped lang="less">
</style>