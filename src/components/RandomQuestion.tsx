import { useState } from 'react';
import { Shuffle, ExternalLink, Clock, Tag, Check } from 'lucide-react';
import { getDatasetByType } from '../data/unified_data';
import type { Problem } from '../types';
import type { DatasetType } from './DatasetSelector';
import type { useProgress } from '../hooks/useProgress';
import './RandomQuestion.css';

interface RandomQuestionProps {
  onQuestionSelect?: (problem: Problem) => void;
  selectedDataset: DatasetType;
  progress: ReturnType<typeof useProgress>;
}

export const RandomQuestion = ({ onQuestionSelect, selectedDataset, progress }: RandomQuestionProps) => {
  const [selectedQuestion, setSelectedQuestion] = useState<Problem | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const getRandomQuestion = () => {
    const problems = getDatasetByType(selectedDataset).problems;
    const randomIndex = Math.floor(Math.random() * problems.length);
    return problems[randomIndex];
  };

  const handleRandomSelect = () => {
    setIsAnimating(true);
    
    // Add a small delay for animation effect
    setTimeout(() => {
      const randomQuestion = getRandomQuestion();
      setSelectedQuestion(randomQuestion);
      setIsAnimating(false);
      
      // Call callback if provided
      if (onQuestionSelect) {
        onQuestionSelect(randomQuestion);
      }
    }, 300);
  };

  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return '';
    }
  };

  return (
    <div className="random-question-section">
      <div className="random-question-header">
        <h3>Random Question Picker</h3>
        <p>Get a random question to practice with</p>
      </div>
      
      <div className="random-question-content">
        <button 
          className={`random-button ${isAnimating ? 'animating' : ''}`}
          onClick={handleRandomSelect}
          disabled={isAnimating}
        >
          <Shuffle className="shuffle-icon" />
          {isAnimating ? 'Picking...' : 'Pick Random Question'}
        </button>

        {selectedQuestion && (
          <div className="selected-question-card">
            <div className="question-header">
              <div className="question-info">
                <div className="question-number">#{selectedQuestion.id}</div>
                <div className="question-meta">
                  <span className={`question-difficulty ${getDifficultyClass(selectedQuestion.difficulty)}`}>
                    {selectedQuestion.difficulty}
                  </span>
                  <span className="question-time">
                    <Clock size={14} />
                    {selectedQuestion.timeEstimate} mins
                  </span>
                </div>
              </div>
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  checked={progress.completedProblems.has(selectedQuestion.id)}
                  onChange={() => progress.toggleProblem(selectedQuestion.id)}
                  className="question-checkbox-input"
                  aria-label={`Mark ${selectedQuestion.title} as ${progress.completedProblems.has(selectedQuestion.id) ? 'incomplete' : 'complete'}`}
                />
                <span className="checkbox-checkmark">
                  {progress.completedProblems.has(selectedQuestion.id) && <Check size={12} />}
                </span>
              </label>
            </div>
            
            <h4 className="question-title">{selectedQuestion.title}</h4>
            
            <div className="question-topics">
              <Tag size={14} />
              <div className="topics-list">
                {selectedQuestion.topics.map((topic) => (
                  <span key={topic} className="topic-tag">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="question-actions">
              <a 
                href={selectedQuestion.leetcodeUrl || selectedQuestion.problemLink || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="leetcode-link"
              >
                <ExternalLink size={16} />
                Solve on {selectedQuestion.platform || 'Platform'}
              </a>
              
              <button 
                className="another-question-btn"
                onClick={handleRandomSelect}
              >
                <Shuffle size={16} />
                Another Question
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};