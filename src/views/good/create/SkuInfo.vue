<template>
  <div class="spu_form">
    <el-form
      :model="SpuForm"
      label-width="120px"
    >
      <el-form-item label="商品规格">
        <el-radio-group v-model="SpuForm.tag">
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
        <el-button @click="handleGenerate">
          立即生成
        </el-button>
      </el-form-item>
      <el-form-item label="详细信息">
        <template
          v-for="item in SkuForm"
          :key="item.attributes.map(a => a.name).join('-')"
        >
          <el-form
            :model="item"
            label-width="120px"
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
              <upload :limit="1" />
            </el-form-item>
          </el-form>
        </template>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { useStore } from '../../../store/store'
import { attributeService } from '../../../api/attribute'
import Upload from '../../../components/Upload/index.vue'
import { IAttributes } from '../../../api/types/Attribute'
import { ISku } from '../../../api/types/good'

const result: any[] = []
const attributes = reactive<IAttributes[]>([])
const store = useStore()
const SpuForm = store.createGoodDto
const SkuForm = reactive<ISku[]>([])

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
  SkuForm.length = 0
  const attrs = cartesianProduct(result)
  SkuForm.push(...Array.from({ length: attrs.length }, (_, i) => {
    const obj = {} as ISku
    obj.attributes = attrs[i]
    return obj
  }))
  console.log(attrs, SkuForm)
}

onMounted(() => {
  load()
})
</script>

<style scoped lang="scss">
.el-button {
  margin-left: 12px;
}
</style>
