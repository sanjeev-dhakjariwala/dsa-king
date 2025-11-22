import { ExternalLink, Check } from 'lucide-react';
import type { Problem } from '../types';
import './ProblemCard.css';

interface ProblemCardProps {
  problem: Problem;
  problemNumber: number;
  isCompleted: boolean;
  onToggleComplete: () => void;
  showTopics: boolean;
}

export const ProblemCard = ({ 
  problem, 
  problemNumber, 
  isCompleted, 
  onToggleComplete,
  showTopics 
}: ProblemCardProps) => {
  const getDifficultyClass = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'difficulty-easy';
      case 'medium': return 'difficulty-medium';
      case 'hard': return 'difficulty-hard';
      default: return '';
    }
  };

  return (
    <div className={`problem-card ${isCompleted ? 'completed' : ''}`}>
      <div className="problem-header">
        <div className="problem-number-checkbox">
          <span className="problem-number">{problemNumber}</span>
          <button 
            className={`checkbox ${isCompleted ? 'checked' : ''}`}
            onClick={onToggleComplete}
            aria-label={`Mark ${problem.title} as ${isCompleted ? 'incomplete' : 'complete'}`}
          >
            {isCompleted && <Check size={14} />}
          </button>
        </div>
      </div>
      
      <div className="problem-content">
        <div className="problem-title-row">
          <a 
            href={problem.leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="problem-title-link"
          >
            <span className="problem-title">{problem.title}</span>
            <ExternalLink size={14} className="external-link-icon" />
          </a>
        </div>
        
        <div className="problem-meta">
          <span className={`difficulty ${getDifficultyClass(problem.difficulty)}`}>
            {problem.difficulty}
          </span>
          <span className="time-estimate">·{problem.timeEstimate} mins</span>
        </div>
        
        {showTopics && (
          <div className="problem-topics">
            {problem.topics.map((topic) => (
              <span key={topic} className="topic-tag">
                {topic}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};