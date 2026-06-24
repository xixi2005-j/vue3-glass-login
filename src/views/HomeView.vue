<template>
  <div class="home-page">
    <div class="home-card">
      <h1>🎉 登录成功</h1>
      <p class="welcome">欢迎回来，<strong>{{ userStore.user?.realName || userStore.user?.username }}</strong>！</p>
      <p class="role">当前角色：{{ userStore.roleName }}</p>
      <button class="btn-logout" @click="handleLogout">退出登录</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'
import gsap from 'gsap'
import { onMounted } from 'vue'

const router = useRouter()
const userStore = useUserStore()

onMounted(() => {
  const card = document.querySelector('.home-card') as HTMLElement
  if (!card) return
  gsap.fromTo(card,
    { y: 20, scale: 0.98, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 0.5, ease: 'power2.out' }
  )
})

function handleLogout() {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/login')
}
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.home-card {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  border-radius: 24px;
  padding: 50px 60px;
  text-align: center;
  box-shadow:
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.home-card h1 {
  font-size: 32px;
  color: #fff;
  margin-bottom: 16px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
}

.welcome {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
}

.role {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 24px;
}

.btn-logout {
  padding: 12px 32px;
  background: linear-gradient(135deg, #2196F3, #81D4FA);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  letter-spacing: 1px;
}

.btn-logout:hover {
  background: linear-gradient(135deg, #1976D2, #4FC3F7);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(33, 150, 243, 0.4);
}
</style>
