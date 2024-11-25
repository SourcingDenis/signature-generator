import React from 'react';
import { SignatureData } from '../types';
import { 
  User, 
  Briefcase, 
  Building2, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  Linkedin, 
  Twitter,
  Github,
  Instagram,
  MessageCircle,
  MessagesSquare
} from 'lucide-react';
import { Input } from './Input';
import { ImageUpload } from './ImageUpload';

interface SignatureFormProps {
  data: SignatureData;
  onChange: (data: Partial<SignatureData>) => void;
  isDark?: boolean;
}

export function SignatureForm({ data, onChange, isDark }: SignatureFormProps) {
  const handleSocialChange = (key: keyof SignatureData['socials'], username: string) => {
    let value = '';
    if (username) {
      username = username.replace('@', '');
      switch (key) {
        case 'linkedin':
          value = `https://linkedin.com/in/${username}`;
          break;
        case 'twitter':
          value = `https://twitter.com/${username}`;
          break;
        case 'github':
          value = `https://github.com/${username}`;
          break;
        case 'instagram':
          value = `https://instagram.com/${username}`;
          break;
        case 'telegram':
          value = `https://t.me/${username}`;
          break;
        case 'discord':
          value = username;
          break;
      }
    }

    onChange({
      socials: {
        ...data.socials,
        [key]: value
      }
    });
  };

  const getSocialUsername = (url: string | undefined, platform: keyof SignatureData['socials']): string => {
    if (!url) return '';
    switch (platform) {
      case 'linkedin':
        return url.replace('https://linkedin.com/in/', '@');
      case 'twitter':
        return url.replace('https://twitter.com/', '@');
      case 'github':
        return url.replace('https://github.com/', '@');
      case 'instagram':
        return url.replace('https://instagram.com/', '@');
      case 'telegram':
        return url.replace('https://t.me/', '@');
      case 'discord':
        return url;
      default:
        return url;
    }
  };

  return (
    <div className="vercel-card">
      <div className="p-6">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <ImageUpload
              value={data.logo}
              onChange={(logo) => onChange({ logo })}
              isDark={isDark}
            />
          </div>

          <div className="flex-1 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Full Name"
                value={data.name}
                onChange={(name) => onChange({ name })}
                placeholder="John Doe"
                icon={<User className="h-4 w-4" />}
                isDark={isDark}
              />

              <Input
                label="Job Title"
                value={data.title}
                onChange={(title) => onChange({ title })}
                placeholder="Senior Developer"
                icon={<Briefcase className="h-4 w-4" />}
                isDark={isDark}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Company"
                value={data.company}
                onChange={(company) => onChange({ company })}
                placeholder="Tech Corp"
                icon={<Building2 className="h-4 w-4" />}
                isDark={isDark}
              />

              <Input
                label="Location"
                value={data.location}
                onChange={(location) => onChange({ location })}
                placeholder="San Francisco, CA"
                icon={<MapPin className="h-4 w-4" />}
                isDark={isDark}
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <Input
                label="Email"
                value={data.email}
                onChange={(email) => onChange({ email })}
                placeholder="john@techcorp.com"
                icon={<Mail className="h-4 w-4" />}
                isDark={isDark}
              />

              <Input
                label="Phone"
                value={data.phone}
                onChange={(phone) => onChange({ phone })}
                placeholder="+1 (555) 123-4567"
                icon={<Phone className="h-4 w-4" />}
                isDark={isDark}
              />

              <Input
                label="Website"
                value={data.website}
                onChange={(website) => onChange({ website })}
                placeholder="www.techcorp.com"
                icon={<Globe className="h-4 w-4" />}
                isDark={isDark}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-[#eaeaea] dark:border-[#333] p-6">
        <h2 className="text-sm font-medium mb-4">Social Media</h2>
        <div className="grid grid-cols-3 gap-3">
          <Input
            label="LinkedIn"
            value={getSocialUsername(data.socials?.linkedin, 'linkedin')}
            onChange={(value) => handleSocialChange('linkedin', value)}
            placeholder="@johndoe"
            icon={<Linkedin className="h-4 w-4" />}
            isDark={isDark}
          />

          <Input
            label="Twitter"
            value={getSocialUsername(data.socials?.twitter, 'twitter')}
            onChange={(value) => handleSocialChange('twitter', value)}
            placeholder="@johndoe"
            icon={<Twitter className="h-4 w-4" />}
            isDark={isDark}
          />

          <Input
            label="GitHub"
            value={getSocialUsername(data.socials?.github, 'github')}
            onChange={(value) => handleSocialChange('github', value)}
            placeholder="@johndoe"
            icon={<Github className="h-4 w-4" />}
            isDark={isDark}
          />

          <Input
            label="Instagram"
            value={getSocialUsername(data.socials?.instagram, 'instagram')}
            onChange={(value) => handleSocialChange('instagram', value)}
            placeholder="@johndoe"
            icon={<Instagram className="h-4 w-4" />}
            isDark={isDark}
          />

          <Input
            label="Telegram"
            value={getSocialUsername(data.socials?.telegram, 'telegram')}
            onChange={(value) => handleSocialChange('telegram', value)}
            placeholder="@johndoe"
            icon={<MessageCircle className="h-4 w-4" />}
            isDark={isDark}
          />

          <Input
            label="Discord"
            value={data.socials?.discord || ''}
            onChange={(value) => handleSocialChange('discord', value)}
            placeholder="johndoe#1234"
            icon={<MessagesSquare className="h-4 w-4" />}
            isDark={isDark}
          />
        </div>
      </div>
    </div>
  );
}