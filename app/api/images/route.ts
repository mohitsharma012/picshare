import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { readdir } from 'fs/promises';
import { join } from 'path';
import { cookies } from 'next/headers';
import { getAuth } from 'firebase-admin/auth';

import firebaseAdminConnection from '@/lib/firebase-admin';


// Initialize Firebase Admin


firebaseAdminConnection();

// Sanitize email for use as directory name
const sanitizeEmail = (email: string) => {
  return email.replace(/[^a-zA-Z0-9@._-]/g, '_');
};



export async function GET(request: NextRequest) {
  try {
    // Get the token from the request headers
    const token = request.headers.get('token');

    if (!token) {
      return NextResponse.json(
        { error: 'Missing or invalid token' },
        { status: 401 }
      );
    }

    const auth = getAuth();
    const decodedToken = await auth.verifyIdToken(token);


    if (!decodedToken.email) {
      return NextResponse.json(
        { error: 'User email not found' },
        { status: 400 }
      );
    }

    const sanitizedEmail = sanitizeEmail(decodedToken.email);
    const userDir = join(process.cwd(), 'public/uploads', sanitizedEmail);

    try {
      const files = await readdir(userDir);

      // Filter image files and create URLs
      const images = files
        .filter(file => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map(file => ({
          url: `/uploads/${sanitizedEmail}/${file}`,
          timestamp: parseInt(file.split('-')[0])
        }))
        .sort((a, b) => b.timestamp - a.timestamp);

      return NextResponse.json({ images });
    } catch (error) {
      // If directory doesn't exist or can't be read, return empty array
      return NextResponse.json({ images: [] });
    }
  } catch (error: any) {
    console.error('Error reading uploads directory:', error);
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'Authentication token expired' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
}
