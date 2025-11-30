import Header from '@/components/Header';
import GalleryWrapper from '@/components/GalleryWrapper';
import CodeExampleSection from '@/components/CodeExampleSection';
import InfoSection from '@/components/InfoSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="bg-slate-900 min-h-screen flex flex-col">
      <Header />
      <GalleryWrapper />
      <CodeExampleSection />
      <InfoSection />
      <Footer />
    </main>
  );
}
