import React, { useState } from 'react';

type FAQItemProps = {
  question: string;
  answer: React.ReactNode;
};

const FAQItem: React.FC<FAQItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4 last:mb-0">
      <button
        className="w-full flex justify-between items-center py-4 px-6 bg-stealthBackground border border-radarCyan border-opacity-30 rounded-lg text-left font-bold focus:outline-none focus:ring-2 focus:ring-radarCyan"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{question}</span>
        <span className={`transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
          ▼
        </span>
      </button>
      
      <div 
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="p-6 bg-gray-900 border-t-0 rounded-b-lg">
          {answer}
        </div>
      </div>
    </div>
  );
};

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: 'オフラインでも使えますか？',
      answer: 'ミッション開始にはインターネット接続が必要ですが、移動中の判定はGPSで行うため常時通信は不要です。',
    },
    {
      question: '課金はありますか？',
      answer: (
        <>
          <p>基本機能は無料でお使いいただけます。</p>
          <p className="mt-2">より高度で戦略的な機能を買い切りで購入可能。追加課金はありません。</p>
        </>
      ),
    },
    {
      question: '子どもだけで使えますか？',
      answer: '安全面から必ず保護者と一緒にご利用ください。',
    },
    {
      question: 'プライバシーは守られますか？',
      answer: '位置情報は端末内でのみ使用され、サーバーには送信されません。',
    },
    {
      question: '無料版と有料版の違いは？',
      answer: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold text-radarCyan mb-2">無料版</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>ターゲットピンはひとつ</li>
              <li>サーチャーモードの精度に制限あり（縮尺制限）</li>
              <li>基本的な宝探し・冒険機能は利用可能</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold text-emeraldGreen mb-2">有料版（買い切り）</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>最大8つピンを設置可能</li>
              <li>詳細なミッション説明文の追加</li>
              <li>ミッション達成機能</li>
              <li>精度制限解除で、より正確にミッションを楽しめる</li>
              <li>広告なし</li>
              <li>今後のアップデートで追加機能を優先的に利用可能</li>
            </ul>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="faq" className="section bg-stealthBackground">
      <div className="container">
        <h2 className="section-title">よくある質問</h2>
        
        <div className="max-w-3xl mx-auto mt-12">
          {faqs.map((faq, index) => (
            <FAQItem 
              key={index} 
              question={faq.question} 
              answer={faq.answer} 
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;