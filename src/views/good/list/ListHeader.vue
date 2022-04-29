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
        <el-button
          type="primary"
          @click="handleSearch"
        >
          搜索
        </el-button>
      </div>
      <div class="goodlist_header_item">
        <div class="item_title">
          商品分类
        </div>
        <el-cascader
          size="default"
          :props="{value: 'id', label: 'name', checkStrictly: true}"
          placeholder="全部商品"
          :options="categories"
          :show-all-levels="false"
          @change="handleCategoryChange"
          clearable
          ref="cascader"
        >
          <template #default="{ node }">
            <span>{{ nodeValue(node) }}</span>
          </template>
        </el-cascader>
      </div>
      <div class="goodlist_header_item">
        <div class="item_title">
          商品排序
        </div>
        <el-radio-group v-model="sort">
          <el-radio-button
            v-for="item in sortItems"
            :key="item"
            :label="item"
          >
            {{ sortMap[item] }}
          </el-radio-button>
        </el-radio-group>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { categoryService } from '../../../api/category'
import { ICategories } from '../../../api/types/category'
import { Search } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { ElCascader } from 'element-plus'
import { Sort } from '../../../api/types/good'

const route = useRoute()
const router = useRouter()
const search = ref('')
const categoryId = ref<number>(-1)
const categories = reactive<ICategories[]>([])
const sortMap = {
  [Sort.PRICE]: '价格↑',
  [Sort.PRICE_DES]: '价格↓',
  [Sort.SOLED]: '销量',
  [Sort.TIME]: '上架时间'
}
const sortItems = Object.values(Sort)
const sort = ref<Sort>(Sort.TIME)

// 初始化级联选择器，手动激活商品已有分类
const cascader = ref<typeof ElCascader | null>(null)
const nodeValue = (node: any): boolean => {
  if (categoryId.value > 0 && node.value === categoryId.value) {
    cascader.value?.handleSuggestionClick(node)
    categoryId.value = -1
  }
  return node.label
}

const loadCategories = () => {
  if (categories.length === 0) {
    categoryService.getCategories().then((res) => {
      categories.push(...res)
      console.log(categories)
    })
  }
}

const handleSearch = () => {
  router.push({
    path: '/good/list',
    query: {
      search: search.value
    }
  })
}

const handleCategoryChange = () => {
  const node = cascader.value?.getCheckedNodes()
  const value = node[0]?.value
  if (value) {
    router.push({
      path: '/good/list',
      query: {
        category: value
      }
    })
  } else {
    router.push({ path: '/good/list' })
  }
}

watchEffect(() => {
  router.push({
    path: '/good/list',
    query: Object.assign({}, route.query, { sort: sort.value })
  })
})

onMounted(() => {
  loadCategories()
  search.value = route.query.search as string ?? ''
  categoryId.value = parseInt(route.query.category as string ?? -1, 10)
})
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
