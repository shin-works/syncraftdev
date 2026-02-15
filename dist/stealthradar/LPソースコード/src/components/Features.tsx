import React from 'react';
import feature1 from '../assets/images/15-removebg.png';
import feature2 from '../assets/images/16-removebg.png';
import feature3 from '../assets/images/17-removebg-preview.png';

const Features: React.FC = () => {
  return (
    <section id="features" className="section bg-gradient-to-br from-stealthBackground via-gray-900 to-stealthBackground">
      <div className="container">
        <h2 className="section-title">アプリの特徴</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div className="card text-center hover:border-radarCyan hover:border-opacity-100 transition-all duration-300">
            <div className="mb-6 flex justify-center">
              <img src={feature1} alt="GPSアプリ" className="w-50 h-50 object-contain" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-radarCyan">日常を冒険に変えるGPSアプリ</h3>
            <p className="text-stealthText">現実世界をゲームのフィールドに変え、日々の移動を冒険へと変換します</p>
          </div>
          
          <div className="card text-center hover:border-radarCyan hover:border-opacity-100 transition-all duration-300">
            <div className="mb-6 flex justify-center">
              <img src={feature2} alt="コマンダーモード" className="w-50 h-50 object-contain" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-radarCyan">コマンダーモード</h3>
            <p className="text-stealthText">マップにピンを立てて、暗号化された「位置情報」と「ミッション」をサーチャーに送信（無料版：１ピン、有料版最大８ピン）。チームに冒険の目的地を設定できます</p>
          </div>
          
          <div className="card text-center hover:border-radarCyan hover:border-opacity-100 transition-all duration-300">
            <div className="mb-6 flex justify-center">
              <img src={feature3} alt="サーチャーモード" className="w-50 h-50 object-contain" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-radarCyan">サーチャーモード</h3>
            <p className="text-stealthText">コマンダーから受け取った暗号化リンクを解析し、レーダーを頼りにターゲットを探索。目的地に近づくとミッションが発動。現実世界での探検を楽しめます</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;