import { useState } from 'react';
import { Database, ChevronDown } from 'lucide-react';
import './DatasetSelector.css';

export type DatasetType = 'combined' | 'grind75' | 'learnyard' | 'blind75' | 'neetcode150' | 'neetcode250' | 'neetcode_all';

interface DatasetSelectorProps {
  currentDataset: DatasetType;
  onDatasetChange: (dataset: DatasetType) => void;
  problemCounts: {
    combined: number;
    grind75: number;
    learnyard: number;
    blind75: number;
    neetcode150: number;
    neetcode250: number;
    neetcode_all: number;
  };
}

export const DatasetSelector = ({ 
  currentDataset, 
  onDatasetChange, 
  problemCounts 
}: DatasetSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const datasets = [
    {
      id: 'combined' as DatasetType,
      name: 'All Problems (Combined)',
      description: 'Grind75 + Learnyard problems',
      count: problemCounts.combined,
      icon: '🔥'
    },
    {
      id: 'grind75' as DatasetType,
      name: 'Grind 75 (Curated)',
      description: 'Hand-picked essential problems',
      count: problemCounts.grind75,
      icon: '⭐'
    },
    {
      id: 'learnyard' as DatasetType,
      name: 'Learnyard Collection',
      description: 'Comprehensive problem set',
      count: problemCounts.learnyard,
      icon: '📚'
    },
    {
      id: 'blind75' as DatasetType,
      name: 'Blind 75',
      description: 'Classic Blind 75 curated list',
      count: problemCounts.blind75,
      icon: '👁️'
    },
    {
      id: 'neetcode150' as DatasetType,
      name: 'NeetCode 150',
      description: 'NeetCode 150 essential problems',
      count: problemCounts.neetcode150,
      icon: '🎯'
    },
    {
      id: 'neetcode250' as DatasetType,
      name: 'NeetCode 250',
      description: 'NeetCode 250 comprehensive set',
      count: problemCounts.neetcode250,
      icon: '💎'
    },
    {
      id: 'neetcode_all' as DatasetType,
      name: 'NeetCode All',
      description: 'All 827 NeetCode problems',
      count: problemCounts.neetcode_all,
      icon: '🚀'
    }
  ];

  const currentDatasetInfo = datasets.find(d => d.id === currentDataset);

  const handleSelect = (dataset: DatasetType) => {
    onDatasetChange(dataset);
    setIsOpen(false);
  };

  return (
    <div className="dataset-selector">
      <div className="dataset-selector-header">
        <Database size={16} />
        <span className="dataset-selector-label">Problem Set:</span>
      </div>
      
      <div className={`dataset-dropdown ${isOpen ? 'open' : ''}`}>
        <button 
          className="dataset-current"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
        >
          <div className="dataset-current-content">
            <span className="dataset-icon">{currentDatasetInfo?.icon}</span>
            <div className="dataset-info">
              <span className="dataset-name">{currentDatasetInfo?.name}</span>
              <span className="dataset-count">{currentDatasetInfo?.count} problems</span>
            </div>
          </div>
          <ChevronDown size={16} className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`} />
        </button>

        {isOpen && (
          <div className="dataset-options">
            {datasets.map(dataset => (
              <button
                key={dataset.id}
                className={`dataset-option ${dataset.id === currentDataset ? 'selected' : ''}`}
                onClick={() => handleSelect(dataset.id)}
              >
                <span className="dataset-icon">{dataset.icon}</span>
                <div className="dataset-option-info">
                  <div className="dataset-option-name">{dataset.name}</div>
                  <div className="dataset-option-description">{dataset.description}</div>
                  <div className="dataset-option-count">{dataset.count} problems</div>
                </div>
                {dataset.id === currentDataset && (
                  <div className="selected-indicator">✓</div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};