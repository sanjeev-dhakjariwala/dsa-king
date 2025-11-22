import { useState, useMemo } from 'react';
import { getDatasetByType } from '../data/unified_data';
import type { useProgress } from '../hooks/useProgress';
import type { Problem } from '../types';
import type { DatasetType } from './DatasetSelector';
import { ExternalLink, Check, Shuffle, ListFilter } from 'lucide-react';
import { SearchBar } from './SearchBar';
import './WeekList.css';

interface WeekListProps {
  showTopics: boolean;
  progress: ReturnType<typeof useProgress>;
  groupBy?: 'none' | 'week' | 'difficulty' | 'topic';
  viewingMode?: 'questions' | 'topics';
  selectedDataset: DatasetType;
}

export const WeekList = ({ showTopics, progress, groupBy = 'none', viewingMode = 'questions', selectedDataset }: WeekListProps) => {
  // Get all problems from the selected dataset
  const [searchQuery, setSearchQuery] = useState('');
  const [randomQuestion, setRandomQuestion] = useState<Problem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const allProblems = getDatasetByType(selectedDataset).problems;
  
  // Function to get a random question
  const getRandomQuestion = () => {
    const randomIndex = Math.floor(Math.random() * allProblems.length);
    return allProblems[randomIndex];
  };

  const handleRandomSelect = () => {
    setIsAnimating(true);
    setSearchQuery(''); // Clear search when showing random question
    
    // Add a small delay for animation effect
    setTimeout(() => {
      const randomQ = getRandomQuestion();
      setRandomQuestion(randomQ);
      setIsAnimating(false);
    }, 300);
  };

  const handleShowAll = () => {
    setRandomQuestion(null);
    setSearchQuery('');
  };

  // Filter problems based on search query or random question selection
  const filteredProblems = useMemo(() => {
    // If a random question is selected, show only that question
    if (randomQuestion) {
      return [randomQuestion];
    }
    
    if (!searchQuery.trim()) {
      return allProblems;
    }
    
    const query = searchQuery.toLowerCase().trim();
    return allProblems.filter((problem: Problem) => {
      // Search in title
      if (problem.title.toLowerCase().includes(query)) return true;
      
      // Search in difficulty
      if (problem.difficulty.toLowerCase().includes(query)) return true;
      
      // Search in topics
      if (problem.topics.some(topic => topic.toLowerCase().includes(query))) return true;
      
      // Search in platform
      if (problem.platform && problem.platform.toLowerCase().includes(query)) return true;
      
      return false;
    });
  }, [allProblems, searchQuery, randomQuestion]);
  
  console.log('WeekList rendering with:', { 
    problemsCount: allProblems.length,
    filteredCount: filteredProblems.length,
    searchQuery,
    groupBy, 
    viewingMode 
  });

  // Helper component for search bar and buttons
  const renderSearchAndActions = () => (
    <div className="search-actions-container">
      <div className="search-section">
        <SearchBar 
          onSearch={setSearchQuery} 
          placeholder="Search problems by title, topic, difficulty, or platform..."
        />
        <div className="action-buttons">
          {randomQuestion ? (
            <>
              <button 
                className="show-all-btn"
                onClick={handleShowAll}
                title="Show all questions"
              >
                <ListFilter size={18} />
                Show All
              </button>
              <button 
                className={`random-question-btn ${isAnimating ? 'animating' : ''}`}
                onClick={handleRandomSelect}
                disabled={isAnimating}
                title="Pick another random question"
              >
                <Shuffle size={18} />
                {isAnimating ? 'Picking...' : 'Another Question'}
              </button>
            </>
          ) : (
            <button 
              className={`random-question-btn ${isAnimating ? 'animating' : ''}`}
              onClick={handleRandomSelect}
              disabled={isAnimating}
              title="Pick a random question"
            >
              <Shuffle size={18} />
              {isAnimating ? 'Picking...' : 'Random Question'}
            </button>
          )}
        </div>
      </div>
      {searchQuery && !randomQuestion && (
        <div className="search-results-count">
          Found {filteredProblems.length} of {allProblems.length} problems
        </div>
      )}
      {randomQuestion && (
        <div className="random-question-badge">
          Showing random question
        </div>
      )}
    </div>
  );

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return '';
    }
  };

  const renderQuestionRow = (problem: any, globalIndex: number) => {
    const isCompleted = progress.completedProblems.has(problem.id);
    return (
      <div 
        key={problem.id} 
        className={`question-row ${isCompleted ? 'completed' : ''}`}
        data-question-id={problem.id}
      >
        <span className="question-number">{globalIndex + 1}</span>
        <label className="checkbox-container">
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={() => progress.toggleProblem(problem.id)}
            className="question-checkbox-input"
            aria-label={`Mark ${problem.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
          />
          <span className="checkbox-checkmark">
            {isCompleted && <Check size={12} />}
          </span>
        </label>
        <div className="question-content">
          <a
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="question-title-link"
          >
            <span className="question-title">{problem.title}</span>
            <ExternalLink size={14} className="external-link-icon" />
          </a>
          <div className="question-meta">
            <span className={`question-difficulty ${getDifficultyClass(problem.difficulty)}`}>{problem.difficulty}</span>
            <span className="question-time">{problem.timeEstimate} mins</span>
            {showTopics && (
              <div className="question-topics">
                {problem.topics.map((topic: string) => (
                  <span key={topic} className="question-topic-tag">{topic}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Group by difficulty
  const difficultyGroups = filteredProblems.reduce<Record<string, any[]>>((acc, p) => {
    acc[p.difficulty] = acc[p.difficulty] || [];
    acc[p.difficulty].push(p);
    return acc;
  }, {});

  // Group by topic
  const topicGroups = filteredProblems.reduce<Record<string, any[]>>((acc, p) => {
    p.topics.forEach((t: string) => {
      acc[t] = acc[t] || [];
      acc[t].push(p);
    });
    return acc;
  }, {});

  if (viewingMode === 'topics' && groupBy === 'topic') {
    const sortedTopics = Object.keys(topicGroups).sort();
    let runningIndex = 0;
    return (
      <div className="week-list">
        {renderSearchAndActions()}
        <div className="questions-topic-groups">
          {sortedTopics.map(topic => (
            <div key={topic} className="topic-group">
              <h3 className="group-heading">{topic}</h3>
              {topicGroups[topic].map(p => renderQuestionRow(p, runningIndex++))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (groupBy === 'week') {
    // Since we no longer have weeks, treat as no grouping
    return (
      <div className="week-list">
        {renderSearchAndActions()}
        <div className="questions-flat-list">
          {filteredProblems.map((p, idx) => renderQuestionRow(p, idx))}
        </div>
      </div>
    );
  }

  if (groupBy === 'difficulty') {
    const order: (keyof typeof difficultyGroups)[] = ['EASY', 'MEDIUM', 'HARD', 'THEORY', 'BASIC'];
    let runningIndex = 0;
    return (
      <div className="week-list">
        {renderSearchAndActions()}
        <div className="questions-difficulty-groups">
          {order.filter(d => difficultyGroups[d]?.length).map(d => (
            <div key={d} className="difficulty-group">
              <h3 className={`group-heading diff-${d.toLowerCase()}`}>{d}</h3>
              {difficultyGroups[d].map(p => renderQuestionRow(p, runningIndex++))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Default: flat list (groupBy none)
  return (
    <div className="week-list">
      {renderSearchAndActions()}
      <div className="questions-flat-list">
        {filteredProblems.map((p, idx) => renderQuestionRow(p, idx))}
      </div>
    </div>
  );
};