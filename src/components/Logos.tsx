import React, { useRef } from 'react';

interface LogoProps {
  className?: string;
  customImageUrl?: string | null;
  onUploadImage?: (url: string) => void;
}

export function BharatPetroleumLogo({
  className = "w-14 sm:w-16",
  customImageUrl,
  onUploadImage,
}: LogoProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUploadImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center select-none group cursor-pointer ${className}`}
      onClick={() => onUploadImage && fileInputRef.current?.click()}
      title="Bharat Petroleum Logo (Click to upload custom logo)"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {customImageUrl ? (
        <div className="w-11 sm:w-12 h-14 sm:h-15 border border-current rounded-xs flex items-center justify-center p-0.5 overflow-hidden bg-white">
          <img
            src={customImageUrl}
            alt="Bharat Petroleum Logo"
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="w-11 sm:w-12 h-14 sm:h-15 border-[1.5px] border-current rounded-xs flex flex-col items-center justify-center p-1 bg-white">
          {/* BPCL Swirl Circle Emblem */}
          <div className="w-8 h-8 flex items-center justify-center mb-0.5">
            <svg viewBox="0 0 100 100" className="w-full h-full" fill="currentColor">
              <circle cx="50" cy="50" r="44" fill="none" stroke="currentColor" strokeWidth="8" />
              <path
                d="M 50 16 A 34 34 0 0 1 82 66 A 20 20 0 0 0 50 48 A 10 10 0 1 1 50 28 A 22 22 0 0 1 68 50"
                fill="none"
                stroke="currentColor"
                strokeWidth="7"
                strokeLinecap="round"
              />
              <circle cx="50" cy="50" r="8" fill="currentColor" />
            </svg>
          </div>
          <div className="text-[7.5px] sm:text-[8px] font-black leading-tight tracking-tight uppercase">
            <div>Bharat</div>
            <div>Petroleum</div>
          </div>
        </div>
      )}
    </div>
  );
}

export function AavantikaGasLogo({
  className = "w-12 sm:w-14",
  customImageUrl,
  onUploadImage,
}: LogoProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUploadImage) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUploadImage(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div
      className={`relative flex flex-col items-center justify-center text-center select-none group cursor-pointer ${className}`}
      onClick={() => onUploadImage && fileInputRef.current?.click()}
      title="Aavantika Gas Limited Logo (Click to change or upload image)"
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {customImageUrl ? (
        <div className="w-11 sm:w-12 h-14 sm:h-15 border border-[#1e3886] rounded-xs flex items-center justify-center overflow-hidden bg-white shadow-2xs">
          <img
            src={customImageUrl}
            alt="Aavantika Gas Logo"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        /* Exact replica of the uploaded Screenshot 2026-09-18 133703.png */
        <div className="w-11 sm:w-12 h-14 sm:h-15 bg-[#213b8a] text-[#e8ecf6] rounded-xs flex items-center justify-center p-0.5 relative overflow-hidden shadow-xs border border-[#1a3177]">
          <svg viewBox="0 0 100 135" className="w-full h-full" fill="none">
            {/* Subtle stipple background texture matching the photo */}
            <rect width="100" height="135" fill="#223c8a" />
            <circle cx="20" cy="25" r="1" fill="#2d4aa0" opacity="0.4" />
            <circle cx="85" cy="30" r="1.2" fill="#2d4aa0" opacity="0.4" />
            <circle cx="75" cy="110" r="1" fill="#2d4aa0" opacity="0.4" />
            <circle cx="15" cy="100" r="1.2" fill="#2d4aa0" opacity="0.4" />

            {/* The Main Gothic Arch 'A' Shape */}
            <path
              d="M 50 12 C 58 14, 76 38, 77 80 C 77.5 96, 73 118, 70 124 C 69 122, 65 106, 65 92 C 65 54, 56 34, 50 34 C 44 34, 35 54, 35 92 C 35 106, 31 122, 30 124 C 27 118, 22.5 96, 23 80 C 24 38, 42 14, 50 12 Z"
              fill="#e8ecf6"
            />

            {/* Center Flame / Drop Shape inside the Arch */}
            <path
              d="M 50 48 C 45 56, 43 65, 50 74 C 57 65, 55 56, 50 48 Z"
              fill="#e8ecf6"
            />

            {/* The Elliptical Ring / Swirl Loop */}
            {/* Back segment of the ring */}
            <path
              d="M 16 80 C 18 64, 45 56, 80 66 C 88 69, 90 75, 84 80"
              stroke="#e8ecf6"
              strokeWidth="6"
              strokeLinecap="round"
              fill="none"
              opacity="0.85"
            />

            {/* Front segment of the ring */}
            <path
              d="M 12 82 C 10 88, 24 96, 50 96 C 76 96, 92 88, 90 80 C 88 74, 76 70, 60 70"
              stroke="#e8ecf6"
              strokeWidth="7"
              strokeLinecap="round"
              fill="none"
            />

            {/* Dynamic swoosh extension pointing out on the left */}
            <path
              d="M 14 84 C 6 86, 2 82, 10 76"
              stroke="#e8ecf6"
              strokeWidth="5"
              strokeLinecap="round"
              fill="none"
            />

            {/* Center crossbar connecting the legs */}
            <path
              d="M 33 86 L 67 86"
              stroke="#e8ecf6"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export function TelephoneSymbol({ className = "inline-block w-4 h-4" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor">
      <path d="M20 15.5c-1.25 0-2.45-.2-3.57-.57a1.02 1.02 0 0 0-1.02.24l-2.2 2.2a15.045 15.045 0 0 1-6.59-6.59l2.2-2.21a.96.96 0 0 0 .25-1A11.36 11.36 0 0 1 8.5 4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1 0 9.39 7.61 17 17 17 .55 0 1-.45 1-1v-3.5c0-.55-.45-1-1-1zM19 12h2a9 9 0 0 0-9-9v2c3.87 0 7 3.13 7 7zm-4 0h2c0-2.76-2.24-5-5-5v2c1.66 0 3 1.34 3 3z"/>
    </svg>
  );
}
