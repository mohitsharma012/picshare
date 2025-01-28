import * as admin from 'firebase-admin';
import { getApps } from 'firebase-admin/app'; // You don't need to re-import initializeApp or cert


const serviceAccountKey = {
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),  // Handle newlines
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
  };

const firebaseAdminConnection = (): void => {
  // Check if Firebase Admin is already initialized
  if (!getApps().length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccountKey), // Pass the service account key
    });
    }
};

export default firebaseAdminConnection;
