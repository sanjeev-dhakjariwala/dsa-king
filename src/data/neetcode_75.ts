import type { ProblemSet, Problem, Difficulty } from '../types';
import allNeetcodeData from '../../neetcode_75.json';
import blind75Data from '../../blind75.json';
import neetcode150Data from '../../neetcode150.json';
import neetcode250Data from '../../neetcode250.json';

// Map difficulty strings from neetcode format to our format
const mapDifficulty = (difficulty: string): Difficulty => {
  const normalized = difficulty.toUpperCase();
  if (normalized === 'EASY') return 'EASY';
  if (normalized === 'MEDIUM') return 'MEDIUM';
  if (normalized === 'HARD') return 'HARD';
  return 'MEDIUM'; // Default
};

// Transform neetcode data to match our Problem interface
const transformNeetcodeData = (data: any[]): Problem[] => {
  return data
    .filter(item => item && item.problem && item.code) // Filter out invalid items
    .map((item, index) => {
      // Extract problem number from code (e.g., "0001-two-sum" -> 1)
      const problemNumber = parseInt(item.code.split('-')[0]) || index + 1;
      
      // Build LeetCode URL from the link
      const leetcodeUrl = item.link 
        ? `https://leetcode.com/problems/${item.link}`
        : undefined;
      
      // Build NeetCode URL if ncLink is available
      const neetcodeUrl = item.ncLink 
        ? `https://neetcode.io/problems/${item.ncLink}`
        : undefined;
      
      // Build YouTube URL from video ID
      const videoUrl = item.video 
        ? `https://www.youtube.com/watch?v=${item.video}`
        : undefined;

      return {
        id: problemNumber,
        title: item.problem,
        difficulty: mapDifficulty(item.difficulty),
        timeEstimate: 30, // Default time estimate
        leetcodeUrl,
        neetcodeUrl,
        videoUrl,
        topics: item.pattern ? [item.pattern] : [],
        pattern: item.pattern,
        code: item.code,
        // Additional flags
        isBlind75: item.blind75 || false,
        isNeetcode150: item.neetcode150 || false,
        isNeetcode250: item.neetcode250 || false,
        isPremium: item.premium || false
      };
    })
    .sort((a, b) => a.id - b.id); // Sort by problem number
};

// Create the main dataset (all problems)
export const neetcode75Problems: ProblemSet = {
  problems: transformNeetcodeData(allNeetcodeData)
};

// Export filtered datasets from separate JSON files
export const blind75Problems: ProblemSet = {
  problems: transformNeetcodeData(blind75Data)
};

export const neetcode150Problems: ProblemSet = {
  problems: transformNeetcodeData(neetcode150Data)
};

export const neetcode250Problems: ProblemSet = {
  problems: transformNeetcodeData(neetcode250Data)
};

// Helper function to get dataset by type
export const getNeetcodeDatasetByType = (
  type: 'all' | 'blind75' | 'neetcode150' | 'neetcode250'
): ProblemSet => {
  switch (type) {
    case 'blind75':
      return blind75Problems;
    case 'neetcode150':
      return neetcode150Problems;
    case 'neetcode250':
      return neetcode250Problems;
    case 'all':
    default:
      return neetcode75Problems;
  }
};

// Get statistics about the dataset
export const getNeetcodeStatistics = () => {
  const problems = neetcode75Problems.problems;
  const difficultyStats = { easy: 0, medium: 0, hard: 0 };
  const patternStats: { [key: string]: number } = {};
  
  let blind75Count = 0;
  let neetcode150Count = 0;
  let neetcode250Count = 0;
  let premiumCount = 0;

  problems.forEach(problem => {
    // Count by difficulty
    const difficulty = problem.difficulty.toLowerCase() as keyof typeof difficultyStats;
    if (difficulty in difficultyStats) {
      difficultyStats[difficulty]++;
    }

    // Count by pattern
    if (problem.pattern) {
      patternStats[problem.pattern] = (patternStats[problem.pattern] || 0) + 1;
    }

    // Count special categories
    if (problem.isBlind75) blind75Count++;
    if (problem.isNeetcode150) neetcode150Count++;
    if (problem.isNeetcode250) neetcode250Count++;
    if (problem.isPremium) premiumCount++;
  });

  return {
    totalProblems: problems.length,
    blind75Count,
    neetcode150Count,
    neetcode250Count,
    premiumCount,
    difficultyStats,
    patternStats: Object.entries(patternStats)
      .sort((a, b) => b[1] - a[1]) // Sort by count descending
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {})
  };
};

// Export the main dataset as default
export default neetcode75Problems;

