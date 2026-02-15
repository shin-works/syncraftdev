import React from 'react';

const UseCases: React.FC = () => {
  return (
    <section id="use-cases" className="section bg-gradient-radial from-stealthBackground to-black">
      <div className="container">
        <h2 className="section-title">利用シーン</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card group hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <h3 className="text-lg font-bold mb-2 text-emeraldGreen group-hover:text-radarCyan transition-colors duration-300">
              近所の公園 → 未知のエリアに
            </h3>
            <p className="text-stealthText">
              いつも行く公園も、アプリを使えば探検すべき未知の領域に。新たな発見と冒険が待っています。
            </p>
          </div>
          
          <div className="card group hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <h3 className="text-lg font-bold mb-2 text-emeraldGreen group-hover:text-radarCyan transition-colors duration-300">
              スーパーのおつかい → 重要ミッションに
            </h3>
            <p className="text-stealthText">
              日常のお使いも、重要なアイテム回収ミッションに変化。買い物がもっと楽しくなります。
            </p>
          </div>
          
          <div className="card group hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <h3 className="text-lg font-bold mb-2 text-emeraldGreen group-hover:text-radarCyan transition-colors duration-300">
              家族のお出かけ → チーム冒険に
            </h3>
            <p className="text-stealthText">
              家族での外出が、チームでの冒険に早変わり。家族の絆を深める新しい体験ができます。
            </p>
          </div>
          
          <div className="card group hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <h3 className="text-lg font-bold mb-2 text-emeraldGreen group-hover:text-radarCyan transition-colors duration-300">
              サバゲー・レクリエーション → 本格ミッションに
            </h3>
            <p className="text-stealthText">
              サバゲーやアウトドアレクリエーションにプラスすれば、よりリアルで本格的なミッション体験ができます。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCases;