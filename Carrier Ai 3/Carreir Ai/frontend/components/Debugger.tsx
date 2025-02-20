import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Debugger = () => {
  const [code, setCode] = useState("");
  const [debugResult, setDebugResult] = useState("");

  const handleDebug = async () => {
    try {
      const response = await fetch(
        `https://api.example.com/debug?key=AIzaSyB38blA0g6z8YssQdHG6OrNff_QfDpP2hw`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ code }),
        }
      );

      const data = await response.json();
      setDebugResult(data.result || "No issues found.");
    } catch (error) {
      setDebugResult("An error occurred while debugging.");
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-lg backdrop-blur-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
        Code Debugger
      </h2>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Paste your code here..."
        className="w-full p-4 mb-4 border-2 border-violet-200 rounded-xl shadow-sm focus:border-violet-500 focus:ring-2 focus:ring-violet-500 dark:bg-gray-800 dark:border-gray-700"
        rows={10}
      />
      <Button
        onClick={handleDebug}
        className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white rounded-lg hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300"
      >
        Debug Code
      </Button>
      {debugResult && (
        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Debug Result:
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{debugResult}</p>
        </div>
      )}
    </div>
  );
};

export default Debugger;