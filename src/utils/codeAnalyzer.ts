interface AnalysisResult {
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

export const analyzeCode = (code: string, language: string): AnalysisResult => {
  const codeLines = code.toLowerCase().split('\n');
  const cleanCode = code.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '').trim();
  
  // Initialize analysis components
  let timeComplexity = 'O(1)';
  let spaceComplexity = 'O(1)';
  let bestCase = '';
  let averageCase = '';
  let worstCase = '';
  let reasoning = '';
  let stepByStepAnalysis: string[] = [];
  let whatIsN = 'n represents the size of the input';
  let operationCount = 'Constant number of operations';
  let bottleneck = 'No significant bottlenecks detected';
  let canBeOptimized = false;
  let optimizationStrategy = 'Code is already optimal';

  // Pattern detection
  const patterns = {
    nestedLoops: detectNestedLoops(cleanCode),
    recursion: detectRecursion(cleanCode),
    sorting: detectSorting(cleanCode),
    binarySearch: detectBinarySearch(cleanCode),
    hashOperations: detectHashOperations(cleanCode),
    linearSearch: detectLinearSearch(cleanCode),
    matrixOperations: detectMatrixOperations(cleanCode),
    dynamicProgramming: detectDynamicProgramming(cleanCode)
  };

  // Analyze based on detected patterns
  if (patterns.nestedLoops.count >= 3) {
    timeComplexity = 'O(n³)';
    spaceComplexity = 'O(1)';
    bestCase = 'O(n³)';
    averageCase = 'O(n³)';
    worstCase = 'O(n³)';
    whatIsN = 'n represents the size of the input array or collection';
    operationCount = 'Approximately n³ operations due to triple nested loops';
    reasoning = 'Triple nested loops create cubic time complexity. Each element is processed n² times for each of the n elements.';
    stepByStepAnalysis = [
      '1. Outer loop runs n times',
      '2. Middle loop runs n times for each outer iteration',
      '3. Inner loop runs n times for each middle iteration',
      '4. Total operations: n × n × n = n³',
      '5. Each operation inside innermost loop is O(1)'
    ];
    bottleneck = 'Triple nested iteration causing cubic time complexity';
    canBeOptimized = true;
    optimizationStrategy = 'Consider algorithmic improvements like using hash maps, mathematical formulas, or divide-and-conquer approaches to reduce nesting levels.';
  } else if (patterns.nestedLoops.count === 2) {
    timeComplexity = 'O(n²)';
    spaceComplexity = 'O(1)';
    bestCase = 'O(n²)';
    averageCase = 'O(n²)';
    worstCase = 'O(n²)';
    whatIsN = 'n represents the size of the input array or collection';
    operationCount = 'Approximately n² operations due to nested loops';
    reasoning = 'Nested loops create quadratic time complexity. For each of the n elements in the outer loop, the inner loop processes n elements.';
    stepByStepAnalysis = [
      '1. Outer loop iterates n times',
      '2. Inner loop iterates n times for each outer iteration',
      '3. Total iterations: n × n = n²',
      '4. Each iteration performs constant time operations',
      '5. Overall complexity: O(n²)'
    ];
    bottleneck = 'Nested loops causing quadratic growth in operations';
    canBeOptimized = true;
    optimizationStrategy = 'Use hash maps for O(1) lookups, two-pointer technique, or sorting with binary search to reduce to O(n log n) or O(n).';
  } else if (patterns.recursion.isExponential) {
    timeComplexity = 'O(2ⁿ)';
    spaceComplexity = 'O(n)';
    bestCase = 'O(2ⁿ)';
    averageCase = 'O(2ⁿ)';
    worstCase = 'O(2ⁿ)';
    whatIsN = 'n represents the input parameter to the recursive function';
    operationCount = 'Approximately 2ⁿ recursive calls without memoization';
    reasoning = 'Recursive function makes multiple calls for each subproblem without memoization, leading to exponential time complexity.';
    stepByStepAnalysis = [
      '1. Each recursive call branches into 2 or more subcalls',
      '2. Recursion depth is n levels',
      '3. At level k, there are approximately 2ᵏ calls',
      '4. Total calls: 2⁰ + 2¹ + 2² + ... + 2ⁿ ≈ 2ⁿ⁺¹ - 1',
      '5. Each call performs constant work'
    ];
    bottleneck = 'Exponential recursive calls with overlapping subproblems';
    canBeOptimized = true;
    optimizationStrategy = 'Implement memoization (top-down DP) or tabulation (bottom-up DP) to cache results and reduce complexity to O(n).';
  } else if (patterns.sorting.detected) {
    timeComplexity = 'O(n log n)';
    spaceComplexity = patterns.sorting.inPlace ? 'O(log n)' : 'O(n)';
    bestCase = patterns.sorting.algorithm === 'quicksort' ? 'O(n log n)' : 'O(n log n)';
    averageCase = 'O(n log n)';
    worstCase = patterns.sorting.algorithm === 'quicksort' ? 'O(n²)' : 'O(n log n)';
    whatIsN = 'n represents the number of elements to be sorted';
    operationCount = 'Approximately n log n comparisons and swaps';
    reasoning = 'Efficient comparison-based sorting algorithms achieve O(n log n) time complexity by dividing the problem into smaller subproblems.';
    stepByStepAnalysis = [
      '1. Divide phase: Split array into log n levels',
      '2. Conquer phase: Process n elements at each level',
      '3. Total work: n elements × log n levels = n log n',
      '4. Each comparison and swap is O(1)',
      '5. Space complexity depends on recursion stack depth'
    ];
    bottleneck = 'Comparison-based sorting inherently requires O(n log n) comparisons';
    canBeOptimized = false;
    optimizationStrategy = 'O(n log n) is optimal for comparison-based sorting. Consider non-comparison sorts (counting, radix) for specific data types.';
  } else if (patterns.binarySearch.detected) {
    timeComplexity = 'O(log n)';
    spaceComplexity = patterns.binarySearch.recursive ? 'O(log n)' : 'O(1)';
    bestCase = 'O(1)';
    averageCase = 'O(log n)';
    worstCase = 'O(log n)';
    whatIsN = 'n represents the size of the sorted array being searched';
    operationCount = 'At most log₂(n) comparisons';
    reasoning = 'Binary search eliminates half of the remaining elements in each iteration, resulting in logarithmic time complexity.';
    stepByStepAnalysis = [
      '1. Start with array of size n',
      '2. Each comparison eliminates n/2 elements',
      '3. After k comparisons, n/2ᵏ elements remain',
      '4. Search completes when n/2ᵏ = 1, so k = log₂(n)',
      '5. Maximum comparisons needed: ⌈log₂(n)⌉'
    ];
    bottleneck = 'Logarithmic search is already very efficient';
    canBeOptimized = false;
    optimizationStrategy = 'Binary search is optimal for searching in sorted arrays. Consider hash tables for O(1) average-case lookups.';
  } else if (patterns.linearSearch.detected) {
    timeComplexity = 'O(n)';
    spaceComplexity = 'O(1)';
    bestCase = 'O(1)';
    averageCase = 'O(n)';
    worstCase = 'O(n)';
    whatIsN = 'n represents the number of elements in the collection';
    operationCount = 'Up to n comparisons in worst case';
    reasoning = 'Linear search examines each element sequentially until the target is found or all elements are checked.';
    stepByStepAnalysis = [
      '1. Start from first element',
      '2. Compare each element with target',
      '3. Best case: target found at first position (1 comparison)',
      '4. Average case: target found at middle position (n/2 comparisons)',
      '5. Worst case: target at end or not found (n comparisons)'
    ];
    bottleneck = 'Sequential traversal through unsorted data';
    canBeOptimized = true;
    optimizationStrategy = 'Use hash tables for O(1) average lookups, or sort the data first to enable binary search O(log n).';
  } else if (patterns.hashOperations.detected) {
    timeComplexity = 'O(n)';
    spaceComplexity = 'O(n)';
    bestCase = 'O(n)';
    averageCase = 'O(n)';
    worstCase = 'O(n)';
    whatIsN = 'n represents the number of elements processed';
    operationCount = 'n hash operations, each O(1) on average';
    reasoning = 'Hash table operations (insert, lookup, delete) are O(1) on average, with linear time for processing n elements.';
    stepByStepAnalysis = [
      '1. Process each of n elements once',
      '2. Each hash operation (insert/lookup) is O(1) average',
      '3. Total time: n × O(1) = O(n)',
      '4. Space used for hash table: O(n)',
      '5. Worst case hash collisions could degrade to O(n²)'
    ];
    bottleneck = 'Memory usage for hash table storage';
    canBeOptimized = false;
    optimizationStrategy = 'Hash table approach is typically optimal for lookup-intensive operations with good hash functions.';
  } else if (patterns.matrixOperations.detected) {
    timeComplexity = 'O(n³)';
    spaceComplexity = 'O(n²)';
    bestCase = 'O(n³)';
    averageCase = 'O(n³)';
    worstCase = 'O(n³)';
    whatIsN = 'n represents the dimension of the square matrices';
    operationCount = 'Approximately n³ multiplication and addition operations';
    reasoning = 'Standard matrix multiplication requires three nested loops to compute each element of the result matrix.';
    stepByStepAnalysis = [
      '1. Result matrix has n² elements',
      '2. Each element requires n multiplications and additions',
      '3. Total operations: n² × n = n³',
      '4. Space needed for input and output matrices: O(n²)',
      '5. Additional space for computation: O(1)'
    ];
    bottleneck = 'Cubic complexity inherent in naive matrix multiplication';
    canBeOptimized = true;
    optimizationStrategy = 'Use Strassen\'s algorithm O(n^2.807) or other advanced matrix multiplication algorithms for large matrices.';
  } else if (patterns.recursion.isLinear) {
    timeComplexity = 'O(n)';
    spaceComplexity = 'O(n)';
    bestCase = 'O(n)';
    averageCase = 'O(n)';
    worstCase = 'O(n)';
    whatIsN = 'n represents the recursion depth or input size';
    operationCount = 'n recursive calls, each doing constant work';
    reasoning = 'Linear recursion makes one recursive call per level, with recursion depth proportional to input size.';
    stepByStepAnalysis = [
      '1. Function makes one recursive call per invocation',
      '2. Recursion depth is n levels',
      '3. Each level performs constant time operations',
      '4. Total time: n × O(1) = O(n)',
      '5. Space for call stack: O(n)'
    ];
    bottleneck = 'Linear recursion depth requiring stack space';
    canBeOptimized = true;
    optimizationStrategy = 'Convert to iterative approach to reduce space complexity to O(1) while maintaining O(n) time.';
  } else if (codeLines.some(line => line.includes('for') || line.includes('while'))) {
    timeComplexity = 'O(n)';
    spaceComplexity = 'O(1)';
    bestCase = 'O(n)';
    averageCase = 'O(n)';
    worstCase = 'O(n)';
    whatIsN = 'n represents the number of iterations or input size';
    operationCount = 'n iterations with constant work per iteration';
    reasoning = 'Single loop iterates through the input once, performing constant time operations in each iteration.';
    stepByStepAnalysis = [
      '1. Loop executes n times',
      '2. Each iteration performs constant time operations',
      '3. Total time: n × O(1) = O(n)',
      '4. No additional space used beyond input',
      '5. Linear growth with input size'
    ];
    bottleneck = 'Single pass through data is generally efficient';
    canBeOptimized = false;
    optimizationStrategy = 'Single loop with constant work per iteration is typically optimal for problems requiring examination of all elements.';
  }

  // Generate optimized code examples
  let optimizedCode = '';
  let optimizedTimeComplexity = '';
  let optimizedSpaceComplexity = '';

  if (canBeOptimized) {
    if (patterns.nestedLoops.count === 2 && language === 'JavaScript') {
      optimizedCode = `// Optimized with Hash Map approach - Two Sum Problem
function twoSum(nums, target) {
  const map = new Map();
  
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  
  return [];
}

// Time: O(n) instead of O(n²)
// Space: O(n) for hash map storage`;
      optimizedTimeComplexity = 'O(n)';
      optimizedSpaceComplexity = 'O(n)';
    } else if (patterns.recursion.isExponential && language === 'JavaScript') {
      optimizedCode = `// Optimized with Memoization - Fibonacci
function fibonacci(n, memo = new Map()) {
  if (n <= 1) return n;
  if (memo.has(n)) return memo.get(n);
  
  const result = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  memo.set(n, result);
  return result;
}

// Alternative: Bottom-up Dynamic Programming
function fibonacciDP(n) {
  if (n <= 1) return n;
  
  let prev = 0, curr = 1;
  for (let i = 2; i <= n; i++) {
    [prev, curr] = [curr, prev + curr];
  }
  return curr;
}

// Time: O(n) instead of O(2ⁿ)
// Space: O(n) for memoization or O(1) for iterative`;
      optimizedTimeComplexity = 'O(n)';
      optimizedSpaceComplexity = 'O(n)';
    } else if (patterns.linearSearch.detected && language === 'JavaScript') {
      optimizedCode = `// Optimized with Hash Set for duplicate detection
function containsDuplicate(nums) {
  const seen = new Set();
  
  for (const num of nums) {
    if (seen.has(num)) return true;
    seen.add(num);
  }
  
  return false;
}

// Alternative: Sort first for space efficiency
function containsDuplicateSort(nums) {
  nums.sort((a, b) => a - b);
  
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] === nums[i - 1]) return true;
  }
  
  return false;
}

// Hash approach: Time O(n), Space O(n)
// Sort approach: Time O(n log n), Space O(1)`;
      optimizedTimeComplexity = 'O(n)';
      optimizedSpaceComplexity = 'O(n)';
    }
  }

  return {
    timeComplexity,
    spaceComplexity,
    bestCase,
    averageCase,
    worstCase,
    canBeOptimized,
    bottleneck,
    optimizationStrategy,
    optimizedTimeComplexity,
    optimizedSpaceComplexity,
    optimizedCode,
    reasoning,
    stepByStepAnalysis,
    whatIsN,
    operationCount
  };
};

// Helper functions for pattern detection
function detectNestedLoops(code: string): { count: number; depth: number } {
  const forLoops = (code.match(/for\s*\(/g) || []).length;
  const whileLoops = (code.match(/while\s*\(/g) || []).length;
  const totalLoops = forLoops + whileLoops;
  
  // Estimate nesting depth by analyzing indentation and braces
  const lines = code.split('\n');
  let maxDepth = 0;
  let currentDepth = 0;
  
  for (const line of lines) {
    if (line.includes('for') || line.includes('while')) {
      currentDepth++;
      maxDepth = Math.max(maxDepth, currentDepth);
    }
    if (line.includes('}')) {
      currentDepth = Math.max(0, currentDepth - 1);
    }
  }
  
  return { count: totalLoops, depth: maxDepth };
}

function detectRecursion(code: string): { isExponential: boolean; isLinear: boolean } {
  const hasRecursiveCall = code.includes('return') && 
    (code.match(/(\w+)\s*\([^)]*\)/g) || []).some(call => {
      const funcName = call.split('(')[0].trim();
      return code.includes(`function ${funcName}`) || code.includes(`def ${funcName}`);
    });
  
  if (!hasRecursiveCall) return { isExponential: false, isLinear: false };
  
  // Check for multiple recursive calls (exponential pattern)
  const recursiveCallCount = (code.match(/fibonacci|fib/gi) || []).length;
  const hasMultipleCalls = recursiveCallCount > 2 || 
    code.includes('fibonacci(n-1)') && code.includes('fibonacci(n-2)');
  
  return {
    isExponential: hasMultipleCalls,
    isLinear: hasRecursiveCall && !hasMultipleCalls
  };
}

function detectSorting(code: string): { detected: boolean; algorithm: string; inPlace: boolean } {
  const sortPatterns = {
    quicksort: /quicksort|quick.sort/i,
    mergesort: /mergesort|merge.sort/i,
    heapsort: /heapsort|heap.sort/i,
    bubblesort: /bubblesort|bubble.sort/i,
    insertionsort: /insertionsort|insertion.sort/i,
    selectionsort: /selectionsort|selection.sort/i,
    sort: /\.sort\(|sort\(/i
  };
  
  for (const [algorithm, pattern] of Object.entries(sortPatterns)) {
    if (pattern.test(code)) {
      const inPlace = algorithm === 'quicksort' || algorithm === 'heapsort' || 
                     algorithm === 'bubblesort' || algorithm === 'insertionsort' || 
                     algorithm === 'selectionsort';
      return { detected: true, algorithm, inPlace };
    }
  }
  
  return { detected: false, algorithm: '', inPlace: false };
}

function detectBinarySearch(code: string): { detected: boolean; recursive: boolean } {
  const binarySearchPatterns = [
    /binary.search/i,
    /binarysearch/i,
    /(left|low).*=.*0.*right|high.*=.*length/i,
    /mid.*=.*(left.*right|low.*high)/i,
    /while.*left.*right|low.*high/i
  ];
  
  const detected = binarySearchPatterns.some(pattern => pattern.test(code));
  const recursive = detected && code.includes('return') && 
    (code.includes('binarySearch') || code.includes('binary_search'));
  
  return { detected, recursive };
}

function detectHashOperations(code: string): { detected: boolean } {
  const hashPatterns = [
    /new\s+(Map|Set|HashMap|HashSet)/i,
    /\.has\(|\.get\(|\.set\(|\.add\(/i,
    /map\[|dict\[|{}/i,
    /in\s+\w+|hasOwnProperty/i
  ];
  
  const detected = hashPatterns.some(pattern => pattern.test(code));
  return { detected };
}

function detectLinearSearch(code: string): { detected: boolean } {
  const searchPatterns = [
    /for.*in.*array|for.*of.*array/i,
    /for.*i.*length.*if.*==|===.*target/i,
    /while.*i.*length.*if.*==|===.*target/i,
    /indexOf|includes|find/i
  ];
  
  const detected = searchPatterns.some(pattern => pattern.test(code)) &&
    !detectBinarySearch(code).detected;
  
  return { detected };
}

function detectMatrixOperations(code: string): { detected: boolean } {
  const matrixPatterns = [
    /matrix.*\[i\].*\[j\]/i,
    /for.*i.*for.*j.*for.*k/i,
    /\[\[.*\],.*\[.*\]\]/i,
    /matrix.*multiplication|multiply.*matrix/i
  ];
  
  const detected = matrixPatterns.some(pattern => pattern.test(code));
  return { detected };
}

function detectDynamicProgramming(code: string): { detected: boolean } {
  const dpPatterns = [
    /memo|memoization|cache/i,
    /dp\[|table\[/i,
    /dynamic.programming/i,
    /tabulation/i
  ];
  
  const detected = dpPatterns.some(pattern => pattern.test(code));
  return { detected };
}