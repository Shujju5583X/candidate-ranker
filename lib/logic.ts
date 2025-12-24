import { Candidate, JobDescriptionData, FilterCriteria, ScoredCandidate } from '@/types';

// Common tech keywords for skill extraction
const TECH_KEYWORDS = [
    'React', 'Next.js', 'Node.js', 'TypeScript', 'JavaScript', 'Java',
    'Python', 'Django', 'FastAPI', 'Spring Boot', 'Express',
    'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Redis',
    'GraphQL', 'REST API', 'Docker', 'Kubernetes', 'AWS', 'Azure', 'GCP',
    'HTML', 'CSS', 'Tailwind CSS', 'Bootstrap',
    'Vue.js', 'Angular', 'Svelte',
    'Git', 'CI/CD', 'Jenkins', 'Microservices', 'Kafka',
    'Testing', 'Jest', 'Cypress', 'Selenium',
    'Agile', 'Scrum', 'Figma', 'UI/UX'
];

/**
 * Parses job description text to extract skills, experience, location, and salary
 * Uses keyword matching for skills and regex patterns for numeric values
 */
export function parseJobDescription(text: string): JobDescriptionData {
    const lowerText = text.toLowerCase();

    // Extract skills by checking for tech keywords
    const extractedSkills: string[] = [];
    TECH_KEYWORDS.forEach(keyword => {
        if (lowerText.includes(keyword.toLowerCase())) {
            extractedSkills.push(keyword);
        }
    });

    // Extract minimum experience using regex
    // Looks for patterns like "5 years", "5+ years", "minimum 5 years"
    let minExperience = 0;
    const expPatterns = [
        /(\d+)\s*\+?\s*years?/i,
        /minimum\s+(\d+)\s*years?/i,
        /at least\s+(\d+)\s*years?/i,
        /(\d+)\s*years?\s+experience/i
    ];

    for (const pattern of expPatterns) {
        const match = text.match(pattern);
        if (match) {
            minExperience = parseInt(match[1], 10);
            break;
        }
    }

    // Extract location (simple approach - look for common city names or "remote")
    let location = '';
    const locationPatterns = [
        /location[:\s]+([A-Za-z\s]+)/i,
        /based in[:\s]+([A-Za-z\s]+)/i,
        /(remote|hybrid|on-?site)/i
    ];

    for (const pattern of locationPatterns) {
        const match = text.match(pattern);
        if (match) {
            location = match[1].trim();
            break;
        }
    }

    // Extract max salary
    // Looks for patterns like "$120k", "$120,000", "120000"
    let maxSalary = 0;
    const salaryPatterns = [
        /\$?\s*(\d{1,3}),?(\d{3}),?(\d{3})/,  // $120,000
        /\$?\s*(\d{1,3})k/i,                   // 120k
        /salary[:\s]+\$?(\d+)/i                // salary: 120000
    ];

    for (const pattern of salaryPatterns) {
        const match = text.match(pattern);
        if (match) {
            if (pattern.source.includes('k')) {
                maxSalary = parseInt(match[1], 10) * 1000;
            } else if (match[2] && match[3]) {
                maxSalary = parseInt(match[1] + match[2] + match[3], 10);
            } else {
                maxSalary = parseInt(match[1], 10);
            }
            break;
        }
    }

    return {
        rawText: text,
        extractedSkills,
        minExperience,
        location,
        maxSalary
    };
}

/**
 * Scores and ranks candidates based on job description and filters
 * Returns sorted array of candidates with scores and match details
 */
export function scoreCandidates(
    candidates: Candidate[],
    jd: JobDescriptionData,
    filters: FilterCriteria
): ScoredCandidate[] {
    // Filter candidates based on criteria
    const filteredCandidates = candidates.filter(candidate => {
        // Experience filter
        if (candidate.experience < filters.minExperience) {
            return false;
        }

        // Location filter (if specified, must match - case insensitive)
        if (filters.location && filters.location.trim() !== '') {
            const candidateLoc = candidate.location.toLowerCase();
            const filterLoc = filters.location.toLowerCase();
            if (!candidateLoc.includes(filterLoc) && !filterLoc.includes('remote')) {
                return false;
            }
        }

        // Salary filter
        if (filters.maxSalary > 0 && candidate.salaryExpectation > filters.maxSalary) {
            return false;
        }

        return true;
    });

    // Score each candidate
    const scoredCandidates: ScoredCandidate[] = filteredCandidates.map(candidate => {
        // Calculate skill match
        const jdSkillsLower = jd.extractedSkills.map(s => s.toLowerCase());
        const candidateSkillsLower = candidate.skills.map(s => s.toLowerCase());

        const matchedSkills: string[] = [];
        const missingSkills: string[] = [];

        jd.extractedSkills.forEach(jdSkill => {
            const isMatched = candidateSkillsLower.includes(jdSkill.toLowerCase());
            if (isMatched) {
                // Find the original case version from candidate skills
                const originalSkill = candidate.skills.find(
                    cs => cs.toLowerCase() === jdSkill.toLowerCase()
                ) || jdSkill;
                matchedSkills.push(originalSkill);
            } else {
                missingSkills.push(jdSkill);
            }
        });

        // Calculate skill match score (60% weight)
        const skillMatchRatio = jd.extractedSkills.length > 0
            ? matchedSkills.length / jd.extractedSkills.length
            : 0;
        const skillScore = skillMatchRatio * 60;

        // Calculate experience score (40% weight)
        // Cap at 1.0 so over-qualified candidates don't break the scale
        const expRatio = jd.minExperience > 0
            ? Math.min(candidate.experience / jd.minExperience, 1.0)
            : 1.0;
        const expScore = expRatio * 40;

        // Total score (0-100)
        const totalScore = Math.round(skillScore + expScore);

        return {
            ...candidate,
            score: totalScore,
            matchDetails: {
                matchedSkills,
                missingSkills
            }
        };
    });

    // Sort by score (descending)
    return scoredCandidates.sort((a, b) => b.score - a.score);
}
