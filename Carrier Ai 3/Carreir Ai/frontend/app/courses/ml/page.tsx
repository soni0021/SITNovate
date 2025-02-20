"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    BookOpen, Code, Brain, Wrench, Bot, LineChart, GraduationCap, 
    Users, ChevronRight, Sparkles, Library, Network 
} from 'lucide-react';

const AIRoadmapTree: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [topicInfo, setTopicInfo] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [expandedSection, setExpandedSection] = useState<string | null>(null);

    // Fetch topic information from Wikipedia API
    const fetchTopicInfo = async (topic: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(topic)}`
            );
            const data = await response.json();
            if (data.extract) {
                setTopicInfo(data.extract);
            } else {
                setTopicInfo("No information found for this topic.");
            }
        } catch (error) {
            console.error("Error fetching topic information:", error);
            setTopicInfo("Failed to fetch information. Please try again later.");
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

    const sections = [
        {
            id: "intro",
            title: "Introduction to AI",
            icon: Brain,
            topics: [
                { name: "Definition of AI" },
                { name: "Overview of the roadmap" }
            ]
        },
        {
            id: "foundation",
            title: "Foundational Knowledge",
            icon: Library,
            topics: [
                { name: "Linear Algebra" },
                { name: "Calculus" },
                { name: "Probability" },
                { name: "Statistics" },
                { name: "Python Programming" },
                { name: "R Programming" }
            ]
        },
        // ... Add other sections similarly
    ];

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
                        Machine Learning & AI
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Begin your journey into Artificial Intelligence with our comprehensive learning path
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Side: Topics */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="lg:w-2/5"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6">
                            {sections.map((section) => (
                                <motion.div
                                    key={section.id}
                                    variants={itemVariants}
                                    className="mb-8 last:mb-0"
                                >
                                    <motion.button
                                        onClick={() => setExpandedSection(
                                            expandedSection === section.id ? null : section.id
                                        )}
                                        className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-600/50 transition-colors duration-200"
                                    >
                                        <div className="flex items-center gap-3">
                                            <section.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {section.title}
                                            </h2>
                                        </div>
                                        <motion.div
                                            animate={{ rotate: expandedSection === section.id ? 90 : 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <ChevronRight className="h-5 w-5 text-gray-500" />
                                        </motion.div>
                                    </motion.button>

                                    <motion.div
                                        initial={false}
                                        animate={{ 
                                            height: expandedSection === section.id ? "auto" : 0,
                                            opacity: expandedSection === section.id ? 1 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="ml-9 space-y-3 pt-3">
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
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="lg:w-3/5"
                    >
                        <div className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6 h-full">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-64">
                                    <motion.div
                                        animate={{ 
                                            rotate: 360,
                                            scale: [1, 1.2, 1],
                                        }}
                                        transition={{ 
                                            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                                            scale: { duration: 1, repeat: Infinity }
                                        }}
                                    >
                                        <Sparkles className="w-12 h-12 text-violet-600 dark:text-violet-400" />
                                    </motion.div>
                                </div>
                            ) : selectedTopic ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6"
                                >
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {selectedTopic}
                                    </h3>
                                    <div className="prose dark:prose-invert max-w-none">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
                                        >
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {topicInfo || "Loading information..."}
                                            </p>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            ) : (
                                <div className="flex flex-col items-center justify-center h-64 text-gray-500 dark:text-gray-400">
                                    <Brain className="w-12 h-12 mb-4" />
                                    <p>Select a topic to learn more</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default AIRoadmapTree;