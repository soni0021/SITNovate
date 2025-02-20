"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { FileText, MapPin, Building, DollarSign, Upload, Search, Briefcase } from 'lucide-react';

const JobFinder: React.FC = () => {
    // State for job listings, resume, and matching jobs
    const [jobs, setJobs] = useState<any[]>([]);
    const [selectedJob, setSelectedJob] = useState<any | null>(null);
    const [geminiSummary, setGeminiSummary] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [region, setRegion] = useState<string>('in'); // Default region: India
    const [resumeText, setResumeText] = useState<string>('');
    const [matchedJobs, setMatchedJobs] = useState<any[]>([]);
    const [resumeScore, setResumeScore] = useState<number | null>(null);

    // Adzuna API credentials (replace with your own)
    const ADZUNA_APP_ID = 'dcfdbe04';
    const ADZUNA_API_KEY = 'ad3261a2fb0609ad1b5b1ebb52d6b4b2';

    // Gemini AI setup
    const genAI = new GoogleGenerativeAI('AIzaSyA0iHPUJ3VSl-R4hgcyxxJD7FWRdSTTfB4');
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Region options
    const regions = [
        { code: 'in', name: 'India' },
        { code: 'us', name: 'United States' },
        { code: 'gb', name: 'United Kingdom' },
        { code: 'ca', name: 'Canada' },
        { code: 'au', name: 'Australia' },
    ];

    // Fetch job listings from Adzuna API for the selected region
    const fetchJobs = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://api.adzuna.com/v1/api/jobs/${region}/search/1?app_id=${ADZUNA_APP_ID}&app_key=${ADZUNA_API_KEY}&results_per_page=10&what=software%20engineer`
            );
            const data = await response.json();
            if (data.results && data.results.length > 0) {
                setJobs(data.results);
            } else {
                setJobs([]);
            }
        } catch (error) {
            console.error('Error fetching jobs:', error);
            setJobs([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch job listings when region changes
    useEffect(() => {
        fetchJobs();
    }, [region]);

    // Use Gemini AI to summarize job description
    const summarizeJobDescription = async (description: string) => {
        setIsLoading(true);
        try {
            const prompt = `Summarize the following job description in 2-3 sentences:\n\n${description}`;
            const result = await model.generateContent(prompt);
            const text = await result.response.text();
            setGeminiSummary(text);
        } catch (error) {
            console.error('Error summarizing job description:', error);
            setGeminiSummary('Failed to generate summary.');
        } finally {
            setIsLoading(false);
        }
    };

    // Handle job selection
    const handleJobClick = (job: any) => {
        setSelectedJob(job);
        setGeminiSummary(null); // Reset summary when a new job is selected
        summarizeJobDescription(job.description);
    };

    // Handle region change
    const handleRegionChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRegion(event.target.value);
    };

    // Handle resume file upload
    const handleResumeUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const text = await file.text();
            setResumeText(text);
            console.log("Resume Data:", text); // Log resume data to console
            extractSkills(text);
            evaluateResume(text);
        }
    };

    // Extract skills from resume text using Gemini AI
    const extractSkills = async (text: string) => {
        setIsLoading(true);
        try {
            const prompt = `Extract technical skills from the following resume text:\n\n${text}`;
            const result = await model.generateContent(prompt);
            const skillsText = await result.response.text();
            matchJobsWithSkills(skillsText);
        } catch (error) {
            console.error('Error extracting skills:', error);
        } finally {
            setIsLoading(false);
        }
    };

    // Match jobs with extracted skills
    const matchJobsWithSkills = (skillsText: string) => {
        const skills = skillsText.toLowerCase().split(',');
        const matched = jobs.filter((job) => {
            const description = job.description.toLowerCase();
            return skills.some((skill) => description.includes(skill.trim()));
        });
        setMatchedJobs(matched);
    };

    // Evaluate resume using Gemini AI and provide a score out of 100
    const evaluateResume = async (text: string) => {
        setIsLoading(true);
        try {
            const prompt = `
                Evaluate the following resume and provide a score out of 100 based on the following criteria:
                1. **Content**: Does the resume include relevant skills, experience, and education?
                2. **Structure**: Is the resume well-organized and easy to read?
                3. **Relevance**: Is the resume tailored for software engineering roles?
                
                Provide the score in the format: "Score: X/100".

                Resume:
                ${text}
            `;
            const result = await model.generateContent(prompt);
            const response = await result.response.text();
            const scoreMatch = response.match(/Score: (\d+)\/100/); // Extract score from response
            const score = scoreMatch ? parseInt(scoreMatch[1], 10) : null;
            setResumeScore(score);
        } catch (error) {
            console.error('Error evaluating resume:', error);
            setResumeScore(null);
        } finally {
            setIsLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100 via-white to-fuchsia-100 dark:from-gray-900 dark:via-gray-900 dark:to-violet-900/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        AI-Powered Job Matcher
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Upload your resume and let our AI find the perfect job matches for you
                    </p>
                </motion.div>

                {/* Controls Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col md:flex-row gap-6 mb-12"
                >
                    {/* Region Selection */}
                    <motion.div variants={itemVariants} className="flex-1">
                        <select
                            value={region}
                            onChange={handleRegionChange}
                            className="w-full p-3 rounded-xl border-2 border-violet-200 bg-white/50 backdrop-blur-sm 
                                     dark:bg-gray-800/50 dark:border-gray-700 focus:border-violet-500 focus:ring-violet-500"
                        >
                            {regions.map((region) => (
                                <option key={region.code} value={region.code}>
                                    {region.name}
                                </option>
                            ))}
                        </select>
                    </motion.div>

                    {/* Resume Upload */}
                    <motion.div variants={itemVariants} className="flex-1">
                        <label
                            htmlFor="resume-upload"
                            className="flex items-center justify-center gap-2 p-3 rounded-xl border-2 border-dashed
                                     border-violet-200 bg-white/50 backdrop-blur-sm cursor-pointer transition-all
                                     hover:border-violet-400 dark:bg-gray-800/50 dark:border-gray-700"
                        >
                            <Upload className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                            <span className="text-gray-700 dark:text-gray-300">Upload Resume</span>
                        </label>
                        <input
                            type="file"
                            id="resume-upload"
                            accept=".pdf,.txt"
                            onChange={handleResumeUpload}
                            className="hidden"
                        />
                    </motion.div>
                </motion.div>

                {/* Resume Score */}
                {resumeScore !== null && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6 mb-12"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/50">
                                <FileText className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Resume Score: {resumeScore}/100
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300">
                                    {resumeScore >= 70
                                        ? "Great job! Your resume is well-optimized."
                                        : "Your resume could use some improvements. Consider adding more details and skills."}
                                </p>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Job Listings and Details */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Job Listings */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-5"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                {matchedJobs.length > 0 ? 'Matching Jobs' : 'Available Jobs'}
                            </h2>
                            {isLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    >
                                        <Search className="h-8 w-8 text-violet-600 dark:text-violet-400" />
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {(matchedJobs.length > 0 ? matchedJobs : jobs).map((job, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.02 }}
                                            onClick={() => handleJobClick(job)}
                                            className={`p-4 rounded-xl cursor-pointer transition-all ${
                                                selectedJob?.id === job.id
                                                    ? 'bg-violet-100 dark:bg-violet-900/50'
                                                    : 'bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50'
                                            }`}
                                        >
                                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                                                {job.title}
                                            </h3>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-300">
                                                <div className="flex items-center gap-1">
                                                    <Building className="h-4 w-4" />
                                                    {job.company.display_name}
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <MapPin className="h-4 w-4" />
                                                    {job.location.display_name}
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>

                    {/* Job Details */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:col-span-7"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6">
                            {selectedJob ? (
                                <motion.div variants={itemVariants}>
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/50">
                                            <Briefcase className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                                        </div>
                                        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {selectedJob.title}
                                        </h2>
                                    </div>

                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Company</p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {selectedJob.company.display_name}
                                                </p>
                                            </div>
                                            <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-700/50">
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Location</p>
                                                <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    {selectedJob.location.display_name}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="prose dark:prose-invert max-w-none">
                                            <h3 className="text-xl font-semibold mb-4">Description</h3>
                                            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                                {selectedJob.description}
                                            </div>
                                        </div>

                                        {geminiSummary && (
                                            <div className="bg-violet-50 dark:bg-violet-900/20 rounded-xl p-6">
                                                <h3 className="text-xl font-semibold mb-4">AI Summary</h3>
                                                <p className="text-gray-700 dark:text-gray-300">
                                                    {geminiSummary}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                                    <Briefcase className="h-12 w-12 mb-4" />
                                    <p>Select a job to view details</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default JobFinder;