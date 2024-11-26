import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github, Instagram, Send, MessageSquare } from 'lucide-react';

interface ModernTemplateProps {
  data: SignatureData;
  primaryColor: string;
  backgroundColor?: string;
  textColor?: string;
}

export function ModernTemplate({ 
  data, 
  primaryColor,
  backgroundColor = 'transparent',
  textColor = '#000000'
}: ModernTemplateProps) {
  const mutedTextColor = textColor === '#000000' ? '#666666' : '#999999';
  const hoverBgColor = textColor === '#000000' ? '#f5f5f5' : '#333333';

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
    <div 
      className="grid grid-cols-[auto_1fr] gap-6 items-center font-inter p-4"
      style={{ backgroundColor, color: textColor }}
    >
      {data.logo && (
        <img src={data.logo} alt="" className="w-16 h-16 rounded-lg" />
      )}

      <div className="space-y-3">
        <div>
          <h3 className="font-medium text-lg">{data.name}</h3>
          <p className="text-sm" style={{ color: mutedTextColor }}>
            {data.title}
            {data.company && (
              <>
                <span className="mx-1">·</span>
                <span>{data.company}</span>
              </>
            )}
          </p>
        </div>

        <div className="flex flex-wrap gap-2 text-sm">
          {data.email && (
            <a 
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors hover:bg-opacity-10"
              style={{ 
                backgroundColor: `${primaryColor}10`,
                color: primaryColor,
              }}
            >
              <Mail className="w-4 h-4" />
              {data.email}
            </a>
          )}

          {data.phone && (
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md"
              style={{ 
                backgroundColor: `${textColor}10`,
                color: mutedTextColor,
              }}
            >
              <Phone className="w-4 h-4" />
              {data.phone}
            </div>
          )}

          {data.website && (
            <a 
              href={data.website}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md transition-colors hover:bg-opacity-10"
              style={{ 
                backgroundColor: `${primaryColor}10`,
                color: primaryColor,
              }}
            >
              <Globe className="w-4 h-4" />
              {data.website.replace(/^https?:\/\//, '')}
            </a>
          )}

          {data.location && (
            <div 
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md"
              style={{ 
                backgroundColor: `${textColor}10`,
                color: mutedTextColor,
              }}
            >
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
                className="p-2 rounded-md transition-colors hover:bg-opacity-10"
                style={{ 
                  backgroundColor: `${primaryColor}10`,
                  color: primaryColor,
                }}
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