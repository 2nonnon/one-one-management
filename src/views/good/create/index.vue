<template>
  <div class="create_container">
    <div class="create_header">
      <el-steps
        :active="active"
        finish-status="success"
        align-center
      >
        <el-step title="Step 1" />
        <el-step title="Step 2" />
        <el-step title="Step 3" />
      </el-steps>
    </div>
    <div class="create_body">
      <router-view />
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
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const active = ref(0)
const map = ['create-spu', 'create-sku']

const hanldeToPre = () => {
  if (active.value-- < 0) return
  router.push({
    name: map[active.value]
  })
}
const hanldeToNext = () => {
  if (active.value++ > 2) return
  router.push({
    name: map[active.value]
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
