export interface SignatureData {
  name: string;
  title: string;
  company: string;
  phone: string;
  email: string;
  website: string;
  logo: string;
  location: string;
  socials: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
    telegram?: string;
    discord?: string;
  };
}

export interface StyleConfig {
  template: 'minimal' | 'modern' | 'elegant' | 'creative' | 'tech' | 'startup';
  primaryColor: string;
  textColor: string;
  backgroundColor: string;
}