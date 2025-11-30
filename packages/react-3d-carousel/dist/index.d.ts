import * as react_jsx_runtime from 'react/jsx-runtime';

interface ModelData {
    id: number;
    name: string;
    description: string;
    instruction: string;
    modelUrl: string;
    height: string;
    format?: 'glb' | 'gltf' | 'obj' | 'fbx' | 'blend';
    textureUrl?: string;
}

interface GalleryCarouselProps {
    models: ModelData[];
    showNavigation?: boolean;
    showArrows?: boolean;
    showDots?: boolean;
    isLoading?: boolean;
    error?: string | null;
    height?: string;
    scrollMultiplier?: number;
}
declare function GalleryCarousel({ models, showNavigation, showArrows, showDots, isLoading, error, height, scrollMultiplier }: GalleryCarouselProps): react_jsx_runtime.JSX.Element;

export { GalleryCarousel, type ModelData };
