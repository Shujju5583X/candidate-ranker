# Candidate AI Ranker 🎯

An intelligent candidate ranking system built with Next.js that matches job descriptions with candidates using AI-powered algorithms. The system automatically extracts skills, experience requirements, and other criteria from job descriptions to score and rank candidates.

![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?logo=tailwindcss)

## ✨ Features

- **Intelligent Job Description Parsing**: Automatically extracts skills, experience, location, and salary from job descriptions
- **Smart Candidate Ranking**: Scores candidates based on skill match (60%) and experience (40%)
- **Real-time Results**: Instant candidate ranking with detailed match analysis
- **Beautiful UI**: Modern, gradient-based design with responsive layout
- **Skill Match Visualization**: Green badges for matched skills, red for missing skills
- **Indian Market Ready**: Salary displayed in Indian Rupees (₹) with LPA format
- **Demo Mode**: Loads sample results on first visit to showcase functionality

## 🚀 Tech Stack

- **Framework**: [Next.js 16.1](https://nextjs.org/) with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Custom React components
- **API Routes**: Next.js API routes for backend processing

## 📋 Prerequisites

- Node.js 18.x or higher
- npm, yarn, pnpm, or bun

## 🛠️ Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd candidate-ranker
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open in browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
candidate-ranker/
├── app/
│   ├── api/
│   │   └── process-job/
│   │       └── route.ts          # API endpoint for job processing
│   ├── globals.css               # Global styles and Tailwind config
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main application page
├── lib/
│   ├── logic.ts                  # Core business logic (parsing & scoring)
│   └── mockData.ts               # Mock candidate data
├── types/
│   └── index.ts                  # TypeScript type definitions
└── README.md                     # This file
```

## 🎯 How It Works

### 1. Job Description Parsing

The system uses keyword matching to extract:

- **Skills**: Matches against 40+ tech keywords (React, Python, Node.js, etc.)
- **Experience**: RegEx patterns to find years of experience required
- **Location**: Extracts location or remote/hybrid preferences
- **Salary**: Identifies maximum salary from various formats

### 2. Candidate Scoring Algorithm

```
Total Score (0-100) = Skill Match Score (60%) + Experience Score (40%)

Skill Match Score = (Matched Skills / Total JD Skills) × 60
Experience Score = min(Candidate Exp / Required Exp, 1.0) × 40
```

### 3. Filtering

Candidates are filtered based on:

- Minimum experience requirement
- Location (if specified)
- Maximum salary expectation

## 💡 Usage

### Basic Workflow

1. **Enter Job Description**: Paste a job description in the textarea

   ```
   Example:
   We are looking for a Senior React Developer with 5+ years of experience.
   Must have strong skills in TypeScript, Next.js, and Node.js.
   Location: Remote
   Salary: ₹12,00,000 LPA
   ```

2. **Set Filters** (Optional):
   - Minimum Experience: `5` years
   - Location: `Remote`
   - Maximum Salary: `12000000` (₹1.2 Cr)

3. **Click "Analyze & Rank"**: Get instant results with ranked candidates

### Understanding Results

- **Match Score**: Percentage match (0-100%)
- **Green Pills**: Skills the candidate has that match the JD
- **Red Pills**: Skills from JD that the candidate is missing
- **Salary**: Displayed in ₹ Lakhs Per Annum (LPA)

## 🎨 Customization

### Adding More Candidates

Edit `lib/mockData.ts` to add/modify candidates:

```typescript
export const MOCK_CANDIDATES: Candidate[] = [
  {
    id: '6',
    name: 'Your Name',
    skills: ['React', 'TypeScript'],
    experience: 4,
    location: 'Mumbai',
    salaryExpectation: 8000000, // ₹80 LPA
    resumeText: 'Your resume text...'
  }
];
```

### Adding More Tech Keywords

Edit `lib/logic.ts` to expand the keyword list:

```typescript
const TECH_KEYWORDS = [
  'React', 'Next.js', 'Node.js',
  // Add your keywords here
  'YourTech', 'AnotherFramework'
];
```

### Adjusting Scoring Weights

Modify the scoring algorithm in `lib/logic.ts`:

```typescript
// Current: 60% skills, 40% experience
const skillScore = skillMatchRatio * 60;
const expScore = expRatio * 40;

// Example: 70% skills, 30% experience
const skillScore = skillMatchRatio * 70;
const expScore = expRatio * 30;
```

## 🧪 API Reference

### POST `/api/process-job`

**Request Body:**

```json
{
  "jobDescription": "Looking for a React Developer with 5 years experience...",
  "filters": {
    "minExperience": 3,
    "location": "Remote",
    "maxSalary": 10000000
  }
}
```

**Response:**

```json
{
  "parsedJD": {
    "rawText": "...",
    "extractedSkills": ["React", "TypeScript"],
    "minExperience": 5,
    "location": "Remote",
    "maxSalary": 10000000
  },
  "rankedCandidates": [
    {
      "id": "1",
      "name": "Sarah Johnson",
      "skills": ["React", "TypeScript", "Next.js"],
      "experience": 5,
      "location": "San Francisco",
      "salaryExpectation": 9600000,
      "score": 85,
      "matchDetails": {
        "matchedSkills": ["React", "TypeScript"],
        "missingSkills": []
      }
    }
  ]
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import repository in [Vercel](https://vercel.com)
3. Deploy with one click

### Other Platforms

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ for better recruitment**
