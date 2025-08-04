import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface ComplexityBadgeProps {
  complexity: string;
  type: 'time' | 'space';
}

export const ComplexityBadge: React.FC<ComplexityBadgeProps> = ({ complexity, type }) => {
  const getComplexityColor = (comp: string) => {
    if (comp.includes('O(1)')) return 'bg-green-900/30 text-green-400 border-green-500/30';
    if (comp.includes('O(log n)')) return 'bg-blue-900/30 text-blue-400 border-blue-500/30';
    if (comp.includes('O(n)') && !comp.includes('O(n²)') && !comp.includes('O(n log n)')) return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/30';
    if (comp.includes('O(n log n)')) return 'bg-orange-900/30 text-orange-400 border-orange-500/30';
    if (comp.includes('O(n²)') || comp.includes('O(n³)')) return 'bg-red-900/30 text-red-400 border-red-500/30';
    if (comp.includes('O(2ⁿ)') || comp.includes('O(n!)')) return 'bg-purple-900/30 text-purple-400 border-purple-500/30';
    return 'bg-gray-700/30 text-gray-400 border-gray-500/30';
  };

  const getIcon = () => {
    if (complexity.includes('O(1)') || complexity.includes('O(log n)')) return <TrendingDown size={14} />;
    if (complexity.includes('O(2ⁿ)') || complexity.includes('O(n!)') || complexity.includes('O(n²)')) return <TrendingUp size={14} />;
    return <Minus size={14} />;
  };

  return (
    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getComplexityColor(complexity)}`}>
      {getIcon()}
      <span className="capitalize">{type}</span>
      <span className="font-mono">{complexity}</span>
    </div>
  );
};