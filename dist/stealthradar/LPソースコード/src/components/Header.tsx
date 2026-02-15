import React, { useState, useEffect } from 'react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // ナビゲーションリンク
  const navLinks = [
    { name: 'ホーム', href: '#hero' },
    { name: '特徴', href: '#features' },
    { name: '利用シーン', href: '#use-cases' },
    { name: 'よくある質問', href: '#faq' },
    { name: '安全ガイド', href: '#safety' },
  ];

  // スクロール検出
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 bg-stealthBackground shadow-lg`}
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between py-4">
          {/* ロゴ */}
          <div className="flex-shrink-0">
            <a href="#" className="flex items-center">
              <span className="bank-gothic text-xl text-radarCyan glow">STEALTH RADAR</span>
            </a>
          </div>
          
          {/* デスクトップナビゲーション */}
          <nav className="hidden md:flex space-x-10">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-stealthText hover:text-radarCyan font-medium transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>
          
          {/* CTA ボタン */}
          <div className="hidden md:block">
            <a href="#" className="btn btn-primary">
              ダウンロード
            </a>
          </div>
          
          {/* モバイルメニューボタン */}
          <div className="md:hidden">
            <button 
              className="text-stealthText hover:text-radarCyan"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        {/* モバイルメニュー */}
        <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-2 text-stealthText hover:text-radarCyan font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4">
              <a href="#" className="btn btn-primary w-full text-center">
                ダウンロード
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;