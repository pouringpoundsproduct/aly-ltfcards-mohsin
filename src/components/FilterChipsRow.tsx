
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

  // Dynamic chip reordering: selected chips first, then unselected
  const sortedChips = [...chips].sort((a, b) => {
    const aSelected = selectedChips.includes(a.id);
    const bSelected = selectedChips.includes(b.id);
    
    if (aSelected && !bSelected) return -1;
    if (!aSelected && bSelected) return 1;
    return 0;
  });

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
      <div className="flex gap-3 pb-2 transition-all duration-500 ease-out" style={{ minWidth: 'max-content' }}>
        {sortedChips.map((chip) => (
          <button
            key={chip.id}
            onClick={() => handleChipClick(chip.id)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-out whitespace-nowrap transform hover:scale-105 ${
              selectedChips.includes(chip.id)
                ? 'text-white shadow-lg'
                : 'bg-gray-100/80 backdrop-blur-sm text-gray-700 hover:bg-gray-200/80 border border-gray-200/50'
            }`}
            style={{
              backgroundColor: selectedChips.includes(chip.id) ? '#0066CC' : undefined,
              borderRadius: '12px',
              minHeight: '44px',
              backdropFilter: selectedChips.includes(chip.id) ? 'blur(10px)' : 'blur(5px)',
              boxShadow: selectedChips.includes(chip.id) 
                ? '0 8px 32px rgba(0, 102, 204, 0.3), 0 2px 8px rgba(0, 102, 204, 0.2)' 
                : '0 2px 8px rgba(0, 0, 0, 0.1)'
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
