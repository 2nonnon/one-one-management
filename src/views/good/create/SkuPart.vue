<template>
  <div class="sku_detail_container">
    <div
      class="sku_detail_card"
      v-for="item in skus"
      :key="item.name"
    >
      <el-form
        :model="item"
        label-width="70px"
      >
        <el-form-item
          label="商品名称"
        >
          <el-input
            placeholder="请输入商品名称"
            v-model="item.name"
          />
        </el-form-item>
        <el-form-item
          label="商品规格"
        >
          <div class="form_tags_container">
            <el-tag
              v-for="attr in item.attributes"
              :key="attr.id"
            >
              {{ attr.name }}
            </el-tag>
          </div>
        </el-form-item>
        <el-form-item
          label="售价"
        >
          <el-input
            placeholder="请输入商品售价"
            v-model="item.market_price"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="原价"
        >
          <el-input
            placeholder="请输入商品原价"
            v-model="item.price"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="库存"
        >
          <el-input
            placeholder="请输入商品库存"
            v-model="item.stock"
            type="number"
          />
        </el-form-item>
        <el-form-item
          label="商品图"
        >
          <upload
            :limit="1"
            :files="item.img_url ? [urlToUploadUserFile(item.img_url)] : []"
            @success="(res) => {item.img_url = res}"
            @remove="() => {item.img_url = ''}"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            class="delete_btn"
            type="danger"
          >
            删除商品
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CreateSkuDto } from '../../../api/types/good'
import Upload from '../../../components/Upload/index.vue'
import { urlToUploadUserFile } from '../../../utils/urlToUploadUserFile'

defineProps<{skus: CreateSkuDto[]}>()

</script>

<style scoped lang="scss">
.form_tags_container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.form_tags_container .el-tag{
  flex-basis: 35%;
}
.form_tags_container .el-tag:nth-child(odd)::after {
  content: ':';
}
.sku_detail_container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
.sku_detail_card {
  width: 300px;
  border: 1px solid #E4E7ED;
  padding: 20px 20px 20px 10px;
  border-radius: 10px;
}
.sku_detail_card :deep(.el-form-item + .el-form-item) {
  margin-top: 12px;
}
.delete_btn {
  margin: 0 auto;
}
</style>
