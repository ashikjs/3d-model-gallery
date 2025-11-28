import { NextResponse } from 'next/server';

export async function GET() {
  const models = [
    {
      id: 1,
      name: 'Paper Mario Phone',
      description: 'Stylized mobile phone from Paper Mario',
      instruction: 'Use arrow keys or buttons to navigate',
      modelUrl: '/3d-models/paper_mario_sticker_star_mobile_phone.glb',
      format: 'glb',
      height: '100vh'
    },
    {
      id: 2,
      name: 'iPhone 16 Pro (OBJ)',
      description: 'Latest iPhone 16 Pro in OBJ format',
      instruction: 'Use arrow keys or buttons to navigate',
      modelUrl: '/3d-models/iphone-16-pro.obj',
      format: 'obj',
      height: '100vh'
    },
    {
      id: 3,
      name: 'iPhone 16 Pro (FBX)',
      description: 'Latest iPhone 16 Pro in FBX format',
      instruction: 'Use arrow keys or buttons to navigate',
      modelUrl: '/3d-models/iphone-16-pro.fbx',
      format: 'fbx',
      height: '100vh'
    },
    {
      id: 4,
      name: 'Character Model',
      description: 'Animated 3D character model',
      instruction: 'Use arrow keys or buttons to navigate',
      modelUrl: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb',
      format: 'glb',
      height: '100vh'
    }
  ];

  return NextResponse.json(models);
}
