<template>
  <div class="admin-container">
    <div class="admin-header">
      <el-button
        type="primary"
        @click="handleClick"
      >
        新增管理员
      </el-button>
    </div>
    <div class="admin-body">
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
          property="account"
          label="账号"
        />
        <el-table-column
          property="name"
          label="名字"
        />
        <el-table-column
          property="level"
          label="级别"
        />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button
              type="primary"
              @click="handleEdit(scope.row)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              @click="handleDelete(scope.row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="新增管理员"
    >
      <el-form :model="form">
        <el-form-item
          label="账号"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.account"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="名字"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.name"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="级别"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.level"
            autocomplete="off"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleConfirm"
          >确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import type { ElTable } from 'element-plus'
import { adminService } from '../../../api/admin'
import { CreateAdminDto, IAdmin } from '../../../api/types/admin.type'

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

const data = reactive<IAdmin[]>([])
const form = ref()
const dialogFormVisible = ref(false)
const formLabelWidth = '100px'

const handleSelectionChange = (...arr: any[]) => {
  console.log(arr)
}

const handleClick = () => {
  dialogFormVisible.value = true
  form.value = {} as CreateAdminDto
}

const handleEdit = (item: IAdmin) => {
  dialogFormVisible.value = true
  form.value = item
}

const handleDelete = (item: IAdmin) => {
  adminService.deleteAdmin(item.id).then(() => {
    loadAdmins()
  })
}

const handleUpdateAdmin = () => {
  console.log(form.value.id)
  adminService.updateAdmin(form.value.id, form.value).then(res => {
    dialogFormVisible.value = false
    console.log(res)
    loadAdmins()
  })
}

const handleCreateAdmin = () => {
  adminService.createAdmin(form.value).then(res => {
    dialogFormVisible.value = false
    console.log(res)
    loadAdmins()
  })
}

const handleConfirm = () => {
  if (form.value.id) handleUpdateAdmin()
  else handleCreateAdmin()
}

const loadAdmins = () => {
  adminService.getAdmins().then(res => {
    console.log(res)
    data.length = 0
    data.push(...res)
  })
}

onMounted(() => {
  loadAdmins()
})
</script>

<style scoped lang="scss">
.admin-container {
  border: 3px solid #f4f4f5;
  border-radius: 20px;
  min-height: 100%;
  padding: 10px 30px;
  background-color: #fff;
  box-sizing: border-box;
}
.admin-header {
  padding: 30px;
}
.admin-body {
  border: 1px solid #f4f4f5;
}
</style>
