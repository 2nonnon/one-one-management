<template>
  <div class="attribute_container">
    <tag-tree
      :data="data"
      @add-item="handleAddItem"
      @delete-item="handleDeleteItem"
      level-one="规格名"
      level-two="规格值"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { attributeService } from '../../../api/attribute'
import { ElMessageBox, ElMessage } from 'element-plus'
import { IAttributes } from '../../../api/types/Attribute'
import TagTree from '../category/TagTree.vue'

const data = reactive<IAttributes[]>([])

const load = () => {
  attributeService.getAttributes().then((res) => {
    data.length = 0
    data.push(...res)
  })
}

const handleAddItem = async (name: string, parentId: number) => {
  await attributeService.createAttribute({
    name,
    parentId
  })
  load()
}
const handleDeleteItem = (id: number) => {
  ElMessageBox.confirm(
    '正在删除，删除后不可恢复，确认删除？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      buttonSize: 'default'
    }
  )
    .then(async () => {
      await attributeService.deleteAttribute(id)
      load()
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}

onMounted(() => {
  load()
})
</script>

<style scoped lang="scss">
.attribute_container {
  border: 3px solid #f4f4f5;
  border-radius: 20px;
  padding: 10px 30px;
  background-color: #fff;
}
</style>
