/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_KEY: string
  // more env variables...
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}
// https://vitejs.dev/guide/env-and-mode.html