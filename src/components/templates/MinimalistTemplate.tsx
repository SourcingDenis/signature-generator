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
  backgroundColor = '#ffffff',
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

  return (
    <div 
      className="font-inter space-y-4 pl-4 border-l"
      style={{ 
        backgroundColor,
        color: textColor,
        borderColor: primaryColor
      }}
    >
      <div className="flex items-center gap-3">
        {data.logo && (
          <img src={data.logo} alt="" className="w-10 h-10 rounded-full" />
        )}
        <div>
          <h3 className="text-base font-medium" style={{ color: primaryColor }}>
            {data.name}
          </h3>
          <p className="text-sm" style={{ color: mutedTextColor }}>
            {data.title}
          </p>
        </div>
      </div>

      <div className="text-sm space-y-1" style={{ color: mutedTextColor }}>
        {data.email && (
          <a 
            href={`mailto:${data.email}`} 
            className="block hover:underline"
            style={{ 
              color: 'inherit',
              ':hover': { color: hoverColor }
            }}
          >
            {data.email}
          </a>
        )}
        {data.phone && <p>{data.phone}</p>}
        {data.website && (
          <a 
            href={data.website} 
            className="block hover:underline"
            style={{ 
              color: 'inherit',
              ':hover': { color: hoverColor }
            }}
          >
            {data.website.replace(/^https?:\/\//, '')}
          </a>
        )}
      </div>

      {(data.socials.linkedin || data.socials.twitter) && (
        <div className="flex gap-2 pt-1">
          {data.socials.linkedin && (
            <a 
              href={data.socials.linkedin}
              style={{ 
                color: mutedTextColor,
                ':hover': { color: hoverColor }
              }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {data.socials.twitter && (
            <a 
              href={data.socials.twitter}
              style={{ 
                color: mutedTextColor,
                ':hover': { color: hoverColor }
              }}
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}