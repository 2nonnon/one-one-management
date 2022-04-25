<template>
  <el-upload
    action="http://localhost:5091/upload/file"
    :headers="{
      Authorization: `Bearer ${store.accessToken}`
    }"
    name="pic"
    list-type="picture-card"
    :auto-upload="true"
    :limit="limit"
    :file-list="fileList"
    @success="handleSuccess"
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
import { reactive, ref } from 'vue'
import { Delete, Plus, ZoomIn } from '@element-plus/icons-vue'
import type { UploadFile, UploadUserFile } from 'element-plus'
import { useStore } from '../../store/store'

const store = useStore()

defineProps<{limit: number}>()

const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)
const fileList = reactive<UploadUserFile[]>([])

const emit = defineEmits(['success', 'remove'])

const handleRemove = (file: UploadFile) => {
  console.log(file, fileList)
  emit('remove', file.response)
  const index = fileList.findIndex(item => item.uid === file.uid)
  fileList.splice(index, 1)
}

const handlePictureCardPreview = (file: UploadFile) => {
  console.log(file.url)
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}

const handleSuccess = (res: any) => {
  emit('success', res)
}
</script>

<style scoped lang="scss">
.dialog_img {
  width: 100%;
}
</style>
