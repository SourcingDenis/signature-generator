import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github, Instagram, Send, MessageSquare } from 'lucide-react';

interface CreativeTemplateProps {
  data: SignatureData;
  primaryColor: string;
}

export function CreativeTemplate({ data, primaryColor }: CreativeTemplateProps) {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor}22 0%, transparent 100%)`,
    borderColor: primaryColor,
  };

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
    instagram: Instagram,
    telegram: Send,
    discord: MessageSquare,
  } as const;

  const getHref = (platform: keyof typeof socialIcons, url: string) => {
    if (!url) return '#';
    
    // If it's already a URL, return it
    if (url.startsWith('http')) {
      return url;
    }

    // Handle each platform
    switch (platform) {
      case 'linkedin':
        return `https://linkedin.com/in/${url.replace('@', '')}`;
      case 'twitter':
        return `https://twitter.com/${url.replace('@', '')}`;
      case 'github':
        return `https://github.com/${url.replace('@', '')}`;
      case 'instagram':
        return `https://instagram.com/${url.replace('@', '')}`;
      case 'telegram':
        return `https://t.me/${url.replace('@', '')}`;
      case 'discord':
        return url.includes('#') || url.includes('@') ? '#' : `https://discord.com/users/${url}`;
      default:
        return '#';
    }
  };

  return (
    <div className="font-montserrat p-6 rounded-2xl border-2 relative overflow-hidden" style={gradientStyle}>
      {/* Background decorative circles */}
      <div 
        className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10"
        style={{ backgroundColor: primaryColor }}
      />
      <div 
        className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full opacity-10"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="relative space-y-4">
        <div className="flex items-center gap-4">
          {data.logo && (
            <img src={data.logo} alt="" className="w-16 h-16 rounded-xl" />
          )}
          
          <div>
            <h3 className="text-xl font-bold" style={{ color: primaryColor }}>
              {data.name}
            </h3>
            <p className="text-sm text-gray-600 mt-0.5">
              {data.title}
              {data.company && (
                <>
                  <span className="mx-1">·</span>
                  <span>{data.company}</span>
                </>
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 text-sm">
          {data.email && (
            <a 
              href={`mailto:${data.email}`}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
              style={{ color: primaryColor }}
            >
              <Mail className="w-4 h-4" />
              {data.email}
            </a>
          )}
          {data.phone && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 text-gray-600">
              <Phone className="w-4 h-4" />
              {data.phone}
            </div>
          )}
          {data.website && (
            <a 
              href={data.website}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
              style={{ color: primaryColor }}
            >
              <Globe className="w-4 h-4" />
              {data.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {data.location && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 text-gray-600">
              <MapPin className="w-4 h-4" />
              {data.location}
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {Object.entries(data.socials || {}).map(([platform, url]) => {
            if (!url || !platform) return null;
            
            const Icon = socialIcons[platform as keyof typeof socialIcons];
            if (!Icon) return null;

            const href = getHref(platform as keyof typeof socialIcons, url);
            const title = platform === 'discord' ? url : `Visit ${platform} profile`;

            return (
              <a
                key={platform}
                href={href}
                className="p-2 rounded-full bg-white/50 hover:bg-white/80 transition-colors"
                style={{ color: primaryColor }}
                title={title}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon className="w-4 h-4" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}