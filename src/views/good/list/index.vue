<template>
  <div class="goodlist_container">
    <list-header />
    <div class="goodlist_body">
      <div class="goodlist_panel">
        <el-button
          type="primary"
          @click="handleToCreateGood"
        >
          新增商品
        </el-button>
      </div>
      <el-table
        class="goodlist_table"
        ref="multipleTableRef"
        :data="goodList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
        />
        <el-table-column
          v-for="item in columns"
          :key="item"
          :property="item"
          :label="item"
        />
        <el-table-column
          label="Operations"
        >
          <template #default="scope">
            <el-button
              size="small"
              @click="handleEdit(scope.$index, scope.row)"
            >
              Edit
            </el-button>
            <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
            >
              Delete
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="goodlist_pagination"
        background
        :page-size="pageSize"
        v-model:current-page="currentPage"
        layout="prev, pager, next"
        :total="total"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import { goodService } from '../../../api/good'
import { GetGoodsPageDto, IGood } from '../../../api/types/good'
import ListHeader from './ListHeader.vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const goodList = reactive<IGood[]>([])
const columns = reactive<string[]>([])

const load = (options: GetGoodsPageDto) => {
  goodService.getGoods(options).then((res) => {
    goodList.length = 0
    total.value = res.total
    goodList.push(...res.goods)
    columns.length = 0
    columns.push(...Object.keys(goodList[0]))
  })
}

const handleSelectionChange = (...params: any[]) => {
  console.log(params)
}

const handleEdit = (index: any, row: any) => {
  console.log(index, row)
}
const handleDelete = (index: any, row: any) => {
  console.log(index, row)
}
const handleToCreateGood = () => {
  router.push({
    path: '/good/create'
  })
}

watch(currentPage, () => {
  load({
    page_size: pageSize.value,
    current_page: currentPage.value
  })
})

onMounted(() => {
  load({
    page_size: pageSize.value,
    current_page: currentPage.value
  })
})
</script>

<style scoped lang="scss">
.goodlist_body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
      box-shadow: 0px 0px 5px -1px #dedfe0;
}
</style>
