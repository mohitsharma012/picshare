import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
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

// Ensure user's uploads directory exists
const ensureUserUploadsDir = async (email: string) => {
  const sanitizedEmail = sanitizeEmail(email);
  const userDir = join(process.cwd(), 'public/uploads', sanitizedEmail);
  try {
    await mkdir(userDir, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }
  return userDir;
};

export async function POST(request: NextRequest) {
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

    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json(
        { error: 'File must be an image' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + '-' + file.name.replaceAll(' ', '_');
    
    // Save file to user's directory using email
    const userDir = await ensureUserUploadsDir(decodedToken.email);
    const filePath = join(userDir, filename);
    
    // Write file
    await writeFile(filePath, buffer);

    // Return the public URL
    const sanitizedEmail = sanitizeEmail(decodedToken.email);
    const url = `/uploads/${sanitizedEmail}/${filename}`;
    
    return NextResponse.json({ 
      url,
      message: 'File uploaded successfully' 
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    if (error.code === 'auth/id-token-expired') {
      return NextResponse.json(
        { error: 'Authentication token expired' },
        { status: 401 }
      );
    }
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}