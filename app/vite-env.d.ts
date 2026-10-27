/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_FORMSPREE_ID?: string;
  readonly VITE_CAL_USUARIO?: string;
  readonly VITE_BREVO_FORM_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
