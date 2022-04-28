<template>
  <div class="create_container">
    <div class="create_header" />
    <div class="create_body">
      <div class="spu_form">
        <el-form
          :model="createGoodDto"
          label-width="120px"
        >
          <el-form-item
            label="商品编码"
          >
            <el-input
              placeholder="请输入商品编码"
              v-model="createGoodDto.code"
            />
          </el-form-item>
          <el-form-item
            label="商品名称"
          >
            <el-input
              placeholder="请输入商品名称"
              v-model="createGoodDto.name"
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
              v-model="createGoodDto.market_price"
              type="number"
            />
          </el-form-item>
          <el-form-item
            label="原价"
          >
            <el-input
              placeholder="请输入商品原价"
              v-model="createGoodDto.price"
              type="number"
            />
          </el-form-item>
          <el-form-item
            label="总库存"
          >
            <el-input
              placeholder="请输入商品总库存"
              v-model="createGoodDto.total_stock"
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
          <el-form-item
            label="商品规格"
          >
            <el-radio-group v-model="check">
              <el-radio :label="SkuType.Single" />
              <el-radio :label="SkuType.Multiple" />
            </el-radio-group>
          </el-form-item>
          <el-form-item
            label="选择规格"
            v-if="check === SkuType.Multiple"
          >
            <attr-part
              @generate-skus="handleGenerateSkus"
            />
          </el-form-item>
          <el-form-item
            label="详细信息"
            v-if="showDetail"
          >
            <sku-part v-model:skus="createGoodDto.skus" />
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="creater_footer">
      <el-button @click="showInfo">
        console
      </el-button>
      <el-button @click="handleCreateGood">
        submit
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreateGoodDto, CreateSkuDto } from '../../../api/types/good'
import { reactive, computed, onMounted, ref, watchEffect } from 'vue'
import { goodService } from '../../../api/good'
import { UploadUserFile } from 'element-plus'
import { categoryService } from '../../../api/category'
import { ICategories } from '../../../api/types/category'
import Upload from '../../../components/Upload/index.vue'
import { urlToUploadUserFile } from '../../../utils/urlToUploadUserFile'
import SkuPart from './SkuPart.vue'
import AttrPart from './AttrPart.vue'

const createGoodDto = reactive({ skus: ([] as CreateSkuDto[]), code: `${Date.now()}` } as CreateGoodDto)

enum SkuType {
  Single = '单规格',
  Multiple = '多规格'
}
const check = ref<SkuType>(SkuType.Single)
const showDetail = computed(() => {
  return createGoodDto.skus.length > 0 && check.value === SkuType.Multiple
})

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

const categories = reactive<ICategories[]>([])
const loadCategories = () => {
  if (categories.length === 0) {
    categoryService.getCategories().then((res) => {
      categories.length = 0
      categories.push(...res)
    })
  }
}
const handleCategoryChange = (value: number[]) => {
  createGoodDto.categories = Array.from(new Set(value.flat(1)))
}

const banner = computed(() => {
  return createGoodDto.banner?.map(urlToUploadUserFile)
})
const detail = computed(() => {
  return createGoodDto.detail?.map(urlToUploadUserFile)
})
const cover = computed(() => {
  return createGoodDto.cover_url ? [urlToUploadUserFile(createGoodDto.cover_url)] : [] as UploadUserFile[]
})
const handleCoverSuccess = (res: string) => {
  createGoodDto.cover_url = res
}
const handleCoverRemove = () => {
  createGoodDto.cover_url = ''
}
const handleBannerSuccess = (res: string) => {
  if (createGoodDto.banner) {
    createGoodDto.banner.push(res)
  } else {
    createGoodDto.banner = [res]
  }
}
const handleBannerRemove = (res: string) => {
  const index = createGoodDto.banner.indexOf(res)
  createGoodDto.banner.splice(index, 1)
}
const handleDetailSuccess = (res: string) => {
  if (createGoodDto.detail) {
    createGoodDto.detail.push(res)
  } else {
    createGoodDto.detail = [res]
  }
}
const handleDetailRemove = (res: string) => {
  const index = createGoodDto.detail.indexOf(res)
  createGoodDto.detail.splice(index, 1)
}

const handleGenerateSkus = (skus: CreateSkuDto[]) => {
  createGoodDto.skus.length = 0
  createGoodDto.skus.push(...skus.map(sku => {
    sku.market_price = createGoodDto.market_price
    sku.price = createGoodDto.price
    return sku
  }))
}

const showInfo = () => {
  console.log(createGoodDto)
}
const handleCreateGood = () => {
  goodService.createGood(createGoodDto).then(res => {
    console.log('create', res)
  })
}

watchEffect(() => {
  createGoodDto.tag = status[tag.value]
})

watchEffect(() => {
  createGoodDto.hasSku = check.value === SkuType.Multiple
})

watchEffect(() => {
  createGoodDto.total_stock = createGoodDto.skus.reduce((res, cur) => {
    // v-model 双向绑定input更新的值类型都是string
    return res + parseInt((cur.stock || 0) as unknown as string, 10)
  }, 0)
})

onMounted(() => {
  loadCategories()
})
</script>

<style scoped lang="scss">
.create_header {
  padding: 40px 0;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.el-steps {
  background-color: inherit;
}
.create_body {
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.creater_footer {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
}
.el-input {
    width: 400px;
}
</style>
