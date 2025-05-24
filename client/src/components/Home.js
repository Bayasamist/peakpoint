import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [scrollY, setScrollY] = useState(0);
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const resources = [
    { title: 'Visa Types', text: 'Discover visa categories tailored to your journey', icon: '🛂', gradient: 'from-purple-500 to-pink-600' },
    { title: 'Travel Guides', text: 'Unlock visa-free destinations and insider tips', icon: '✈️', gradient: 'from-blue-500 to-cyan-600' },
    { title: 'Student Hub', text: 'Navigate your academic journey abroad', icon: '🎓', gradient: 'from-green-500 to-teal-600' },
    { title: 'Study Abroad', text: 'Find your perfect educational destination', icon: '🌍', gradient: 'from-orange-500 to-red-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-60 right-20 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-40 left-1/3 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/20 to-black/40"
          style={{ transform: `translateY(${scrollY * 0.5}px)` }}
        ></div>

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent leading-tight">
              Find Your Perfect
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Visa Journey
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 leading-relaxed max-w-2xl mx-auto">
              AI-powered visa recommendations, expert guidance, and seamless applications—all in one revolutionary platform.
            </p>
          </div>

          <button
            onClick={() => navigate('/recommend')}
            className="group relative px-10 py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden"
          >
            <span className="relative z-10">🎯 Find My Visa</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-700 via-pink-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-8 animate-bounce delay-1000">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500/30 to-pink-500/30 rounded-2xl backdrop-blur-sm"></div>
        </div>
        <div className="absolute bottom-1/4 right-8 animate-bounce delay-2000">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-cyan-500/30 rounded-full backdrop-blur-sm"></div>
        </div>
      </section>

      {/* Visa Resources */}
      <section className="relative py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Explore Resources
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Everything you need to make informed visa decisions
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resources.map((item, index) => (
              <div
                key={item.title}
                className="group relative"
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className="relative p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl border border-gray-700/50 hover:border-gray-600/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl" style={{ background: `linear-gradient(135deg, ${item.gradient.includes('purple') ? '#8b5cf6, #ec4899' : item.gradient.includes('blue') ? '#3b82f6, #06b6d4' : item.gradient.includes('green') ? '#10b981, #14b8a6' : '#f97316, #ef4444'})` }}></div>
                  <div className="relative z-10">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-200 group-hover:bg-clip-text transition-all duration-300">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                      {item.text}
                    </p>
                  </div>

                  {hoveredCard === index && (
                    <div className="absolute bottom-4 right-4 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="text-white">→</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;
