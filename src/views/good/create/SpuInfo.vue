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
          @change="handleCategoryChange"
          collapse-tags
          clearable
        />
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
import { computed, onMounted, reactive, ref, toRaw, watch, watchEffect } from 'vue'
import { categoryService } from '../../../api/category'
import { ICategories } from '../../../api/types/category.type'
import { CreateGoodDto } from '../../../api/types/good.type'
import Upload from '../../../components/Upload/index.vue'
import { urlToUploadUserFile } from '../../../utils/urlToUploadUserFile'

const props = defineProps<{form: CreateGoodDto}>()
const emit = defineEmits(['updata:form'])
const SpuForm = reactive({} as CreateGoodDto)

const categories = reactive<ICategories[]>([])

type Status = {
 readonly '无': 0,
 readonly '新品': 1,
 readonly '推荐': 3
}

const status: Status = {
  无: 0,
  新品: 1,
  推荐: 3
}

const tag = ref<keyof Status>('无')
const banner = computed(() => {
  return SpuForm.banner?.map(urlToUploadUserFile)
})
const detail = computed(() => {
  return SpuForm.detail?.map(urlToUploadUserFile)
})
const cover = computed(() => {
  return SpuForm.cover_url ? [urlToUploadUserFile(SpuForm.cover_url)] : [] as UploadUserFile[]
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
  SpuForm.categories = Array.from(new Set(value.flat(1)))
}

const handleCoverSuccess = (res: string) => {
  SpuForm.cover_url = res
}
const handleCoverRemove = () => {
  SpuForm.cover_url = ''
}
const handleBannerSuccess = (res: string) => {
  if (SpuForm.banner) {
    SpuForm.banner.push(res)
  } else {
    SpuForm.banner = [res]
  }
}
const handleBannerRemove = (res: string) => {
  const index = SpuForm.banner.indexOf(res)
  SpuForm.banner.splice(index, 1)
}
const handleDetailSuccess = (res: string) => {
  if (SpuForm.detail) {
    SpuForm.detail.push(res)
  } else {
    SpuForm.detail = [res]
  }
}
const handleDetailRemove = (res: string) => {
  const index = SpuForm.detail.indexOf(res)
  SpuForm.detail.splice(index, 1)
}

watchEffect(() => {
  SpuForm.tag = status[tag.value]
})

watch(SpuForm, () => {
  emit('updata:form', Object.assign(props.form, toRaw(SpuForm)))
})

onMounted(() => {
  loadCategories()
  // store.resetCreateGoodDto()
})
</script>

<style scoped lang="scss">
.el-input {
    width: 400px;
}
</style>
