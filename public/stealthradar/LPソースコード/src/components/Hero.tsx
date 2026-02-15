import React from 'react';
import heroImage from '../assets/images/hero.png';

const Hero: React.FC = () => {
  return (
    <section id="hero" className="relative min-h-[80vh] bg-stealthBackground flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full">
        <img 
          src={heroImage} 
          alt="Hero Background" 
          className="w-full h-full object-cover object-left"
        />
      </div>
      
      <div className="container mx-auto px-6 z-10 relative">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0">
            {/* App preview or secondary content can be added here */}
          </div>
          <div className="md:w-1/2 text-right">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-4 leading-relaxed">
              <span className="text-stealthText block">日常は</span>
              <span className="text-stealthText block">見方を変えると</span>
              <span className="text-stealthText block">冒険になる</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8">日常を冒険に変える、新感覚GPSアプリ</p>
            <button className="btn btn-primary">
              ダウンロード
            </button>
          </div>
        </div>
      </div>
      

    </section>
  );
};

export default Hero;