<template>
  <div class="spu_form">
    <el-form
      :model="SpuForm"
      label-width="120px"
    >
      <el-form-item label="商品规格">
        <el-radio-group>
          <el-radio label="单规格" />
          <el-radio label="多规格" />
        </el-radio-group>
      </el-form-item>
      <el-form-item label="选择规格">
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
      <el-form-item label="详细信息">
        <div class="sku_detail_container">
          <div
            class="sku_detail_card"
            v-for="item in SpuForm.skus"
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
    <button @click.prevent="foo">
      CCCCC
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useStore } from '../../../store/store'
import { attributeService } from '../../../api/attribute'
import Upload from '../../../components/Upload/index.vue'
import { IAttributes } from '../../../api/types/Attribute'
import { CreateSkuDto } from '../../../api/types/good'

const result: any[] = []
const attributes = reactive<IAttributes[]>([])
const store = useStore()
const SpuForm = store.createGoodDto
// const SkuForm = reactive<CreateSkuDto[]>([])

const foo = () => {
  console.log(SpuForm)
}

const load = () => {
  attributeService.getAttributes().then((res) => {
    attributes.length = 0
    attributes.push(...res)
  })
}

const handleAttributesChange = (value: [number, number][]) => {
  result.length = 0
  const map = new Map<number, [number, number][]>()
  value.forEach(item => {
    if (!map.has(item[0])) {
      map.set(item[0], [item])
    } else {
      map.get(item[0])!.push(item)
    }
  })
  attributes.forEach(item => {
    if (map.has(item.id)) {
      const children = item.children
      const checked = map.get(item.id)
      const tmp = checked?.map(val => {
        const id = val[1]
        if (children) {
          for (let i = 0; i < children?.length; i++) {
            if (children[i].id === id) {
              const a1 = Object.assign({}, item)
              delete a1.children
              const a2 = Object.assign({}, children[i])
              delete a2.children
              return [a1, a2]
            }
          }
        }
        return []
      })
      result.push(tmp)
    }
  })
  console.log(result)
}

const cartesianProduct = (source: any[][][]) => {
  const result: any[] = []
  const re = (i: number, item: any) => {
    if (i >= source.length) {
      result.push(item)
      return
    }
    for (let j = 0; j < source[i].length; j++) {
      const tmp = source[i][j].concat(item)
      re(i + 1, tmp)
    }
  }
  re(0, [])
  return result
}

const handleGenerate = () => {
  SpuForm.skus = []
  const attrs = cartesianProduct(result)
  SpuForm.skus.push(...Array.from({ length: attrs.length }, (_, i) => {
    const obj = {} as CreateSkuDto
    obj.name = attrs[i].filter((item: any) => item.parentId !== 0).map((item: any) => item.name).join('-')
    obj.market_price = SpuForm.market_price
    obj.price = SpuForm.price
    obj.attributes = attrs[i]
    return obj
  }))
  console.log(attrs, SpuForm.skus)
}

// const handleUploadSuccess = (...arr: any[]) => {
//   console.log(arr)
// }
// const handleUploadRemove = (res: string) => {
//   console.log(this, res)
// }

onMounted(() => {
  load()
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
