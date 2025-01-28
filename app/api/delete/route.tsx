import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { unlink } from 'fs/promises';
import { join } from 'path';
import { auth } from '@/lib/firebase';
import { getAuth } from 'firebase-admin/auth';

import firebaseAdminConnection from '@/lib/firebase-admin';


// Initialize Firebase Admin
firebaseAdminConnection();


// Sanitize email for use as directory name
const sanitizeEmail = (email: string) => {
  return email.replace(/[^a-zA-Z0-9@._-]/g, '_');
};

export async function DELETE(request: NextRequest) {
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

    // Get the image path from the request
    const { searchParams } = new URL(request.url);
    const imagePath = searchParams.get('path');
    
    if (!imagePath) {
      return NextResponse.json(
        { error: 'Image path not provided' },
        { status: 400 }
      );
    }

    // Ensure the image belongs to the authenticated user
    const sanitizedEmail = sanitizeEmail(decodedToken.email);
    if (!imagePath.startsWith(`/uploads/${sanitizedEmail}/`)) {
      return NextResponse.json(
        { error: 'Unauthorized to delete this image' },
        { status: 403 }
      );
    }

    // Get the filename from the path
    const filename = imagePath.split('/').pop();
    if (!filename) {
      return NextResponse.json(
        { error: 'Invalid image path' },
        { status: 400 }
      );
    }

    // Delete the file
    const filePath = join(process.cwd(), 'public', imagePath);
    await unlink(filePath);

    return NextResponse.json({ 
      message: 'Image deleted successfully' 
    });
  } catch (error: any) {
    console.error('Delete error:', error);
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'Authentication token expired' },
        { status: 401 }
      );
    }
    if (error.code === 'ENOENT') {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { error: 'Error deleting image' },
      { status: 500 }
    );
  }
}