<template>
  <div class="title">
    order-list
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { orderService } from '../../../api/order'
import { GetOrdersPageDto, IOrder } from '../../../api/types/order.type'

const data = reactive<IOrder[]>([])
const currentPage = ref(1)
const pageSize = ref(12)
const total = ref(0)

const load = (options: GetOrdersPageDto) => {
  orderService.getOrdersPage(options).then((res) => {
    data.length = 0
    total.value = res.total
    data.push(...res.orders)
    console.log(data)
  })
}

onMounted(() => {
  load({ current_page: currentPage.value, page_size: pageSize.value })
})
</script>

<style scoped lang="scss">
.title {
  font-size: 40px;
  color: $red;
}
</style>
