<template>
  <div class="create_container">
    <div class="create_header" />
    <div class="create_body">
      <spu-info v-model:form="createGoodDto" />
      <sku-info v-model:form="createGoodDto" />
    </div>
    <div class="creater_footer">
      <el-button @click="showInfo">
        console
      </el-button>
      <el-button @click="handleCreateGood">
        submit
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { useRouter } from 'vue-router'
import SpuInfo from './SpuInfo.vue'
import SkuInfo from './SkuInfo.vue'
import { CreateGoodDto, CreateSkuDto } from '../../../api/types/good'
import { reactive } from 'vue'
import { goodService } from '../../../api/good'

const createGoodDto = reactive({ skus: ([] as CreateSkuDto[]) } as CreateGoodDto)
// const router = useRouter()
const showInfo = () => {
  console.log(createGoodDto)
}

const handleCreateGood = () => {
  goodService.createGood(createGoodDto).then(res => {
    console.log('create', res)
    // router.replace({
    //   name: 'good-list'
    // })
  })
}

</script>

<style scoped lang="scss">
.create_header {
  padding: 40px 0;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.el-steps {
  background-color: inherit;
}
.create_body {
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 10px;
}
.creater_footer {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 100px;
}
</style>
