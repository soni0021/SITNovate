"use client";
import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const CareerGuidance: React.FC = () => {
  const [resumeText, setResumeText] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [response, setResponse] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const GEMINI_API_KEY = 'AIzaSyB38blA0g6z8YssQdHG6OrNff_QfDpP2hw'; // Replace with your Gemini API key

  const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const text = await file.text();
      console.log('Resume Text:', text); // Debugging
      setResumeText(text);
    }
  };

  const handleSubmit = async () => {
    if (!resumeText || !question) {
      alert('Please upload a resume and enter a question.');
      return;
    }

    setIsLoading(true);
    try {
      const prompt = `Here is the user's resume:\n${resumeText}\n\nUser's question: ${question}`;
      console.log('Prompt:', prompt); // Debugging
      const result = await model.generateContent(prompt);
      const responseText = await result.response.text();
      console.log('Response:', responseText); // Debugging
      setResponse(responseText);
    } catch (error) {
      console.error('Error generating response:', error);
      setResponse('Failed to generate a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-purple-50 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Career Guidance with Gemini AI
        </h1>

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Upload Your Resume (PDF or Text)
          </label>
          <input
            type="file"
            accept=".pdf,.txt"
            onChange={handleFileUpload}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">
            Ask a Question About Your Career
          </label>
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="e.g., What skills should I highlight for a software engineering role?"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-300"
        >
          {isLoading ? 'Processing...' : 'Get Career Advice'}
        </button>

        {response && (
          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Gemini's Response:</h2>
            <p className="text-gray-700 whitespace-pre-wrap">{response}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerGuidance;