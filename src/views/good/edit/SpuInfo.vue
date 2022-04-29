<template>
  <div class="spu-container">
    <div class="spu_form">
      <el-form
        :model="data"
        label-width="120px"
      >
        <el-form-item
          label="商品编码"
        >
          <el-input
            placeholder="请输入商品编码"
            v-model="data.code"
          />
        </el-form-item>
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
            ref="cascader"
            size="default"
            :props="{value: 'id', label: 'name', multiple: true}"
            placeholder="全部商品"
            :options="categories"
            :show-all-levels="false"
            @change="handleCategoryChange"
            collapse-tags
            clearable
          >
            <template #default="{ node }">
              <span>{{ nodeValue(node) }}</span>
            </template>
          </el-cascader>
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
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="原价"
        >
          <el-input
            placeholder="请输入商品原价"
            v-model="data.price"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="总库存"
        >
          <el-input
            placeholder="请输入商品总库存"
            v-model="data.total_stock"
            type="number"
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
    <div class="spu-container_footer">
      <el-button @click="showInfo">
        console
      </el-button>
      <el-button @click="handleUpdateGoodSpu">
        submit
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElCascader, UploadUserFile } from 'element-plus'
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { categoryService } from '../../../api/category'
import { goodService } from '../../../api/good'
import { ICategories } from '../../../api/types/category'
import { IGoodDetail, UpdateGoodSpuDto } from '../../../api/types/good'
import Upload from '../../../components/Upload/index.vue'
import { urlToUploadUserFile } from '../../../utils/urlToUploadUserFile'

const categories = reactive<ICategories[]>([])

type Status = {
 readonly '无': 0,
 readonly '新品': 1,
 readonly '推荐': 3
}

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
const data = reactive({} as UpdateGoodSpuDto)
const banner = computed(() => {
  return data.banner?.map(urlToUploadUserFile)
})
const detail = computed(() => {
  return data.detail?.map(urlToUploadUserFile)
})
const cover = computed(() => {
  return data.cover_url ? [urlToUploadUserFile(data.cover_url)] : [] as UploadUserFile[]
})

// 初始化级联选择器，手动激活商品已有分类
const cascader = ref<typeof ElCascader | null>(null)
const nodeValue = (node: any): boolean => {
  if (!node.isLeaf && data.categories?.includes(node.value)) {
    // if (!node.checked && !node.indeterminate) node.indeterminate = true
    node.children.forEach((child: any) => {
      if (data.categories?.includes(child.value) && !child.checked) {
        cascader.value?.handleSuggestionClick(child)
      }
    })
  }
  return node.label
}

const loadCategories = () => {
  if (categories.length === 0) {
    categoryService.getCategories().then((res) => {
      categories.length = 0
      categories.push(...res)
    })
  }
}

const handleCategoryChange = (value: number[]) => {
  data.categories.length = 0
  data.categories.push(...Array.from(new Set(value.flat())))
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

const showInfo = () => {
  console.log(data)
}

const handleUpdateGoodSpu = () => {
  goodService.updateGoodSpu(data.id, data).then(res => {
    console.log('updateGoodSpu', res)
  })
}

watchEffect(() => {
  data.tag = status[tag.value]
})

const loadGoodData = () => {
  goodService.getGoodDetailById(route.params.id as string).then((res: Partial<IGoodDetail>) => {
    tag.value = reStatus[res.tag as keyof ReStatus]
    const tmp = res.categories
    delete res.skus
    delete res.attributes
    delete res.categories
    Object.assign(data, res)
    data.categories = tmp!.map(item => item.id)
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
