import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github } from 'lucide-react';

interface TechTemplateProps {
  data: SignatureData;
  primaryColor: string;
  backgroundColor?: string;
  textColor?: string;
}

export function TechTemplate({ data, primaryColor, backgroundColor = '#111', textColor = '#e5e5e5' }: TechTemplateProps) {
  const borderColor = textColor === '#000000' ? '#ddd' : '#333';
  const mutedTextColor = textColor === '#000000' ? '#666' : '#999';
  const terminalRed = textColor === '#000000' ? '#ff4444' : '#ff5f56';
  const terminalYellow = textColor === '#000000' ? '#ffbb33' : '#ffbd2e';
  const terminalGreen = textColor === '#000000' ? '#00C851' : '#27c93f';
  const promptColor = textColor === '#000000' ? '#2ECC71' : '#98c379';
  const pathColor = textColor === '#000000' ? '#3498DB' : '#61afef';
  const linkColor = textColor === '#000000' ? '#0070f3' : '#61afef';

  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github
  } as const;

  return (
    <div 
      className="font-roboto-mono p-6 rounded-lg space-y-3"
      style={{ 
        backgroundColor,
        color: textColor,
      }}
    >
      {/* Terminal header */}
      <div 
        className="flex items-center gap-2 pb-4"
        style={{ borderBottom: `1px solid ${borderColor}` }}
      >
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: terminalRed }} />
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: terminalYellow }} />
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: terminalGreen }} />
        <span className="ml-2 text-sm" style={{ color: mutedTextColor }}>signature.sh</span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span style={{ color: promptColor }}>➜</span>
          <span style={{ color: pathColor }}>~</span>
          <span style={{ color: mutedTextColor }}>whoami</span>
        </div>
        <div className="pl-4">
          <p className="text-lg" style={{ color: primaryColor }}>{data.name}</p>
          <p className="text-sm" style={{ color: mutedTextColor }}>
            {data.title}@{data.company}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-2">
          <span style={{ color: promptColor }}>➜</span>
          <span style={{ color: pathColor }}>~</span>
          <span style={{ color: mutedTextColor }}>contact --list</span>
        </div>
        <div className="pl-4 space-y-1 text-sm">
          {data.email && (
            <p>
              <span style={{ color: mutedTextColor }}>EMAIL=</span>
              <a 
                href={`mailto:${data.email}`}
                style={{ color: linkColor }}
                className="hover:underline"
              >
                "{data.email}"
              </a>
            </p>
          )}
          {data.phone && (
            <p>
              <span style={{ color: mutedTextColor }}>TEL=</span>
              <span>"{data.phone}"</span>
            </p>
          )}
          {data.website && (
            <p>
              <span style={{ color: mutedTextColor }}>WWW=</span>
              <a 
                href={data.website}
                style={{ color: linkColor }}
                className="hover:underline"
              >
                "{data.website.replace(/^https?:\/\//, '')}"
              </a>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2 pt-2">
          <span style={{ color: promptColor }}>➜</span>
          <span style={{ color: pathColor }}>~</span>
          <span style={{ color: mutedTextColor }}>social-links</span>
        </div>
        <div className="pl-4 flex gap-3">
          {data.socials.linkedin && (
            <a 
              href={data.socials.linkedin}
              style={{ color: mutedTextColor }}
              className="hover:text-[inherit] transition-colors"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          )}
          {data.socials.twitter && (
            <a 
              href={data.socials.twitter}
              style={{ color: mutedTextColor }}
              className="hover:text-[inherit] transition-colors"
            >
              <Twitter className="w-4 h-4" />
            </a>
          )}
          {data.socials.github && (
            <a 
              href={data.socials.github}
              style={{ color: mutedTextColor }}
              className="hover:text-[inherit] transition-colors"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}