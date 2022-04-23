<template>
  <div class="goodlist_header">
    <div class="goodlist_header_title">
      数据筛选
    </div>
    <div class="goodlist_header_content">
      <div class="goodlist_header_item">
        <div class="item_title">
          商品搜索
        </div>
        <el-input
          class="good_search"
          v-model="search"
          placeholder="搜索商品名称"
          :prefix-icon="Search"
        />
      </div>
      <div class="goodlist_header_item">
        <div class="item_title">
          商品分类
        </div>
        <el-cascader
          size="default"
          :props="{value: 'id', label: 'name'}"
          placeholder="全部商品"
          :options="categories"
          :show-all-levels="false"
          @focus="loadCategories"
          @change="handleCategoryChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { categoryService } from '../../../api/category'
import { ICategories } from '../../../api/types/category'
import { Search } from '@element-plus/icons-vue'

const search = ref('')

const categories = reactive<ICategories[]>([])

const loadCategories = () => {
  if (categories.length === 0) {
    categoryService.getCategories().then((res) => {
      categories.push(...res)
      console.log(categories)
    })
  }
}

const handleCategoryChange = (value: number[]) => {
  console.log(value)
}
</script>

<style scoped lang="scss">
.goodlist_header {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px -1px #dedfe0;
}
.goodlist_header_title {
    font-weight: bold;
    margin-bottom: 20px;
}
.goodlist_header_item + .goodlist_header_item {
    margin-top: 10px;
}
.goodlist_header_item {
    display: flex;
    align-items: center;
    gap: 10px;
}
.item_title {
    flex: 0 0 auto;
    font-size: 16px;
}
.good_search {
    width: 250px;
}
</style>
