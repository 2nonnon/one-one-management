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
      ref="cascader"
    >
      <template #default="{ node }">
        <span>{{ nodeValue(node, attrs as number[]) }}</span>
      </template>
    </el-cascader>
    <el-button
      class="generate_btn"
      @click="handleGenerate(result)"
    >
      立即生成
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { ElCascader } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { attributeService } from '../../../api/attribute'
import { IAttributes } from '../../../api/types/Attribute'
import { CreateSkuDto } from '../../../api/types/good'

const emit = defineEmits(['generate-skus'])

const attributes = reactive<IAttributes[]>([])

defineProps<{attrs?: number[]}>()

// 初始化级联选择器，手动激活商品已有分类
const cascader = ref<typeof ElCascader | null>(null)
const nodeValue = (node: any, currentNodes: number[]): boolean => {
  if (!node.isLeaf && currentNodes?.includes(node.value)) {
    // if (!node.checked && !node.indeterminate) node.indeterminate = true
    node.children.forEach((child: any) => {
      if (currentNodes?.includes(child.value) && !child.checked) {
        cascader.value?.handleSuggestionClick(child)
      }
    })
  }
  return node.label
}

const load = () => {
  attributeService.getAttributes().then((res) => {
    attributes.length = 0
    attributes.push(...res)
  })
}

const result = reactive<any[]>([])
const handleAttributesChange = (value: [number, number][]) => {
  result.length = 0
  result.push(...value)
  console.log(result)
}

const getTree = (source: [number, number][]) => {
  const map = new Map<number, [number, number][]>()
  source.forEach(item => {
    if (!map.has(item[0])) {
      map.set(item[0], [item])
    } else {
      map.get(item[0])!.push(item)
    }
  })
  const res: any[] = []
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
      res.push(tmp)
    }
  })
  return res
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

const handleGenerate = (source: any[]) => {
  if (source.length === 0) return
  const tree = getTree(source)
  const attrs = cartesianProduct(tree)
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
