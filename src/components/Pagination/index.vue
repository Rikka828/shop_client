<template>
  <div class="pagination" @click="changePage">
    <!-- 上一页 -->
    <button :data-pageInfo="pageNo - 1" :disabled="pageNo === 1">上一页</button>
    <!-- 第一页 -->
    <button
      v-show="startAndEnd.start !== 1"
      :data-pageInfo="1"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <!-- 点点点 -->
    <button v-show="startAndEnd.start > 2">···</button>
    <!-- 中间部分 -->
    <template v-for="(page, index) in startAndEnd.end">
      <button
        :key="index"
        v-if="page >= startAndEnd.start"
        :data-pageInfo="page"
        :class="{ active: pageNo == page }"
      >
        {{ page }}
      </button>
    </template>

    <!-- 点点点 -->
    <button v-show="totalPages - startAndEnd.end > 1">···</button>
    <!-- 最后一页 -->
    <button
      v-show="totalPages !== startAndEnd.end"
      :data-pageInfo="totalPages"
      :class="{ active: pageNo == totalPages }"
    >
      {{ totalPages }}
    </button>
    <!-- 下一页 -->
    <button :data-pageInfo="pageNo + 1" :disabled="pageNo === totalPages">
      下一页
    </button>
    <!-- 信息数量 -->
    <button style="margin-left: 30px">共{{ total }}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  // pageNo目前在第几页
  // pageSize每页的商品数
  // total商品总数
  // continues分页器中间部分的连续数量
  props: ["pageNo", "pageSize", "total", "totalPages", "continues"],
  computed: {
    startAndEnd() {
      let { totalPages, continues, pageNo } = this;
      let start = 0;
      let end = 0;
      // 特殊情况
      if (continues > totalPages) {
        start = 1;
        end = totalPages;
        // 正常情况
      } else {
        start = pageNo - Math.floor(continues / 2);
        end = pageNo + Math.floor(continues / 2);
        // 左边超过了
        if (start < 1) {
          start = 1;
          end = continues;
          // 右边超过了
        }
        if (end > totalPages) {
          start = totalPages - continues + 1;
          end = totalPages;
        }
      }
      return { start, end };
    },
  },
  methods: {
    changePage(event) {
      if(event.target.dataset.pageinfo){
        this.$bus.$emit("pageToSearch", +event.target.dataset.pageinfo);
        this.$bus.$emit("pageToCenter", +event.target.dataset.pageinfo);
      }
    },
  },
};
</script>

<style scoped lang = "less">
.pagination {
  text-align: center;
  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>