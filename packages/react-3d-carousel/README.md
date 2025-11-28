# react-3d-carousel

A 3D carousel component for React, built with Three.js and React Three Fiber.

## Installation

```bash
npm install react-3d-carousel
# or
yarn add react-3d-carousel
# or
pnpm add react-3d-carousel
```

## Peer Dependencies

This package requires the following peer dependencies:

- react
- react-dom
- three
- @react-three/fiber
- @react-three/drei

## Usage

```tsx
import { GalleryCarousel, ModelData } from 'react-3d-carousel';

const models: ModelData[] = [
  {
    id: 1,
    name: 'My Model',
    description: 'A cool 3D model',
    instruction: 'Interact with me',
    modelUrl: '/path/to/model.glb',
    height: '100vh'
  }
];

function App() {
  return (
    <GalleryCarousel 
      models={models} 
      showNavigation={true}
      showArrows={true}
      showDots={true}
    />
  );
}
```
