<template>
  <div class="spu_form">
    <el-form
      :model="SpuForm"
      label-width="120px"
    >
      <el-form-item
        label="商品名称"
      >
        <el-input
          placeholder="请输入商品名称"
          v-model="SpuForm.name"
        />
      </el-form-item>
      <el-form-item
        label="商品分类"
      >
        <el-cascader
          size="default"
          :props="{value: 'id', label: 'name', multiple: true}"
          placeholder="全部商品"
          :options="categories"
          :show-all-levels="false"
          @focus="loadCategories"
          @change="handleCategoryChange"
          collapse-tags
          clearable
        />
      </el-form-item>
      <el-form-item label="商品标签">
        <el-radio-group v-model="SpuForm.tag">
          <el-radio label="无" />
          <el-radio label="新品" />
          <el-radio label="推荐" />
        </el-radio-group>
      </el-form-item>
      <el-form-item
        label="售价"
      >
        <el-input
          placeholder="请输入商品售价"
          v-model="SpuForm.market_price"
        />
      </el-form-item>
      <el-form-item
        label="原价"
      >
        <el-input
          placeholder="请输入商品原价"
          v-model="SpuForm.price"
        />
      </el-form-item>
      <el-form-item
        label="总库存"
      >
        <el-input
          placeholder="请输入商品总库存"
          v-model="SpuForm.total_stock"
        />
      </el-form-item>
      <el-form-item
        label="商品封面图"
      >
        <upload :limit="1" />
      </el-form-item>
      <el-form-item
        label="商品轮播图"
      >
        <upload :limit="5" />
      </el-form-item>
      <el-form-item
        label="商品详情图"
      >
        <upload :limit="10" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, watchEffect } from 'vue'
import { categoryService } from '../../../api/category'
import { ICategories } from '../../../api/types/category'
import Upload from '../../../components/Upload/index.vue'
import { useStore } from '../../../store/store'

const store = useStore()
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

const SpuForm = store.createGoodDto

watchEffect(() => {
  console.log(SpuForm.name)
})
</script>

<style scoped lang="scss">
.el-input {
    width: 400px;
}
</style>
