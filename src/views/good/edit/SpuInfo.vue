<template>
  <div class="spu_form">
    <el-form
      :model="data"
      label-width="120px"
    >
      <el-form-item
        label="商品名称"
      >
        <el-input
          placeholder="请输入商品名称"
          v-model="data.name"
        />
      </el-form-item>
      <el-form-item
        label="选择分类"
      >
        <el-cascader
          size="default"
          :props="{value: 'id', label: 'name', multiple: true}"
          placeholder="全部商品"
          :options="categories"
          :show-all-levels="false"
          @change="handleCategoryChange"
          collapse-tags
          clearable
        />
      </el-form-item>
      <el-form-item
        label="商品分类"
      >
        <div class="form_tags_container">
          <el-tag
            v-for="cate in data.categories"
            :key="cate.id"
          >
            {{ cate.name }}
          </el-tag>
        </div>
      </el-form-item>
      <el-form-item label="商品标签">
        <el-radio-group v-model="tag">
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
          v-model="data.market_price"
        />
      </el-form-item>
      <el-form-item
        label="原价"
      >
        <el-input
          placeholder="请输入商品原价"
          v-model="data.price"
        />
      </el-form-item>
      <el-form-item
        label="总库存"
      >
        <el-input
          placeholder="请输入商品总库存"
          v-model="data.total_stock"
        />
      </el-form-item>
      <el-form-item
        label="商品封面图"
      >
        <upload
          :limit="1"
          :files="cover"
          @success="handleCoverSuccess"
          @remove="handleCoverRemove"
        />
      </el-form-item>
      <el-form-item
        label="商品轮播图"
      >
        <upload
          :limit="5"
          :files="banner"
          @success="handleBannerSuccess"
          @remove="handleBannerRemove"
        />
      </el-form-item>
      <el-form-item
        label="商品详情图"
      >
        <upload
          :limit="10"
          :files="detail"
          @success="handleDetailSuccess"
          @remove="handleDetailRemove"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { UploadUserFile } from 'element-plus'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { categoryService } from '../../../api/category'
import { goodService } from '../../../api/good'
import { ICategories } from '../../../api/types/category'
import { IGoodDetail } from '../../../api/types/good'
import Upload from '../../../components/Upload/index.vue'
import { urlToUploadUserFile } from '../../../utils/urlToUploadUserFile'

const categories = reactive<ICategories[]>([])

type Status = {
 readonly '无': 0,
 readonly '新品': 1,
 readonly '推荐': 3
}

// type TReverse<T> = T extends Record<infer K, any> ? T[K] extends keyof any ? {[P in T[K]]: T[K] extends P ? P : never } : never : never;

// type Test = TReverse<Status>

type Reverse<T> = T extends Record<infer K, any> ? T[K] extends keyof any ? Record<T[K], K> : never : never;

type ReStatus = Reverse<Status>

const status: Status = {
  无: 0,
  新品: 1,
  推荐: 3
}

const reStatus: ReStatus = {
  0: '无',
  1: '新品',
  3: '推荐'
}

const tag = ref<keyof Status>('无')
const route = useRoute()
const data = reactive({} as IGoodDetail)
const banner = computed(() => {
  return data.banner?.map(urlToUploadUserFile)
})
const detail = computed(() => {
  return data.detail?.map(urlToUploadUserFile)
})
const cover = computed(() => {
  return data.cover_url ? [urlToUploadUserFile(data.cover_url)] : [] as UploadUserFile[]
})

const loadCategories = () => {
  if (categories.length === 0) {
    categoryService.getCategories().then((res) => {
      categories.length = 0
      categories.push(...res)
    })
  }
}

const handleCategoryChange = (value: number[]) => {
  console.log(value)
}

const handleCoverSuccess = (res: string) => {
  data.cover_url = res
}
const handleCoverRemove = () => {
  data.cover_url = ''
}
const handleBannerSuccess = (res: string) => {
  if (data.banner) {
    data.banner.push(res)
  } else {
    data.banner = [res]
  }
}
const handleBannerRemove = (res: string) => {
  const index = data.banner.indexOf(res)
  data.banner.splice(index, 1)
}
const handleDetailSuccess = (res: string) => {
  if (data.detail) {
    data.detail.push(res)
  } else {
    data.detail = [res]
  }
}
const handleDetailRemove = (res: string) => {
  const index = data.detail.indexOf(res)
  data.detail.splice(index, 1)
}

watchEffect(() => {
  data.tag = status[tag.value]
})

const loadGoodData = () => {
  goodService.getGoodDetailById(route.params.id as string).then(res => {
    tag.value = reStatus[res.tag as keyof ReStatus]
    Object.assign(data, res)
  })
}

onMounted(() => {
  loadCategories()
  loadGoodData()
})
</script>

<style scoped lang="scss">
.el-input {
    width: 400px;
}
.form_tags_container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
