'use client';

import { ImageUpload } from '@/components/ui/image-upload';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import Image from 'next/image';
import { Upload, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';


export default function UploadPage() {
  const router = useRouter();
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);


  const handleUpload = async (file: File) => {
    router.push('/gallery');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Upload Images</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Upload your images securely. Supported formats: JPG, PNG, GIF, WebP.
          </p>
        </div>

        <div className="max-w-xl mx-auto mb-16">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-center mb-6">
              <Upload className="h-12 w-12 text-blue-500" />
            </div>
            <ImageUpload onUpload={handleUpload} />
          </div>
        </div>

        {uploadedImageUrl && (
          <div className="bg-green-50 border border-green-100 rounded-lg p-6 mb-12 animate-fade-in">
            <h2 className="text-lg font-semibold text-green-800 mb-4">Successfully Uploaded!</h2>
            <div className="relative aspect-video w-full max-w-xl mx-auto overflow-hidden rounded-lg bg-white shadow-sm">
              <Image
                src={uploadedImageUrl}
                alt="Recently uploaded image"
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 bg-white rounded-md p-4 border border-green-100">
              <p className="text-sm font-medium text-gray-700">Image URL:</p>
              <code className="block mt-2 p-2 bg-gray-50 rounded text-sm overflow-x-auto">
                {uploadedImageUrl}
              </code>
            </div>
            <div className="mt-6 text-center">
              <Link href="/gallery">
                <Button className="bg-purple-500 hover:bg-purple-600">
                  View in Gallery
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}