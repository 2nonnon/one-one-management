<template>
  <el-upload
    action="#"
    list-type="picture-card"
    :auto-upload="false"
    :limit="limit"
    :file-list="fileList"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div>
        <img
          class="el-upload-list__item-thumbnail"
          :src="file.url"
          alt=""
        >
        <span class="el-upload-list__item-actions">
          <span
            class="el-upload-list__item-preview"
            @click="handlePictureCardPreview(file)"
          >
            <el-icon><zoom-in /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleDownload(file)"
          >
            <el-icon><Download /></el-icon>
          </span>
          <span
            v-if="!disabled"
            class="el-upload-list__item-delete"
            @click="handleRemove(file)"
          >
            <el-icon><Delete /></el-icon>
          </span>
        </span>
      </div>
    </template>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img
      width="100%"
      :src="dialogImageUrl"
      alt=""
    >
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Download, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadUserFile } from 'element-plus'

defineProps<{limit: number}>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = ref<UploadUserFile[]>([])

const handleRemove = (file: UploadFile) => {
  console.log(file, fileList)
}

const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleDownload = (file: UploadFile) => {
  console.log(file)
}
</script>
