import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { getAuth } from 'firebase-admin/auth';
import firebaseAdminConnection from '@/lib/firebase-admin';
import {db} from '@/lib/mongodb';
import Images from '@/models/images';

// Initialize MongoDB connection
db();

// Initialize Firebase Admin
firebaseAdminConnection();

// Initialize S3 Client
const s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
});

// Sanitize email for use as directory name
const sanitizeEmail = (email: string) => {
    return email.replace(/[^a-zA-Z0-9@._-]/g, '_');
};

export async function DELETE(request: NextRequest) {
    try {
        // Get the token from headers
        const token = request.headers.get('token');
        if (!token) {
            return NextResponse.json({ error: 'Missing or invalid token' }, { status: 401 });
        }

        const auth = getAuth();
        const decodedToken = await auth.verifyIdToken(token);
        if (!decodedToken.email) {
            return NextResponse.json({ error: 'User email not found' }, { status: 400 });
        }

        // Get image filename from the request URL
        const { searchParams } = new URL(request.url);
        const filename = searchParams.get('image_name');
        if (!filename) {
            return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
        }

        // Ensure the image belongs to the authenticated user
        const sanitizedEmail = sanitizeEmail(decodedToken.email);
        const fileKey = `${sanitizedEmail}/${filename}`;

        // Delete image from S3
        const deleteCommand = new DeleteObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: fileKey,
        });

        await s3.send(deleteCommand);

        // Delete image from MongoDB
        await Images.deleteOne({ email: sanitizedEmail, image_name: filename });

        return NextResponse.json({ message: 'Image deleted successfully' });
    } catch (error: any) {
        console.error('Delete error:', error);

        if (error.name === 'NoSuchKey') {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        if (error.code === 'auth/id-token-expired') {
            return NextResponse.json({ error: 'Authentication token expired' }, { status: 401 });
        }

        return NextResponse.json({ error: 'Error deleting image' }, { status: 500 });
    }
}
