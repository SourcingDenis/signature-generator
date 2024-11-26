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
  backgroundColor = '#ffffff',
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

  return (
    <div 
      className="relative font-playfair py-6"
      style={{ backgroundColor, color: textColor }}
    >
      {/* Decorative elements */}
      <div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-current to-transparent" 
        style={{ color: primaryColor, opacity: 0.3 }} 
      />
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-current to-transparent" 
        style={{ color: primaryColor, opacity: 0.3 }} 
      />
      
      <div className="text-center space-y-4">
        {data.logo && (
          <div className="flex justify-center mb-4">
            <div className="p-1 rounded-full" style={{ backgroundColor: primaryColor }}>
              <img src={data.logo} alt="" className="w-16 h-16 rounded-full" />
            </div>
          </div>
        )}

        <div>
          <h3 className="text-2xl font-light tracking-widest" style={{ color: primaryColor }}>
            {data.name}
          </h3>
          <p className="text-sm italic mt-2" style={{ color: mutedTextColor }}>
            {data.title}
            {data.company && (
              <>
                <span className="mx-2" style={{ color: mutedTextColor }}>·</span>
                <span>{data.company}</span>
              </>
            )}
          </p>
        </div>

        <div className="w-12 h-12 mx-auto relative">
          <div 
            className="absolute inset-0 rotate-45 border-t border-l" 
            style={{ borderColor: primaryColor, opacity: 0.3 }} 
          />
          <div 
            className="absolute inset-0 -rotate-45 border-t border-l" 
            style={{ borderColor: primaryColor, opacity: 0.3 }} 
          />
        </div>

        <div className="font-inter text-sm space-y-1">
          {data.email && (
            <a 
              href={`mailto:${data.email}`} 
              className="block hover:underline"
              style={{ color: primaryColor }}
            >
              {data.email}
            </a>
          )}
          {data.phone && (
            <p style={{ color: mutedTextColor }}>
              {data.phone}
            </p>
          )}
          {data.website && (
            <a 
              href={data.website} 
              className="block hover:underline"
              style={{ color: primaryColor }}
            >
              {data.website.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>

        {(data.socials.linkedin || data.socials.twitter) && (
          <div className="flex justify-center gap-4 pt-2">
            {data.socials.linkedin && (
              <a 
                href={data.socials.linkedin}
                style={{ 
                  color: mutedTextColor,
                  ':hover': { color: primaryColor }
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
                  ':hover': { color: primaryColor }
                }}
              >
                <Twitter className="w-4 h-4" />
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  );
}