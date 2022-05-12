<template>
  <div class="list-header">
    <div class="list-header_title">
      数据筛选
    </div>
    <div class="list-header_content">
      <div class="list-header_item">
        <div class="item_title">
          订单搜索
        </div>
        <el-input
          class="list_search"
          v-model="search"
          placeholder="搜索订单号"
          :prefix-icon="Search"
        />
        <el-button
          type="primary"
          @click="handleSearch"
        >
          搜索
        </el-button>
      </div>
      <div class="list-header_item">
        <div class="item_title">
          订单状态
        </div>
        <el-select
          v-model="status"
          placeholder="全部订单"
          size="default"
        >
          <el-option
            label="全部订单"
            value=""
          />
          <el-option
            v-for="item in statusItems"
            :key="item"
            :label="statusMap[item]"
            :value="item"
          />
        </el-select>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { OrderStatus } from '../../../api/types/order.type'

const route = useRoute()
const router = useRouter()
const search = ref('')
const statusMap = {
  [OrderStatus.Pre]: '已关闭',
  [OrderStatus.HAS_CLOSED]: '已关闭',
  [OrderStatus.TO_DEAL]: '未收货',
  [OrderStatus.TO_PAID]: '未支付',
  [OrderStatus.TO_SEND]: '未发货',
  [OrderStatus.TO_SERVICE]: '售后'
}
const statusItems = Object.values(OrderStatus).filter(item => item !== OrderStatus.Pre)
const status = ref<OrderStatus>()

const handleSearch = () => {
  router.push({
    name: 'order-detail',
    params: {
      id: search.value
    }
  })
}

watch(status, () => {
  router.push({
    path: '/order/list',
    query: Object.assign({}, route.query, { status: status.value })
  })
})

onMounted(() => {
  search.value = route.query.search as string ?? ''
  status.value = route.query.status as OrderStatus
})
</script>

<style scoped lang="scss">
.list-header {
    margin-bottom: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 5px -1px #dedfe0;
}
.list-header_title {
    font-weight: bold;
    margin-bottom: 20px;
}
.list-header_item + .list-header_item {
    margin-top: 10px;
}
.list-header_item {
    display: flex;
    align-items: center;
    gap: 10px;
}
.item_title {
    flex: 0 0 auto;
    font-size: 16px;
}
.list_search {
    width: 250px;
}
</style>
