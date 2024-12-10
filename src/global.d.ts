declare global {
  interface ImportMetaEnv {
    // Firebase mock values
    VITE_FIREBASE_API_KEY: string;
    VITE_FIREBASE_AUTH_DOMAIN: string;
    VITE_FIREBASE_PROJECT_ID: string;
    VITE_FIREBASE_STORAGE_BUCKET: string;
    VITE_FIREBASE_MESSAGING_SENDER_ID: string;
    VITE_FIREBASE_APP_ID: string;
    VITE_FIREBASE_MEASUREMENT_ID: string;

    // Optionally define Vite's other environment variables if needed
    BASE_URL?: string;
    MODE?: string;
    DEV?: boolean;
    PROD?: boolean;
    SSR?: boolean;
  }

  // ImportMeta is now partially typed to allow flexibility for missing properties
  interface ImportMeta {
    env: ImportMetaEnv; // This will be fully typed as we define it
    // Other properties like `glob` and `url` are not needed for your test
    glob?: unknown;
    url?: string;
    resolve?: (specifier: string) => string;
    jest?: typeof jest; // if needed
  }

  var importMeta: ImportMeta;
}

export {};
