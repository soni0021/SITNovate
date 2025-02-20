"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code, Blocks, Database, Cloud, Rocket, Terminal, Brain } from 'lucide-react';

const learningMaterial = [
  {
    title: "Full Stack Roadmap 2025",
    description: "A step-by-step guide to mastering Full Stack Web Development.",
    icon: Rocket,
    topics: [
      "C & C++ Fundamentals",
      "Data Structures Basics",
      "Web Development Basics (HTML, CSS, JavaScript)",
      "Basic Backend Development",
      "React & Frontend Mastery",
      "Advanced Topics & Cloud Deployment",
    ],
  },
  {
    title: "Fundamentals (1.5 Months)",
    description: "Learn the essential programming and problem-solving concepts.",
    icon: Terminal,
    topics: [
      "C & C++ Programming",
      "Number Systems (Binary, Octal, Hexadecimal)",
      "Logical Gates (AND, OR, NOT, XOR)",
      "Basic Data Structures (Arrays, LinkedLists, Stacks, Queues, HashMaps)",
      "CLI-Based Projects (Number Guessing Game, Telephone Directory, Bank Account Simulation, File Encryption)",
    ],
  },
  {
    title: "Web Development Basics (3 Months)",
    description: "Master frontend technologies and JavaScript fundamentals.",
    icon: Code,
    topics: [
      "HTML & CSS (Build 100+ Landing Pages)",
      "Git & GitHub Mastery",
      "Basic JavaScript (Variables, Functions, Control Flow, Objects, DOM APIs, Event Handling)",
      "Projects: Digital Clock, Stopwatch, Todo App, Weather App, Monkey Typing Game, Image Slider",
    ],
  },
  {
    title: "Basic Backend Development (3 Months)",
    description: "Learn server-side programming and database management.",
    icon: Database,
    topics: [
      "Introduction to Node.js & Express.js",
      "Building REST APIs, API Testing with Postman",
      "Databases: MongoDB, SQL, ORM (Prisma, Drizzle, Knex)",
      "Authentication: JWT vs Sessions",
      "Projects: CRUD App, E-Commerce API, Task Management API, Weather API Wrapper",
    ],
  },
  {
    title: "Frontend with React (2 Months)",
    description: "Deep dive into React and state management.",
    icon: Brain,
    topics: [
      "React Basics: Components, Props, Hooks, Lifecycle",
      "State Management (Redux, Zustand)",
      "Tailwind CSS & Styling",
      "React Router for Navigation",
      "Projects: Todo App, Weather App, YouTube Clone, E-Commerce Clone, Real-time Collaboration App",
    ],
  },
  {
    title: "Advanced Topics & Cloud Deployment",
    description: "Master system design, DevOps, and advanced backend concepts.",
    icon: Cloud,
    topics: [
      "Microservices & Distributed Systems",
      "Caching Strategies (Redis, CDN Integration, Partitioning)",
      "Queue Systems (RabbitMQ, Kafka, BullMQ)",
      "Cloud (AWS: EC2, S3, IAM, API Gateways, Load Balancing)",
      "Security (OAuth, JWT, CSRF Protection, XSS Prevention)",
    ],
  },
  {
    title: "Become Unstoppable!",
    description: "Refine your skills and build industry-level projects.",
    icon: Rocket,
    topics: [
      "System Design & Scalability",
      "Observability & Monitoring",
      "Fault Tolerance & Resilience",
      "Networking & WebSockets",
      "Real-time Data Processing & AI Integration",
    ],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function Page() {
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
            Full Stack Web Development
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master modern web development with our comprehensive roadmap for 2025
          </p>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {learningMaterial.map((section, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-violet-100 dark:bg-violet-900/50">
                    <section.icon className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {section.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300">
                      {section.description}
                    </p>
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  {section.topics.map((topic, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-700 dark:text-gray-300"
                    >
                      <div className="h-2 w-2 rounded-full bg-violet-500" />
                      {topic}
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.5 }}
                className="h-1 bg-gradient-to-r from-violet-600 to-fuchsia-600"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
