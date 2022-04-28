<template>
  <div class="create-container">
    <div class="create-container_header">
      <div class="tabbar">
        <div
          class="tabbar-item"
          v-for="item in tab"
          :key="item.name"
          :class="{active: item.component === currentComponent}"
          @click="handleTab(item)"
        >
          {{ item.name }}
        </div>
      </div>
    </div>
    <div class="create-container_body">
      <Suspense>
        <template #default>
          <keep-alive>
            <component :is="currentComponent" />
          </keep-alive>
        </template>
      </Suspense>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineAsyncComponent, markRaw, reactive, shallowRef } from 'vue'

const SpuInfo = defineAsyncComponent(() => import('./SpuInfo.vue'))
const SkuInfo = defineAsyncComponent(() => import('./SkuInfo.vue'))

const currentComponent = shallowRef(SpuInfo)

interface TabItem {
  name: string
  component: any
}

const tab = reactive<TabItem[]>([{ name: '基本信息', component: markRaw(SpuInfo) }, { name: '规格信息', component: markRaw(SkuInfo) }])

const handleTab = (item: TabItem) => {
  currentComponent.value = item.component
}
</script>

<style scoped lang="scss">
.create-container {
  padding: 10px;
}
.create-container_header {
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px 10px 0 0;
  padding: 10px;
  padding-top: 30px;
}
.tabbar {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  transition: all .3s;
  gap: 30px;
}
.tabbar-item {
  position: relative;
}
.tabbar-item.active,
.tabbar-item:hover {
  color: var(--el-color-primary)
}
.tabbar-item.active::after {
  content: '';
  display: block;
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: var(--el-color-primary);
}
.create-container_body {
  background-color: #fff;
  border-radius: 0 0 10px 10px;
  padding: 20px;
}
</style>
