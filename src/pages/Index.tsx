
import React, { useState, useEffect } from 'react';
import HeroPersonalised from '@/components/HeroPersonalised';
import HeroCarousel from '@/components/HeroCarousel';
import FilterChipsRow from '@/components/FilterChipsRow';
import StickyCompareCTA from '@/components/StickyCompareCTA';
import ModalLite from '@/components/ModalLite';
import ModalSim from '@/components/ModalSim';
import { cardsData } from '@/data/cards';
import { trackEvent } from '@/utils/analytics';

const Index = () => {
  const [cards, setCards] = useState(cardsData);
  const [selectedTag, setSelectedTag] = useState<string>('lounge');
  const [showCompareCTA, setShowCompareCTA] = useState(false);
  const [showCGLite, setShowCGLite] = useState(false);
  const [showCGSim, setShowCGSim] = useState(false);

  // Weight map for filtering algorithm
  const weightMap: Record<string, number> = {
    lounge: 3,
    fuel: 2.5,
    upi: 2,
    forex: 1.5,
    customisable: 1,
    metal: 1,
    cashback: 1,
    beginner: 1
  };

  useEffect(() => {
    // Track page load
    trackEvent('aly_lp_view', {
      selectedTag,
      rank: cards.map(c => c.cardId)
    });

    // Scroll handler for sticky CTA
    const handleScroll = () => {
      setShowCompareCTA(window.scrollY > 240);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedTag, cards]);

  const handleTagSelect = (tag: string) => {
    setSelectedTag(tag);
    
    // Binary scoring: 1 if card has tag, 0 if not
    const sortedCards = [...cardsData].map(card => {
      const score = card.tags.includes(tag) ? weightMap[tag] : 0;
      return { 
        ...card, 
        score,
        reactKey: `${tag}-${card.cardId}` // Force remount for FLIP animation
      };
    }).sort((a, b) => {
      // Sort by score first, then by originalRank for tie-breaking
      if (b.score !== a.score) return b.score - a.score;
      return a.originalRank - b.originalRank;
    });

    setCards(sortedCards);
    
    // Track tag selection
    trackEvent('chip_toggle', {
      tag,
      selectedTag: tag
    });
  };

  const handleCompareOpen = (mode: string) => {
    if (mode === 'lite') {
      setShowCGLite(true);
    } else {
      setShowCGSim(true);
    }
    trackEvent('compare_open', { mode });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="px-4 pt-6">
        <HeroPersonalised />
      </div>

      {/* Carousel Section */}
      <div className="mt-6">
        <HeroCarousel cards={cards} />
      </div>

      {/* Filter Chips */}
      <div className="mt-6 px-4">
        <FilterChipsRow 
          selectedTag={selectedTag}
          onTagSelect={handleTagSelect}
        />
      </div>

      {/* Spacer for content */}
      <div className="h-96" />

      {/* Sticky Compare CTA */}
      {showCompareCTA && (
        <StickyCompareCTA onCompareOpen={handleCompareOpen} />
      )}

      {/* Modals */}
      <ModalLite 
        isOpen={showCGLite}
        onClose={() => setShowCGLite(false)}
      />
      
      <ModalSim 
        isOpen={showCGSim}
        onClose={() => setShowCGSim(false)}
      />
    </div>
  );
};

export default Index;
