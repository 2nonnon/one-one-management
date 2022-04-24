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
      @input="handleInput"
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

withDefaults(defineProps<{modelValue: string, text: string, size?: Size}>(), { size: Size.SMALL })

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

const emit = defineEmits(['update:modelValue', 'input-confirm'])

const handleInput = () => {
  emit('update:modelValue', inputValue.value)
}

const handleInputConfirm = () => {
  if (inputValue.value) {
    emit('input-confirm')
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
