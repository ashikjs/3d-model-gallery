export default function InfoSection() {
  return (
    <section className="w-full py-24 px-8 bg-slate-950">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-white">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-blue-400">Interactive Control</h3>
          <p className="text-slate-400">
            Use your mouse or touch gestures to rotate, zoom, and pan around the model. 
            Our viewer supports intuitive controls for the best user experience.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-purple-400">High Fidelity</h3>
          <p className="text-slate-400">
            Rendered with physically based rendering (PBR) materials to show true-to-life 
            reflections, textures, and lighting details.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-pink-400">Cross Platform</h3>
          <p className="text-slate-400">
            Optimized for performance across all devices. Whether you're on mobile, 
            tablet, or desktop, enjoy smooth 3D visualization.
          </p>
        </div>
      </div>
    </section>
  );
}
