'use client'

import { GalleryCarousel, ModelData } from 'react-3d-carousel';

const models: ModelData[] = [

  {
    id: 1,
    name: 'Girl Character Model',
    description: 'Ready Player Me female avatar',
    instruction: 'Use arrow keys or buttons to navigate',
    modelUrl: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb',
    format: 'glb',
    height: '100vh'
  },
  {
    id: 3,
    name: 'iPhone 16 Pro (OBJ)',
    description: 'Latest iPhone 16 Pro in OBJ format',
    instruction: 'Use arrow keys or buttons to navigate',
    modelUrl: '/3d-models/iphone-16-pro.obj',
    format: 'obj',
    height: '100vh'
  },
  {
    id: 4,
    name: 'iPhone 16 Pro (FBX)',
    description: 'Latest iPhone 16 Pro in FBX format',
    instruction: 'Use arrow keys or buttons to navigate',
    modelUrl: '/3d-models/iphone-16-pro.fbx',
    format: 'fbx',
    height: '100vh'
  }
];

export default function ProductSection() {
  return (
    <GalleryCarousel
      models={models}
      showNavigation={true}
      showArrows={true}
      showDots={true}
      height="80vh"
      scrollMultiplier={4}
    />
  );
}
