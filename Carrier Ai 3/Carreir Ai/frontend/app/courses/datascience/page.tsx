"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, LineChart, Brain, Code, Cloud, Users, BookOpen, Sparkles } from 'lucide-react';
import { Input } from "@/components/ui/input";

const DataScienceRoadmapTree: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [topicInfo, setTopicInfo] = useState<string | null>(null);
    const [codeSnippet, setCodeSnippet] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Gemini API Key (replace with your own key)
    const GEMINI_API_KEY = 'AIzaSyA0iHPUJ3VSl-R4hgcyxxJD7FWRdSTTfB4';

    // Fetch topic information and code snippet from Gemini API
    const fetchTopicInfo = async (topic: string) => {
        setIsLoading(true);
        try {
            // Generate brief information using Gemini
            const infoResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Provide a brief explanation of ${topic} in Data Science.`,
                                },
                            ],
                        },
                    ],
                }),
            });
            const infoData = await infoResponse.json();
            console.log("Info Response:", infoData); // Log the response
            const infoText = infoData.candidates[0].content.parts[0].text;
            setTopicInfo(infoText);

            // Generate code snippet using Gemini
            const codeResponse = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [
                        {
                            parts: [
                                {
                                    text: `Provide a code snippet in Python for ${topic} in Data Science.`,
                                },
                            ],
                        },
                    ],
                }),
            });
            const codeData = await codeResponse.json();
            console.log("Code Response:", codeData); // Log the response
            const codeText = codeData.candidates[0].content.parts[0].text;
            setCodeSnippet(codeText);
        } catch (error) {
            console.error("Error fetching topic information:", error);
            setTopicInfo("Failed to fetch information. Please try again later.");
            setCodeSnippet("Failed to fetch code snippet. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    // Handle topic click
    const handleTopicClick = (topic: string) => {
        setSelectedTopic(topic);
        fetchTopicInfo(topic);
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { x: -20, opacity: 0 },
        visible: {
            x: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    const cardVariants = {
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
                        Data Science Learning Path
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Master the essential skills and concepts in Data Science with our comprehensive roadmap
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side: Roadmap Tree */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:w-2/5"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6">
                            {sections.map((section, index) => (
                                <motion.div
                                    key={section.title}
                                    variants={itemVariants}
                                    className="mb-8 last:mb-0"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <section.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                            {section.title}
                                        </h2>
                                    </div>
                                    <div className="ml-9 space-y-3">
                                        {section.topics.map((topic) => (
                                            <motion.button
                                                key={topic.name}
                                                whileHover={{ x: 5 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={() => handleTopicClick(topic.name)}
                                                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                                                    selectedTopic === topic.name
                                                        ? 'bg-violet-100 dark:bg-violet-900/50 text-violet-900 dark:text-violet-100'
                                                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                                                }`}
                                            >
                                                {topic.name}
                                            </motion.button>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Topic Details */}
                    <motion.div
                        variants={cardVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:w-3/5"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6 h-full">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                        className="w-12 h-12"
                                    >
                                        <Sparkles className="w-12 h-12 text-violet-600 dark:text-violet-400" />
                                    </motion.div>
                                </div>
                            ) : selectedTopic ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                                        {selectedTopic}
                                    </h3>
                                    <div className="prose dark:prose-invert max-w-none">
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6 mb-6">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                Overview
                                            </h4>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {topicInfo || "Loading information..."}
                                            </p>
                                        </div>
                                        
                                        <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6">
                                            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                                Example Code
                                            </h4>
                                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                                <code>{codeSnippet || "Loading code example..."}</code>
                                            </pre>
                                        </div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                                    <BookOpen className="w-12 h-12 mb-4" />
                                    <p>Select a topic to view details</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

// Define sections data
const sections = [
    {
        title: "Data Preprocessing",
        icon: Database,
        topics: [
            { name: "Data Cleaning" },
            { name: "Data Transformation" },
            { name: "Feature Scaling" },
            { name: "Handling Missing Data" },
        ]
    },
    // ... add other sections similarly
];

export default DataScienceRoadmapTree;