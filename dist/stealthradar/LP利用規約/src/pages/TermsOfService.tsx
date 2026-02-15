import React from 'react';

const TermsOfService: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#101820] text-[#e0ffff]">
      {/* Header */}
      <header className="border-b border-[#00f0ff]/20 bg-[#101820]/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="text-2xl font-bold text-[#00f0ff] uppercase tracking-wider" style={{ fontFamily: "'Bank Gothic', 'Arial Black', sans-serif" }}>STEALTHRADAR</div>
            </div>
            <div className="flex items-center gap-6 text-[#e0ffff]/70">
              <span className="font-medium">利用規約</span>
              <button className="bg-[#1abc9c] text-[#101820] px-4 py-2 rounded-lg font-semibold hover:bg-[#00f0ff] transition-colors">
                プライバシーポリシー
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-[#e0ffff] to-[#00f0ff] bg-clip-text text-transparent uppercase tracking-wider" style={{ fontFamily: "'Bank Gothic', 'Arial Black', sans-serif" }}>
            STEALTHRADAR 利用規約
          </h1>
          <p className="text-[#e0ffff]/80 text-lg">
            本利用規約（以下「本規約」）は、[運営者名または屋号]（以下「当方」）が提供するアプリケーション「StealthRadar」（以下「本アプリ」）の利用条件を定めるものです。
          </p>
          <p className="text-[#e0ffff]/80 mt-4">
            ユーザーは、本アプリをインストールまたは利用した時点で、本規約に同意したものとみなされます。
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8">
          {/* 1. 定義 */}
          <section className="bg-[#101820]/60 border border-[#00f0ff]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-4">
              1. 定義
            </h2>
            <div className="space-y-3 text-[#e0ffff]/90">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">1</span>
                <p>「ユーザー」とは、本アプリを利用するすべての方をいいます。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">2</span>
                <p>「有料版」とは、本アプリ内で追加購入により利用可能となる買い切り型機能をいいます。</p>
              </div>
            </div>
          </section>

          {/* 2. 利用条件 */}
          <section className="bg-[#101820]/60 border border-[#00f0ff]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-4">
              2. 利用条件
            </h2>
            <div className="space-y-3 text-[#e0ffff]/90">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">1</span>
                <p>本アプリは、一部の基本機能を無料でご利用いただけます。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">2</span>
                <p>有料版は App Store を通じて購入可能であり、購入した時点で料金が発生します。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">3</span>
                <p>有料版は買い切り型であり、一度購入すれば継続してご利用いただけます。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">4</span>
                <p>未成年者が利用する場合は、保護者の同意および監督のもとで利用するものとします。</p>
              </div>
            </div>
          </section>

          {/* 3. 料金および返金 */}
          <section className="bg-[#101820]/60 border border-[#00f0ff]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-4">
              3. 料金および返金
            </h2>
            <div className="space-y-3 text-[#e0ffff]/90">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">1</span>
                <p>有料版の料金は購入画面に表示されます。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">2</span>
                <p>原則として、一度購入された有料版の返金は行いません。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">3</span>
                <p>ただし、法律上の要請または各ストアの定めに基づく場合はこの限りではありません。</p>
              </div>
            </div>
          </section>

          {/* 4. 禁止事項 */}
          <section className="bg-[#101820]/60 border border-[#ff3b30]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#ff3b30] mb-4">
              4. 禁止事項
            </h2>
            <p className="text-[#e0ffff]/90 mb-4">ユーザーは、以下の行為を行ってはなりません。</p>
            <div className="space-y-3 text-[#e0ffff]/90">
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#ff3b30] rounded-full mt-2 flex-shrink-0"></span>
                <p>歩行中や運転中の利用など、危険な状況での使用</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#ff3b30] rounded-full mt-2 flex-shrink-0"></span>
                <p>不正アクセス、改変、リバースエンジニアリング等の行為</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#ff3b30] rounded-full mt-2 flex-shrink-0"></span>
                <p>法令または公序良俗に違反する行為</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-2 h-2 bg-[#ff3b30] rounded-full mt-2 flex-shrink-0"></span>
                <p>他のユーザーや第三者に不利益や損害を与える行為</p>
              </div>
            </div>
          </section>

          {/* 5. 免責事項 */}
          <section className="bg-[#101820]/60 border border-[#00f0ff]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-4">
              5. 免責事項
            </h2>
            <div className="space-y-3 text-[#e0ffff]/90">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">1</span>
                <p>本アプリの利用により発生した事故・怪我・紛争について、当方は一切の責任を負いません。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">2</span>
                <p>本アプリは、位置情報サービスや通信環境に依存するため、その精度や可用性について保証しません。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">3</span>
                <p>当方は、予告なく本アプリの内容を変更・停止する場合があります。</p>
              </div>
            </div>
          </section>

          {/* 6. 知的財産権 */}
          <section className="bg-[#101820]/60 border border-[#00f0ff]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-4">
              6. 知的財産権
            </h2>
            <p className="text-[#e0ffff]/90">
              本アプリに関する著作権、商標権、その他の知的財産権は、当方または正当な権利者に帰属します。
            </p>
          </section>

          {/* 7. 個人情報の取扱い */}
          <section className="bg-[#101820]/60 border border-[#00f0ff]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-4">
              7. 個人情報の取扱い
            </h2>
            <p className="text-[#e0ffff]/90">
              ユーザーの情報の取扱いについては、別途定める「プライバシーポリシー」に従います。
            </p>
          </section>

          {/* 8. 規約の変更 */}
          <section className="bg-[#101820]/60 border border-[#00f0ff]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#00f0ff] mb-4">
              8. 規約の変更
            </h2>
            <p className="text-[#e0ffff]/90">
              当方は必要に応じて本規約を改定できるものとし、変更後の規約は本アプリまたは当方ウェブサイトに掲載した時点から効力を生じます。
            </p>
          </section>

          {/* 9. 準拠法および合意管轄 */}
          <section className="bg-[#101820]/60 border border-[#1abc9c]/20 rounded-xl p-6 backdrop-blur-sm">
            <h2 className="text-2xl font-bold text-[#1abc9c] mb-4">
              9. 準拠法および合意管轄
            </h2>
            <div className="space-y-3 text-[#e0ffff]/90">
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">1</span>
                <p>本規約の解釈・適用は日本法に準拠します。</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="w-6 h-6 bg-[#1abc9c] text-[#101820] rounded-full flex items-center justify-center text-sm font-bold mt-0.5 flex-shrink-0">2</span>
                <p>本アプリの利用に関連して当方とユーザーとの間で紛争が生じた場合、訴額に応じて <strong className="text-[#1abc9c]">大阪地方裁判所または大阪簡易裁判所</strong> を第一審の専属的合意管轄裁判所とします。</p>
              </div>
            </div>
          </section>
        </div>

        {/* Footer Information */}
        <div className="mt-12 pt-8 border-t border-[#00f0ff]/20 text-center">
          <p className="text-[#e0ffff]/60 text-sm">
            最終更新日: 2025年8月21日
          </p>
        </div>
      </main>
    </div>
  );
};

export default TermsOfService;