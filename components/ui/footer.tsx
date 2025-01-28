'use client';

import { Github, Twitter, Linkedin, Instagram, Globe } from 'lucide-react';
import Link from 'next/link';
import { Logo } from './logo';

export function Footer() {
  const socialLinks = [
    {
      icon: <Globe className="h-5 w-5" />,
      href: "https://www.mohitcodes.com/",
      label: "Portfolio"
    },
    {
      icon: <Github className="h-5 w-5" />,
      href: "https://github.com/mohitsharma012",
      label: "GitHub"
    },
    // {
    //   icon: <Twitter className="h-5 w-5" />,
    //   href: "https://twitter.com/yourusername",
    //   label: "Twitter"
    // },
    {
      icon: <Linkedin className="h-5 w-5" />,
      href: "https://www.linkedin.com/in/mohit012/",
      label: "LinkedIn"
    },
    {
      icon: <Instagram className="h-5 w-5" />,
      href: "https://www.instagram.com/_.mohit_012/",
      label: "Instagram"
    }
  ];

  return (
    <footer className="bg-white border-t">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Logo size="sm" />
          </div>
          
          <nav className="flex space-x-4 mb-4 md:mb-0">
            <Link href="/upload" className="text-gray-600 hover:text-gray-900">Upload</Link>
            <Link href="/gallery" className="text-gray-600 hover:text-gray-900">Gallery</Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">About</Link>
          </nav>

          <div className="flex items-center space-x-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>© 2025 PicShare. Built with ❤️ by Mohit Sharma</p>
        </div>
      </div>
    </footer>
  );
}