import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app'; // You don't need to re-import initializeApp or cert

import serviceAccountKey from '@/serviceAccountKey.json';

const firebaseAdminConnection = (): void => {
  // Check if Firebase Admin is already initialized
  if (!getApps().length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey), // Pass the service account key
    });
    }
};

export default firebaseAdminConnection;
