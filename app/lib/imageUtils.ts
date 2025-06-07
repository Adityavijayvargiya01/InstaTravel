// Image optimization utilities
export const SUPABASE_BUCKET_URL = 'https://hjsbwsdjwoipcwadbjvy.supabase.co/storage/v1/object/public/Images';

export interface ImageSizeConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

/**
 * Generate optimized image URL with transformations
 */
export function getOptimizedImageUrl(imagePath: string, config: ImageSizeConfig = {}): string {
  const { quality = 75 } = config;
  
  // For Supabase, we'll use Next.js Image optimization
  // The actual transformation happens through Next.js Image component
  return `${SUPABASE_BUCKET_URL}/${imagePath}`;
}

/**
 * Generate responsive image sizes string for Next.js Image component
 */
export function getResponsiveSizes(breakpoints: Record<string, string>): string {
  const defaultBreakpoints = {
    mobile: '(max-width: 640px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '25vw'
  };
  
  const merged = { ...defaultBreakpoints, ...breakpoints };
  return Object.values(merged).join(', ');
}

/**
 * Common image sizes for different use cases
 */
export const IMAGE_SIZES = {
  LISTING_CARD: getResponsiveSizes({
    mobile: '(max-width: 640px) 100vw',
    tablet: '(max-width: 1024px) 50vw',
    desktop: '25vw'
  }),
  HERO_IMAGE: getResponsiveSizes({
    mobile: '(max-width: 768px) 100vw',
    desktop: '75vw'
  }),
  AVATAR: '48px',
  CATEGORY_ICON: '44px'
};

/**
 * Generate blur data URL for placeholder
 */
export function generateBlurDataURL(width = 400, height = 300): string {
  const shimmer = `
    <svg width="${width}" height="${height}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="20%" />
          <stop stop-color="#edeef1" offset="50%" />
          <stop stop-color="#f6f7f8" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="#f6f7f8" />
      <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite" />
    </svg>
  `;
  
  const base64 = typeof window === 'undefined' 
    ? Buffer.from(shimmer).toString('base64')
    : btoa(shimmer);
    
  return `data:image/svg+xml;base64,${base64}`;
}
