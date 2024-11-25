import React from 'react';
import { StyleConfig, SignatureData } from '../types';
import { Layout, Palette } from 'lucide-react';

interface StyleCustomizerProps {
  config: StyleConfig;
  onChange: (config: Partial<StyleConfig>) => void;
  onTemplateSelect: (template: StyleConfig['template'], data: SignatureData) => void;
  isDark?: boolean;
  data: SignatureData;
}

const templates = [
  { id: 'tech', name: 'Tech', description: 'Terminal-inspired theme' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple' },
  { id: 'modern', name: 'Modern', description: 'Contemporary and bold' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated and refined' },
  { id: 'creative', name: 'Creative', description: 'Unique and artistic' },
  { id: 'startup', name: 'Startup', description: 'Bold and energetic' },
];

export function StyleCustomizer({ config, onChange, onTemplateSelect, isDark, data }: StyleCustomizerProps) {
  return (
    <div className="vercel-card">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Layout className="w-4 h-4" />
          <h2 className="text-sm font-medium">Templates</h2>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => onTemplateSelect(template.id as StyleConfig['template'], data)}
              className={`group p-3 rounded-lg text-left transition-colors border
                ${config.template === template.id
                  ? 'border-black dark:border-white bg-black/5 dark:bg-white/10'
                  : 'border-[#eaeaea] dark:border-[#333] hover:border-[#999] dark:hover:border-[#666]'
                }`}
            >
              <p className={`text-sm font-medium mb-1
                ${config.template === template.id
                  ? 'text-black dark:text-white'
                  : 'text-[#666] dark:text-[#888] group-hover:text-black dark:group-hover:text-white'
                }`}
              >
                {template.name}
              </p>
              <p className="text-xs text-[#666] dark:text-[#888]">
                {template.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-[#eaeaea] dark:border-[#333] p-6">
        <div className="flex items-center gap-2 mb-4">
          <Palette className="w-4 h-4" />
          <h2 className="text-sm font-medium">Colors</h2>
        </div>
        <div className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full border border-[#eaeaea] dark:border-[#333]"
                style={{ backgroundColor: config.primaryColor }}
              />
              <span className="text-sm text-[#666] dark:text-[#888]">Primary</span>
            </div>
            <input
              type="color"
              value={config.primaryColor}
              onChange={(e) => onChange({ primaryColor: e.target.value })}
              className="w-full h-10 rounded-lg cursor-pointer appearance-none bg-gradient-to-r from-[#ff0000] via-[#00ff00] to-[#0000ff]"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full border border-[#eaeaea] dark:border-[#333]"
                style={{ backgroundColor: config.textColor }}
              />
              <span className="text-sm text-[#666] dark:text-[#888]">Text</span>
            </div>
            <input
              type="color"
              value={config.textColor}
              onChange={(e) => onChange({ textColor: e.target.value })}
              className="w-full h-10 rounded-lg cursor-pointer appearance-none bg-gradient-to-r from-black to-white"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div
                className="w-5 h-5 rounded-full border border-[#eaeaea] dark:border-[#333]"
                style={{ backgroundColor: config.backgroundColor }}
              />
              <span className="text-sm text-[#666] dark:text-[#888]">Background</span>
            </div>
            <input
              type="color"
              value={config.backgroundColor}
              onChange={(e) => onChange({ backgroundColor: e.target.value })}
              className="w-full h-10 rounded-lg cursor-pointer appearance-none bg-gradient-to-r from-black to-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}