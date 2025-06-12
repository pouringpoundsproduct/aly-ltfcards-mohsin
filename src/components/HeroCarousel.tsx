
import React, { useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { trackEvent } from '@/utils/analytics';

interface Card {
  cardId: string;
  name: string;
  rewardHeadline: string;
  perks: string[];
  applyUrl: string;
  tags: string[];
  score?: number;
  originalRank: number;
  reactKey?: string;
}

interface HeroCarouselProps {
  cards: Card[];
}

const HeroCarousel = ({ cards }: HeroCarouselProps) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const handleApplyClick = (cardId: string, rank: number) => {
    const card = cards.find(c => c.cardId === cardId);
    if (card) {
      trackEvent('apply_click', { cardId, rank });
      window.open(card.applyUrl, '_blank');
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const cardWidth = element.scrollWidth / cards.length;
    const currentIndex = Math.round(element.scrollLeft / cardWidth);
    
    // Track carousel swipe when user stops scrolling
    clearTimeout((element as any).scrollTimeout);
    (element as any).scrollTimeout = setTimeout(() => {
      trackEvent('carousel_swipe', {
        from: (element as any).lastIndex || 0,
        to: currentIndex
      });
      (element as any).lastIndex = currentIndex;
    }, 150);
  };

  const getPerksDisplay = (perks: string[]) => {
    const perkMap: Record<string, string> = {
      lounge: '4 lounges / year',
      cashback: '3.5% Cashback',
      forex: '1% Forex',
      upi: 'UPI Ready',
      customisable: 'Build-your-own',
      metal: 'Premium Metal',
      fuel: 'Fuel Rewards',
      beginner: 'Zero Fee'
    };

    return perks.slice(0, 3).map(perk => perkMap[perk] || perk);
  };

  return (
    <div 
      className="flex overflow-x-auto gap-4 px-4 scrollbar-hide snap-x snap-mandatory md:overflow-visible md:grid md:grid-cols-2 md:gap-6"
      style={{ scrollBehavior: 'smooth' }}
      ref={carouselRef}
      onScroll={handleScroll}
    >
      {cards.map((card, index) => (
        <div 
          key={card.reactKey || card.cardId}
          className="flex-none snap-start liquid-glass-card group transition-all duration-300 ease-out transform hover:scale-[1.02] animate-fade-in md:hover:translate-x-2"
          style={{ 
            width: '84vw', 
            minHeight: '280px',
            animationDelay: `${index * 50}ms`
          }}
        >
          {/* Enhanced Liquid Glass overlay */}
          <div className="absolute inset-0 rounded-2xl liquid-glass-surface" />
          
          {/* Content container */}
          <div className="relative z-10 p-6 h-full flex flex-col">
            {/* Badge */}
            <div className="mb-4">
              <span 
                className="inline-block px-3 py-1 rounded-full text-white text-sm font-semibold shadow-lg backdrop-blur-sm"
                style={{ backgroundColor: '#F36F24' }}
              >
                ₹0 for life
              </span>
            </div>

            {/* Card Name */}
            <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight">
              {card.name}
            </h3>

            {/* Reward Headline */}
            <p className="text-lg font-medium mb-4" style={{ color: '#0066CC' }}>
              {card.rewardHeadline}
            </p>

            {/* Sub-headline for lounge */}
            {card.tags.includes('lounge') && (
              <p className="text-gray-600 mb-4">4 lounges / year</p>
            )}

            {/* Perks Row */}
            <div className="space-y-2 mb-6 flex-grow">
              {getPerksDisplay(card.tags).map((perk, idx) => (
                <div key={idx} className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3 flex-shrink-0 shadow-sm"></span>
                  <span className="text-sm">{perk}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => handleApplyClick(card.cardId, index)}
              className="w-full liquid-glass-button group/btn text-white py-3 px-4 rounded-xl font-medium flex items-center justify-center gap-2 transition-all duration-300 hover:shadow-2xl transform hover:scale-[1.02]"
              style={{ minHeight: '44px' }}
            >
              Apply
              <ChevronRight size={18} className="transition-transform duration-300 group-hover/btn:translate-x-1" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HeroCarousel;
