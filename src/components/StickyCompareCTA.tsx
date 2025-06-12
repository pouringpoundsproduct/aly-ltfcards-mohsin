
import React from 'react';

interface StickyCompareCTAProps {
  onCompareOpen: (mode: string) => void;
}

const StickyCompareCTA = ({ onCompareOpen }: StickyCompareCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-50">
      <div className="flex gap-3">
        <button
          onClick={() => onCompareOpen('lite')}
          className="flex-1 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          style={{ minHeight: '44px' }}
        >
          Compare Cards (Lite)
        </button>
        <button
          onClick={() => onCompareOpen('sim')}
          className="flex-1 border-2 border-gray-900 text-gray-900 py-3 px-4 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          style={{ minHeight: '44px' }}
        >
          Smart Compare
        </button>
      </div>
    </div>
  );
};

export default StickyCompareCTA;
