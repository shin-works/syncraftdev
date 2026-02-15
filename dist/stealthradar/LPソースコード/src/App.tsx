import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import UseCases from './components/UseCases';
import FAQ from './components/FAQ';
import Safety from './components/Safety';
import Footer from './components/Footer';

const App: React.FC = () => {
  // スムーススクロールのためのハンドラー
  useEffect(() => {
    const handleScrollTo = (e: Event) => {
      e.preventDefault();
      const target = e.currentTarget as HTMLAnchorElement;
      const id = target.getAttribute('href')?.substring(1);
      if (id) {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth'
          });
        }
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', handleScrollTo as EventListener);
    });

    return () => {
      document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.removeEventListener('click', handleScrollTo as EventListener);
      });
    };
  }, []);

  return (
    <div className="bg-stealthBackground text-stealthText">
      <Header />
      <main>
        <Hero />
        <Features />
        <UseCases />
        <FAQ />
        <Safety />
      </main>
      <Footer />
    </div>
  );
};

export default App;