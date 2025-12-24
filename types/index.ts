export interface Candidate {
  id: string;
  name: string;
  skills: string[];
  experience: number;
  location: string;
  salaryExpectation: number;
  resumeText: string;
}

export interface JobDescriptionData {
  rawText: string;
  extractedSkills: string[];
  minExperience: number;
  location: string;
  maxSalary: number;
}

export interface FilterCriteria {
  minExperience: number;
  location: string;
  maxSalary: number;
}

export interface ScoredCandidate extends Candidate {
  score: number;
  matchDetails: {
    matchedSkills: string[];
    missingSkills: string[];
  };
}
