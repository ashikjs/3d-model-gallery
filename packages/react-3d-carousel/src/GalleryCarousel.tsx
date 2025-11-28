'use client';

import { useState, useEffect } from 'react';
import { ProductViewer } from './react-3d-gallery';
import { ModelData } from './types/model';

interface GalleryCarouselProps {
    models: ModelData[];
    showNavigation?: boolean;
    showArrows?: boolean;
    showDots?: boolean;
    isLoading?: boolean;
    error?: string | null;
}

export default function GalleryCarousel({
    models,
    showNavigation = false,
    showArrows = false,
    showDots = false,
    isLoading = false,
    error = null
}: GalleryCarouselProps) {
    const [currentIndex, setCurrentIndex] = useState(0);

    // Loading state
    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500 mb-4"></div>
                    <p className="text-white/70">Loading Gallery...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="h-screen w-full flex flex-col items-center justify-center bg-linear-to-b from-slate-900 to-slate-700">
                <div className="text-center px-8">
                    <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                        3D Gallery
                    </h2>
                    <p className="text-base md:text-lg text-white/60 drop-shadow-md mb-4">
                        {error}
                    </p>
                    <p className="text-sm text-white/40">Please check back later</p>
                </div>
            </div>
        );
    }

    // No models
    if (!models || models.length === 0) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-900">
                <div className="text-center">
                    <h3 className="text-white text-2xl font-bold mb-2">No Models Available</h3>
                    <p className="text-slate-400">Please check back later</p>
                </div>
            </div>
        );
    }

    const goToNext = () => {
        setCurrentIndex((prev) => (prev + 1) % models.length);
    };

    const goToPrevious = () => {
        setCurrentIndex((prev) => (prev - 1 + models.length) % models.length);
    };

    useEffect(() => {
        if (!showNavigation || models.length <= 1) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                goToPrevious();
            } else if (e.key === 'ArrowRight') {
                goToNext();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [showNavigation, models.length]);

    const currentModel = models[currentIndex];

    const overlay = (
        <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg mb-2">
                {currentModel.name}
            </h2>
            <p className="text-base md:text-lg text-white/80 drop-shadow-md mb-4">
                {currentModel.description}
            </p>
            <div className="flex items-center justify-center gap-2 text-sm text-white/60">
                <span>{currentIndex + 1} / {models.length}</span>
            </div>
        </div>
    );

    return (
        <div className="relative">
            <ProductViewer
                modelUrl={currentModel.modelUrl}
                height={currentModel.height}
                overlay={overlay as any}
            />

            {/* Navigation Buttons */}
            {showNavigation && showArrows && models.length > 1 && (
                <>
                    <div className="fixed left-8 top-1/2 -translate-y-1/2 z-30">
                        <button
                            onClick={goToPrevious}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 shadow-lg border border-white/30"
                            aria-label="Previous model"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                    </div>

                    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-30">
                        <button
                            onClick={goToNext}
                            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-4 rounded-full transition-all duration-300 shadow-lg border border-white/30"
                            aria-label="Next model"
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </>
            )}

            {/* Dots Indicator */}
            {showNavigation && showDots && models.length > 1 && (
                <div className="fixed bottom-8 left-0 right-0 z-30 flex justify-center gap-2">
                    {models.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${index === currentIndex
                                    ? 'bg-white w-8'
                                    : 'bg-white/40 hover:bg-white/60'
                                }`}
                            aria-label={`Go to model ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
