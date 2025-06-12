
import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface FilterChipsRowProps {
  selectedChips: string[];
  onChipToggle: (tag: string) => void;
}

const FilterChipsRow = ({ selectedChips, onChipToggle }: FilterChipsRowProps) => {
  const { toast } = useToast();

  const chips = [
    { id: 'lounge', label: 'Lounge ✈︎' },
    { id: 'fuel', label: 'Fuel ⛽' },
    { id: 'upi', label: 'UPI 🏷' },
    { id: 'forex', label: 'Forex 🌍' },
    { id: 'customisable', label: 'Customisable ⚙' },
    { id: 'metal', label: 'Metal 🪙' },
    { id: 'cashback', label: 'Cashback 💰' },
    { id: 'beginner', label: 'Beginner ✔︎' }
  ];

  const handleChipClick = (chipId: string) => {
    onChipToggle(chipId);
    
    // Show toast for empty state (simplified logic for demo)
    if (selectedChips.length >= 3 && !selectedChips.includes(chipId)) {
      toast({
        description: "No exact match – showing nearest fit.",
        duration: 2000,
      });
    }
  };

  return (
    <div className="overflow-x-auto scrollbar-hide">
      <div className="flex gap-3 pb-2" style={{ minWidth: 'max-content' }}>
        {chips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => handleChipClick(chip.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              selectedChips.includes(chip.id)
                ? 'text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={{
              backgroundColor: selectedChips.includes(chip.id) ? '#0066CC' : undefined,
              borderRadius: '12px',
              minHeight: '44px'
            }}
          >
            {chip.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterChipsRow;
