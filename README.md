# Grind 75 Clone

A modern, interactive clone of the popular Grind 75 coding interview preparation tool. This application features all 169 authentic questions from the official Grind 75 list, with progress tracking, random question selection, and a clean, responsive interface.

## 🎯 Features

- **Complete Question Set**: All 169 questions from the official Grind 75 tool
- **Progress Tracking**: Mark questions as completed with localStorage persistence
- **Random Question Picker**: Get random questions to practice
- **Difficulty Breakdown**: Easy (41), Medium (102), Hard (26) questions
- **Topic Organization**: Questions organized by data structures and algorithms topics
- **Time Estimates**: Conservative time estimates for each question
- **Direct LeetCode Links**: One-click access to problems on LeetCode
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Clean UI**: Modern, distraction-free interface focused on productivity

## 🚀 Live Demo

The application runs locally at `http://localhost:5173` (or `http://localhost:5174` if port 5173 is in use).

## 📊 Statistics

- **Total Questions**: 169
- **Estimated Time**: ~80 hours total
- **Topics Covered**: 40+ data structures and algorithms topics
- **Difficulty Distribution**:
  - Easy: 41 questions (24%)
  - Medium: 102 questions (60%) 
  - Hard: 26 questions (15%)

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: CSS Modules
- **Icons**: Lucide React
- **State Management**: React Hooks + localStorage
- **Linting**: ESLint

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd blind169
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## 🎮 Usage

### Viewing Questions
- Browse all 169 questions in a clean, organized list
- Questions display title, difficulty, estimated time, and topics
- Click on any question card to expand details

### Progress Tracking
- Click the checkmark button to mark questions as completed
- Progress is automatically saved to localStorage
- View completion statistics in the summary section

### Random Question Selection
- Use the "Random Question" feature to get a surprise question to solve
- Perfect for when you want to practice but can't decide what to work on

### Filtering and Organization
- Questions are organized with clear difficulty indicators
- Topics are displayed as tags for easy identification
- Summary section shows overall progress statistics

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Layout.tsx       # Main app layout
│   ├── WeekList.tsx     # Question list display
│   ├── ProblemCard.tsx  # Individual question cards
│   ├── RandomQuestion.tsx # Random question picker
│   └── SummarySection.tsx # Progress statistics
├── data/
│   └── grind75_official.ts # Complete question dataset
├── hooks/
│   └── useProgress.ts   # Progress tracking logic
├── types/
│   └── index.ts         # TypeScript type definitions
└── App.tsx              # Main app component
```

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📈 Question Topics

The application covers all major coding interview topics:

**Core Data Structures**: Array, Linked List, Stack, Queue, Hash Table, Binary Tree, Binary Search Tree, Heap, Trie, Graph

**Algorithms**: Binary Search, Depth-First Search, Breadth-First Search, Dynamic Programming, Greedy, Backtracking, Two Pointers, Sliding Window, Sorting

**Advanced Topics**: Union Find, Topological Sort, Bit Manipulation, Math, String Processing, Matrix Operations

## 💾 Data Persistence

- Progress is automatically saved to browser localStorage
- No account creation or server required
- Data persists between browser sessions
- Clear your browser data to reset progress

## 🎨 Design Philosophy

This clone focuses on:
- **Simplicity**: Clean, distraction-free interface
- **Functionality**: All essential features without bloat
- **Performance**: Fast loading and smooth interactions
- **Accessibility**: Clear visual hierarchy and intuitive navigation
- **Authenticity**: Exact questions and data from the official Grind 75 tool

## 🤝 Contributing

This is a personal project, but feedback and suggestions are welcome! If you find any issues or have ideas for improvements, please feel free to open an issue.

## 📝 License

This project is for educational purposes. The question data comes from the official Grind 75 tool and LeetCode.

## 🙏 Acknowledgments

- **Grind 75**: For creating the excellent question curation
- **LeetCode**: For hosting the coding problems
- **Blind**: For the original Blind 75 list that inspired Grind 75

## 📞 Contact

Created as part of a coding interview preparation toolkit. Happy coding! 🚀

---

*"The best time to start preparing for coding interviews was yesterday. The second best time is now."*
