'use client';

import Image from 'next/image';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import type { MediaAsset } from '@/types/portfolio';

type PortfolioMediaProps = {
  asset: MediaAsset;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

export function PortfolioMedia({
  asset,
  className,
  sizes = '(max-width: 768px) 100vw, 80vw',
  priority = false,
}: PortfolioMediaProps) {
  const [isLoading, setIsLoading] = useState(asset.type === 'image');
  const [hasError, setHasError] = useState(false);

  if (asset.type === 'video') {
    return (
      <div
        className={cn('relative flex aspect-video items-center justify-center overflow-hidden bg-muted', className)}
        role="img"
        aria-label={`${asset.alt}，视频预览暂未启用`}
      >
        <p className="px-6 text-center text-sm text-muted-foreground">视频预览为后续版本</p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={cn('relative flex aspect-video items-center justify-center overflow-hidden bg-muted', className)}
        role="img"
        aria-label={`${asset.alt}，媒体加载失败`}
      >
        <p className="px-6 text-center text-sm text-muted-foreground">暂时无法加载媒体</p>
      </div>
    );
  }

  return (
    <div className={cn('relative aspect-video overflow-hidden bg-muted', className)} aria-busy={isLoading}>
      {isLoading ? <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-muted" /> : null}

      <Image
        src={asset.src}
        alt={asset.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn('object-cover transition-opacity duration-500', isLoading ? 'opacity-0' : 'opacity-100')}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
      />
    </div>
  );
}
