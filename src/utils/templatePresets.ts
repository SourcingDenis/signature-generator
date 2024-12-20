import { SignatureData } from '../types';

const defaultSocials = {
  linkedin: '',
  twitter: '',
  github: ''
} as const;

export const templatePresets: Record<string, SignatureData> = {
  minimal: {
    name: 'John Doe',
    title: 'Software Engineer',
    company: 'TechCorp',
    email: 'john@techcorp.com',
    phone: '+1 (555) 123-4567',
    website: 'www.techcorp.com',
    logo: '',
    location: 'San Francisco, CA',
    socials: { ...defaultSocials },
  },
  modern: {
    name: 'Sarah Anderson',
    title: 'Product Designer',
    company: 'DesignCraft',
    email: 'sarah@designcraft.com',
    phone: '+1 (555) 234-5678',
    website: 'www.designcraft.com',
    logo: '',
    location: 'New York, NY',
    socials: { 
      ...defaultSocials,
      linkedin: 'https://linkedin.com/in/sarahanderson',
      twitter: 'https://twitter.com/sarahdesigns'
    },
  },
  elegant: {
    name: 'Michael Chen',
    title: 'Creative Director',
    company: 'ArtisanStudio',
    email: 'michael@artisanstudio.com',
    phone: '+1 (555) 345-6789',
    website: 'www.artisanstudio.com',
    logo: '',
    location: 'Los Angeles, CA',
    socials: { 
      ...defaultSocials,
      linkedin: 'https://linkedin.com/in/michaelchen',
      twitter: 'https://twitter.com/michaelcreates'
    },
  },
  creative: {
    name: 'Emma Thompson',
    title: 'Marketing Manager',
    company: 'CreativeWave',
    email: 'emma@creativewave.co',
    phone: '+1 (555) 456-7890',
    website: 'www.creativewave.co',
    logo: '',
    location: 'Austin, TX',
    socials: { 
      ...defaultSocials,
      twitter: 'https://twitter.com/emmacreates'
    },
  },
  tech: {
    name: 'Alex Rodriguez',
    title: 'Senior Developer',
    company: 'CodeLabs',
    email: 'alex@codelabs.dev',
    phone: '+1 (555) 567-8901',
    website: 'www.codelabs.dev',
    logo: '',
    location: 'Seattle, WA',
    socials: { 
      ...defaultSocials,
      github: 'https://github.com/alexdev',
      linkedin: 'https://linkedin.com/in/alexdev'
    },
  },
};