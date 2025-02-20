"use client"; // Ensure this directive is at the top

import React from "react";
import { motion } from "framer-motion";
import { Book, Code, Brain, Smartphone, Database, ChartBar } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Course {
  id: number;
  name: string;
  description: string;
  path: string;
  icon: React.ElementType;
  color: string;
}

const courses: Course[] = [
  { 
    id: 1, 
    name: "Web Development", 
    description: "Master modern web development with HTML, CSS, JavaScript, React, and Node.js. Build responsive and dynamic web applications.", 
    path: "/courses/webdev",
    icon: Code,
    color: "from-blue-600 to-cyan-500"
  },
  { 
    id: 2, 
    name: "Data Structures & Algorithms", 
    description: "Deep dive into DSA concepts, problem-solving techniques, and interview preparation with hands-on coding practice.", 
    path: "/courses/dsa",
    icon: Brain,
    color: "from-violet-600 to-purple-500"
  },
  { 
    id: 3, 
    name: "App Development", 
    description: "Create stunning mobile applications for iOS and Android using React Native and Flutter frameworks.", 
    path: "/courses/appdev",
    icon: Smartphone,
    color: "from-green-600 to-emerald-500"
  },
  { 
    id: 4, 
    name: "Machine Learning", 
    description: "Explore ML algorithms, neural networks, and AI concepts. Build intelligent systems with Python and TensorFlow.", 
    path: "/courses/ml",
    icon: Brain,
    color: "from-red-600 to-pink-500"
  },
  { 
    id: 5, 
    name: "Data Science", 
    description: "Learn data analysis, visualization, and statistical modeling. Master Python, Pandas, and Jupyter notebooks.", 
    path: "/courses/datascience",
    icon: Database,
    color: "from-yellow-600 to-orange-500"
  },
  { 
    id: 6, 
    name: "Data Analytics", 
    description: "Master data visualization, reporting, and business intelligence tools. Learn SQL, Tableau, and Power BI.", 
    path: "/courses/dataanalytics",
    icon: ChartBar,
    color: "from-indigo-600 to-blue-500"
  },
];

const CourseCard: React.FC<{ course: Course; index: number }> = ({ course: courseData, index }) => {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="w-full"
    >
      <div 
        className="h-full cursor-pointer group"
        onClick={() => router.push(courseData.path)}
      >
        <div className={`relative h-full w-full bg-gradient-to-r ${courseData.color} p-1 rounded-2xl overflow-hidden`}>
          <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          
          <div className="h-full bg-gray-900 p-6 rounded-xl">
            <div className="flex items-center gap-3 mb-4">
              <courseData.icon className="h-6 w-6 text-white" />
              <h2 className="font-bold text-xl text-white">{courseData.name}</h2>
            </div>
            
            <p className="font-normal text-base text-gray-300 mb-6 h-24">
              {courseData.description}
            </p>

            <div className="flex items-center justify-between">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition-colors duration-300"
              >
                Explore Course
              </motion.button>
              
              <motion.div
                initial={{ scale: 1 }}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="h-8 w-8 rounded-full bg-white/5 flex items-center justify-center"
              >
                <courseData.icon className="h-4 w-4 text-white" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Courses: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-violet-100 via-white to-fuchsia-100 dark:from-gray-900 dark:via-gray-900 dark:to-violet-900/20 py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          Our Courses
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Explore our comprehensive collection of courses designed to help you master the skills needed for your dream career.
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Courses;
