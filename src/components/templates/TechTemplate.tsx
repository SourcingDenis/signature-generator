import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github, Instagram, Send, MessageSquare } from 'lucide-react';

interface TechTemplateProps {
  data: SignatureData;
  primaryColor: string;
  backgroundColor?: string;
  textColor?: string;
}

export function TechTemplate({ 
  data, 
  primaryColor,
  backgroundColor = '#000000',
  textColor = '#ffffff'
}: TechTemplateProps) {
  const terminalGreen = textColor === '#000000' ? '#00C851' : '#27c93f';
  const promptColor = textColor === '#000000' ? '#2ECC71' : '#98c379';
  const pathColor = textColor === '#000000' ? '#3498DB' : '#61afef';
  const linkColor = textColor === '#000000' ? '#0070f3' : '#61afef';

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
      className="font-roboto-mono p-6 rounded-lg space-y-3"
      style={{ 
        backgroundColor,
        color: textColor,
      }}
    >
      <div className="flex items-center gap-3">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        {data.logo && (
          <img src={data.logo} alt="" className="w-5 h-5 rounded ml-2" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span style={{ color: promptColor }}>➜</span>
          <span style={{ color: pathColor }}>~/workspace</span>
          <span style={{ color: promptColor }}>whoami</span>
        </div>
        <div className="pl-4">
          <div>
            <span style={{ color: terminalGreen }}>name:</span> {data.name}
          </div>
          <div>
            <span style={{ color: terminalGreen }}>title:</span> {data.title}
            {data.company && (
              <>
                <span style={{ color: terminalGreen }}> @ </span>
                {data.company}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span style={{ color: promptColor }}>➜</span>
          <span style={{ color: pathColor }}>~/workspace</span>
          <span style={{ color: promptColor }}>contact</span>
        </div>
        <div className="pl-4 space-y-1">
          {data.email && (
            <div>
              <span style={{ color: terminalGreen }}>email:</span>{' '}
              <a 
                href={`mailto:${data.email}`}
                className="hover:underline"
                style={{ color: linkColor }}
              >
                {data.email}
              </a>
            </div>
          )}
          {data.phone && (
            <div>
              <span style={{ color: terminalGreen }}>phone:</span> {data.phone}
            </div>
          )}
          {data.website && (
            <div>
              <span style={{ color: terminalGreen }}>web:</span>{' '}
              <a 
                href={data.website}
                className="hover:underline"
                style={{ color: linkColor }}
              >
                {data.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
          )}
          {data.location && (
            <div>
              <span style={{ color: terminalGreen }}>location:</span> {data.location}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span style={{ color: promptColor }}>➜</span>
          <span style={{ color: pathColor }}>~/workspace</span>
          <span style={{ color: promptColor }}>socials</span>
        </div>
        <div className="pl-4 flex gap-3">
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
                style={{ color: linkColor }}
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