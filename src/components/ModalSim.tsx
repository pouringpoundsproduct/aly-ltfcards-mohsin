
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { medianSpendMatrix } from '@/data/medianSpendMatrix';

interface ModalSimProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalSim = ({ isOpen, onClose }: ModalSimProps) => {
  const [ageBand, setAgeBand] = useState('');
  const [cityTier, setCityTier] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (ageBand && cityTier) {
      const prefilledData = medianSpendMatrix[ageBand]?.[cityTier];
      console.log('Prefilled spend data:', prefilledData);
      // Here you would navigate to CG-Pro with prefilled data
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end">
      <div className="bg-white w-full rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            CG-Sim: Smart Profile
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
            style={{ minHeight: '44px', minWidth: '44px' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <div className="space-y-6">
          {/* Age Band */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Age Group
            </label>
            <select
              value={ageBand}
              onChange={(e) => setAgeBand(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ minHeight: '44px' }}
            >
              <option value="">Select age group</option>
              <option value="25-34">25-34 years</option>
              <option value="35-44">35-44 years</option>
              <option value="45-54">45-54 years</option>
            </select>
          </div>

          {/* City Tier */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              City Type
            </label>
            <select
              value={cityTier}
              onChange={(e) => setCityTier(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              style={{ minHeight: '44px' }}
            >
              <option value="">Select city type</option>
              <option value="T1">Metro (Tier 1)</option>
              <option value="T2">Major Cities (Tier 2)</option>
              <option value="T3">Smaller Cities (Tier 3)</option>
            </select>
          </div>
        </div>

        {/* CTA */}
        <button
          onClick={handleSubmit}
          disabled={!ageBand || !cityTier}
          className="w-full mt-8 bg-gray-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          style={{ minHeight: '44px' }}
        >
          Generate Smart Profile
        </button>
      </div>
    </div>
  );
};

export default ModalSim;
