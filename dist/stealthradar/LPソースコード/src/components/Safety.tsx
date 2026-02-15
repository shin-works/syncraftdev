import React from 'react';

const Safety: React.FC = () => {
  return (
    <section id="safety" className="section bg-gradient-radial from-stealthBackground to-black">
      <div className="container">
        <h2 className="section-title">安全に楽しむために</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="card border-alertRed">
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="mr-3 text-alertRed text-2xl">⚠️</div>
                <p>歩きスマホは危険です。必ず立ち止まってご確認ください。</p>
              </li>
              
              <li className="flex items-start">
                <div className="mr-3 text-alertRed text-2xl">⚠️</div>
                <p>公共の道路や車道などでは利用を控え、安全な場所で遊びましょう。</p>
              </li>
              
              <li className="flex items-start">
                <div className="mr-3 text-alertRed text-2xl">⚠️</div>
                <p>小さなお子さまが利用する際は、必ず保護者の方と一緒にご利用ください。</p>
              </li>
              
              <li className="flex items-start">
                <div className="mr-3 text-alertRed text-2xl">⚠️</div>
                <p>本アプリ利用中に発生した事故やトラブルについて、当方では責任を負いかねます。</p>
              </li>
            </ul>
            
            <div className="mt-8 p-4 bg-alertRed bg-opacity-10 rounded-lg border border-alertRed">
              <p className="text-center font-bold text-alertRed">
                安全を最優先に、楽しく冒険しましょう！
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Safety;