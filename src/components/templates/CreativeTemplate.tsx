import React from 'react';
import { SignatureData } from '../../types';
import { Mail, Phone, Globe, MapPin, Linkedin, Twitter } from 'lucide-react';

interface CreativeTemplateProps {
  data: SignatureData;
  primaryColor: string;
}

export function CreativeTemplate({ data, primaryColor }: CreativeTemplateProps) {
  const gradientStyle = {
    background: `linear-gradient(135deg, ${primaryColor}22 0%, transparent 100%)`,
    borderColor: primaryColor,
  };

  return (
    <div className="font-montserrat p-6 rounded-2xl border-2 relative overflow-hidden" style={gradientStyle}>
      {/* Background decorative circles */}
      <div 
        className="absolute -right-8 -top-8 w-24 h-24 rounded-full opacity-10"
        style={{ backgroundColor: primaryColor }}
      />
      <div 
        className="absolute -right-4 -top-4 w-16 h-16 rounded-full opacity-10"
        style={{ backgroundColor: primaryColor }}
      />

      <div className="relative flex items-start gap-6">
        {data.logo && (
          <div className="relative">
            <div 
              className="absolute inset-0 rounded-2xl opacity-20 blur-xl"
              style={{ backgroundColor: primaryColor }}
            />
            <img src={data.logo} alt="" className="w-24 h-24 rounded-2xl relative" />
          </div>
        )}

        <div className="space-y-4 flex-1">
          <div>
            <h3 
              className="text-2xl font-bold"
              style={{ color: primaryColor }}
            >
              {data.name}
            </h3>
            <p className="text-sm font-medium mt-1 tracking-wide uppercase text-gray-600">
              {data.title} 
              {data.company && (
                <span className="normal-case">
                  <span className="mx-2">at</span>
                  {data.company}
                </span>
              )}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            {data.email && (
              <a 
                href={`mailto:${data.email}`} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors group"
              >
                <Mail className="w-4 h-4 text-gray-400 group-hover:text-current transition-colors" style={{ color: primaryColor }} />
                <span className="truncate">{data.email}</span>
              </a>
            )}
            {data.phone && (
              <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="truncate">{data.phone}</span>
              </span>
            )}
            {data.website && (
              <a 
                href={data.website} 
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors group"
              >
                <Globe className="w-4 h-4 text-gray-400 group-hover:text-current transition-colors" style={{ color: primaryColor }} />
                <span className="truncate">{data.website.replace(/^https?:\/\//, '')}</span>
              </a>
            )}
            {data.location && (
              <span className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/50">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="truncate">{data.location}</span>
              </span>
            )}
          </div>

          <div className="flex gap-2">
            {data.socials.linkedin && (
              <a 
                href={data.socials.linkedin}
                className="p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                style={{ color: primaryColor }}
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {data.socials.twitter && (
              <a 
                href={data.socials.twitter}
                className="p-2 rounded-lg bg-white/50 hover:bg-white/80 transition-colors"
                style={{ color: primaryColor }}
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}