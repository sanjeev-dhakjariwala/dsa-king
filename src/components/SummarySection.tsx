import { Clock, BarChart3, Tags, CheckCircle } from 'lucide-react';
import type { useProgress } from '../hooks/useProgress';
import { getDatasetByType } from '../data/unified_data';
import type { DatasetType } from './DatasetSelector';
import './SummarySection.css';

interface SummarySectionProps {
  progress: ReturnType<typeof useProgress>;
  selectedDataset: DatasetType;
}

export const SummarySection = ({ progress, selectedDataset }: SummarySectionProps) => {
  // Calculate statistics from selected dataset
  const getStats = () => {
    const allProblems = getDatasetByType(selectedDataset).problems;
    const difficultyStats = { easy: 0, medium: 0, hard: 0 };
    const topicStats: Record<string, number> = {};
    
    allProblems.forEach(problem => {
      // Map difficulties - handle both title case (Grind75) and uppercase (Learnyard)
      const diffMap: Record<string, keyof typeof difficultyStats> = {
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
      
      const difficulty = diffMap[problem.difficulty] || 'medium';
      difficultyStats[difficulty]++;
      
      problem.topics.forEach(topic => {
        topicStats[topic] = (topicStats[topic] || 0) + 1;
      });
    });
    
    const totalHours = Math.ceil(allProblems.length * 45 / 60); // Estimate 45 min per problem
    
    return {
      totalProblems: allProblems.length,
      totalHours,
      difficultyStats,
      topicStats
    };
  };
  
  const stats = getStats();
  const selectedProblems = getDatasetByType(selectedDataset).problems;
  const progressStats = progress.getProgressStats(selectedProblems);
  
  // Debug logging
  console.log('SummarySection Debug:', {
    selectedDataset,
    totalProblems: selectedProblems.length,
    stats: stats.difficultyStats,
    progressStats: progressStats.completedByDifficulty,
    completedTotal: progressStats.completed,
    progressTotal: progressStats.total
  });

  return (
    <div className="summary-section">
      <h2>Questions Summary</h2>
      
      <div className="summary-grid">
        <div className="summary-card">
          <div className="summary-header">
            <Clock className="summary-icon" />
            <h3>TIME NEEDED</h3>
          </div>
          <div className="summary-content">
            <div className="time-estimate">
              <span className="time-number">{stats.totalHours} hours</span>
              <span className="time-description">Fits into your schedule.</span>
            </div>
            <p className="summary-description">
              How long doing these questions will take for an average person. It's a
              conservative estimate where it is assumed that roughly the same amount of time will be
              needed to check the answer for each question.
            </p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-header">
            <BarChart3 className="summary-icon" />
            <h3>DIFFICULTY</h3>
          </div>
          <div className="summary-content">
            <div className="difficulty-stats">
              <div className="difficulty-item">
                <span className="difficulty-label difficulty-easy">Easy:</span>
                <span className="difficulty-count">{stats.difficultyStats.easy}</span>
              </div>
              <div className="difficulty-item">
                <span className="difficulty-label difficulty-medium">Medium:</span>
                <span className="difficulty-count">{stats.difficultyStats.medium}</span>
              </div>
              <div className="difficulty-item">
                <span className="difficulty-label difficulty-hard">Hard:</span>
                <span className="difficulty-count">{stats.difficultyStats.hard}</span>
              </div>
            </div>
            <p className="summary-description">Questions grouped by difficulty</p>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-header">
            <Tags className="summary-icon" />
            <h3>TOPICS</h3>
          </div>
          <div className="summary-content">
            <div className="topics-grid">
              {Object.entries(stats.topicStats).map(([topic, count]) => (
                <div key={topic} className="topic-item">
                  <span className="topic-name">{topic}:</span>
                  <span className="topic-count">{count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-header">
            <CheckCircle className="summary-icon" />
            <h3>COMPLETED {progressStats.completed} / {progressStats.total}</h3>
          </div>
          <div className="summary-content">
            <div className="progress-visual">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ 
                    width: `${progressStats.total > 0 ? (progressStats.completed / progressStats.total) * 100 : 0}%` 
                  }}
                />
              </div>
              <span className="progress-percentage">
                {progressStats.total > 0 ? Math.round((progressStats.completed / progressStats.total) * 100) : 0}%
              </span>
            </div>
            <div className="completed-breakdown">
              <div className="completed-difficulty">
                <span className="difficulty-easy">
                  Easy: {progressStats.completedByDifficulty.easy || 0}/{stats.difficultyStats.easy || 0}
                </span>
                <span className="difficulty-medium">
                  Medium: {progressStats.completedByDifficulty.medium || 0}/{stats.difficultyStats.medium || 0}
                </span>
                <span className="difficulty-hard">
                  Hard: {progressStats.completedByDifficulty.hard || 0}/{stats.difficultyStats.hard || 0}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};