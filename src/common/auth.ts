import CryptoJS from 'crypto-js'
import {createRandomString, parseJSONSafely, stringifyObjSafely} from './tools'
import {UserInfo} from '@/types/common'

const USER_INFO_KEY = 'ukV1'
const ENCRYPTION_KEY = 'ZRBMXNIODXM9P27Z'

const getUserInfoKey = () => {
  return localStorage.getItem(USER_INFO_KEY)
}

const setUserInfoKey = () => {
  const uk = createRandomString(4)
  localStorage.setItem(USER_INFO_KEY, uk)
  return uk
}

const encryptSafely = (str: string, key: string) => {
  try {
    return CryptoJS.AES.encrypt(str, key)
  } catch (error) {
    console.error(error)
    return str
  }
}

const decryptSafely = (str: string, key: string) => {
  try {
    const bytes = CryptoJS.AES.decrypt(str, key)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error(error)
    return str
  }
}

export const setUser = (user: UserInfo): void => {
  const uk = setUserInfoKey()
  const userInfo = encryptSafely(stringifyObjSafely(user), ENCRYPTION_KEY)
  localStorage.setItem(uk, userInfo as string)
}

export const getUser = (): undefined | UserInfo => {
  const uk = getUserInfoKey()
  if (!uk) {
    return
  }
  const user = localStorage.getItem(uk)
  if (!user) {
    return
  }
  const userInfoStr = decryptSafely(user, ENCRYPTION_KEY)
  const userInfo = parseJSONSafely(userInfoStr) as UserInfo
  return userInfo
}

export const removeUser = (): void => {
  const uk = getUserInfoKey()
  if (!uk) {
    return
  }
  localStorage.removeItem(uk)
  localStorage.removeItem(USER_INFO_KEY)
}
