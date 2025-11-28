export default function Header() {
  return (
    <section className="w-full py-20 px-8 bg-linear-to-b from-slate-800 to-slate-900 text-center border-b border-white/10">
      <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-600 mb-6">
        3D Product Gallery
      </h1>
      <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
        Explore our latest collection in immersive 3D. Interact with products, view them from every angle, 
        and experience the future of e-commerce display technology.
      </p>
    </section>
  );
}
