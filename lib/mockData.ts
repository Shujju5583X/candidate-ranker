import { Candidate } from '@/types';

export const MOCK_CANDIDATES: Candidate[] = [
    {
        id: '1',
        name: 'Sarah Johnson',
        skills: ['React', 'TypeScript', 'Next.js', 'Node.js', 'GraphQL', 'PostgreSQL'],
        experience: 5,
        location: 'San Francisco',
        salaryExpectation: 9600000, // ₹96 LPA
        resumeText: 'Senior Frontend Developer with 5 years of experience building scalable web applications using React, TypeScript, and Next.js. Strong background in Node.js backend development and GraphQL APIs.'
    },
    {
        id: '2',
        name: 'Michael Chen',
        skills: ['Python', 'Django', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
        experience: 7,
        location: 'New York',
        salaryExpectation: 12000000, // ₹1.2 Cr
        resumeText: 'Backend engineer with 7 years of experience in Python development. Expert in Django and FastAPI frameworks, with extensive experience in cloud infrastructure and microservices architecture.'
    },
    {
        id: '3',
        name: 'Emily Rodriguez',
        skills: ['React', 'JavaScript', 'HTML', 'CSS', 'Figma', 'Tailwind CSS'],
        experience: 3,
        location: 'Austin',
        salaryExpectation: 6800000, // ₹68 LPA
        resumeText: 'Frontend developer with 3 years of experience creating responsive and accessible web interfaces. Proficient in React and modern CSS frameworks, with a strong eye for design.'
    },
    {
        id: '4',
        name: 'David Kumar',
        skills: ['Node.js', 'Express', 'MongoDB', 'React', 'TypeScript', 'Docker', 'Kubernetes'],
        experience: 6,
        location: 'Seattle',
        salaryExpectation: 10800000, // ₹1.08 Cr
        resumeText: 'Full-stack engineer with 6 years of experience. Specialized in Node.js backend development and React frontend. Strong DevOps skills with Docker and Kubernetes orchestration.'
    },
    {
        id: '5',
        name: 'Jessica Taylor',
        skills: ['Java', 'Spring Boot', 'MySQL', 'Microservices', 'Kafka', 'Redis'],
        experience: 8,
        location: 'Boston',
        salaryExpectation: 12800000, // ₹1.28 Cr
        resumeText: 'Senior Backend Developer with 8 years of Java experience. Expert in Spring Boot and microservices architecture. Proven track record of building high-performance, scalable systems.'
    }
];
