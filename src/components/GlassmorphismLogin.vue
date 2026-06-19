<template>
  <div class="login-page" :style="bgStyle">
    <div class="login-card" ref="cardRef">
      <div class="card-left" :style="bgStyle">
        <div class="left-content">
          <h2>{{ title }}</h2>
          <p>{{ subtitle }}</p>
        </div>
      </div>
      <div class="card-right">
        <transition name="page" mode="out-in" @after-enter="onAfterEnter">
          <div v-if="isLogin" key="login">
            <h2>登录</h2>
            <form class="login-form" @submit.prevent="handleLogin" novalidate>
              <div class="input-group">
                <label>用户名</label>
                <input
                  ref="usernameInput"
                  v-model="loginForm.username"
                  type="text"
                  placeholder="请输入用户名"
                  :class="{ 'input-error': loginErrors.username }"
                  @input="clearLoginError('username')"
                />
                <span class="error-msg" :class="{ visible: loginErrors.username }">请输入用户名</span>
              </div>
              <div class="input-group">
                <label>密码</label>
                <input
                  v-model="loginForm.password"
                  type="password"
                  placeholder="请输入密码"
                  :class="{ 'input-error': loginErrors.password }"
                  @input="clearLoginError('password')"
                />
                <span class="error-msg" :class="{ visible: loginErrors.password }">请输入密码</span>
              </div>
              <button class="btn-login" type="submit" :disabled="loading">
                {{ loading ? '登录中...' : '登 录' }}
              </button>
              <div class="switch-link">
                还没有账号？<a href="#" @click.prevent="switchToRegister">立即注册</a>
              </div>
            </form>
          </div>
          <div v-else key="register">
            <h2>注册账号</h2>
            <form class="login-form" @submit.prevent="handleRegister" novalidate>
              <div class="input-group">
                <label>用户名</label>
                <input
                  ref="usernameInput"
                  v-model="registerForm.username"
                  type="text"
                  placeholder="3-50个字符"
                  :class="{ 'input-error': registerErrors.username }"
                  @input="clearRegisterError('username')"
                />
                <span class="error-msg" :class="{ visible: registerErrors.username }">{{ registerErrorMsgs.username }}</span>
              </div>
              <div class="input-group">
                <label>密码</label>
                <input
                  v-model="registerForm.password"
                  type="password"
                  placeholder="至少6位"
                  :class="{ 'input-error': registerErrors.password }"
                  @input="clearRegisterError('password')"
                />
                <span class="error-msg" :class="{ visible: registerErrors.password }">{{ registerErrorMsgs.password }}</span>
              </div>
              <div class="input-group">
                <label>确认密码</label>
                <input
                  v-model="registerForm.confirmPassword"
                  type="password"
                  placeholder="再次输入密码"
                  :class="{ 'input-error': registerErrors.confirmPassword }"
                  @input="clearRegisterError('confirmPassword')"
                />
                <span class="error-msg" :class="{ visible: registerErrors.confirmPassword }">{{ registerErrorMsgs.confirmPassword }}</span>
              </div>
              <button class="btn-login" type="submit" :disabled="loading">
                {{ loading ? '注册中...' : '注 册' }}
              </button>
              <div class="switch-link">
                已有账号？<a href="#" @click.prevent="switchToLogin">立即登录</a>
              </div>
            </form>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, nextTick } from 'vue'
import gsap from 'gsap'

interface LoginForm {
  username: string
  password: string
}

interface Props {
  backgroundImage: string
  title?: string
  subtitle?: string
  loading?: boolean
  enableAnimation?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  title: '故障工单系统',
  subtitle: '网络故障快速响应平台',
  loading: false,
  enableAnimation: true
})

const emit = defineEmits<{
  (e: 'login', form: LoginForm): void
  (e: 'register', form: { username: string; password: string }): void
}>()

const isLogin = ref(true)
const usernameInput = ref<HTMLInputElement>()
const cardRef = ref<HTMLElement>()

const bgStyle = computed(() => ({
  backgroundImage: `url(${props.backgroundImage})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center'
}))

const loginForm = reactive<LoginForm>({ username: '', password: '' })
const loginErrors = reactive({ username: false, password: false })

const registerForm = reactive({ username: '', password: '', confirmPassword: '' })
const registerErrors = reactive({ username: false, password: false, confirmPassword: false })
const registerErrorMsgs = reactive({ username: '', password: '', confirmPassword: '' })

function clearLoginError(field: 'username' | 'password') {
  loginErrors[field] = false
}

function clearRegisterError(field: 'username' | 'password' | 'confirmPassword') {
  registerErrors[field] = false
  registerErrorMsgs[field] = ''
}

function switchToRegister() {
  isLogin.value = false
  loginForm.username = ''
  loginForm.password = ''
  loginErrors.username = false
  loginErrors.password = false
  nextTick(() => usernameInput.value?.focus())
}

function switchToLogin() {
  isLogin.value = true
  registerForm.username = ''
  registerForm.password = ''
  registerForm.confirmPassword = ''
  registerErrors.username = false
  registerErrors.password = false
  registerErrors.confirmPassword = false
  nextTick(() => usernameInput.value?.focus())
}

function onAfterEnter() {
  animateForm()
}

function animateForm() {
  if (!cardRef.value) return
  const tl = gsap.timeline()
  tl.fromTo(cardRef.value.querySelectorAll('.input-group'),
    { opacity: 0, x: 15 },
    { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: 'power2.out' }
  )
  tl.fromTo(cardRef.value.querySelector('.btn-login'),
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    '-=0.15'
  )
}

function handleLogin() {
  loginErrors.username = !loginForm.username.trim()
  loginErrors.password = !loginForm.password.trim()
  if (loginErrors.username || loginErrors.password) return
  emit('login', { username: loginForm.username, password: loginForm.password })
}

function handleRegister() {
  let hasError = false
  if (!registerForm.username.trim() || registerForm.username.length < 3) {
    registerErrors.username = true
    registerErrorMsgs.username = '用户名至少3个字符'
    hasError = true
  }
  if (!registerForm.password || registerForm.password.length < 6) {
    registerErrors.password = true
    registerErrorMsgs.password = '密码至少6位'
    hasError = true
  }
  if (registerForm.password !== registerForm.confirmPassword) {
    registerErrors.confirmPassword = true
    registerErrorMsgs.confirmPassword = '两次密码不一致'
    hasError = true
  }
  if (hasError) return
  emit('register', { username: registerForm.username, password: registerForm.password })
}

onMounted(() => {
  if (!props.enableAnimation || !cardRef.value) return
  const tl = gsap.timeline()
  tl.fromTo(cardRef.value,
    { y: 20, scale: 0.98 },
    { y: 0, scale: 1, duration: 0.5, ease: 'power2.out' }
  )
  tl.fromTo(cardRef.value.querySelectorAll('.input-group'),
    { opacity: 0, x: 15 },
    { opacity: 1, x: 0, duration: 0.35, stagger: 0.08, ease: 'power2.out' },
    '-=0.2'
  )
  tl.fromTo(cardRef.value.querySelector('.btn-login'),
    { opacity: 0, y: 10 },
    { opacity: 1, y: 0, duration: 0.3, ease: 'power2.out' },
    '-=0.15'
  )
  tl.call(() => usernameInput.value?.focus())
})
</script>

<style scoped>
.login-page {
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  overflow: hidden;
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

.page-enter-active,
.page-leave-active {
  transition: transform 0.5s ease, opacity 0.3s ease;
}

.page-enter-from {
  opacity: 0;
  transform: scale(0.96) translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: scale(1.02) translateY(-10px);
}

.page-enter-to,
.page-leave-from {
  opacity: 1;
  transform: scale(1) translateY(0);
}
</style>
