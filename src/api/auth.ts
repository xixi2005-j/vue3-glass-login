import type { Result, LoginDTO, RegisterDTO, UserVO } from '@/types/api'

// ====== Mock 模式：独立演示，无需后端 ======
// 接入真实后端时，将下面的 mock 函数替换为 axios 调用：
//   import request from '@/utils/request'
//   export function login(data: LoginDTO) {
//     return request.post<any, Result<{ token: string; user: UserVO }>>('/auth/login', data)
//   }

function delay(ms = 500): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

function mockUser(username: string, realName?: string): UserVO {
  return {
    id: 1,
    username,
    realName: realName || username,
    phone: null,
    email: null,
    role: 1,
    status: 1,
    createTime: new Date().toISOString()
  }
}

function mockToken(): string {
  return 'mock_token_' + Math.random().toString(36).slice(2) + Date.now().toString(36)
}

export async function login(data: LoginDTO): Promise<Result<{ token: string; user: UserVO }>> {
  await delay(800)
  return {
    code: 200,
    message: 'success',
    data: {
      token: mockToken(),
      user: mockUser(data.username)
    }
  }
}

export async function register(data: RegisterDTO): Promise<Result<UserVO>> {
  await delay(800)
  return {
    code: 200,
    message: 'success',
    data: mockUser(data.username, data.realName)
  }
}

export async function getUserInfo(): Promise<Result<UserVO>> {
  await delay(300)
  return {
    code: 200,
    message: 'success',
    data: mockUser('demo')
  }
}
