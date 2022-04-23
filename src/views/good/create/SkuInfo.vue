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
      <el-form-item>
        <tag-tree
          :data="attrs"
          @add-item="handleAddItem"
          @delete-item="handleDeleteItem"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { useStore } from '../../../store/store'
import TagTree from '../category/TagTree.vue'

const attrs = reactive<any[]>([])
const store = useStore()
const SpuForm = store.createGoodDto

const handleAddItem = () => {
  console.log('add')
}
const handleDeleteItem = () => {
  console.log('delete')
}
</script>

<style scoped lang="scss">
</style>
