<template>
  <div class="user-container">
    <div class="user-body">
      <el-table
        ref="multipleTableRef"
        :data="data"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column
          label="头像"
        >
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.profile"
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column
          property="username"
          label="用户名"
        />
        <el-table-column
          property="account"
          label="账号"
        />
        <el-table-column
          property="openid"
          label="openid"
        />
      </el-table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { ElTable } from 'element-plus'
import { userService } from '../../../api/user'

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

const data = reactive<any[]>([])

const handleSelectionChange = (...arr: any[]) => {
  console.log(arr)
}

const loadUsers = () => {
  userService.getAllUser().then(res => {
    console.log(res)
    data.length = 0
    data.push(...res)
  })
}

onMounted(() => {
  loadUsers()
})
</script>

<style scoped lang="scss">
.user-container {
  border: 3px solid #f4f4f5;
  border-radius: 20px;
  min-height: 100%;
  padding: 10px 30px;
  background-color: #fff;
  box-sizing: border-box;
}
.user-body {
  border: 1px solid #f4f4f5;
}
</style>
