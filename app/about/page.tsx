'use client';

import Link from 'next/link';
import { ArrowLeft, Camera, Cloud, Shield, Zap, Users, Globe, Clock, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const features = [
    {
      icon: <Camera className="h-6 w-6 text-blue-600" />,
      title: "Easy Uploads",
      description: "Upload your images with a simple drag and drop interface. We support all major image formats including JPG, PNG, GIF, and WebP. Our intelligent processing ensures optimal quality and fast loading times.",
      bgColor: "bg-blue-100"
    },
    {
      icon: <Cloud className="h-6 w-6 text-purple-600" />,
      title: "Cloud Storage",
      description: "Your images are securely stored in the cloud and easily accessible from anywhere. Share your images with simple, direct links. Unlimited storage means you never have to worry about running out of space.",
      bgColor: "bg-purple-100"
    },
    {
      icon: <Shield className="h-6 w-6 text-green-600" />,
      title: "Secure Platform",
      description: "We prioritize the security of your images with robust storage systems and careful handling of your data. Advanced encryption ensures your content remains private and protected.",
      bgColor: "bg-green-100"
    },
    {
      icon: <Zap className="h-6 w-6 text-orange-600" />,
      title: "Fast Access",
      description: "Quick upload times and instant access to your images. Our optimized system ensures smooth performance with global CDN distribution for lightning-fast loading speeds worldwide.",
      bgColor: "bg-orange-100"
    },
    {
      icon: <Users className="h-6 w-6 text-indigo-600" />,
      title: "Community Features",
      description: "Connect with other creators, share your work, and get inspired. Our growing community of photographers and artists makes sharing more meaningful.",
      bgColor: "bg-indigo-100"
    },
    {
      icon: <Globe className="h-6 w-6 text-teal-600" />,
      title: "Global Accessibility",
      description: "Access your content from any device, anywhere in the world. Our platform is optimized for both desktop and mobile viewing experiences.",
      bgColor: "bg-teal-100"
    },
    {
      icon: <Clock className="h-6 w-6 text-rose-600" />,
      title: "Image History",
      description: "Keep track of all your uploads with detailed history and analytics. Organize your content with custom collections and tags for easy management.",
      bgColor: "bg-rose-100"
    },
    {
      icon: <Sparkles className="h-6 w-6 text-amber-600" />,
      title: "Premium Quality",
      description: "Maintain the highest quality of your images with our advanced compression algorithms. Preview and adjust your images before sharing them with the world.",
      bgColor: "bg-amber-100"
    }
  ];

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <Link href="/" className="inline-flex items-center text-gray-600 hover:text-gray-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">About PicShare</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your premier destination for seamless image sharing and management. We combine powerful features with elegant simplicity to make sharing your visual stories effortless.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center mb-4">
                  <div className={`${feature.bgColor} p-3 rounded-lg`}>
                    {feature.icon}
                  </div>
                  <h2 className="text-xl font-semibold ml-4">{feature.title}</h2>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-8 shadow-sm mb-16">
            <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Our Mission</h2>
            <div className="space-y-4 text-gray-700 max-w-3xl mx-auto">
              <p className="text-lg leading-relaxed">
                At PicShare, we believe that every image tells a story worth sharing. Our mission is to provide a seamless, secure, and sophisticated platform that empowers creators to share their visual narratives with the world.
              </p>
              <p className="text-lg leading-relaxed">
                We're committed to continuous innovation, ensuring our platform evolves with the latest technology while maintaining the simplicity and reliability our users love. Whether you're a professional photographer or someone who loves capturing life's moments, PicShare is designed with you in mind.
              </p>
              <p className="text-lg leading-relaxed">
                Our focus on security, performance, and user experience makes us the trusted choice for millions of users worldwide. We're not just an image hosting service – we're a community of creators sharing moments, memories, and masterpieces.
              </p>
            </div>
          </div>

          <div className="text-center space-y-6">
            <h2 className="text-2xl font-semibold text-gray-900">Ready to Start Sharing?</h2>
            <div className="space-x-4">
              <Link 
                href="/upload"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Start Uploading
              </Link>
              <Link 
                href="/gallery"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                View Gallery
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}