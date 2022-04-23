<template>
  <div
    class="wrapper"
    ref="wrapper"
  >
    <el-input
      class="tag_input"
      v-if="inputVisible"
      ref="InputRef"
      v-model="inputValue"
      :size="size"
      @keyup.enter="handleInputConfirm"
      @blur="handleInputConfirm"
    />
    <el-button
      v-else
      :size="size"
      @click="showInput"
      type="primary"
      ref="ButtonRef"
      plain
      :icon="Plus"
    >
      {{ text }}
    </el-button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, reactive, ref } from 'vue'
import type { ElInput } from 'element-plus'
import { Size } from '../../../types/size.enum'
import { Plus } from '@element-plus/icons-vue'

const props = withDefaults(defineProps<{parentId?: number, text: string, size?: Size}>(), { parentId: 0, size: Size.SMALL })

const inputValue = ref('')
const inputVisible = ref(false)
const InputRef = ref<InstanceType<typeof ElInput>>()
const wrapper = ref<HTMLDivElement>()
const inputWidth = reactive<{value: string}>({
  value: ''
})

const showInput = () => {
  inputVisible.value = true
  nextTick(() => {
    InputRef.value!.input!.focus()
  })
}

const emit = defineEmits(['input-confirm'])

const handleInputConfirm = async () => {
  if (inputValue.value) {
    emit('input-confirm', inputValue.value, props.parentId)
  }
  inputVisible.value = false
  inputValue.value = ''
}
onMounted(() => {
  inputWidth.value = `${wrapper.value?.offsetWidth}px`
})
</script>

<style scoped lang="scss">
.wrapper {
    display: inline-flex;
}
.tag_input {
    width: v-bind('inputWidth.value');
}
</style>
