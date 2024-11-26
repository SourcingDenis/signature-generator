import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

interface ModernTemplateProps {
  data: SignatureData;
  primaryColor: string;
  backgroundColor?: string;
  textColor?: string;
}

export function ModernTemplate({ 
  data, 
  primaryColor,
  backgroundColor = '#ffffff',
  textColor = '#000000'
}: ModernTemplateProps) {
  const mutedTextColor = textColor === '#000000' ? '#666666' : '#999999';
  const hoverBgColor = textColor === '#000000' ? '#f5f5f5' : '#333333';

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github
  } as const;

  return (
    <div 
      className="grid grid-cols-[auto_1fr] gap-6 items-center font-inter p-4"
      style={{ backgroundColor, color: textColor }}
    >
      {data.logo && (
        <img src={data.logo} alt="" className="w-20 h-20 rounded-xl shadow-lg" />
      )}
      <div className="space-y-3">
        <div>
          <h3 className="text-2xl font-bold tracking-tight" style={{ color: primaryColor }}>
            {data.name}
          </h3>
          <p className="text-sm font-medium mt-1" style={{ color: mutedTextColor }}>
            {data.title} {data.company && <span style={{ color: mutedTextColor }}>@</span>} {data.company}
          </p>
        </div>
        
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
          {data.email && (
            <a 
              href={`mailto:${data.email}`} 
              className="flex items-center gap-2 hover:underline group"
              style={{ color: textColor }}
            >
              <Mail className="w-4 h-4 transition-colors" style={{ color: primaryColor }} />
              <span>{data.email}</span>
            </a>
          )}
          {data.phone && (
            <span className="flex items-center gap-2">
              <Phone className="w-4 h-4" style={{ color: mutedTextColor }} />
              {data.phone}
            </span>
          )}
          {data.website && (
            <a 
              href={data.website} 
              className="flex items-center gap-2 hover:underline group"
              style={{ color: textColor }}
            >
              <Globe className="w-4 h-4 transition-colors" style={{ color: primaryColor }} />
              <span>{data.website.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>

        <div className="flex items-center gap-3 pt-1">
          {data.socials.linkedin && (
            <a 
              href={data.socials.linkedin} 
              className="p-2 rounded-full transition-colors"
              style={{ 
                color: mutedTextColor,
                ':hover': { backgroundColor: hoverBgColor, color: textColor }
              }}
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {data.socials.twitter && (
            <a 
              href={data.socials.twitter} 
              className="p-2 rounded-full transition-colors"
              style={{ 
                color: mutedTextColor,
                ':hover': { backgroundColor: hoverBgColor, color: textColor }
              }}
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {data.socials.github && (
            <a 
              href={data.socials.github} 
              className="p-2 rounded-full transition-colors"
              style={{ 
                color: mutedTextColor,
                ':hover': { backgroundColor: hoverBgColor, color: textColor }
              }}
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}