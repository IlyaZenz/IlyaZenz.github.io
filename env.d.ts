// src/vite-env.d.ts
/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // Описывает, что каждый .vue файл экспортирует компонент
  const component: DefineComponent<{}, {}, any>
  export default component
}
