import React from 'react';
import { Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="mt-auto py-6 relative">
      {/* Blur backdrop */}
      <div className="absolute inset-0 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-t border-[#eaeaea] dark:border-[#333]" />
      
      {/* Content */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-center text-sm">
          <span>Built with</span>
          <Heart className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
          <span>by</span>
          <a
            href="https://sourcingdenis.live/?utm_source=my-site"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 font-medium hover:text-[#0070f3] dark:hover:text-white transition-colors"
          >
            @sourcingdenis
          </a>
        </div>
      </div>
    </footer>
  );
}
