<template>
  <div class="login-page" :style="bgStyle">
    <div class="login-card">
      <div class="card-left" :style="bgStyle">
        <div class="left-content">
          <h2>{{ title }}</h2>
          <p>{{ subtitle }}</p>
        </div>
      </div>
      <div class="card-right">
        <h2>{{ isLogin ? loginText : '注册账号' }}</h2>
        <form class="login-form" @submit.prevent="handleSubmit" novalidate>
          <div class="input-group">
            <label>{{ usernameLabel }}</label>
            <input
              ref="usernameInput"
              v-model="form.username"
              type="text"
              :placeholder="usernamePlaceholder"
              :class="{ 'input-error': errors.username }"
              @input="clearError('username')"
            />
            <span class="error-msg" :class="{ visible: errors.username }">{{ usernameError }}</span>
          </div>
          <div class="input-group">
            <label>{{ passwordLabel }}</label>
            <input
              v-model="form.password"
              type="password"
              :placeholder="passwordPlaceholder"
              :class="{ 'input-error': errors.password }"
              @input="clearError('password')"
            />
            <span class="error-msg" :class="{ visible: errors.password }">{{ passwordError }}</span>
          </div>
          <div v-if="!isLogin" class="input-group">
            <label>确认密码</label>
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="请再次输入密码"
              :class="{ 'input-error': errors.confirmPassword }"
              @input="clearError('confirmPassword')"
            />
            <span class="error-msg" :class="{ visible: errors.confirmPassword }">两次密码不一致</span>
          </div>
          <button class="btn-login" type="submit" :disabled="loading">
            {{ loading ? loadingText : (isLogin ? loginText : '注 册') }}
          </button>
          <div class="switch-link">
            {{ isLogin ? '还没有账号？' : '已有账号？' }}
            <a href="#" @click.prevent="toggleMode">{{ isLogin ? '立即注册' : '立即登录' }}</a>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted } from 'vue'
import gsap from 'gsap'

interface LoginForm {
  username: string
  password: string
  confirmPassword?: string
}

interface Props {
  backgroundImage?: string
  title?: string
  subtitle?: string
  loginText?: string
  loadingText?: string
  usernameLabel?: string
  usernamePlaceholder?: string
  usernameError?: string
  passwordLabel?: string
  passwordPlaceholder?: string
  passwordError?: string
  loading?: boolean
  enableAnimation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  backgroundImage: '',
  title: '欢迎回来',
  subtitle: '请登录以继续',
  loginText: '登 录',
  loadingText: '加载中...',
  usernameLabel: '用户名',
  usernamePlaceholder: '请输入用户名',
  usernameError: '请输入用户名',
  passwordLabel: '密码',
  passwordPlaceholder: '请输入密码',
  passwordError: '请输入密码',
  loading: false,
  enableAnimation: true
})

const emit = defineEmits<{
  (e: 'login', form: LoginForm): void
  (e: 'register', form: LoginForm): void
}>()

const isLogin = ref(true)
const usernameInput = ref<HTMLInputElement>()
const form = reactive<LoginForm>({
  username: '',
  password: '',
  confirmPassword: ''
})

const errors = reactive({
  username: false,
  password: false,
  confirmPassword: false
})

const bgStyle = computed(() => {
  if (props.backgroundImage) {
    return { backgroundImage: `url(${props.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }
  }
  return {}
})

function clearError(field: 'username' | 'password' | 'confirmPassword') {
  errors[field] = false
}

function toggleMode() {
  isLogin.value = !isLogin.value
  form.username = ''
  form.password = ''
  form.confirmPassword = ''
  errors.username = false
  errors.password = false
  errors.confirmPassword = false
  usernameInput.value?.focus()
}

function handleSubmit() {
  errors.username = !form.username.trim()
  errors.password = !form.password.trim()

  if (errors.username || errors.password) return

  if (!isLogin.value) {
    errors.confirmPassword = form.password !== form.confirmPassword
    if (errors.confirmPassword) return
  }

  if (isLogin.value) {
    emit('login', { username: form.username, password: form.password })
  } else {
    emit('register', { username: form.username, password: form.password })
  }
}

onMounted(() => {
  usernameInput.value?.focus()

  if (!props.enableAnimation) return

  const card = document.querySelector('.login-card') as HTMLElement
  if (!card) return

  const tl = gsap.timeline()
  tl.fromTo(card,
    { y: 20, scale: 0.98 },
    { y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
  )
  tl.fromTo('.card-right .input-group',
    { opacity: 0, x: 15 },
    { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: 'power2.out' },
    '-=0.2'
  )
  tl.fromTo('.btn-login',
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' }
  )
})
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #1a1a2e;
}

.login-card {
  display: flex;
  width: 860px;
  min-height: 500px;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 
    0 25px 50px rgba(0, 0, 0, 0.25),
    0 0 0 1px rgba(255, 255, 255, 0.1);
  will-change: transform;
}

.card-left {
  flex: 1.1;
  background: #2c3e50;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.card-left::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.1));
}

.left-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: #fff;
  padding: 40px;
}

.left-content h2 {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 12px;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  letter-spacing: 2px;
}

.left-content p {
  font-size: 15px;
  opacity: 0.9;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
}

.card-right {
  flex: 0.9;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(25px) saturate(180%);
  -webkit-backdrop-filter: blur(25px) saturate(180%);
  padding: 50px 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  will-change: transform;
}

.card-right::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
}

.card-right h2 {
  font-size: 28px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 32px;
  text-align: center;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  letter-spacing: 1px;
}

.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: 0;
  position: relative;
  padding-bottom: 22px;
}

.input-group label {
  font-size: 13px;
  color: #2c5282;
  font-weight: 500;
  margin-bottom: 6px;
  letter-spacing: 0.5px;
}

.input-group input {
  width: 100%;
  padding: 14px 18px;
  border: 1px solid rgba(44, 82, 130, 0.25);
  border-radius: 12px;
  font-size: 14px;
  color: #1a3a5c;
  background: rgba(255, 255, 255, 0.3);
  transition: all 0.3s ease;
  box-sizing: border-box;
  outline: none;
  box-shadow: none;
}

.input-group input::placeholder {
  color: rgba(44, 82, 130, 0.45);
}

.input-group input:focus {
  outline: none;
  border-color: #48b1e0;
  background: rgba(255, 255, 255, 0.45);
  box-shadow: 0 0 0 3px rgba(33, 150, 243, 0.1);
  transform: translateY(-1px);
}

.input-group input.input-error {
  border-color: rgba(255, 107, 107, 0.6);
  background: rgba(255, 107, 107, 0.08);
}

.error-msg {
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  color: #ff8a8a;
  height: 0;
  overflow: hidden;
  transition: all 0.2s;
}

.error-msg.visible {
  height: 18px;
}

.btn-login {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #2196F3, #81D4FA);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 8px;
  letter-spacing: 2px;
  position: relative;
  overflow: hidden;
}

.btn-login:hover {
  background: linear-gradient(135deg, #1976D2, #4FC3F7);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(33, 150, 243, 0.4);
}

.btn-login:active {
  transform: translateY(0);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
}

.btn-login:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.switch-link {
  text-align: center;
  font-size: 13px;
  color: rgba(44, 82, 130, 0.6);
  margin-top: 8px;
}

.switch-link a {
  color: #2770dd;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.switch-link a:hover {
  color: #45a4db;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .login-card {
    flex-direction: column;
    width: 90%;
    min-height: auto;
  }

  .card-left {
    flex: none;
    min-height: 200px;
  }

  .card-right {
    flex: none;
    padding: 30px 20px;
  }
}
</style>
