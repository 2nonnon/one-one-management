<template>
  <div class="sku-container">
    <div class="spu_form">
      <el-form
        label-width="120px"
      >
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
            :attrs="attrs"
            @generate-skus="handleGenerateSkus"
          />
        </el-form-item>
        <el-form-item
          label="详细信息"
          v-if="data.skus.length > 0"
        >
          <sku-part
            v-model:skus="data.skus"
            @delete-sku="handleDeleteSku"
          />
        </el-form-item>
      </el-form>
    </div>
    <div class="sku-container_footer">
      <el-button @click="showInfo">
        console
      </el-button>
      <el-button @click="handleUpdateGoodSku">
        submit
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref, watchEffect } from 'vue'
import { attributeService } from '../../../api/attribute'
import { IAttributes } from '../../../api/types/Attribute'
import { CreateSkuDto, IGoodDetail, UpdateGoodSkuDto } from '../../../api/types/good'
import { useRoute } from 'vue-router'
import { goodService } from '../../../api/good'
import SkuPart from '../create/SkuPart.vue'
import AttrPart from '../create/AttrPart.vue'

enum SkuType {
  Single = '单规格',
  Multiple = '多规格'
}

const attributes = reactive<IAttributes[]>([])
const check = ref<SkuType>(SkuType.Single)
const route = useRoute()
const data = reactive({ skus: [] as CreateSkuDto[] } as UpdateGoodSkuDto)
const GoodInfo = reactive({} as IGoodDetail)

const attrs = computed(() => {
  return GoodInfo.skus.map(sku => [sku.id, ...sku.attributes.map(_ => _.id)]).flat(1)
})

const loadAttributes = () => {
  attributeService.getAttributes().then((res) => {
    attributes.length = 0
    attributes.push(...res)
  })
}

const loadGoodData = () => {
  goodService.getGoodDetailById(route.params.id as string).then(res => {
    Object.assign(GoodInfo, res)
    data.id = res.id
    data.hasSku = res.hasSku
    data.skus = res.skus
    if (data.hasSku) {
      check.value = SkuType.Multiple
    }
  })
}

const handleGenerateSkus = (skus: CreateSkuDto[]) => {
  data.skus.push(...skus.filter(sku => {
    if (data.skus.every(item => item.attributes.map(_ => _.id).join('-') !== sku.attributes.map(_ => _.id).join('-'))) {
      sku.market_price = GoodInfo.market_price
      sku.price = GoodInfo.price
      return true
    } else {
      return false
    }
  }))
}

const showInfo = () => {
  console.log(GoodInfo)
  console.log(data)
}

const handleUpdateGoodSku = () => {
  goodService.updateGoodSku(data.id, data).then(res => {
    console.log('UpdateGoodSku', res)
  })
}

const handleDeleteSku = (sku: CreateSkuDto) => {
  const index = data.skus.findIndex(item => item.attributes.map(_ => _.id).join('-') === sku.attributes.map(_ => _.id).join('-'))
  data.skus.splice(index, 1)
}

watchEffect(() => {
  data.total_stock = data.skus.reduce((res, cur) => {
    // v-model 双向绑定 el-input 更新的值类型都是string
    return res + parseInt((cur.stock || 0) as unknown as string, 10)
  }, 0)
})

watchEffect(() => {
  data.hasSku = check.value === SkuType.Multiple
})

onMounted(() => {
  loadAttributes()
  loadGoodData()
})
</script>

<style scoped lang="scss">
.generate_btn {
  margin-left: 12px;
}
.form_tags_container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.form_tags_container .el-tag{
  flex-basis: 35%;
}
.form_tags_container .el-tag:nth-child(odd)::after {
  content: ':';
}
.sku_detail_container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.sku_detail_card {
  width: 300px;
  border: 1px solid #E4E7ED;
  padding: 20px 20px 20px 10px;
  border-radius: 10px;
}
.sku_detail_card :deep(.el-form-item + .el-form-item) {
  margin-top: 12px;
}
.delete_btn {
  margin: 0 auto;
}
</style>
