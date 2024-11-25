import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter, Github, Instagram, MessageCircle, MessagesSquare } from 'lucide-react';

interface StartupTemplateProps {
  data: SignatureData;
  primaryColor: string;
}

export function StartupTemplate({ data, primaryColor }: StartupTemplateProps) {
  const socialIcons = {
    linkedin: Linkedin,
    twitter: Twitter,
    github: Github,
    instagram: Instagram,
    telegram: MessageCircle,
    discord: MessagesSquare,
  };

  return (
    <div className="font-montserrat p-6 space-y-4">
      <div className="flex items-center gap-4">
        {data.logo && (
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-xl opacity-20 rotate-6"
              style={{ backgroundColor: primaryColor }}
            />
            <img src={data.logo} alt="" className="w-16 h-16 rounded-xl relative" />
          </div>
        )}
        
        <div>
          <h3 
            className="text-xl font-bold tracking-tight"
            style={{ color: primaryColor }}
          >
            {data.name}
          </h3>
          <p className="text-sm font-semibold mt-1">
            {data.title}
            {data.company && (
              <span className="font-normal text-gray-500">
                <span className="mx-2">at</span>
                <span className="font-medium">{data.company}</span>
              </span>
            )}
          </p>
        </div>
      </div>

      <div 
        className="h-1 w-12 rounded-full"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="grid grid-cols-2 gap-2 text-sm">
        {data.email && (
          <a 
            href={`mailto:${data.email}`}
            className="flex items-center gap-2 hover:underline"
            style={{ color: primaryColor }}
          >
            <Mail className="w-4 h-4" />
            <span>{data.email}</span>
          </a>
        )}
        {data.phone && (
          <div className="flex items-center gap-2 text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{data.phone}</span>
          </div>
        )}
        {data.website && (
          <a 
            href={data.website}
            className="flex items-center gap-2 hover:underline"
            style={{ color: primaryColor }}
          >
            <Globe className="w-4 h-4" />
            <span>{data.website.replace(/^https?:\/\//, '')}</span>
          </a>
        )}
        {data.location && (
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{data.location}</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        {Object.entries(data.socials).map(([platform, url]) => {
          if (!url) return null;
          const Icon = socialIcons[platform as keyof typeof socialIcons];
          return (
            <a
              key={platform}
              href={platform === 'discord' ? '#' : url}
              className="p-2 rounded-lg transition-colors hover:bg-gray-100"
              style={{ color: primaryColor }}
              title={platform === 'discord' ? url : undefined}
            >
              <Icon className="w-4 h-4" />
            </a>
          );
        })}
      </div>
    </div>
  );
}