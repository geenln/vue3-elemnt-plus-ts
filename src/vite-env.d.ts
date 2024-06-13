/// <reference types="vite/client" />
/// <reference types="../auto-imports.d.ts" />
/// <reference types="../components.d.ts" />
import 'vue-router'
import 'axios'

declare module '*.vue' {
  import {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vue-router' {
  export interface RouteMeta {
    authRequired?: boolean
  }
}

declare module 'axios' {
  interface InternalAxiosRequestConfig {
    controller?: AbortController
    doNotTriggerProgress?: boolean
  }
}

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
}
