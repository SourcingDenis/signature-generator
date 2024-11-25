import React from 'react';
import { User, AlertCircle } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  isDark?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export function ImageUpload({ value, onChange, label = 'Profile Photo', isDark }: ImageUploadProps) {
  const [error, setError] = React.useState<string>('');
  const [isDragging, setIsDragging] = React.useState(false);

  const validateFile = (file: File): boolean => {
    setError('');

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, GIF, or WebP)');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB');
      return false;
    }

    return true;
  };

  const processImage = (file: File) => {
    if (!validateFile(file)) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        const MAX_SIZE = 400;
        let width = img.width;
        let height = img.height;
        
        if (width > height && width > MAX_SIZE) {
          height = (height * MAX_SIZE) / width;
          width = MAX_SIZE;
        } else if (height > MAX_SIZE) {
          width = (width * MAX_SIZE) / height;
          height = MAX_SIZE;
        }

        canvas.width = width;
        canvas.height = height;
        ctx?.drawImage(img, 0, 0, width, height);

        const optimizedDataUrl = canvas.toDataURL(file.type, 0.8);
        onChange(optimizedDataUrl);
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);

    const file = event.dataTransfer.files[0];
    if (file) {
      processImage(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent) => {
    event.preventDefault();
    setIsDragging(false);
  };

  return (
    <div>
      <p className="text-xs text-[#666] dark:text-[#888] mb-1.5">{label}</p>
      <div
        className={`w-[104px] h-[104px] rounded-lg flex flex-col items-center justify-center overflow-hidden border-2 border-dashed transition-colors
          ${isDragging ? 'border-[#000] dark:border-[#fff]' : 'border-[#eaeaea] dark:border-[#333]'}
          ${error ? 'border-red-500 dark:border-red-400' : ''}`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {value ? (
          <img src={value} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <>
            <User className="w-6 h-6 text-[#999] dark:text-[#666] mb-2" />
            <label className="cursor-pointer text-center">
              <span className="text-xs text-[#666] dark:text-[#888] hover:text-[#000] dark:hover:text-[#fff] transition-colors">
                Choose Image
              </span>
              <input
                type="file"
                className="hidden"
                accept={ALLOWED_TYPES.join(',')}
                onChange={handleFileChange}
              />
            </label>
          </>
        )}
      </div>
      {error && (
        <div className="mt-2 flex items-center gap-1 text-sm text-red-500 dark:text-red-400">
          <AlertCircle className="w-4 h-4" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}