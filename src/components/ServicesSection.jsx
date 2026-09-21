import React, { useState } from 'react';
import { ArrowUpRight, Check, Armchair, Home, Warehouse, Users, Phone } from 'lucide-react';
import content from '../data/content.json';
import piwnicaImg from '../assets/piwnica.jpg';

const iconMap = {
  Armchair: Armchair,
  Home: Home,
  Warehouse: Warehouse,
  Users: Users,
};

const serviceImages = {
  piwnice: piwnicaImg,
};

export default function ServicesSection({ onSelectService }) {
  const [activeTab, setActiveTab] = useState(0);
  const activeService = content.services[activeTab] || content.services[0];
  const IconComponent = iconMap[activeService.icon] || Armchair;
  const currentImage = serviceImages[activeService.id] || activeService.image;

  return (
    <section id="uslugi" className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#060608] relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
          <div>
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-amber-400 block mb-2">
              Oferta dla Osób Prywatnych i Firm w Łodzi
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight">
              NASZE <span className="text-gold-gradient">USŁUGI</span>
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-zinc-400 font-light leading-relaxed">
            Wybierz usługę, aby zobaczyć szczegóły realizacji i wyposażenie naszego zespołu. Każde zlecenie wyceniamy indywidualnie ze stałą stawką.
          </p>
        </div>

        {/* Tab Buttons (Horizontal row on desktop/mobile) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-10">
          {content.services.map((srv, idx) => {
            const TabIcon = iconMap[srv.icon] || Armchair;
            const isActive = activeTab === idx;
            return (
              <button
                key={srv.id}
                onClick={() => setActiveTab(idx)}
                className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-300 flex flex-col justify-between gap-3 ${
                  isActive
                    ? 'bg-amber-500/10 border-amber-500/60 shadow-[0_10px_30px_rgba(245,158,11,0.15)]'
                    : 'bg-white/[0.02] border-white/10 hover:border-white/20 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono uppercase text-amber-400">
                    {srv.tag}
                  </span>
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-zinc-500'}`} />
                </div>
                <span className={`font-serif text-sm sm:text-base font-bold ${isActive ? 'text-white' : 'text-zinc-400'}`}>
                  {srv.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Service Showcase Card (Editorial Split Layout) */}
        <div className="glass-panel rounded-3xl border border-white/10 p-6 sm:p-10 lg:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Details & Features */}
          <div className="lg:col-span-6 flex flex-col items-start">
            <span className="inline-block px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-[11px] font-mono uppercase tracking-wider mb-4">
              {activeService.tag} &bull; Łódź i region
            </span>

            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white mb-3">
              {activeService.title}
            </h3>

            <p className="text-sm sm:text-base text-amber-400/90 font-mono mb-6">
              {activeService.lead}
            </p>

            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-8">
              {activeService.description}
            </p>

            {/* Feature Bullets */}
            <div className="w-full space-y-3 pb-8 mb-8 border-b border-white/10">
              {activeService.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-zinc-200">
                  <div className="w-5 h-5 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-amber-400" />
                  </div>
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Quick Action */}
            <div className="flex flex-wrap items-center gap-4 w-full">
              <button
                onClick={() => onSelectService(activeService.title)}
                className="flex-1 sm:flex-none px-8 py-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
              >
                <span>Wycena dla tej usługi</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <a
                href={`tel:${content.company.phoneRaw}`}
                className="px-6 py-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 text-zinc-300 hover:text-white text-xs uppercase tracking-wider font-mono transition-colors flex items-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>{content.company.phone}</span>
              </a>
            </div>

          </div>

          {/* Right Column: High-Resolution Visual with Ambient Overlay */}
          <div className="lg:col-span-6 w-full">
            <div className="relative h-[320px] sm:h-[420px] rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 shadow-2xl">
              <img
                src={currentImage}
                alt={activeService.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#060608] via-transparent to-transparent opacity-80" />
              
              {/* Badge on photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#08080a]/80 backdrop-blur-md border border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-400 block">
                    Gwarantowany Standard
                  </span>
                  <span className="font-serif text-sm font-bold text-white">
                    Własny załadunek i znoszenie w cenie
                  </span>
                </div>
                <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <IconComponent className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
