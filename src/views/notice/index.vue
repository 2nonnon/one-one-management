<template>
  <div class="notice-container">
    <div class="notice-header">
      <el-button
        type="primary"
        @click="dialogFormVisible = true"
      >
        新增公告图
      </el-button>
    </div>
    <div class="notice-body">
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
          label="图片"
          width="120"
        >
          <template #default="scope">
            <el-image
              style="width: 100px; height: 100px"
              :src="scope.row.url"
              fit="contain"
            />
          </template>
        </el-table-column>
        <el-table-column
          property="position"
          label="位置"
          width="120"
        />
      </el-table>
    </div>
    <el-dialog
      v-model="dialogFormVisible"
      title="新增公告图"
    >
      <el-form :model="form">
        <el-form-item
          label="公告位置"
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.position"
            autocomplete="off"
          />
        </el-form-item>
        <el-form-item
          label="公告图"
          :label-width="formLabelWidth"
        >
          <upload
            :limit="1"
            @success="handleSuccess"
            @remove="handleRemove"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取消</el-button>
          <el-button
            type="primary"
            @click="handleCreateNotice"
          >确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { noticeService } from '../../api/notice'
import { INotice } from '../../api/types/notice.type'
import Upload from '../../components/Upload/index.vue'
import type { ElTable } from 'element-plus'

const multipleTableRef = ref<InstanceType<typeof ElTable>>()

const data = reactive<INotice[]>([])
const form = reactive({} as INotice)
const dialogFormVisible = ref(false)
const formLabelWidth = '100px'

const handleSuccess = (res: string) => {
  form.url = res
}
const handleRemove = () => {
  form.url = ''
}

const handleSelectionChange = (...arr: any[]) => {
  console.log(arr)
}

const handleCreateNotice = () => {
  noticeService.createNotice(form).then(res => {
    dialogFormVisible.value = false
    console.log(res)
    loadNotices()
  })
}

const loadNotices = () => {
  noticeService.getNotices().then(res => {
    console.log(res)
    data.length = 0
    data.push(...res)
  })
}

onMounted(() => {
  loadNotices()
})
</script>

<style scoped lang="scss">
.notice-container {
  border: 3px solid #f4f4f5;
  border-radius: 20px;
  min-height: 100%;
  padding: 10px 30px;
  background-color: #fff;
  box-sizing: border-box;
}
</style>
