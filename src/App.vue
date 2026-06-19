<template>
  <GlassmorphismLogin
    :background-image="backgroundImage"
    title="故障工单系统"
    subtitle="网络故障快速响应平台"
    login-text="登 录"
    :loading="loading"
    @login="handleLogin"
    @register="handleRegister"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GlassmorphismLogin from './components/GlassmorphismLogin.vue'
import backgroundImage from './assets/background.jpg'

const loading = ref(false)

function handleLogin(form: { username: string; password: string }) {
  loading.value = true
  setTimeout(() => {
    alert(`登录成功！\n用户名: ${form.username}`)
    loading.value = false
  }, 1500)
}

function handleRegister() {
  alert('点击了注册')
}
</script>
