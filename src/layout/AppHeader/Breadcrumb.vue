<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item
      v-for="item in routes"
      :key="item.path"
      :to="{ path: item.path }"
    >
      {{ item.meta.title }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script lang="ts" setup>
import { ArrowRight } from '@element-plus/icons-vue'
import { useRoute } from 'vue-router'
import { computed } from '@vue/reactivity'

const route = useRoute()
const routes = computed(() => {
  return route.matched.filter(item => item.meta.title)
})
</script>
