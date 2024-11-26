import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github, Instagram, Send, MessageSquare } from 'lucide-react';

interface ElegantTemplateProps {
  data: SignatureData;
  primaryColor: string;
  backgroundColor?: string;
  textColor?: string;
}

export function ElegantTemplate({ 
  data, 
  primaryColor,
  backgroundColor = 'transparent',
  textColor = '#000000'
}: ElegantTemplateProps) {
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
      className="relative font-playfair py-6"
      style={{ backgroundColor, color: textColor }}
    >
      <div 
        className="absolute top-0 left-0 right-0 h-px opacity-20"
        style={{ backgroundColor: primaryColor }}
      />
      <div 
        className="absolute bottom-0 left-0 right-0 h-px opacity-20"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="px-6 space-y-4">
        <div className="flex items-center gap-4">
          {data.logo && (
            <img src={data.logo} alt="" className="w-16 h-16 rounded-full" />
          )}
          
          <div>
            <h3 
              className="text-xl font-semibold tracking-wide"
              style={{ color: primaryColor }}
            >
              {data.name}
            </h3>
            <p className="text-sm tracking-wide mt-0.5" style={{ color: mutedTextColor }}>
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

        <div className="flex flex-wrap gap-4 text-sm">
          {data.email && (
            <a 
              href={`mailto:${data.email}`}
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: primaryColor }}
            >
              <Mail className="w-4 h-4" />
              {data.email}
            </a>
          )}
          {data.phone && (
            <div 
              className="inline-flex items-center gap-2"
              style={{ color: mutedTextColor }}
            >
              <Phone className="w-4 h-4" />
              {data.phone}
            </div>
          )}
          {data.website && (
            <a 
              href={data.website}
              className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity"
              style={{ color: primaryColor }}
            >
              <Globe className="w-4 h-4" />
              {data.website.replace(/^https?:\/\//, '')}
            </a>
          )}
          {data.location && (
            <div 
              className="inline-flex items-center gap-2"
              style={{ color: mutedTextColor }}
            >
              <MapPin className="w-4 h-4" />
              {data.location}
            </div>
          )}
        </div>

        <div className="flex gap-3">
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
    </div>
  );
}