<template>
  <div class="header_container">
    <div class="header_left">
      <toggle-side-bar />
      <breadcrumb />
    </div>
    <div class="header_right">
      <full-screen />
    </div>
  </div>
</template>

<script setup lang="ts">
import Breadcrumb from './Breadcrumb.vue'
import ToggleSideBar from './ToggleSideBar.vue'
import FullScreen from './FullScreen.vue'
</script>

<style scoped lang="scss">
.header_container {
  justify-content: space-between;
  height: 100%;
}
.header_container,
.header_left,
.header_right {
  display: flex;
  align-items: center;
}
.header_left,
.header_right{
  gap: 0 10px
}
</style>
