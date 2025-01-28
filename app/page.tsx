'use client';

import { Button } from '@/components/ui/button';
import { Upload, Images, Info } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/ui/logo';

export default function Home() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo size="lg" />
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Share your moments with the world through our simple and elegant platform.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <Link href="/upload" className="block">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 text-center border border-gray-100 h-full">
              <Upload className="h-16 w-16 mx-auto mb-6 text-blue-500" />
              <h2 className="text-2xl font-semibold mb-4">Upload Images</h2>
              <p className="text-gray-600 mb-6">
                Upload new images to your collection with our easy-to-use interface.
              </p>
              <Button className="bg-blue-500 hover:bg-blue-600">
                Start Uploading
              </Button>
            </div>
          </Link>

          <Link href="/gallery" className="block">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 text-center border border-gray-100 h-full">
              <Images className="h-16 w-16 mx-auto mb-6 text-purple-500" />
              <h2 className="text-2xl font-semibold mb-4">View Gallery</h2>
              <p className="text-gray-600 mb-6">
                Browse and manage your uploaded images in a beautiful gallery view.
              </p>
              <Button className="bg-purple-500 hover:bg-purple-600">
                View Gallery
              </Button>
            </div>
          </Link>

          <Link href="/about" className="block">
            <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-8 text-center border border-gray-100 h-full">
              <Info className="h-16 w-16 mx-auto mb-6 text-green-500" />
              <h2 className="text-2xl font-semibold mb-4">About Us</h2>
              <p className="text-gray-600 mb-6">
                Learn more about our platform and its features.
              </p>
              <Button className="bg-green-500 hover:bg-green-600">
                Learn More
              </Button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}