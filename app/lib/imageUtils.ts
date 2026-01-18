// Image optimization utilities
export const SUPABASE_BUCKET_URL = 'https://hjsbwsdjwoipcwadbjvy.supabase.co/storage/v1/object/public/Images';

export interface ImageSizeConfig {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'webp' | 'avif' | 'jpeg' | 'png';
}

// Pre-computed static blur data URL to avoid runtime computation
// This is a simple gray shimmer placeholder
export const BLUR_DATA_URL = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjZmN2Y4Ii8+PC9zdmc+';

/**
 * Generate optimized image URL with transformations
 * Returns empty string for null/undefined paths to prevent errors
 */
export function getOptimizedImageUrl(imagePath: string | null | undefined): string {
  if (!imagePath) return '';
  
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
  LISTING_CARD: '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw',
  HERO_IMAGE: '(max-width: 768px) 100vw, 75vw',
  AVATAR: '48px',
  CATEGORY_ICON: '24px'
} as const;

/**
 * Generate blur data URL for placeholder
 * Legacy function - returns static BLUR_DATA_URL for consistency and performance
 */
export function generateBlurDataURL(width = 400, height = 300): string {
  return BLUR_DATA_URL;
}
