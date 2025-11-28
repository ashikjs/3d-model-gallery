export default function Footer() {
  return (
    <footer className="w-full py-8 bg-slate-950 border-t border-white/10 text-center">
      <p className="text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} 3D Product Viewer. All rights reserved.
      </p>
    </footer>
  );
}
