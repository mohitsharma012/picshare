'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { ArrowLeft, Copy, Check, AlertCircle, Trash2   } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface UploadedImage {
  url: string;
  timestamp: number;
  filename: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [deletingIndex, setDeletingIndex] = useState<number | null>(null);


  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/images', {
          method: 'GET',
          headers: {
            'token': localStorage.getItem('authToken') || ''

          },
        });
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to fetch images');
        }
        const data = await response.json();
        setImages(data.images || []);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching images:', error);
        setError(error.message || 'Failed to load images');
      } finally {
        setIsLoading(false);
      }
    };

    if (!authLoading) {
      if (!user) {
        router.push('/auth/login');
      } else {
        fetchImages();
      }
    }
  }, [user, authLoading, router]);


  const deleteImage = async (url: string, index: number, image_name: string) => {
    try {
      setDeletingIndex(index);
      const response = await fetch(`/api/delete?image_name=${image_name}`, {
        method: 'DELETE',
        headers: {
          'token': localStorage.getItem('authToken') || ''
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete image');
      }

      // Remove the image from the state
      setImages(prevImages => prevImages.filter((_, i) => i !== index));
    } catch (error: any) {
      console.error('Delete failed:', error);
      setError(error.message || 'Failed to delete image');
    } finally {
      setDeletingIndex(null);
    }
  };


  const copyToClipboard = async (url: string, index: number) => {
    try {
      const fullUrl =  url;
      await navigator.clipboard.writeText(fullUrl);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Image Gallery</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through your collection of uploaded images.
          </p>
        </div>

        <div className="space-y-8">
          {isLoading ? (
            <div className="text-center py-12">
              <div className="animate-pulse flex space-x-4 justify-center">
                <div className="h-12 w-12 bg-gray-200 rounded-full"></div>
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-12 bg-red-50 rounded-lg">
              <div className="flex items-center justify-center mb-4">
                <AlertCircle className="h-8 w-8 text-red-500 mr-2" />
                <p className="text-red-600">{error}</p>
              </div>
              <Button
                onClick={() => window.location.reload()}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Try Again
              </Button>
            </div>
          ) : images.length > 0 ? (
            <div className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {images.map((image, index) => (
                <div
                key={image.timestamp}
                className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1"
                >
                  
                  <div className="aspect-square relative">
                    <Image
                      src={image.url}
                      alt={`Uploaded image ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-opacity flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                      onClick={() => window.open(image.url, '_blank')}
                      className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100"
                    >
                      View Full Size
                    </Button>
                    <Button
                      onClick={() => copyToClipboard(image.url, index)}
                      className="bg-white text-gray-900 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-100 flex items-center gap-2"
                    >
                      {copiedIndex === index ? (
                        <>
                          <Check className="h-4 w-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="h-4 w-4" />
                          Copy Link
                        </>
                      )}
                    </Button>
                    <Button
                      onClick={() => deleteImage(image.url, index, image.filename)}
                      disabled={deletingIndex === index}
                      className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 flex items-center gap-2"
                    >
                      {deletingIndex === index ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white" />
                      ) : (
                        <Trash2 className="h-4 w-4" />
                      )}
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-gray-50 rounded-lg">
              <p className="text-gray-600 mb-4">No images uploaded yet.</p>
              <Link href="/upload" className="text-blue-500 hover:text-blue-600 font-medium">
                Upload your first image
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}