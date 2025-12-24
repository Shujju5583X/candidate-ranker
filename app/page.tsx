'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Users, Briefcase } from 'lucide-react';
import { FilterCriteria, JobDescriptionData, ScoredCandidate } from '@/types';

export default function Home() {
  const [jobDescription, setJobDescription] = useState('');
  const [filters, setFilters] = useState<FilterCriteria>({
    minExperience: 0,
    location: '',
    maxSalary: 0
  });
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<{
    parsedJD: JobDescriptionData | null;
    rankedCandidates: ScoredCandidate[];
  }>({
    parsedJD: {
      rawText: 'Sample Job Description: Looking for a React Developer with 3+ years experience in TypeScript and Next.js',
      extractedSkills: ['React', 'TypeScript', 'Next.js'],
      minExperience: 3,
      location: 'Remote',
      maxSalary: 10000000
    },
    rankedCandidates: []
  });

  // Load initial sample results on mount
  useEffect(() => {
    const loadInitialResults = async () => {
      try {
        const response = await fetch('/api/process-job', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jobDescription: 'Looking for a React Developer with 3+ years experience in TypeScript and Next.js. Location: Remote',
            filters: {
              minExperience: 0,
              location: '',
              maxSalary: 0
            }
          })
        });

        if (response.ok) {
          const data = await response.json();
          setResults(data);
        }
      } catch (error) {
        console.error('Error loading initial results:', error);
      }
    };

    loadInitialResults();
  }, []);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert('Please enter a job description');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/process-job', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          jobDescription,
          filters
        })
      });

      if (!response.ok) {
        throw new Error('Failed to process job description');
      }

      const data = await response.json();
      setResults(data);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to analyze candidates. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Candidate AI Ranker
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Intelligent candidate matching powered by AI algorithms
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
              </div>

              <textarea
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                placeholder="Paste the job description here... Include required skills, years of experience, location, and salary range."
                className="w-full h-64 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
              />
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Filters</h2>

              <div className="space-y-4">
                <div>
                  <label htmlFor="minExp" className="block text-sm font-medium text-gray-700 mb-2">
                    Minimum Experience (years)
                  </label>
                  <input
                    id="minExp"
                    type="number"
                    min="0"
                    value={filters.minExperience}
                    onChange={(e) => setFilters({ ...filters, minExperience: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    id="location"
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="e.g., San Francisco, Remote"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>

                <div>
                  <label htmlFor="maxSalary" className="block text-sm font-medium text-gray-700 mb-2">
                    Maximum Salary (₹)
                  </label>
                  <input
                    id="maxSalary"
                    type="number"
                    min="0"
                    value={filters.maxSalary}
                    onChange={(e) => setFilters({ ...filters, maxSalary: parseInt(e.target.value) || 0 })}
                    placeholder="e.g., 10000000 (1 Cr)"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-gray-900"
                  />
                </div>
              </div>

              <button
                onClick={handleAnalyze}
                disabled={loading}
                className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="w-5 h-5" />
                    Analyze & Rank
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column - Results */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 min-h-[600px]">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Ranked Candidates</h2>

              {results.rankedCandidates.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-96 text-gray-400">
                  <Users className="w-16 h-16 mb-4 opacity-50" />
                  <p className="text-lg">Waiting for input...</p>
                  <p className="text-sm mt-2">Enter a job description and click "Analyze & Rank"</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Parsed JD Info */}
                  {results.parsedJD && (
                    <div className="bg-indigo-50 rounded-lg p-4 mb-6 border border-indigo-100">
                      <h3 className="text-sm font-semibold text-indigo-900 mb-2">Extracted Requirements</h3>
                      <div className="text-sm text-indigo-700 space-y-1">
                        <p><strong>Skills:</strong> {results.parsedJD.extractedSkills.join(', ') || 'None detected'}</p>
                        <p><strong>Min Experience:</strong> {results.parsedJD.minExperience} years</p>
                        {results.parsedJD.location && <p><strong>Location:</strong> {results.parsedJD.location}</p>}
                        {results.parsedJD.maxSalary > 0 && <p><strong>Max Salary:</strong> ₹{(results.parsedJD.maxSalary / 100000).toFixed(1)} LPA</p>}
                      </div>
                    </div>
                  )}

                  {/* Candidate Cards */}
                  {results.rankedCandidates.map((candidate, index) => (
                    <div
                      key={candidate.id}
                      className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200 bg-gradient-to-br from-white to-gray-50"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold">
                              {index + 1}
                            </span>
                            <h3 className="text-lg font-semibold text-gray-900">{candidate.name}</h3>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{candidate.experience} years experience • {candidate.location}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                            {candidate.score}%
                          </div>
                          <p className="text-xs text-gray-500">Match Score</p>
                        </div>
                      </div>

                      {/* Matched Skills */}
                      {candidate.matchDetails.matchedSkills.length > 0 && (
                        <div className="mb-3">
                          <p className="text-xs font-medium text-gray-600 mb-2">Matched Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.matchDetails.matchedSkills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full border border-green-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Missing Skills */}
                      {candidate.matchDetails.missingSkills.length > 0 && (
                        <div>
                          <p className="text-xs font-medium text-gray-600 mb-2">Missing Skills:</p>
                          <div className="flex flex-wrap gap-2">
                            {candidate.matchDetails.missingSkills.map((skill) => (
                              <span
                                key={skill}
                                className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full border border-red-200"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Salary */}
                      <div className="mt-3 pt-3 border-t border-gray-200">
                        <p className="text-xs text-gray-600">
                          Salary Expectation: <span className="font-semibold text-gray-800">₹{(candidate.salaryExpectation / 100000).toFixed(1)} LPA</span>
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
