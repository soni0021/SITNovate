"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    List, Link2, GitBranch, Network, ArrowDownWideNarrow, 
    Search, Lightbulb, Sparkles, BookOpen, Code 
} from 'lucide-react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const DSARoadmapTree: React.FC = () => {
    const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
    const [topicInfo, setTopicInfo] = useState<string | null>(null);
    const [codeSnippet, setCodeSnippet] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Initialize Gemini API
    const genAI = new GoogleGenerativeAI('AIzaSyA0iHPUJ3VSl-R4hgcyxxJD7FWRdSTTfB4');

    // Fetch topic information and code snippet from Gemini API
    const fetchTopicInfo = async (topic: string) => {
        setIsLoading(true);
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });

            // Generate brief information using Gemini
            const infoPrompt = `Provide a brief explanation of ${topic} in Data Structures and Algorithms.`;
            const infoResult = await model.generateContent(infoPrompt);
            const infoText = await infoResult.response.text();
            setTopicInfo(infoText);

            // Generate code snippet using Gemini
            const codePrompt = `Provide a code snippet in Python for ${topic} in Data Structures and Algorithms.`;
            const codeResult = await model.generateContent(codePrompt);
            const codeText = await codeResult.response.text();
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

    const sections = [
        {
            title: "Arrays",
            icon: List,
            topics: [
                { name: "Introduction to Arrays" },
                { name: "Array Operations" },
                { name: "Two-pointer Technique" },
                { name: "Sliding Window Technique" },
            ]
        },
        {
            title: "Linked Lists",
            icon: Link2,
            topics: [
                { name: "Singly Linked Lists" },
                { name: "Doubly Linked Lists" },
                { name: "Circular Linked Lists" },
                { name: "Linked List Operations" },
            ]
        },
        {
            title: "Trees",
            icon: GitBranch,
            topics: [
                { name: "Binary Trees" },
                { name: "Binary Search Trees" },
                { name: "AVL Trees" },
                { name: "Tree Traversals" },
            ]
        },
        {
            title: "Graphs",
            icon: Network,
            topics: [
                { name: "Graph Representation" },
                { name: "Breadth-First Search (BFS)" },
                { name: "Depth-First Search (DFS)" },
                { name: "Shortest Path Algorithms" },
            ]
        },
        {
            title: "Sorting Algorithms",
            icon: ArrowDownWideNarrow,
            topics: [
                { name: "Bubble Sort" },
                { name: "Merge Sort" },
                { name: "Quick Sort" },
                { name: "Heap Sort" },
            ]
        },
        {
            title: "Searching Algorithms",
            icon: Search,
            topics: [
                { name: "Linear Search" },
                { name: "Binary Search" },
                { name: "Hashing" },
                { name: "Interpolation Search" },
            ]
        },
        {
            title: "Dynamic Programming",
            icon: Lightbulb,
            topics: [
                { name: "Introduction to DP" },
                { name: "Memoization" },
                { name: "Tabulation" },
                { name: "Classic DP Problems" },
            ]
        },
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
                        Data Structures & Algorithms
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Master the fundamental concepts of DSA with our comprehensive learning path
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
                                    <div className="space-y-6">
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <BookOpen className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    Concept Overview
                                                </h4>
                                            </div>
                                            <p className="text-gray-700 dark:text-gray-300">
                                                {topicInfo || "Loading information..."}
                                            </p>
                                        </motion.div>

                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.1 }}
                                            className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-6"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <Code className="h-5 w-5 text-violet-600 dark:text-violet-400" />
                                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                                    Implementation
                                                </h4>
                                            </div>
                                            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                                                <code>{codeSnippet || "Loading code example..."}</code>
                                            </pre>
                                        </motion.div>
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

export default DSARoadmapTree;