/** 通用响应结构 */
export interface Result<T> {
  code: number
  message: string
  data: T
}

/** 用户 */
export interface UserVO {
  id: number
  username: string
  realName: string | null
  phone: string | null
  email: string | null
  role: number
  status: number
  createTime: string
}

/** 登录请求 */
export interface LoginDTO {
  username: string
  password: string
}

/** 注册请求 */
export interface RegisterDTO {
  username: string
  password: string
  realName?: string
  phone?: string
  email?: string
}
