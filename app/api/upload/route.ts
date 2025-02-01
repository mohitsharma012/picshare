import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { auth } from '@/lib/firebase';
import AWS from 'aws-sdk';
import { getAuth } from 'firebase-admin/auth';
import firebaseAdminConnection from '@/lib/firebase-admin';
import Images from '@/models/images';
import { db } from '@/lib/mongodb';

// Initialize MongoDB connection
db();
// Initialize Firebase Admin
firebaseAdminConnection();


// Sanitize email for use as directory name
const sanitizeEmail = (email: string) => {
  return email.replace(/[^a-zA-Z0-9@._-]/g, '_');
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

    // UPload file to aws s3 bucket in user email directory
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    });

    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${decodedToken.email}/${filename}`,
      Body: buffer,
      ContentType: file.type
    };

    await s3.upload(params).promise();

    // Save image to database
    const image = new Images({
      email: decodedToken.email,
      image_name:filename
    });

    await image.save();

    const url = `${process.env.URL}/api/images/${decodedToken.email}/${filename}`;
    
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