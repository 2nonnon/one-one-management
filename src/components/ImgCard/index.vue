<template>
  <div
    class="img-card_container"
    v-if="imgVisible"
  >
    <img
      :src="url"
      alt=""
    >
    <span class="img-card__item-actions">
      <span
        class="img-card__item-preview"
        @click="handlePictureCardPreview(url)"
      >
        <el-icon><zoom-in /></el-icon>
      </span>
      <span
        v-if="!disabled"
        class="img-card__item-delete"
        @click="handleRemove(url)"
      >
        <el-icon><Delete /></el-icon>
      </span>
    </span>
  </div>

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
import { Delete, ZoomIn } from '@element-plus/icons-vue'

defineProps<{url: string}>()

const emit = defineEmits(['remove-img'])

const imgVisible = ref(true)
const dialogImageUrl = ref('')
const dialogVisible = ref(false)
const disabled = ref(false)

const handleRemove = (url: string) => {
  console.log(url)
  imgVisible.value = false
  emit('remove-img', url)
}

const handlePictureCardPreview = (url: string) => {
  dialogImageUrl.value = url!
  dialogVisible.value = true
}
</script>

<style scoped lang="scss">
.img-card_container {
  background-color: #fff;
  border-radius: 6px;
  box-sizing: border-box;
  width: 146px;
  height: 146px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.img-card__item-actions {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    cursor: default;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    opacity: 0;
    font-size: 20px;
    background-color: var(--el-overlay-color-lighter);
    transition: opacity var(--el-transition-duration);
    span + span {
        margin-left: 1em;
    }
    span {
        cursor: pointer;
        display: none;
    }
}
.img-card__item-actions:hover {
    opacity: 1;
    span {
        cursor: pointer;
        display: inline-block;
    }
}
.dialog_img {
  width: 100%;
}
</style>
