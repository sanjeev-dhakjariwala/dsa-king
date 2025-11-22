import type { ProblemSet, Problem, Difficulty } from '../types';
import learnyardData from '../../learnyard.json';
import { grind75Data as originalGrind75Data } from './grind75_official';

// Transform learnyard data to match our Problem interface
const transformLearnyardData = (): Problem[] => {
  return learnyardData
    .filter(item => item && item.id && item.title) // Filter out invalid items
    .map(item => ({
      id: parseInt(item.id),
      title: item.title,
      difficulty: (item.difficulty || 'MEDIUM') as Difficulty,
      timeEstimate: 30, // Default time estimate since learnyard doesn't provide this
      leetcodeUrl: item.problemLink && item.problemLink !== 'NA' ? item.problemLink : undefined,
      problemLink: item.problemLink,
      articleLink: item.articleLink,
      topics: Array.isArray(item.tags) ? item.tags : [],
      platform: item.platform,
      status: item.status
    }))
    .sort((a, b) => a.id - b.id); // Sort by ID
};

const learnyardProblems: ProblemSet = {
  problems: transformLearnyardData()
};

// Use the original grind75 data with all 169 problems
const grind75Data: ProblemSet = originalGrind75Data;

// Combined dataset - merge both grind75 and learnyard
const combinedProblems: ProblemSet = {
  problems: [
    // Start with curated Grind75 problems (higher priority)
    ...grind75Data.problems,
    // Add learnyard problems that don't conflict with Grind75 IDs
    ...learnyardProblems.problems.filter(p => 
      !grind75Data.problems.some(g75 => g75.id === p.id)
    )
  ].sort((a, b) => a.id - b.id)
};

// Helper function to get dataset by type
export const getDatasetByType = (type: 'combined' | 'grind75' | 'learnyard'): ProblemSet => {
  switch (type) {
    case 'grind75':
      return grind75Data;
    case 'learnyard':
      return learnyardProblems;
    case 'combined':
    default:
      return combinedProblems;
  }
};

// Export all datasets
export { learnyardProblems, grind75Data, combinedProblems };
export default combinedProblems; // Use combined as default