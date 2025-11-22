export type Difficulty = 'EASY' | 'MEDIUM' | 'HARD' | 'THEORY' | 'BASIC';

export type Topic = 
  | 'Array' 
  | 'Backtracking'
  | 'Binary' 
  | 'Binary Search' 
  | 'Binary Search Tree' 
  | 'Binary Tree' 
  | 'Bit Manipulation'
  | 'Breadth-First Search'
  | 'Bucket Sort'
  | 'Combinatorics'
  | 'Counting'
  | 'Data Stream'
  | 'Depth-First Search'
  | 'Design'
  | 'Divide and Conquer'
  | 'Doubly-Linked List'
  | 'Dynamic Programming' 
  | 'Geometry'
  | 'Graph'
  | 'Greedy'
  | 'Hash Table' 
  | 'Heap' 
  | 'Linked List' 
  | 'Math' 
  | 'Matrix'
  | 'Memoization'
  | 'Merge Sort'
  | 'Monotonic Queue'
  | 'Monotonic Stack'
  | 'Ordered Set'
  | 'Prefix Sum'
  | 'Queue' 
  | 'Quickselect'
  | 'Randomized'
  | 'Recursion' 
  | 'Shortest Path'
  | 'Simulation'
  | 'Sliding Window'
  | 'Sorting'
  | 'Stack' 
  | 'String'
  | 'Topological Sort'
  | 'Trie'
  | 'Two Pointers'
  | 'Union Find';

export interface Problem {
  id: number;
  title: string;
  difficulty: Difficulty;
  timeEstimate?: number; // in minutes - optional for learnyard data
  leetcodeUrl?: string; // optional - some problems might not have leetcode links
  problemLink?: string; // learnyard uses this field name
  articleLink?: string; // additional field from learnyard
  topics: string[]; // simplified from Topic[] to allow any topic strings
  platform?: string; // platform information
  status?: string; // problem status
  // Neetcode-specific fields
  neetcodeUrl?: string; // neetcode problem URL
  videoUrl?: string; // YouTube video URL
  pattern?: string; // problem pattern/category
  code?: string; // problem code identifier (e.g., "0001-two-sum")
  isBlind75?: boolean; // part of Blind 75 list
  isNeetcode150?: boolean; // part of NeetCode 150 list
  isNeetcode250?: boolean; // part of NeetCode 250 list
  isPremium?: boolean; // requires LeetCode premium
}

export interface ProblemSet {
  problems: Problem[];
}

export interface DifficultyStats {
  easy: number;
  medium: number;
  hard: number;
}

export interface TopicStats {
  [key: string]: number;
}

export interface ProgressStats {
  completed: number;
  total: number;
  completedByDifficulty: DifficultyStats;
  completedByTopic: TopicStats;
}

export interface AppState {
  completedProblems: Set<number>;
  viewingMode: 'questions' | 'topics';
  showTopics: boolean;
  groupBy: 'none' | 'week' | 'difficulty' | 'topic';
}