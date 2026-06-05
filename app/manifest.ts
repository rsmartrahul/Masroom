import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Business Hub',
    short_name: 'Business Hub',
    description: 'Premium mushroom products and professional solar panel services.',
    start_url: '/',
    scope: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#1f56d5',
    icons: [
      {
        src: '/icon.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
