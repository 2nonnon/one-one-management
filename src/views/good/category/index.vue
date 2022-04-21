<template>
  <div class="category_container">
    <div class="category_header">
      <add-tag-button
        :size="Size.LARGE"
        text="一级分类"
        @category-change="load()"
      />
    </div>
    <div class="category_body">
      <tag-tree
        v-for="item in data"
        :key="item.id"
        :data="item"
        @category-change="load()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { categoryService } from '../../../api/category'
import { ICategories } from '../../../api/types/category'
import TagTree from './TagTree.vue'
import AddTagButton from './AddTagButton.vue'
import { Size } from '../../../types/size.enum'

const data = reactive<ICategories[]>([])

const load = () => {
  categoryService.getCategories().then((res) => {
    data.length = 0
    data.push(...res)
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
}
.category_header {
  padding: 20px 0;
  border-bottom: 2px solid #f4f4f5;
}
.category_body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>
