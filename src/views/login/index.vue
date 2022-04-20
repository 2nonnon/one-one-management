<template>
  <div class="login_container">
    <el-form
      class="login_form"
      ref="loginFormRef"
      :model="loginForm"
      status-icon
      hide-required-asterisk
      :rules="rules"
      size="large"
      @submit.prevent="handlleSubmit(loginFormRef)"
    >
      <div class="login-form_header">
        one-one
      </div>
      <el-form-item
        prop="username"
      >
        <el-input
          v-model="loginForm.username"
          type="text"
          autocomplete="off"
          placeholder="请输入用户名"
          :prefix-icon="User"
        />
      </el-form-item>

      <el-form-item
        prop="password"
      >
        <el-input
          v-model="loginForm.password"
          type="password"
          autocomplete="off"
          placeholder="请输入密码"
          :prefix-icon="Lock"
        />
      </el-form-item>

      <el-form-item class="login_submit_wrap">
        <el-button
          class="login_submit"
          type="primary"
          :loading="loading"
          native-type="submit"
        >
          登录
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { User, Lock } from '@element-plus/icons-vue'
import { ILoginForm } from '../../api/types/login'
import { signin } from '../../api/login'

const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive<ILoginForm>({
  username: 'wolegequ',
  password: 'wQ12.dd'
})

const rules = reactive<FormRules>({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
})

const handlleSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  const valid = await formEl.validate()
  if (!valid) {
    return false
  }
  loading.value = true
  const data = await signin(loginForm)
  console.log(data)
}
</script>

<style scoped lang="scss">
.login_container {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login_form {
  width: 280px;
}
.login-form_header {
  font-size: 32px;
  color: #ff6d6d;
  font-weight: bold;
  text-align: center;
  height: 40px;
  line-height: 40px;
  margin-bottom: 20px;
}
.el-input :deep(.el-input__prefix) {
    left: 10px;
}
.login_submit_wrap :deep(.el-form-item__content) {
  justify-content: center;
}
.login_submit {
  width: 100%;
}
</style>
