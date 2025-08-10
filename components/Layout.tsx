import Header from '@/components/navigation/Header';
import Footer from '@/components/navigation/Footer';
import FloatingContact from '@/components/navigation/FloatingContact';
import { ReactNode } from 'react';

type Props = { children: ReactNode };

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </div>
  );
}


