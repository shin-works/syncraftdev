import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TermsOfService from './pages/TermsOfService';
import logo from "./assets/youware-bg.png";

function HomePage() {
  return (
    <main 
      className="min-h-screen flex items-center justify-center relative bg-[#F6F4F1] bg-cover bg-center bg-no-repeat"
      style={{ 
        backgroundImage: `url(${logo})`,
      }}
    >
      {/* 主要内容容器 */}
      <div className="text-center z-10 max-w-4xl mx-auto px-6 py-8">
        {/* 标题 */}
        <h1 className="text-black font-normal leading-tight text-center mb-4 text-4xl sm:text-5xl lg:text-6xl">
          YouWare App Template
        </h1>
        
        {/* 描述文本 */}
        <p className="text-black font-normal leading-relaxed text-center max-w-2xl mx-auto text-base sm:text-lg lg:text-xl mb-8">
          Start building your React application here
        </p>

        {/* ナビゲーションリンク */}
        <div className="flex justify-center gap-4">
          <Link 
            to="/terms" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            利用規約を確認
          </Link>
        </div>
      </div>
    </main>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/terms" element={<TermsOfService />} />
      </Routes>
    </Router>
  );
}

export default App;
