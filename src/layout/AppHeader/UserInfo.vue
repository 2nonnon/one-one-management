<template>
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ store.username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item>个人中心</el-dropdown-item>
        <el-dropdown-item @click="handleLogout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from '../../store/store'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useStore()

const handleLogout = () => {
  ElMessageBox.confirm(
    '即将退出系统，是否确认退出？',
    '提示',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    }
  )
    .then(() => {
      ElMessage({
        type: 'success',
        message: '退出成功'
      })
      store.$reset()
      router.push({
        path: '/login'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消退出'
      })
    })
}
</script>

<style scoped lang="scss">
.el-dropdown-link {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
