# NeetCode Problem Sets - Dataset Documentation

## Overview
The NeetCode dataset has been split into separate JSON files for easier management and consumption.

## File Structure

```
blind169/
├── neetcode_75.json      # All 827 problems (master dataset)
├── blind75.json          # 75 Blind 75 problems
├── neetcode150.json      # 150 NeetCode 150 problems
└── neetcode250.json      # 250 NeetCode 250 problems
```

## Dataset Statistics

| Dataset | Total | Easy | Medium | Hard |
|---------|-------|------|--------|------|
| **All Problems** | 827 | 198 | 508 | 121 |
| **Blind 75** | 75 | 19 | 49 | 7 |
| **NeetCode 150** | 150 | 28 | 101 | 21 |
| **NeetCode 250** | 250 | 60 | 155 | 35 |

## JSON Structure

Each problem in the JSON files has the following structure:

```json
{
  "problem": "Two Sum",
  "pattern": "Arrays & Hashing",
  "link": "two-sum/",
  "video": "KLlXCFG5TnA",
  "difficulty": "Easy",
  "code": "0001-two-sum",
  "neetcode150": true,
  "blind75": true,
  "neetcode250": true,
  "ncLink": "two-integer-sum/",
  "premium": false
}
```

### Field Descriptions

- **problem**: Problem title
- **pattern**: Problem category/pattern (e.g., "Arrays & Hashing", "Trees", etc.)
- **link**: LeetCode problem URL path
- **video**: YouTube video ID (can be used to construct full URL: `https://www.youtube.com/watch?v=${video}`)
- **difficulty**: "Easy", "Medium", or "Hard"
- **code**: Problem identifier code (e.g., "0001-two-sum")
- **neetcode150**: Boolean flag (true if in NeetCode 150)
- **blind75**: Boolean flag (true if in Blind 75)
- **neetcode250**: Boolean flag (true if in NeetCode 250)
- **ncLink**: NeetCode-specific problem URL path
- **premium**: Boolean flag (true if requires LeetCode premium)

## TypeScript Integration

The datasets are imported and transformed in `src/data/neetcode_75.ts`:

```typescript
import { 
  blind75Problems, 
  neetcode150Problems, 
  neetcode250Problems,
  neetcode75Problems,
  getNeetcodeDatasetByType,
  getNeetcodeStatistics
} from './src/data/neetcode_75';

// Get specific dataset
const blind75 = getNeetcodeDatasetByType('blind75');

// Get statistics
const stats = getNeetcodeStatistics();
```

## Top Problem Patterns

1. Arrays & Hashing (133 problems)
2. Trees (72 problems)
3. Greedy (66 problems)
4. Math & Geometry (56 problems)
5. Graphs (56 problems)
6. 2-D Dynamic Programming (49 problems)
7. 1-D Dynamic Programming (46 problems)
8. Sliding Window (38 problems)
9. Two Pointers (37 problems)
10. Stack (35 problems)

## Usage Examples

### Node.js
```javascript
const blind75 = require('./blind75.json');
console.log(`Loaded ${blind75.length} Blind 75 problems`);
```

### TypeScript/React
```typescript
import blind75Data from './blind75.json';
import { blind75Problems } from './src/data/neetcode_75';

// Use the transformed data with TypeScript types
const problems = blind75Problems.problems;
```

## Notes

- All JSON files are valid and properly formatted
- Problems are sorted by their code identifiers
- The master dataset (`neetcode_75.json`) contains all problems
- Individual datasets (Blind 75, NeetCode 150, NeetCode 250) are subsets
- Some problems may appear in multiple datasets (e.g., a problem can be in both Blind 75 and NeetCode 150)

