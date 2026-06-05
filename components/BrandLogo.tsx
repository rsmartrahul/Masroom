'use client';

import Image from 'next/image';

type BrandLogoProps = {
  size?: number;
  className?: string;
  rounded?: boolean;
};

export function BrandLogo({ size = 56, className = '', rounded = true }: BrandLogoProps) {
  return (
    <Image
      src="/solar.png"
      alt="Solar Clean logo"
      width={size}
      height={size}
      priority={false}
      className={`${rounded ? 'rounded-2xl' : ''} object-cover ${className}`.trim()}
    />
  );
}
