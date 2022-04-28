<template>
  <el-upload
    :action="`${store.baseUrl}/upload/file`"
    :headers="{
      Authorization: `Bearer ${store.accessToken}`
    }"
    name="pic"
    list-type="picture-card"
    :auto-upload="true"
    :limit="limit"
    :file-list="files"
    @success="handleSuccess"
    class="upload_container"
    :disabled="limit === files.length"
  >
    <el-icon><Plus /></el-icon>

    <template #file="{ file }">
      <div class="el-upload-list__item-container">
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
      class="dialog_img"
      :src="dialogImageUrl"
      alt=""
    >
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadUserFile } from 'element-plus'
import { useStore } from '../../store/store'

const store = useStore()

withDefaults(defineProps<{limit?: number, files: UploadUserFile[]}>(), {
  limit: 5,
  files: () => [] as UploadUserFile[]
})

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const emit = defineEmits(['success', 'remove'])

const handleRemove = (file: UploadFile) => {
  emit('remove', `${store.baseUrl}${file.response}`)
}

const handlePictureCardPreview = (file: UploadFile) => {
  console.log(file.url)
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleSuccess = (res: any) => {
  emit('success', `${store.baseUrl}${res}`)
}
</script>

<style scoped lang="scss">
.dialog_img {
  width: 100%;
}
.upload_container :deep(.el-upload-list__item) {
  justify-content: center;
}
.el-upload-list__item-container {
  width: 100%;
  height: 100%;
}
</style>
