<template>
  <div>
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
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { attributeService } from '../../../api/attribute'
import { IAttributes } from '../../../api/types/Attribute'
import { CreateSkuDto } from '../../../api/types/good'

const emit = defineEmits(['generate-skus'])

const attributes = reactive<IAttributes[]>([])

const load = () => {
  attributeService.getAttributes().then((res) => {
    attributes.length = 0
    attributes.push(...res)
  })
}

const result: any[] = []
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
  if (result.length === 0) return
  const attrs = cartesianProduct(result)
  const data = Array.from({ length: attrs.length }, (_, i) => {
    const obj = {} as CreateSkuDto
    obj.name = attrs[i].filter((item: any) => item.parentId !== 0).map((item: any) => item.name).join('-')
    obj.attributes = attrs[i]
    return obj
  })
  emit('generate-skus', data)
}

onMounted(() => {
  load()
})
</script>

<style scoped lang="scss">
.generate_btn {
  margin-left: 12px;
}
</style>
