<template>
  <div>
    category
  </div>
</template>

<script setup lang="ts">
import { categoryService } from '../../../api/category'

categoryService.getCategories().then((res) => {
  console.log(res)
})
</script>

<style scoped lang="scss">

</style>
