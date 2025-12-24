import { NextRequest, NextResponse } from 'next/server';
import { MOCK_CANDIDATES } from '@/lib/mockData';
import { parseJobDescription, scoreCandidates } from '@/lib/logic';
import { FilterCriteria } from '@/types';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { jobDescription, filters } = body as {
            jobDescription: string;
            filters: FilterCriteria;
        };

        // Validate input
        if (!jobDescription || typeof jobDescription !== 'string') {
            return NextResponse.json(
                { error: 'Job description is required' },
                { status: 400 }
            );
        }

        // Parse the job description
        const parsedJD = parseJobDescription(jobDescription);

        // Score and rank candidates
        const rankedCandidates = scoreCandidates(
            MOCK_CANDIDATES,
            parsedJD,
            filters
        );

        // Return results
        return NextResponse.json({
            parsedJD,
            rankedCandidates
        });

    } catch (error) {
        console.error('Error processing job:', error);
        return NextResponse.json(
            { error: 'Failed to process job description' },
            { status: 500 }
        );
    }
}
