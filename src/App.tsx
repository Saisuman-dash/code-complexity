import React, { useState } from 'react';
import { Code2, Zap, Brain, BookOpen } from 'lucide-react';
import { CodeEditor } from './components/CodeEditor';
import { AnalysisResult } from './components/AnalysisResult';
import { analyzeCode } from './utils/codeAnalyzer';

const EXAMPLE_CODES = {
  JavaScript: `// Example: Two Sum Problem (Brute Force)
function twoSum(nums, target) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[i] + nums[j] === target) {
        return [i, j];
      }
    }
  }
  return [];
}`,
  Python: `# Example: Fibonacci with Recursion
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)`,
  Java: `// Example: Linear Search
public static int linearSearch(int[] arr, int target) {
    for (int i = 0; i < arr.length; i++) {
        if (arr[i] == target) {
            return i;
        }
    }
    return -1;
}`,
  'C++': `// Example: Bubble Sort
void bubbleSort(vector<int>& arr) {
    int n = arr.size();
    for (int i = 0; i < n - 1; i++) {
        for (int j = 0; j < n - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                swap(arr[j], arr[j + 1]);
            }
        }
    }
}`
};

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('JavaScript');
  const [analysis, setAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    if (!code.trim()) return;
    
    setIsAnalyzing(true);
    // Simulate analysis delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const result = analyzeCode(code, language);
    setAnalysis(result);
    setIsAnalyzing(false);
  };

  const loadExample = () => {
    setCode(EXAMPLE_CODES[language as keyof typeof EXAMPLE_CODES] || '');
    setAnalysis(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
                <Code2 className="text-white" size={28} />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Code Complexity Analyzer</h1>
                <p className="text-gray-300">Algorithmic efficiency assessment & optimization</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Brain size={16} />
                <span>Powered by Advanced Analysis</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="space-y-6">
            <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Code2 size={20} className="text-blue-400" />
                  Code Input
                </h2>
                <div className="flex items-center gap-3">
                  <select
                    value={language}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                      setAnalysis(null);
                    }}
                    className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="JavaScript">JavaScript</option>
                    <option value="Python">Python</option>
                    <option value="Java">Java</option>
                    <option value="C++">C++</option>
                  </select>
                  <button
                    onClick={loadExample}
                    className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-200 rounded-lg transition-colors duration-200 flex items-center gap-2 border border-gray-600"
                  >
                    <BookOpen size={14} />
                    Load Example
                  </button>
                </div>
              </div>
              
              <CodeEditor
                value={code}
                onChange={setCode}
                language={language}
                placeholder={`Enter your ${language} code here for analysis...`}
              />
              
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleAnalyze}
                  disabled={!code.trim() || isAnalyzing}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Zap size={18} />
                      Analyze Complexity
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-xl p-6 border border-gray-600">
              <h3 className="font-semibold text-blue-400 mb-3">💡 Analysis Tips</h3>
              <ul className="text-sm text-gray-300 space-y-1">
                <li>• Include complete functions for best analysis</li>
                <li>• The analyzer detects common patterns like loops, recursion, and sorting</li>
                <li>• Try the examples to see different complexity scenarios</li>
                <li>• Optimization suggestions are provided when improvements are possible</li>
              </ul>
            </div>
          </div>

          {/* Results Section */}
          <div>
            {analysis ? (
              <AnalysisResult analysis={analysis} language={language} />
            ) : (
              <div className="bg-gray-800 rounded-xl shadow-lg p-12 border border-gray-700 text-center">
                <div className="p-4 bg-gray-700 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Brain className="text-gray-400" size={32} />
                </div>
                <h3 className="text-lg font-semibold text-gray-300 mb-2">Ready to Analyze</h3>
                <p className="text-gray-400">
                  Enter your code and click "Analyze Complexity" to get detailed performance insights and optimization recommendations.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-400">
            <p className="text-sm">
              Built with React & TypeScript • Algorithmic Analysis Tool • 
              <span className="ml-2 text-blue-400 font-medium">Performance Optimization Made Simple</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;