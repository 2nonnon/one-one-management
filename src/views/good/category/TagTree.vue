<template>
  <div class="tag_container">
    <div class="tag_parent">
      <el-tag
        closable
        size="large"
        :disable-transitions="false"
        @close="handleClose(data.id)"
      >
        {{ data.name }}
      </el-tag>
    </div>
    <div class="tag_children">
      <el-tag
        v-for="item in data.children"
        :key="item.id"
        :type="typeRandom(typeArr)"
        closable
        :disable-transitions="false"
        @close="handleClose(item.id)"
      >
        {{ item.name }}
      </el-tag>
      <add-tag-button
        :parent-id="data.id"
        text="二级分类"
        @category-change="emit('category-change')"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ICategories } from '../../../api/types/category'
import { categoryService } from '../../../api/category'
import AddTagButton from './AddTagButton.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

type Props = {
    data?: ICategories
}

defineProps<Props>()

enum Types {
    SUCCESS = 'success',
    Danger = 'danger',
    WARNING = 'warning',
    INFO = 'info',
}

function enumToArray <T> (source: T): string[] {
  return Object.values(source)
}

const typeArr = enumToArray(Types)

const typeRandom = (arr: any[]) => {
  const rand = Math.floor(Math.random() * arr.length)
  return arr[rand]
}

const emit = defineEmits(['category-change'])

const handleClose = (id: number) => {
  ElMessageBox.confirm(
    '正在删除分类，删除后不可恢复，确认删除？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      buttonSize: 'default'
    }
  )
    .then(async () => {
      await categoryService.deleteCategory(id)
      emit('category-change')
      ElMessage({
        type: 'success',
        message: '删除分类成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
    })
}
</script>

<style scoped lang="scss">
.tag_container {
    padding: 20px 0;
}
.tag_container + .tag_container {
    border-top: 2px solid #f4f4f5;
}
.tag_parent {
    margin-bottom: 15px;
}
.tag_children {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}
</style>
