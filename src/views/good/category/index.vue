<template>
  <div class="category_container">
    <tag-tree
      :data="data"
      @add-item="handleAddItem"
      @delete-item="handleDeleteItem"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { categoryService } from '../../../api/category'
import { ICategories } from '../../../api/types/category'
import { ElMessage, ElMessageBox } from 'element-plus'
import TagTree from './TagTree.vue'

const data = reactive<ICategories[]>([])

const load = () => {
  categoryService.getCategories().then((res) => {
    data.length = 0
    data.push(...res)
  })
}

const handleAddItem = async (name: string, parentId: number) => {
  await categoryService.createCategory({
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
      await categoryService.deleteCategory(id)
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
.category_container {
  border: 3px solid #f4f4f5;
  border-radius: 20px;
  padding: 10px 30px;
  background-color: #fff;
}
</style>
