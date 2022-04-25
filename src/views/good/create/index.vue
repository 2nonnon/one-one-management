<template>
  <div class="create_container">
    <div class="create_header" />
    <div class="create_body">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </div>
  </div>
  <div class="creater_footer">
    <el-button
      @click="hanldeToPre"
      type="primary"
      plain
      size="large"
    >
      Pre step
    </el-button>
    <el-button
      @click="hanldeToNext"
      type="primary"
      plain
      size="large"
    >
      Next step
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const hanldeToPre = () => {
  router.push({
    name: 'create-spu'
  })
}
const hanldeToNext = () => {
  router.push({
    name: 'create-sku'
  })
}
</script>

<style scoped lang="scss">
.create_header {
  padding: 40px 0;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.el-steps {
  background-color: inherit;
}
.create_body {
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.creater_footer {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
}
</style>
