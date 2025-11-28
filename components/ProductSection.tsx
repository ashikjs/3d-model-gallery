import GalleryCarousel from './GalleryCarousel';
import { ModelData } from '@/types/model';

async function getAllModels(): Promise<ModelData[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/models`, {
      cache: 'no-store'
    });
    
    if (!res.ok) {
      throw new Error('Failed to fetch model data');
    }
    
    const models: ModelData[] = await res.json();
    return models;
  } catch (error) {
    console.error('Error fetching model data:', error);
    return [
      {
        id: 1,
        name: 'Paper Mario Phone',
        description: 'Stylized mobile phone from Paper Mario Sticker Star',
        instruction: 'Use arrow keys or buttons to navigate',
        modelUrl: '/3d-models/paper_mario_sticker_star_mobile_phone.glb',
        height: '100vh'
      }
    ];
  }
}

export default async function ProductSection() {
  const models = await getAllModels();

  return (
    <GalleryCarousel 
      models={models} 
      showNavigation={true}
      showArrows={true}
      showDots={true}
    />
  );
}
