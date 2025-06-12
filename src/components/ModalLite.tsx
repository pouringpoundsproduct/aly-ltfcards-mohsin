
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface ModalLiteProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalLite = ({ isOpen, onClose }: ModalLiteProps) => {
  const [spends, setSpends] = useState({
    online: 5000,
    travel: 2000,
    dining: 1500,
    fuel: 1000
  });

  if (!isOpen) return null;

  const handleSliderChange = (category: string, value: number) => {
    setSpends(prev => ({ ...prev, [category]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            CG-Lite: Your Spend Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Spend Sliders */}
        <div className="space-y-6">
          {Object.entries(spends).map(([category, value]) => (
            <div key={category} className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-sm font-medium text-gray-700 capitalize">
                  {category} Spending
                </label>
                <span className="text-sm text-gray-600">₹{value.toLocaleString()}</span>
              </div>
              <input
                type="range"
                min="0"
                max="20000"
                step="500"
                value={value}
                onChange={(e) => handleSliderChange(category, parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                style={{ accentColor: '#0066CC' }}
              />
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          className="w-full mt-8 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors"
          style={{ minHeight: '44px' }}
        >
          Get Personalized Recommendations
        </button>
      </div>
    </div>
  );
};

export default ModalLite;
