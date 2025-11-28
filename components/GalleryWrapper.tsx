import { Suspense } from 'react';
import ProductSection from './ProductSection';

export default function GalleryWrapper() {
  return (
    <div className="relative min-h-screen bg-slate-900">
      <Suspense fallback={null}>
        <ProductSection />
      </Suspense>
    </div>
  );
}
