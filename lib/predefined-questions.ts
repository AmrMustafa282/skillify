export interface TestCase {
 input: string;
 expected_output: string;
 weight: number;
 description?: string;
}

export interface LanguageImplementation {
 language: string;
 starterCode: string;
 solutionCode: string;
 testCases: TestCase[];
}

export interface PredefinedQuestion {
 id: string;
 title: string;
 text: string;
 implementations: LanguageImplementation[];
 evaluationCriteria: {
  timeComplexity: string;
  spaceComplexity: string;
  constraints: string[];
 };
 gradingRules: {
  testCaseWeight: number;
  codeQualityWeight: number;
  efficiencyWeight: number;
  partialCredit: boolean;
 };
 metadata: {
  difficulty: "EASY" | "MEDIUM" | "HARD";
  estimatedDuration: number;
  tags: string[];
  companies: string[];
  topic: string;
 };
}

export const QUESTION_TOPICS = [
 "Arrays & Strings",
 "Linked Lists",
 "Trees & Graphs",
 "Dynamic Programming",
 "Sorting & Searching",
 "Hash Tables",
 "Stack & Queue",
 "Recursion & Backtracking",
 "Two Pointers",
 "Sliding Window",
 "Binary Search",
 "Greedy Algorithms",
 "Bit Manipulation",
 "Math & Geometry",
];

export const SUPPORTED_LANGUAGES = [
 "python",
 "javascript",
 "java",
 "go",
 "ruby",
 "cpp",
];

export const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
 {
  id: "two-sum",
  title: "Two Sum",
  text:
   "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n**Example 1:**\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\n**Example 2:**\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\n**Example 3:**\nInput: nums = [3,3], target = 6\nOutput: [0,1]",
  implementations: [
   {
    language: "python",
    starterCode: "def two_sum(nums, target):\n    # Your code here\n    pass",
    solutionCode:
     "def two_sum(nums, target):\n    num_map = {}\n    for i, num in enumerate(nums):\n        complement = target - num\n        if complement in num_map:\n            return [num_map[complement], i]\n        num_map[num] = i\n    return []",
    testCases: [
     {
      input: "[2,7,11,15], 9",
      expected_output: "[0,1]",
      weight: 0.3,
      description: "Basic two sum case",
     },
     {
      input: "[3,2,4], 6",
      expected_output: "[1,2]",
      weight: 0.3,
      description: "Different indices",
     },
     {
      input: "[3,3], 6",
      expected_output: "[0,1]",
      weight: 0.4,
      description: "Duplicate numbers",
     },
    ],
   },
   {
    language: "javascript",
    starterCode:
     "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n    // Your code here\n}",
    solutionCode:
     "function twoSum(nums, target) {\n    const numMap = new Map();\n    \n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (numMap.has(complement)) {\n            return [numMap.get(complement), i];\n        }\n        numMap.set(nums[i], i);\n    }\n    \n    return [];\n}",
    testCases: [
     {
      input: "[2,7,11,15], 9",
      expected_output: "[0,1]",
      weight: 0.3,
      description: "Basic two sum case",
     },
     {
      input: "[3,2,4], 6",
      expected_output: "[1,2]",
      weight: 0.3,
      description: "Different indices",
     },
     {
      input: "[3,3], 6",
      expected_output: "[0,1]",
      weight: 0.4,
      description: "Duplicate numbers",
     },
    ],
   },
   {
    language: "java",
    starterCode:
     "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{};\n    }\n}",
    solutionCode:
     "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> numMap = new HashMap<>();\n        \n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (numMap.containsKey(complement)) {\n                return new int[]{numMap.get(complement), i};\n            }\n            numMap.put(nums[i], i);\n        }\n        \n        return new int[]{};\n    }\n}",
    testCases: [
     {
      input: "[2,7,11,15], 9",
      expected_output: "[0,1]",
      weight: 0.3,
      description: "Basic two sum case",
     },
     {
      input: "[3,2,4], 6",
      expected_output: "[1,2]",
      weight: 0.3,
      description: "Different indices",
     },
     {
      input: "[3,3], 6",
      expected_output: "[0,1]",
      weight: 0.4,
      description: "Duplicate numbers",
     },
    ],
   },
   {
    language: "go",
    starterCode:
     "func twoSum(nums []int, target int) []int {\n    // Your code here\n    return []int{}\n}",
    solutionCode:
     "func twoSum(nums []int, target int) []int {\n    numMap := make(map[int]int)\n    \n    for i, num := range nums {\n        complement := target - num\n        if j, found := numMap[complement]; found {\n            return []int{j, i}\n        }\n        numMap[num] = i\n    }\n    \n    return []int{}\n}",
    testCases: [
     {
      input: "[2,7,11,15], 9",
      expected_output: "[0,1]",
      weight: 0.3,
      description: "Basic two sum case",
     },
     {
      input: "[3,2,4], 6",
      expected_output: "[1,2]",
      weight: 0.3,
      description: "Different indices",
     },
     {
      input: "[3,3], 6",
      expected_output: "[0,1]",
      weight: 0.4,
      description: "Duplicate numbers",
     },
    ],
   },
   {
    language: "ruby",
    starterCode: "def two_sum(nums, target)\n    # Your code here\nend",
    solutionCode:
     "def two_sum(nums, target)\n    num_map = {}\n    \n    nums.each_with_index do |num, i|\n        complement = target - num\n        if num_map.key?(complement)\n            return [num_map[complement], i]\n        end\n        num_map[num] = i\n    end\n    \n    []\nend",
    testCases: [
     {
      input: "[2,7,11,15], 9",
      expected_output: "[0,1]",
      weight: 0.3,
      description: "Basic two sum case",
     },
     {
      input: "[3,2,4], 6",
      expected_output: "[1,2]",
      weight: 0.3,
      description: "Different indices",
     },
     {
      input: "[3,3], 6",
      expected_output: "[0,1]",
      weight: 0.4,
      description: "Duplicate numbers",
     },
    ],
   },
   {
    language: "cpp",
    starterCode:
     "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Your code here\n        return {};\n    }\n};",
    solutionCode:
     "class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        unordered_map<int, int> numMap;\n        \n        for (int i = 0; i < nums.size(); i++) {\n            int complement = target - nums[i];\n            if (numMap.find(complement) != numMap.end()) {\n                return {numMap[complement], i};\n            }\n            numMap[nums[i]] = i;\n        }\n        \n        return {};\n    }\n};",
    testCases: [
     {
      input: "[2,7,11,15], 9",
      expected_output: "[0,1]",
      weight: 0.3,
      description: "Basic two sum case",
     },
     {
      input: "[3,2,4], 6",
      expected_output: "[1,2]",
      weight: 0.3,
      description: "Different indices",
     },
     {
      input: "[3,3], 6",
      expected_output: "[0,1]",
      weight: 0.4,
      description: "Duplicate numbers",
     },
    ],
   },
  ],
  evaluationCriteria: {
   timeComplexity: "O(n)",
   spaceComplexity: "O(n)",
   constraints: [
    "Each input has exactly one solution",
    "Cannot use same element twice",
   ],
  },
  gradingRules: {
   testCaseWeight: 0.7,
   codeQualityWeight: 0.2,
   efficiencyWeight: 0.1,
   partialCredit: true,
  },
  metadata: {
   difficulty: "EASY",
   estimatedDuration: 15,
   tags: ["arrays", "hash-table"],
   companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
   topic: "Arrays & Strings",
  },
 },
 {
  id: "reverse-string",
  title: "Reverse a String",
  text:
   'Implement a function to reverse a string without using built-in reverse methods.\n\n**Example 1:**\nInput: s = "hello"\nOutput: "olleh"\n\n**Example 2:**\nInput: s = ""\nOutput: ""\n\n**Example 3:**\nInput: s = "racecar"\nOutput: "racecar"',
  implementations: [
   {
    language: "python",
    starterCode: "def reverse_string(s):\n    # Your code here\n    pass",
    solutionCode: "def reverse_string(s):\n    return s[::-1]",
    testCases: [
     {
      input: "hello",
      expected_output: "olleh",
      weight: 0.3,
      description: "Basic string reversal",
     },
     {
      input: "",
      expected_output: "",
      weight: 0.2,
      description: "Empty string",
     },
     {
      input: "racecar",
      expected_output: "racecar",
      weight: 0.5,
      description: "Palindrome string",
     },
    ],
   },
   {
    language: "javascript",
    starterCode:
     "/**\n * @param {string} s\n * @return {string}\n */\nfunction reverseString(s) {\n    // Your code here\n}",
    solutionCode:
     "function reverseString(s) {\n    return s.split('').reverse().join('');\n}",
    testCases: [
     {
      input: "hello",
      expected_output: "olleh",
      weight: 0.3,
      description: "Basic string reversal",
     },
     {
      input: "",
      expected_output: "",
      weight: 0.2,
      description: "Empty string",
     },
     {
      input: "racecar",
      expected_output: "racecar",
      weight: 0.5,
      description: "Palindrome string",
     },
    ],
   },
   {
    language: "java",
    starterCode:
     'class Solution {\n    public String reverseString(String s) {\n        // Your code here\n        return "";\n    }\n}',
    solutionCode:
     "class Solution {\n    public String reverseString(String s) {\n        return new StringBuilder(s).reverse().toString();\n    }\n}",
    testCases: [
     {
      input: "hello",
      expected_output: "olleh",
      weight: 0.3,
      description: "Basic string reversal",
     },
     {
      input: "",
      expected_output: "",
      weight: 0.2,
      description: "Empty string",
     },
     {
      input: "racecar",
      expected_output: "racecar",
      weight: 0.5,
      description: "Palindrome string",
     },
    ],
   },
   {
    language: "go",
    starterCode:
     'func reverseString(s string) string {\n    // Your code here\n    return ""\n}',
    solutionCode:
     "func reverseString(s string) string {\n    runes := []rune(s)\n    for i, j := 0, len(runes)-1; i < j; i, j = i+1, j-1 {\n        runes[i], runes[j] = runes[j], runes[i]\n    }\n    return string(runes)\n}",
    testCases: [
     {
      input: "hello",
      expected_output: "olleh",
      weight: 0.3,
      description: "Basic string reversal",
     },
     {
      input: "",
      expected_output: "",
      weight: 0.2,
      description: "Empty string",
     },
     {
      input: "racecar",
      expected_output: "racecar",
      weight: 0.5,
      description: "Palindrome string",
     },
    ],
   },
   {
    language: "ruby",
    starterCode: "def reverse_string(s)\n    # Your code here\nend",
    solutionCode: "def reverse_string(s)\n    s.reverse\nend",
    testCases: [
     {
      input: "hello",
      expected_output: "olleh",
      weight: 0.3,
      description: "Basic string reversal",
     },
     {
      input: "",
      expected_output: "",
      weight: 0.2,
      description: "Empty string",
     },
     {
      input: "racecar",
      expected_output: "racecar",
      weight: 0.5,
      description: "Palindrome string",
     },
    ],
   },
   {
    language: "cpp",
    starterCode:
     'class Solution {\npublic:\n    string reverseString(string s) {\n        // Your code here\n        return "";\n    }\n};',
    solutionCode:
     "class Solution {\npublic:\n    string reverseString(string s) {\n        reverse(s.begin(), s.end());\n        return s;\n    }\n};",
    testCases: [
     {
      input: "hello",
      expected_output: "olleh",
      weight: 0.3,
      description: "Basic string reversal",
     },
     {
      input: "",
      expected_output: "",
      weight: 0.2,
      description: "Empty string",
     },
     {
      input: "racecar",
      expected_output: "racecar",
      weight: 0.5,
      description: "Palindrome string",
     },
    ],
   },
  ],
  evaluationCriteria: {
   timeComplexity: "O(n)",
   spaceComplexity: "O(1)",
   constraints: ["No use of language built-in reverse functions"],
  },
  gradingRules: {
   testCaseWeight: 0.7,
   codeQualityWeight: 0.2,
   efficiencyWeight: 0.1,
   partialCredit: true,
  },
  metadata: {
   difficulty: "EASY",
   estimatedDuration: 5,
   tags: ["strings", "algorithms"],
   companies: ["Google", "Amazon", "Microsoft"],
   topic: "Arrays & Strings",
  },
 },
 {
  id: "valid-parentheses",
  title: "Valid Parentheses",
  text:
   "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n**Example 1:**\nInput: s = \"()\"\nOutput: true\n\n**Example 2:**\nInput: s = \"()[]{}\"\nOutput: true\n\n**Example 3:**\nInput: s = \"(]\"\nOutput: false",
  implementations: [
   {
    language: "python",
    starterCode: "def is_valid(s):\n    # Your code here\n    pass",
    solutionCode:
     "def is_valid(s):\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    \n    for char in s:\n        if char in mapping:\n            if not stack or stack.pop() != mapping[char]:\n                return False\n        else:\n            stack.append(char)\n    \n    return not stack",
    testCases: [
     {
      input: "()",
      expected_output: "True",
      weight: 0.2,
      description: "Simple valid parentheses",
     },
     {
      input: "()[]{}",
      expected_output: "True",
      weight: 0.3,
      description: "Multiple types of valid parentheses",
     },
     {
      input: "(]",
      expected_output: "False",
      weight: 0.2,
      description: "Mismatched parentheses",
     },
     {
      input: "([)]",
      expected_output: "False",
      weight: 0.3,
      description: "Incorrectly nested parentheses",
     },
    ],
   },
   {
    language: "javascript",
    starterCode:
     "/**\n * @param {string} s\n * @return {boolean}\n */\nfunction isValid(s) {\n    // Your code here\n}",
    solutionCode:
     "function isValid(s) {\n    const stack = [];\n    const mapping = {')': '(', '}': '{', ']': '['};\n    \n    for (let char of s) {\n        if (char in mapping) {\n            if (stack.length === 0 || stack.pop() !== mapping[char]) {\n                return false;\n            }\n        } else {\n            stack.push(char);\n        }\n    }\n    \n    return stack.length === 0;\n}",
    testCases: [
     {
      input: "()",
      expected_output: "true",
      weight: 0.2,
      description: "Simple valid parentheses",
     },
     {
      input: "()[]{}",
      expected_output: "true",
      weight: 0.3,
      description: "Multiple types of valid parentheses",
     },
     {
      input: "(]",
      expected_output: "false",
      weight: 0.2,
      description: "Mismatched parentheses",
     },
     {
      input: "([)]",
      expected_output: "false",
      weight: 0.3,
      description: "Incorrectly nested parentheses",
     },
    ],
   },
   {
    language: "java",
    starterCode:
     "class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n}",
    solutionCode:
     "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> mapping = new HashMap<>();\n        mapping.put(')', '(');\n        mapping.put('}', '{');\n        mapping.put(']', '[');\n        \n        for (char c : s.toCharArray()) {\n            if (mapping.containsKey(c)) {\n                if (stack.isEmpty() || stack.pop() != mapping.get(c)) {\n                    return false;\n                }\n            } else {\n                stack.push(c);\n            }\n        }\n        \n        return stack.isEmpty();\n    }\n}",
    testCases: [
     {
      input: "()",
      expected_output: "true",
      weight: 0.2,
      description: "Simple valid parentheses",
     },
     {
      input: "()[]{}",
      expected_output: "true",
      weight: 0.3,
      description: "Multiple types of valid parentheses",
     },
     {
      input: "(]",
      expected_output: "false",
      weight: 0.2,
      description: "Mismatched parentheses",
     },
     {
      input: "([)]",
      expected_output: "false",
      weight: 0.3,
      description: "Incorrectly nested parentheses",
     },
    ],
   },
   {
    language: "go",
    starterCode:
     "func isValid(s string) bool {\n    // Your code here\n    return false\n}",
    solutionCode:
     "func isValid(s string) bool {\n    stack := []rune{}\n    mapping := map[rune]rune{')': '(', '}': '{', ']': '['}\n    \n    for _, char := range s {\n        if opening, found := mapping[char]; found {\n            if len(stack) == 0 || stack[len(stack)-1] != opening {\n                return false\n            }\n            stack = stack[:len(stack)-1]\n        } else {\n            stack = append(stack, char)\n        }\n    }\n    \n    return len(stack) == 0\n}",
    testCases: [
     { input: "()", expected_output: "true", weight: 0.2, description: "Simple valid parentheses" },
     { input: "()[]{}", expected_output: "true", weight: 0.3, description: "Multiple types of valid parentheses" },
     { input: "(]", expected_output: "false", weight: 0.2, description: "Mismatched parentheses" },
     { input: "([)]", expected_output: "false", weight: 0.3, description: "Incorrectly nested parentheses" },
    ],
   },
   {
    language: "ruby",
    starterCode:
     "def is_valid(s)\n    # Your code here\nend",
    solutionCode:
     "def is_valid(s)\n    stack = []\n    mapping = {')' => '(', '}' => '{', ']' => '['}\n    \n    s.each_char do |char|\n        if mapping.key?(char)\n            return false if stack.empty? || stack.pop != mapping[char]\n        else\n            stack.push(char)\n        end\n    end\n    \n    stack.empty?\nend",
    testCases: [
     { input: "()", expected_output: "true", weight: 0.2, description: "Simple valid parentheses" },
     { input: "()[]{}", expected_output: "true", weight: 0.3, description: "Multiple types of valid parentheses" },
     { input: "(]", expected_output: "false", weight: 0.2, description: "Mismatched parentheses" },
     { input: "([)]", expected_output: "false", weight: 0.3, description: "Incorrectly nested parentheses" },
    ],
   },
   {
    language: "cpp",
    starterCode:
     "class Solution {\npublic:\n    bool isValid(string s) {\n        // Your code here\n        return false;\n    }\n};",
    solutionCode:
     "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};\n        \n        for (char c : s) {\n            if (mapping.find(c) != mapping.end()) {\n                if (st.empty() || st.top() != mapping[c]) {\n                    return false;\n                }\n                st.pop();\n            } else {\n                st.push(c);\n            }\n        }\n        \n        return st.empty();\n    }\n};",
    testCases: [
     { input: "()", expected_output: "true", weight: 0.2, description: "Simple valid parentheses" },
     { input: "()[]{}", expected_output: "true", weight: 0.3, description: "Multiple types of valid parentheses" },
     { input: "(]", expected_output: "false", weight: 0.2, description: "Mismatched parentheses" },
     { input: "([)]", expected_output: "false", weight: 0.3, description: "Incorrectly nested parentheses" },
    ],
   },
  ],
  evaluationCriteria: {
   timeComplexity: "O(n)",
   spaceComplexity: "O(n)",
   constraints: [
    "Only contains parentheses characters",
    "Must handle all bracket types",
   ],
  },
  gradingRules: {
   testCaseWeight: 0.8,
   codeQualityWeight: 0.1,
   efficiencyWeight: 0.1,
   partialCredit: true,
  },
  metadata: {
   difficulty: "EASY",
   estimatedDuration: 15,
   tags: ["stack", "string"],
   companies: ["Google", "Amazon", "Microsoft", "Facebook"],
   topic: "Stack & Queue",
  },
 },
];

// Helper functions
export const getQuestionsByTopic = (topic: string): PredefinedQuestion[] => {
 return PREDEFINED_QUESTIONS.filter((q) => q.metadata.topic === topic);
};

export const getQuestionsByCompany = (
 company: string
): PredefinedQuestion[] => {
 return PREDEFINED_QUESTIONS.filter((q) =>
  q.metadata.companies.includes(company)
 );
};

export const getQuestionsByDifficulty = (
 difficulty: string
): PredefinedQuestion[] => {
 return PREDEFINED_QUESTIONS.filter(
  (q) => q.metadata.difficulty === difficulty.toUpperCase()
 );
};

export const searchQuestions = (query: string): PredefinedQuestion[] => {
 const lowercaseQuery = query.toLowerCase();
 return PREDEFINED_QUESTIONS.filter(
  (q) =>
   q.title.toLowerCase().includes(lowercaseQuery) ||
   q.metadata.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
   q.metadata.companies.some((company) =>
    company.toLowerCase().includes(lowercaseQuery)
   ) ||
   q.metadata.topic.toLowerCase().includes(lowercaseQuery)
 );
};

export const getImplementationByLanguage = (
 question: PredefinedQuestion,
 language: string
): LanguageImplementation | undefined => {
 return question.implementations.find((impl) => impl.language === language);
};

export const getImplementationForLanguage = (
 question: PredefinedQuestion,
 language: string
): LanguageImplementation | undefined => {
 return question.implementations.find((impl) => impl.language === language);
};

export const getTestCasesForLanguage = (
 question: PredefinedQuestion,
 language: string
): TestCase[] => {
 const implementation = getImplementationForLanguage(question, language);
 return implementation ? implementation.testCases : [];
};

export const getStarterCodeForLanguage = (
 question: PredefinedQuestion,
 language: string
): string => {
 const implementation = getImplementationForLanguage(question, language);
 return implementation ? implementation.starterCode : "";
};

export const getSolutionCodeForLanguage = (
 question: PredefinedQuestion,
 language: string
): string => {
 const implementation = getImplementationForLanguage(question, language);
 return implementation ? implementation.solutionCode : "";
};


// 1. Arrays & Strings (15)
// Two Sum

// Rotate Array

// Container With Most Water

// Trapping Rain Water

// Maximum Subarray (Kadane's Algorithm)

// Merge Intervals

// Product of Array Except Self

// Longest Substring Without Repeating Characters

// Valid Parentheses

// Group Anagrams

// Longest Palindromic Substring

// Minimum Window Substring

// Sliding Window Maximum

// Find All Anagrams in a String

// String Compression

// 2. Linked Lists (10)
// Reverse a Linked List

// Merge Two Sorted Lists

// Linked List Cycle Detection

// Add Two Numbers (LL Representation)

// Intersection of Two Linked Lists

// Remove Nth Node From End

// Palindrome Linked List

// Flatten a Multilevel Doubly LL

// LRU Cache (LinkedHashMap)

// Copy List with Random Pointer

// 3. Trees & Graphs (20)
// Binary Tree Level Order Traversal

// Invert Binary Tree

// Validate BST

// Lowest Common Ancestor (LCA)

// Serialize/Deserialize Binary Tree

// Binary Tree Path Sum

// Diameter of Binary Tree

// Construct Binary Tree from Preorder+Inorder

// Word Search (Backtracking)

// Number of Islands (DFS/BFS)

// Course Schedule (Topological Sort)

// Graph Valid Tree (Union-Find)

// Alien Dictionary (Topological Sort)

// Clone Graph

// Pacific Atlantic Water Flow

// Sudoku Solver (Backtracking)

// Word Ladder (BFS)

// Trie (Prefix Tree) Implementation

// Kruskal's/Prim's (MST Algorithms)

// Dijkstra's Shortest Path

// 4. Dynamic Programming (15)
// Fibonacci Sequence

// Climbing Stairs

// Coin Change

// Longest Increasing Subsequence (LIS)

// Longest Common Subsequence (LCS)

// Edit Distance

// Word Break

// Knapsack Problem

// House Robber

// Maximum Product Subarray

// Decode Ways

// Unique Paths (Grid DP)

// Burst Balloons

// Regular Expression Matching

// Best Time to Buy/Sell Stock (All Variations)

// 5. Sorting & Searching (10)
// Merge Sort

// Quick Sort

// Kth Largest Element

// Search in Rotated Sorted Array

// Find Peak Element

// Count Inversions

// Top K Frequent Elements

// Meeting Rooms I/II

// Median of Two Sorted Arrays

// Find First/Last Position in Sorted Array

// 6. Hash Tables & Heaps (10)
// Subarray Sum Equals K

// Design HashMap (Collision Handling)

// Insert/Delete/GetRandom O(1)

// Top K Frequent Words

// Task Scheduler

// Merge K Sorted Lists (Heap)

// Find Median from Data Stream

// LFU Cache

// Design Twitter (Feeds)

// Time-Based Key-Value Store

// 7. Bit Manipulation (5)
// Single Number

// Number of 1 Bits

// Reverse Bits

// Subsets (Bitmasking)

// Sum of Two Integers (No +)

// 8. Math & Geometry (10)
// Pow(x, n)

// Rotate Image

// Spiral Matrix

// Rectangle Overlap

// Random Pick with Weight

// Happy Number

// GCD/LCM

// Count Primes (Sieve of Eratosthenes)

// Convex Hull

// Line Reflection

// 9. System Design & OOP (5)
// Design Parking Lot

// Design TinyURL

// Design Elevator System

// Blackjack Simulator (OOP)

// Thread-Safe Singleton

// Bonus: Problem-Solving Techniques
// Two Pointers (Sliding Window, Fast/Slow)

// Backtracking (N-Queens, Permutations)

// Greedy Algorithms (Activity Selection)

// Divide & Conquer (Karatsuba Multiplication)

// Union-Find (Disjoint Set)

// How to Use This List
// Priority Order: Start with Arrays, Strings, and Linked Lists (FAANG favorites).

// Pattern Recognition: Many problems reuse the same techniques (e.g., DFS for Trees).

// Company-Specific Focus:

// Google: Heavy on Graphs/DP (Dijkstra, Knapsack).

// Amazon: Arrays + System Design (LRU Cache).

// Meta: Recursion + Trees (Serialize/Deserialize).
