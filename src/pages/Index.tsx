
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
  const [selectedChips, setSelectedChips] = useState<string[]>([]);
  const [showCompareCTA, setShowCompareCTA] = useState(false);
  const [showCGLite, setShowCGLite] = useState(false);
  const [showCGSim, setShowCGSim] = useState(false);

  // Weight map for filtering algorithm
  const weightMap = {
    lounge: 3,
    fuel: 2,
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
      chips: selectedChips,
      rank: cards.map(c => c.cardId)
    });

    // Scroll handler for sticky CTA
    const handleScroll = () => {
      setShowCompareCTA(window.scrollY > 240);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [selectedChips, cards]);

  const handleChipToggle = (tag: string) => {
    const newChips = selectedChips.includes(tag)
      ? selectedChips.filter(t => t !== tag)
      : [...selectedChips, tag];
    
    setSelectedChips(newChips);
    
    // Calculate scores and re-sort cards
    const sortedCards = [...cards].map(card => {
      const score = newChips.reduce((acc, chip) => {
        return card.tags.includes(chip) ? acc + weightMap[chip as keyof typeof weightMap] : acc;
      }, 0);
      return { ...card, score };
    }).sort((a, b) => b.score - a.score);

    setCards(sortedCards);
    
    // Track chip toggle
    trackEvent('chip_toggle', {
      tag,
      state: newChips.includes(tag)
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
          selectedChips={selectedChips}
          onChipToggle={handleChipToggle}
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
