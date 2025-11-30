'use client';

import { useState } from 'react';
import { GalleryCarousel, ModelData } from 'react-3d-carousel';
import { Check, Copy } from 'lucide-react';

const singleModel: ModelData[] = [
    {
        id: 1,
        name: 'Girl Character Model',
        description: 'Ready Player Me female avatar',
        instruction: 'Scroll to rotate',
        modelUrl: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb',
        format: 'glb',
        height: '400px'
    }
];

const multipleModels: ModelData[] = [
    {
        id: 1,
        name: 'Girl Character Model',
        description: 'Ready Player Me female avatar',
        instruction: 'Use arrow keys or buttons to navigate',
        modelUrl: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb',
        format: 'glb',
        height: '400px'
    },
    {
        id: 2,
        name: 'Boy Character Model',
        description: 'Ready Player Me male avatar',
        instruction: 'Use arrow keys or buttons to navigate',
        modelUrl: 'https://models.readyplayer.me/6185a4acfb622cf1cdc49348.glb',
        format: 'glb',
        height: '400px'
    },
    {
        id: 3,
        name: 'iPhone 16 Pro',
        description: 'Latest iPhone 16 Pro in OBJ format',
        instruction: 'Use arrow keys or buttons to navigate',
        modelUrl: '/3d-models/iphone-16-pro.obj',
        format: 'obj',
        height: '400px'
    }
];

const singleProductCode = `import { GalleryCarousel } from 'react-3d-carousel';

const models = [
  {
    id: 1,
    name: 'Girl Character Model',
    description: 'Ready Player Me female avatar',
    instruction: 'Scroll to rotate',
    modelUrl: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb',
    format: 'glb',
    height: '400px'
  }
];

export default function SingleProduct() {
  return (
    <GalleryCarousel 
      models={models} 
      height="400px"
      showNavigation={false}
    />
  );
}`;

const multipleProductCode = `import { GalleryCarousel } from 'react-3d-carousel';

const models = [
  {
    id: 1,
    name: 'Girl Character Model',
    description: 'Ready Player Me female avatar',
    instruction: 'Use arrow keys or buttons to navigate',
    modelUrl: 'https://models.readyplayer.me/64bfa15f0e72c63d7c3934a6.glb',
    format: 'glb'
  },
  {
    id: 3,
    name: 'iPhone 16 Pro',
    description: 'Latest iPhone 16 Pro in OBJ format',
    instruction: 'Use arrow keys or buttons to navigate',
    modelUrl: '/3d-models/iphone-16-pro.obj',
    format: 'obj'
  }
];

export default function MultipleProducts() {
  return (
    <GalleryCarousel 
      models={models} 
      height="400px"
      showNavigation={true}
      showArrows={true}
      showDots={true}
    />
  );
}`;

export default function CodeExampleSection() {
    const [activeTab, setActiveTab] = useState<'single' | 'multiple'>('single');
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        const code = activeTab === 'single' ? singleProductCode : multipleProductCode;
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section className="py-16 px-4 max-w-7xl mx-auto w-full">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">Implementation Examples</h2>

            <div className="flex justify-center mb-8">
                <div className="bg-slate-800 p-1 rounded-lg inline-flex">
                    <button
                        onClick={() => setActiveTab('single')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'single'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Single Model
                    </button>
                    <button
                        onClick={() => setActiveTab('multiple')}
                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'multiple'
                            ? 'bg-blue-600 text-white'
                            : 'text-slate-400 hover:text-white'
                            }`}
                    >
                        Multiple Models Gallery
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                {/* Preview Area */}
                <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 h-[500px] relative">
                    <div className="absolute top-4 left-4 z-10 bg-black/50 px-3 py-1 rounded text-xs text-white uppercase tracking-wider font-semibold">
                        Preview
                    </div>
                    {activeTab === 'single' ? (
                        <GalleryCarousel
                            models={singleModel}
                            height="100%"
                            showNavigation={false}
                        />
                    ) : (
                        <GalleryCarousel
                            models={multipleModels}
                            height="100%"
                            showNavigation={true}
                            showArrows={true}
                            showDots={true}
                        />
                    )}
                </div>

                {/* Code Area */}
                <div className="bg-slate-900 rounded-xl overflow-hidden border border-slate-700 h-[500px] flex flex-col">
                    <div className="flex items-center justify-between px-4 py-3 bg-slate-800 border-b border-slate-700">
                        <span className="text-sm text-slate-400 font-mono">example.tsx</span>
                        <button
                            onClick={handleCopy}
                            className="flex items-center gap-2 text-xs text-slate-400 hover:text-white transition-colors"
                        >
                            {copied ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                            {copied ? 'Copied!' : 'Copy Code'}
                        </button>
                    </div>
                    <div className="flex-1 overflow-auto p-4 custom-scrollbar">
                        <pre className="text-sm font-mono text-slate-300">
                            <code>{activeTab === 'single' ? singleProductCode : multipleProductCode}</code>
                        </pre>
                    </div>
                </div>
            </div>
        </section>
    );
}
