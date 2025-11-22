import { useState, useEffect } from 'react';
import type { ProgressStats, DifficultyStats, TopicStats, Problem } from '../types';
import combinedProblems from '../data/learnyard_data';

export const useProgress = () => {
  const [completedProblems, setCompletedProblems] = useState<Set<number>>(new Set());
  const [isInitialized, setIsInitialized] = useState(false);
  
  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('grind75-progress');
    console.log('Loading progress from localStorage:', saved);
    if (saved) {
      try {
        const problemIds = JSON.parse(saved) as number[];
        console.log('Parsed problem IDs:', problemIds);
        setCompletedProblems(new Set(problemIds));
      } catch (error) {
        console.error('Failed to load progress:', error);
      }
    }
    setIsInitialized(true);
  }, []);
  
  // Save progress to localStorage whenever it changes (but not on initial load)
  useEffect(() => {
    if (isInitialized) {
      const problemIds = Array.from(completedProblems);
      console.log('Saving progress to localStorage:', problemIds);
      localStorage.setItem('grind75-progress', JSON.stringify(problemIds));
    }
  }, [completedProblems, isInitialized]);
  
  const toggleProblem = (problemId: number) => {
    console.log('Toggling problem:', problemId);
    setCompletedProblems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(problemId)) {
        newSet.delete(problemId);
        console.log('Removed problem:', problemId);
      } else {
        newSet.add(problemId);
        console.log('Added problem:', problemId);
      }
      console.log('New completed problems:', Array.from(newSet));
      return newSet;
    });
  };
  
  const getProgressStats = (problems?: Problem[]): ProgressStats => {
    const allProblems = problems || combinedProblems.problems;
    
    const completedByDifficulty: DifficultyStats = { easy: 0, medium: 0, hard: 0 };
    const completedByTopic: TopicStats = {};
    
    // Initialize topic counts from all unique topics
    const allTopics = new Set<string>();
    allProblems.forEach(problem => {
      problem.topics.forEach(topic => allTopics.add(topic));
    });
    
    allTopics.forEach(topic => {
      completedByTopic[topic] = 0;
    });
    
    // Count completed problems by difficulty and topic
    let completedCount = 0;
    allProblems.forEach(problem => {
      if (completedProblems.has(problem.id)) {
        completedCount++;
        // Map difficulty values - handle both title case (Grind75) and uppercase (Learnyard)
        const difficultyMap: Record<string, keyof DifficultyStats> = {
          // Grind75 format (title case)
          'Easy': 'easy',
          'Medium': 'medium',
          'Hard': 'hard',
          // Learnyard format (uppercase)
          'EASY': 'easy',
          'MEDIUM': 'medium', 
          'HARD': 'hard',
          'THEORY': 'easy',
          'BASIC': 'easy'
        };
        
        const difficulty = difficultyMap[problem.difficulty] || 'medium';
        completedByDifficulty[difficulty]++;
        
        problem.topics.forEach(topic => {
          completedByTopic[topic] = (completedByTopic[topic] || 0) + 1;
        });
      }
    });
    
    return {
      completed: completedCount,
      total: allProblems.length,
      completedByDifficulty,
      completedByTopic
    };
  };
  
  return {
    completedProblems,
    toggleProblem,
    getProgressStats
  };
};