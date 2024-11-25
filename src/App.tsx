import React from 'react';
import { SignatureForm } from './components/SignatureForm';
import { StyleCustomizer } from './components/StyleCustomizer';
import { SignaturePreview } from './components/SignaturePreview';
import { TipsCarousel } from './components/TipsCarousel';
import { SignatureData, StyleConfig } from './types';
import { Sparkles, Moon, Sun } from 'lucide-react';
import { templatePresets } from './utils/templatePresets';
import { Footer } from './components/Footer';

const initialConfig: StyleConfig = {
  template: 'tech',
  primaryColor: '#6366f1',
  textColor: '#ffffff',
  backgroundColor: '#000000',
};

function App() {
  const [data, setData] = React.useState<SignatureData>(templatePresets.tech);
  const [config, setConfig] = React.useState<StyleConfig>(initialConfig);
  const [isDark, setIsDark] = React.useState(() => {
    // Check if theme was saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    // Check system preference if no saved theme
    if (!savedTheme) {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return savedTheme === 'dark';
  });

  React.useEffect(() => {
    // Update class and localStorage when theme changes
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  const updateData = (newData: Partial<SignatureData>) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const updateConfig = (newConfig: Partial<StyleConfig>) => {
    setConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const handleTemplateSelect = (template: StyleConfig['template'], templateData: SignatureData) => {
    setData(templateData);
    updateConfig({ template });
  };

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? 'dark' : ''}`}>
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-sm border-b border-[#eaeaea] dark:border-[#333] py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-[#0070f3] dark:text-white" />
              <h1 className="text-2xl font-semibold text-[#0070f3] dark:text-white">
                Signature Creator
              </h1>
            </div>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Preview section - will be first on mobile */}
            <div className="lg:order-2">
              <div className="hidden lg:block mb-8">
                <TipsCarousel />
              </div>
              <SignaturePreview data={data} config={config} isDark={isDark} />
              <div className="mt-8 lg:hidden">
                <TipsCarousel />
              </div>
            </div>

            {/* Form and Customizer section - will be second on mobile */}
            <div className="space-y-8 lg:order-1">
              <SignatureForm data={data} onChange={updateData} isDark={isDark} />
              <div className="lg:sticky lg:top-[88px]">
                <StyleCustomizer 
                  config={config} 
                  onChange={updateConfig}
                  onTemplateSelect={handleTemplateSelect}
                  isDark={isDark}
                />
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;