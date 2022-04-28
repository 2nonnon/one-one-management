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
      <!-- <el-table
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
      </el-table> -->
      <div class="goodlist_content">
        <el-card
          v-for="item in goodList"
          :key="item.id"
          class="goodlist_card"
          shadow="hover"
        >
          <el-checkbox
            :label="item.id"
            @change="handleCheckedGoodsChange"
          />
          <div class="card_image">
            <img
              :src="item.cover_url"
            >
          </div>
          <div class="card_content">
            <div class="card_content_item">
              <span>商品名称:</span>
              <span>{{ item.name }}</span>
            </div>
            <div class="card_content_item">
              <span>商品售价:</span>
              <span>{{ item.market_price }}</span>
            </div>
            <div class="card_content_item">
              <span>商品销量:</span>
              <span>{{ item.sold }}</span>
            </div>
            <div class="card_content_item">
              <span>商品库存:</span>
              <span>{{ item.total_stock }}</span>
            </div>
          </div>
          <div class="card_footer">
            <el-button
              type="primary"
              @click="handleToEdit(item.id)"
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              @click="handleDelete(item.id)"
            >
              删除
            </el-button>
          </div>
        </el-card>
        <div
          class="placeholder"
          v-for="i in ((pageSize - goodList.length) % 3)"
          :key="i"
        />
      </div>
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
import { ElMessageBox, ElMessage } from 'element-plus'

const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const goodList = reactive<IGood[]>([])
const columns = reactive<string[]>([])
const checkedGoods = reactive<number[]>([])

const load = (options: GetGoodsPageDto) => {
  goodService.getGoods(options).then((res) => {
    goodList.length = 0
    total.value = res.total
    goodList.push(...res.goods)
    columns.length = 0
    columns.push(...Object.keys(goodList[0]))
  })
}

const handleCheckedGoodsChange = (checked: boolean, e: {target: {value: string}}) => {
  const value = parseInt(e.target.value, 10)
  if (checked) {
    checkedGoods.push(value)
  } else {
    checkedGoods.splice(checkedGoods.indexOf(value), 1)
  }
  console.log(checkedGoods)
}

const handleToCreateGood = () => {
  router.push({
    path: '/good/create'
  })
}

const handleToEdit = (goodId: string) => {
  router.push({
    name: 'good-edit',
    params: {
      id: goodId
    }
  })
}
const handleDelete = (goodId: string) => {
  ElMessageBox.confirm(
    '正在删除，删除后不可恢复，确认删除？',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
      buttonSize: 'default'
    }
  )
    .then(async () => {
      await goodService.deleteGood(goodId)
      load({
        page_size: pageSize.value,
        current_page: currentPage.value
      })
      ElMessage({
        type: 'success',
        message: '删除成功'
      })
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '已取消删除'
      })
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
  gap: 25px;
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px -1px #dedfe0;
}
.goodlist_panel {
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}
.goodlist_content {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  // justify-content: space-evenly;
}
.goodlist_card {
  flex: 1 0 30%;
  cursor: pointer;
}
.placeholder {
  flex: 1 0 30%;
}
.card_image {
  width: 100%;
  position: relative;
  overflow: hidden;
  img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
  }
}
.card_image::after {
  content: '';
  display: block;
  width: 100%;
  padding-bottom: 100%;
}
.card_content {
  margin-top: 10px
}
.card_content_item {
  font-size: 16px;
  display: flex;
  gap: 10px;
  line-height: 1;
  span:first-child {
    flex: 0 0 auto;
  }
}
.card_content_item:not(:last-child) {
  margin-bottom: 5px;
}
.el-checkbox {
  height: auto;
}
</style>
