<template>
  <div class="tagtree_container">
    <div class="tagtree_header">
      <add-tag-button
        v-model="name"
        :size="Size.LARGE"
        :text="levelOne"
        @input-confirm="handleInputConfirm(0)"
      />
    </div>
    <div class="tagtree_body">
      <div
        class="tag_container"
        v-for="item in data"
        :key="item.id"
      >
        <div class="tag_parent">
          <el-tag
            closable
            size="large"
            :disable-transitions="false"
            @close="handleClose(item.id)"
          >
            {{ item.name }}
          </el-tag>
        </div>
        <div class="tag_children">
          <el-tag
            v-for="child in item.children"
            :key="child.id"
            :type="typeRandom(typeArr)"
            closable
            :disable-transitions="false"
            @close="handleClose(child.id)"
          >
            {{ child.name }}
          </el-tag>
          <add-tag-button
            :text="levelTwo"
            v-model="name"
            @input-confirm="handleInputConfirm(item.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AddTagButton from './AddTagButton.vue'
import { Size } from '../../../types/size.enum'
import { ref } from 'vue'

const name = ref('')

interface Tree {
    id: number,
    name: string,
    parentId: number,
    children?: Tree[]
}

type Props = {
    data: Tree[]
    levelOne?: string
    levelTwo?: string
}

withDefaults(defineProps<Props>(), { levelOne: '一级分类', levelTwo: '二级分类' })

enum Types {
    SUCCESS = 'success',
    Danger = 'danger',
    WARNING = 'warning',
    INFO = 'info',
}

function enumToArray <T> (source: T): string[] {
  return Object.values(source)
}

const typeArr = enumToArray(Types)

const typeRandom = (arr: any[]) => {
  const rand = Math.floor(Math.random() * arr.length)
  return arr[rand]
}

const emit = defineEmits(['add-item', 'delete-item'])

const handleClose = (id: number) => {
  emit('delete-item', id)
}
const handleInputConfirm = (parentId: number) => {
  emit('add-item', name.value, parentId)
}
</script>

<style scoped lang="scss">
.tagtree_header {
  padding: 20px 0;
  border-bottom: 2px solid #f4f4f5;
}
.tagtree_body {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.tag_container {
    padding: 20px 0;
}
.tag_container + .tag_container {
    border-top: 2px solid #f4f4f5;
}
.tag_parent {
    margin-bottom: 15px;
}
.tag_children {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
}
</style>
