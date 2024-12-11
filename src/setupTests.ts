// setupTests.ts
import '@testing-library/jest-dom';
import {
  TextEncoder as PolyfillTextEncoder,
  TextDecoder as PolyfillTextDecoder,
} from 'util';

// Polyfills for TextEncoder and TextDecoder
global.TextEncoder = PolyfillTextEncoder as any;
global.TextDecoder = PolyfillTextDecoder as any;

Object.defineProperty(import.meta, 'env', {
  value: {
    VITE_FIREBASE_API_KEY: 'test-api-key',
    VITE_FIREBASE_AUTH_DOMAIN: 'test-auth-domain',
    VITE_FIREBASE_PROJECT_ID: 'test-project-id',
    VITE_FIREBASE_STORAGE_BUCKET: 'test-storage-bucket',
  },
});

const mockConfig = {
  apiKey: 'mockApiKey',
  authDomain: 'mockAuthDomain',
  projectId: 'mockProjectId',
  storageBucket: 'mockStorageBucket',
  messagingSenderId: 'mockSenderId',
  appId: 'mockAppId',
  measurementId: 'mockMeasurementId',
};

process.env.VITE_FIREBASE_API_KEY = mockConfig.apiKey;
process.env.VITE_FIREBASE_AUTH_DOMAIN = mockConfig.authDomain;
process.env.VITE_FIREBASE_PROJECT_ID = mockConfig.projectId;
process.env.VITE_FIREBASE_STORAGE_BUCKET = mockConfig.storageBucket;
process.env.VITE_FIREBASE_MESSAGING_SENDER_ID = mockConfig.messagingSenderId;
process.env.VITE_FIREBASE_APP_ID = mockConfig.appId;
process.env.VITE_FIREBASE_MEASUREMENT_ID = mockConfig.measurementId;
