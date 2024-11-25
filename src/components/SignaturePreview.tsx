import React, { useCallback, useState } from 'react';
import { SignatureData, StyleConfig } from '../types';
import { Download, Copy, GripVertical } from 'lucide-react';
import * as htmlToImage from 'html-to-image';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ModernTemplate } from './templates/ModernTemplate';
import { ElegantTemplate } from './templates/ElegantTemplate';
import { CreativeTemplate } from './templates/CreativeTemplate';
import { MinimalistTemplate } from './templates/MinimalistTemplate';
import { TechTemplate } from './templates/TechTemplate';
import { StartupTemplate } from './templates/StartupTemplate';
import { Code, FileText } from 'lucide-react';

interface SignaturePreviewProps {
  data: SignatureData;
  config: StyleConfig;
  isDark?: boolean;
  previewMode: 'rendered' | 'html';
  setPreviewMode: (mode: 'rendered' | 'html') => void;
}

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
}

function SortableItem({ id, children }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center gap-2 group min-h-[24px]"
    >
      <button
        {...attributes}
        {...listeners}
        className="opacity-0 group-hover:opacity-100 p-1 text-[#666] dark:text-[#999] hover:text-[#000] dark:hover:text-[#fff] cursor-grab touch-none"
        aria-label="Drag to reorder"
      >
        <GripVertical className="w-4 h-4" />
      </button>
      <div className="flex-1 min-w-0">{children}</div>
    </div>
  );
}

export function SignaturePreview({ data, config, isDark, previewMode, setPreviewMode }: SignaturePreviewProps) {
  const previewRef = React.useRef<HTMLDivElement>(null);
  const [elements, setElements] = React.useState(['name', 'title', 'contact', 'social']);

  const getCleanHTML = useCallback(() => {
    if (!previewRef.current) return '';
    
    // Create a clone of the signature element
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = previewRef.current.innerHTML;

    // Function to process an element and its children
    const processElement = (element: Element) => {
      // Remove React-specific attributes
      element.removeAttribute('data-reactroot');
      const attrs = element.attributes;
      for (let i = attrs.length - 1; i >= 0; i--) {
        const attr = attrs[i];
        if (attr.name.startsWith('data-react') || attr.name === 'aria-label') {
          element.removeAttribute(attr.name);
        }
      }

      // Process children recursively
      Array.from(element.children).forEach(child => processElement(child));

      // Get computed styles for this element
      const computedStyle = window.getComputedStyle(element);
      const importantStyles = [
        'color',
        'background-color',
        'font-family',
        'font-size',
        'font-weight',
        'line-height',
        'padding',
        'margin',
        'border',
        'display',
        'flex-direction',
        'align-items',
        'justify-content',
        'gap',
        'text-decoration',
        'width',
        'height'
      ];

      // Create inline style string with computed values
      const inlineStyles = importantStyles
        .map(prop => {
          const value = computedStyle.getPropertyValue(prop);
          return value ? `${prop}: ${value}` : null;
        })
        .filter(Boolean)
        .join('; ');

      if (inlineStyles) {
        const currentStyle = element.getAttribute('style') || '';
        element.setAttribute('style', `${currentStyle}${currentStyle ? '; ' : ''}${inlineStyles}`);
      }
    };

    // Process the clone
    processElement(tempDiv);

    // Add necessary CSS reset and font imports
    const styleReset = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
    `;

    // Wrap the HTML with style tag and body
    const wrappedHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <style>
    ${styleReset}
  </style>
</head>
<body style="margin: 0; padding: 16px;">
  ${tempDiv.innerHTML}
</body>
</html>`;

    return wrappedHTML;
  }, []);

  const downloadContent = useCallback(async () => {
    if (!previewRef.current) return;
    
    if (previewMode === 'rendered') {
      try {
        const dataUrl = await htmlToImage.toPng(previewRef.current, {
          quality: 1.0,
          pixelRatio: 2,
          skipAutoScale: true,
          style: {
            transform: 'none',
          },
        });
        const link = document.createElement('a');
        link.download = `${data.name || 'signature'}.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to download image:', err);
      }
    } else {
      try {
        const cleanHTML = getCleanHTML();
        const blob = new Blob([cleanHTML], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `${data.name || 'signature'}.html`;
        link.href = url;
        link.click();
        URL.revokeObjectURL(url);
      } catch (err) {
        console.error('Failed to download HTML:', err);
      }
    }
  }, [previewMode, data.name, getCleanHTML]);

  const copyToClipboard = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      const cleanHTML = getCleanHTML();
      await navigator.clipboard.writeText(cleanHTML);
    } catch (err) {
      console.error('Failed to copy HTML:', err);
    }
  }, [getCleanHTML]);

  const handleButtonClick = useCallback(() => {
    if (previewMode === 'rendered') {
      downloadContent();
    } else {
      copyToClipboard();
    }
  }, [previewMode, downloadContent, copyToClipboard]);

  const copyAsImage = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      const dataUrl = await htmlToImage.toPng(previewRef.current, {
        quality: 1.0,
        pixelRatio: 2,
        skipAutoScale: true,
      });

      const blob = await fetch(dataUrl).then(r => r.blob());
      await navigator.clipboard.write([
        new ClipboardItem({
          'image/png': blob
        })
      ]);
    } catch (err) {
      console.error('Failed to copy image:', err);
    }
  }, []);

  const copyAsRichText = useCallback(async () => {
    if (!previewRef.current) return;
    try {
      // Create a temporary container with the signature content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = previewRef.current.innerHTML;

      // Clean up the content for rich text
      const cleanHTML = tempDiv.innerHTML
        .replace(/\s+class="[^"]*"/g, '')
        .replace(/data-react[^=]*="[^"]*"/g, '')
        .replace(/aria-label="[^"]*"/g, '');

      // Create a Blob with HTML content
      const blob = new Blob([cleanHTML], { type: 'text/html' });
      
      // Create clipboard data
      await navigator.clipboard.write([
        new ClipboardItem({
          'text/html': blob,
        })
      ]);
    } catch (err) {
      console.error('Failed to copy as rich text:', err);
    }
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const renderTemplate = () => {
    const props = {
      data,
      primaryColor: config.primaryColor,
      backgroundColor: config.backgroundColor,
      textColor: config.textColor,
      isDark,
    };

    switch (config.template) {
      case 'modern':
        return <ModernTemplate {...props} />;
      case 'elegant':
        return <ElegantTemplate {...props} />;
      case 'creative':
        return <CreativeTemplate {...props} />;
      case 'minimal':
        return <MinimalistTemplate {...props} />;
      case 'startup':
        return <StartupTemplate {...props} />;
      default:
        return <TechTemplate {...props} />;
    }
  };

  return (
    <div className="vercel-card space-y-4">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-medium">Preview</h2>
            <div className="flex items-center rounded-md bg-[#eaeaea] dark:bg-[#333] p-1">
              <button
                onClick={() => setPreviewMode('rendered')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  previewMode === 'rendered' 
                    ? 'bg-white dark:bg-black text-black dark:text-white' 
                    : 'text-[#666] dark:text-[#999] hover:text-black dark:hover:text-white'
                }`}
              >
                Rendered
              </button>
              <button
                onClick={() => setPreviewMode('html')}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${
                  previewMode === 'html'
                    ? 'bg-white dark:bg-black text-black dark:text-white'
                    : 'text-[#666] dark:text-[#999] hover:text-black dark:hover:text-white'
                }`}
              >
                HTML
              </button>
            </div>
          </div>
          <button
            onClick={handleButtonClick}
            className="vercel-button inline-flex items-center gap-2"
            title={previewMode === 'rendered' ? 'Download as PNG' : 'Copy HTML to clipboard'}
          >
            {previewMode === 'rendered' ? (
              <>
                <Download className="w-4 h-4" />
                PNG
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                Copy
              </>
            )}
          </button>
        </div>

        {previewMode === 'rendered' ? (
          <div
            ref={previewRef}
            className="vercel-card overflow-hidden"
          >
            {renderTemplate()}
          </div>
        ) : (
          <div className="vercel-card overflow-hidden bg-[#fafafa] dark:bg-[#111]">
            <pre className="overflow-auto p-4 text-sm font-mono whitespace-pre-wrap break-all">
              {getCleanHTML()}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}