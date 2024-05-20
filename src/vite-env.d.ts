/// <reference types="vite/client" />
/// <reference types="../auto-imports.d.ts" />
/// <reference types="../components.d.ts" />

declare module '*.vue' {
  import {DefineComponent} from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
