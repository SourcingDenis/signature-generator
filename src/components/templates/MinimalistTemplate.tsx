import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github, Instagram, Send, MessageSquare } from 'lucide-react';

interface MinimalistTemplateProps {
  data: SignatureData;
  primaryColor: string;
  backgroundColor?: string;
  textColor?: string;
}

export function MinimalistTemplate({ 
  data, 
  primaryColor,
  backgroundColor = 'transparent',
  textColor = '#000000'
}: MinimalistTemplateProps) {
  const mutedTextColor = textColor === '#000000' ? '#666666' : '#999999';
  const hoverColor = textColor === '#000000' ? '#000000' : '#ffffff';

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
      className="font-inter space-y-4 pl-4 border-l"
      style={{ 
        backgroundColor,
        color: textColor,
        borderColor: primaryColor 
      }}
    >
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

      <div className="space-y-1 text-sm">
        {data.email && (
          <a 
            href={`mailto:${data.email}`}
            className="block hover:underline"
            style={{ color: primaryColor }}
          >
            <span className="inline-flex items-center gap-2">
              <Mail className="w-4 h-4" />
              {data.email}
            </span>
          </a>
        )}
        {data.phone && (
          <div style={{ color: mutedTextColor }}>
            <span className="inline-flex items-center gap-2">
              <Phone className="w-4 h-4" />
              {data.phone}
            </span>
          </div>
        )}
        {data.website && (
          <a 
            href={data.website}
            className="block hover:underline"
            style={{ color: primaryColor }}
          >
            <span className="inline-flex items-center gap-2">
              <Globe className="w-4 h-4" />
              {data.website.replace(/^https?:\/\//, '')}
            </span>
          </a>
        )}
        {data.location && (
          <div style={{ color: mutedTextColor }}>
            <span className="inline-flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {data.location}
            </span>
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
              className="hover:opacity-80 transition-opacity"
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
  );
}