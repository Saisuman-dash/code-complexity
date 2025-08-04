import React from 'react';
import { Clock, Brain, Zap, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import { ComplexityBadge } from './ComplexityBadge';
import { CodeEditor } from './CodeEditor';

interface AnalysisData {
  timeComplexity: string;
  spaceComplexity: string;
  bestCase?: string;
  averageCase?: string;
  worstCase?: string;
  canBeOptimized: boolean;
  bottleneck: string;
  optimizationStrategy: string;
  optimizedTimeComplexity?: string;
  optimizedSpaceComplexity?: string;
  optimizedCode?: string;
  reasoning: string;
  stepByStepAnalysis: string[];
  whatIsN: string;
  operationCount: string;
}

interface AnalysisResultProps {
  analysis: AnalysisData;
  language: string;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, language }) => {
  return (
    <div className="space-y-6">
      {/* Code Analysis Section */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-900/30 rounded-lg">
            <Clock className="text-blue-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">🔍 Code Analysis</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <p className="font-semibold text-gray-300 flex items-center gap-2">
              <Clock size={16} className="text-blue-400" />
              Time Complexity:
            </p>
            <ComplexityBadge complexity={analysis.timeComplexity} type="time" />
          </div>
          
          <div className="space-y-2">
            <p className="font-semibold text-gray-300 flex items-center gap-2">
              <Brain size={16} className="text-purple-400" />
              Space Complexity:
            </p>
            <ComplexityBadge complexity={analysis.spaceComplexity} type="space" />
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
              What is 'n'?
            </h4>
            <p className="text-sm text-gray-300">{analysis.whatIsN}</p>
          </div>

          <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full"></span>
              Operation Count
            </h4>
            <p className="text-sm text-gray-300">{analysis.operationCount}</p>
          </div>

          {(analysis.bestCase || analysis.averageCase || analysis.worstCase) && (
            <div className="grid md:grid-cols-3 gap-3">
              {analysis.bestCase && (
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <p className="text-xs font-medium text-green-400 mb-1">Best Case</p>
                  <ComplexityBadge complexity={analysis.bestCase} type="time" />
                </div>
              )}
              {analysis.averageCase && (
                <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <p className="text-xs font-medium text-yellow-400 mb-1">Average Case</p>
                  <ComplexityBadge complexity={analysis.averageCase} type="time" />
                </div>
              )}
              {analysis.worstCase && (
                <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                  <p className="text-xs font-medium text-red-400 mb-1">Worst Case</p>
                  <ComplexityBadge complexity={analysis.worstCase} type="time" />
                </div>
              )}
            </div>
          )}

          <div className="p-4 bg-gray-700/50 rounded-lg border border-gray-600">
            <h4 className="font-semibold text-gray-200 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-400 rounded-full"></span>
              Mathematical Reasoning
            </h4>
            <p className="text-sm text-gray-300">{analysis.reasoning}</p>
          </div>
        </div>
      </div>

      {/* Step-by-Step Analysis */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-purple-900/30 rounded-lg">
            <Brain className="text-purple-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">📝 Step-by-Step Analysis</h3>
        </div>

        <div className="space-y-3">
          {analysis.stepByStepAnalysis.map((step, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-gray-700/30 rounded-lg">
              <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-gray-300 leading-relaxed">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Optimization Assessment */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-green-900/30 rounded-lg">
            <Zap className="text-green-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-white">🚀 Optimization Assessment</h3>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-gray-300">Can be optimized:</span>
            {analysis.canBeOptimized ? (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle size={16} />
                <span className="font-medium">Yes</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-red-400">
                <XCircle size={16} />
                <span className="font-medium">No</span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-orange-500" />
              <span className="font-semibold text-gray-300">Bottleneck:</span>
            </div>
            <p className="text-gray-300 bg-orange-900/20 p-3 rounded-lg border border-orange-500/30">
              {analysis.bottleneck}
            </p>
          </div>

          {analysis.canBeOptimized && (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Zap size={16} className="text-blue-500" />
                  <span className="font-semibold text-gray-300">Optimization Strategy:</span>
                </div>
                <p className="text-gray-300 bg-blue-900/20 p-3 rounded-lg border border-blue-500/30">
                  {analysis.optimizationStrategy}
                </p>
              </div>

              {analysis.optimizedTimeComplexity && analysis.optimizedSpaceComplexity && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-semibold text-green-400">⚡ Optimized Time:</p>
                    <ComplexityBadge complexity={analysis.optimizedTimeComplexity} type="time" />
                  </div>
                  <div className="space-y-2">
                    <p className="font-semibold text-green-400">⚡ Optimized Space:</p>
                    <ComplexityBadge complexity={analysis.optimizedSpaceComplexity} type="space" />
                  </div>
                </div>
              )}

              {analysis.optimizedCode && (
                <div className="space-y-2">
                  <p className="font-semibold text-gray-300">💡 Improved Implementation:</p>
                  <CodeEditor
                    value={analysis.optimizedCode}
                    onChange={() => {}}
                    language={language}
                    readOnly={true}
                  />
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Complexity Reference */}
      <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
        <h3 className="text-xl font-bold text-white mb-4">📊 Complexity Reference</h3>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-gray-300 mb-2">Performance Hierarchy:</h4>
            <div className="flex flex-wrap gap-2">
              {['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(n³)', 'O(2ⁿ)', 'O(n!)'].map((complexity, index) => (
                <React.Fragment key={complexity}>
                  <ComplexityBadge complexity={complexity} type="time" />
                  {index < 7 && <span className="text-gray-500">{'<'}</span>}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-300 mb-2">Common Patterns:</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="space-y-1">
                <p className="text-gray-300"><strong className="text-green-400">O(1):</strong> Direct access, arithmetic operations</p>
                <p className="text-gray-300"><strong className="text-blue-400">O(log n):</strong> Binary search, balanced tree operations</p>
                <p className="text-gray-300"><strong className="text-yellow-400">O(n):</strong> Single pass through data</p>
              </div>
              <div className="space-y-1">
                <p className="text-gray-300"><strong className="text-orange-400">O(n log n):</strong> Efficient sorting algorithms</p>
                <p className="text-gray-300"><strong className="text-red-400">O(n²):</strong> Nested iterations over input</p>
                <p className="text-gray-300"><strong className="text-pink-400">O(2ⁿ):</strong> Recursive algorithms without memoization</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};