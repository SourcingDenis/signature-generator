import React from 'react';
import { Lightbulb } from 'lucide-react';

const tips = [
  {
    title: "Keep it Concise",
    description: "A good email signature should be 3-4 lines max. Focus on essential information only.",
    icon: "✨"
  },
  {
    title: "Use Brand Colors",
    description: "Match your signature colors with your company's brand palette for consistency.",
    icon: "🎨"
  },
  {
    title: "Mobile-Friendly",
    description: "Test your signature on mobile devices. Keep images small and text readable.",
    icon: "📱"
  },
  {
    title: "Social Links",
    description: "Include only relevant social media profiles that you actively maintain.",
    icon: "🔗"
  },
  {
    title: "Professional Photo",
    description: "If using a photo, ensure it's professional and properly sized (200-400px).",
    icon: "📸"
  }
];

export function TipsCarousel() {
  const [currentTip, setCurrentTip] = React.useState(0);
  const [direction, setDirection] = React.useState(0);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const nextTip = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentTip((prev) => (prev + 1) % tips.length);
    setTimeout(() => setIsAnimating(false), 600);
  };

  const goToTip = (index: number) => {
    if (isAnimating || index === currentTip) return;
    setIsAnimating(true);
    setDirection(index > currentTip ? 1 : -1);
    setCurrentTip(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  React.useEffect(() => {
    const interval = setInterval(nextTip, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="vercel-card overflow-hidden">
      <div className="p-8">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="w-5 h-5" />
          <h2 className="text-base font-medium">Tips & Tricks</h2>
        </div>

        <div className="relative overflow-hidden">
          <div 
            className={`
              transform transition-all duration-600 ease-out
              ${isAnimating ? (
                direction > 0 
                  ? '-translate-x-full opacity-0' 
                  : 'translate-x-full opacity-0'
              ) : 'translate-x-0 opacity-100'}
            `}
          >
            <div className="flex items-center gap-6">
              <span className="text-4xl select-none">{tips[currentTip].icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-medium mb-2">{tips[currentTip].title}</h3>
                <p className="text-base text-[#666] dark:text-[#888] leading-relaxed">
                  {tips[currentTip].description}
                </p>
              </div>
            </div>
          </div>

          {/* Next tip preview (for smooth transition) */}
          {isAnimating && (
            <div 
              className={`
                absolute inset-0 transform transition-all duration-600 ease-out
                ${direction > 0 ? 'translate-x-full' : '-translate-x-full'}
                ${isAnimating ? 'translate-x-0' : ''}
              `}
            >
              <div className="flex items-center gap-6">
                <span className="text-4xl select-none">
                  {tips[(currentTip + direction) % tips.length].icon}
                </span>
                <div className="flex-1">
                  <h3 className="text-lg font-medium mb-2">
                    {tips[(currentTip + direction) % tips.length].title}
                  </h3>
                  <p className="text-base text-[#666] dark:text-[#888] leading-relaxed">
                    {tips[(currentTip + direction) % tips.length].description}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            {tips.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTip(index)}
                className={`
                  w-2 h-2 rounded-full transition-all duration-300
                  ${currentTip === index 
                    ? 'bg-black dark:bg-white w-4' 
                    : 'bg-black/20 dark:bg-white/20 hover:bg-black/40 dark:hover:bg-white/40'
                  }
                `}
                aria-label={`Go to tip ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
