"use client"; // Ensure this directive is at the top

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, Code, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import Debugger from "../../components/debugger"; 

// JSON data
const data = {
  questions: [
    {
      subtopic: "Arrays",
      questions: [
        { name: "Reverse the array", link: "https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/" },
        { name: "Find the maximum and minimum element in an array", link: "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/" },
        // Add more questions here
        {
            "name": "Reverse the array",
            "link": "https://www.geeksforgeeks.org/write-a-program-to-reverse-an-array-or-string/"
          },
          {
            "name": "Find the maximum and minimum element in an array",
            "link": "https://www.geeksforgeeks.org/maximum-and-minimum-in-an-array/"
          },
          {
            "name": "Find the \"Kth\" max and min element of an array",
            "link": "https://practice.geeksforgeeks.org/problems/kth-smallest-element5635/1"
          },
          {
            "name": "Given an array which consists of only 0, 1 and 2. Sort the array without using any sorting algo",
            "link": "https://practice.geeksforgeeks.org/problems/sort-an-array-of-0s-1s-and-2s4231/1"
          },
          {
            "name": "Move all the negative elements to one side of the array",
            "link": "https://www.geeksforgeeks.org/move-negative-numbers-beginning-positive-end-constant-extra-space/"
          },
          {
            "name": "Find the Union and Intersection of the two sorted arrays.",
            "link": "https://practice.geeksforgeeks.org/problems/union-of-two-arrays3538/1"
          },
          {
            "name": "Write a program to cyclically rotate an array by one.",
            "link": "https://practice.geeksforgeeks.org/problems/cyclically-rotate-an-array-by-one2614/1"
          },
          {
            "name": "Find Largest sum contiguous Subarray [V. IMP]",
            "link": "https://practice.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1"
          },
          {
            "name": "Minimise the maximum difference between heights [V.IMP]",
            "link": "https://practice.geeksforgeeks.org/problems/minimize-the-heights3351/1"
          },
          {
            "name": "Minimum no. of Jumps to reach end of an array",
            "link": "https://practice.geeksforgeeks.org/problems/minimum-number-of-jumps-1587115620/1"
          },
          {
            "name": "Find duplicate in an array of N+1 Integers",
            "link": "https://leetcode.com/problems/find-the-duplicate-number/"
          },
          {
            "name": "Merge 2 sorted arrays without using Extra space.",
            "link": "https://practice.geeksforgeeks.org/problems/merge-two-sorted-arrays5135/1"
          },
          {
            "name": "Kadane's Algo [V.V.V.V.V IMP]",
            "link": "https://practice.geeksforgeeks.org/problems/kadanes-algorithm-1587115620/1"
          },
          {
            "name": "Merge Intervals",
            "link": "https://leetcode.com/problems/merge-intervals/"
          },
          {
            "name": "Next Permutation",
            "link": "https://leetcode.com/problems/next-permutation/"
          },
          {
            "name": "Count Inversion",
            "link": "https://practice.geeksforgeeks.org/problems/inversion-of-array-1587115620/1"
          },
          {
            "name": "Best time to buy and Sell stock",
            "link": "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/"
          },
          {
            "name": "Find all pairs on integer array whose sum is equal to given number",
            "link": "https://practice.geeksforgeeks.org/problems/count-pairs-with-given-sum5022/1"
          },
          {
            "name": "Median of 2 sorted arrays of different size",
            "link": "https://www.geeksforgeeks.org/median-of-two-sorted-arrays-of-different-sizes/"
          },
          {
            "name": "Median of 2 sorted arrays of equal size",
            "link": "https://practice.geeksforgeeks.org/problems/find-the-median0527/1"
          },
          {
            "name": "Find common elements In 3 sorted arrays",
            "link": "https://practice.geeksforgeeks.org/problems/common-elements1132/1"
          },
          {
            "name": "Rearrange the array in alternating positive and negative items with O(1) extra space",
            "link": "https://www.geeksforgeeks.org/rearrange-array-alternating-positive-negative-items-o1-extra-space/"
          },
          {
            "name": "Find if there is any subarray with sum equal to 0",
            "link": "https://practice.geeksforgeeks.org/problems/subarray-with-0-sum-1587115621/1"
          },
          {
            "name": "Find factorial of a large number",
            "link": "https://practice.geeksforgeeks.org/problems/factorials-of-large-numbers2508/1"
          },
          {
            "name": "find maximum product subarray",
            "link": "https://practice.geeksforgeeks.org/problems/maximum-product-subarray3604/1"
          },
          {
            "name": "Find longest consecutive subsequence",
            "link": "https://practice.geeksforgeeks.org/problems/longest-consecutive-subsequence2449/1"
          },
          {
            "name": "Given an array of size n and a number k, find all elements that appear more than \"n/k\" times.",
            "link": "https://www.geeksforgeeks.org/given-an-array-of-of-size-n-finds-all-the-elements-that-appear-more-than-nk-times/"
          },
          {
            "name": "Maximum profit by buying and selling a share at most twice",
            "link": "https://www.geeksforgeeks.org/maximum-profit-by-buying-and-selling-a-share-at-most-twice/"
          },
          {
            "name": "Find whether an array is a subset of another array",
            "link": "https://practice.geeksforgeeks.org/problems/array-subset-of-another-array2317/1"
          },
          {
            "name": "Find the triplet that sum to a given value",
            "link": "https://practice.geeksforgeeks.org/problems/triplet-sum-in-array-1587115621/1"
          },
          {
            "name": "Trapping Rain water problem",
            "link": "https://practice.geeksforgeeks.org/problems/trapping-rain-water-1587115621/1"
          },
          {
            "name": "Chocolate Distribution problem",
            "link": "https://practice.geeksforgeeks.org/problems/chocolate-distribution-problem3825/1"
          },
          {
            "name": "Smallest Subarray with sum greater than a given value",
            "link": "https://practice.geeksforgeeks.org/problems/smallest-subarray-with-sum-greater-than-x5651/1"
          },
          {
            "name": "Three way partitioning of an array around a given value",
            "link": "https://practice.geeksforgeeks.org/problems/three-way-partitioning/1"
          },
          {
            "name": "Minimum swaps required bring elements less equal K together",
            "link": "https://practice.geeksforgeeks.org/problems/minimum-swaps-required-to-bring-all-elements-less-than-or-equal-to-k-together4847/1"
          },
          {
            "name": "Minimum no. of operations required to make an array palindrome",
            "link": "https://practice.geeksforgeeks.org/problems/palindromic-array-1587115620/1"
          }
      ],
    },
    {
      subtopic: "Matrix",
      questions: [
        { name: "Spiral traversal on a Matrix", link: "https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1" },
        {
            "name": "Spiral traversal on a Matrix",
            "link": "https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1"
          },
          {
            "name": "Search an element in a matrix",
            "link": "https://leetcode.com/problems/search-a-2d-matrix/"
          },
          {
            "name": "Find median in a row wise sorted matrix",
            "link": "https://practice.geeksforgeeks.org/problems/median-in-a-row-wise-sorted-matrix1527/1"
          },
          {
            "name": "Find row with maximum no. of 1's",
            "link": "https://practice.geeksforgeeks.org/problems/row-with-max-1s0023/1"
          },
          {
            "name": "Print elements in sorted order using row-column wise sorted matrix",
            "link": "https://practice.geeksforgeeks.org/problems/sorted-matrix2333/1"
          },
          {
            "name": "Maximum size rectangle",
            "link": "https://practice.geeksforgeeks.org/problems/max-rectangle/1"
          },
          {
            "name": "Find a specific pair in matrix",
            "link": "https://www.geeksforgeeks.org/find-a-specific-pair-in-matrix/"
          },
          {
            "name": "Rotate matrix by 90 degrees",
            "link": "https://www.geeksforgeeks.org/rotate-a-matrix-by-90-degree-in-clockwise-direction-without-using-any-extra-space/"
          },
          {
            "name": "Kth smallest element in a row-column wise sorted matrix",
            "link": "https://practice.geeksforgeeks.org/problems/kth-element-in-matrix/1"
          },
          {
            "name": "Common elements in all rows of a given matrix",
            "link": "https://www.geeksforgeeks.org/common-elements-in-all-rows-of-a-given-matrix/"
          }
      ],
    },
    // Add more subtopics here
    {
        subtopic: "string",
        questions: [
          { name: "Spiral traversal on a Matrix", link: "https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1" },
          {
            "name": "Reverse a String",
            "link": "https://leetcode.com/problems/reverse-string/"
          },
          {
            "name": "Check whether a String is Palindrome or not",
            "link": "https://practice.geeksforgeeks.org/problems/palindrome-string0817/1"
          },
          {
            "name": "Find Duplicate characters in a string",
            "link": "https://www.geeksforgeeks.org/print-all-the-duplicates-in-the-input-string/"
          },
          {
            "name": "Write a Code to check whether one string is a rotation of another",
            "link": "https://www.geeksforgeeks.org/a-program-to-check-if-strings-are-rotations-of-each-other/"
          },
          {
            "name": "Write a Program to check whether a string is a valid shuffle of two strings or not",
            "link": "https://www.programiz.com/java-programming/examples/check-valid-shuffle-of-strings"
          },
          {
            "name": "Count and Say problem",
            "link": "https://leetcode.com/problems/count-and-say/"
          },
          {
            "name": "Write a program to find the longest Palindrome in a string. [Longest palindromic Substring]",
            "link": "https://practice.geeksforgeeks.org/problems/longest-palindrome-in-a-string3411/1"
          },
          {
            "name": "Find Longest Recurring Subsequence in String",
            "link": "https://practice.geeksforgeeks.org/problems/longest-repeating-subsequence2004/1"
          },
          {
            "name": "Print all Subsequences of a string.",
            "link": "https://www.geeksforgeeks.org/print-subsequences-string/"
          },
          {
            "name": "Print all the permutations of the given string",
            "link": "https://practice.geeksforgeeks.org/problems/permutations-of-a-given-string2041/1"
          },
          {
            "name": "Split the Binary string into two substring with equal 0's and 1's",
            "link": "https://www.geeksforgeeks.org/split-the-binary-string-into-substrings-with-equal-number-of-0s-and-1s/"
          },
          {
            "name": "Word Wrap Problem [VERY IMP].",
            "link": "https://practice.geeksforgeeks.org/problems/word-wrap1646/1"
          },
          {
            "name": "EDIT Distance [Very Imp]",
            "link": "https://practice.geeksforgeeks.org/problems/edit-distance3702/1"
          },
          {
            "name": "Find next greater number with same set of digits. [Very Very IMP]",
            "link": "https://practice.geeksforgeeks.org/problems/next-permutation5226/1"
          },
          {
            "name": "Balanced Parenthesis problem.[Imp]",
            "link": "https://practice.geeksforgeeks.org/problems/parenthesis-checker2744/1"
          },
          {
            "name": "Word break Problem[ Very Imp]",
            "link": "https://practice.geeksforgeeks.org/problems/word-break1352/1"
          },
          {
            "name": "Rabin Karp Algo",
            "link": "https://www.geeksforgeeks.org/rabin-karp-algorithm-for-pattern-searching/"
          },
          {
            "name": "KMP Algo",
            "link": "https://practice.geeksforgeeks.org/problems/longest-prefix-suffix2527/1"
          },
          {
            "name": "Convert a Sentence into its equivalent mobile numeric keypad sequence.",
            "link": "https://www.geeksforgeeks.org/convert-sentence-equivalent-mobile-numeric-keypad-sequence/"
          },
          {
            "name": "Minimum number of bracket reversals needed to make an expression balanced.",
            "link": "https://practice.geeksforgeeks.org/problems/count-the-reversals0401/1"
          },
          {
            "name": "Count All Palindromic Subsequence in a given String.",
            "link": "https://practice.geeksforgeeks.org/problems/count-palindromic-subsequences/1"
          },
          {
            "name": "Count of number of given string in 2D character array",
            "link": "https://www.geeksforgeeks.org/find-count-number-given-string-present-2d-character-array/"
          },
          {
            "name": "Search a Word in a 2D Grid of characters.",
            "link": "https://practice.geeksforgeeks.org/problems/find-the-string-in-grid0111/1"
          },
          {
            "name": "Boyer Moore Algorithm for Pattern Searching.",
            "link": "https://www.geeksforgeeks.org/boyer-moore-algorithm-for-pattern-searching/"
          },
          {
            "name": "Converting Roman Numerals to Decimal",
            "link": "https://practice.geeksforgeeks.org/problems/roman-number-to-integer3201/1"
          },
          {
            "name": "Longest Common Prefix",
            "link": "https://leetcode.com/problems/longest-common-prefix/"
          }
        ],
      },

      {
        subtopic: "Sorting Algorithms",
        questions: [
            {
                "name": "Find first and last positions of an element in a sorted array",
                "link": "https://practice.geeksforgeeks.org/problems/first-and-last-occurrences-of-x3116/1"
              },
              {
                "name": "Find a Fixed Point (Value equal to index) in a given array",
                "link": "https://practice.geeksforgeeks.org/problems/value-equal-to-index-value1330/1"
              },
              {
                "name": "Search in a rotated sorted array",
                "link": "https://leetcode.com/problems/search-in-rotated-sorted-array/"
              },
              {
                "name": "square root of an integer",
                "link": "https://practice.geeksforgeeks.org/problems/count-squares3649/1"
              },
              {
                "name": "Maximum and minimum of an array using minimum number of comparisons",
                "link": "https://practice.geeksforgeeks.org/problems/middle-of-three2926/1"
              },
              {
                "name": "Optimum location of point to minimize total distance",
                "link": "https://www.geeksforgeeks.org/optimum-location-point-minimize-total-distance/#:~:text=We%20need%20to%20find%20a,set%20of%20points%20is%20minimum.&amp;text=In%20above%20figure%20optimum%20location,is%20minimum%20obtainable%20total%20distance."
              },
              {
                "name": "Find the repeating and the missing",
                "link": "https://practice.geeksforgeeks.org/problems/find-missing-and-repeating2512/1"
              },
              {
                "name": "find majority element",
                "link": "https://practice.geeksforgeeks.org/problems/majority-element-1587115620/1"
              },
              {
                "name": "Searching in an array where adjacent differ by at most k",
                "link": "https://www.geeksforgeeks.org/searching-array-adjacent-differ-k/"
              },
              {
                "name": "find a pair with a given difference",
                "link": "https://practice.geeksforgeeks.org/problems/find-pair-given-difference1559/1"
              },
              {
                "name": "find four elements that sum to a given value",
                "link": "https://practice.geeksforgeeks.org/problems/find-all-four-sum-numbers1732/1"
              },
              {
                "name": "maximum sum such that no 2 elements are adjacent",
                "link": "https://practice.geeksforgeeks.org/problems/stickler-theif-1587115621/1"
              },
              {
                "name": "Count triplet with sum smaller than a given value",
                "link": "https://practice.geeksforgeeks.org/problems/count-triplets-with-sum-smaller-than-x5549/1"
              },
              {
                "name": "merge 2 sorted arrays",
                "link": "https://practice.geeksforgeeks.org/problems/merge-two-sorted-arrays5135/1"
              }
         
        ],
      },

      {
        subtopic: "Matrix",
        questions: [
          { name: "Spiral traversal on a Matrix", link: "https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1" },
         
        ],
      },

      {
        subtopic: "Matrix",
        questions: [
          { name: "Spiral traversal on a Matrix", link: "https://practice.geeksforgeeks.org/problems/spirally-traversing-a-matrix-1587115621/1" },
         
        ],
      },
    
  ],
};

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);

  const filteredQuestions = data.questions
    .map((subtopic) => ({
      ...subtopic,
      questions: subtopic.questions.filter((question) =>
        question.name.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((subtopic) => subtopic.questions.length > 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
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
          
          <Debugger />

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Practice Problems
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Master your coding skills with our curated collection of programming challenges
          </p>
        </motion.div>

        {/* Search Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-2xl mx-auto mb-12"
        >
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for a problem..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-violet-200 rounded-xl shadow-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500 dark:bg-gray-800 dark:border-gray-700"
            />
          </div>
        </motion.div>

        {/* Topics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {filteredQuestions.map((subtopic, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <BookOpen className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {subtopic.subtopic}
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {subtopic.questions.map((question, qIndex) => (
                  <motion.div
                    key={qIndex}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-white dark:bg-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-violet-100 dark:border-violet-800"
                  >
                    <div className="flex items-start gap-3 mb-4">
                      <Code className="h-5 w-5 text-violet-600 dark:text-violet-400 mt-1" />
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {question.name}
                      </h3>
                    </div>
                    
                    <a
                      href={question.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300 group"
                    >
                      Solve Problem
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {filteredQuestions.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <div className="text-gray-600 dark:text-gray-400 text-lg">
                No questions found matching your search.
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Page;