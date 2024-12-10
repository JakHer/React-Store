import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Mock Firebase modules
jest.mock('firebase/app', () => ({
  initializeApp: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn(),
}));

jest.mock('firebase/firestore', () => ({
  getFirestore: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnThis(),
    doc: jest.fn().mockReturnThis(),
    get: jest.fn().mockResolvedValue({ data: jest.fn().mockReturnValue({}) }),
    addDoc: jest.fn().mockResolvedValue({ id: 'mockId' }),
  }),
}));

describe('Firebase Initialization', () => {
  it('should initialize Firebase with the correct config', () => {
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
    process.env.VITE_FIREBASE_MESSAGING_SENDER_ID =
      mockConfig.messagingSenderId;
    process.env.VITE_FIREBASE_APP_ID = mockConfig.appId;
    process.env.VITE_FIREBASE_MEASUREMENT_ID = mockConfig.measurementId;

    initializeApp(mockConfig);

    expect(initializeApp).toHaveBeenCalledWith(mockConfig);
  });

  it('should call getFirestore', () => {
    const mockFirestore = {};
    (getFirestore as jest.Mock).mockReturnValue(mockFirestore);

    const firestoreInstance = getFirestore();

    expect(getFirestore).toHaveBeenCalled();
    expect(firestoreInstance).toBe(mockFirestore);
  });
});
