# 3D Model Gallery

[![npm version](https://img.shields.io/npm/v/3d-model-gallery.svg)](https://www.npmjs.com/package/3d-model-gallery)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Interactive 3D model gallery for React with Three.js. Display and navigate 3D models with smooth carousel navigation.

## ✨ Features

- 🎨 Interactive 3D model viewing
- 🔄 Smooth carousel navigation
- ⌨️ Keyboard navigation support
- 📱 Responsive design
- 🎯 Configurable height and scroll speed
- 🖼️ Support for GLB, GLTF formats
- ⚡ Built with React Three Fiber

## 📦 Installation

```bash
npm install 3d-model-gallery
```

**Peer Dependencies:**
```bash
npm install react react-dom three @react-three/fiber @react-three/drei
```

## 🚀 Usage

```tsx
import { GalleryCarousel, ModelData } from '3d-model-gallery';

const models: ModelData[] = [
  {
    id: 1,
    name: 'My 3D Model',
    description: 'An awesome 3D model',
    instruction: 'Scroll to rotate',
    modelUrl: '/models/model.glb',
    height: '80vh'
  }
];

function App() {
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
```

## 📖 Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `models` | `ModelData[]` | required | Array of 3D models to display |
| `showNavigation` | `boolean` | `false` | Enable navigation controls |
| `showArrows` | `boolean` | `false` | Show left/right arrows |
| `showDots` | `boolean` | `false` | Show dot indicators |
| `height` | `string` | `'80vh'` | Carousel height |
| `scrollMultiplier` | `number` | `4` | Rotation speed |
| `isLoading` | `boolean` | `false` | Show loading state |
| `error` | `string \| null` | `null` | Error message |

## 🤝 Contributing

We welcome contributions! See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.

## 📄 License

MIT © [Contributors](./LICENSE)

## 🌟 Show Your Support

Give a ⭐️ if this project helped you!
