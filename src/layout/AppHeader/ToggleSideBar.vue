<template>
  <div
    class="header_toggle-icon"
    @click="handleCollapse"
  >
    <el-icon v-if="store.isCollapse">
      <expand />
    </el-icon>
    <el-icon v-else>
      <fold />
    </el-icon>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '../../store/store'
import { Expand, Fold } from '@element-plus/icons-vue'

const store = useStore()
const handleCollapse = () => {
  store.toggleCollapse()
}
</script>

<style scoped lang="scss">
.header_toggle-icon {
  display: flex;
  align-items: center;
}
</style>
