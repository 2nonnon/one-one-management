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
        <el-button
          type="primary"
          @click="handleCheckAll"
        >
          全选
        </el-button>
        <el-button
          type="primary"
          @click="handleUncheckAll"
        >
          全不选
        </el-button>
      </div>
      <div class="goodlist_content">
        <el-card
          v-for="item in goodList"
          :key="item.id"
          class="goodlist_card"
          shadow="hover"
        >
          <el-checkbox
            :label="item.id"
            v-model="item.checked"
          >
            {{}}
          </el-checkbox>
          <div
            class="card_image"
            @click="item.checked = !item.checked"
          >
            <img
              :src="item.cover_url"
            >
          </div>
          <div
            class="card_content"
            @click="item.checked = !item.checked"
          >
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
              plain
            >
              编辑
            </el-button>
            <el-button
              type="danger"
              @click="handleDelete(item.id)"
              plain
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
import { GetGoodsPageDto, IGood, Sort } from '../../../api/types/good.type'
import ListHeader from './ListHeader.vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessageBox, ElMessage } from 'element-plus'

interface checkGood extends IGood {
  checked: boolean
}

const route = useRoute()
const router = useRouter()
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)
const goodList = reactive<checkGood[]>([])

const load = (options: GetGoodsPageDto) => {
  goodService.getGoods(options).then((res) => {
    goodList.length = 0
    total.value = res.total
    goodList.push(...res.goods.map(item => {
      const res = item as checkGood
      res.checked = false
      return res
    }))
  })
}

const handleCheckAll = () => {
  goodList.forEach(good => {
    good.checked = true
  })
}
const handleUncheckAll = () => {
  goodList.forEach(good => {
    good.checked = false
  })
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

const generateConfig = (): GetGoodsPageDto => {
  const config = {} as GetGoodsPageDto
  config.current_page = currentPage.value
  config.page_size = pageSize.value
  const category = route.query.category as string | undefined
  const search = route.query.search as string | undefined
  const sort = route.query.sort as Sort | undefined
  if (category) config.category = parseInt(category, 10)
  if (search) config.search = search
  if (sort) config.sort = sort
  return config
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
      load(generateConfig())
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
  router.push({
    path: '/good/list',
    query: Object.assign({}, route.query, { page: currentPage.value })
  })
})

watch(() => route.query, () => {
  load(generateConfig())
})

onMounted(() => {
  load(generateConfig())
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
  width: 100%;
  // justify-content: space-evenly;
}
.goodlist_card {
  flex: 1 0 30%;
  cursor: pointer;
}
.goodlist_card :deep(.el-card__body) {
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
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
    height: 100%;
    object-fit: contain;
  }
}
.card_image::after {
  content: '';
  display: block;
  width: 100%;
  padding-bottom: 100%;
}
.card_content {
  flex: 1;
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
  margin-bottom: 7px;
}
.card_footer {
  display: flex;
  justify-content: space-around;
}
.el-checkbox {
  height: auto;
}
</style>
