<template>
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
        <el-cascader
          size="default"
          :props="{value: 'id', label: 'name', multiple: true}"
          placeholder="全部商品"
          :options="attributes"
          :show-all-levels="false"
          @change="handleAttributesChange"
          collapse-tags
          clearable
        />
        <el-button
          class="generate_btn"
          @click="handleGenerate"
        >
          立即生成
        </el-button>
      </el-form-item>
      <el-form-item
        label="详细信息"
      >
        <div class="sku_detail_container">
          <div
            class="sku_detail_card"
            v-for="item in data.skus"
            :key="item.name"
          >
            <el-form
              :model="item"
              label-width="70px"
            >
              <el-form-item
                label="商品名称"
              >
                <el-input
                  placeholder="请输入商品名称"
                  v-model="item.name"
                />
              </el-form-item>
              <el-form-item
                label="商品规格"
              >
                <div class="form_tags_container">
                  <el-tag
                    v-for="attr in item.attributes"
                    :key="attr.id"
                  >
                    {{ attr.name }}
                  </el-tag>
                </div>
              </el-form-item>
              <el-form-item
                label="售价"
              >
                <el-input
                  placeholder="请输入商品售价"
                  v-model="item.market_price"
                />
              </el-form-item>
              <el-form-item
                label="原价"
              >
                <el-input
                  placeholder="请输入商品原价"
                  v-model="item.price"
                />
              </el-form-item>
              <el-form-item
                label="库存"
              >
                <el-input
                  placeholder="请输入商品库存"
                  v-model="item.stock"
                />
              </el-form-item>
              <el-form-item
                label="商品图"
              >
                <upload
                  :limit="1"
                  :files="item.img_url ? [urlToUploadUserFile(item.img_url)] : []"
                  @success="(res) => {item.img_url = res}"
                  @remove="() => {item.img_url = ''}"
                />
              </el-form-item>
              <el-form-item>
                <el-button
                  class="delete_btn"
                  type="danger"
                >
                  删除商品
                </el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { attributeService } from '../../../api/attribute'
import Upload from '../../../components/Upload/index.vue'
import { IAttributes } from '../../../api/types/Attribute'
import { IGoodDetail } from '../../../api/types/good'
import { useRoute } from 'vue-router'
import { goodService } from '../../../api/good'
import { urlToUploadUserFile } from '../../../utils/urlToUploadUserFile'

enum SkuType {
  Single = '单规格',
  Multiple = '多规格'
}

const attributes = reactive<IAttributes[]>([])
const check = ref<SkuType>(SkuType.Single)
const route = useRoute()
const data = reactive({} as IGoodDetail)

const handleAttributesChange = (...args: any[]) => {
  console.log(args)
}
const handleGenerate = (...args: any[]) => {
  console.log(args)
}

const loadAttributes = () => {
  attributeService.getAttributes().then((res) => {
    attributes.length = 0
    attributes.push(...res)
  })
}

const loadGoodData = () => {
  goodService.getGoodDetailById(route.params.id as string).then(res => {
    Object.assign(data, res)
  })
}

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
