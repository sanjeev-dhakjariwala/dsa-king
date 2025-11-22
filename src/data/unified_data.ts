import type { ProblemSet } from '../types';
import type { DatasetType } from '../components/DatasetSelector';
import {
  grind75Data,
  learnyardProblems,
  combinedProblems
} from './learnyard_data';
import {
  blind75Problems,
  neetcode150Problems,
  neetcode250Problems,
  neetcode75Problems
} from './neetcode_75';

/**
 * Unified data fetcher that supports all datasets
 */
export const getDatasetByType = (type: DatasetType): ProblemSet => {
  switch (type) {
    // Learnyard datasets
    case 'grind75':
      return grind75Data;
    case 'learnyard':
      return learnyardProblems;
    case 'combined':
      return combinedProblems;
    
    // NeetCode datasets
    case 'blind75':
      return blind75Problems;
    case 'neetcode150':
      return neetcode150Problems;
    case 'neetcode250':
      return neetcode250Problems;
    case 'neetcode_all':
      return neetcode75Problems;
    
    default:
      return grind75Data; // Default fallback
  }
};

/**
 * Get all available datasets with their metadata
 */
export const getAllDatasets = () => ({
  combined: combinedProblems,
  grind75: grind75Data,
  learnyard: learnyardProblems,
  blind75: blind75Problems,
  neetcode150: neetcode150Problems,
  neetcode250: neetcode250Problems,
  neetcode_all: neetcode75Problems
});

/**
 * Get problem counts for all datasets
 */
export const getProblemCounts = () => {
  const datasets = getAllDatasets();
  return {
    combined: datasets.combined.problems.length,
    grind75: datasets.grind75.problems.length,
    learnyard: datasets.learnyard.problems.length,
    blind75: datasets.blind75.problems.length,
    neetcode150: datasets.neetcode150.problems.length,
    neetcode250: datasets.neetcode250.problems.length,
    neetcode_all: datasets.neetcode_all.problems.length
  };
};

// Re-export all datasets for convenience
export {
  grind75Data,
  learnyardProblems,
  combinedProblems,
  blind75Problems,
  neetcode150Problems,
  neetcode250Problems,
  neetcode75Problems
};

