<template>
  <div class="orderlist-container">
    <list-header />
    <div class="orderlist-body">
      <div class="orderlist-panel">
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
      <div class="orderlist-content">
        <el-card
          v-for="item in data"
          :key="item.id"
          class="orderlist-card"
          shadow="hover"
        >
          <el-checkbox
            :label="item.id"
            v-model="item.checked"
          >
            {{}}
          </el-checkbox>
          <div
            class="order-detail_list"
            @click="item.checked = !item.checked"
          >
            <div
              class="order-detail_card"
              v-for="good in item.orderDetails"
              :key="good.id"
            >
              <div
                class="card-image"
              >
                <img
                  :src="good.cover_url"
                >
              </div>
              <div
                class="card-content"
              >
                <div class="card-content_item">
                  <span>{{ good.name }}</span>
                  <span class="card-content_attr">{{ good.attr }}</span>
                </div>
                <div class="card-content_item">
                  <span>{{ `￥${good.paid}` }}</span>
                </div>
                <div class="card-content_item">
                  <span>{{ `x${good.quantity}` }}</span>
                </div>
              </div>
            </div>
          </div>
          <div
            class="orderlist-card_total"
            @click="item.checked = !item.checked"
          >
            {{ `￥${item.paid}` }}
          </div>
          <div class="orderlist-card_detail">
            <span class="orderlist-card_status">{{ statusMap[item.status] }}</span>
            <span @click="handleToOrderDetail(item.id)">订单详情</span>
          </div>
        </el-card>
      </div>
      <el-pagination
        class="orderlist-pagination"
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
import { orderService } from '../../../api/order'
import { GetOrdersPageDto, IOrder, OrderStatus } from '../../../api/types/order.type'
import ListHeader from './ListHeader.vue'
import { useRoute, useRouter } from 'vue-router'

const statusMap = {
  [OrderStatus.HAS_CLOSED]: '已关闭',
  [OrderStatus.TO_DEAL]: '未收货',
  [OrderStatus.TO_PAID]: '未支付',
  [OrderStatus.TO_SEND]: '未发货',
  [OrderStatus.TO_SERVICE]: '售后'
}

interface CheckOrder extends IOrder {
  checked: boolean
}

const route = useRoute()
const router = useRouter()
const data = reactive<CheckOrder[]>([])
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)

const load = (options: GetOrdersPageDto) => {
  orderService.getOrdersPage(options).then((res) => {
    data.length = 0
    total.value = res.total
    data.push(...res.orders.map(item => {
      const res = item as CheckOrder
      res.checked = false
      return res
    }))
    console.log(data)
  })
}

const handleCheckAll = () => {
  data.forEach(item => {
    item.checked = true
  })
}
const handleUncheckAll = () => {
  data.forEach(item => {
    item.checked = false
  })
}

const handleToOrderDetail = (id: number) => {
  router.push({
    name: 'order-detail',
    params: {
      id
    }
  })
}

const generateConfig = (): GetOrdersPageDto => {
  const config = {} as GetOrdersPageDto
  config.current_page = currentPage.value
  config.page_size = pageSize.value
  if (route.query.status) config.status = route.query.status as OrderStatus
  return config
}

watch(currentPage, () => {
  router.push({
    path: '/order/list',
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
.orderlist-body {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 25px;
  background-color: #fff;
  padding: 30px 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 5px -1px #dedfe0;
}
.orderlist-panel {
  padding: 0 20px;
  width: 100%;
  box-sizing: border-box;
}
.orderlist-content {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
.orderlist-card {
  cursor: pointer;
  border-radius: 10px;
}
.orderlist-card :deep(.el-card__body) {
  box-sizing: border-box;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 10px;
}
.order-detail_list {
  flex: 1;
}
.order-detail_card {
  display: flex;
  height: 100px;
}
.order-detail_card:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.card-image {
  height: 100px;
  width: 100px;
  margin-right: 8px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.card-content {
  flex: 1;
  display: flex;
  gap: 10px;
}
.card-content_item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 16px;
  &:first-child {
    flex-grow: 0;
    justify-content: space-between;
    padding: 5px 0;
  }
}
.card-content_attr {
  font-size: .9em;
  align-self: flex-start;
}
.orderlist-card_right {
  display: flex;
}
.orderlist-card_total,
.orderlist-card_detail {
  min-height: 100px;
  width: 100px;
  font-size: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.orderlist-card_detail {
  flex-direction: column;
  gap: 10px;
}
.orderlist-card_total {
  font-size: 20px;
}
.el-checkbox {
  height: 100px;
}
</style>
