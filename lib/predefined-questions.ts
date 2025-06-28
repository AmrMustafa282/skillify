// Enhanced predefined questions with multiple language support
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

export const SUPPORTED_LANGUAGES = ["python", "javascript", "java", "go", "ruby", "cpp"];

export const PREDEFINED_QUESTIONS: PredefinedQuestion[] = [
  {
    id: "two-sum",
    title: "Two Sum",
    text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n**Example 1:**\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\n**Example 2:**\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\n**Example 3:**\nInput: nums = [3,3], target = 6\nOutput: [0,1]",
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
      constraints: ["Each input has exactly one solution", "Cannot use same element twice"],
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
    text: 'Implement a function to reverse a string without using built-in reverse methods.\n\n**Example 1:**\nInput: s = "hello"\nOutput: "olleh"\n\n**Example 2:**\nInput: s = ""\nOutput: ""\n\n**Example 3:**\nInput: s = "racecar"\nOutput: "racecar"',
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
        solutionCode: "function reverseString(s) {\n    return s.split('').reverse().join('');\n}",
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
    text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n**Example 1:**\nInput: s = \"()\"\nOutput: true\n\n**Example 2:**\nInput: s = \"()[]{}\"\nOutput: true\n\n**Example 3:**\nInput: s = \"(]\"\nOutput: false",
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
        starterCode: "func isValid(s string) bool {\n    // Your code here\n    return false\n}",
        solutionCode:
          "func isValid(s string) bool {\n    stack := []rune{}\n    mapping := map[rune]rune{')': '(', '}': '{', ']': '['}\n    \n    for _, char := range s {\n        if opening, found := mapping[char]; found {\n            if len(stack) == 0 || stack[len(stack)-1] != opening {\n                return false\n            }\n            stack = stack[:len(stack)-1]\n        } else {\n            stack = append(stack, char)\n        }\n    }\n    \n    return len(stack) == 0\n}",
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
        language: "ruby",
        starterCode: "def is_valid(s)\n    # Your code here\nend",
        solutionCode:
          "def is_valid(s)\n    stack = []\n    mapping = {')' => '(', '}' => '{', ']' => '['}\n    \n    s.each_char do |char|\n        if mapping.key?(char)\n            return false if stack.empty? || stack.pop != mapping[char]\n        else\n            stack.push(char)\n        end\n    end\n    \n    stack.empty?\nend",
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
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    bool isValid(string s) {\n        // Your code here\n        return false;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        unordered_map<char, char> mapping = {{')', '('}, {'}', '{'}, {']', '['}};\n        \n        for (char c : s) {\n            if (mapping.find(c) != mapping.end()) {\n                if (st.empty() || st.top() != mapping[c]) {\n                    return false;\n                }\n                st.pop();\n            } else {\n                st.push(c);\n            }\n        }\n        \n        return st.empty();\n    }\n};",
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
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      constraints: ["Only contains parentheses characters", "Must handle all bracket types"],
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

  // Arrays & Strings - Easy: Contains Duplicate
  {
    id: "contains-duplicate",
    title: "Contains Duplicate",
    text: "Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.",
    implementations: [
      {
        language: "python",
        starterCode: "def contains_duplicate(nums):\n    # Your code here\n    pass",
        solutionCode: "def contains_duplicate(nums):\n    return len(nums) != len(set(nums))",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "True",
            weight: 0.25,
            description: "Array with duplicate",
          },
          {
            input: "[1,2,3,4]",
            expected_output: "False",
            weight: 0.25,
            description: "Array without duplicate",
          },
          {
            input: "[1,1,1,3,3,4,3,2,4,2]",
            expected_output: "True",
            weight: 0.25,
            description: "Multiple duplicates",
          },
          {
            input: "[]",
            expected_output: "False",
            weight: 0.25,
            description: "Empty array",
          },
        ],
      },
      {
        language: "javascript",
        starterCode: "function containsDuplicate(nums) {\n    // Your code here\n}",
        solutionCode:
          "function containsDuplicate(nums) {\n    return new Set(nums).size !== nums.length;\n}",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "true",
            weight: 0.25,
            description: "Array with duplicate",
          },
          {
            input: "[1,2,3,4]",
            expected_output: "false",
            weight: 0.25,
            description: "Array without duplicate",
          },
          {
            input: "[1,1,1,3,3,4,3,2,4,2]",
            expected_output: "true",
            weight: 0.25,
            description: "Multiple duplicates",
          },
          {
            input: "[]",
            expected_output: "false",
            weight: 0.25,
            description: "Empty array",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        // Your code here\n        return false;\n    }\n}",
        solutionCode:
          "class Solution {\n    public boolean containsDuplicate(int[] nums) {\n        Set<Integer> seen = new HashSet<>();\n        for (int num : nums) {\n            if (seen.contains(num)) {\n                return true;\n            }\n            seen.add(num);\n        }\n        return false;\n    }\n}",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "true",
            weight: 0.25,
            description: "Array with duplicate",
          },
          {
            input: "[1,2,3,4]",
            expected_output: "false",
            weight: 0.25,
            description: "Array without duplicate",
          },
          {
            input: "[1,1,1,3,3,4,3,2,4,2]",
            expected_output: "true",
            weight: 0.25,
            description: "Multiple duplicates",
          },
          {
            input: "[]",
            expected_output: "false",
            weight: 0.25,
            description: "Empty array",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func containsDuplicate(nums []int) bool {\n    // Your code here\n    return false\n}",
        solutionCode:
          "func containsDuplicate(nums []int) bool {\n    seen := make(map[int]bool)\n    for _, num := range nums {\n        if seen[num] {\n            return true\n        }\n        seen[num] = true\n    }\n    return false\n}",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "true",
            weight: 0.25,
            description: "Array with duplicate",
          },
          {
            input: "[1,2,3,4]",
            expected_output: "false",
            weight: 0.25,
            description: "Array without duplicate",
          },
          {
            input: "[1,1,1,3,3,4,3,2,4,2]",
            expected_output: "true",
            weight: 0.25,
            description: "Multiple duplicates",
          },
          {
            input: "[]",
            expected_output: "false",
            weight: 0.25,
            description: "Empty array",
          },
        ],
      },
      {
        language: "ruby",
        starterCode: "def contains_duplicate(nums)\n    # Your code here\nend",
        solutionCode: "def contains_duplicate(nums)\n    nums.length != nums.uniq.length\nend",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "true",
            weight: 0.25,
            description: "Array with duplicate",
          },
          {
            input: "[1,2,3,4]",
            expected_output: "false",
            weight: 0.25,
            description: "Array without duplicate",
          },
          {
            input: "[1,1,1,3,3,4,3,2,4,2]",
            expected_output: "true",
            weight: 0.25,
            description: "Multiple duplicates",
          },
          {
            input: "[]",
            expected_output: "false",
            weight: 0.25,
            description: "Empty array",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        // Your code here\n        return false;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    bool containsDuplicate(vector<int>& nums) {\n        unordered_set<int> seen;\n        for (int num : nums) {\n            if (seen.count(num)) {\n                return true;\n            }\n            seen.insert(num);\n        }\n        return false;\n    }\n};",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "true",
            weight: 0.25,
            description: "Array with duplicate",
          },
          {
            input: "[1,2,3,4]",
            expected_output: "false",
            weight: 0.25,
            description: "Array without duplicate",
          },
          {
            input: "[1,1,1,3,3,4,3,2,4,2]",
            expected_output: "true",
            weight: 0.25,
            description: "Multiple duplicates",
          },
          {
            input: "[]",
            expected_output: "false",
            weight: 0.25,
            description: "Empty array",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      constraints: ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"],
    },
    gradingRules: {
      testCaseWeight: 0.8,
      codeQualityWeight: 0.1,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "EASY",
      estimatedDuration: 10,
      tags: ["array", "hash-table"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Arrays & Strings",
    },
  },

  // Arrays & Strings - Medium: Group Anagrams
  {
    id: "group-anagrams",
    title: "Group Anagrams",
    text: "Given an array of strings strs, group the anagrams together. You can return the answer in any order. An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.",
    implementations: [
      {
        language: "python",
        starterCode: "def group_anagrams(strs):\n    # Your code here\n    pass",
        solutionCode:
          "def group_anagrams(strs):\n    from collections import defaultdict\n    anagram_map = defaultdict(list)\n    \n    for s in strs:\n        sorted_str = ''.join(sorted(s))\n        anagram_map[sorted_str].append(s)\n    \n    return list(anagram_map.values())",
        testCases: [
          {
            input: '["eat","tea","tan","ate","nat","bat"]',
            expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
            weight: 0.4,
            description: "Basic anagram grouping",
          },
          {
            input: '[""]',
            expected_output: '[[""]]',
            weight: 0.3,
            description: "Empty string",
          },
          {
            input: '["a"]',
            expected_output: '[["a"]]',
            weight: 0.3,
            description: "Single character",
          },
        ],
      },
      {
        language: "javascript",
        starterCode: "function groupAnagrams(strs) {\n    // Your code here\n}",
        solutionCode:
          "function groupAnagrams(strs) {\n    const anagramMap = new Map();\n    \n    for (const str of strs) {\n        const sortedStr = str.split('').sort().join('');\n        if (!anagramMap.has(sortedStr)) {\n            anagramMap.set(sortedStr, []);\n        }\n        anagramMap.get(sortedStr).push(str);\n    }\n    \n    return Array.from(anagramMap.values());\n}",
        testCases: [
          {
            input: '["eat","tea","tan","ate","nat","bat"]',
            expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
            weight: 0.4,
            description: "Basic anagram grouping",
          },
          {
            input: '[""]',
            expected_output: '[[""]]',
            weight: 0.3,
            description: "Empty string",
          },
          {
            input: '["a"]',
            expected_output: '[["a"]]',
            weight: 0.3,
            description: "Single character",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}",
        solutionCode:
          "class Solution {\n    public List<List<String>> groupAnagrams(String[] strs) {\n        Map<String, List<String>> anagramMap = new HashMap<>();\n        \n        for (String str : strs) {\n            char[] chars = str.toCharArray();\n            Arrays.sort(chars);\n            String sortedStr = new String(chars);\n            \n            anagramMap.computeIfAbsent(sortedStr, k -> new ArrayList<>()).add(str);\n        }\n        \n        return new ArrayList<>(anagramMap.values());\n    }\n}",
        testCases: [
          {
            input: '["eat","tea","tan","ate","nat","bat"]',
            expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
            weight: 0.4,
            description: "Basic anagram grouping",
          },
          {
            input: '[""]',
            expected_output: '[[""]]',
            weight: 0.3,
            description: "Empty string",
          },
          {
            input: '["a"]',
            expected_output: '[["a"]]',
            weight: 0.3,
            description: "Single character",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func groupAnagrams(strs []string) [][]string {\n    // Your code here\n    return [][]string{}\n}",
        solutionCode:
          "func groupAnagrams(strs []string) [][]string {\n    anagramMap := make(map[string][]string)\n    \n    for _, str := range strs {\n        runes := []rune(str)\n        sort.Slice(runes, func(i, j int) bool {\n            return runes[i] < runes[j]\n        })\n        sortedStr := string(runes)\n        \n        anagramMap[sortedStr] = append(anagramMap[sortedStr], str)\n    }\n    \n    result := make([][]string, 0, len(anagramMap))\n    for _, group := range anagramMap {\n        result = append(result, group)\n    }\n    \n    return result\n}",
        testCases: [
          {
            input: '["eat","tea","tan","ate","nat","bat"]',
            expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
            weight: 0.4,
            description: "Basic anagram grouping",
          },
          {
            input: '[""]',
            expected_output: '[[""]]',
            weight: 0.3,
            description: "Empty string",
          },
          {
            input: '["a"]',
            expected_output: '[["a"]]',
            weight: 0.3,
            description: "Single character",
          },
        ],
      },
      {
        language: "ruby",
        starterCode: "def group_anagrams(strs)\n    # Your code here\nend",
        solutionCode:
          "def group_anagrams(strs)\n    anagram_map = Hash.new { |h, k| h[k] = [] }\n    \n    strs.each do |str|\n        sorted_str = str.chars.sort.join\n        anagram_map[sorted_str] << str\n    end\n    \n    anagram_map.values\nend",
        testCases: [
          {
            input: '["eat","tea","tan","ate","nat","bat"]',
            expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
            weight: 0.4,
            description: "Basic anagram grouping",
          },
          {
            input: '[""]',
            expected_output: '[[""]]',
            weight: 0.3,
            description: "Empty string",
          },
          {
            input: '["a"]',
            expected_output: '[["a"]]',
            weight: 0.3,
            description: "Single character",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    vector<vector<string>> groupAnagrams(vector<string>& strs) {\n        unordered_map<string, vector<string>> anagramMap;\n        \n        for (const string& str : strs) {\n            string sortedStr = str;\n            sort(sortedStr.begin(), sortedStr.end());\n            anagramMap[sortedStr].push_back(str);\n        }\n        \n        vector<vector<string>> result;\n        for (const auto& pair : anagramMap) {\n            result.push_back(pair.second);\n        }\n        \n        return result;\n    }\n};",
        testCases: [
          {
            input: '["eat","tea","tan","ate","nat","bat"]',
            expected_output: '[["bat"],["nat","tan"],["ate","eat","tea"]]',
            weight: 0.4,
            description: "Basic anagram grouping",
          },
          {
            input: '[""]',
            expected_output: '[[""]]',
            weight: 0.3,
            description: "Empty string",
          },
          {
            input: '["a"]',
            expected_output: '[["a"]]',
            weight: 0.3,
            description: "Single character",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n * k log k)",
      spaceComplexity: "O(n * k)",
      constraints: [
        "1 <= strs.length <= 10^4",
        "0 <= strs[i].length <= 100",
        "strs[i] consists of lowercase English letters",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 25,
      tags: ["array", "hash-table", "string", "sorting"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Uber"],
      topic: "Arrays & Strings",
    },
  },

  // Arrays & Strings - Hard: Minimum Window Substring
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    text: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such window, return the empty string "".',
    implementations: [
      {
        language: "python",
        starterCode: "def min_window(s, t):\n    # Your code here\n    pass",
        solutionCode:
          "def min_window(s, t):\n    if not s or not t:\n        return \"\"\n    \n    from collections import Counter\n    dict_t = Counter(t)\n    required = len(dict_t)\n    \n    left = right = 0\n    formed = 0\n    window_counts = {}\n    \n    ans = float('inf'), None, None\n    \n    while right < len(s):\n        character = s[right]\n        window_counts[character] = window_counts.get(character, 0) + 1\n        \n        if character in dict_t and window_counts[character] == dict_t[character]:\n            formed += 1\n        \n        while left <= right and formed == required:\n            character = s[left]\n            \n            if right - left + 1 < ans[0]:\n                ans = (right - left + 1, left, right)\n            \n            window_counts[character] -= 1\n            if character in dict_t and window_counts[character] < dict_t[character]:\n                formed -= 1\n            \n            left += 1\n        \n        right += 1\n    \n    return \"\" if ans[0] == float('inf') else s[ans[1]:ans[2] + 1]",
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.4,
            description: "Basic minimum window",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.3,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.3,
            description: "No valid window",
          },
        ],
      },
      {
        language: "javascript",
        starterCode: "function minWindow(s, t) {\n    // Your code here\n}",
        solutionCode:
          'function minWindow(s, t) {\n    if (!s || !t) return "";\n    \n    const dictT = {};\n    for (const char of t) {\n        dictT[char] = (dictT[char] || 0) + 1;\n    }\n    \n    const required = Object.keys(dictT).length;\n    let left = 0, right = 0;\n    let formed = 0;\n    const windowCounts = {};\n    \n    let ans = [Infinity, null, null];\n    \n    while (right < s.length) {\n        const character = s[right];\n        windowCounts[character] = (windowCounts[character] || 0) + 1;\n        \n        if (dictT[character] && windowCounts[character] === dictT[character]) {\n            formed++;\n        }\n        \n        while (left <= right && formed === required) {\n            const character = s[left];\n            \n            if (right - left + 1 < ans[0]) {\n                ans = [right - left + 1, left, right];\n            }\n            \n            windowCounts[character]--;\n            if (dictT[character] && windowCounts[character] < dictT[character]) {\n                formed--;\n            }\n            \n            left++;\n        }\n        \n        right++;\n    }\n    \n    return ans[0] === Infinity ? "" : s.substring(ans[1], ans[2] + 1);\n}',
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.4,
            description: "Basic minimum window",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.3,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.3,
            description: "No valid window",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          'class Solution {\n    public String minWindow(String s, String t) {\n        // Your code here\n        return "";\n    }\n}',
        solutionCode:
          'class Solution {\n    public String minWindow(String s, String t) {\n        if (s.length() == 0 || t.length() == 0) {\n            return "";\n        }\n        \n        Map<Character, Integer> dictT = new HashMap<>();\n        for (char c : t.toCharArray()) {\n            dictT.put(c, dictT.getOrDefault(c, 0) + 1);\n        }\n        \n        int required = dictT.size();\n        int left = 0, right = 0;\n        int formed = 0;\n        Map<Character, Integer> windowCounts = new HashMap<>();\n        \n        int[] ans = {-1, 0, 0};\n        \n        while (right < s.length()) {\n            char character = s.charAt(right);\n            windowCounts.put(character, windowCounts.getOrDefault(character, 0) + 1);\n            \n            if (dictT.containsKey(character) && windowCounts.get(character).intValue() == dictT.get(character).intValue()) {\n                formed++;\n            }\n            \n            while (left <= right && formed == required) {\n                character = s.charAt(left);\n                \n                if (ans[0] == -1 || right - left + 1 < ans[0]) {\n                    ans[0] = right - left + 1;\n                    ans[1] = left;\n                    ans[2] = right;\n                }\n                \n                windowCounts.put(character, windowCounts.get(character) - 1);\n                if (dictT.containsKey(character) && windowCounts.get(character).intValue() < dictT.get(character).intValue()) {\n                    formed--;\n                }\n                \n                left++;\n            }\n            \n            right++;\n        }\n        \n        return ans[0] == -1 ? "" : s.substring(ans[1], ans[2] + 1);\n    }\n}',
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.4,
            description: "Basic minimum window",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.3,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.3,
            description: "No valid window",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          'func minWindow(s string, t string) string {\n    // Your code here\n    return ""\n}',
        solutionCode:
          'func minWindow(s string, t string) string {\n    if len(s) == 0 || len(t) == 0 {\n        return ""\n    }\n    \n    dictT := make(map[byte]int)\n    for i := 0; i < len(t); i++ {\n        dictT[t[i]]++\n    }\n    \n    required := len(dictT)\n    left, right := 0, 0\n    formed := 0\n    windowCounts := make(map[byte]int)\n    \n    ans := []int{-1, 0, 0}\n    \n    for right < len(s) {\n        character := s[right]\n        windowCounts[character]++\n        \n        if count, exists := dictT[character]; exists && windowCounts[character] == count {\n            formed++\n        }\n        \n        for left <= right && formed == required {\n            character = s[left]\n            \n            if ans[0] == -1 || right-left+1 < ans[0] {\n                ans[0] = right - left + 1\n                ans[1] = left\n                ans[2] = right\n            }\n            \n            windowCounts[character]--\n            if count, exists := dictT[character]; exists && windowCounts[character] < count {\n                formed--\n            }\n            \n            left++\n        }\n        \n        right++\n    }\n    \n    if ans[0] == -1 {\n        return ""\n    }\n    return s[ans[1] : ans[2]+1]\n}',
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.4,
            description: "Basic minimum window",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.3,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.3,
            description: "No valid window",
          },
        ],
      },
      {
        language: "ruby",
        starterCode: "def min_window(s, t)\n    # Your code here\nend",
        solutionCode:
          'def min_window(s, t)\n    return "" if s.empty? || t.empty?\n    \n    dict_t = Hash.new(0)\n    t.each_char { |c| dict_t[c] += 1 }\n    \n    required = dict_t.size\n    left = right = 0\n    formed = 0\n    window_counts = Hash.new(0)\n    \n    ans = [Float::INFINITY, nil, nil]\n    \n    while right < s.length\n        character = s[right]\n        window_counts[character] += 1\n        \n        if dict_t.key?(character) && window_counts[character] == dict_t[character]\n            formed += 1\n        end\n        \n        while left <= right && formed == required\n            character = s[left]\n            \n            if right - left + 1 < ans[0]\n                ans = [right - left + 1, left, right]\n            end\n            \n            window_counts[character] -= 1\n            if dict_t.key?(character) && window_counts[character] < dict_t[character]\n                formed -= 1\n            end\n            \n            left += 1\n        end\n        \n        right += 1\n    end\n    \n    ans[0] == Float::INFINITY ? "" : s[ans[1]..ans[2]]\nend',
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.4,
            description: "Basic minimum window",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.3,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.3,
            description: "No valid window",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          'class Solution {\npublic:\n    string minWindow(string s, string t) {\n        // Your code here\n        return "";\n    }\n};',
        solutionCode:
          'class Solution {\npublic:\n    string minWindow(string s, string t) {\n        if (s.empty() || t.empty()) {\n            return "";\n        }\n        \n        unordered_map<char, int> dictT;\n        for (char c : t) {\n            dictT[c]++;\n        }\n        \n        int required = dictT.size();\n        int left = 0, right = 0;\n        int formed = 0;\n        unordered_map<char, int> windowCounts;\n        \n        vector<int> ans = {-1, 0, 0};\n        \n        while (right < s.length()) {\n            char character = s[right];\n            windowCounts[character]++;\n            \n            if (dictT.find(character) != dictT.end() && windowCounts[character] == dictT[character]) {\n                formed++;\n            }\n            \n            while (left <= right && formed == required) {\n                character = s[left];\n                \n                if (ans[0] == -1 || right - left + 1 < ans[0]) {\n                    ans[0] = right - left + 1;\n                    ans[1] = left;\n                    ans[2] = right;\n                }\n                \n                windowCounts[character]--;\n                if (dictT.find(character) != dictT.end() && windowCounts[character] < dictT[character]) {\n                    formed--;\n                }\n                \n                left++;\n            }\n            \n            right++;\n        }\n        \n        return ans[0] == -1 ? "" : s.substr(ans[1], ans[0]);\n    }\n};',
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.4,
            description: "Basic minimum window",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.3,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.3,
            description: "No valid window",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(|s| + |t|)",
      spaceComplexity: "O(|s| + |t|)",
      constraints: [
        "m == s.length",
        "n == t.length",
        "1 <= m, n <= 10^5",
        "s and t consist of uppercase and lowercase English letters",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 45,
      tags: ["hash-table", "string", "sliding-window"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Uber", "LinkedIn"],
      topic: "Arrays & Strings",
    },
  },

  // Linked Lists - Easy: Reverse Linked List
  {
    id: "reverse-linked-list",
    title: "Reverse Linked List",
    text: "Given the head of a singly linked list, reverse the list, and return the reversed list.\n\n**Example:**\nInput: head = [1,2,3,4,5]\nOutput: [5,4,3,2,1]\n\n**Example:**\nInput: head = [1,2]\nOutput: [2,1]\n\n**Example:**\nInput: head = []\nOutput: []",
    implementations: [
      {
        language: "python",
        starterCode:
          "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head):\n        # Your code here\n        pass",
        solutionCode:
          "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def reverseList(self, head):\n        prev = None\n        current = head\n        \n        while current:\n            next_temp = current.next\n            current.next = prev\n            prev = current\n            current = next_temp\n        \n        return prev",
        testCases: [
          {
            input: "[1,2,3,4,5]",
            expected_output: "[5,4,3,2,1]",
            weight: 0.3,
            description: "Standard list reversal",
          },
          {
            input: "[1,2]",
            expected_output: "[2,1]",
            weight: 0.3,
            description: "Two node list",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.2,
            description: "Empty list",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.2,
            description: "Single node list",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} head\n * @return {ListNode}\n */\nvar reverseList = function(head) {\n    let prev = null;\n    let current = head;\n    \n    while (current !== null) {\n        let nextTemp = current.next;\n        current.next = prev;\n        prev = current;\n        current = nextTemp;\n    }\n    \n    return prev;\n};",
        testCases: [
          {
            input: "[1,2,3,4,5]",
            expected_output: "[5,4,3,2,1]",
            weight: 0.3,
            description: "Standard list reversal",
          },
          {
            input: "[1,2]",
            expected_output: "[2,1]",
            weight: 0.3,
            description: "Two node list",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.2,
            description: "Empty list",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.2,
            description: "Single node list",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        // Your code here\n        return null;\n    }\n}",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode reverseList(ListNode head) {\n        ListNode prev = null;\n        ListNode current = head;\n        \n        while (current != null) {\n            ListNode nextTemp = current.next;\n            current.next = prev;\n            prev = current;\n            current = nextTemp;\n        }\n        \n        return prev;\n    }\n}",
        testCases: [
          {
            input: "[1,2,3,4,5]",
            expected_output: "[5,4,3,2,1]",
            weight: 0.3,
            description: "Standard list reversal",
          },
          {
            input: "[1,2]",
            expected_output: "[2,1]",
            weight: 0.3,
            description: "Two node list",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.2,
            description: "Empty list",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.2,
            description: "Single node list",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * type ListNode struct {\n *     Val int\n *     Next *ListNode\n * }\n */\nfunc reverseList(head *ListNode) *ListNode {\n    // Your code here\n    return nil\n}",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * type ListNode struct {\n *     Val int\n *     Next *ListNode\n * }\n */\nfunc reverseList(head *ListNode) *ListNode {\n    var prev *ListNode\n    current := head\n    \n    for current != nil {\n        nextTemp := current.Next\n        current.Next = prev\n        prev = current\n        current = nextTemp\n    }\n    \n    return prev\n}",
        testCases: [
          {
            input: "[1,2,3,4,5]",
            expected_output: "[5,4,3,2,1]",
            weight: 0.3,
            description: "Standard list reversal",
          },
          {
            input: "[1,2]",
            expected_output: "[2,1]",
            weight: 0.3,
            description: "Two node list",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.2,
            description: "Empty list",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.2,
            description: "Single node list",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# Definition for singly-linked list.\n# class ListNode\n#     attr_accessor :val, :next\n#     def initialize(val = 0, _next = nil)\n#         @val = val\n#         @next = _next\n#     end\n# end\n# @param {ListNode} head\n# @return {ListNode}\ndef reverse_list(head)\n    # Your code here\nend",
        solutionCode:
          "# Definition for singly-linked list.\n# class ListNode\n#     attr_accessor :val, :next\n#     def initialize(val = 0, _next = nil)\n#         @val = val\n#         @next = _next\n#     end\n# end\n# @param {ListNode} head\n# @return {ListNode}\ndef reverse_list(head)\n    prev = nil\n    current = head\n    \n    while current\n        next_temp = current.next\n        current.next = prev\n        prev = current\n        current = next_temp\n    end\n    \n    prev\nend",
        testCases: [
          {
            input: "[1,2,3,4,5]",
            expected_output: "[5,4,3,2,1]",
            weight: 0.3,
            description: "Standard list reversal",
          },
          {
            input: "[1,2]",
            expected_output: "[2,1]",
            weight: 0.3,
            description: "Two node list",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.2,
            description: "Empty list",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.2,
            description: "Single node list",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        // Your code here\n        return nullptr;\n    }\n};",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* reverseList(ListNode* head) {\n        ListNode* prev = nullptr;\n        ListNode* current = head;\n        \n        while (current != nullptr) {\n            ListNode* nextTemp = current->next;\n            current->next = prev;\n            prev = current;\n            current = nextTemp;\n        }\n        \n        return prev;\n    }\n};",
        testCases: [
          {
            input: "[1,2,3,4,5]",
            expected_output: "[5,4,3,2,1]",
            weight: 0.3,
            description: "Standard list reversal",
          },
          {
            input: "[1,2]",
            expected_output: "[2,1]",
            weight: 0.3,
            description: "Two node list",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.2,
            description: "Empty list",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.2,
            description: "Single node list",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      constraints: [
        "The number of nodes in the list is the range [0, 5000]",
        "-5000 <= Node.val <= 5000",
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
      tags: ["linked-list", "recursion"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Linked Lists",
    },
  },

  // Linked Lists - Medium: Add Two Numbers
  {
    id: "add-two-numbers",
    title: "Add Two Numbers",
    text: "You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order, and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.\n\n**Example 1:**\nInput: l1 = [2,4,3], l2 = [5,6,4]\nOutput: [7,0,8]\nExplanation: 342 + 465 = 807.\n\n**Example 2:**\nInput: l1 = [0], l2 = [0]\nOutput: [0]\n\n**Example 3:**\nInput: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]\nOutput: [8,9,9,9,0,0,0,1]",
    implementations: [
      {
        language: "python",
        starterCode:
          "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1, l2):\n        # Your code here\n        pass",
        solutionCode:
          "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def addTwoNumbers(self, l1, l2):\n        dummy_head = ListNode(0)\n        current = dummy_head\n        carry = 0\n        \n        while l1 or l2 or carry:\n            val1 = l1.val if l1 else 0\n            val2 = l2.val if l2 else 0\n            \n            total = val1 + val2 + carry\n            carry = total // 10\n            digit = total % 10\n            \n            current.next = ListNode(digit)\n            current = current.next\n            \n            l1 = l1.next if l1 else None\n            l2 = l2.next if l2 else None\n        \n        return dummy_head.next",
        testCases: [
          {
            input: "[2,4,3], [5,6,4]",
            expected_output: "[7,0,8]",
            weight: 0.4,
            description: "Standard addition with carry",
          },
          {
            input: "[0], [0]",
            expected_output: "[0]",
            weight: 0.2,
            description: "Zero addition",
          },
          {
            input: "[9,9,9,9,9,9,9], [9,9,9,9]",
            expected_output: "[8,9,9,9,0,0,0,1]",
            weight: 0.4,
            description: "Multiple carries",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nvar addTwoNumbers = function(l1, l2) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode} l1\n * @param {ListNode} l2\n * @return {ListNode}\n */\nvar addTwoNumbers = function(l1, l2) {\n    let dummyHead = new ListNode(0);\n    let current = dummyHead;\n    let carry = 0;\n    \n    while (l1 !== null || l2 !== null || carry !== 0) {\n        let val1 = l1 ? l1.val : 0;\n        let val2 = l2 ? l2.val : 0;\n        \n        let total = val1 + val2 + carry;\n        carry = Math.floor(total / 10);\n        let digit = total % 10;\n        \n        current.next = new ListNode(digit);\n        current = current.next;\n        \n        l1 = l1 ? l1.next : null;\n        l2 = l2 ? l2.next : null;\n    }\n    \n    return dummyHead.next;\n};",
        testCases: [
          {
            input: "[2,4,3], [5,6,4]",
            expected_output: "[7,0,8]",
            weight: 0.4,
            description: "Standard addition with carry",
          },
          {
            input: "[0], [0]",
            expected_output: "[0]",
            weight: 0.2,
            description: "Zero addition",
          },
          {
            input: "[9,9,9,9,9,9,9], [9,9,9,9]",
            expected_output: "[8,9,9,9,0,0,0,1]",
            weight: 0.4,
            description: "Multiple carries",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        // Your code here\n        return null;\n    }\n}",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {\n        ListNode dummyHead = new ListNode(0);\n        ListNode current = dummyHead;\n        int carry = 0;\n        \n        while (l1 != null || l2 != null || carry != 0) {\n            int val1 = (l1 != null) ? l1.val : 0;\n            int val2 = (l2 != null) ? l2.val : 0;\n            \n            int total = val1 + val2 + carry;\n            carry = total / 10;\n            int digit = total % 10;\n            \n            current.next = new ListNode(digit);\n            current = current.next;\n            \n            l1 = (l1 != null) ? l1.next : null;\n            l2 = (l2 != null) ? l2.next : null;\n        }\n        \n        return dummyHead.next;\n    }\n}",
        testCases: [
          {
            input: "[2,4,3], [5,6,4]",
            expected_output: "[7,0,8]",
            weight: 0.4,
            description: "Standard addition with carry",
          },
          {
            input: "[0], [0]",
            expected_output: "[0]",
            weight: 0.2,
            description: "Zero addition",
          },
          {
            input: "[9,9,9,9,9,9,9], [9,9,9,9]",
            expected_output: "[8,9,9,9,0,0,0,1]",
            weight: 0.4,
            description: "Multiple carries",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * type ListNode struct {\n *     Val int\n *     Next *ListNode\n * }\n */\nfunc addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {\n    // Your code here\n    return nil\n}",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * type ListNode struct {\n *     Val int\n *     Next *ListNode\n * }\n */\nfunc addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {\n    dummyHead := &ListNode{Val: 0}\n    current := dummyHead\n    carry := 0\n    \n    for l1 != nil || l2 != nil || carry != 0 {\n        val1 := 0\n        if l1 != nil {\n            val1 = l1.Val\n            l1 = l1.Next\n        }\n        \n        val2 := 0\n        if l2 != nil {\n            val2 = l2.Val\n            l2 = l2.Next\n        }\n        \n        total := val1 + val2 + carry\n        carry = total / 10\n        digit := total % 10\n        \n        current.Next = &ListNode{Val: digit}\n        current = current.Next\n    }\n    \n    return dummyHead.Next\n}",
        testCases: [
          {
            input: "[2,4,3], [5,6,4]",
            expected_output: "[7,0,8]",
            weight: 0.4,
            description: "Standard addition with carry",
          },
          {
            input: "[0], [0]",
            expected_output: "[0]",
            weight: 0.2,
            description: "Zero addition",
          },
          {
            input: "[9,9,9,9,9,9,9], [9,9,9,9]",
            expected_output: "[8,9,9,9,0,0,0,1]",
            weight: 0.4,
            description: "Multiple carries",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# Definition for singly-linked list.\n# class ListNode\n#     attr_accessor :val, :next\n#     def initialize(val = 0, _next = nil)\n#         @val = val\n#         @next = _next\n#     end\n# end\n# @param {ListNode} l1\n# @param {ListNode} l2\n# @return {ListNode}\ndef add_two_numbers(l1, l2)\n    # Your code here\nend",
        solutionCode:
          "# Definition for singly-linked list.\n# class ListNode\n#     attr_accessor :val, :next\n#     def initialize(val = 0, _next = nil)\n#         @val = val\n#         @next = _next\n#     end\n# end\n# @param {ListNode} l1\n# @param {ListNode} l2\n# @return {ListNode}\ndef add_two_numbers(l1, l2)\n    dummy_head = ListNode.new(0)\n    current = dummy_head\n    carry = 0\n    \n    while l1 || l2 || carry > 0\n        val1 = l1 ? l1.val : 0\n        val2 = l2 ? l2.val : 0\n        \n        total = val1 + val2 + carry\n        carry = total / 10\n        digit = total % 10\n        \n        current.next = ListNode.new(digit)\n        current = current.next\n        \n        l1 = l1.next if l1\n        l2 = l2.next if l2\n    end\n    \n    dummy_head.next\nend",
        testCases: [
          {
            input: "[2,4,3], [5,6,4]",
            expected_output: "[7,0,8]",
            weight: 0.4,
            description: "Standard addition with carry",
          },
          {
            input: "[0], [0]",
            expected_output: "[0]",
            weight: 0.2,
            description: "Zero addition",
          },
          {
            input: "[9,9,9,9,9,9,9], [9,9,9,9]",
            expected_output: "[8,9,9,9,0,0,0,1]",
            weight: 0.4,
            description: "Multiple carries",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        // Your code here\n        return nullptr;\n    }\n};",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* addTwoNumbers(ListNode* l1, ListNode* l2) {\n        ListNode* dummyHead = new ListNode(0);\n        ListNode* current = dummyHead;\n        int carry = 0;\n        \n        while (l1 != nullptr || l2 != nullptr || carry != 0) {\n            int val1 = l1 ? l1->val : 0;\n            int val2 = l2 ? l2->val : 0;\n            \n            int total = val1 + val2 + carry;\n            carry = total / 10;\n            int digit = total % 10;\n            \n            current->next = new ListNode(digit);\n            current = current->next;\n            \n            l1 = l1 ? l1->next : nullptr;\n            l2 = l2 ? l2->next : nullptr;\n        }\n        \n        ListNode* result = dummyHead->next;\n        delete dummyHead;\n        return result;\n    }\n};",
        testCases: [
          {
            input: "[2,4,3], [5,6,4]",
            expected_output: "[7,0,8]",
            weight: 0.4,
            description: "Standard addition with carry",
          },
          {
            input: "[0], [0]",
            expected_output: "[0]",
            weight: 0.2,
            description: "Zero addition",
          },
          {
            input: "[9,9,9,9,9,9,9], [9,9,9,9]",
            expected_output: "[8,9,9,9,0,0,0,1]",
            weight: 0.4,
            description: "Multiple carries",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(max(m, n))",
      spaceComplexity: "O(max(m, n))",
      constraints: [
        "The number of nodes in each linked list is in the range [1, 100]",
        "0 <= Node.val <= 9",
        "It is guaranteed that the list represents a number that does not have leading zeros",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 25,
      tags: ["linked-list", "math", "recursion"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Bloomberg"],
      topic: "Linked Lists",
    },
  },

  // Linked Lists - Hard: Merge k Sorted Lists
  {
    id: "merge-k-sorted-lists",
    title: "Merge k Sorted Lists",
    text: "You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.\n\n**Example 1:**\nInput: lists = [[1,4,5],[1,3,4],[2,6]]\nOutput: [1,1,2,3,4,4,5,6]\nExplanation: The linked-lists are:\n[\n  1->4->5,\n  1->3->4,\n  2->6\n]\nmerging them into one sorted list:\n1->1->2->3->4->4->5->6\n\n**Example 2:**\nInput: lists = []\nOutput: []\n\n**Example 3:**\nInput: lists = [[]]\nOutput: []",
    implementations: [
      {
        language: "python",
        starterCode:
          "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeKLists(self, lists):\n        # Your code here\n        pass",
        solutionCode:
          "# Definition for singly-linked list.\n# class ListNode:\n#     def __init__(self, val=0, next=None):\n#         self.val = val\n#         self.next = next\nclass Solution:\n    def mergeKLists(self, lists):\n        if not lists:\n            return None\n        \n        def mergeTwoLists(l1, l2):\n            dummy = ListNode(0)\n            current = dummy\n            \n            while l1 and l2:\n                if l1.val <= l2.val:\n                    current.next = l1\n                    l1 = l1.next\n                else:\n                    current.next = l2\n                    l2 = l2.next\n                current = current.next\n            \n            current.next = l1 or l2\n            return dummy.next\n        \n        while len(lists) > 1:\n            merged_lists = []\n            for i in range(0, len(lists), 2):\n                l1 = lists[i]\n                l2 = lists[i + 1] if i + 1 < len(lists) else None\n                merged_lists.append(mergeTwoLists(l1, l2))\n            lists = merged_lists\n        \n        return lists[0]",
        testCases: [
          {
            input: "[[1,4,5],[1,3,4],[2,6]]",
            expected_output: "[1,1,2,3,4,4,5,6]",
            weight: 0.5,
            description: "Multiple sorted lists",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty input",
          },
          {
            input: "[[]]",
            expected_output: "[]",
            weight: 0.25,
            description: "Single empty list",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function(lists) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * function ListNode(val, next) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.next = (next===undefined ? null : next)\n * }\n */\n/**\n * @param {ListNode[]} lists\n * @return {ListNode}\n */\nvar mergeKLists = function(lists) {\n    if (!lists || lists.length === 0) {\n        return null;\n    }\n    \n    function mergeTwoLists(l1, l2) {\n        let dummy = new ListNode(0);\n        let current = dummy;\n        \n        while (l1 && l2) {\n            if (l1.val <= l2.val) {\n                current.next = l1;\n                l1 = l1.next;\n            } else {\n                current.next = l2;\n                l2 = l2.next;\n            }\n            current = current.next;\n        }\n        \n        current.next = l1 || l2;\n        return dummy.next;\n    }\n    \n    while (lists.length > 1) {\n        let mergedLists = [];\n        for (let i = 0; i < lists.length; i += 2) {\n            let l1 = lists[i];\n            let l2 = i + 1 < lists.length ? lists[i + 1] : null;\n            mergedLists.push(mergeTwoLists(l1, l2));\n        }\n        lists = mergedLists;\n    }\n    \n    return lists[0];\n};",
        testCases: [
          {
            input: "[[1,4,5],[1,3,4],[2,6]]",
            expected_output: "[1,1,2,3,4,4,5,6]",
            weight: 0.5,
            description: "Multiple sorted lists",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty input",
          },
          {
            input: "[[]]",
            expected_output: "[]",
            weight: 0.25,
            description: "Single empty list",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        // Your code here\n        return null;\n    }\n}",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * public class ListNode {\n *     int val;\n *     ListNode next;\n *     ListNode() {}\n *     ListNode(int val) { this.val = val; }\n *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }\n * }\n */\nclass Solution {\n    public ListNode mergeKLists(ListNode[] lists) {\n        if (lists == null || lists.length == 0) {\n            return null;\n        }\n        \n        List<ListNode> listsList = new ArrayList<>(Arrays.asList(lists));\n        \n        while (listsList.size() > 1) {\n            List<ListNode> mergedLists = new ArrayList<>();\n            for (int i = 0; i < listsList.size(); i += 2) {\n                ListNode l1 = listsList.get(i);\n                ListNode l2 = i + 1 < listsList.size() ? listsList.get(i + 1) : null;\n                mergedLists.add(mergeTwoLists(l1, l2));\n            }\n            listsList = mergedLists;\n        }\n        \n        return listsList.get(0);\n    }\n    \n    private ListNode mergeTwoLists(ListNode l1, ListNode l2) {\n        ListNode dummy = new ListNode(0);\n        ListNode current = dummy;\n        \n        while (l1 != null && l2 != null) {\n            if (l1.val <= l2.val) {\n                current.next = l1;\n                l1 = l1.next;\n            } else {\n                current.next = l2;\n                l2 = l2.next;\n            }\n            current = current.next;\n        }\n        \n        current.next = l1 != null ? l1 : l2;\n        return dummy.next;\n    }\n}",
        testCases: [
          {
            input: "[[1,4,5],[1,3,4],[2,6]]",
            expected_output: "[1,1,2,3,4,4,5,6]",
            weight: 0.5,
            description: "Multiple sorted lists",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty input",
          },
          {
            input: "[[]]",
            expected_output: "[]",
            weight: 0.25,
            description: "Single empty list",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * type ListNode struct {\n *     Val int\n *     Next *ListNode\n * }\n */\nfunc mergeKLists(lists []*ListNode) *ListNode {\n    // Your code here\n    return nil\n}",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * type ListNode struct {\n *     Val int\n *     Next *ListNode\n * }\n */\nfunc mergeKLists(lists []*ListNode) *ListNode {\n    if len(lists) == 0 {\n        return nil\n    }\n    \n    for len(lists) > 1 {\n        var mergedLists []*ListNode\n        for i := 0; i < len(lists); i += 2 {\n            l1 := lists[i]\n            var l2 *ListNode\n            if i+1 < len(lists) {\n                l2 = lists[i+1]\n            }\n            mergedLists = append(mergedLists, mergeTwoLists(l1, l2))\n        }\n        lists = mergedLists\n    }\n    \n    return lists[0]\n}\n\nfunc mergeTwoLists(l1, l2 *ListNode) *ListNode {\n    dummy := &ListNode{}\n    current := dummy\n    \n    for l1 != nil && l2 != nil {\n        if l1.Val <= l2.Val {\n            current.Next = l1\n            l1 = l1.Next\n        } else {\n            current.Next = l2\n            l2 = l2.Next\n        }\n        current = current.Next\n    }\n    \n    if l1 != nil {\n        current.Next = l1\n    } else {\n        current.Next = l2\n    }\n    \n    return dummy.Next\n}",
        testCases: [
          {
            input: "[[1,4,5],[1,3,4],[2,6]]",
            expected_output: "[1,1,2,3,4,4,5,6]",
            weight: 0.5,
            description: "Multiple sorted lists",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty input",
          },
          {
            input: "[[]]",
            expected_output: "[]",
            weight: 0.25,
            description: "Single empty list",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# Definition for singly-linked list.\n# class ListNode\n#     attr_accessor :val, :next\n#     def initialize(val = 0, _next = nil)\n#         @val = val\n#         @next = _next\n#     end\n# end\n# @param {ListNode[]} lists\n# @return {ListNode}\ndef merge_k_lists(lists)\n    # Your code here\nend",
        solutionCode:
          "# Definition for singly-linked list.\n# class ListNode\n#     attr_accessor :val, :next\n#     def initialize(val = 0, _next = nil)\n#         @val = val\n#         @next = _next\n#     end\n# end\n# @param {ListNode[]} lists\n# @return {ListNode}\ndef merge_k_lists(lists)\n    return nil if lists.empty?\n    \n    def merge_two_lists(l1, l2)\n        dummy = ListNode.new(0)\n        current = dummy\n        \n        while l1 && l2\n            if l1.val <= l2.val\n                current.next = l1\n                l1 = l1.next\n            else\n                current.next = l2\n                l2 = l2.next\n            end\n            current = current.next\n        end\n        \n        current.next = l1 || l2\n        dummy.next\n    end\n    \n    while lists.length > 1\n        merged_lists = []\n        (0...lists.length).step(2) do |i|\n            l1 = lists[i]\n            l2 = i + 1 < lists.length ? lists[i + 1] : nil\n            merged_lists << merge_two_lists(l1, l2)\n        end\n        lists = merged_lists\n    end\n    \n    lists[0]\nend",
        testCases: [
          {
            input: "[[1,4,5],[1,3,4],[2,6]]",
            expected_output: "[1,1,2,3,4,4,5,6]",
            weight: 0.5,
            description: "Multiple sorted lists",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty input",
          },
          {
            input: "[[]]",
            expected_output: "[]",
            weight: 0.25,
            description: "Single empty list",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        // Your code here\n        return nullptr;\n    }\n};",
        solutionCode:
          "/**\n * Definition for singly-linked list.\n * struct ListNode {\n *     int val;\n *     ListNode *next;\n *     ListNode() : val(0), next(nullptr) {}\n *     ListNode(int x) : val(x), next(nullptr) {}\n *     ListNode(int x, ListNode *next) : val(x), next(next) {}\n * };\n */\nclass Solution {\npublic:\n    ListNode* mergeKLists(vector<ListNode*>& lists) {\n        if (lists.empty()) {\n            return nullptr;\n        }\n        \n        while (lists.size() > 1) {\n            vector<ListNode*> mergedLists;\n            for (int i = 0; i < lists.size(); i += 2) {\n                ListNode* l1 = lists[i];\n                ListNode* l2 = i + 1 < lists.size() ? lists[i + 1] : nullptr;\n                mergedLists.push_back(mergeTwoLists(l1, l2));\n            }\n            lists = mergedLists;\n        }\n        \n        return lists[0];\n    }\n    \nprivate:\n    ListNode* mergeTwoLists(ListNode* l1, ListNode* l2) {\n        ListNode* dummy = new ListNode(0);\n        ListNode* current = dummy;\n        \n        while (l1 && l2) {\n            if (l1->val <= l2->val) {\n                current->next = l1;\n                l1 = l1->next;\n            } else {\n                current->next = l2;\n                l2 = l2->next;\n            }\n            current = current->next;\n        }\n        \n        current->next = l1 ? l1 : l2;\n        ListNode* result = dummy->next;\n        delete dummy;\n        return result;\n    }\n};",
        testCases: [
          {
            input: "[[1,4,5],[1,3,4],[2,6]]",
            expected_output: "[1,1,2,3,4,4,5,6]",
            weight: 0.5,
            description: "Multiple sorted lists",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty input",
          },
          {
            input: "[[]]",
            expected_output: "[]",
            weight: 0.25,
            description: "Single empty list",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n log k)",
      spaceComplexity: "O(1)",
      constraints: [
        "k == lists.length",
        "0 <= k <= 10^4",
        "0 <= lists[i].length <= 500",
        "-10^4 <= lists[i][j] <= 10^4",
        "lists[i] is sorted in ascending order",
        "The sum of lists[i].length will not exceed 10^4",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 40,
      tags: ["linked-list", "divide-and-conquer", "heap", "merge-sort"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Linked Lists",
    },
  },

  // Trees & Graphs - Easy: Maximum Depth of Binary Tree
  {
    id: "maximum-depth-binary-tree",
    title: "Maximum Depth of Binary Tree",
    text: "Given the root of a binary tree, return its maximum depth. A binary tree's maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.\n\n**Example 1:**\nInput: root = [3,9,20,null,null,15,7]\nOutput: 3\n\n**Example 2:**\nInput: root = [1,null,2]\nOutput: 2",
    implementations: [
      {
        language: "python",
        starterCode:
          "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def maxDepth(self, root):\n        # Your code here\n        pass",
        solutionCode:
          "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def maxDepth(self, root):\n        if not root:\n            return 0\n        \n        left_depth = self.maxDepth(root.left)\n        right_depth = self.maxDepth(root.right)\n        \n        return max(left_depth, right_depth) + 1",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "3",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1,null,2]",
            expected_output: "2",
            weight: 0.3,
            description: "Right skewed tree",
          },
          {
            input: "[]",
            expected_output: "0",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxDepth = function(root) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number}\n */\nvar maxDepth = function(root) {\n    if (!root) {\n        return 0;\n    }\n    \n    const leftDepth = maxDepth(root.left);\n    const rightDepth = maxDepth(root.right);\n    \n    return Math.max(leftDepth, rightDepth) + 1;\n};",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "3",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1,null,2]",
            expected_output: "2",
            weight: 0.3,
            description: "Right skewed tree",
          },
          {
            input: "[]",
            expected_output: "0",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public int maxDepth(TreeNode root) {\n        if (root == null) {\n            return 0;\n        }\n        \n        int leftDepth = maxDepth(root.left);\n        int rightDepth = maxDepth(root.right);\n        \n        return Math.max(leftDepth, rightDepth) + 1;\n    }\n}",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "3",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1,null,2]",
            expected_output: "2",
            weight: 0.3,
            description: "Right skewed tree",
          },
          {
            input: "[]",
            expected_output: "0",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * type TreeNode struct {\n *     Val int\n *     Left *TreeNode\n *     Right *TreeNode\n * }\n */\nfunc maxDepth(root *TreeNode) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * type TreeNode struct {\n *     Val int\n *     Left *TreeNode\n *     Right *TreeNode\n * }\n */\nfunc maxDepth(root *TreeNode) int {\n    if root == nil {\n        return 0\n    }\n    \n    leftDepth := maxDepth(root.Left)\n    rightDepth := maxDepth(root.Right)\n    \n    if leftDepth > rightDepth {\n        return leftDepth + 1\n    }\n    return rightDepth + 1\n}",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "3",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1,null,2]",
            expected_output: "2",
            weight: 0.3,
            description: "Right skewed tree",
          },
          {
            input: "[]",
            expected_output: "0",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# Definition for a binary tree node.\n# class TreeNode\n#     attr_accessor :val, :left, :right\n#     def initialize(val = 0, left = nil, right = nil)\n#         @val = val\n#         @left = left\n#         @right = right\n#     end\n# end\n# @param {TreeNode} root\n# @return {Integer}\ndef max_depth(root)\n    # Your code here\nend",
        solutionCode:
          "# Definition for a binary tree node.\n# class TreeNode\n#     attr_accessor :val, :left, :right\n#     def initialize(val = 0, left = nil, right = nil)\n#         @val = val\n#         @left = left\n#         @right = right\n#     end\n# end\n# @param {TreeNode} root\n# @return {Integer}\ndef max_depth(root)\n    return 0 if root.nil?\n    \n    left_depth = max_depth(root.left)\n    right_depth = max_depth(root.right)\n    \n    [left_depth, right_depth].max + 1\nend",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "3",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1,null,2]",
            expected_output: "2",
            weight: 0.3,
            description: "Right skewed tree",
          },
          {
            input: "[]",
            expected_output: "0",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    int maxDepth(TreeNode* root) {\n        if (root == nullptr) {\n            return 0;\n        }\n        \n        int leftDepth = maxDepth(root->left);\n        int rightDepth = maxDepth(root->right);\n        \n        return max(leftDepth, rightDepth) + 1;\n    }\n};",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "3",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1,null,2]",
            expected_output: "2",
            weight: 0.3,
            description: "Right skewed tree",
          },
          {
            input: "[]",
            expected_output: "0",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(h)",
      constraints: [
        "The number of nodes in the tree is in the range [0, 10^4]",
        "-100 <= Node.val <= 100",
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
      estimatedDuration: 10,
      tags: ["tree", "depth-first-search", "binary-tree"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Trees & Graphs",
    },
  },

  // Trees & Graphs - Medium: Binary Tree Level Order Traversal
  {
    id: "binary-tree-level-order-traversal",
    title: "Binary Tree Level Order Traversal",
    text: "Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).\n\n**Example 1:**\nInput: root = [3,9,20,null,null,15,7]\nOutput: [[3],[9,20],[15,7]]\n\n**Example 2:**\nInput: root = [1]\nOutput: [[1]]\n\n**Example 3:**\nInput: root = []\nOutput: []",
    implementations: [
      {
        language: "python",
        starterCode:
          "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def levelOrder(self, root):\n        # Your code here\n        pass",
        solutionCode:
          "# Definition for a binary tree node.\n# class TreeNode:\n#     def __init__(self, val=0, left=None, right=None):\n#         self.val = val\n#         self.left = left\n#         self.right = right\nclass Solution:\n    def levelOrder(self, root):\n        if not root:\n            return []\n        \n        result = []\n        queue = [root]\n        \n        while queue:\n            level_size = len(queue)\n            level_nodes = []\n            \n            for _ in range(level_size):\n                node = queue.pop(0)\n                level_nodes.append(node.val)\n                \n                if node.left:\n                    queue.append(node.left)\n                if node.right:\n                    queue.append(node.right)\n            \n            result.append(level_nodes)\n        \n        return result",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "[[3],[9,20],[15,7]]",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1]",
            expected_output: "[[1]]",
            weight: 0.3,
            description: "Single node tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nvar levelOrder = function(root) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * function TreeNode(val, left, right) {\n *     this.val = (val===undefined ? 0 : val)\n *     this.left = (left===undefined ? null : left)\n *     this.right = (right===undefined ? null : right)\n * }\n */\n/**\n * @param {TreeNode} root\n * @return {number[][]}\n */\nvar levelOrder = function(root) {\n    if (!root) {\n        return [];\n    }\n    \n    const result = [];\n    const queue = [root];\n    \n    while (queue.length > 0) {\n        const levelSize = queue.length;\n        const levelNodes = [];\n        \n        for (let i = 0; i < levelSize; i++) {\n            const node = queue.shift();\n            levelNodes.push(node.val);\n            \n            if (node.left) {\n                queue.push(node.left);\n            }\n            if (node.right) {\n                queue.push(node.right);\n            }\n        }\n        \n        result.push(levelNodes);\n    }\n    \n    return result;\n};",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "[[3],[9,20],[15,7]]",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1]",
            expected_output: "[[1]]",
            weight: 0.3,
            description: "Single node tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode() {}\n *     TreeNode(int val) { this.val = val; }\n *     TreeNode(int val, TreeNode left, TreeNode right) {\n *         this.val = val;\n *         this.left = left;\n *         this.right = right;\n *     }\n * }\n */\nclass Solution {\n    public List<List<Integer>> levelOrder(TreeNode root) {\n        List<List<Integer>> result = new ArrayList<>();\n        if (root == null) {\n            return result;\n        }\n        \n        Queue<TreeNode> queue = new LinkedList<>();\n        queue.offer(root);\n        \n        while (!queue.isEmpty()) {\n            int levelSize = queue.size();\n            List<Integer> levelNodes = new ArrayList<>();\n            \n            for (int i = 0; i < levelSize; i++) {\n                TreeNode node = queue.poll();\n                levelNodes.add(node.val);\n                \n                if (node.left != null) {\n                    queue.offer(node.left);\n                }\n                if (node.right != null) {\n                    queue.offer(node.right);\n                }\n            }\n            \n            result.add(levelNodes);\n        }\n        \n        return result;\n    }\n}",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "[[3],[9,20],[15,7]]",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1]",
            expected_output: "[[1]]",
            weight: 0.3,
            description: "Single node tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * type TreeNode struct {\n *     Val int\n *     Left *TreeNode\n *     Right *TreeNode\n * }\n */\nfunc levelOrder(root *TreeNode) [][]int {\n    // Your code here\n    return [][]int{}\n}",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * type TreeNode struct {\n *     Val int\n *     Left *TreeNode\n *     Right *TreeNode\n * }\n */\nfunc levelOrder(root *TreeNode) [][]int {\n    if root == nil {\n        return [][]int{}\n    }\n    \n    var result [][]int\n    queue := []*TreeNode{root}\n    \n    for len(queue) > 0 {\n        levelSize := len(queue)\n        var levelNodes []int\n        \n        for i := 0; i < levelSize; i++ {\n            node := queue[0]\n            queue = queue[1:]\n            levelNodes = append(levelNodes, node.Val)\n            \n            if node.Left != nil {\n                queue = append(queue, node.Left)\n            }\n            if node.Right != nil {\n                queue = append(queue, node.Right)\n            }\n        }\n        \n        result = append(result, levelNodes)\n    }\n    \n    return result\n}",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "[[3],[9,20],[15,7]]",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1]",
            expected_output: "[[1]]",
            weight: 0.3,
            description: "Single node tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# Definition for a binary tree node.\n# class TreeNode\n#     attr_accessor :val, :left, :right\n#     def initialize(val = 0, left = nil, right = nil)\n#         @val = val\n#         @left = left\n#         @right = right\n#     end\n# end\n# @param {TreeNode} root\n# @return {Integer[][]}\ndef level_order(root)\n    # Your code here\nend",
        solutionCode:
          "# Definition for a binary tree node.\n# class TreeNode\n#     attr_accessor :val, :left, :right\n#     def initialize(val = 0, left = nil, right = nil)\n#         @val = val\n#         @left = left\n#         @right = right\n#     end\n# end\n# @param {TreeNode} root\n# @return {Integer[][]}\ndef level_order(root)\n    return [] if root.nil?\n    \n    result = []\n    queue = [root]\n    \n    while !queue.empty?\n        level_size = queue.length\n        level_nodes = []\n        \n        level_size.times do\n            node = queue.shift\n            level_nodes << node.val\n            \n            queue << node.left if node.left\n            queue << node.right if node.right\n        end\n        \n        result << level_nodes\n    end\n    \n    result\nend",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "[[3],[9,20],[15,7]]",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1]",
            expected_output: "[[1]]",
            weight: 0.3,
            description: "Single node tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode() : val(0), left(nullptr), right(nullptr) {}\n *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}\n *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}\n * };\n */\nclass Solution {\npublic:\n    vector<vector<int>> levelOrder(TreeNode* root) {\n        vector<vector<int>> result;\n        if (root == nullptr) {\n            return result;\n        }\n        \n        queue<TreeNode*> q;\n        q.push(root);\n        \n        while (!q.empty()) {\n            int levelSize = q.size();\n            vector<int> levelNodes;\n            \n            for (int i = 0; i < levelSize; i++) {\n                TreeNode* node = q.front();\n                q.pop();\n                levelNodes.push_back(node->val);\n                \n                if (node->left) {\n                    q.push(node->left);\n                }\n                if (node->right) {\n                    q.push(node->right);\n                }\n            }\n            \n            result.push_back(levelNodes);\n        }\n        \n        return result;\n    }\n};",
        testCases: [
          {
            input: "[3,9,20,null,null,15,7]",
            expected_output: "[[3],[9,20],[15,7]]",
            weight: 0.4,
            description: "Standard binary tree",
          },
          {
            input: "[1]",
            expected_output: "[[1]]",
            weight: 0.3,
            description: "Single node tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.3,
            description: "Empty tree",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      constraints: [
        "The number of nodes in the tree is in the range [0, 2000]",
        "-1000 <= Node.val <= 1000",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 20,
      tags: ["tree", "breadth-first-search", "binary-tree"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Trees & Graphs",
    },
  },

  // Trees & Graphs - Hard: Serialize and Deserialize Binary Tree
  {
    id: "serialize-deserialize-binary-tree",
    title: "Serialize and Deserialize Binary Tree",
    text: "Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.\n\nDesign an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.\n\n**Example 1:**\nInput: root = [1,2,3,null,null,4,5]\nOutput: [1,2,3,null,null,4,5]\n\n**Example 2:**\nInput: root = []\nOutput: []",
    implementations: [
      {
        language: "python",
        starterCode:
          '# Definition for a binary tree node.\n# class TreeNode(object):\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\nclass Codec:\n\n    def serialize(self, root):\n        """Encodes a tree to a single string.\n        \n        :type root: TreeNode\n        :rtype: str\n        """\n        # Your code here\n        pass\n        \n\n    def deserialize(self, data):\n        """Decodes your encoded data to tree.\n        \n        :type data: str\n        :rtype: TreeNode\n        """\n        # Your code here\n        pass\n\n# Your Codec object will be instantiated and called as such:\n# ser = Codec()\n# deser = Codec()\n# ans = deser.deserialize(ser.serialize(root))',
        solutionCode:
          '# Definition for a binary tree node.\n# class TreeNode(object):\n#     def __init__(self, x):\n#         self.val = x\n#         self.left = None\n#         self.right = None\n\nclass Codec:\n\n    def serialize(self, root):\n        """Encodes a tree to a single string.\n        \n        :type root: TreeNode\n        :rtype: str\n        """\n        def preorder(node):\n            if not node:\n                vals.append(\'null\')\n            else:\n                vals.append(str(node.val))\n                preorder(node.left)\n                preorder(node.right)\n        \n        vals = []\n        preorder(root)\n        return \',\'.join(vals)\n        \n\n    def deserialize(self, data):\n        """Decodes your encoded data to tree.\n        \n        :type data: str\n        :rtype: TreeNode\n        """\n        def build():\n            val = next(vals)\n            if val == \'null\':\n                return None\n            node = TreeNode(int(val))\n            node.left = build()\n            node.right = build()\n            return node\n        \n        vals = iter(data.split(\',\'))\n        return build()\n\n# Your Codec object will be instantiated and called as such:\n# ser = Codec()\n# deser = Codec()\n# ans = deser.deserialize(ser.serialize(root))',
        testCases: [
          {
            input: "[1,2,3,null,null,4,5]",
            expected_output: "[1,2,3,null,null,4,5]",
            weight: 0.5,
            description: "Standard binary tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty tree",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.25,
            description: "Single node tree",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n\n/**\n * Encodes a tree to a single string.\n *\n * @param {TreeNode} root\n * @return {string}\n */\nvar serialize = function(root) {\n    // Your code here\n};\n\n/**\n * Decodes your encoded data to tree.\n *\n * @param {string} data\n * @return {TreeNode}\n */\nvar deserialize = function(data) {\n    // Your code here\n};\n\n/**\n * Your functions will be called as such:\n * deserialize(serialize(root));\n */",
        solutionCode:
          "/**\n * Definition for a binary tree node.\n * function TreeNode(val) {\n *     this.val = val;\n *     this.left = this.right = null;\n * }\n */\n\n/**\n * Encodes a tree to a single string.\n *\n * @param {TreeNode} root\n * @return {string}\n */\nvar serialize = function(root) {\n    const vals = [];\n    \n    function preorder(node) {\n        if (!node) {\n            vals.push('null');\n        } else {\n            vals.push(node.val.toString());\n            preorder(node.left);\n            preorder(node.right);\n        }\n    }\n    \n    preorder(root);\n    return vals.join(',');\n};\n\n/**\n * Decodes your encoded data to tree.\n *\n * @param {string} data\n * @return {TreeNode}\n */\nvar deserialize = function(data) {\n    const vals = data.split(',');\n    let index = 0;\n    \n    function build() {\n        const val = vals[index++];\n        if (val === 'null') {\n            return null;\n        }\n        const node = new TreeNode(parseInt(val));\n        node.left = build();\n        node.right = build();\n        return node;\n    }\n    \n    return build();\n};\n\n/**\n * Your functions will be called as such:\n * deserialize(serialize(root));\n */",
        testCases: [
          {
            input: "[1,2,3,null,null,4,5]",
            expected_output: "[1,2,3,null,null,4,5]",
            weight: 0.5,
            description: "Standard binary tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty tree",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.25,
            description: "Single node tree",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          '/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode(int x) { val = x; }\n * }\n */\npublic class Codec {\n\n    // Encodes a tree to a single string.\n    public String serialize(TreeNode root) {\n        // Your code here\n        return "";\n    }\n\n    // Decodes your encoded data to tree.\n    public TreeNode deserialize(String data) {\n        // Your code here\n        return null;\n    }\n}\n\n// Your Codec object will be instantiated and called as such:\n// Codec ser = new Codec();\n// Codec deser = new Codec();\n// TreeNode ans = deser.deserialize(ser.serialize(root));',
        solutionCode:
          '/**\n * Definition for a binary tree node.\n * public class TreeNode {\n *     int val;\n *     TreeNode left;\n *     TreeNode right;\n *     TreeNode(int x) { val = x; }\n * }\n */\npublic class Codec {\n\n    // Encodes a tree to a single string.\n    public String serialize(TreeNode root) {\n        StringBuilder sb = new StringBuilder();\n        serializeHelper(root, sb);\n        return sb.toString();\n    }\n    \n    private void serializeHelper(TreeNode node, StringBuilder sb) {\n        if (node == null) {\n            sb.append("null,");\n        } else {\n            sb.append(node.val).append(",");\n            serializeHelper(node.left, sb);\n            serializeHelper(node.right, sb);\n        }\n    }\n\n    // Decodes your encoded data to tree.\n    public TreeNode deserialize(String data) {\n        Queue<String> queue = new LinkedList<>(Arrays.asList(data.split(",")));\n        return deserializeHelper(queue);\n    }\n    \n    private TreeNode deserializeHelper(Queue<String> queue) {\n        String val = queue.poll();\n        if ("null".equals(val)) {\n            return null;\n        }\n        TreeNode node = new TreeNode(Integer.parseInt(val));\n        node.left = deserializeHelper(queue);\n        node.right = deserializeHelper(queue);\n        return node;\n    }\n}\n\n// Your Codec object will be instantiated and called as such:\n// Codec ser = new Codec();\n// Codec deser = new Codec();\n// TreeNode ans = deser.deserialize(ser.serialize(root));',
        testCases: [
          {
            input: "[1,2,3,null,null,4,5]",
            expected_output: "[1,2,3,null,null,4,5]",
            weight: 0.5,
            description: "Standard binary tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty tree",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.25,
            description: "Single node tree",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          '/**\n * Definition for a binary tree node.\n * type TreeNode struct {\n *     Val int\n *     Left *TreeNode\n *     Right *TreeNode\n * }\n */\n\ntype Codec struct {\n    \n}\n\nfunc Constructor() Codec {\n    return Codec{}\n}\n\n// Serializes a tree to a single string.\nfunc (this *Codec) serialize(root *TreeNode) string {\n    // Your code here\n    return ""\n}\n\n// Deserializes your encoded data to tree.\nfunc (this *Codec) deserialize(data string) *TreeNode {    \n    // Your code here\n    return nil\n}\n\n\n/**\n * Your Codec object will be instantiated and called as such:\n * ser := Constructor();\n * deser := Constructor();\n * data := ser.serialize(root);\n * ans := deser.deserialize(data);\n */',
        solutionCode:
          '/**\n * Definition for a binary tree node.\n * type TreeNode struct {\n *     Val int\n *     Left *TreeNode\n *     Right *TreeNode\n * }\n */\n\ntype Codec struct {\n    \n}\n\nfunc Constructor() Codec {\n    return Codec{}\n}\n\n// Serializes a tree to a single string.\nfunc (this *Codec) serialize(root *TreeNode) string {\n    var vals []string\n    \n    var preorder func(*TreeNode)\n    preorder = func(node *TreeNode) {\n        if node == nil {\n            vals = append(vals, "null")\n        } else {\n            vals = append(vals, strconv.Itoa(node.Val))\n            preorder(node.Left)\n            preorder(node.Right)\n        }\n    }\n    \n    preorder(root)\n    return strings.Join(vals, ",")\n}\n\n// Deserializes your encoded data to tree.\nfunc (this *Codec) deserialize(data string) *TreeNode {    \n    vals := strings.Split(data, ",")\n    index := 0\n    \n    var build func() *TreeNode\n    build = func() *TreeNode {\n        if index >= len(vals) || vals[index] == "null" {\n            index++\n            return nil\n        }\n        val, _ := strconv.Atoi(vals[index])\n        index++\n        node := &TreeNode{Val: val}\n        node.Left = build()\n        node.Right = build()\n        return node\n    }\n    \n    return build()\n}\n\n\n/**\n * Your Codec object will be instantiated and called as such:\n * ser := Constructor();\n * deser := Constructor();\n * data := ser.serialize(root);\n * ans := deser.deserialize(data);\n */',
        testCases: [
          {
            input: "[1,2,3,null,null,4,5]",
            expected_output: "[1,2,3,null,null,4,5]",
            weight: 0.5,
            description: "Standard binary tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty tree",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.25,
            description: "Single node tree",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# Definition for a binary tree node.\n# class TreeNode\n#     attr_accessor :val, :left, :right\n#     def initialize(val)\n#         @val = val\n#         @left, @right = nil, nil\n#     end\n# end\n\n# Encodes a tree to a single string.\n#\n# @param {TreeNode} root\n# @return {String}\ndef serialize(root)\n    # Your code here\nend\n\n# Decodes your encoded data to tree.\n#\n# @param {String} data\n# @return {TreeNode}\ndef deserialize(data)\n    # Your code here\nend\n\n\n# Your functions will be called as such:\n# deserialize(serialize(root))",
        solutionCode:
          "# Definition for a binary tree node.\n# class TreeNode\n#     attr_accessor :val, :left, :right\n#     def initialize(val)\n#         @val = val\n#         @left, @right = nil, nil\n#     end\n# end\n\n# Encodes a tree to a single string.\n#\n# @param {TreeNode} root\n# @return {String}\ndef serialize(root)\n    vals = []\n    \n    def preorder(node, vals)\n        if node.nil?\n            vals << 'null'\n        else\n            vals << node.val.to_s\n            preorder(node.left, vals)\n            preorder(node.right, vals)\n        end\n    end\n    \n    preorder(root, vals)\n    vals.join(',')\nend\n\n# Decodes your encoded data to tree.\n#\n# @param {String} data\n# @return {TreeNode}\ndef deserialize(data)\n    vals = data.split(',')\n    index = 0\n    \n    def build(vals, index)\n        return [nil, index] if index[0] >= vals.length || vals[index[0]] == 'null'\n        \n        val = vals[index[0]].to_i\n        index[0] += 1\n        node = TreeNode.new(val)\n        \n        node.left, index = build(vals, index)\n        node.right, index = build(vals, index)\n        \n        [node, index]\n    end\n    \n    result, _ = build(vals, [0])\n    result\nend\n\n\n# Your functions will be called as such:\n# deserialize(serialize(root))",
        testCases: [
          {
            input: "[1,2,3,null,null,4,5]",
            expected_output: "[1,2,3,null,null,4,5]",
            weight: 0.5,
            description: "Standard binary tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty tree",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.25,
            description: "Single node tree",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          '/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Codec {\npublic:\n\n    // Encodes a tree to a single string.\n    string serialize(TreeNode* root) {\n        // Your code here\n        return "";\n    }\n\n    // Decodes your encoded data to tree.\n    TreeNode* deserialize(string data) {\n        // Your code here\n        return nullptr;\n    }\n};\n\n// Your Codec object will be instantiated and called as such:\n// Codec ser, deser;\n// TreeNode* ans = deser.deserialize(ser.serialize(root));',
        solutionCode:
          '/**\n * Definition for a binary tree node.\n * struct TreeNode {\n *     int val;\n *     TreeNode *left;\n *     TreeNode *right;\n *     TreeNode(int x) : val(x), left(NULL), right(NULL) {}\n * };\n */\nclass Codec {\npublic:\n\n    // Encodes a tree to a single string.\n    string serialize(TreeNode* root) {\n        string result;\n        serializeHelper(root, result);\n        return result;\n    }\n    \n    void serializeHelper(TreeNode* node, string& result) {\n        if (!node) {\n            result += "null,";\n        } else {\n            result += to_string(node->val) + ",";\n            serializeHelper(node->left, result);\n            serializeHelper(node->right, result);\n        }\n    }\n\n    // Decodes your encoded data to tree.\n    TreeNode* deserialize(string data) {\n        istringstream iss(data);\n        return deserializeHelper(iss);\n    }\n    \n    TreeNode* deserializeHelper(istringstream& iss) {\n        string val;\n        getline(iss, val, \',\');\n        if (val == "null") {\n            return nullptr;\n        }\n        TreeNode* node = new TreeNode(stoi(val));\n        node->left = deserializeHelper(iss);\n        node->right = deserializeHelper(iss);\n        return node;\n    }\n};\n\n// Your Codec object will be instantiated and called as such:\n// Codec ser, deser;\n// TreeNode* ans = deser.deserialize(ser.serialize(root));',
        testCases: [
          {
            input: "[1,2,3,null,null,4,5]",
            expected_output: "[1,2,3,null,null,4,5]",
            weight: 0.5,
            description: "Standard binary tree",
          },
          {
            input: "[]",
            expected_output: "[]",
            weight: 0.25,
            description: "Empty tree",
          },
          {
            input: "[1]",
            expected_output: "[1]",
            weight: 0.25,
            description: "Single node tree",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      constraints: [
        "The number of nodes in the tree is in the range [0, 10^4]",
        "-1000 <= Node.val <= 1000",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 45,
      tags: [
        "tree",
        "depth-first-search",
        "breadth-first-search",
        "design",
        "string",
        "binary-tree",
      ],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Trees & Graphs",
    },
  },

  // Dynamic Programming - Easy: Climbing Stairs
  {
    id: "climbing-stairs",
    title: "Climbing Stairs",
    text: "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?\n\n**Example 1:**\nInput: n = 2\nOutput: 2\nExplanation: There are two ways to climb to the top.\n1. 1 step + 1 step\n2. 2 steps\n\n**Example 2:**\nInput: n = 3\nOutput: 3\nExplanation: There are three ways to climb to the top.\n1. 1 step + 1 step + 1 step\n2. 1 step + 2 steps\n3. 2 steps + 1 step",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def climbStairs(self, n):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def climbStairs(self, n):\n        if n <= 2:\n            return n\n        \n        # dp[i] represents number of ways to reach step i\n        prev2 = 1  # dp[0] = 1\n        prev1 = 2  # dp[1] = 2\n        \n        for i in range(3, n + 1):\n            current = prev1 + prev2\n            prev2 = prev1\n            prev1 = current\n        \n        return prev1",
        testCases: [
          {
            input: "2",
            expected_output: "2",
            weight: 0.25,
            description: "Two steps",
          },
          {
            input: "3",
            expected_output: "3",
            weight: 0.25,
            description: "Three steps",
          },
          {
            input: "4",
            expected_output: "5",
            weight: 0.25,
            description: "Four steps",
          },
          {
            input: "1",
            expected_output: "1",
            weight: 0.25,
            description: "Single step",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(n) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number} n\n * @return {number}\n */\nvar climbStairs = function(n) {\n    if (n <= 2) {\n        return n;\n    }\n    \n    let prev2 = 1; // dp[0] = 1\n    let prev1 = 2; // dp[1] = 2\n    \n    for (let i = 3; i <= n; i++) {\n        const current = prev1 + prev2;\n        prev2 = prev1;\n        prev1 = current;\n    }\n    \n    return prev1;\n};",
        testCases: [
          {
            input: "2",
            expected_output: "2",
            weight: 0.25,
            description: "Two steps",
          },
          {
            input: "3",
            expected_output: "3",
            weight: 0.25,
            description: "Three steps",
          },
          {
            input: "4",
            expected_output: "5",
            weight: 0.25,
            description: "Four steps",
          },
          {
            input: "1",
            expected_output: "1",
            weight: 0.25,
            description: "Single step",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int climbStairs(int n) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int climbStairs(int n) {\n        if (n <= 2) {\n            return n;\n        }\n        \n        int prev2 = 1; // dp[0] = 1\n        int prev1 = 2; // dp[1] = 2\n        \n        for (int i = 3; i <= n; i++) {\n            int current = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = current;\n        }\n        \n        return prev1;\n    }\n}",
        testCases: [
          {
            input: "2",
            expected_output: "2",
            weight: 0.25,
            description: "Two steps",
          },
          {
            input: "3",
            expected_output: "3",
            weight: 0.25,
            description: "Three steps",
          },
          {
            input: "4",
            expected_output: "5",
            weight: 0.25,
            description: "Four steps",
          },
          {
            input: "1",
            expected_output: "1",
            weight: 0.25,
            description: "Single step",
          },
        ],
      },
      {
        language: "go",
        starterCode: "func climbStairs(n int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func climbStairs(n int) int {\n    if n <= 2 {\n        return n\n    }\n    \n    prev2 := 1 // dp[0] = 1\n    prev1 := 2 // dp[1] = 2\n    \n    for i := 3; i <= n; i++ {\n        current := prev1 + prev2\n        prev2 = prev1\n        prev1 = current\n    }\n    \n    return prev1\n}",
        testCases: [
          {
            input: "2",
            expected_output: "2",
            weight: 0.25,
            description: "Two steps",
          },
          {
            input: "3",
            expected_output: "3",
            weight: 0.25,
            description: "Three steps",
          },
          {
            input: "4",
            expected_output: "5",
            weight: 0.25,
            description: "Four steps",
          },
          {
            input: "1",
            expected_output: "1",
            weight: 0.25,
            description: "Single step",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer} n\n# @return {Integer}\ndef climb_stairs(n)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer} n\n# @return {Integer}\ndef climb_stairs(n)\n    return n if n <= 2\n    \n    prev2 = 1  # dp[0] = 1\n    prev1 = 2  # dp[1] = 2\n    \n    (3..n).each do |i|\n        current = prev1 + prev2\n        prev2 = prev1\n        prev1 = current\n    end\n    \n    prev1\nend",
        testCases: [
          {
            input: "2",
            expected_output: "2",
            weight: 0.25,
            description: "Two steps",
          },
          {
            input: "3",
            expected_output: "3",
            weight: 0.25,
            description: "Three steps",
          },
          {
            input: "4",
            expected_output: "5",
            weight: 0.25,
            description: "Four steps",
          },
          {
            input: "1",
            expected_output: "1",
            weight: 0.25,
            description: "Single step",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int climbStairs(int n) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int climbStairs(int n) {\n        if (n <= 2) {\n            return n;\n        }\n        \n        int prev2 = 1; // dp[0] = 1\n        int prev1 = 2; // dp[1] = 2\n        \n        for (int i = 3; i <= n; i++) {\n            int current = prev1 + prev2;\n            prev2 = prev1;\n            prev1 = current;\n        }\n        \n        return prev1;\n    }\n};",
        testCases: [
          {
            input: "2",
            expected_output: "2",
            weight: 0.25,
            description: "Two steps",
          },
          {
            input: "3",
            expected_output: "3",
            weight: 0.25,
            description: "Three steps",
          },
          {
            input: "4",
            expected_output: "5",
            weight: 0.25,
            description: "Four steps",
          },
          {
            input: "1",
            expected_output: "1",
            weight: 0.25,
            description: "Single step",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      constraints: ["1 <= n <= 45"],
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
      tags: ["math", "dynamic-programming", "memoization"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Dynamic Programming",
    },
  },

  // Dynamic Programming - Medium: Coin Change
  {
    id: "coin-change",
    title: "Coin Change",
    text: "You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money. Return the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.\n\n**Example 1:**\nInput: coins = [1,3,4], amount = 6\nOutput: 2\nExplanation: 6 = 3 + 3\n\n**Example 2:**\nInput: coins = [2], amount = 3\nOutput: -1\n\n**Example 3:**\nInput: coins = [1], amount = 0\nOutput: 0",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def coinChange(self, coins, amount):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def coinChange(self, coins, amount):\n        # dp[i] represents minimum coins needed for amount i\n        dp = [float('inf')] * (amount + 1)\n        dp[0] = 0\n        \n        for i in range(1, amount + 1):\n            for coin in coins:\n                if coin <= i:\n                    dp[i] = min(dp[i], dp[i - coin] + 1)\n        \n        return dp[amount] if dp[amount] != float('inf') else -1",
        testCases: [
          {
            input: "[1,3,4], 6",
            expected_output: "2",
            weight: 0.4,
            description: "Standard coin change",
          },
          {
            input: "[2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Impossible amount",
          },
          {
            input: "[1], 0",
            expected_output: "0",
            weight: 0.3,
            description: "Zero amount",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nvar coinChange = function(coins, amount) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} coins\n * @param {number} amount\n * @return {number}\n */\nvar coinChange = function(coins, amount) {\n    // dp[i] represents minimum coins needed for amount i\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    \n    for (let i = 1; i <= amount; i++) {\n        for (const coin of coins) {\n            if (coin <= i) {\n                dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n            }\n        }\n    }\n    \n    return dp[amount] === Infinity ? -1 : dp[amount];\n};",
        testCases: [
          {
            input: "[1,3,4], 6",
            expected_output: "2",
            weight: 0.4,
            description: "Standard coin change",
          },
          {
            input: "[2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Impossible amount",
          },
          {
            input: "[1], 0",
            expected_output: "0",
            weight: 0.3,
            description: "Zero amount",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int coinChange(int[] coins, int amount) {\n        // dp[i] represents minimum coins needed for amount i\n        int[] dp = new int[amount + 1];\n        Arrays.fill(dp, Integer.MAX_VALUE);\n        dp[0] = 0;\n        \n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i && dp[i - coin] != Integer.MAX_VALUE) {\n                    dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        \n        return dp[amount] == Integer.MAX_VALUE ? -1 : dp[amount];\n    }\n}",
        testCases: [
          {
            input: "[1,3,4], 6",
            expected_output: "2",
            weight: 0.4,
            description: "Standard coin change",
          },
          {
            input: "[2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Impossible amount",
          },
          {
            input: "[1], 0",
            expected_output: "0",
            weight: 0.3,
            description: "Zero amount",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func coinChange(coins []int, amount int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func coinChange(coins []int, amount int) int {\n    // dp[i] represents minimum coins needed for amount i\n    dp := make([]int, amount+1)\n    for i := 1; i <= amount; i++ {\n        dp[i] = amount + 1 // Initialize with impossible value\n    }\n    \n    for i := 1; i <= amount; i++ {\n        for _, coin := range coins {\n            if coin <= i {\n                if dp[i-coin]+1 < dp[i] {\n                    dp[i] = dp[i-coin] + 1\n                }\n            }\n        }\n    }\n    \n    if dp[amount] > amount {\n        return -1\n    }\n    return dp[amount]\n}",
        testCases: [
          {
            input: "[1,3,4], 6",
            expected_output: "2",
            weight: 0.4,
            description: "Standard coin change",
          },
          {
            input: "[2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Impossible amount",
          },
          {
            input: "[1], 0",
            expected_output: "0",
            weight: 0.3,
            description: "Zero amount",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} coins\n# @param {Integer} amount\n# @return {Integer}\ndef coin_change(coins, amount)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} coins\n# @param {Integer} amount\n# @return {Integer}\ndef coin_change(coins, amount)\n    # dp[i] represents minimum coins needed for amount i\n    dp = Array.new(amount + 1, Float::INFINITY)\n    dp[0] = 0\n    \n    (1..amount).each do |i|\n        coins.each do |coin|\n            if coin <= i\n                dp[i] = [dp[i], dp[i - coin] + 1].min\n            end\n        end\n    end\n    \n    dp[amount] == Float::INFINITY ? -1 : dp[amount]\nend",
        testCases: [
          {
            input: "[1,3,4], 6",
            expected_output: "2",
            weight: 0.4,
            description: "Standard coin change",
          },
          {
            input: "[2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Impossible amount",
          },
          {
            input: "[1], 0",
            expected_output: "0",
            weight: 0.3,
            description: "Zero amount",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int coinChange(vector<int>& coins, int amount) {\n        // dp[i] represents minimum coins needed for amount i\n        vector<int> dp(amount + 1, INT_MAX);\n        dp[0] = 0;\n        \n        for (int i = 1; i <= amount; i++) {\n            for (int coin : coins) {\n                if (coin <= i && dp[i - coin] != INT_MAX) {\n                    dp[i] = min(dp[i], dp[i - coin] + 1);\n                }\n            }\n        }\n        \n        return dp[amount] == INT_MAX ? -1 : dp[amount];\n    }\n};",
        testCases: [
          {
            input: "[1,3,4], 6",
            expected_output: "2",
            weight: 0.4,
            description: "Standard coin change",
          },
          {
            input: "[2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Impossible amount",
          },
          {
            input: "[1], 0",
            expected_output: "0",
            weight: 0.3,
            description: "Zero amount",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(amount * coins.length)",
      spaceComplexity: "O(amount)",
      constraints: ["1 <= coins.length <= 12", "1 <= coins[i] <= 2^31 - 1", "0 <= amount <= 10^4"],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 25,
      tags: ["array", "dynamic-programming", "breadth-first-search"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Uber"],
      topic: "Dynamic Programming",
    },
  },

  // Dynamic Programming - Hard: Edit Distance
  {
    id: "edit-distance",
    title: "Edit Distance",
    text: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2. You have the following three operations permitted on a word:\n\n- Insert a character\n- Delete a character\n- Replace a character\n\n**Example 1:**\nInput: word1 = \"horse\", word2 = \"ros\"\nOutput: 3\nExplanation:\nhorse -> rorse (replace 'h' with 'r')\nrorse -> rose (remove 'r')\nrose -> ros (remove 'e')\n\n**Example 2:**\nInput: word1 = \"intention\", word2 = \"execution\"\nOutput: 5\nExplanation:\nintention -> inention (remove 't')\ninention -> enention (replace 'i' with 'e')\nenention -> exention (replace 'n' with 'x')\nexention -> exection (replace 'n' with 'c')\nexection -> execution (insert 'u')",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def minDistance(self, word1, word2):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def minDistance(self, word1, word2):\n        m, n = len(word1), len(word2)\n        \n        # dp[i][j] represents min operations to convert word1[:i] to word2[:j]\n        dp = [[0] * (n + 1) for _ in range(m + 1)]\n        \n        # Initialize base cases\n        for i in range(m + 1):\n            dp[i][0] = i  # Delete all characters from word1\n        for j in range(n + 1):\n            dp[0][j] = j  # Insert all characters to match word2\n        \n        # Fill the dp table\n        for i in range(1, m + 1):\n            for j in range(1, n + 1):\n                if word1[i-1] == word2[j-1]:\n                    dp[i][j] = dp[i-1][j-1]  # No operation needed\n                else:\n                    dp[i][j] = 1 + min(\n                        dp[i-1][j],    # Delete\n                        dp[i][j-1],    # Insert\n                        dp[i-1][j-1]   # Replace\n                    )\n        \n        return dp[m][n]",
        testCases: [
          {
            input: '"horse", "ros"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard edit distance",
          },
          {
            input: '"intention", "execution"',
            expected_output: "5",
            weight: 0.4,
            description: "Complex transformation",
          },
          {
            input: '"", "abc"',
            expected_output: "3",
            weight: 0.2,
            description: "Empty to non-empty",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {string} word1\n * @param {string} word2\n * @return {number}\n */\nvar minDistance = function(word1, word2) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {string} word1\n * @param {string} word2\n * @return {number}\n */\nvar minDistance = function(word1, word2) {\n    const m = word1.length, n = word2.length;\n    \n    // dp[i][j] represents min operations to convert word1[:i] to word2[:j]\n    const dp = Array(m + 1).fill().map(() => Array(n + 1).fill(0));\n    \n    // Initialize base cases\n    for (let i = 0; i <= m; i++) {\n        dp[i][0] = i; // Delete all characters from word1\n    }\n    for (let j = 0; j <= n; j++) {\n        dp[0][j] = j; // Insert all characters to match word2\n    }\n    \n    // Fill the dp table\n    for (let i = 1; i <= m; i++) {\n        for (let j = 1; j <= n; j++) {\n            if (word1[i-1] === word2[j-1]) {\n                dp[i][j] = dp[i-1][j-1]; // No operation needed\n            } else {\n                dp[i][j] = 1 + Math.min(\n                    dp[i-1][j],    // Delete\n                    dp[i][j-1],    // Insert\n                    dp[i-1][j-1]   // Replace\n                );\n            }\n        }\n    }\n    \n    return dp[m][n];\n};",
        testCases: [
          {
            input: '"horse", "ros"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard edit distance",
          },
          {
            input: '"intention", "execution"',
            expected_output: "5",
            weight: 0.4,
            description: "Complex transformation",
          },
          {
            input: '"", "abc"',
            expected_output: "3",
            weight: 0.2,
            description: "Empty to non-empty",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int minDistance(String word1, String word2) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int minDistance(String word1, String word2) {\n        int m = word1.length(), n = word2.length();\n        \n        // dp[i][j] represents min operations to convert word1[:i] to word2[:j]\n        int[][] dp = new int[m + 1][n + 1];\n        \n        // Initialize base cases\n        for (int i = 0; i <= m; i++) {\n            dp[i][0] = i; // Delete all characters from word1\n        }\n        for (int j = 0; j <= n; j++) {\n            dp[0][j] = j; // Insert all characters to match word2\n        }\n        \n        // Fill the dp table\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1.charAt(i-1) == word2.charAt(j-1)) {\n                    dp[i][j] = dp[i-1][j-1]; // No operation needed\n                } else {\n                    dp[i][j] = 1 + Math.min(\n                        Math.min(dp[i-1][j], dp[i][j-1]), // Delete or Insert\n                        dp[i-1][j-1] // Replace\n                    );\n                }\n            }\n        }\n        \n        return dp[m][n];\n    }\n}",
        testCases: [
          {
            input: '"horse", "ros"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard edit distance",
          },
          {
            input: '"intention", "execution"',
            expected_output: "5",
            weight: 0.4,
            description: "Complex transformation",
          },
          {
            input: '"", "abc"',
            expected_output: "3",
            weight: 0.2,
            description: "Empty to non-empty",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func minDistance(word1 string, word2 string) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func minDistance(word1 string, word2 string) int {\n    m, n := len(word1), len(word2)\n    \n    // dp[i][j] represents min operations to convert word1[:i] to word2[:j]\n    dp := make([][]int, m+1)\n    for i := range dp {\n        dp[i] = make([]int, n+1)\n    }\n    \n    // Initialize base cases\n    for i := 0; i <= m; i++ {\n        dp[i][0] = i // Delete all characters from word1\n    }\n    for j := 0; j <= n; j++ {\n        dp[0][j] = j // Insert all characters to match word2\n    }\n    \n    // Fill the dp table\n    for i := 1; i <= m; i++ {\n        for j := 1; j <= n; j++ {\n            if word1[i-1] == word2[j-1] {\n                dp[i][j] = dp[i-1][j-1] // No operation needed\n            } else {\n                dp[i][j] = 1 + min(min(dp[i-1][j], dp[i][j-1]), dp[i-1][j-1])\n            }\n        }\n    }\n    \n    return dp[m][n]\n}\n\nfunc min(a, b int) int {\n    if a < b {\n        return a\n    }\n    return b\n}",
        testCases: [
          {
            input: '"horse", "ros"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard edit distance",
          },
          {
            input: '"intention", "execution"',
            expected_output: "5",
            weight: 0.4,
            description: "Complex transformation",
          },
          {
            input: '"", "abc"',
            expected_output: "3",
            weight: 0.2,
            description: "Empty to non-empty",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {String} word1\n# @param {String} word2\n# @return {Integer}\ndef min_distance(word1, word2)\n    # Your code here\nend",
        solutionCode:
          "# @param {String} word1\n# @param {String} word2\n# @return {Integer}\ndef min_distance(word1, word2)\n    m, n = word1.length, word2.length\n    \n    # dp[i][j] represents min operations to convert word1[:i] to word2[:j]\n    dp = Array.new(m + 1) { Array.new(n + 1, 0) }\n    \n    # Initialize base cases\n    (0..m).each { |i| dp[i][0] = i } # Delete all characters from word1\n    (0..n).each { |j| dp[0][j] = j } # Insert all characters to match word2\n    \n    # Fill the dp table\n    (1..m).each do |i|\n        (1..n).each do |j|\n            if word1[i-1] == word2[j-1]\n                dp[i][j] = dp[i-1][j-1] # No operation needed\n            else\n                dp[i][j] = 1 + [dp[i-1][j], dp[i][j-1], dp[i-1][j-1]].min\n            end\n        end\n    end\n    \n    dp[m][n]\nend",
        testCases: [
          {
            input: '"horse", "ros"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard edit distance",
          },
          {
            input: '"intention", "execution"',
            expected_output: "5",
            weight: 0.4,
            description: "Complex transformation",
          },
          {
            input: '"", "abc"',
            expected_output: "3",
            weight: 0.2,
            description: "Empty to non-empty",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int minDistance(string word1, string word2) {\n        int m = word1.length(), n = word2.length();\n        \n        // dp[i][j] represents min operations to convert word1[:i] to word2[:j]\n        vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));\n        \n        // Initialize base cases\n        for (int i = 0; i <= m; i++) {\n            dp[i][0] = i; // Delete all characters from word1\n        }\n        for (int j = 0; j <= n; j++) {\n            dp[0][j] = j; // Insert all characters to match word2\n        }\n        \n        // Fill the dp table\n        for (int i = 1; i <= m; i++) {\n            for (int j = 1; j <= n; j++) {\n                if (word1[i-1] == word2[j-1]) {\n                    dp[i][j] = dp[i-1][j-1]; // No operation needed\n                } else {\n                    dp[i][j] = 1 + min({\n                        dp[i-1][j],    // Delete\n                        dp[i][j-1],    // Insert\n                        dp[i-1][j-1]   // Replace\n                    });\n                }\n            }\n        }\n        \n        return dp[m][n];\n    }\n};",
        testCases: [
          {
            input: '"horse", "ros"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard edit distance",
          },
          {
            input: '"intention", "execution"',
            expected_output: "5",
            weight: 0.4,
            description: "Complex transformation",
          },
          {
            input: '"", "abc"',
            expected_output: "3",
            weight: 0.2,
            description: "Empty to non-empty",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(m * n)",
      constraints: [
        "0 <= word1.length, word2.length <= 500",
        "word1 and word2 consist of lowercase English letters",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 40,
      tags: ["string", "dynamic-programming"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Dynamic Programming",
    },
  },

  // Sorting & Searching - Easy: Binary Search
  {
    id: "binary-search",
    title: "Binary Search",
    text: "Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\n**Example 1:**\nInput: nums = [-1,0,3,5,9,12], target = 9\nOutput: 4\nExplanation: 9 exists in nums and its index is 4\n\n**Example 2:**\nInput: nums = [-1,0,3,5,9,12], target = 2\nOutput: -1\nExplanation: 2 does not exist in nums so return -1",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def search(self, nums, target):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def search(self, nums, target):\n        left, right = 0, len(nums) - 1\n        \n        while left <= right:\n            mid = left + (right - left) // 2\n            \n            if nums[mid] == target:\n                return mid\n            elif nums[mid] < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        \n        return -1",
        testCases: [
          {
            input: "[-1,0,3,5,9,12], 9",
            expected_output: "4",
            weight: 0.3,
            description: "Target found in middle",
          },
          {
            input: "[-1,0,3,5,9,12], 2",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[5], 5",
            expected_output: "0",
            weight: 0.2,
            description: "Single element array",
          },
          {
            input: "[2,5], 0",
            expected_output: "-1",
            weight: 0.2,
            description: "Target smaller than all",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    let left = 0, right = nums.length - 1;\n    \n    while (left <= right) {\n        const mid = left + Math.floor((right - left) / 2);\n        \n        if (nums[mid] === target) {\n            return mid;\n        } else if (nums[mid] < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    \n    return -1;\n};",
        testCases: [
          {
            input: "[-1,0,3,5,9,12], 9",
            expected_output: "4",
            weight: 0.3,
            description: "Target found in middle",
          },
          {
            input: "[-1,0,3,5,9,12], 2",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[5], 5",
            expected_output: "0",
            weight: 0.2,
            description: "Single element array",
          },
          {
            input: "[2,5], 0",
            expected_output: "-1",
            weight: 0.2,
            description: "Target smaller than all",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] == target) {\n                return mid;\n            } else if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        \n        return -1;\n    }\n}",
        testCases: [
          {
            input: "[-1,0,3,5,9,12], 9",
            expected_output: "4",
            weight: 0.3,
            description: "Target found in middle",
          },
          {
            input: "[-1,0,3,5,9,12], 2",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[5], 5",
            expected_output: "0",
            weight: 0.2,
            description: "Single element array",
          },
          {
            input: "[2,5], 0",
            expected_output: "-1",
            weight: 0.2,
            description: "Target smaller than all",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func search(nums []int, target int) int {\n    // Your code here\n    return -1\n}",
        solutionCode:
          "func search(nums []int, target int) int {\n    left, right := 0, len(nums)-1\n    \n    for left <= right {\n        mid := left + (right-left)/2\n        \n        if nums[mid] == target {\n            return mid\n        } else if nums[mid] < target {\n            left = mid + 1\n        } else {\n            right = mid - 1\n        }\n    }\n    \n    return -1\n}",
        testCases: [
          {
            input: "[-1,0,3,5,9,12], 9",
            expected_output: "4",
            weight: 0.3,
            description: "Target found in middle",
          },
          {
            input: "[-1,0,3,5,9,12], 2",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[5], 5",
            expected_output: "0",
            weight: 0.2,
            description: "Single element array",
          },
          {
            input: "[2,5], 0",
            expected_output: "-1",
            weight: 0.2,
            description: "Target smaller than all",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums\n# @param {Integer} target\n# @return {Integer}\ndef search(nums, target)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums\n# @param {Integer} target\n# @return {Integer}\ndef search(nums, target)\n    left, right = 0, nums.length - 1\n    \n    while left <= right\n        mid = left + (right - left) / 2\n        \n        if nums[mid] == target\n            return mid\n        elsif nums[mid] < target\n            left = mid + 1\n        else\n            right = mid - 1\n        end\n    end\n    \n    -1\nend",
        testCases: [
          {
            input: "[-1,0,3,5,9,12], 9",
            expected_output: "4",
            weight: 0.3,
            description: "Target found in middle",
          },
          {
            input: "[-1,0,3,5,9,12], 2",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[5], 5",
            expected_output: "0",
            weight: 0.2,
            description: "Single element array",
          },
          {
            input: "[2,5], 0",
            expected_output: "-1",
            weight: 0.2,
            description: "Target smaller than all",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Your code here\n        return -1;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int left = 0, right = nums.size() - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] == target) {\n                return mid;\n            } else if (nums[mid] < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        \n        return -1;\n    }\n};",
        testCases: [
          {
            input: "[-1,0,3,5,9,12], 9",
            expected_output: "4",
            weight: 0.3,
            description: "Target found in middle",
          },
          {
            input: "[-1,0,3,5,9,12], 2",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[5], 5",
            expected_output: "0",
            weight: 0.2,
            description: "Single element array",
          },
          {
            input: "[2,5], 0",
            expected_output: "-1",
            weight: 0.2,
            description: "Target smaller than all",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      constraints: [
        "1 <= nums.length <= 10^4",
        "-10^4 < nums[i], target < 10^4",
        "All the integers in nums are unique",
        "nums is sorted in ascending order",
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
      tags: ["array", "binary-search"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Sorting & Searching",
    },
  },

  // Sorting & Searching - Medium: Search in Rotated Sorted Array
  {
    id: "search-rotated-sorted-array",
    title: "Search in Rotated Sorted Array",
    text: "There is an integer array nums sorted in ascending order (with distinct values). Prior to being passed to your function, nums is possibly rotated at an unknown pivot index k (1 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,5,6,7] might be rotated at pivot index 3 and become [4,5,6,7,0,1,2].\n\nGiven the array nums after the possible rotation and an integer target, return the index of target if it is in nums, or -1 if it is not in nums.\n\nYou must write an algorithm with O(log n) runtime complexity.\n\n**Example 1:**\nInput: nums = [4,5,6,7,0,1,2], target = 0\nOutput: 4\n\n**Example 2:**\nInput: nums = [4,5,6,7,0,1,2], target = 3\nOutput: -1\n\n**Example 3:**\nInput: nums = [1], target = 0\nOutput: -1",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def search(self, nums, target):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def search(self, nums, target):\n        left, right = 0, len(nums) - 1\n        \n        while left <= right:\n            mid = left + (right - left) // 2\n            \n            if nums[mid] == target:\n                return mid\n            \n            # Check if left half is sorted\n            if nums[left] <= nums[mid]:\n                if nums[left] <= target < nums[mid]:\n                    right = mid - 1\n                else:\n                    left = mid + 1\n            # Right half is sorted\n            else:\n                if nums[mid] < target <= nums[right]:\n                    left = mid + 1\n                else:\n                    right = mid - 1\n        \n        return -1",
        testCases: [
          {
            input: "[4,5,6,7,0,1,2], 0",
            expected_output: "4",
            weight: 0.4,
            description: "Target in rotated part",
          },
          {
            input: "[4,5,6,7,0,1,2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[1], 0",
            expected_output: "-1",
            weight: 0.3,
            description: "Single element, not found",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number}\n */\nvar search = function(nums, target) {\n    let left = 0, right = nums.length - 1;\n    \n    while (left <= right) {\n        const mid = left + Math.floor((right - left) / 2);\n        \n        if (nums[mid] === target) {\n            return mid;\n        }\n        \n        // Check if left half is sorted\n        if (nums[left] <= nums[mid]) {\n            if (nums[left] <= target && target < nums[mid]) {\n                right = mid - 1;\n            } else {\n                left = mid + 1;\n            }\n        }\n        // Right half is sorted\n        else {\n            if (nums[mid] < target && target <= nums[right]) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n    }\n    \n    return -1;\n};",
        testCases: [
          {
            input: "[4,5,6,7,0,1,2], 0",
            expected_output: "4",
            weight: 0.4,
            description: "Target in rotated part",
          },
          {
            input: "[4,5,6,7,0,1,2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[1], 0",
            expected_output: "-1",
            weight: 0.3,
            description: "Single element, not found",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int search(int[] nums, int target) {\n        // Your code here\n        return -1;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] == target) {\n                return mid;\n            }\n            \n            // Check if left half is sorted\n            if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            }\n            // Right half is sorted\n            else {\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        \n        return -1;\n    }\n}",
        testCases: [
          {
            input: "[4,5,6,7,0,1,2], 0",
            expected_output: "4",
            weight: 0.4,
            description: "Target in rotated part",
          },
          {
            input: "[4,5,6,7,0,1,2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[1], 0",
            expected_output: "-1",
            weight: 0.3,
            description: "Single element, not found",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func search(nums []int, target int) int {\n    // Your code here\n    return -1\n}",
        solutionCode:
          "func search(nums []int, target int) int {\n    left, right := 0, len(nums)-1\n    \n    for left <= right {\n        mid := left + (right-left)/2\n        \n        if nums[mid] == target {\n            return mid\n        }\n        \n        // Check if left half is sorted\n        if nums[left] <= nums[mid] {\n            if nums[left] <= target && target < nums[mid] {\n                right = mid - 1\n            } else {\n                left = mid + 1\n            }\n        } else {\n            // Right half is sorted\n            if nums[mid] < target && target <= nums[right] {\n                left = mid + 1\n            } else {\n                right = mid - 1\n            }\n        }\n    }\n    \n    return -1\n}",
        testCases: [
          {
            input: "[4,5,6,7,0,1,2], 0",
            expected_output: "4",
            weight: 0.4,
            description: "Target in rotated part",
          },
          {
            input: "[4,5,6,7,0,1,2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[1], 0",
            expected_output: "-1",
            weight: 0.3,
            description: "Single element, not found",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums\n# @param {Integer} target\n# @return {Integer}\ndef search(nums, target)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums\n# @param {Integer} target\n# @return {Integer}\ndef search(nums, target)\n    left, right = 0, nums.length - 1\n    \n    while left <= right\n        mid = left + (right - left) / 2\n        \n        return mid if nums[mid] == target\n        \n        # Check if left half is sorted\n        if nums[left] <= nums[mid]\n            if nums[left] <= target && target < nums[mid]\n                right = mid - 1\n            else\n                left = mid + 1\n            end\n        else\n            # Right half is sorted\n            if nums[mid] < target && target <= nums[right]\n                left = mid + 1\n            else\n                right = mid - 1\n            end\n        end\n    end\n    \n    -1\nend",
        testCases: [
          {
            input: "[4,5,6,7,0,1,2], 0",
            expected_output: "4",
            weight: 0.4,
            description: "Target in rotated part",
          },
          {
            input: "[4,5,6,7,0,1,2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[1], 0",
            expected_output: "-1",
            weight: 0.3,
            description: "Single element, not found",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        // Your code here\n        return -1;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int search(vector<int>& nums, int target) {\n        int left = 0, right = nums.size() - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] == target) {\n                return mid;\n            }\n            \n            // Check if left half is sorted\n            if (nums[left] <= nums[mid]) {\n                if (nums[left] <= target && target < nums[mid]) {\n                    right = mid - 1;\n                } else {\n                    left = mid + 1;\n                }\n            }\n            // Right half is sorted\n            else {\n                if (nums[mid] < target && target <= nums[right]) {\n                    left = mid + 1;\n                } else {\n                    right = mid - 1;\n                }\n            }\n        }\n        \n        return -1;\n    }\n};",
        testCases: [
          {
            input: "[4,5,6,7,0,1,2], 0",
            expected_output: "4",
            weight: 0.4,
            description: "Target in rotated part",
          },
          {
            input: "[4,5,6,7,0,1,2], 3",
            expected_output: "-1",
            weight: 0.3,
            description: "Target not found",
          },
          {
            input: "[1], 0",
            expected_output: "-1",
            weight: 0.3,
            description: "Single element, not found",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      constraints: [
        "1 <= nums.length <= 5000",
        "-10^4 <= nums[i] <= 10^4",
        "All values of nums are unique",
        "nums is an ascending array that is possibly rotated",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 25,
      tags: ["array", "binary-search"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Sorting & Searching",
    },
  },

  // Sorting & Searching - Hard: Find Median of Two Sorted Arrays
  {
    id: "median-two-sorted-arrays",
    title: "Median of Two Sorted Arrays",
    text: "Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.\n\nThe overall run time complexity should be O(log (m+n)).\n\n**Example 1:**\nInput: nums1 = [1,3], nums2 = [2]\nOutput: 2.00000\nExplanation: merged array = [1,2,3] and median is 2.\n\n**Example 2:**\nInput: nums1 = [1,2], nums2 = [3,4]\nOutput: 2.50000\nExplanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def findMedianSortedArrays(self, nums1, nums2):\n        # Ensure nums1 is the smaller array\n        if len(nums1) > len(nums2):\n            nums1, nums2 = nums2, nums1\n        \n        m, n = len(nums1), len(nums2)\n        left, right = 0, m\n        \n        while left <= right:\n            partition1 = (left + right) // 2\n            partition2 = (m + n + 1) // 2 - partition1\n            \n            # Handle edge cases\n            max_left1 = float('-inf') if partition1 == 0 else nums1[partition1 - 1]\n            min_right1 = float('inf') if partition1 == m else nums1[partition1]\n            \n            max_left2 = float('-inf') if partition2 == 0 else nums2[partition2 - 1]\n            min_right2 = float('inf') if partition2 == n else nums2[partition2]\n            \n            if max_left1 <= min_right2 and max_left2 <= min_right1:\n                # Found the correct partition\n                if (m + n) % 2 == 0:\n                    return (max(max_left1, max_left2) + min(min_right1, min_right2)) / 2.0\n                else:\n                    return max(max_left1, max_left2)\n            elif max_left1 > min_right2:\n                right = partition1 - 1\n            else:\n                left = partition1 + 1\n        \n        return 0.0",
        testCases: [
          {
            input: "[1,3], [2]",
            expected_output: "2.0",
            weight: 0.4,
            description: "Odd total length",
          },
          {
            input: "[1,2], [3,4]",
            expected_output: "2.5",
            weight: 0.4,
            description: "Even total length",
          },
          {
            input: "[], [1]",
            expected_output: "1.0",
            weight: 0.2,
            description: "One empty array",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums1\n * @param {number[]} nums2\n * @return {number}\n */\nvar findMedianSortedArrays = function(nums1, nums2) {\n    // Ensure nums1 is the smaller array\n    if (nums1.length > nums2.length) {\n        [nums1, nums2] = [nums2, nums1];\n    }\n    \n    const m = nums1.length, n = nums2.length;\n    let left = 0, right = m;\n    \n    while (left <= right) {\n        const partition1 = Math.floor((left + right) / 2);\n        const partition2 = Math.floor((m + n + 1) / 2) - partition1;\n        \n        // Handle edge cases\n        const maxLeft1 = partition1 === 0 ? -Infinity : nums1[partition1 - 1];\n        const minRight1 = partition1 === m ? Infinity : nums1[partition1];\n        \n        const maxLeft2 = partition2 === 0 ? -Infinity : nums2[partition2 - 1];\n        const minRight2 = partition2 === n ? Infinity : nums2[partition2];\n        \n        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n            // Found the correct partition\n            if ((m + n) % 2 === 0) {\n                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;\n            } else {\n                return Math.max(maxLeft1, maxLeft2);\n            }\n        } else if (maxLeft1 > minRight2) {\n            right = partition1 - 1;\n        } else {\n            left = partition1 + 1;\n        }\n    }\n    \n    return 0.0;\n};",
        testCases: [
          {
            input: "[1,3], [2]",
            expected_output: "2.0",
            weight: 0.4,
            description: "Odd total length",
          },
          {
            input: "[1,2], [3,4]",
            expected_output: "2.5",
            weight: 0.4,
            description: "Even total length",
          },
          {
            input: "[], [1]",
            expected_output: "1.0",
            weight: 0.2,
            description: "One empty array",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Your code here\n        return 0.0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public double findMedianSortedArrays(int[] nums1, int[] nums2) {\n        // Ensure nums1 is the smaller array\n        if (nums1.length > nums2.length) {\n            int[] temp = nums1;\n            nums1 = nums2;\n            nums2 = temp;\n        }\n        \n        int m = nums1.length, n = nums2.length;\n        int left = 0, right = m;\n        \n        while (left <= right) {\n            int partition1 = (left + right) / 2;\n            int partition2 = (m + n + 1) / 2 - partition1;\n            \n            // Handle edge cases\n            int maxLeft1 = partition1 == 0 ? Integer.MIN_VALUE : nums1[partition1 - 1];\n            int minRight1 = partition1 == m ? Integer.MAX_VALUE : nums1[partition1];\n            \n            int maxLeft2 = partition2 == 0 ? Integer.MIN_VALUE : nums2[partition2 - 1];\n            int minRight2 = partition2 == n ? Integer.MAX_VALUE : nums2[partition2];\n            \n            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n                // Found the correct partition\n                if ((m + n) % 2 == 0) {\n                    return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2.0;\n                } else {\n                    return Math.max(maxLeft1, maxLeft2);\n                }\n            } else if (maxLeft1 > minRight2) {\n                right = partition1 - 1;\n            } else {\n                left = partition1 + 1;\n            }\n        }\n        \n        return 0.0;\n    }\n}",
        testCases: [
          {
            input: "[1,3], [2]",
            expected_output: "2.0",
            weight: 0.4,
            description: "Odd total length",
          },
          {
            input: "[1,2], [3,4]",
            expected_output: "2.5",
            weight: 0.4,
            description: "Even total length",
          },
          {
            input: "[], [1]",
            expected_output: "1.0",
            weight: 0.2,
            description: "One empty array",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n    // Your code here\n    return 0.0\n}",
        solutionCode:
          "func findMedianSortedArrays(nums1 []int, nums2 []int) float64 {\n    // Ensure nums1 is the smaller array\n    if len(nums1) > len(nums2) {\n        nums1, nums2 = nums2, nums1\n    }\n    \n    m, n := len(nums1), len(nums2)\n    left, right := 0, m\n    \n    for left <= right {\n        partition1 := (left + right) / 2\n        partition2 := (m+n+1)/2 - partition1\n        \n        // Handle edge cases\n        maxLeft1 := math.MinInt32\n        if partition1 > 0 {\n            maxLeft1 = nums1[partition1-1]\n        }\n        \n        minRight1 := math.MaxInt32\n        if partition1 < m {\n            minRight1 = nums1[partition1]\n        }\n        \n        maxLeft2 := math.MinInt32\n        if partition2 > 0 {\n            maxLeft2 = nums2[partition2-1]\n        }\n        \n        minRight2 := math.MaxInt32\n        if partition2 < n {\n            minRight2 = nums2[partition2]\n        }\n        \n        if maxLeft1 <= minRight2 && maxLeft2 <= minRight1 {\n            // Found the correct partition\n            if (m+n)%2 == 0 {\n                return float64(max(maxLeft1, maxLeft2)+min(minRight1, minRight2)) / 2.0\n            } else {\n                return float64(max(maxLeft1, maxLeft2))\n            }\n        } else if maxLeft1 > minRight2 {\n            right = partition1 - 1\n        } else {\n            left = partition1 + 1\n        }\n    }\n    \n    return 0.0\n}\n\nfunc max(a, b int) int {\n    if a > b {\n        return a\n    }\n    return b\n}\n\nfunc min(a, b int) int {\n    if a < b {\n        return a\n    }\n    return b\n}",
        testCases: [
          {
            input: "[1,3], [2]",
            expected_output: "2.0",
            weight: 0.4,
            description: "Odd total length",
          },
          {
            input: "[1,2], [3,4]",
            expected_output: "2.5",
            weight: 0.4,
            description: "Even total length",
          },
          {
            input: "[], [1]",
            expected_output: "1.0",
            weight: 0.2,
            description: "One empty array",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums1\n# @param {Integer[]} nums2\n# @return {Float}\ndef find_median_sorted_arrays(nums1, nums2)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums1\n# @param {Integer[]} nums2\n# @return {Float}\ndef find_median_sorted_arrays(nums1, nums2)\n    # Ensure nums1 is the smaller array\n    if nums1.length > nums2.length\n        nums1, nums2 = nums2, nums1\n    end\n    \n    m, n = nums1.length, nums2.length\n    left, right = 0, m\n    \n    while left <= right\n        partition1 = (left + right) / 2\n        partition2 = (m + n + 1) / 2 - partition1\n        \n        # Handle edge cases\n        max_left1 = partition1 == 0 ? -Float::INFINITY : nums1[partition1 - 1]\n        min_right1 = partition1 == m ? Float::INFINITY : nums1[partition1]\n        \n        max_left2 = partition2 == 0 ? -Float::INFINITY : nums2[partition2 - 1]\n        min_right2 = partition2 == n ? Float::INFINITY : nums2[partition2]\n        \n        if max_left1 <= min_right2 && max_left2 <= min_right1\n            # Found the correct partition\n            if (m + n) % 2 == 0\n                return ([max_left1, max_left2].max + [min_right1, min_right2].min) / 2.0\n            else\n                return [max_left1, max_left2].max.to_f\n            end\n        elsif max_left1 > min_right2\n            right = partition1 - 1\n        else\n            left = partition1 + 1\n        end\n    end\n    \n    0.0\nend",
        testCases: [
          {
            input: "[1,3], [2]",
            expected_output: "2.0",
            weight: 0.4,
            description: "Odd total length",
          },
          {
            input: "[1,2], [3,4]",
            expected_output: "2.5",
            weight: 0.4,
            description: "Even total length",
          },
          {
            input: "[], [1]",
            expected_output: "1.0",
            weight: 0.2,
            description: "One empty array",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Your code here\n        return 0.0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    double findMedianSortedArrays(vector<int>& nums1, vector<int>& nums2) {\n        // Ensure nums1 is the smaller array\n        if (nums1.size() > nums2.size()) {\n            swap(nums1, nums2);\n        }\n        \n        int m = nums1.size(), n = nums2.size();\n        int left = 0, right = m;\n        \n        while (left <= right) {\n            int partition1 = (left + right) / 2;\n            int partition2 = (m + n + 1) / 2 - partition1;\n            \n            // Handle edge cases\n            int maxLeft1 = partition1 == 0 ? INT_MIN : nums1[partition1 - 1];\n            int minRight1 = partition1 == m ? INT_MAX : nums1[partition1];\n            \n            int maxLeft2 = partition2 == 0 ? INT_MIN : nums2[partition2 - 1];\n            int minRight2 = partition2 == n ? INT_MAX : nums2[partition2];\n            \n            if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {\n                // Found the correct partition\n                if ((m + n) % 2 == 0) {\n                    return (max(maxLeft1, maxLeft2) + min(minRight1, minRight2)) / 2.0;\n                } else {\n                    return max(maxLeft1, maxLeft2);\n                }\n            } else if (maxLeft1 > minRight2) {\n                right = partition1 - 1;\n            } else {\n                left = partition1 + 1;\n            }\n        }\n        \n        return 0.0;\n    }\n};",
        testCases: [
          {
            input: "[1,3], [2]",
            expected_output: "2.0",
            weight: 0.4,
            description: "Odd total length",
          },
          {
            input: "[1,2], [3,4]",
            expected_output: "2.5",
            weight: 0.4,
            description: "Even total length",
          },
          {
            input: "[], [1]",
            expected_output: "1.0",
            weight: 0.2,
            description: "One empty array",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(log(min(m,n)))",
      spaceComplexity: "O(1)",
      constraints: [
        "0 <= m <= 1000",
        "0 <= n <= 1000",
        "1 <= m + n <= 2000",
        "-10^6 <= nums1[i], nums2[i] <= 10^6",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 45,
      tags: ["array", "binary-search", "divide-and-conquer"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Sorting & Searching",
    },
  },

  // Hash Tables - Easy: Two Sum
  {
    id: "two-sum-hash",
    title: "Two Sum",
    text: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.\n\n**Example 1:**\nInput: nums = [2,7,11,15], target = 9\nOutput: [0,1]\nExplanation: Because nums[0] + nums[1] == 9, we return [0, 1].\n\n**Example 2:**\nInput: nums = [3,2,4], target = 6\nOutput: [1,2]\n\n**Example 3:**\nInput: nums = [3,3], target = 6\nOutput: [0,1]",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def twoSum(self, nums, target):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def twoSum(self, nums, target):\n        num_map = {}\n        \n        for i, num in enumerate(nums):\n            complement = target - num\n            if complement in num_map:\n                return [num_map[complement], i]\n            num_map[num] = i\n        \n        return []",
        testCases: [
          {
            input: "[2,7,11,15], 9",
            expected_output: "[0,1]",
            weight: 0.4,
            description: "Standard two sum",
          },
          {
            input: "[3,2,4], 6",
            expected_output: "[1,2]",
            weight: 0.3,
            description: "Different order",
          },
          {
            input: "[3,3], 6",
            expected_output: "[0,1]",
            weight: 0.3,
            description: "Duplicate numbers",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nvar twoSum = function(nums, target) {\n    const numMap = new Map();\n    \n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (numMap.has(complement)) {\n            return [numMap.get(complement), i];\n        }\n        numMap.set(nums[i], i);\n    }\n    \n    return [];\n};",
        testCases: [
          {
            input: "[2,7,11,15], 9",
            expected_output: "[0,1]",
            weight: 0.4,
            description: "Standard two sum",
          },
          {
            input: "[3,2,4], 6",
            expected_output: "[1,2]",
            weight: 0.3,
            description: "Different order",
          },
          {
            input: "[3,3], 6",
            expected_output: "[0,1]",
            weight: 0.3,
            description: "Duplicate numbers",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[0];\n    }\n}",
        solutionCode:
          "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        Map<Integer, Integer> numMap = new HashMap<>();\n        \n        for (int i = 0; i < nums.length; i++) {\n            int complement = target - nums[i];\n            if (numMap.containsKey(complement)) {\n                return new int[]{numMap.get(complement), i};\n            }\n            numMap.put(nums[i], i);\n        }\n        \n        return new int[0];\n    }\n}",
        testCases: [
          {
            input: "[2,7,11,15], 9",
            expected_output: "[0,1]",
            weight: 0.4,
            description: "Standard two sum",
          },
          {
            input: "[3,2,4], 6",
            expected_output: "[1,2]",
            weight: 0.3,
            description: "Different order",
          },
          {
            input: "[3,3], 6",
            expected_output: "[0,1]",
            weight: 0.3,
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
            weight: 0.4,
            description: "Standard two sum",
          },
          {
            input: "[3,2,4], 6",
            expected_output: "[1,2]",
            weight: 0.3,
            description: "Different order",
          },
          {
            input: "[3,3], 6",
            expected_output: "[0,1]",
            weight: 0.3,
            description: "Duplicate numbers",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums\n# @param {Integer} target\n# @return {Integer[]}\ndef two_sum(nums, target)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums\n# @param {Integer} target\n# @return {Integer[]}\ndef two_sum(nums, target)\n    num_map = {}\n    \n    nums.each_with_index do |num, i|\n        complement = target - num\n        if num_map.key?(complement)\n            return [num_map[complement], i]\n        end\n        num_map[num] = i\n    end\n    \n    []\nend",
        testCases: [
          {
            input: "[2,7,11,15], 9",
            expected_output: "[0,1]",
            weight: 0.4,
            description: "Standard two sum",
          },
          {
            input: "[3,2,4], 6",
            expected_output: "[1,2]",
            weight: 0.3,
            description: "Different order",
          },
          {
            input: "[3,3], 6",
            expected_output: "[0,1]",
            weight: 0.3,
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
            weight: 0.4,
            description: "Standard two sum",
          },
          {
            input: "[3,2,4], 6",
            expected_output: "[1,2]",
            weight: 0.3,
            description: "Different order",
          },
          {
            input: "[3,3], 6",
            expected_output: "[0,1]",
            weight: 0.3,
            description: "Duplicate numbers",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists",
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
      tags: ["array", "hash-table"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Hash Tables",
    },
  },

  // Hash Tables - Medium: LRU Cache
  {
    id: "lru-cache",
    title: "LRU Cache",
    text: 'Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.\n\nImplement the LRUCache class:\n\n- LRUCache(int capacity) Initialize the LRU cache with positive size capacity.\n- int get(int key) Return the value of the key if the key exists, otherwise return -1.\n- void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.\n\nThe functions get and put must each run in O(1) average time complexity.\n\n**Example:**\nInput\n["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]\n[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]\nOutput\n[null, null, null, 1, null, -1, null, -1, 3, 4]',
    implementations: [
      {
        language: "python",
        starterCode:
          "class LRUCache:\n\n    def __init__(self, capacity):\n        # Your code here\n        pass\n\n    def get(self, key):\n        # Your code here\n        pass\n\n    def put(self, key, value):\n        # Your code here\n        pass\n\n# Your LRUCache object will be instantiated and called as such:\n# obj = LRUCache(capacity)\n# param_1 = obj.get(key)\n# obj.put(key,value)",
        solutionCode:
          'class LRUCache:\n    class Node:\n        def __init__(self, key=0, value=0):\n            self.key = key\n            self.value = value\n            self.prev = None\n            self.next = None\n\n    def __init__(self, capacity):\n        self.capacity = capacity\n        self.cache = {}  # key -> node\n        \n        # Create dummy head and tail nodes\n        self.head = self.Node()\n        self.tail = self.Node()\n        self.head.next = self.tail\n        self.tail.prev = self.head\n\n    def _add_node(self, node):\n        """Add node right after head"""\n        node.prev = self.head\n        node.next = self.head.next\n        \n        self.head.next.prev = node\n        self.head.next = node\n\n    def _remove_node(self, node):\n        """Remove an existing node"""\n        prev_node = node.prev\n        next_node = node.next\n        \n        prev_node.next = next_node\n        next_node.prev = prev_node\n\n    def _move_to_head(self, node):\n        """Move node to head"""\n        self._remove_node(node)\n        self._add_node(node)\n\n    def _pop_tail(self):\n        """Pop the last node"""\n        last_node = self.tail.prev\n        self._remove_node(last_node)\n        return last_node\n\n    def get(self, key):\n        node = self.cache.get(key)\n        if not node:\n            return -1\n        \n        # Move to head\n        self._move_to_head(node)\n        return node.value\n\n    def put(self, key, value):\n        node = self.cache.get(key)\n        \n        if not node:\n            new_node = self.Node(key, value)\n            \n            if len(self.cache) >= self.capacity:\n                # Remove tail\n                tail = self._pop_tail()\n                del self.cache[tail.key]\n            \n            self.cache[key] = new_node\n            self._add_node(new_node)\n        else:\n            # Update existing\n            node.value = value\n            self._move_to_head(node)',
        testCases: [
          {
            input:
              '["LRUCache","put","put","get","put","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
            expected_output: "[null,null,null,1,null,-1,null,-1,3,4]",
            weight: 1.0,
            description: "Standard LRU operations",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n    // Your code here\n};\n\n/** \n * @param {number} key\n * @return {number}\n */\nLRUCache.prototype.get = function(key) {\n    // Your code here\n};\n\n/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */\nLRUCache.prototype.put = function(key, value) {\n    // Your code here\n};\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * var obj = new LRUCache(capacity);\n * var param_1 = obj.get(key);\n * obj.put(key,value);\n */",
        solutionCode:
          "/**\n * @param {number} capacity\n */\nvar LRUCache = function(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n};\n\n/** \n * @param {number} key\n * @return {number}\n */\nLRUCache.prototype.get = function(key) {\n    if (this.cache.has(key)) {\n        const value = this.cache.get(key);\n        // Move to end (most recent)\n        this.cache.delete(key);\n        this.cache.set(key, value);\n        return value;\n    }\n    return -1;\n};\n\n/** \n * @param {number} key \n * @param {number} value\n * @return {void}\n */\nLRUCache.prototype.put = function(key, value) {\n    if (this.cache.has(key)) {\n        // Update existing\n        this.cache.delete(key);\n    } else if (this.cache.size >= this.capacity) {\n        // Remove least recent (first item)\n        const firstKey = this.cache.keys().next().value;\n        this.cache.delete(firstKey);\n    }\n    \n    this.cache.set(key, value);\n};",
        testCases: [
          {
            input:
              '["LRUCache","put","put","get","put","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
            expected_output: "[null,null,null,1,null,-1,null,-1,3,4]",
            weight: 1.0,
            description: "Standard LRU operations",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class LRUCache {\n\n    public LRUCache(int capacity) {\n        // Your code here\n    }\n    \n    public int get(int key) {\n        // Your code here\n        return -1;\n    }\n    \n    public void put(int key, int value) {\n        // Your code here\n    }\n}\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * LRUCache obj = new LRUCache(capacity);\n * int param_1 = obj.get(key);\n * obj.put(key,value);\n */",
        solutionCode:
          "class LRUCache {\n    class Node {\n        int key, value;\n        Node prev, next;\n        \n        Node(int key, int value) {\n            this.key = key;\n            this.value = value;\n        }\n    }\n    \n    private int capacity;\n    private Map<Integer, Node> cache;\n    private Node head, tail;\n\n    public LRUCache(int capacity) {\n        this.capacity = capacity;\n        this.cache = new HashMap<>();\n        \n        // Create dummy head and tail\n        this.head = new Node(0, 0);\n        this.tail = new Node(0, 0);\n        head.next = tail;\n        tail.prev = head;\n    }\n    \n    private void addNode(Node node) {\n        node.prev = head;\n        node.next = head.next;\n        \n        head.next.prev = node;\n        head.next = node;\n    }\n    \n    private void removeNode(Node node) {\n        Node prevNode = node.prev;\n        Node nextNode = node.next;\n        \n        prevNode.next = nextNode;\n        nextNode.prev = prevNode;\n    }\n    \n    private void moveToHead(Node node) {\n        removeNode(node);\n        addNode(node);\n    }\n    \n    private Node popTail() {\n        Node lastNode = tail.prev;\n        removeNode(lastNode);\n        return lastNode;\n    }\n    \n    public int get(int key) {\n        Node node = cache.get(key);\n        if (node == null) {\n            return -1;\n        }\n        \n        moveToHead(node);\n        return node.value;\n    }\n    \n    public void put(int key, int value) {\n        Node node = cache.get(key);\n        \n        if (node == null) {\n            Node newNode = new Node(key, value);\n            \n            if (cache.size() >= capacity) {\n                Node tail = popTail();\n                cache.remove(tail.key);\n            }\n            \n            cache.put(key, newNode);\n            addNode(newNode);\n        } else {\n            node.value = value;\n            moveToHead(node);\n        }\n    }\n}",
        testCases: [
          {
            input:
              '["LRUCache","put","put","get","put","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
            expected_output: "[null,null,null,1,null,-1,null,-1,3,4]",
            weight: 1.0,
            description: "Standard LRU operations",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "type LRUCache struct {\n    // Your code here\n}\n\nfunc Constructor(capacity int) LRUCache {\n    // Your code here\n    return LRUCache{}\n}\n\nfunc (this *LRUCache) Get(key int) int {\n    // Your code here\n    return -1\n}\n\nfunc (this *LRUCache) Put(key int, value int) {\n    // Your code here\n}\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * obj := Constructor(capacity);\n * param_1 := obj.Get(key);\n * obj.Put(key,value);\n */",
        solutionCode:
          "type Node struct {\n    key, value int\n    prev, next *Node\n}\n\ntype LRUCache struct {\n    capacity int\n    cache    map[int]*Node\n    head, tail *Node\n}\n\nfunc Constructor(capacity int) LRUCache {\n    head := &Node{}\n    tail := &Node{}\n    head.next = tail\n    tail.prev = head\n    \n    return LRUCache{\n        capacity: capacity,\n        cache:    make(map[int]*Node),\n        head:     head,\n        tail:     tail,\n    }\n}\n\nfunc (this *LRUCache) addNode(node *Node) {\n    node.prev = this.head\n    node.next = this.head.next\n    \n    this.head.next.prev = node\n    this.head.next = node\n}\n\nfunc (this *LRUCache) removeNode(node *Node) {\n    prevNode := node.prev\n    nextNode := node.next\n    \n    prevNode.next = nextNode\n    nextNode.prev = prevNode\n}\n\nfunc (this *LRUCache) moveToHead(node *Node) {\n    this.removeNode(node)\n    this.addNode(node)\n}\n\nfunc (this *LRUCache) popTail() *Node {\n    lastNode := this.tail.prev\n    this.removeNode(lastNode)\n    return lastNode\n}\n\nfunc (this *LRUCache) Get(key int) int {\n    if node, exists := this.cache[key]; exists {\n        this.moveToHead(node)\n        return node.value\n    }\n    return -1\n}\n\nfunc (this *LRUCache) Put(key int, value int) {\n    if node, exists := this.cache[key]; exists {\n        node.value = value\n        this.moveToHead(node)\n    } else {\n        newNode := &Node{key: key, value: value}\n        \n        if len(this.cache) >= this.capacity {\n            tail := this.popTail()\n            delete(this.cache, tail.key)\n        }\n        \n        this.cache[key] = newNode\n        this.addNode(newNode)\n    }\n}",
        testCases: [
          {
            input:
              '["LRUCache","put","put","get","put","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
            expected_output: "[null,null,null,1,null,-1,null,-1,3,4]",
            weight: 1.0,
            description: "Standard LRU operations",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "class LRUCache\n\n=begin\n    :type capacity: Integer\n=end\n    def initialize(capacity)\n        # Your code here\n    end\n\n\n=begin\n    :type key: Integer\n    :rtype: Integer\n=end\n    def get(key)\n        # Your code here\n    end\n\n\n=begin\n    :type key: Integer\n    :type value: Integer\n    :rtype: Void\n=end\n    def put(key, value)\n        # Your code here\n    end\n\n\nend\n\n# Your LRUCache object will be instantiated and called as such:\n# obj = LRUCache.new(capacity)\n# param_1 = obj.get(key)\n# obj.put(key, value)",
        solutionCode:
          "class LRUCache\n    def initialize(capacity)\n        @capacity = capacity\n        @cache = {}\n        @order = []\n    end\n\n    def get(key)\n        if @cache.key?(key)\n            # Move to end (most recent)\n            @order.delete(key)\n            @order.push(key)\n            return @cache[key]\n        end\n        -1\n    end\n\n    def put(key, value)\n        if @cache.key?(key)\n            # Update existing\n            @cache[key] = value\n            @order.delete(key)\n            @order.push(key)\n        else\n            # Add new\n            if @cache.size >= @capacity\n                # Remove least recent\n                lru_key = @order.shift\n                @cache.delete(lru_key)\n            end\n            \n            @cache[key] = value\n            @order.push(key)\n        end\n    end\nend",
        testCases: [
          {
            input:
              '["LRUCache","put","put","get","put","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
            expected_output: "[null,null,null,1,null,-1,null,-1,3,4]",
            weight: 1.0,
            description: "Standard LRU operations",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class LRUCache {\npublic:\n    LRUCache(int capacity) {\n        // Your code here\n    }\n    \n    int get(int key) {\n        // Your code here\n        return -1;\n    }\n    \n    void put(int key, int value) {\n        // Your code here\n    }\n};\n\n/**\n * Your LRUCache object will be instantiated and called as such:\n * LRUCache* obj = new LRUCache(capacity);\n * int param_1 = obj->get(key);\n * obj->put(key,value);\n */",
        solutionCode:
          "class LRUCache {\nstruct Node {\n    int key, value;\n    Node* prev;\n    Node* next;\n    Node(int k, int v) : key(k), value(v), prev(nullptr), next(nullptr) {}\n};\n\nprivate:\n    int capacity;\n    unordered_map<int, Node*> cache;\n    Node* head;\n    Node* tail;\n    \n    void addNode(Node* node) {\n        node->prev = head;\n        node->next = head->next;\n        \n        head->next->prev = node;\n        head->next = node;\n    }\n    \n    void removeNode(Node* node) {\n        Node* prevNode = node->prev;\n        Node* nextNode = node->next;\n        \n        prevNode->next = nextNode;\n        nextNode->prev = prevNode;\n    }\n    \n    void moveToHead(Node* node) {\n        removeNode(node);\n        addNode(node);\n    }\n    \n    Node* popTail() {\n        Node* lastNode = tail->prev;\n        removeNode(lastNode);\n        return lastNode;\n    }\n\npublic:\n    LRUCache(int capacity) : capacity(capacity) {\n        head = new Node(0, 0);\n        tail = new Node(0, 0);\n        head->next = tail;\n        tail->prev = head;\n    }\n    \n    int get(int key) {\n        auto it = cache.find(key);\n        if (it == cache.end()) {\n            return -1;\n        }\n        \n        Node* node = it->second;\n        moveToHead(node);\n        return node->value;\n    }\n    \n    void put(int key, int value) {\n        auto it = cache.find(key);\n        \n        if (it == cache.end()) {\n            Node* newNode = new Node(key, value);\n            \n            if (cache.size() >= capacity) {\n                Node* tail = popTail();\n                cache.erase(tail->key);\n                delete tail;\n            }\n            \n            cache[key] = newNode;\n            addNode(newNode);\n        } else {\n            Node* node = it->second;\n            node->value = value;\n            moveToHead(node);\n        }\n    }\n};",
        testCases: [
          {
            input:
              '["LRUCache","put","put","get","put","get","put","get","get","get"], [[2],[1,1],[2,2],[1],[3,3],[2],[4,4],[1],[3],[4]]',
            expected_output: "[null,null,null,1,null,-1,null,-1,3,4]",
            weight: 1.0,
            description: "Standard LRU operations",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(1)",
      spaceComplexity: "O(capacity)",
      constraints: [
        "1 <= capacity <= 3000",
        "0 <= key <= 10^4",
        "0 <= value <= 10^5",
        "At most 2 * 10^5 calls will be made to get and put",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 35,
      tags: ["hash-table", "linked-list", "design"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Hash Tables",
    },
  },

  // Hash Tables - Hard: Valid Sudoku
  {
    id: "valid-sudoku",
    title: "Valid Sudoku",
    text: 'Determine if a 9 x 9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:\n\n1. Each row must contain the digits 1-9 without repetition.\n2. Each column must contain the digits 1-9 without repetition.\n3. Each of the nine 3 x 3 sub-boxes of the grid must contain the digits 1-9 without repetition.\n\nNote:\n- A Sudoku board (partially filled) could be valid but is not necessarily solvable.\n- Only the filled cells need to be validated according to the mentioned rules.\n\n**Example 1:**\nInput: board = \n[["5","3",".",".","7",".",".",".","."]\n,["6",".",".","1","9","5",".",".","."]\n,[".","9","8",".",".",".",".","6","."]\n,["8",".",".",".","6",".",".",".","3"]\n,["4",".",".","8",".","3",".",".","1"]\n,["7",".",".",".","2",".",".",".","6"]\n,[".","6",".",".",".",".","2","8","."]\n,[".",".",".","4","1","9",".",".","5"]\n,[".",".",".",".","8",".",".","7","9"]]\nOutput: true',
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def isValidSudoku(self, board):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def isValidSudoku(self, board):\n        rows = [set() for _ in range(9)]\n        cols = [set() for _ in range(9)]\n        boxes = [set() for _ in range(9)]\n        \n        for i in range(9):\n            for j in range(9):\n                if board[i][j] != '.':\n                    num = board[i][j]\n                    box_index = (i // 3) * 3 + j // 3\n                    \n                    if (num in rows[i] or \n                        num in cols[j] or \n                        num in boxes[box_index]):\n                        return False\n                    \n                    rows[i].add(num)\n                    cols[j].add(num)\n                    boxes[box_index].add(num)\n        \n        return True",
        testCases: [
          {
            input:
              '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "true",
            weight: 0.6,
            description: "Valid Sudoku board",
          },
          {
            input:
              '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "false",
            weight: 0.4,
            description: "Invalid Sudoku (duplicate in column)",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {character[][]} board\n * @return {boolean}\n */\nvar isValidSudoku = function(board) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {character[][]} board\n * @return {boolean}\n */\nvar isValidSudoku = function(board) {\n    const rows = Array(9).fill().map(() => new Set());\n    const cols = Array(9).fill().map(() => new Set());\n    const boxes = Array(9).fill().map(() => new Set());\n    \n    for (let i = 0; i < 9; i++) {\n        for (let j = 0; j < 9; j++) {\n            if (board[i][j] !== '.') {\n                const num = board[i][j];\n                const boxIndex = Math.floor(i / 3) * 3 + Math.floor(j / 3);\n                \n                if (rows[i].has(num) || \n                    cols[j].has(num) || \n                    boxes[boxIndex].has(num)) {\n                    return false;\n                }\n                \n                rows[i].add(num);\n                cols[j].add(num);\n                boxes[boxIndex].add(num);\n            }\n        }\n    }\n    \n    return true;\n};",
        testCases: [
          {
            input:
              '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "true",
            weight: 0.6,
            description: "Valid Sudoku board",
          },
          {
            input:
              '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "false",
            weight: 0.4,
            description: "Invalid Sudoku (duplicate in column)",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public boolean isValidSudoku(char[][] board) {\n        // Your code here\n        return false;\n    }\n}",
        solutionCode:
          "class Solution {\n    public boolean isValidSudoku(char[][] board) {\n        Set<Character>[] rows = new Set[9];\n        Set<Character>[] cols = new Set[9];\n        Set<Character>[] boxes = new Set[9];\n        \n        for (int i = 0; i < 9; i++) {\n            rows[i] = new HashSet<>();\n            cols[i] = new HashSet<>();\n            boxes[i] = new HashSet<>();\n        }\n        \n        for (int i = 0; i < 9; i++) {\n            for (int j = 0; j < 9; j++) {\n                if (board[i][j] != '.') {\n                    char num = board[i][j];\n                    int boxIndex = (i / 3) * 3 + j / 3;\n                    \n                    if (rows[i].contains(num) || \n                        cols[j].contains(num) || \n                        boxes[boxIndex].contains(num)) {\n                        return false;\n                    }\n                    \n                    rows[i].add(num);\n                    cols[j].add(num);\n                    boxes[boxIndex].add(num);\n                }\n            }\n        }\n        \n        return true;\n    }\n}",
        testCases: [
          {
            input:
              '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "true",
            weight: 0.6,
            description: "Valid Sudoku board",
          },
          {
            input:
              '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "false",
            weight: 0.4,
            description: "Invalid Sudoku (duplicate in column)",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func isValidSudoku(board [][]byte) bool {\n    // Your code here\n    return false\n}",
        solutionCode:
          "func isValidSudoku(board [][]byte) bool {\n    rows := make([]map[byte]bool, 9)\n    cols := make([]map[byte]bool, 9)\n    boxes := make([]map[byte]bool, 9)\n    \n    for i := 0; i < 9; i++ {\n        rows[i] = make(map[byte]bool)\n        cols[i] = make(map[byte]bool)\n        boxes[i] = make(map[byte]bool)\n    }\n    \n    for i := 0; i < 9; i++ {\n        for j := 0; j < 9; j++ {\n            if board[i][j] != '.' {\n                num := board[i][j]\n                boxIndex := (i/3)*3 + j/3\n                \n                if rows[i][num] || cols[j][num] || boxes[boxIndex][num] {\n                    return false\n                }\n                \n                rows[i][num] = true\n                cols[j][num] = true\n                boxes[boxIndex][num] = true\n            }\n        }\n    }\n    \n    return true\n}",
        testCases: [
          {
            input:
              '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "true",
            weight: 0.6,
            description: "Valid Sudoku board",
          },
          {
            input:
              '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "false",
            weight: 0.4,
            description: "Invalid Sudoku (duplicate in column)",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Character[][]} board\n# @return {Boolean}\ndef is_valid_sudoku(board)\n    # Your code here\nend",
        solutionCode:
          "# @param {Character[][]} board\n# @return {Boolean}\ndef is_valid_sudoku(board)\n    rows = Array.new(9) { Set.new }\n    cols = Array.new(9) { Set.new }\n    boxes = Array.new(9) { Set.new }\n    \n    (0...9).each do |i|\n        (0...9).each do |j|\n            if board[i][j] != '.'\n                num = board[i][j]\n                box_index = (i / 3) * 3 + j / 3\n                \n                if rows[i].include?(num) || \n                   cols[j].include?(num) || \n                   boxes[box_index].include?(num)\n                    return false\n                end\n                \n                rows[i].add(num)\n                cols[j].add(num)\n                boxes[box_index].add(num)\n            end\n        end\n    end\n    \n    true\nend",
        testCases: [
          {
            input:
              '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "true",
            weight: 0.6,
            description: "Valid Sudoku board",
          },
          {
            input:
              '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "false",
            weight: 0.4,
            description: "Invalid Sudoku (duplicate in column)",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    bool isValidSudoku(vector<vector<char>>& board) {\n        // Your code here\n        return false;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    bool isValidSudoku(vector<vector<char>>& board) {\n        vector<unordered_set<char>> rows(9);\n        vector<unordered_set<char>> cols(9);\n        vector<unordered_set<char>> boxes(9);\n        \n        for (int i = 0; i < 9; i++) {\n            for (int j = 0; j < 9; j++) {\n                if (board[i][j] != '.') {\n                    char num = board[i][j];\n                    int boxIndex = (i / 3) * 3 + j / 3;\n                    \n                    if (rows[i].count(num) || \n                        cols[j].count(num) || \n                        boxes[boxIndex].count(num)) {\n                        return false;\n                    }\n                    \n                    rows[i].insert(num);\n                    cols[j].insert(num);\n                    boxes[boxIndex].insert(num);\n                }\n            }\n        }\n        \n        return true;\n    }\n};",
        testCases: [
          {
            input:
              '[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "true",
            weight: 0.6,
            description: "Valid Sudoku board",
          },
          {
            input:
              '[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]',
            expected_output: "false",
            weight: 0.4,
            description: "Invalid Sudoku (duplicate in column)",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(1)",
      spaceComplexity: "O(1)",
      constraints: [
        "board.length == 9",
        "board[i].length == 9",
        "board[i][j] is a digit 1-9 or '.'",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 30,
      tags: ["array", "hash-table"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Uber"],
      topic: "Hash Tables",
    },
  },

  // Stack & Queue - Easy: Valid Parentheses
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    text: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.\n\n**Example 1:**\nInput: s = \"()\"\nOutput: true\n\n**Example 2:**\nInput: s = \"()[]{}\"\nOutput: true\n\n**Example 3:**\nInput: s = \"(]\"\nOutput: false",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def isValid(self, s):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def isValid(self, s):\n        stack = []\n        mapping = {')': '(', '}': '{', ']': '['}\n        \n        for char in s:\n            if char in mapping:\n                # Closing bracket\n                if not stack or stack.pop() != mapping[char]:\n                    return False\n            else:\n                # Opening bracket\n                stack.append(char)\n        \n        return len(stack) == 0",
        testCases: [
          {
            input: '"()"',
            expected_output: "True",
            weight: 0.25,
            description: "Simple parentheses",
          },
          {
            input: '"()[]{}"',
            expected_output: "True",
            weight: 0.25,
            description: "Multiple bracket types",
          },
          {
            input: '"(]"',
            expected_output: "False",
            weight: 0.25,
            description: "Mismatched brackets",
          },
          {
            input: '"([)]"',
            expected_output: "False",
            weight: 0.25,
            description: "Wrong order",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {string} s\n * @return {boolean}\n */\nvar isValid = function(s) {\n    const stack = [];\n    const mapping = {')': '(', '}': '{', ']': '['};\n    \n    for (const char of s) {\n        if (char in mapping) {\n            // Closing bracket\n            if (stack.length === 0 || stack.pop() !== mapping[char]) {\n                return false;\n            }\n        } else {\n            // Opening bracket\n            stack.push(char);\n        }\n    }\n    \n    return stack.length === 0;\n};",
        testCases: [
          {
            input: '"()"',
            expected_output: "true",
            weight: 0.25,
            description: "Simple parentheses",
          },
          {
            input: '"()[]{}"',
            expected_output: "true",
            weight: 0.25,
            description: "Multiple bracket types",
          },
          {
            input: '"(]"',
            expected_output: "false",
            weight: 0.25,
            description: "Mismatched brackets",
          },
          {
            input: '"([)]"',
            expected_output: "false",
            weight: 0.25,
            description: "Wrong order",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public boolean isValid(String s) {\n        // Your code here\n        return false;\n    }\n}",
        solutionCode:
          "class Solution {\n    public boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        Map<Character, Character> mapping = new HashMap<>();\n        mapping.put(')', '(');\n        mapping.put('}', '{');\n        mapping.put(']', '[');\n        \n        for (char c : s.toCharArray()) {\n            if (mapping.containsKey(c)) {\n                // Closing bracket\n                if (stack.isEmpty() || stack.pop() != mapping.get(c)) {\n                    return false;\n                }\n            } else {\n                // Opening bracket\n                stack.push(c);\n            }\n        }\n        \n        return stack.isEmpty();\n    }\n}",
        testCases: [
          {
            input: '"()"',
            expected_output: "true",
            weight: 0.25,
            description: "Simple parentheses",
          },
          {
            input: '"()[]{}"',
            expected_output: "true",
            weight: 0.25,
            description: "Multiple bracket types",
          },
          {
            input: '"(]"',
            expected_output: "false",
            weight: 0.25,
            description: "Mismatched brackets",
          },
          {
            input: '"([)]"',
            expected_output: "false",
            weight: 0.25,
            description: "Wrong order",
          },
        ],
      },
      {
        language: "go",
        starterCode: "func isValid(s string) bool {\n    // Your code here\n    return false\n}",
        solutionCode:
          "func isValid(s string) bool {\n    stack := []rune{}\n    mapping := map[rune]rune{\n        ')': '(',\n        '}': '{',\n        ']': '[',\n    }\n    \n    for _, char := range s {\n        if opening, exists := mapping[char]; exists {\n            // Closing bracket\n            if len(stack) == 0 || stack[len(stack)-1] != opening {\n                return false\n            }\n            stack = stack[:len(stack)-1] // pop\n        } else {\n            // Opening bracket\n            stack = append(stack, char)\n        }\n    }\n    \n    return len(stack) == 0\n}",
        testCases: [
          {
            input: '"()"',
            expected_output: "true",
            weight: 0.25,
            description: "Simple parentheses",
          },
          {
            input: '"()[]{}"',
            expected_output: "true",
            weight: 0.25,
            description: "Multiple bracket types",
          },
          {
            input: '"(]"',
            expected_output: "false",
            weight: 0.25,
            description: "Mismatched brackets",
          },
          {
            input: '"([)]"',
            expected_output: "false",
            weight: 0.25,
            description: "Wrong order",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {String} s\n# @return {Boolean}\ndef is_valid(s)\n    # Your code here\nend",
        solutionCode:
          "# @param {String} s\n# @return {Boolean}\ndef is_valid(s)\n    stack = []\n    mapping = {')' => '(', '}' => '{', ']' => '['}\n    \n    s.each_char do |char|\n        if mapping.key?(char)\n            # Closing bracket\n            return false if stack.empty? || stack.pop != mapping[char]\n        else\n            # Opening bracket\n            stack.push(char)\n        end\n    end\n    \n    stack.empty?\nend",
        testCases: [
          {
            input: '"()"',
            expected_output: "true",
            weight: 0.25,
            description: "Simple parentheses",
          },
          {
            input: '"()[]{}"',
            expected_output: "true",
            weight: 0.25,
            description: "Multiple bracket types",
          },
          {
            input: '"(]"',
            expected_output: "false",
            weight: 0.25,
            description: "Mismatched brackets",
          },
          {
            input: '"([)]"',
            expected_output: "false",
            weight: 0.25,
            description: "Wrong order",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    bool isValid(string s) {\n        // Your code here\n        return false;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    bool isValid(string s) {\n        stack<char> st;\n        unordered_map<char, char> mapping = {\n            {')', '('},\n            {'}', '{'},\n            {']', '['}\n        };\n        \n        for (char c : s) {\n            if (mapping.find(c) != mapping.end()) {\n                // Closing bracket\n                if (st.empty() || st.top() != mapping[c]) {\n                    return false;\n                }\n                st.pop();\n            } else {\n                // Opening bracket\n                st.push(c);\n            }\n        }\n        \n        return st.empty();\n    }\n};",
        testCases: [
          {
            input: '"()"',
            expected_output: "true",
            weight: 0.25,
            description: "Simple parentheses",
          },
          {
            input: '"()[]{}"',
            expected_output: "true",
            weight: 0.25,
            description: "Multiple bracket types",
          },
          {
            input: '"(]"',
            expected_output: "false",
            weight: 0.25,
            description: "Mismatched brackets",
          },
          {
            input: '"([)]"',
            expected_output: "false",
            weight: 0.25,
            description: "Wrong order",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      constraints: ["1 <= s.length <= 10^4", "s consists of parentheses only '()[]{}'"],
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
      tags: ["string", "stack"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Stack & Queue",
    },
  },

  // Stack & Queue - Medium: Implement Queue using Stacks
  {
    id: "implement-queue-using-stacks",
    title: "Implement Queue using Stacks",
    text: 'Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).\n\nImplement the MyQueue class:\n\n- void push(int x) Pushes element x to the back of the queue.\n- int pop() Removes the element from the front of the queue and returns it.\n- int peek() Returns the element at the front of the queue.\n- boolean empty() Returns true if the queue is empty, false otherwise.\n\nNotes:\n- You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.\n- Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack\'s standard operations.\n\n**Example:**\nInput\n["MyQueue", "push", "push", "peek", "pop", "empty"]\n[[], [1], [2], [], [], []]\nOutput\n[null, null, null, 1, 1, false]',
    implementations: [
      {
        language: "python",
        starterCode:
          "class MyQueue:\n\n    def __init__(self):\n        # Your code here\n        pass\n\n    def push(self, x):\n        # Your code here\n        pass\n\n    def pop(self):\n        # Your code here\n        pass\n\n    def peek(self):\n        # Your code here\n        pass\n\n    def empty(self):\n        # Your code here\n        pass\n\n# Your MyQueue object will be instantiated and called as such:\n# obj = MyQueue()\n# obj.push(x)\n# param_2 = obj.pop()\n# param_3 = obj.peek()\n# param_4 = obj.empty()",
        solutionCode:
          "class MyQueue:\n\n    def __init__(self):\n        self.input_stack = []\n        self.output_stack = []\n\n    def push(self, x):\n        self.input_stack.append(x)\n\n    def pop(self):\n        self._move_to_output()\n        return self.output_stack.pop()\n\n    def peek(self):\n        self._move_to_output()\n        return self.output_stack[-1]\n\n    def empty(self):\n        return len(self.input_stack) == 0 and len(self.output_stack) == 0\n    \n    def _move_to_output(self):\n        if not self.output_stack:\n            while self.input_stack:\n                self.output_stack.append(self.input_stack.pop())",
        testCases: [
          {
            input: '["MyQueue","push","push","peek","pop","empty"], [[],[1],[2],[],[],[]]',
            expected_output: "[null,null,null,1,1,false]",
            weight: 1.0,
            description: "Standard queue operations",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "var MyQueue = function() {\n    // Your code here\n};\n\n/** \n * @param {number} x\n * @return {void}\n */\nMyQueue.prototype.push = function(x) {\n    // Your code here\n};\n\n/**\n * @return {number}\n */\nMyQueue.prototype.pop = function() {\n    // Your code here\n};\n\n/**\n * @return {number}\n */\nMyQueue.prototype.peek = function() {\n    // Your code here\n};\n\n/**\n * @return {boolean}\n */\nMyQueue.prototype.empty = function() {\n    // Your code here\n};\n\n/**\n * Your MyQueue object will be instantiated and called as such:\n * var obj = new MyQueue();\n * obj.push(x);\n * var param_2 = obj.pop();\n * var param_3 = obj.peek();\n * var param_4 = obj.empty();\n */",
        solutionCode:
          "var MyQueue = function() {\n    this.inputStack = [];\n    this.outputStack = [];\n};\n\n/** \n * @param {number} x\n * @return {void}\n */\nMyQueue.prototype.push = function(x) {\n    this.inputStack.push(x);\n};\n\n/**\n * @return {number}\n */\nMyQueue.prototype.pop = function() {\n    this._moveToOutput();\n    return this.outputStack.pop();\n};\n\n/**\n * @return {number}\n */\nMyQueue.prototype.peek = function() {\n    this._moveToOutput();\n    return this.outputStack[this.outputStack.length - 1];\n};\n\n/**\n * @return {boolean}\n */\nMyQueue.prototype.empty = function() {\n    return this.inputStack.length === 0 && this.outputStack.length === 0;\n};\n\nMyQueue.prototype._moveToOutput = function() {\n    if (this.outputStack.length === 0) {\n        while (this.inputStack.length > 0) {\n            this.outputStack.push(this.inputStack.pop());\n        }\n    }\n};",
        testCases: [
          {
            input: '["MyQueue","push","push","peek","pop","empty"], [[],[1],[2],[],[],[]]',
            expected_output: "[null,null,null,1,1,false]",
            weight: 1.0,
            description: "Standard queue operations",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class MyQueue {\n\n    public MyQueue() {\n        // Your code here\n    }\n    \n    public void push(int x) {\n        // Your code here\n    }\n    \n    public int pop() {\n        // Your code here\n        return 0;\n    }\n    \n    public int peek() {\n        // Your code here\n        return 0;\n    }\n    \n    public boolean empty() {\n        // Your code here\n        return false;\n    }\n}\n\n/**\n * Your MyQueue object will be instantiated and called as such:\n * MyQueue obj = new MyQueue();\n * obj.push(x);\n * int param_2 = obj.pop();\n * int param_3 = obj.peek();\n * boolean param_4 = obj.empty();\n */",
        solutionCode:
          "class MyQueue {\n    private Stack<Integer> inputStack;\n    private Stack<Integer> outputStack;\n\n    public MyQueue() {\n        inputStack = new Stack<>();\n        outputStack = new Stack<>();\n    }\n    \n    public void push(int x) {\n        inputStack.push(x);\n    }\n    \n    public int pop() {\n        moveToOutput();\n        return outputStack.pop();\n    }\n    \n    public int peek() {\n        moveToOutput();\n        return outputStack.peek();\n    }\n    \n    public boolean empty() {\n        return inputStack.isEmpty() && outputStack.isEmpty();\n    }\n    \n    private void moveToOutput() {\n        if (outputStack.isEmpty()) {\n            while (!inputStack.isEmpty()) {\n                outputStack.push(inputStack.pop());\n            }\n        }\n    }\n}",
        testCases: [
          {
            input: '["MyQueue","push","push","peek","pop","empty"], [[],[1],[2],[],[],[]]',
            expected_output: "[null,null,null,1,1,false]",
            weight: 1.0,
            description: "Standard queue operations",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "type MyQueue struct {\n    // Your code here\n}\n\nfunc Constructor() MyQueue {\n    // Your code here\n    return MyQueue{}\n}\n\nfunc (this *MyQueue) Push(x int) {\n    // Your code here\n}\n\nfunc (this *MyQueue) Pop() int {\n    // Your code here\n    return 0\n}\n\nfunc (this *MyQueue) Peek() int {\n    // Your code here\n    return 0\n}\n\nfunc (this *MyQueue) Empty() bool {\n    // Your code here\n    return false\n}\n\n/**\n * Your MyQueue object will be instantiated and called as such:\n * obj := Constructor();\n * obj.Push(x);\n * param_2 := obj.Pop();\n * param_3 := obj.Peek();\n * param_4 := obj.Empty();\n */",
        solutionCode:
          "type MyQueue struct {\n    inputStack  []int\n    outputStack []int\n}\n\nfunc Constructor() MyQueue {\n    return MyQueue{\n        inputStack:  []int{},\n        outputStack: []int{},\n    }\n}\n\nfunc (this *MyQueue) Push(x int) {\n    this.inputStack = append(this.inputStack, x)\n}\n\nfunc (this *MyQueue) Pop() int {\n    this.moveToOutput()\n    val := this.outputStack[len(this.outputStack)-1]\n    this.outputStack = this.outputStack[:len(this.outputStack)-1]\n    return val\n}\n\nfunc (this *MyQueue) Peek() int {\n    this.moveToOutput()\n    return this.outputStack[len(this.outputStack)-1]\n}\n\nfunc (this *MyQueue) Empty() bool {\n    return len(this.inputStack) == 0 && len(this.outputStack) == 0\n}\n\nfunc (this *MyQueue) moveToOutput() {\n    if len(this.outputStack) == 0 {\n        for len(this.inputStack) > 0 {\n            val := this.inputStack[len(this.inputStack)-1]\n            this.inputStack = this.inputStack[:len(this.inputStack)-1]\n            this.outputStack = append(this.outputStack, val)\n        }\n    }\n}",
        testCases: [
          {
            input: '["MyQueue","push","push","peek","pop","empty"], [[],[1],[2],[],[],[]]',
            expected_output: "[null,null,null,1,1,false]",
            weight: 1.0,
            description: "Standard queue operations",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "class MyQueue\n\n=begin\n    Initialize your data structure here.\n=end\n    def initialize()\n        # Your code here\n    end\n\n\n=begin\n    Push element x to the back of queue.\n    :type x: Integer\n    :rtype: Void\n=end\n    def push(x)\n        # Your code here\n    end\n\n\n=begin\n    Removes the element from in front of queue and returns that element.\n    :rtype: Integer\n=end\n    def pop()\n        # Your code here\n    end\n\n\n=begin\n    Get the front element.\n    :rtype: Integer\n=end\n    def peek()\n        # Your code here\n    end\n\n\n=begin\n    Returns whether the queue is empty.\n    :rtype: Boolean\n=end\n    def empty()\n        # Your code here\n    end\n\n\nend\n\n# Your MyQueue object will be instantiated and called as such:\n# obj = MyQueue.new()\n# obj.push(x)\n# param_2 = obj.pop()\n# param_3 = obj.peek()\n# param_4 = obj.empty()",
        solutionCode:
          "class MyQueue\n    def initialize()\n        @input_stack = []\n        @output_stack = []\n    end\n\n    def push(x)\n        @input_stack.push(x)\n    end\n\n    def pop()\n        move_to_output\n        @output_stack.pop\n    end\n\n    def peek()\n        move_to_output\n        @output_stack.last\n    end\n\n    def empty()\n        @input_stack.empty? && @output_stack.empty?\n    end\n\n    private\n\n    def move_to_output\n        if @output_stack.empty?\n            while !@input_stack.empty?\n                @output_stack.push(@input_stack.pop)\n            end\n        end\n    end\nend",
        testCases: [
          {
            input: '["MyQueue","push","push","peek","pop","empty"], [[],[1],[2],[],[],[]]',
            expected_output: "[null,null,null,1,1,false]",
            weight: 1.0,
            description: "Standard queue operations",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class MyQueue {\npublic:\n    MyQueue() {\n        // Your code here\n    }\n    \n    void push(int x) {\n        // Your code here\n    }\n    \n    int pop() {\n        // Your code here\n        return 0;\n    }\n    \n    int peek() {\n        // Your code here\n        return 0;\n    }\n    \n    bool empty() {\n        // Your code here\n        return false;\n    }\n};\n\n/**\n * Your MyQueue object will be instantiated and called as such:\n * MyQueue* obj = new MyQueue();\n * obj->push(x);\n * int param_2 = obj->pop();\n * int param_3 = obj->peek();\n * bool param_4 = obj->empty();\n */",
        solutionCode:
          "class MyQueue {\nprivate:\n    stack<int> inputStack;\n    stack<int> outputStack;\n    \n    void moveToOutput() {\n        if (outputStack.empty()) {\n            while (!inputStack.empty()) {\n                outputStack.push(inputStack.top());\n                inputStack.pop();\n            }\n        }\n    }\n    \npublic:\n    MyQueue() {\n        \n    }\n    \n    void push(int x) {\n        inputStack.push(x);\n    }\n    \n    int pop() {\n        moveToOutput();\n        int val = outputStack.top();\n        outputStack.pop();\n        return val;\n    }\n    \n    int peek() {\n        moveToOutput();\n        return outputStack.top();\n    }\n    \n    bool empty() {\n        return inputStack.empty() && outputStack.empty();\n    }\n};",
        testCases: [
          {
            input: '["MyQueue","push","push","peek","pop","empty"], [[],[1],[2],[],[],[]]',
            expected_output: "[null,null,null,1,1,false]",
            weight: 1.0,
            description: "Standard queue operations",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(1) amortized",
      spaceComplexity: "O(n)",
      constraints: [
        "1 <= x <= 9",
        "At most 100 calls will be made to push, pop, peek, and empty",
        "All the calls to pop and peek are valid",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 25,
      tags: ["stack", "design", "queue"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Bloomberg"],
      topic: "Stack & Queue",
    },
  },

  // Stack & Queue - Hard: Largest Rectangle in Histogram
  {
    id: "largest-rectangle-histogram",
    title: "Largest Rectangle in Histogram",
    text: "Given an array of integers heights representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.\n\n**Example 1:**\nInput: heights = [2,1,5,6,2,3]\nOutput: 10\nExplanation: The largest rectangle is shown in the red area, which has an area = 10 units.\n\n**Example 2:**\nInput: heights = [2,4]\nOutput: 4",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def largestRectangleArea(self, heights):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def largestRectangleArea(self, heights):\n        stack = []\n        max_area = 0\n        \n        for i, h in enumerate(heights):\n            while stack and heights[stack[-1]] > h:\n                height = heights[stack.pop()]\n                width = i if not stack else i - stack[-1] - 1\n                max_area = max(max_area, height * width)\n            stack.append(i)\n        \n        while stack:\n            height = heights[stack.pop()]\n            width = len(heights) if not stack else len(heights) - stack[-1] - 1\n            max_area = max(max_area, height * width)\n        \n        return max_area",
        testCases: [
          {
            input: "[2,1,5,6,2,3]",
            expected_output: "10",
            weight: 0.5,
            description: "Standard histogram",
          },
          {
            input: "[2,4]",
            expected_output: "4",
            weight: 0.25,
            description: "Two bars",
          },
          {
            input: "[6,7,5,2,4,5,9,3]",
            expected_output: "16",
            weight: 0.25,
            description: "Complex histogram",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} heights\n * @return {number}\n */\nvar largestRectangleArea = function(heights) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} heights\n * @return {number}\n */\nvar largestRectangleArea = function(heights) {\n    const stack = [];\n    let maxArea = 0;\n    \n    for (let i = 0; i < heights.length; i++) {\n        while (stack.length > 0 && heights[stack[stack.length - 1]] > heights[i]) {\n            const height = heights[stack.pop()];\n            const width = stack.length === 0 ? i : i - stack[stack.length - 1] - 1;\n            maxArea = Math.max(maxArea, height * width);\n        }\n        stack.push(i);\n    }\n    \n    while (stack.length > 0) {\n        const height = heights[stack.pop()];\n        const width = stack.length === 0 ? heights.length : heights.length - stack[stack.length - 1] - 1;\n        maxArea = Math.max(maxArea, height * width);\n    }\n    \n    return maxArea;\n};",
        testCases: [
          {
            input: "[2,1,5,6,2,3]",
            expected_output: "10",
            weight: 0.5,
            description: "Standard histogram",
          },
          {
            input: "[2,4]",
            expected_output: "4",
            weight: 0.25,
            description: "Two bars",
          },
          {
            input: "[6,7,5,2,4,5,9,3]",
            expected_output: "16",
            weight: 0.25,
            description: "Complex histogram",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int largestRectangleArea(int[] heights) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int largestRectangleArea(int[] heights) {\n        Stack<Integer> stack = new Stack<>();\n        int maxArea = 0;\n        \n        for (int i = 0; i < heights.length; i++) {\n            while (!stack.isEmpty() && heights[stack.peek()] > heights[i]) {\n                int height = heights[stack.pop()];\n                int width = stack.isEmpty() ? i : i - stack.peek() - 1;\n                maxArea = Math.max(maxArea, height * width);\n            }\n            stack.push(i);\n        }\n        \n        while (!stack.isEmpty()) {\n            int height = heights[stack.pop()];\n            int width = stack.isEmpty() ? heights.length : heights.length - stack.peek() - 1;\n            maxArea = Math.max(maxArea, height * width);\n        }\n        \n        return maxArea;\n    }\n}",
        testCases: [
          {
            input: "[2,1,5,6,2,3]",
            expected_output: "10",
            weight: 0.5,
            description: "Standard histogram",
          },
          {
            input: "[2,4]",
            expected_output: "4",
            weight: 0.25,
            description: "Two bars",
          },
          {
            input: "[6,7,5,2,4,5,9,3]",
            expected_output: "16",
            weight: 0.25,
            description: "Complex histogram",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func largestRectangleArea(heights []int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func largestRectangleArea(heights []int) int {\n    stack := []int{}\n    maxArea := 0\n    \n    for i, h := range heights {\n        for len(stack) > 0 && heights[stack[len(stack)-1]] > h {\n            height := heights[stack[len(stack)-1]]\n            stack = stack[:len(stack)-1] // pop\n            \n            var width int\n            if len(stack) == 0 {\n                width = i\n            } else {\n                width = i - stack[len(stack)-1] - 1\n            }\n            \n            area := height * width\n            if area > maxArea {\n                maxArea = area\n            }\n        }\n        stack = append(stack, i)\n    }\n    \n    for len(stack) > 0 {\n        height := heights[stack[len(stack)-1]]\n        stack = stack[:len(stack)-1] // pop\n        \n        var width int\n        if len(stack) == 0 {\n            width = len(heights)\n        } else {\n            width = len(heights) - stack[len(stack)-1] - 1\n        }\n        \n        area := height * width\n        if area > maxArea {\n            maxArea = area\n        }\n    }\n    \n    return maxArea\n}",
        testCases: [
          {
            input: "[2,1,5,6,2,3]",
            expected_output: "10",
            weight: 0.5,
            description: "Standard histogram",
          },
          {
            input: "[2,4]",
            expected_output: "4",
            weight: 0.25,
            description: "Two bars",
          },
          {
            input: "[6,7,5,2,4,5,9,3]",
            expected_output: "16",
            weight: 0.25,
            description: "Complex histogram",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} heights\n# @return {Integer}\ndef largest_rectangle_area(heights)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} heights\n# @return {Integer}\ndef largest_rectangle_area(heights)\n    stack = []\n    max_area = 0\n    \n    heights.each_with_index do |h, i|\n        while !stack.empty? && heights[stack.last] > h\n            height = heights[stack.pop]\n            width = stack.empty? ? i : i - stack.last - 1\n            max_area = [max_area, height * width].max\n        end\n        stack.push(i)\n    end\n    \n    while !stack.empty?\n        height = heights[stack.pop]\n        width = stack.empty? ? heights.length : heights.length - stack.last - 1\n        max_area = [max_area, height * width].max\n    end\n    \n    max_area\nend",
        testCases: [
          {
            input: "[2,1,5,6,2,3]",
            expected_output: "10",
            weight: 0.5,
            description: "Standard histogram",
          },
          {
            input: "[2,4]",
            expected_output: "4",
            weight: 0.25,
            description: "Two bars",
          },
          {
            input: "[6,7,5,2,4,5,9,3]",
            expected_output: "16",
            weight: 0.25,
            description: "Complex histogram",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int largestRectangleArea(vector<int>& heights) {\n        stack<int> st;\n        int maxArea = 0;\n        \n        for (int i = 0; i < heights.size(); i++) {\n            while (!st.empty() && heights[st.top()] > heights[i]) {\n                int height = heights[st.top()];\n                st.pop();\n                int width = st.empty() ? i : i - st.top() - 1;\n                maxArea = max(maxArea, height * width);\n            }\n            st.push(i);\n        }\n        \n        while (!st.empty()) {\n            int height = heights[st.top()];\n            st.pop();\n            int width = st.empty() ? (int)heights.size() : (int)heights.size() - st.top() - 1;\n            maxArea = max(maxArea, height * width);\n        }\n        \n        return maxArea;\n    }\n};",
        testCases: [
          {
            input: "[2,1,5,6,2,3]",
            expected_output: "10",
            weight: 0.5,
            description: "Standard histogram",
          },
          {
            input: "[2,4]",
            expected_output: "4",
            weight: 0.25,
            description: "Two bars",
          },
          {
            input: "[6,7,5,2,4,5,9,3]",
            expected_output: "16",
            weight: 0.25,
            description: "Complex histogram",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      constraints: ["1 <= heights.length <= 10^5", "0 <= heights[i] <= 10^4"],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 40,
      tags: ["array", "stack", "monotonic-stack"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Stack & Queue",
    },
  },

  // Recursion & Backtracking - Easy: Generate Parentheses
  {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    text: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\n**Example 1:**\nInput: n = 3\nOutput: ["((()))","(()())","(())()","()(())","()()()"]\n\n**Example 2:**\nInput: n = 1\nOutput: ["()"]\n\n**Example 3:**\nInput: n = 0\nOutput: [""]',
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def generateParenthesis(self, n):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def generateParenthesis(self, n):\n        result = []\n        \n        def backtrack(current, open_count, close_count):\n            if len(current) == 2 * n:\n                result.append(current)\n                return\n            \n            if open_count < n:\n                backtrack(current + '(', open_count + 1, close_count)\n            \n            if close_count < open_count:\n                backtrack(current + ')', open_count, close_count + 1)\n        \n        backtrack('', 0, 0)\n        return result",
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          {
            input: "1",
            expected_output: '["()"]',
            weight: 0.25,
            description: "Single pair",
          },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = function(n) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = function(n) {\n    const result = [];\n    \n    function backtrack(current, openCount, closeCount) {\n        if (current.length === 2 * n) {\n            result.push(current);\n            return;\n        }\n        \n        if (openCount < n) {\n            backtrack(current + '(', openCount + 1, closeCount);\n        }\n        \n        if (closeCount < openCount) {\n            backtrack(current + ')', openCount, closeCount + 1);\n        }\n    }\n    \n    backtrack('', 0, 0);\n    return result;\n};",
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          {
            input: "1",
            expected_output: '["()"]',
            weight: 0.25,
            description: "Single pair",
          },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public List<String> generateParenthesis(int n) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}",
        solutionCode:
          'class Solution {\n    public List<String> generateParenthesis(int n) {\n        List<String> result = new ArrayList<>();\n        backtrack(result, "", 0, 0, n);\n        return result;\n    }\n    \n    private void backtrack(List<String> result, String current, int openCount, int closeCount, int n) {\n        if (current.length() == 2 * n) {\n            result.add(current);\n            return;\n        }\n        \n        if (openCount < n) {\n            backtrack(result, current + "(", openCount + 1, closeCount, n);\n        }\n        \n        if (closeCount < openCount) {\n            backtrack(result, current + ")", openCount, closeCount + 1, n);\n        }\n    }\n}',
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          {
            input: "1",
            expected_output: '["()"]',
            weight: 0.25,
            description: "Single pair",
          },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func generateParenthesis(n int) []string {\n    // Your code here\n    return []string{}\n}",
        solutionCode:
          'func generateParenthesis(n int) []string {\n    var result []string\n    \n    var backtrack func(current string, openCount, closeCount int)\n    backtrack = func(current string, openCount, closeCount int) {\n        if len(current) == 2*n {\n            result = append(result, current)\n            return\n        }\n        \n        if openCount < n {\n            backtrack(current+"(", openCount+1, closeCount)\n        }\n        \n        if closeCount < openCount {\n            backtrack(current+")", openCount, closeCount+1)\n        }\n    }\n    \n    backtrack("", 0, 0)\n    return result\n}',
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          {
            input: "1",
            expected_output: '["()"]',
            weight: 0.25,
            description: "Single pair",
          },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer} n\n# @return {String[]}\ndef generate_parenthesis(n)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer} n\n# @return {String[]}\ndef generate_parenthesis(n)\n    result = []\n    \n    def backtrack(current, open_count, close_count, n, result)\n        if current.length == 2 * n\n            result << current\n            return\n        end\n        \n        if open_count < n\n            backtrack(current + '(', open_count + 1, close_count, n, result)\n        end\n        \n        if close_count < open_count\n            backtrack(current + ')', open_count, close_count + 1, n, result)\n        end\n    end\n    \n    backtrack('', 0, 0, n, result)\n    result\nend",
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          {
            input: "1",
            expected_output: '["()"]',
            weight: 0.25,
            description: "Single pair",
          },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          'class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        vector<string> result;\n        backtrack(result, "", 0, 0, n);\n        return result;\n    }\n    \nprivate:\n    void backtrack(vector<string>& result, string current, int openCount, int closeCount, int n) {\n        if (current.length() == 2 * n) {\n            result.push_back(current);\n            return;\n        }\n        \n        if (openCount < n) {\n            backtrack(result, current + "(", openCount + 1, closeCount, n);\n        }\n        \n        if (closeCount < openCount) {\n            backtrack(result, current + ")", openCount, closeCount + 1, n);\n        }\n    }\n};',
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          {
            input: "1",
            expected_output: '["()"]',
            weight: 0.25,
            description: "Single pair",
          },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(4^n / sqrt(n))",
      spaceComplexity: "O(4^n / sqrt(n))",
      constraints: ["1 <= n <= 8"],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "EASY",
      estimatedDuration: 20,
      tags: ["string", "dynamic-programming", "backtracking"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Recursion & Backtracking",
    },
  },

  // Recursion & Backtracking - Easy: Generate Parentheses
  {
    id: "generate-parentheses",
    title: "Generate Parentheses",
    text: 'Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.\n\n**Example 1:**\nInput: n = 3\nOutput: ["((()))","(()())","(())()","()(())","()()()"]\n\n**Example 2:**\nInput: n = 1\nOutput: ["()"]\n\n**Example 3:**\nInput: n = 0\nOutput: [""]',
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def generateParenthesis(self, n):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def generateParenthesis(self, n):\n        result = []\n        \n        def backtrack(current, open_count, close_count):\n            if len(current) == 2 * n:\n                result.append(current)\n                return\n            \n            if open_count < n:\n                backtrack(current + '(', open_count + 1, close_count)\n            \n            if close_count < open_count:\n                backtrack(current + ')', open_count, close_count + 1)\n        \n        backtrack('', 0, 0)\n        return result",
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          { input: "1", expected_output: '["()"]', weight: 0.25, description: "Single pair" },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = function(n) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number} n\n * @return {string[]}\n */\nvar generateParenthesis = function(n) {\n    const result = [];\n    \n    function backtrack(current, openCount, closeCount) {\n        if (current.length === 2 * n) {\n            result.push(current);\n            return;\n        }\n        \n        if (openCount < n) {\n            backtrack(current + '(', openCount + 1, closeCount);\n        }\n        \n        if (closeCount < openCount) {\n            backtrack(current + ')', openCount, closeCount + 1);\n        }\n    }\n    \n    backtrack('', 0, 0);\n    return result;\n};",
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          { input: "1", expected_output: '["()"]', weight: 0.25, description: "Single pair" },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public List<String> generateParenthesis(int n) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}",
        solutionCode:
          'class Solution {\n    public List<String> generateParenthesis(int n) {\n        List<String> result = new ArrayList<>();\n        backtrack(result, "", 0, 0, n);\n        return result;\n    }\n    \n    private void backtrack(List<String> result, String current, int openCount, int closeCount, int n) {\n        if (current.length() == 2 * n) {\n            result.add(current);\n            return;\n        }\n        \n        if (openCount < n) {\n            backtrack(result, current + "(", openCount + 1, closeCount, n);\n        }\n        \n        if (closeCount < openCount) {\n            backtrack(result, current + ")", openCount, closeCount + 1, n);\n        }\n    }\n}',
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          { input: "1", expected_output: '["()"]', weight: 0.25, description: "Single pair" },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func generateParenthesis(n int) []string {\n    // Your code here\n    return []string{}\n}",
        solutionCode:
          'func generateParenthesis(n int) []string {\n    var result []string\n    \n    var backtrack func(current string, openCount, closeCount int)\n    backtrack = func(current string, openCount, closeCount int) {\n        if len(current) == 2*n {\n            result = append(result, current)\n            return\n        }\n        \n        if openCount < n {\n            backtrack(current+"(", openCount+1, closeCount)\n        }\n        \n        if closeCount < openCount {\n            backtrack(current+")", openCount, closeCount+1)\n        }\n    }\n    \n    backtrack("", 0, 0)\n    return result\n}',
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          { input: "1", expected_output: '["()"]', weight: 0.25, description: "Single pair" },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer} n\n# @return {String[]}\ndef generate_parenthesis(n)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer} n\n# @return {String[]}\ndef generate_parenthesis(n)\n    result = []\n    \n    def backtrack(current, open_count, close_count, n, result)\n        if current.length == 2 * n\n            result << current\n            return\n        end\n        \n        if open_count < n\n            backtrack(current + '(', open_count + 1, close_count, n, result)\n        end\n        \n        if close_count < open_count\n            backtrack(current + ')', open_count, close_count + 1, n, result)\n        end\n    end\n    \n    backtrack('', 0, 0, n, result)\n    result\nend",
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          { input: "1", expected_output: '["()"]', weight: 0.25, description: "Single pair" },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          'class Solution {\npublic:\n    vector<string> generateParenthesis(int n) {\n        vector<string> result;\n        backtrack(result, "", 0, 0, n);\n        return result;\n    }\n    \nprivate:\n    void backtrack(vector<string>& result, string current, int openCount, int closeCount, int n) {\n        if (current.length() == 2 * n) {\n            result.push_back(current);\n            return;\n        }\n        \n        if (openCount < n) {\n            backtrack(result, current + "(", openCount + 1, closeCount, n);\n        }\n        \n        if (closeCount < openCount) {\n            backtrack(result, current + ")", openCount, closeCount + 1, n);\n        }\n    }\n};',
        testCases: [
          {
            input: "3",
            expected_output: '["((()))","(()())","(())()","()(())","()()()"]',
            weight: 0.5,
            description: "Three pairs of parentheses",
          },
          { input: "1", expected_output: '["()"]', weight: 0.25, description: "Single pair" },
          {
            input: "2",
            expected_output: '["(())","()()"]',
            weight: 0.25,
            description: "Two pairs",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(4^n / sqrt(n))",
      spaceComplexity: "O(4^n / sqrt(n))",
      constraints: ["1 <= n <= 8"],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "EASY",
      estimatedDuration: 20,
      tags: ["string", "dynamic-programming", "backtracking"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Recursion & Backtracking",
    },
  },

  // Recursion & Backtracking - Medium: N-Queens
  {
    id: "n-queens",
    title: "N-Queens",
    text: 'The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other.\n\nGiven an integer n, return all distinct solutions to the n-queens puzzle. You may return the answer in any order.\n\nEach solution contains a distinct board configuration of the n-queens\' placement, where \'Q\' and \'.\' both indicate a queen and an empty space, respectively.\n\n**Example 1:**\nInput: n = 4\nOutput: [[".Q..","...Q","Q...","..Q."],[".Q..","...Q","Q...","..Q."]]\nExplanation: There exist two distinct solutions to the 4-queens puzzle as shown above\n\n**Example 2:**\nInput: n = 1\nOutput: [["Q"]]',
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def solveNQueens(self, n):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def solveNQueens(self, n):\n        result = []\n        board = ['.' * n for _ in range(n)]\n        \n        def is_safe(row, col):\n            # Check column\n            for i in range(row):\n                if board[i][col] == 'Q':\n                    return False\n            \n            # Check diagonal (top-left to bottom-right)\n            i, j = row - 1, col - 1\n            while i >= 0 and j >= 0:\n                if board[i][j] == 'Q':\n                    return False\n                i -= 1\n                j -= 1\n            \n            # Check diagonal (top-right to bottom-left)\n            i, j = row - 1, col + 1\n            while i >= 0 and j < n:\n                if board[i][j] == 'Q':\n                    return False\n                i -= 1\n                j += 1\n            \n            return True\n        \n        def backtrack(row):\n            if row == n:\n                result.append(board[:])\n                return\n            \n            for col in range(n):\n                if is_safe(row, col):\n                    board[row] = board[row][:col] + 'Q' + board[row][col+1:]\n                    backtrack(row + 1)\n                    board[row] = board[row][:col] + '.' + board[row][col+1:]\n        \n        backtrack(0)\n        return result",
        testCases: [
          {
            input: "4",
            expected_output:
              '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]',
            weight: 0.6,
            description: "4x4 board",
          },
          { input: "1", expected_output: '[[\"Q\"]]', weight: 0.4, description: "1x1 board" },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number} n\n * @return {string[][]}\n */\nvar solveNQueens = function(n) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number} n\n * @return {string[][]}\n */\nvar solveNQueens = function(n) {\n    const result = [];\n    const board = Array(n).fill().map(() => '.'.repeat(n));\n    \n    function isSafe(row, col) {\n        // Check column\n        for (let i = 0; i < row; i++) {\n            if (board[i][col] === 'Q') return false;\n        }\n        \n        // Check diagonal (top-left to bottom-right)\n        for (let i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {\n            if (board[i][j] === 'Q') return false;\n        }\n        \n        // Check diagonal (top-right to bottom-left)\n        for (let i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {\n            if (board[i][j] === 'Q') return false;\n        }\n        \n        return true;\n    }\n    \n    function backtrack(row) {\n        if (row === n) {\n            result.push([...board]);\n            return;\n        }\n        \n        for (let col = 0; col < n; col++) {\n            if (isSafe(row, col)) {\n                board[row] = board[row].substring(0, col) + 'Q' + board[row].substring(col + 1);\n                backtrack(row + 1);\n                board[row] = board[row].substring(0, col) + '.' + board[row].substring(col + 1);\n            }\n        }\n    }\n    \n    backtrack(0);\n    return result;\n};",
        testCases: [
          {
            input: "4",
            expected_output:
              '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]',
            weight: 0.6,
            description: "4x4 board",
          },
          { input: "1", expected_output: '[[\"Q\"]]', weight: 0.4, description: "1x1 board" },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}",
        solutionCode:
          "class Solution {\n    public List<List<String>> solveNQueens(int n) {\n        List<List<String>> result = new ArrayList<>();\n        char[][] board = new char[n][n];\n        \n        // Initialize board\n        for (int i = 0; i < n; i++) {\n            for (int j = 0; j < n; j++) {\n                board[i][j] = '.';\n            }\n        }\n        \n        backtrack(result, board, 0, n);\n        return result;\n    }\n    \n    private void backtrack(List<List<String>> result, char[][] board, int row, int n) {\n        if (row == n) {\n            List<String> solution = new ArrayList<>();\n            for (char[] r : board) {\n                solution.add(new String(r));\n            }\n            result.add(solution);\n            return;\n        }\n        \n        for (int col = 0; col < n; col++) {\n            if (isSafe(board, row, col, n)) {\n                board[row][col] = 'Q';\n                backtrack(result, board, row + 1, n);\n                board[row][col] = '.';\n            }\n        }\n    }\n    \n    private boolean isSafe(char[][] board, int row, int col, int n) {\n        // Check column\n        for (int i = 0; i < row; i++) {\n            if (board[i][col] == 'Q') return false;\n        }\n        \n        // Check diagonal (top-left to bottom-right)\n        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {\n            if (board[i][j] == 'Q') return false;\n        }\n        \n        // Check diagonal (top-right to bottom-left)\n        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {\n            if (board[i][j] == 'Q') return false;\n        }\n        \n        return true;\n    }\n}",
        testCases: [
          {
            input: "4",
            expected_output:
              '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]',
            weight: 0.6,
            description: "4x4 board",
          },
          { input: "1", expected_output: '[[\"Q\"]]', weight: 0.4, description: "1x1 board" },
        ],
      },
      {
        language: "go",
        starterCode:
          "func solveNQueens(n int) [][]string {\n    // Your code here\n    return [][]string{}\n}",
        solutionCode:
          "func solveNQueens(n int) [][]string {\n    var result [][]string\n    board := make([][]byte, n)\n    for i := range board {\n        board[i] = make([]byte, n)\n        for j := range board[i] {\n            board[i][j] = '.'\n        }\n    }\n    \n    var backtrack func(row int)\n    backtrack = func(row int) {\n        if row == n {\n            solution := make([]string, n)\n            for i := range board {\n                solution[i] = string(board[i])\n            }\n            result = append(result, solution)\n            return\n        }\n        \n        for col := 0; col < n; col++ {\n            if isSafe(board, row, col, n) {\n                board[row][col] = 'Q'\n                backtrack(row + 1)\n                board[row][col] = '.'\n            }\n        }\n    }\n    \n    backtrack(0)\n    return result\n}\n\nfunc isSafe(board [][]byte, row, col, n int) bool {\n    // Check column\n    for i := 0; i < row; i++ {\n        if board[i][col] == 'Q' {\n            return false\n        }\n    }\n    \n    // Check diagonal (top-left to bottom-right)\n    for i, j := row-1, col-1; i >= 0 && j >= 0; i, j = i-1, j-1 {\n        if board[i][j] == 'Q' {\n            return false\n        }\n    }\n    \n    // Check diagonal (top-right to bottom-left)\n    for i, j := row-1, col+1; i >= 0 && j < n; i, j = i-1, j+1 {\n        if board[i][j] == 'Q' {\n            return false\n        }\n    }\n    \n    return true\n}",
        testCases: [
          {
            input: "4",
            expected_output:
              '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]',
            weight: 0.6,
            description: "4x4 board",
          },
          { input: "1", expected_output: '[[\"Q\"]]', weight: 0.4, description: "1x1 board" },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer} n\n# @return {String[][]}\ndef solve_n_queens(n)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer} n\n# @return {String[][]}\ndef solve_n_queens(n)\n    result = []\n    board = Array.new(n) { '.' * n }\n    \n    def is_safe(board, row, col, n)\n        # Check column\n        (0...row).each do |i|\n            return false if board[i][col] == 'Q'\n        end\n        \n        # Check diagonal (top-left to bottom-right)\n        i, j = row - 1, col - 1\n        while i >= 0 && j >= 0\n            return false if board[i][j] == 'Q'\n            i -= 1\n            j -= 1\n        end\n        \n        # Check diagonal (top-right to bottom-left)\n        i, j = row - 1, col + 1\n        while i >= 0 && j < n\n            return false if board[i][j] == 'Q'\n            i -= 1\n            j += 1\n        end\n        \n        true\n    end\n    \n    def backtrack(board, row, n, result)\n        if row == n\n            result << board.dup\n            return\n        end\n        \n        (0...n).each do |col|\n            if is_safe(board, row, col, n)\n                board[row] = board[row][0...col] + 'Q' + board[row][col+1..-1]\n                backtrack(board, row + 1, n, result)\n                board[row] = board[row][0...col] + '.' + board[row][col+1..-1]\n            end\n        end\n    end\n    \n    backtrack(board, 0, n, result)\n    result\nend",
        testCases: [
          {
            input: "4",
            expected_output:
              '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]',
            weight: 0.6,
            description: "4x4 board",
          },
          { input: "1", expected_output: '[[\"Q\"]]', weight: 0.4, description: "1x1 board" },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    vector<vector<string>> solveNQueens(int n) {\n        vector<vector<string>> result;\n        vector<string> board(n, string(n, '.'));\n        backtrack(result, board, 0, n);\n        return result;\n    }\n    \nprivate:\n    void backtrack(vector<vector<string>>& result, vector<string>& board, int row, int n) {\n        if (row == n) {\n            result.push_back(board);\n            return;\n        }\n        \n        for (int col = 0; col < n; col++) {\n            if (isSafe(board, row, col, n)) {\n                board[row][col] = 'Q';\n                backtrack(result, board, row + 1, n);\n                board[row][col] = '.';\n            }\n        }\n    }\n    \n    bool isSafe(vector<string>& board, int row, int col, int n) {\n        // Check column\n        for (int i = 0; i < row; i++) {\n            if (board[i][col] == 'Q') return false;\n        }\n        \n        // Check diagonal (top-left to bottom-right)\n        for (int i = row - 1, j = col - 1; i >= 0 && j >= 0; i--, j--) {\n            if (board[i][j] == 'Q') return false;\n        }\n        \n        // Check diagonal (top-right to bottom-left)\n        for (int i = row - 1, j = col + 1; i >= 0 && j < n; i--, j++) {\n            if (board[i][j] == 'Q') return false;\n        }\n        \n        return true;\n    }\n};",
        testCases: [
          {
            input: "4",
            expected_output:
              '[[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"],[\".Q..\",\"...Q\",\"Q...\",\"..Q.\"]]',
            weight: 0.6,
            description: "4x4 board",
          },
          { input: "1", expected_output: '[[\"Q\"]]', weight: 0.4, description: "1x1 board" },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(N!)",
      spaceComplexity: "O(N^2)",
      constraints: ["1 <= n <= 9"],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 35,
      tags: ["array", "backtracking"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Bloomberg"],
      topic: "Recursion & Backtracking",
    },
  },

  // Recursion & Backtracking - Hard: Sudoku Solver
  {
    id: "sudoku-solver",
    title: "Sudoku Solver",
    text: 'Write a program to solve a Sudoku puzzle by filling the empty cells.\n\nA sudoku solution must satisfy all of the following rules:\n\n1. Each of the digits 1-9 must occur exactly once in each row.\n2. Each of the digits 1-9 must occur exactly once in each column.\n3. Each of the digits 1-9 must occur exactly once in each of the 9 3x3 sub-boxes of the grid.\n\nThe \'.\' character indicates empty cells.\n\n**Example 1:**\nInput: board = [["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]\nOutput: [["5","3","4","6","7","8","9","1","2"],["6","7","2","1","9","5","3","4","8"],["1","9","8","3","4","2","5","6","7"],["8","5","9","7","6","1","4","2","3"],["4","2","6","8","5","3","7","9","1"],["7","1","3","9","2","4","8","5","6"],["9","6","1","5","3","7","2","8","4"],["2","8","7","4","1","9","6","3","5"],["3","4","5","2","8","6","1","7","9"]]',
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def solveSudoku(self, board):\n        # Your code here\n        # Modify board in-place\n        pass",
        solutionCode:
          "class Solution:\n    def solveSudoku(self, board):\n        def is_valid(board, row, col, num):\n            # Check row\n            for j in range(9):\n                if board[row][j] == num:\n                    return False\n            \n            # Check column\n            for i in range(9):\n                if board[i][col] == num:\n                    return False\n            \n            # Check 3x3 box\n            start_row, start_col = 3 * (row // 3), 3 * (col // 3)\n            for i in range(start_row, start_row + 3):\n                for j in range(start_col, start_col + 3):\n                    if board[i][j] == num:\n                        return False\n            \n            return True\n        \n        def solve(board):\n            for i in range(9):\n                for j in range(9):\n                    if board[i][j] == '.':\n                        for num in '123456789':\n                            if is_valid(board, i, j, num):\n                                board[i][j] = num\n                                if solve(board):\n                                    return True\n                                board[i][j] = '.'\n                        return False\n            return True\n        \n        solve(board)",
        testCases: [
          {
            input:
              '[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]',
            expected_output:
              '[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]',
            weight: 1.0,
            description: "Standard Sudoku puzzle",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */\nvar solveSudoku = function(board) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {character[][]} board\n * @return {void} Do not return anything, modify board in-place instead.\n */\nvar solveSudoku = function(board) {\n    function isValid(board, row, col, num) {\n        // Check row\n        for (let j = 0; j < 9; j++) {\n            if (board[row][j] === num) return false;\n        }\n        \n        // Check column\n        for (let i = 0; i < 9; i++) {\n            if (board[i][col] === num) return false;\n        }\n        \n        // Check 3x3 box\n        const startRow = Math.floor(row / 3) * 3;\n        const startCol = Math.floor(col / 3) * 3;\n        for (let i = startRow; i < startRow + 3; i++) {\n            for (let j = startCol; j < startCol + 3; j++) {\n                if (board[i][j] === num) return false;\n            }\n        }\n        \n        return true;\n    }\n    \n    function solve(board) {\n        for (let i = 0; i < 9; i++) {\n            for (let j = 0; j < 9; j++) {\n                if (board[i][j] === '.') {\n                    for (let num = '1'; num <= '9'; num++) {\n                        if (isValid(board, i, j, num)) {\n                            board[i][j] = num;\n                            if (solve(board)) return true;\n                            board[i][j] = '.';\n                        }\n                    }\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n    \n    solve(board);\n};",
        testCases: [
          {
            input:
              '[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]',
            expected_output:
              '[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]',
            weight: 1.0,
            description: "Standard Sudoku puzzle",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public void solveSudoku(char[][] board) {\n        // Your code here\n    }\n}",
        solutionCode:
          "class Solution {\n    public void solveSudoku(char[][] board) {\n        solve(board);\n    }\n    \n    private boolean solve(char[][] board) {\n        for (int i = 0; i < 9; i++) {\n            for (int j = 0; j < 9; j++) {\n                if (board[i][j] == '.') {\n                    for (char num = '1'; num <= '9'; num++) {\n                        if (isValid(board, i, j, num)) {\n                            board[i][j] = num;\n                            if (solve(board)) return true;\n                            board[i][j] = '.';\n                        }\n                    }\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n    \n    private boolean isValid(char[][] board, int row, int col, char num) {\n        // Check row\n        for (int j = 0; j < 9; j++) {\n            if (board[row][j] == num) return false;\n        }\n        \n        // Check column\n        for (int i = 0; i < 9; i++) {\n            if (board[i][col] == num) return false;\n        }\n        \n        // Check 3x3 box\n        int startRow = (row / 3) * 3;\n        int startCol = (col / 3) * 3;\n        for (int i = startRow; i < startRow + 3; i++) {\n            for (int j = startCol; j < startCol + 3; j++) {\n                if (board[i][j] == num) return false;\n            }\n        }\n        \n        return true;\n    }\n}",
        testCases: [
          {
            input:
              '[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]',
            expected_output:
              '[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]',
            weight: 1.0,
            description: "Standard Sudoku puzzle",
          },
        ],
      },
      {
        language: "go",
        starterCode: "func solveSudoku(board [][]byte) {\n    // Your code here\n}",
        solutionCode:
          "func solveSudoku(board [][]byte) {\n    solve(board)\n}\n\nfunc solve(board [][]byte) bool {\n    for i := 0; i < 9; i++ {\n        for j := 0; j < 9; j++ {\n            if board[i][j] == '.' {\n                for num := byte('1'); num <= '9'; num++ {\n                    if isValid(board, i, j, num) {\n                        board[i][j] = num\n                        if solve(board) {\n                            return true\n                        }\n                        board[i][j] = '.'\n                    }\n                }\n                return false\n            }\n        }\n    }\n    return true\n}\n\nfunc isValid(board [][]byte, row, col int, num byte) bool {\n    // Check row\n    for j := 0; j < 9; j++ {\n        if board[row][j] == num {\n            return false\n        }\n    }\n    \n    // Check column\n    for i := 0; i < 9; i++ {\n        if board[i][col] == num {\n            return false\n        }\n    }\n    \n    // Check 3x3 box\n    startRow := (row / 3) * 3\n    startCol := (col / 3) * 3\n    for i := startRow; i < startRow+3; i++ {\n        for j := startCol; j < startCol+3; j++ {\n            if board[i][j] == num {\n                return false\n            }\n        }\n    }\n    \n    return true\n}",
        testCases: [
          {
            input:
              '[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]',
            expected_output:
              '[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]',
            weight: 1.0,
            description: "Standard Sudoku puzzle",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Character[][]} board\n# @return {Void} Do not return anything, modify board in-place instead.\ndef solve_sudoku(board)\n    # Your code here\nend",
        solutionCode:
          "# @param {Character[][]} board\n# @return {Void} Do not return anything, modify board in-place instead.\ndef solve_sudoku(board)\n    solve(board)\nend\n\ndef solve(board)\n    (0...9).each do |i|\n        (0...9).each do |j|\n            if board[i][j] == '.'\n                ('1'..'9').each do |num|\n                    if is_valid(board, i, j, num)\n                        board[i][j] = num\n                        return true if solve(board)\n                        board[i][j] = '.'\n                    end\n                end\n                return false\n            end\n        end\n    end\n    true\nend\n\ndef is_valid(board, row, col, num)\n    # Check row\n    (0...9).each do |j|\n        return false if board[row][j] == num\n    end\n    \n    # Check column\n    (0...9).each do |i|\n        return false if board[i][col] == num\n    end\n    \n    # Check 3x3 box\n    start_row = (row / 3) * 3\n    start_col = (col / 3) * 3\n    (start_row...start_row + 3).each do |i|\n        (start_col...start_col + 3).each do |j|\n            return false if board[i][j] == num\n        end\n    end\n    \n    true\nend",
        testCases: [
          {
            input:
              '[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]',
            expected_output:
              '[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]',
            weight: 1.0,
            description: "Standard Sudoku puzzle",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    void solveSudoku(vector<vector<char>>& board) {\n        // Your code here\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    void solveSudoku(vector<vector<char>>& board) {\n        solve(board);\n    }\n    \nprivate:\n    bool solve(vector<vector<char>>& board) {\n        for (int i = 0; i < 9; i++) {\n            for (int j = 0; j < 9; j++) {\n                if (board[i][j] == '.') {\n                    for (char num = '1'; num <= '9'; num++) {\n                        if (isValid(board, i, j, num)) {\n                            board[i][j] = num;\n                            if (solve(board)) return true;\n                            board[i][j] = '.';\n                        }\n                    }\n                    return false;\n                }\n            }\n        }\n        return true;\n    }\n    \n    bool isValid(vector<vector<char>>& board, int row, int col, char num) {\n        // Check row\n        for (int j = 0; j < 9; j++) {\n            if (board[row][j] == num) return false;\n        }\n        \n        // Check column\n        for (int i = 0; i < 9; i++) {\n            if (board[i][col] == num) return false;\n        }\n        \n        // Check 3x3 box\n        int startRow = (row / 3) * 3;\n        int startCol = (col / 3) * 3;\n        for (int i = startRow; i < startRow + 3; i++) {\n            for (int j = startCol; j < startCol + 3; j++) {\n                if (board[i][j] == num) return false;\n            }\n        }\n        \n        return true;\n    }\n};",
        testCases: [
          {
            input:
              '[[\"5\",\"3\",\".\",\".\",\"7\",\".\",\".\",\".\",\".\"],[\"6\",\".\",\".\",\"1\",\"9\",\"5\",\".\",\".\",\".\"],[\".\",\"9\",\"8\",\".\",\".\",\".\",\".\",\"6\",\".\"],[\"8\",\".\",\".\",\".\",\"6\",\".\",\".\",\".\",\"3\"],[\"4\",\".\",\".\",\"8\",\".\",\"3\",\".\",\".\",\"1\"],[\"7\",\".\",\".\",\".\",\"2\",\".\",\".\",\".\",\"6\"],[\".\",\"6\",\".\",\".\",\".\",\".\",\"2\",\"8\",\".\"],[\".\",\".\",\".\",\"4\",\"1\",\"9\",\".\",\".\",\"5\"],[\".\",\".\",\".\",\".\",\"8\",\".\",\".\",\"7\",\"9\"]]',
            expected_output:
              '[[\"5\",\"3\",\"4\",\"6\",\"7\",\"8\",\"9\",\"1\",\"2\"],[\"6\",\"7\",\"2\",\"1\",\"9\",\"5\",\"3\",\"4\",\"8\"],[\"1\",\"9\",\"8\",\"3\",\"4\",\"2\",\"5\",\"6\",\"7\"],[\"8\",\"5\",\"9\",\"7\",\"6\",\"1\",\"4\",\"2\",\"3\"],[\"4\",\"2\",\"6\",\"8\",\"5\",\"3\",\"7\",\"9\",\"1\"],[\"7\",\"1\",\"3\",\"9\",\"2\",\"4\",\"8\",\"5\",\"6\"],[\"9\",\"6\",\"1\",\"5\",\"3\",\"7\",\"2\",\"8\",\"4\"],[\"2\",\"8\",\"7\",\"4\",\"1\",\"9\",\"6\",\"3\",\"5\"],[\"3\",\"4\",\"5\",\"2\",\"8\",\"6\",\"1\",\"7\",\"9\"]]',
            weight: 1.0,
            description: "Standard Sudoku puzzle",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(9^(n*n))",
      spaceComplexity: "O(n*n)",
      constraints: [
        "board.length == 9",
        "board[i].length == 9",
        "board[i][j] is a digit or '.'",
        "It is guaranteed that the input board has only one solution",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 45,
      tags: ["array", "backtracking"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "Uber"],
      topic: "Recursion & Backtracking",
    },
  },

  // Two Pointers - Easy: Container With Most Water
  {
    id: "container-with-most-water",
    title: "Container With Most Water",
    text: "You are given an integer array height of length n. There are n vertical lines drawn such that the two endpoints of the ith line are (i, 0) and (i, height[i]).\n\nFind two lines that together with the x-axis form a container, such that the container contains the most water.\n\nReturn the maximum amount of water a container can store.\n\nNotice that you may not slant the container.\n\n**Example 1:**\nInput: height = [1,8,6,2,5,4,8,3,7]\nOutput: 49\nExplanation: The above vertical lines are represented by array [1,8,6,2,5,4,8,3,7]. In this case, the max area of water (blue section) the container can contain is 49.\n\n**Example 2:**\nInput: height = [1,1]\nOutput: 1",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def maxArea(self, height):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def maxArea(self, height):\n        left, right = 0, len(height) - 1\n        max_area = 0\n        \n        while left < right:\n            # Calculate current area\n            width = right - left\n            current_area = min(height[left], height[right]) * width\n            max_area = max(max_area, current_area)\n            \n            # Move the pointer with smaller height\n            if height[left] < height[right]:\n                left += 1\n            else:\n                right -= 1\n        \n        return max_area",
        testCases: [
          {
            input: "[1,8,6,2,5,4,8,3,7]",
            expected_output: "49",
            weight: 0.5,
            description: "Standard case with multiple peaks",
          },
          {
            input: "[1,1]",
            expected_output: "1",
            weight: 0.25,
            description: "Minimum case with two elements",
          },
          {
            input: "[4,3,2,1,4]",
            expected_output: "16",
            weight: 0.25,
            description: "Symmetric case",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} height\n * @return {number}\n */\nvar maxArea = function(height) {\n    let left = 0, right = height.length - 1;\n    let maxArea = 0;\n    \n    while (left < right) {\n        // Calculate current area\n        const width = right - left;\n        const currentArea = Math.min(height[left], height[right]) * width;\n        maxArea = Math.max(maxArea, currentArea);\n        \n        // Move the pointer with smaller height\n        if (height[left] < height[right]) {\n            left++;\n        } else {\n            right--;\n        }\n    }\n    \n    return maxArea;\n};",
        testCases: [
          {
            input: "[1,8,6,2,5,4,8,3,7]",
            expected_output: "49",
            weight: 0.5,
            description: "Standard case with multiple peaks",
          },
          {
            input: "[1,1]",
            expected_output: "1",
            weight: 0.25,
            description: "Minimum case with two elements",
          },
          {
            input: "[4,3,2,1,4]",
            expected_output: "16",
            weight: 0.25,
            description: "Symmetric case",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int maxArea(int[] height) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int maxArea(int[] height) {\n        int left = 0, right = height.length - 1;\n        int maxArea = 0;\n        \n        while (left < right) {\n            // Calculate current area\n            int width = right - left;\n            int currentArea = Math.min(height[left], height[right]) * width;\n            maxArea = Math.max(maxArea, currentArea);\n            \n            // Move the pointer with smaller height\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        \n        return maxArea;\n    }\n}",
        testCases: [
          {
            input: "[1,8,6,2,5,4,8,3,7]",
            expected_output: "49",
            weight: 0.5,
            description: "Standard case with multiple peaks",
          },
          {
            input: "[1,1]",
            expected_output: "1",
            weight: 0.25,
            description: "Minimum case with two elements",
          },
          {
            input: "[4,3,2,1,4]",
            expected_output: "16",
            weight: 0.25,
            description: "Symmetric case",
          },
        ],
      },
      {
        language: "go",
        starterCode: "func maxArea(height []int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func maxArea(height []int) int {\n    left, right := 0, len(height)-1\n    maxArea := 0\n    \n    for left < right {\n        // Calculate current area\n        width := right - left\n        minHeight := height[left]\n        if height[right] < minHeight {\n            minHeight = height[right]\n        }\n        currentArea := minHeight * width\n        \n        if currentArea > maxArea {\n            maxArea = currentArea\n        }\n        \n        // Move the pointer with smaller height\n        if height[left] < height[right] {\n            left++\n        } else {\n            right--\n        }\n    }\n    \n    return maxArea\n}",
        testCases: [
          {
            input: "[1,8,6,2,5,4,8,3,7]",
            expected_output: "49",
            weight: 0.5,
            description: "Standard case with multiple peaks",
          },
          {
            input: "[1,1]",
            expected_output: "1",
            weight: 0.25,
            description: "Minimum case with two elements",
          },
          {
            input: "[4,3,2,1,4]",
            expected_output: "16",
            weight: 0.25,
            description: "Symmetric case",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} height\n# @return {Integer}\ndef max_area(height)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} height\n# @return {Integer}\ndef max_area(height)\n    left, right = 0, height.length - 1\n    max_area = 0\n    \n    while left < right\n        # Calculate current area\n        width = right - left\n        current_area = [height[left], height[right]].min * width\n        max_area = [max_area, current_area].max\n        \n        # Move the pointer with smaller height\n        if height[left] < height[right]\n            left += 1\n        else\n            right -= 1\n        end\n    end\n    \n    max_area\nend",
        testCases: [
          {
            input: "[1,8,6,2,5,4,8,3,7]",
            expected_output: "49",
            weight: 0.5,
            description: "Standard case with multiple peaks",
          },
          {
            input: "[1,1]",
            expected_output: "1",
            weight: 0.25,
            description: "Minimum case with two elements",
          },
          {
            input: "[4,3,2,1,4]",
            expected_output: "16",
            weight: 0.25,
            description: "Symmetric case",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int maxArea(vector<int>& height) {\n        int left = 0, right = height.size() - 1;\n        int maxArea = 0;\n        \n        while (left < right) {\n            // Calculate current area\n            int width = right - left;\n            int currentArea = min(height[left], height[right]) * width;\n            maxArea = max(maxArea, currentArea);\n            \n            // Move the pointer with smaller height\n            if (height[left] < height[right]) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n        \n        return maxArea;\n    }\n};",
        testCases: [
          {
            input: "[1,8,6,2,5,4,8,3,7]",
            expected_output: "49",
            weight: 0.5,
            description: "Standard case with multiple peaks",
          },
          {
            input: "[1,1]",
            expected_output: "1",
            weight: 0.25,
            description: "Minimum case with two elements",
          },
          {
            input: "[4,3,2,1,4]",
            expected_output: "16",
            weight: 0.25,
            description: "Symmetric case",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      constraints: ["n == height.length", "2 <= n <= 10^5", "0 <= height[i] <= 10^4"],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "EASY",
      estimatedDuration: 20,
      tags: ["array", "two-pointers", "greedy"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Two Pointers",
    },
  },

  // Two Pointers - Medium: 3Sum
  {
    id: "three-sum",
    title: "3Sum",
    text: "Given an integer array nums, return all the triplets [nums[i], nums[j], nums[k]] such that i != j, i != k, and j != k, and nums[i] + nums[j] + nums[k] == 0.\n\nNotice that the solution set must not contain duplicate triplets.\n\n**Example 1:**\nInput: nums = [-1,0,1,2,-1,-4]\nOutput: [[-1,-1,2],[-1,0,1]]\nExplanation: \nnums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.\nnums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.\nnums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.\nThe distinct triplets are [-1,0,1] and [-1,-1,2].\nNotice that the order of the output and the order of the triplets does not matter.\n\n**Example 2:**\nInput: nums = [0,1,1]\nOutput: []\nExplanation: The only possible triplet does not sum up to 0.\n\n**Example 3:**\nInput: nums = [0,0,0]\nOutput: [[0,0,0]]\nExplanation: The only possible triplet sums up to 0.",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def threeSum(self, nums):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def threeSum(self, nums):\n        nums.sort()\n        result = []\n        \n        for i in range(len(nums) - 2):\n            # Skip duplicates for the first element\n            if i > 0 and nums[i] == nums[i - 1]:\n                continue\n            \n            left, right = i + 1, len(nums) - 1\n            \n            while left < right:\n                current_sum = nums[i] + nums[left] + nums[right]\n                \n                if current_sum == 0:\n                    result.append([nums[i], nums[left], nums[right]])\n                    \n                    # Skip duplicates for left and right pointers\n                    while left < right and nums[left] == nums[left + 1]:\n                        left += 1\n                    while left < right and nums[right] == nums[right - 1]:\n                        right -= 1\n                    \n                    left += 1\n                    right -= 1\n                elif current_sum < 0:\n                    left += 1\n                else:\n                    right -= 1\n        \n        return result",
        testCases: [
          {
            input: "[-1,0,1,2,-1,-4]",
            expected_output: "[[-1,-1,2],[-1,0,1]]",
            weight: 0.5,
            description: "Standard case with duplicates",
          },
          {
            input: "[0,1,1]",
            expected_output: "[]",
            weight: 0.25,
            description: "No valid triplets",
          },
          {
            input: "[0,0,0]",
            expected_output: "[[0,0,0]]",
            weight: 0.25,
            description: "All zeros",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums\n * @return {number[][]}\n */\nvar threeSum = function(nums) {\n    nums.sort((a, b) => a - b);\n    const result = [];\n    \n    for (let i = 0; i < nums.length - 2; i++) {\n        // Skip duplicates for the first element\n        if (i > 0 && nums[i] === nums[i - 1]) {\n            continue;\n        }\n        \n        let left = i + 1, right = nums.length - 1;\n        \n        while (left < right) {\n            const currentSum = nums[i] + nums[left] + nums[right];\n            \n            if (currentSum === 0) {\n                result.push([nums[i], nums[left], nums[right]]);\n                \n                // Skip duplicates for left and right pointers\n                while (left < right && nums[left] === nums[left + 1]) {\n                    left++;\n                }\n                while (left < right && nums[right] === nums[right - 1]) {\n                    right--;\n                }\n                \n                left++;\n                right--;\n            } else if (currentSum < 0) {\n                left++;\n            } else {\n                right--;\n            }\n        }\n    }\n    \n    return result;\n};",
        testCases: [
          {
            input: "[-1,0,1,2,-1,-4]",
            expected_output: "[[-1,-1,2],[-1,0,1]]",
            weight: 0.5,
            description: "Standard case with duplicates",
          },
          {
            input: "[0,1,1]",
            expected_output: "[]",
            weight: 0.25,
            description: "No valid triplets",
          },
          {
            input: "[0,0,0]",
            expected_output: "[[0,0,0]]",
            weight: 0.25,
            description: "All zeros",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}",
        solutionCode:
          "class Solution {\n    public List<List<Integer>> threeSum(int[] nums) {\n        Arrays.sort(nums);\n        List<List<Integer>> result = new ArrayList<>();\n        \n        for (int i = 0; i < nums.length - 2; i++) {\n            // Skip duplicates for the first element\n            if (i > 0 && nums[i] == nums[i - 1]) {\n                continue;\n            }\n            \n            int left = i + 1, right = nums.length - 1;\n            \n            while (left < right) {\n                int currentSum = nums[i] + nums[left] + nums[right];\n                \n                if (currentSum == 0) {\n                    result.add(Arrays.asList(nums[i], nums[left], nums[right]));\n                    \n                    // Skip duplicates for left and right pointers\n                    while (left < right && nums[left] == nums[left + 1]) {\n                        left++;\n                    }\n                    while (left < right && nums[right] == nums[right - 1]) {\n                        right--;\n                    }\n                    \n                    left++;\n                    right--;\n                } else if (currentSum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        \n        return result;\n    }\n}",
        testCases: [
          {
            input: "[-1,0,1,2,-1,-4]",
            expected_output: "[[-1,-1,2],[-1,0,1]]",
            weight: 0.5,
            description: "Standard case with duplicates",
          },
          {
            input: "[0,1,1]",
            expected_output: "[]",
            weight: 0.25,
            description: "No valid triplets",
          },
          {
            input: "[0,0,0]",
            expected_output: "[[0,0,0]]",
            weight: 0.25,
            description: "All zeros",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func threeSum(nums []int) [][]int {\n    // Your code here\n    return [][]int{}\n}",
        solutionCode:
          "func threeSum(nums []int) [][]int {\n    sort.Ints(nums)\n    var result [][]int\n    \n    for i := 0; i < len(nums)-2; i++ {\n        // Skip duplicates for the first element\n        if i > 0 && nums[i] == nums[i-1] {\n            continue\n        }\n        \n        left, right := i+1, len(nums)-1\n        \n        for left < right {\n            currentSum := nums[i] + nums[left] + nums[right]\n            \n            if currentSum == 0 {\n                result = append(result, []int{nums[i], nums[left], nums[right]})\n                \n                // Skip duplicates for left and right pointers\n                for left < right && nums[left] == nums[left+1] {\n                    left++\n                }\n                for left < right && nums[right] == nums[right-1] {\n                    right--\n                }\n                \n                left++\n                right--\n            } else if currentSum < 0 {\n                left++\n            } else {\n                right--\n            }\n        }\n    }\n    \n    return result\n}",
        testCases: [
          {
            input: "[-1,0,1,2,-1,-4]",
            expected_output: "[[-1,-1,2],[-1,0,1]]",
            weight: 0.5,
            description: "Standard case with duplicates",
          },
          {
            input: "[0,1,1]",
            expected_output: "[]",
            weight: 0.25,
            description: "No valid triplets",
          },
          {
            input: "[0,0,0]",
            expected_output: "[[0,0,0]]",
            weight: 0.25,
            description: "All zeros",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums\n# @return {Integer[][]}\ndef three_sum(nums)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums\n# @return {Integer[][]}\ndef three_sum(nums)\n    nums.sort!\n    result = []\n    \n    (0...nums.length - 2).each do |i|\n        # Skip duplicates for the first element\n        next if i > 0 && nums[i] == nums[i - 1]\n        \n        left, right = i + 1, nums.length - 1\n        \n        while left < right\n            current_sum = nums[i] + nums[left] + nums[right]\n            \n            if current_sum == 0\n                result << [nums[i], nums[left], nums[right]]\n                \n                # Skip duplicates for left and right pointers\n                while left < right && nums[left] == nums[left + 1]\n                    left += 1\n                end\n                while left < right && nums[right] == nums[right - 1]\n                    right -= 1\n                end\n                \n                left += 1\n                right -= 1\n            elsif current_sum < 0\n                left += 1\n            else\n                right -= 1\n            end\n        end\n    end\n    \n    result\nend",
        testCases: [
          {
            input: "[-1,0,1,2,-1,-4]",
            expected_output: "[[-1,-1,2],[-1,0,1]]",
            weight: 0.5,
            description: "Standard case with duplicates",
          },
          {
            input: "[0,1,1]",
            expected_output: "[]",
            weight: 0.25,
            description: "No valid triplets",
          },
          {
            input: "[0,0,0]",
            expected_output: "[[0,0,0]]",
            weight: 0.25,
            description: "All zeros",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    vector<vector<int>> threeSum(vector<int>& nums) {\n        sort(nums.begin(), nums.end());\n        vector<vector<int>> result;\n        \n        for (int i = 0; i < nums.size() - 2; i++) {\n            // Skip duplicates for the first element\n            if (i > 0 && nums[i] == nums[i - 1]) {\n                continue;\n            }\n            \n            int left = i + 1, right = nums.size() - 1;\n            \n            while (left < right) {\n                int currentSum = nums[i] + nums[left] + nums[right];\n                \n                if (currentSum == 0) {\n                    result.push_back({nums[i], nums[left], nums[right]});\n                    \n                    // Skip duplicates for left and right pointers\n                    while (left < right && nums[left] == nums[left + 1]) {\n                        left++;\n                    }\n                    while (left < right && nums[right] == nums[right - 1]) {\n                        right--;\n                    }\n                    \n                    left++;\n                    right--;\n                } else if (currentSum < 0) {\n                    left++;\n                } else {\n                    right--;\n                }\n            }\n        }\n        \n        return result;\n    }\n};",
        testCases: [
          {
            input: "[-1,0,1,2,-1,-4]",
            expected_output: "[[-1,-1,2],[-1,0,1]]",
            weight: 0.5,
            description: "Standard case with duplicates",
          },
          {
            input: "[0,1,1]",
            expected_output: "[]",
            weight: 0.25,
            description: "No valid triplets",
          },
          {
            input: "[0,0,0]",
            expected_output: "[[0,0,0]]",
            weight: 0.25,
            description: "All zeros",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n^2)",
      spaceComplexity: "O(1)",
      constraints: ["3 <= nums.length <= 3000", "-10^5 <= nums[i] <= 10^5"],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 30,
      tags: ["array", "two-pointers", "sorting"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Two Pointers",
    },
  },

  // Two Pointers - Hard: Trapping Rain Water
  {
    id: "trapping-rain-water",
    title: "Trapping Rain Water",
    text: "Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.\n\n**Example 1:**\nInput: height = [0,1,0,2,1,0,1,3,2,1,2,1]\nOutput: 6\nExplanation: The above elevation map (black section) is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped.\n\n**Example 2:**\nInput: height = [4,2,0,3,2,5]\nOutput: 9",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def trap(self, height):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def trap(self, height):\n        if not height or len(height) < 3:\n            return 0\n        \n        left, right = 0, len(height) - 1\n        left_max, right_max = 0, 0\n        water_trapped = 0\n        \n        while left < right:\n            if height[left] < height[right]:\n                if height[left] >= left_max:\n                    left_max = height[left]\n                else:\n                    water_trapped += left_max - height[left]\n                left += 1\n            else:\n                if height[right] >= right_max:\n                    right_max = height[right]\n                else:\n                    water_trapped += right_max - height[right]\n                right -= 1\n        \n        return water_trapped",
        testCases: [
          {
            input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
            expected_output: "6",
            weight: 0.5,
            description: "Standard case with multiple valleys",
          },
          {
            input: "[4,2,0,3,2,5]",
            expected_output: "9",
            weight: 0.3,
            description: "Complex elevation pattern",
          },
          {
            input: "[3,0,2,0,4]",
            expected_output: "10",
            weight: 0.2,
            description: "Simple valley pattern",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} height\n * @return {number}\n */\nvar trap = function(height) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} height\n * @return {number}\n */\nvar trap = function(height) {\n    if (!height || height.length < 3) {\n        return 0;\n    }\n    \n    let left = 0, right = height.length - 1;\n    let leftMax = 0, rightMax = 0;\n    let waterTrapped = 0;\n    \n    while (left < right) {\n        if (height[left] < height[right]) {\n            if (height[left] >= leftMax) {\n                leftMax = height[left];\n            } else {\n                waterTrapped += leftMax - height[left];\n            }\n            left++;\n        } else {\n            if (height[right] >= rightMax) {\n                rightMax = height[right];\n            } else {\n                waterTrapped += rightMax - height[right];\n            }\n            right--;\n        }\n    }\n    \n    return waterTrapped;\n};",
        testCases: [
          {
            input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
            expected_output: "6",
            weight: 0.5,
            description: "Standard case with multiple valleys",
          },
          {
            input: "[4,2,0,3,2,5]",
            expected_output: "9",
            weight: 0.3,
            description: "Complex elevation pattern",
          },
          {
            input: "[3,0,2,0,4]",
            expected_output: "10",
            weight: 0.2,
            description: "Simple valley pattern",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int trap(int[] height) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int trap(int[] height) {\n        if (height == null || height.length < 3) {\n            return 0;\n        }\n        \n        int left = 0, right = height.length - 1;\n        int leftMax = 0, rightMax = 0;\n        int waterTrapped = 0;\n        \n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) {\n                    leftMax = height[left];\n                } else {\n                    waterTrapped += leftMax - height[left];\n                }\n                left++;\n            } else {\n                if (height[right] >= rightMax) {\n                    rightMax = height[right];\n                } else {\n                    waterTrapped += rightMax - height[right];\n                }\n                right--;\n            }\n        }\n        \n        return waterTrapped;\n    }\n}",
        testCases: [
          {
            input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
            expected_output: "6",
            weight: 0.5,
            description: "Standard case with multiple valleys",
          },
          {
            input: "[4,2,0,3,2,5]",
            expected_output: "9",
            weight: 0.3,
            description: "Complex elevation pattern",
          },
          {
            input: "[3,0,2,0,4]",
            expected_output: "10",
            weight: 0.2,
            description: "Simple valley pattern",
          },
        ],
      },
      {
        language: "go",
        starterCode: "func trap(height []int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func trap(height []int) int {\n    if len(height) < 3 {\n        return 0\n    }\n    \n    left, right := 0, len(height)-1\n    leftMax, rightMax := 0, 0\n    waterTrapped := 0\n    \n    for left < right {\n        if height[left] < height[right] {\n            if height[left] >= leftMax {\n                leftMax = height[left]\n            } else {\n                waterTrapped += leftMax - height[left]\n            }\n            left++\n        } else {\n            if height[right] >= rightMax {\n                rightMax = height[right]\n            } else {\n                waterTrapped += rightMax - height[right]\n            }\n            right--\n        }\n    }\n    \n    return waterTrapped\n}",
        testCases: [
          {
            input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
            expected_output: "6",
            weight: 0.5,
            description: "Standard case with multiple valleys",
          },
          {
            input: "[4,2,0,3,2,5]",
            expected_output: "9",
            weight: 0.3,
            description: "Complex elevation pattern",
          },
          {
            input: "[3,0,2,0,4]",
            expected_output: "10",
            weight: 0.2,
            description: "Simple valley pattern",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} height\n# @return {Integer}\ndef trap(height)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} height\n# @return {Integer}\ndef trap(height)\n    return 0 if height.length < 3\n    \n    left, right = 0, height.length - 1\n    left_max, right_max = 0, 0\n    water_trapped = 0\n    \n    while left < right\n        if height[left] < height[right]\n            if height[left] >= left_max\n                left_max = height[left]\n            else\n                water_trapped += left_max - height[left]\n            end\n            left += 1\n        else\n            if height[right] >= right_max\n                right_max = height[right]\n            else\n                water_trapped += right_max - height[right]\n            end\n            right -= 1\n        end\n    end\n    \n    water_trapped\nend",
        testCases: [
          {
            input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
            expected_output: "6",
            weight: 0.5,
            description: "Standard case with multiple valleys",
          },
          {
            input: "[4,2,0,3,2,5]",
            expected_output: "9",
            weight: 0.3,
            description: "Complex elevation pattern",
          },
          {
            input: "[3,0,2,0,4]",
            expected_output: "10",
            weight: 0.2,
            description: "Simple valley pattern",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int trap(vector<int>& height) {\n        if (height.size() < 3) {\n            return 0;\n        }\n        \n        int left = 0, right = height.size() - 1;\n        int leftMax = 0, rightMax = 0;\n        int waterTrapped = 0;\n        \n        while (left < right) {\n            if (height[left] < height[right]) {\n                if (height[left] >= leftMax) {\n                    leftMax = height[left];\n                } else {\n                    waterTrapped += leftMax - height[left];\n                }\n                left++;\n            } else {\n                if (height[right] >= rightMax) {\n                    rightMax = height[right];\n                } else {\n                    waterTrapped += rightMax - height[right];\n                }\n                right--;\n            }\n        }\n        \n        return waterTrapped;\n    }\n};",
        testCases: [
          {
            input: "[0,1,0,2,1,0,1,3,2,1,2,1]",
            expected_output: "6",
            weight: 0.5,
            description: "Standard case with multiple valleys",
          },
          {
            input: "[4,2,0,3,2,5]",
            expected_output: "9",
            weight: 0.3,
            description: "Complex elevation pattern",
          },
          {
            input: "[3,0,2,0,4]",
            expected_output: "10",
            weight: 0.2,
            description: "Simple valley pattern",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      constraints: ["n == height.length", "1 <= n <= 2 * 10^4", "0 <= height[i] <= 3 * 10^4"],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 35,
      tags: ["array", "two-pointers", "dynamic-programming", "stack"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Two Pointers",
    },
  },

  // Sliding Window - Easy: Longest Substring Without Repeating Characters
  {
    id: "longest-substring-without-repeating",
    title: "Longest Substring Without Repeating Characters",
    text: 'Given a string s, find the length of the longest substring without repeating characters.\n\n**Example 1:**\nInput: s = "abcabcbb"\nOutput: 3\nExplanation: The answer is "abc", with the length of 3.\n\n**Example 2:**\nInput: s = "bbbbb"\nOutput: 1\nExplanation: The answer is "b", with the length of 1.\n\n**Example 3:**\nInput: s = "pwwkew"\nOutput: 3\nExplanation: The answer is "wke", with the length of 3.\nNotice that the answer must be a substring, "pwke" is a subsequence and not a substring.',
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def lengthOfLongestSubstring(self, s):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def lengthOfLongestSubstring(self, s):\n        char_set = set()\n        left = 0\n        max_length = 0\n        \n        for right in range(len(s)):\n            # Shrink window until no duplicates\n            while s[right] in char_set:\n                char_set.remove(s[left])\n                left += 1\n            \n            # Add current character and update max length\n            char_set.add(s[right])\n            max_length = max(max_length, right - left + 1)\n        \n        return max_length",
        testCases: [
          {
            input: '"abcabcbb"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard case with repeating pattern",
          },
          {
            input: '"bbbbb"',
            expected_output: "1",
            weight: 0.3,
            description: "All same characters",
          },
          {
            input: '"pwwkew"',
            expected_output: "3",
            weight: 0.3,
            description: "Complex pattern with multiple repeats",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {string} s\n * @return {number}\n */\nvar lengthOfLongestSubstring = function(s) {\n    const charSet = new Set();\n    let left = 0;\n    let maxLength = 0;\n    \n    for (let right = 0; right < s.length; right++) {\n        // Shrink window until no duplicates\n        while (charSet.has(s[right])) {\n            charSet.delete(s[left]);\n            left++;\n        }\n        \n        // Add current character and update max length\n        charSet.add(s[right]);\n        maxLength = Math.max(maxLength, right - left + 1);\n    }\n    \n    return maxLength;\n};",
        testCases: [
          {
            input: '"abcabcbb"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard case with repeating pattern",
          },
          {
            input: '"bbbbb"',
            expected_output: "1",
            weight: 0.3,
            description: "All same characters",
          },
          {
            input: '"pwwkew"',
            expected_output: "3",
            weight: 0.3,
            description: "Complex pattern with multiple repeats",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        Set<Character> charSet = new HashSet<>();\n        int left = 0;\n        int maxLength = 0;\n        \n        for (int right = 0; right < s.length(); right++) {\n            // Shrink window until no duplicates\n            while (charSet.contains(s.charAt(right))) {\n                charSet.remove(s.charAt(left));\n                left++;\n            }\n            \n            // Add current character and update max length\n            charSet.add(s.charAt(right));\n            maxLength = Math.max(maxLength, right - left + 1);\n        }\n        \n        return maxLength;\n    }\n}",
        testCases: [
          {
            input: '"abcabcbb"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard case with repeating pattern",
          },
          {
            input: '"bbbbb"',
            expected_output: "1",
            weight: 0.3,
            description: "All same characters",
          },
          {
            input: '"pwwkew"',
            expected_output: "3",
            weight: 0.3,
            description: "Complex pattern with multiple repeats",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func lengthOfLongestSubstring(s string) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func lengthOfLongestSubstring(s string) int {\n    charSet := make(map[byte]bool)\n    left := 0\n    maxLength := 0\n    \n    for right := 0; right < len(s); right++ {\n        // Shrink window until no duplicates\n        for charSet[s[right]] {\n            delete(charSet, s[left])\n            left++\n        }\n        \n        // Add current character and update max length\n        charSet[s[right]] = true\n        if right-left+1 > maxLength {\n            maxLength = right - left + 1\n        }\n    }\n    \n    return maxLength\n}",
        testCases: [
          {
            input: '"abcabcbb"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard case with repeating pattern",
          },
          {
            input: '"bbbbb"',
            expected_output: "1",
            weight: 0.3,
            description: "All same characters",
          },
          {
            input: '"pwwkew"',
            expected_output: "3",
            weight: 0.3,
            description: "Complex pattern with multiple repeats",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {String} s\n# @return {Integer}\ndef length_of_longest_substring(s)\n    # Your code here\nend",
        solutionCode:
          "# @param {String} s\n# @return {Integer}\ndef length_of_longest_substring(s)\n    char_set = Set.new\n    left = 0\n    max_length = 0\n    \n    (0...s.length).each do |right|\n        # Shrink window until no duplicates\n        while char_set.include?(s[right])\n            char_set.delete(s[left])\n            left += 1\n        end\n        \n        # Add current character and update max length\n        char_set.add(s[right])\n        max_length = [max_length, right - left + 1].max\n    end\n    \n    max_length\nend",
        testCases: [
          {
            input: '"abcabcbb"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard case with repeating pattern",
          },
          {
            input: '"bbbbb"',
            expected_output: "1",
            weight: 0.3,
            description: "All same characters",
          },
          {
            input: '"pwwkew"',
            expected_output: "3",
            weight: 0.3,
            description: "Complex pattern with multiple repeats",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        unordered_set<char> charSet;\n        int left = 0;\n        int maxLength = 0;\n        \n        for (int right = 0; right < s.length(); right++) {\n            // Shrink window until no duplicates\n            while (charSet.find(s[right]) != charSet.end()) {\n                charSet.erase(s[left]);\n                left++;\n            }\n            \n            // Add current character and update max length\n            charSet.insert(s[right]);\n            maxLength = max(maxLength, right - left + 1);\n        }\n        \n        return maxLength;\n    }\n};",
        testCases: [
          {
            input: '"abcabcbb"',
            expected_output: "3",
            weight: 0.4,
            description: "Standard case with repeating pattern",
          },
          {
            input: '"bbbbb"',
            expected_output: "1",
            weight: 0.3,
            description: "All same characters",
          },
          {
            input: '"pwwkew"',
            expected_output: "3",
            weight: 0.3,
            description: "Complex pattern with multiple repeats",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(m,n))",
      constraints: [
        "0 <= s.length <= 5 * 10^4",
        "s consists of English letters, digits, symbols and spaces",
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
      estimatedDuration: 25,
      tags: ["hash-table", "string", "sliding-window"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Sliding Window",
    },
  },

  // Sliding Window - Medium: Minimum Window Substring
  {
    id: "minimum-window-substring",
    title: "Minimum Window Substring",
    text: 'Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".\n\nThe testcases will be generated such that the answer is unique.\n\n**Example 1:**\nInput: s = "ADOBECODEBANC", t = "ABC"\nOutput: "BANC"\nExplanation: The minimum window substring "BANC" includes \'A\', \'B\', and \'C\' from string t.\n\n**Example 2:**\nInput: s = "a", t = "a"\nOutput: "a"\nExplanation: The entire string s is the minimum window.\n\n**Example 3:**\nInput: s = "a", t = "aa"\nOutput: ""\nExplanation: Both \'a\'s from t must be included in the window.\nSince the largest window of s only has one \'a\', return empty string.',
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def minWindow(self, s, t):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def minWindow(self, s, t):\n        if not s or not t:\n            return \"\"\n        \n        # Count characters in t\n        t_count = {}\n        for char in t:\n            t_count[char] = t_count.get(char, 0) + 1\n        \n        required = len(t_count)\n        left, right = 0, 0\n        formed = 0\n        window_counts = {}\n        \n        # Result: (window length, left, right)\n        ans = float('inf'), None, None\n        \n        while right < len(s):\n            # Add character from the right to the window\n            char = s[right]\n            window_counts[char] = window_counts.get(char, 0) + 1\n            \n            # Check if current character's frequency matches t's frequency\n            if char in t_count and window_counts[char] == t_count[char]:\n                formed += 1\n            \n            # Try to contract the window until it ceases to be 'desirable'\n            while left <= right and formed == required:\n                char = s[left]\n                \n                # Save the smallest window\n                if right - left + 1 < ans[0]:\n                    ans = (right - left + 1, left, right)\n                \n                # Remove from the left of the window\n                window_counts[char] -= 1\n                if char in t_count and window_counts[char] < t_count[char]:\n                    formed -= 1\n                \n                left += 1\n            \n            right += 1\n        \n        return \"\" if ans[0] == float('inf') else s[ans[1]:ans[2] + 1]",
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.5,
            description: "Standard case with multiple valid windows",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.25,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.25,
            description: "Impossible case",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nvar minWindow = function(s, t) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {string} s\n * @param {string} t\n * @return {string}\n */\nvar minWindow = function(s, t) {\n    if (!s || !t) return \"\";\n    \n    // Count characters in t\n    const tCount = {};\n    for (const char of t) {\n        tCount[char] = (tCount[char] || 0) + 1;\n    }\n    \n    const required = Object.keys(tCount).length;\n    let left = 0, right = 0;\n    let formed = 0;\n    const windowCounts = {};\n    \n    // Result: [window length, left, right]\n    let ans = [Infinity, null, null];\n    \n    while (right < s.length) {\n        // Add character from the right to the window\n        const char = s[right];\n        windowCounts[char] = (windowCounts[char] || 0) + 1;\n        \n        // Check if current character's frequency matches t's frequency\n        if (tCount[char] && windowCounts[char] === tCount[char]) {\n            formed++;\n        }\n        \n        // Try to contract the window until it ceases to be 'desirable'\n        while (left <= right && formed === required) {\n            const char = s[left];\n            \n            // Save the smallest window\n            if (right - left + 1 < ans[0]) {\n                ans = [right - left + 1, left, right];\n            }\n            \n            // Remove from the left of the window\n            windowCounts[char]--;\n            if (tCount[char] && windowCounts[char] < tCount[char]) {\n                formed--;\n            }\n            \n            left++;\n        }\n        \n        right++;\n    }\n    \n    return ans[0] === Infinity ? \"\" : s.substring(ans[1], ans[2] + 1);\n};",
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.5,
            description: "Standard case with multiple valid windows",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.25,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.25,
            description: "Impossible case",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          'class Solution {\n    public String minWindow(String s, String t) {\n        // Your code here\n        return "";\n    }\n}',
        solutionCode:
          "class Solution {\n    public String minWindow(String s, String t) {\n        if (s.length() == 0 || t.length() == 0) {\n            return \"\";\n        }\n        \n        // Count characters in t\n        Map<Character, Integer> tCount = new HashMap<>();\n        for (char c : t.toCharArray()) {\n            tCount.put(c, tCount.getOrDefault(c, 0) + 1);\n        }\n        \n        int required = tCount.size();\n        int left = 0, right = 0;\n        int formed = 0;\n        Map<Character, Integer> windowCounts = new HashMap<>();\n        \n        // Result: [window length, left, right]\n        int[] ans = {Integer.MAX_VALUE, 0, 0};\n        \n        while (right < s.length()) {\n            // Add character from the right to the window\n            char c = s.charAt(right);\n            windowCounts.put(c, windowCounts.getOrDefault(c, 0) + 1);\n            \n            // Check if current character's frequency matches t's frequency\n            if (tCount.containsKey(c) && windowCounts.get(c).intValue() == tCount.get(c).intValue()) {\n                formed++;\n            }\n            \n            // Try to contract the window until it ceases to be 'desirable'\n            while (left <= right && formed == required) {\n                c = s.charAt(left);\n                \n                // Save the smallest window\n                if (right - left + 1 < ans[0]) {\n                    ans[0] = right - left + 1;\n                    ans[1] = left;\n                    ans[2] = right;\n                }\n                \n                // Remove from the left of the window\n                windowCounts.put(c, windowCounts.get(c) - 1);\n                if (tCount.containsKey(c) && windowCounts.get(c).intValue() < tCount.get(c).intValue()) {\n                    formed--;\n                }\n                \n                left++;\n            }\n            \n            right++;\n        }\n        \n        return ans[0] == Integer.MAX_VALUE ? \"\" : s.substring(ans[1], ans[2] + 1);\n    }\n}",
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.5,
            description: "Standard case with multiple valid windows",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.25,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.25,
            description: "Impossible case",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          'func minWindow(s string, t string) string {\n    // Your code here\n    return ""\n}',
        solutionCode:
          "func minWindow(s string, t string) string {\n    if len(s) == 0 || len(t) == 0 {\n        return \"\"\n    }\n    \n    // Count characters in t\n    tCount := make(map[byte]int)\n    for i := 0; i < len(t); i++ {\n        tCount[t[i]]++\n    }\n    \n    required := len(tCount)\n    left, right := 0, 0\n    formed := 0\n    windowCounts := make(map[byte]int)\n    \n    // Result: [window length, left, right]\n    ans := []int{len(s) + 1, 0, 0}\n    \n    for right < len(s) {\n        // Add character from the right to the window\n        c := s[right]\n        windowCounts[c]++\n        \n        // Check if current character's frequency matches t's frequency\n        if count, exists := tCount[c]; exists && windowCounts[c] == count {\n            formed++\n        }\n        \n        // Try to contract the window until it ceases to be 'desirable'\n        for left <= right && formed == required {\n            c = s[left]\n            \n            // Save the smallest window\n            if right-left+1 < ans[0] {\n                ans[0] = right - left + 1\n                ans[1] = left\n                ans[2] = right\n            }\n            \n            // Remove from the left of the window\n            windowCounts[c]--\n            if count, exists := tCount[c]; exists && windowCounts[c] < count {\n                formed--\n            }\n            \n            left++\n        }\n        \n        right++\n    }\n    \n    if ans[0] == len(s)+1 {\n        return \"\"\n    }\n    return s[ans[1] : ans[2]+1]\n}",
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.5,
            description: "Standard case with multiple valid windows",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.25,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.25,
            description: "Impossible case",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {String} s\n# @param {String} t\n# @return {String}\ndef min_window(s, t)\n    # Your code here\nend",
        solutionCode:
          "# @param {String} s\n# @param {String} t\n# @return {String}\ndef min_window(s, t)\n    return \"\" if s.empty? || t.empty?\n    \n    # Count characters in t\n    t_count = Hash.new(0)\n    t.each_char { |char| t_count[char] += 1 }\n    \n    required = t_count.size\n    left = right = 0\n    formed = 0\n    window_counts = Hash.new(0)\n    \n    # Result: [window length, left, right]\n    ans = [Float::INFINITY, nil, nil]\n    \n    while right < s.length\n        # Add character from the right to the window\n        char = s[right]\n        window_counts[char] += 1\n        \n        # Check if current character's frequency matches t's frequency\n        if t_count.key?(char) && window_counts[char] == t_count[char]\n            formed += 1\n        end\n        \n        # Try to contract the window until it ceases to be 'desirable'\n        while left <= right && formed == required\n            char = s[left]\n            \n            # Save the smallest window\n            if right - left + 1 < ans[0]\n                ans = [right - left + 1, left, right]\n            end\n            \n            # Remove from the left of the window\n            window_counts[char] -= 1\n            if t_count.key?(char) && window_counts[char] < t_count[char]\n                formed -= 1\n            end\n            \n            left += 1\n        end\n        \n        right += 1\n    end\n    \n    ans[0] == Float::INFINITY ? \"\" : s[ans[1]..ans[2]]\nend",
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.5,
            description: "Standard case with multiple valid windows",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.25,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.25,
            description: "Impossible case",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          'class Solution {\npublic:\n    string minWindow(string s, string t) {\n        // Your code here\n        return "";\n    }\n};',
        solutionCode:
          "class Solution {\npublic:\n    string minWindow(string s, string t) {\n        if (s.empty() || t.empty()) {\n            return \"\";\n        }\n        \n        // Count characters in t\n        unordered_map<char, int> tCount;\n        for (char c : t) {\n            tCount[c]++;\n        }\n        \n        int required = tCount.size();\n        int left = 0, right = 0;\n        int formed = 0;\n        unordered_map<char, int> windowCounts;\n        \n        // Result: [window length, left, right]\n        vector<int> ans = {INT_MAX, 0, 0};\n        \n        while (right < s.length()) {\n            // Add character from the right to the window\n            char c = s[right];\n            windowCounts[c]++;\n            \n            // Check if current character's frequency matches t's frequency\n            if (tCount.find(c) != tCount.end() && windowCounts[c] == tCount[c]) {\n                formed++;\n            }\n            \n            // Try to contract the window until it ceases to be 'desirable'\n            while (left <= right && formed == required) {\n                c = s[left];\n                \n                // Save the smallest window\n                if (right - left + 1 < ans[0]) {\n                    ans[0] = right - left + 1;\n                    ans[1] = left;\n                    ans[2] = right;\n                }\n                \n                // Remove from the left of the window\n                windowCounts[c]--;\n                if (tCount.find(c) != tCount.end() && windowCounts[c] < tCount[c]) {\n                    formed--;\n                }\n                \n                left++;\n            }\n            \n            right++;\n        }\n        \n        return ans[0] == INT_MAX ? \"\" : s.substr(ans[1], ans[0]);\n    }\n};",
        testCases: [
          {
            input: '"ADOBECODEBANC", "ABC"',
            expected_output: '"BANC"',
            weight: 0.5,
            description: "Standard case with multiple valid windows",
          },
          {
            input: '"a", "a"',
            expected_output: '"a"',
            weight: 0.25,
            description: "Single character match",
          },
          {
            input: '"a", "aa"',
            expected_output: '""',
            weight: 0.25,
            description: "Impossible case",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(|s| + |t|)",
      spaceComplexity: "O(|s| + |t|)",
      constraints: [
        "m == s.length",
        "n == t.length",
        "1 <= m, n <= 10^5",
        "s and t consist of uppercase and lowercase English letters",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 40,
      tags: ["hash-table", "string", "sliding-window"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Sliding Window",
    },
  },

  // Sliding Window - Hard: Sliding Window Maximum
  {
    id: "sliding-window-maximum",
    title: "Sliding Window Maximum",
    text: "You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.\n\nReturn the max sliding window.\n\n**Example 1:**\nInput: nums = [1,3,-1,-3,5,3,6,7], k = 3\nOutput: [3,3,5,5,6,7]\nExplanation: \nWindow position                Max\n---------------               -----\n[1  3  -1] -3  5  3  6  7       3\n 1 [3  -1  -3] 5  3  6  7       3\n 1  3 [-1  -3  5] 3  6  7       5\n 1  3  -1 [-3  5  3] 6  7       5\n 1  3  -1  -3 [5  3  6] 7       6\n 1  3  -1  -3  5 [3  6  7]      7\n\n**Example 2:**\nInput: nums = [1], k = 1\nOutput: [1]",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def maxSlidingWindow(self, nums, k):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def maxSlidingWindow(self, nums, k):\n        from collections import deque\n        \n        if not nums:\n            return []\n        \n        deq = deque()  # Store indices\n        result = []\n        \n        for i in range(len(nums)):\n            # Remove indices that are out of current window\n            while deq and deq[0] < i - k + 1:\n                deq.popleft()\n            \n            # Remove indices whose corresponding values are smaller than current\n            while deq and nums[deq[-1]] < nums[i]:\n                deq.pop()\n            \n            # Add current index\n            deq.append(i)\n            \n            # Add to result if window is complete\n            if i >= k - 1:\n                result.append(nums[deq[0]])\n        \n        return result",
        testCases: [
          {
            input: "[1,3,-1,-3,5,3,6,7], 3",
            expected_output: "[3,3,5,5,6,7]",
            weight: 0.6,
            description: "Standard case with mixed values",
          },
          { input: "[1], 1", expected_output: "[1]", weight: 0.2, description: "Single element" },
          {
            input: "[1,3,1,2,0,5], 3",
            expected_output: "[3,3,2,5]",
            weight: 0.2,
            description: "Another mixed case",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nvar maxSlidingWindow = function(nums, k) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums\n * @param {number} k\n * @return {number[]}\n */\nvar maxSlidingWindow = function(nums, k) {\n    if (!nums || nums.length === 0) {\n        return [];\n    }\n    \n    const deque = [];  // Store indices\n    const result = [];\n    \n    for (let i = 0; i < nums.length; i++) {\n        // Remove indices that are out of current window\n        while (deque.length > 0 && deque[0] < i - k + 1) {\n            deque.shift();\n        }\n        \n        // Remove indices whose corresponding values are smaller than current\n        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {\n            deque.pop();\n        }\n        \n        // Add current index\n        deque.push(i);\n        \n        // Add to result if window is complete\n        if (i >= k - 1) {\n            result.push(nums[deque[0]]);\n        }\n    }\n    \n    return result;\n};",
        testCases: [
          {
            input: "[1,3,-1,-3,5,3,6,7], 3",
            expected_output: "[3,3,5,5,6,7]",
            weight: 0.6,
            description: "Standard case with mixed values",
          },
          { input: "[1], 1", expected_output: "[1]", weight: 0.2, description: "Single element" },
          {
            input: "[1,3,1,2,0,5], 3",
            expected_output: "[3,3,2,5]",
            weight: 0.2,
            description: "Another mixed case",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        // Your code here\n        return new int[0];\n    }\n}",
        solutionCode:
          "class Solution {\n    public int[] maxSlidingWindow(int[] nums, int k) {\n        if (nums == null || nums.length == 0) {\n            return new int[0];\n        }\n        \n        Deque<Integer> deque = new ArrayDeque<>();  // Store indices\n        int[] result = new int[nums.length - k + 1];\n        int resultIndex = 0;\n        \n        for (int i = 0; i < nums.length; i++) {\n            // Remove indices that are out of current window\n            while (!deque.isEmpty() && deque.peekFirst() < i - k + 1) {\n                deque.pollFirst();\n            }\n            \n            // Remove indices whose corresponding values are smaller than current\n            while (!deque.isEmpty() && nums[deque.peekLast()] < nums[i]) {\n                deque.pollLast();\n            }\n            \n            // Add current index\n            deque.offerLast(i);\n            \n            // Add to result if window is complete\n            if (i >= k - 1) {\n                result[resultIndex++] = nums[deque.peekFirst()];\n            }\n        }\n        \n        return result;\n    }\n}",
        testCases: [
          {
            input: "[1,3,-1,-3,5,3,6,7], 3",
            expected_output: "[3,3,5,5,6,7]",
            weight: 0.6,
            description: "Standard case with mixed values",
          },
          { input: "[1], 1", expected_output: "[1]", weight: 0.2, description: "Single element" },
          {
            input: "[1,3,1,2,0,5], 3",
            expected_output: "[3,3,2,5]",
            weight: 0.2,
            description: "Another mixed case",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func maxSlidingWindow(nums []int, k int) []int {\n    // Your code here\n    return []int{}\n}",
        solutionCode:
          "func maxSlidingWindow(nums []int, k int) []int {\n    if len(nums) == 0 {\n        return []int{}\n    }\n    \n    deque := []int{}  // Store indices\n    result := []int{}\n    \n    for i := 0; i < len(nums); i++ {\n        // Remove indices that are out of current window\n        for len(deque) > 0 && deque[0] < i-k+1 {\n            deque = deque[1:]\n        }\n        \n        // Remove indices whose corresponding values are smaller than current\n        for len(deque) > 0 && nums[deque[len(deque)-1]] < nums[i] {\n            deque = deque[:len(deque)-1]\n        }\n        \n        // Add current index\n        deque = append(deque, i)\n        \n        // Add to result if window is complete\n        if i >= k-1 {\n            result = append(result, nums[deque[0]])\n        }\n    }\n    \n    return result\n}",
        testCases: [
          {
            input: "[1,3,-1,-3,5,3,6,7], 3",
            expected_output: "[3,3,5,5,6,7]",
            weight: 0.6,
            description: "Standard case with mixed values",
          },
          { input: "[1], 1", expected_output: "[1]", weight: 0.2, description: "Single element" },
          {
            input: "[1,3,1,2,0,5], 3",
            expected_output: "[3,3,2,5]",
            weight: 0.2,
            description: "Another mixed case",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums\n# @param {Integer} k\n# @return {Integer[]}\ndef max_sliding_window(nums, k)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums\n# @param {Integer} k\n# @return {Integer[]}\ndef max_sliding_window(nums, k)\n    return [] if nums.empty?\n    \n    deque = []  # Store indices\n    result = []\n    \n    (0...nums.length).each do |i|\n        # Remove indices that are out of current window\n        while !deque.empty? && deque.first < i - k + 1\n            deque.shift\n        end\n        \n        # Remove indices whose corresponding values are smaller than current\n        while !deque.empty? && nums[deque.last] < nums[i]\n            deque.pop\n        end\n        \n        # Add current index\n        deque.push(i)\n        \n        # Add to result if window is complete\n        if i >= k - 1\n            result.push(nums[deque.first])\n        end\n    end\n    \n    result\nend",
        testCases: [
          {
            input: "[1,3,-1,-3,5,3,6,7], 3",
            expected_output: "[3,3,5,5,6,7]",
            weight: 0.6,
            description: "Standard case with mixed values",
          },
          { input: "[1], 1", expected_output: "[1]", weight: 0.2, description: "Single element" },
          {
            input: "[1,3,1,2,0,5], 3",
            expected_output: "[3,3,2,5]",
            weight: 0.2,
            description: "Another mixed case",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    vector<int> maxSlidingWindow(vector<int>& nums, int k) {\n        if (nums.empty()) {\n            return {};\n        }\n        \n        deque<int> dq;  // Store indices\n        vector<int> result;\n        \n        for (int i = 0; i < nums.size(); i++) {\n            // Remove indices that are out of current window\n            while (!dq.empty() && dq.front() < i - k + 1) {\n                dq.pop_front();\n            }\n            \n            // Remove indices whose corresponding values are smaller than current\n            while (!dq.empty() && nums[dq.back()] < nums[i]) {\n                dq.pop_back();\n            }\n            \n            // Add current index\n            dq.push_back(i);\n            \n            // Add to result if window is complete\n            if (i >= k - 1) {\n                result.push_back(nums[dq.front()]);\n            }\n        }\n        \n        return result;\n    }\n};",
        testCases: [
          {
            input: "[1,3,-1,-3,5,3,6,7], 3",
            expected_output: "[3,3,5,5,6,7]",
            weight: 0.6,
            description: "Standard case with mixed values",
          },
          { input: "[1], 1", expected_output: "[1]", weight: 0.2, description: "Single element" },
          {
            input: "[1,3,1,2,0,5], 3",
            expected_output: "[3,3,2,5]",
            weight: 0.2,
            description: "Another mixed case",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(k)",
      constraints: [
        "1 <= nums.length <= 10^5",
        "-10^4 <= nums[i] <= 10^4",
        "1 <= k <= nums.length",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 45,
      tags: ["array", "queue", "sliding-window", "heap", "monotonic-queue"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Sliding Window",
    },
  },

  // Binary Search Advanced - Easy: Search a 2D Matrix
  {
    id: "search-2d-matrix",
    title: "Search a 2D Matrix",
    text: "You are given an m x n integer matrix matrix with the following two properties:\n\n- Each row is sorted in non-decreasing order.\n- The first integer of each row is greater than the last integer of the previous row.\n\nGiven an integer target, return true if target is in matrix or false otherwise.\n\nYou must write a solution in O(log(m * n)) time complexity.\n\n**Example 1:**\nInput: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 5\nOutput: true\n\n**Example 2:**\nInput: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 13\nOutput: true\n\n**Example 3:**\nInput: matrix = [[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], target = 20\nOutput: false",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def searchMatrix(self, matrix, target):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def searchMatrix(self, matrix, target):\n        if not matrix or not matrix[0]:\n            return False\n        \n        m, n = len(matrix), len(matrix[0])\n        left, right = 0, m * n - 1\n        \n        while left <= right:\n            mid = (left + right) // 2\n            mid_value = matrix[mid // n][mid % n]\n            \n            if mid_value == target:\n                return True\n            elif mid_value < target:\n                left = mid + 1\n            else:\n                right = mid - 1\n        \n        return False",
        testCases: [
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 5",
            expected_output: "True",
            weight: 0.4,
            description: "Target exists in matrix",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 13",
            expected_output: "True",
            weight: 0.3,
            description: "Target at different position",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 20",
            expected_output: "False",
            weight: 0.3,
            description: "Target not in matrix",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[][]} matrix\n * @param {number} target\n * @return {boolean}\n */\nvar searchMatrix = function(matrix, target) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[][]} matrix\n * @param {number} target\n * @return {boolean}\n */\nvar searchMatrix = function(matrix, target) {\n    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {\n        return false;\n    }\n    \n    const m = matrix.length, n = matrix[0].length;\n    let left = 0, right = m * n - 1;\n    \n    while (left <= right) {\n        const mid = Math.floor((left + right) / 2);\n        const midValue = matrix[Math.floor(mid / n)][mid % n];\n        \n        if (midValue === target) {\n            return true;\n        } else if (midValue < target) {\n            left = mid + 1;\n        } else {\n            right = mid - 1;\n        }\n    }\n    \n    return false;\n};",
        testCases: [
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 5",
            expected_output: "true",
            weight: 0.4,
            description: "Target exists in matrix",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 13",
            expected_output: "true",
            weight: 0.3,
            description: "Target at different position",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 20",
            expected_output: "false",
            weight: 0.3,
            description: "Target not in matrix",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        // Your code here\n        return false;\n    }\n}",
        solutionCode:
          "class Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {\n            return false;\n        }\n        \n        int m = matrix.length, n = matrix[0].length;\n        int left = 0, right = m * n - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            int midValue = matrix[mid / n][mid % n];\n            \n            if (midValue == target) {\n                return true;\n            } else if (midValue < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        \n        return false;\n    }\n}",
        testCases: [
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 5",
            expected_output: "true",
            weight: 0.4,
            description: "Target exists in matrix",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 13",
            expected_output: "true",
            weight: 0.3,
            description: "Target at different position",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 20",
            expected_output: "false",
            weight: 0.3,
            description: "Target not in matrix",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func searchMatrix(matrix [][]int, target int) bool {\n    // Your code here\n    return false\n}",
        solutionCode:
          "func searchMatrix(matrix [][]int, target int) bool {\n    if len(matrix) == 0 || len(matrix[0]) == 0 {\n        return false\n    }\n    \n    m, n := len(matrix), len(matrix[0])\n    left, right := 0, m*n-1\n    \n    for left <= right {\n        mid := (left + right) / 2\n        midValue := matrix[mid/n][mid%n]\n        \n        if midValue == target {\n            return true\n        } else if midValue < target {\n            left = mid + 1\n        } else {\n            right = mid - 1\n        }\n    }\n    \n    return false\n}",
        testCases: [
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 5",
            expected_output: "true",
            weight: 0.4,
            description: "Target exists in matrix",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 13",
            expected_output: "true",
            weight: 0.3,
            description: "Target at different position",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 20",
            expected_output: "false",
            weight: 0.3,
            description: "Target not in matrix",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[][]} matrix\n# @param {Integer} target\n# @return {Boolean}\ndef search_matrix(matrix, target)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[][]} matrix\n# @param {Integer} target\n# @return {Boolean}\ndef search_matrix(matrix, target)\n    return false if matrix.empty? || matrix[0].empty?\n    \n    m, n = matrix.length, matrix[0].length\n    left, right = 0, m * n - 1\n    \n    while left <= right\n        mid = (left + right) / 2\n        mid_value = matrix[mid / n][mid % n]\n        \n        if mid_value == target\n            return true\n        elsif mid_value < target\n            left = mid + 1\n        else\n            right = mid - 1\n        end\n    end\n    \n    false\nend",
        testCases: [
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 5",
            expected_output: "true",
            weight: 0.4,
            description: "Target exists in matrix",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 13",
            expected_output: "true",
            weight: 0.3,
            description: "Target at different position",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 20",
            expected_output: "false",
            weight: 0.3,
            description: "Target not in matrix",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        // Your code here\n        return false;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        if (matrix.empty() || matrix[0].empty()) {\n            return false;\n        }\n        \n        int m = matrix.size(), n = matrix[0].size();\n        int left = 0, right = m * n - 1;\n        \n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            int midValue = matrix[mid / n][mid % n];\n            \n            if (midValue == target) {\n                return true;\n            } else if (midValue < target) {\n                left = mid + 1;\n            } else {\n                right = mid - 1;\n            }\n        }\n        \n        return false;\n    }\n};",
        testCases: [
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 5",
            expected_output: "true",
            weight: 0.4,
            description: "Target exists in matrix",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 13",
            expected_output: "true",
            weight: 0.3,
            description: "Target at different position",
          },
          {
            input: "[[1,4,7,11],[2,5,8,12],[3,6,9,16],[10,13,14,17]], 20",
            expected_output: "false",
            weight: 0.3,
            description: "Target not in matrix",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(log(m*n))",
      spaceComplexity: "O(1)",
      constraints: [
        "m == matrix.length",
        "n == matrix[i].length",
        "1 <= m, n <= 100",
        "-10^4 <= matrix[i][j], target <= 10^4",
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
      estimatedDuration: 20,
      tags: ["array", "binary-search", "matrix"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Binary Search Advanced",
    },
  },

  // Binary Search Advanced - Medium: Find Peak Element
  {
    id: "find-peak-element",
    title: "Find Peak Element",
    text: "A peak element is an element that is strictly greater than its neighbors.\n\nGiven a 0-indexed integer array nums, find a peak element, and return its index. If the array contains multiple peaks, return the index to any of the peaks.\n\nYou may imagine that nums[-1] = nums[n] = -∞. In other words, an element is always considered to be strictly greater than a neighbor that is outside the array.\n\nYou must write an algorithm that runs in O(log n) time.\n\n**Example 1:**\nInput: nums = [1,2,3,1]\nOutput: 2\nExplanation: 3 is a peak element and your function should return the index number 2.\n\n**Example 2:**\nInput: nums = [1,2,1,3,5,6,4]\nOutput: 5\nExplanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def findPeakElement(self, nums):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def findPeakElement(self, nums):\n        left, right = 0, len(nums) - 1\n        \n        while left < right:\n            mid = (left + right) // 2\n            \n            if nums[mid] > nums[mid + 1]:\n                # Peak is on the left side (including mid)\n                right = mid\n            else:\n                # Peak is on the right side\n                left = mid + 1\n        \n        return left",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "2",
            weight: 0.4,
            description: "Single peak in middle",
          },
          {
            input: "[1,2,1,3,5,6,4]",
            expected_output: "5",
            weight: 0.4,
            description: "Multiple peaks possible",
          },
          { input: "[1]", expected_output: "0", weight: 0.2, description: "Single element" },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar findPeakElement = function(nums) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar findPeakElement = function(nums) {\n    let left = 0, right = nums.length - 1;\n    \n    while (left < right) {\n        const mid = Math.floor((left + right) / 2);\n        \n        if (nums[mid] > nums[mid + 1]) {\n            // Peak is on the left side (including mid)\n            right = mid;\n        } else {\n            // Peak is on the right side\n            left = mid + 1;\n        }\n    }\n    \n    return left;\n};",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "2",
            weight: 0.4,
            description: "Single peak in middle",
          },
          {
            input: "[1,2,1,3,5,6,4]",
            expected_output: "5",
            weight: 0.4,
            description: "Multiple peaks possible",
          },
          { input: "[1]", expected_output: "0", weight: 0.2, description: "Single element" },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int findPeakElement(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int findPeakElement(int[] nums) {\n        int left = 0, right = nums.length - 1;\n        \n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] > nums[mid + 1]) {\n                // Peak is on the left side (including mid)\n                right = mid;\n            } else {\n                // Peak is on the right side\n                left = mid + 1;\n            }\n        }\n        \n        return left;\n    }\n}",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "2",
            weight: 0.4,
            description: "Single peak in middle",
          },
          {
            input: "[1,2,1,3,5,6,4]",
            expected_output: "5",
            weight: 0.4,
            description: "Multiple peaks possible",
          },
          { input: "[1]", expected_output: "0", weight: 0.2, description: "Single element" },
        ],
      },
      {
        language: "go",
        starterCode:
          "func findPeakElement(nums []int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func findPeakElement(nums []int) int {\n    left, right := 0, len(nums)-1\n    \n    for left < right {\n        mid := (left + right) / 2\n        \n        if nums[mid] > nums[mid+1] {\n            // Peak is on the left side (including mid)\n            right = mid\n        } else {\n            // Peak is on the right side\n            left = mid + 1\n        }\n    }\n    \n    return left\n}",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "2",
            weight: 0.4,
            description: "Single peak in middle",
          },
          {
            input: "[1,2,1,3,5,6,4]",
            expected_output: "5",
            weight: 0.4,
            description: "Multiple peaks possible",
          },
          { input: "[1]", expected_output: "0", weight: 0.2, description: "Single element" },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums\n# @return {Integer}\ndef find_peak_element(nums)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums\n# @return {Integer}\ndef find_peak_element(nums)\n    left, right = 0, nums.length - 1\n    \n    while left < right\n        mid = (left + right) / 2\n        \n        if nums[mid] > nums[mid + 1]\n            # Peak is on the left side (including mid)\n            right = mid\n        else\n            # Peak is on the right side\n            left = mid + 1\n        end\n    end\n    \n    left\nend",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "2",
            weight: 0.4,
            description: "Single peak in middle",
          },
          {
            input: "[1,2,1,3,5,6,4]",
            expected_output: "5",
            weight: 0.4,
            description: "Multiple peaks possible",
          },
          { input: "[1]", expected_output: "0", weight: 0.2, description: "Single element" },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int findPeakElement(vector<int>& nums) {\n        int left = 0, right = nums.size() - 1;\n        \n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            \n            if (nums[mid] > nums[mid + 1]) {\n                // Peak is on the left side (including mid)\n                right = mid;\n            } else {\n                // Peak is on the right side\n                left = mid + 1;\n            }\n        }\n        \n        return left;\n    }\n};",
        testCases: [
          {
            input: "[1,2,3,1]",
            expected_output: "2",
            weight: 0.4,
            description: "Single peak in middle",
          },
          {
            input: "[1,2,1,3,5,6,4]",
            expected_output: "5",
            weight: 0.4,
            description: "Multiple peaks possible",
          },
          { input: "[1]", expected_output: "0", weight: 0.2, description: "Single element" },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      constraints: [
        "1 <= nums.length <= 1000",
        "-2^31 <= nums[i] <= 2^31 - 1",
        "nums[i] != nums[i + 1] for all valid i",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 25,
      tags: ["array", "binary-search"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Binary Search Advanced",
    },
  },

  // Binary Search Advanced - Hard: Kth Smallest Element in a Sorted Matrix
  {
    id: "kth-smallest-in-sorted-matrix",
    title: "Kth Smallest Element in a Sorted Matrix",
    text: "Given an n x n matrix where each of the rows and columns is sorted in ascending order, return the kth smallest element in the matrix.\n\nNote that it is the kth smallest element in the sorted order, not the kth distinct element.\n\nYou must find a solution with a memory complexity better than O(n^2).\n\n**Example 1:**\nInput: matrix = [[1,5,9],[10,11,13],[12,13,15]], k = 8\nOutput: 13\nExplanation: The elements in the matrix are [1,5,9,10,11,12,13,13,15], and the 8th smallest number is 13\n\n**Example 2:**\nInput: matrix = [[-5]], k = 1\nOutput: -5",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def kthSmallest(self, matrix, k):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def kthSmallest(self, matrix, k):\n        n = len(matrix)\n        left, right = matrix[0][0], matrix[n-1][n-1]\n        \n        def count_less_equal(mid):\n            count = 0\n            j = n - 1  # Start from top-right corner\n            for i in range(n):\n                while j >= 0 and matrix[i][j] > mid:\n                    j -= 1\n                count += j + 1\n            return count\n        \n        while left < right:\n            mid = (left + right) // 2\n            if count_less_equal(mid) < k:\n                left = mid + 1\n            else:\n                right = mid\n        \n        return left",
        testCases: [
          {
            input: "[[1,5,9],[10,11,13],[12,13,15]], 8",
            expected_output: "13",
            weight: 0.6,
            description: "Standard 3x3 matrix",
          },
          {
            input: "[[-5]], 1",
            expected_output: "-5",
            weight: 0.2,
            description: "Single element matrix",
          },
          {
            input: "[[1,2],[1,3]], 3",
            expected_output: "2",
            weight: 0.2,
            description: "Small matrix with duplicates",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[][]} matrix\n * @param {number} k\n * @return {number}\n */\nvar kthSmallest = function(matrix, k) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[][]} matrix\n * @param {number} k\n * @return {number}\n */\nvar kthSmallest = function(matrix, k) {\n    const n = matrix.length;\n    let left = matrix[0][0], right = matrix[n-1][n-1];\n    \n    function countLessEqual(mid) {\n        let count = 0;\n        let j = n - 1;  // Start from top-right corner\n        for (let i = 0; i < n; i++) {\n            while (j >= 0 && matrix[i][j] > mid) {\n                j--;\n            }\n            count += j + 1;\n        }\n        return count;\n    }\n    \n    while (left < right) {\n        const mid = Math.floor((left + right) / 2);\n        if (countLessEqual(mid) < k) {\n            left = mid + 1;\n        } else {\n            right = mid;\n        }\n    }\n    \n    return left;\n};",
        testCases: [
          {
            input: "[[1,5,9],[10,11,13],[12,13,15]], 8",
            expected_output: "13",
            weight: 0.6,
            description: "Standard 3x3 matrix",
          },
          {
            input: "[[-5]], 1",
            expected_output: "-5",
            weight: 0.2,
            description: "Single element matrix",
          },
          {
            input: "[[1,2],[1,3]], 3",
            expected_output: "2",
            weight: 0.2,
            description: "Small matrix with duplicates",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int kthSmallest(int[][] matrix, int k) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int kthSmallest(int[][] matrix, int k) {\n        int n = matrix.length;\n        int left = matrix[0][0], right = matrix[n-1][n-1];\n        \n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (countLessEqual(matrix, mid, n) < k) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        \n        return left;\n    }\n    \n    private int countLessEqual(int[][] matrix, int mid, int n) {\n        int count = 0;\n        int j = n - 1;  // Start from top-right corner\n        for (int i = 0; i < n; i++) {\n            while (j >= 0 && matrix[i][j] > mid) {\n                j--;\n            }\n            count += j + 1;\n        }\n        return count;\n    }\n}",
        testCases: [
          {
            input: "[[1,5,9],[10,11,13],[12,13,15]], 8",
            expected_output: "13",
            weight: 0.6,
            description: "Standard 3x3 matrix",
          },
          {
            input: "[[-5]], 1",
            expected_output: "-5",
            weight: 0.2,
            description: "Single element matrix",
          },
          {
            input: "[[1,2],[1,3]], 3",
            expected_output: "2",
            weight: 0.2,
            description: "Small matrix with duplicates",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func kthSmallest(matrix [][]int, k int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func kthSmallest(matrix [][]int, k int) int {\n    n := len(matrix)\n    left, right := matrix[0][0], matrix[n-1][n-1]\n    \n    countLessEqual := func(mid int) int {\n        count := 0\n        j := n - 1  // Start from top-right corner\n        for i := 0; i < n; i++ {\n            for j >= 0 && matrix[i][j] > mid {\n                j--\n            }\n            count += j + 1\n        }\n        return count\n    }\n    \n    for left < right {\n        mid := (left + right) / 2\n        if countLessEqual(mid) < k {\n            left = mid + 1\n        } else {\n            right = mid\n        }\n    }\n    \n    return left\n}",
        testCases: [
          {
            input: "[[1,5,9],[10,11,13],[12,13,15]], 8",
            expected_output: "13",
            weight: 0.6,
            description: "Standard 3x3 matrix",
          },
          {
            input: "[[-5]], 1",
            expected_output: "-5",
            weight: 0.2,
            description: "Single element matrix",
          },
          {
            input: "[[1,2],[1,3]], 3",
            expected_output: "2",
            weight: 0.2,
            description: "Small matrix with duplicates",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[][]} matrix\n# @param {Integer} k\n# @return {Integer}\ndef kth_smallest(matrix, k)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[][]} matrix\n# @param {Integer} k\n# @return {Integer}\ndef kth_smallest(matrix, k)\n    n = matrix.length\n    left, right = matrix[0][0], matrix[n-1][n-1]\n    \n    count_less_equal = lambda do |mid|\n        count = 0\n        j = n - 1  # Start from top-right corner\n        (0...n).each do |i|\n            while j >= 0 && matrix[i][j] > mid\n                j -= 1\n            end\n            count += j + 1\n        end\n        count\n    end\n    \n    while left < right\n        mid = (left + right) / 2\n        if count_less_equal.call(mid) < k\n            left = mid + 1\n        else\n            right = mid\n        end\n    end\n    \n    left\nend",
        testCases: [
          {
            input: "[[1,5,9],[10,11,13],[12,13,15]], 8",
            expected_output: "13",
            weight: 0.6,
            description: "Standard 3x3 matrix",
          },
          {
            input: "[[-5]], 1",
            expected_output: "-5",
            weight: 0.2,
            description: "Single element matrix",
          },
          {
            input: "[[1,2],[1,3]], 3",
            expected_output: "2",
            weight: 0.2,
            description: "Small matrix with duplicates",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int kthSmallest(vector<vector<int>>& matrix, int k) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int kthSmallest(vector<vector<int>>& matrix, int k) {\n        int n = matrix.size();\n        int left = matrix[0][0], right = matrix[n-1][n-1];\n        \n        while (left < right) {\n            int mid = left + (right - left) / 2;\n            if (countLessEqual(matrix, mid, n) < k) {\n                left = mid + 1;\n            } else {\n                right = mid;\n            }\n        }\n        \n        return left;\n    }\n    \nprivate:\n    int countLessEqual(vector<vector<int>>& matrix, int mid, int n) {\n        int count = 0;\n        int j = n - 1;  // Start from top-right corner\n        for (int i = 0; i < n; i++) {\n            while (j >= 0 && matrix[i][j] > mid) {\n                j--;\n            }\n            count += j + 1;\n        }\n        return count;\n    }\n};",
        testCases: [
          {
            input: "[[1,5,9],[10,11,13],[12,13,15]], 8",
            expected_output: "13",
            weight: 0.6,
            description: "Standard 3x3 matrix",
          },
          {
            input: "[[-5]], 1",
            expected_output: "-5",
            weight: 0.2,
            description: "Single element matrix",
          },
          {
            input: "[[1,2],[1,3]], 3",
            expected_output: "2",
            weight: 0.2,
            description: "Small matrix with duplicates",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n * log(max - min))",
      spaceComplexity: "O(1)",
      constraints: [
        "n == matrix.length == matrix[i].length",
        "1 <= n <= 300",
        "-10^9 <= matrix[i][j] <= 10^9",
        "All the rows and columns of matrix are guaranteed to be sorted in non-decreasing order",
        "1 <= k <= n^2",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 40,
      tags: ["array", "binary-search", "sorting", "heap", "matrix"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Binary Search Advanced",
    },
  },

  // Greedy Algorithms - Easy: Jump Game
  {
    id: "jump-game",
    title: "Jump Game",
    text: "You are given an integer array nums. You are initially positioned at the array's first index, and each element in the array represents your maximum jump length at that position.\n\nReturn true if you can reach the last index, or false otherwise.\n\n**Example 1:**\nInput: nums = [2,3,1,1,4]\nOutput: true\nExplanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.\n\n**Example 2:**\nInput: nums = [3,2,1,0,4]\nOutput: false\nExplanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def canJump(self, nums):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def canJump(self, nums):\n        max_reach = 0\n        \n        for i in range(len(nums)):\n            # If current position is beyond max reachable, return False\n            if i > max_reach:\n                return False\n            \n            # Update max reachable position\n            max_reach = max(max_reach, i + nums[i])\n            \n            # If we can reach the last index, return True\n            if max_reach >= len(nums) - 1:\n                return True\n        \n        return True",
        testCases: [
          {
            input: "[2,3,1,1,4]",
            expected_output: "True",
            weight: 0.4,
            description: "Can reach the end",
          },
          {
            input: "[3,2,1,0,4]",
            expected_output: "False",
            weight: 0.4,
            description: "Cannot reach the end due to 0",
          },
          {
            input: "[0]",
            expected_output: "True",
            weight: 0.2,
            description: "Single element (already at end)",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar canJump = function(nums) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums\n * @return {boolean}\n */\nvar canJump = function(nums) {\n    let maxReach = 0;\n    \n    for (let i = 0; i < nums.length; i++) {\n        // If current position is beyond max reachable, return false\n        if (i > maxReach) {\n            return false;\n        }\n        \n        // Update max reachable position\n        maxReach = Math.max(maxReach, i + nums[i]);\n        \n        // If we can reach the last index, return true\n        if (maxReach >= nums.length - 1) {\n            return true;\n        }\n    }\n    \n    return true;\n};",
        testCases: [
          {
            input: "[2,3,1,1,4]",
            expected_output: "true",
            weight: 0.4,
            description: "Can reach the end",
          },
          {
            input: "[3,2,1,0,4]",
            expected_output: "false",
            weight: 0.4,
            description: "Cannot reach the end due to 0",
          },
          {
            input: "[0]",
            expected_output: "true",
            weight: 0.2,
            description: "Single element (already at end)",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public boolean canJump(int[] nums) {\n        // Your code here\n        return false;\n    }\n}",
        solutionCode:
          "class Solution {\n    public boolean canJump(int[] nums) {\n        int maxReach = 0;\n        \n        for (int i = 0; i < nums.length; i++) {\n            // If current position is beyond max reachable, return false\n            if (i > maxReach) {\n                return false;\n            }\n            \n            // Update max reachable position\n            maxReach = Math.max(maxReach, i + nums[i]);\n            \n            // If we can reach the last index, return true\n            if (maxReach >= nums.length - 1) {\n                return true;\n            }\n        }\n        \n        return true;\n    }\n}",
        testCases: [
          {
            input: "[2,3,1,1,4]",
            expected_output: "true",
            weight: 0.4,
            description: "Can reach the end",
          },
          {
            input: "[3,2,1,0,4]",
            expected_output: "false",
            weight: 0.4,
            description: "Cannot reach the end due to 0",
          },
          {
            input: "[0]",
            expected_output: "true",
            weight: 0.2,
            description: "Single element (already at end)",
          },
        ],
      },
      {
        language: "go",
        starterCode: "func canJump(nums []int) bool {\n    // Your code here\n    return false\n}",
        solutionCode:
          "func canJump(nums []int) bool {\n    maxReach := 0\n    \n    for i := 0; i < len(nums); i++ {\n        // If current position is beyond max reachable, return false\n        if i > maxReach {\n            return false\n        }\n        \n        // Update max reachable position\n        if i+nums[i] > maxReach {\n            maxReach = i + nums[i]\n        }\n        \n        // If we can reach the last index, return true\n        if maxReach >= len(nums)-1 {\n            return true\n        }\n    }\n    \n    return true\n}",
        testCases: [
          {
            input: "[2,3,1,1,4]",
            expected_output: "true",
            weight: 0.4,
            description: "Can reach the end",
          },
          {
            input: "[3,2,1,0,4]",
            expected_output: "false",
            weight: 0.4,
            description: "Cannot reach the end due to 0",
          },
          {
            input: "[0]",
            expected_output: "true",
            weight: 0.2,
            description: "Single element (already at end)",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums\n# @return {Boolean}\ndef can_jump(nums)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums\n# @return {Boolean}\ndef can_jump(nums)\n    max_reach = 0\n    \n    (0...nums.length).each do |i|\n        # If current position is beyond max reachable, return false\n        return false if i > max_reach\n        \n        # Update max reachable position\n        max_reach = [max_reach, i + nums[i]].max\n        \n        # If we can reach the last index, return true\n        return true if max_reach >= nums.length - 1\n    end\n    \n    true\nend",
        testCases: [
          {
            input: "[2,3,1,1,4]",
            expected_output: "true",
            weight: 0.4,
            description: "Can reach the end",
          },
          {
            input: "[3,2,1,0,4]",
            expected_output: "false",
            weight: 0.4,
            description: "Cannot reach the end due to 0",
          },
          {
            input: "[0]",
            expected_output: "true",
            weight: 0.2,
            description: "Single element (already at end)",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        // Your code here\n        return false;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    bool canJump(vector<int>& nums) {\n        int maxReach = 0;\n        \n        for (int i = 0; i < nums.size(); i++) {\n            // If current position is beyond max reachable, return false\n            if (i > maxReach) {\n                return false;\n            }\n            \n            // Update max reachable position\n            maxReach = max(maxReach, i + nums[i]);\n            \n            // If we can reach the last index, return true\n            if (maxReach >= nums.size() - 1) {\n                return true;\n            }\n        }\n        \n        return true;\n    }\n};",
        testCases: [
          {
            input: "[2,3,1,1,4]",
            expected_output: "true",
            weight: 0.4,
            description: "Can reach the end",
          },
          {
            input: "[3,2,1,0,4]",
            expected_output: "false",
            weight: 0.4,
            description: "Cannot reach the end due to 0",
          },
          {
            input: "[0]",
            expected_output: "true",
            weight: 0.2,
            description: "Single element (already at end)",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      constraints: ["1 <= nums.length <= 10^4", "0 <= nums[i] <= 10^5"],
    },
    gradingRules: {
      testCaseWeight: 0.7,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.1,
      partialCredit: true,
    },
    metadata: {
      difficulty: "EASY",
      estimatedDuration: 20,
      tags: ["array", "dynamic-programming", "greedy"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Greedy Algorithms",
    },
  },

  // Greedy Algorithms - Medium: Gas Station
  {
    id: "gas-station",
    title: "Gas Station",
    text: "There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].\n\nYou have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station to its next (i + 1)th station. You begin the journey with an empty tank at one of the gas stations.\n\nGiven two integer arrays gas and cost, return the starting gas station's index if you can travel around the circuit once in the clockwise direction, otherwise return -1.\n\nIf there exists a solution, it is guaranteed to be unique.\n\n**Example 1:**\nInput: gas = [1,2,3,4,5], cost = [3,4,5,1,2]\nOutput: 3\nExplanation:\nStart at station 3 (index 3) and fill up with 4 units of gas. Your tank = 0 + 4 = 4\nTravel to station 4. Your tank = 4 - 1 + 5 = 8\nTravel to station 0. Your tank = 8 - 2 + 1 = 7\nTravel to station 1. Your tank = 7 - 3 + 2 = 6\nTravel to station 2. Your tank = 6 - 4 + 3 = 5\nTravel to station 3. The cost is 5. Your gas is just enough to travel back to station 3.\nTherefore, return 3 as the starting index.\n\n**Example 2:**\nInput: gas = [2,3,4], cost = [3,4,3]\nOutput: -1\nExplanation:\nYou can't start at station 0 or 1, as there is not enough gas to travel to the next station.\nLet's start at station 2 and fill up with 4 units of gas. Your tank = 0 + 4 = 4\nTravel to station 0. Your tank = 4 - 3 + 2 = 3\nTravel to station 1. Your tank = 3 - 3 + 3 = 3\nTravel to station 2. Your tank = 3 - 4 + 4 = 3\nSince the cost to travel to station 2 is 4, you can't complete the circuit.",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def canCompleteCircuit(self, gas, cost):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def canCompleteCircuit(self, gas, cost):\n        total_gas = sum(gas)\n        total_cost = sum(cost)\n        \n        # If total gas is less than total cost, impossible to complete circuit\n        if total_gas < total_cost:\n            return -1\n        \n        current_gas = 0\n        start_station = 0\n        \n        for i in range(len(gas)):\n            current_gas += gas[i] - cost[i]\n            \n            # If current gas becomes negative, we can't reach next station\n            # So we need to start from the next station\n            if current_gas < 0:\n                current_gas = 0\n                start_station = i + 1\n        \n        return start_station",
        testCases: [
          {
            input: "[1,2,3,4,5], [3,4,5,1,2]",
            expected_output: "3",
            weight: 0.5,
            description: "Valid circuit starting at index 3",
          },
          {
            input: "[2,3,4], [3,4,3]",
            expected_output: "-1",
            weight: 0.3,
            description: "No valid starting point",
          },
          {
            input: "[5,1,2,3,4], [4,4,1,5,1]",
            expected_output: "4",
            weight: 0.2,
            description: "Different valid starting point",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} gas\n * @param {number[]} cost\n * @return {number}\n */\nvar canCompleteCircuit = function(gas, cost) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} gas\n * @param {number[]} cost\n * @return {number}\n */\nvar canCompleteCircuit = function(gas, cost) {\n    const totalGas = gas.reduce((sum, g) => sum + g, 0);\n    const totalCost = cost.reduce((sum, c) => sum + c, 0);\n    \n    // If total gas is less than total cost, impossible to complete circuit\n    if (totalGas < totalCost) {\n        return -1;\n    }\n    \n    let currentGas = 0;\n    let startStation = 0;\n    \n    for (let i = 0; i < gas.length; i++) {\n        currentGas += gas[i] - cost[i];\n        \n        // If current gas becomes negative, we can't reach next station\n        // So we need to start from the next station\n        if (currentGas < 0) {\n            currentGas = 0;\n            startStation = i + 1;\n        }\n    }\n    \n    return startStation;\n};",
        testCases: [
          {
            input: "[1,2,3,4,5], [3,4,5,1,2]",
            expected_output: "3",
            weight: 0.5,
            description: "Valid circuit starting at index 3",
          },
          {
            input: "[2,3,4], [3,4,3]",
            expected_output: "-1",
            weight: 0.3,
            description: "No valid starting point",
          },
          {
            input: "[5,1,2,3,4], [4,4,1,5,1]",
            expected_output: "4",
            weight: 0.2,
            description: "Different valid starting point",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        // Your code here\n        return -1;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int canCompleteCircuit(int[] gas, int[] cost) {\n        int totalGas = 0, totalCost = 0;\n        for (int i = 0; i < gas.length; i++) {\n            totalGas += gas[i];\n            totalCost += cost[i];\n        }\n        \n        // If total gas is less than total cost, impossible to complete circuit\n        if (totalGas < totalCost) {\n            return -1;\n        }\n        \n        int currentGas = 0;\n        int startStation = 0;\n        \n        for (int i = 0; i < gas.length; i++) {\n            currentGas += gas[i] - cost[i];\n            \n            // If current gas becomes negative, we can't reach next station\n            // So we need to start from the next station\n            if (currentGas < 0) {\n                currentGas = 0;\n                startStation = i + 1;\n            }\n        }\n        \n        return startStation;\n    }\n}",
        testCases: [
          {
            input: "[1,2,3,4,5], [3,4,5,1,2]",
            expected_output: "3",
            weight: 0.5,
            description: "Valid circuit starting at index 3",
          },
          {
            input: "[2,3,4], [3,4,3]",
            expected_output: "-1",
            weight: 0.3,
            description: "No valid starting point",
          },
          {
            input: "[5,1,2,3,4], [4,4,1,5,1]",
            expected_output: "4",
            weight: 0.2,
            description: "Different valid starting point",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func canCompleteCircuit(gas []int, cost []int) int {\n    // Your code here\n    return -1\n}",
        solutionCode:
          "func canCompleteCircuit(gas []int, cost []int) int {\n    totalGas, totalCost := 0, 0\n    for i := 0; i < len(gas); i++ {\n        totalGas += gas[i]\n        totalCost += cost[i]\n    }\n    \n    // If total gas is less than total cost, impossible to complete circuit\n    if totalGas < totalCost {\n        return -1\n    }\n    \n    currentGas := 0\n    startStation := 0\n    \n    for i := 0; i < len(gas); i++ {\n        currentGas += gas[i] - cost[i]\n        \n        // If current gas becomes negative, we can't reach next station\n        // So we need to start from the next station\n        if currentGas < 0 {\n            currentGas = 0\n            startStation = i + 1\n        }\n    }\n    \n    return startStation\n}",
        testCases: [
          {
            input: "[1,2,3,4,5], [3,4,5,1,2]",
            expected_output: "3",
            weight: 0.5,
            description: "Valid circuit starting at index 3",
          },
          {
            input: "[2,3,4], [3,4,3]",
            expected_output: "-1",
            weight: 0.3,
            description: "No valid starting point",
          },
          {
            input: "[5,1,2,3,4], [4,4,1,5,1]",
            expected_output: "4",
            weight: 0.2,
            description: "Different valid starting point",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} gas\n# @param {Integer[]} cost\n# @return {Integer}\ndef can_complete_circuit(gas, cost)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} gas\n# @param {Integer[]} cost\n# @return {Integer}\ndef can_complete_circuit(gas, cost)\n    total_gas = gas.sum\n    total_cost = cost.sum\n    \n    # If total gas is less than total cost, impossible to complete circuit\n    return -1 if total_gas < total_cost\n    \n    current_gas = 0\n    start_station = 0\n    \n    (0...gas.length).each do |i|\n        current_gas += gas[i] - cost[i]\n        \n        # If current gas becomes negative, we can't reach next station\n        # So we need to start from the next station\n        if current_gas < 0\n            current_gas = 0\n            start_station = i + 1\n        end\n    end\n    \n    start_station\nend",
        testCases: [
          {
            input: "[1,2,3,4,5], [3,4,5,1,2]",
            expected_output: "3",
            weight: 0.5,
            description: "Valid circuit starting at index 3",
          },
          {
            input: "[2,3,4], [3,4,3]",
            expected_output: "-1",
            weight: 0.3,
            description: "No valid starting point",
          },
          {
            input: "[5,1,2,3,4], [4,4,1,5,1]",
            expected_output: "4",
            weight: 0.2,
            description: "Different valid starting point",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        // Your code here\n        return -1;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {\n        int totalGas = 0, totalCost = 0;\n        for (int i = 0; i < gas.size(); i++) {\n            totalGas += gas[i];\n            totalCost += cost[i];\n        }\n        \n        // If total gas is less than total cost, impossible to complete circuit\n        if (totalGas < totalCost) {\n            return -1;\n        }\n        \n        int currentGas = 0;\n        int startStation = 0;\n        \n        for (int i = 0; i < gas.size(); i++) {\n            currentGas += gas[i] - cost[i];\n            \n            // If current gas becomes negative, we can't reach next station\n            // So we need to start from the next station\n            if (currentGas < 0) {\n                currentGas = 0;\n                startStation = i + 1;\n            }\n        }\n        \n        return startStation;\n    }\n};",
        testCases: [
          {
            input: "[1,2,3,4,5], [3,4,5,1,2]",
            expected_output: "3",
            weight: 0.5,
            description: "Valid circuit starting at index 3",
          },
          {
            input: "[2,3,4], [3,4,3]",
            expected_output: "-1",
            weight: 0.3,
            description: "No valid starting point",
          },
          {
            input: "[5,1,2,3,4], [4,4,1,5,1]",
            expected_output: "4",
            weight: 0.2,
            description: "Different valid starting point",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      constraints: [
        "gas.length == n",
        "cost.length == n",
        "1 <= n <= 10^5",
        "0 <= gas[i], cost[i] <= 10^4",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 30,
      tags: ["array", "greedy"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Greedy Algorithms",
    },
  },

  // Greedy Algorithms - Hard: Meeting Rooms II
  {
    id: "meeting-rooms-ii",
    title: "Meeting Rooms II",
    text: "Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], return the minimum number of conference rooms required.\n\n**Example 1:**\nInput: intervals = [[0,30],[5,10],[15,20]]\nOutput: 2\nExplanation: We need two meeting rooms:\n- Room 1: [0,30]\n- Room 2: [5,10], [15,20]\n\n**Example 2:**\nInput: intervals = [[7,10],[2,4]]\nOutput: 1\nExplanation: Only one meeting room is needed since the meetings don't overlap.\n\n**Example 3:**\nInput: intervals = [[9,10],[4,9],[4,17]]\nOutput: 2\nExplanation: We need two meeting rooms:\n- Room 1: [4,9]\n- Room 2: [9,10], [4,17] (Note: [4,17] can start after [9,10] ends)",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def minMeetingRooms(self, intervals):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def minMeetingRooms(self, intervals):\n        if not intervals:\n            return 0\n        \n        # Separate start and end times\n        starts = sorted([interval[0] for interval in intervals])\n        ends = sorted([interval[1] for interval in intervals])\n        \n        rooms_needed = 0\n        max_rooms = 0\n        start_ptr = end_ptr = 0\n        \n        while start_ptr < len(intervals):\n            # If a meeting starts before the earliest ending meeting ends\n            if starts[start_ptr] < ends[end_ptr]:\n                rooms_needed += 1\n                start_ptr += 1\n            else:\n                # A meeting ends, so we can reuse the room\n                rooms_needed -= 1\n                end_ptr += 1\n            \n            max_rooms = max(max_rooms, rooms_needed)\n        \n        return max_rooms",
        testCases: [
          {
            input: "[[0,30],[5,10],[15,20]]",
            expected_output: "2",
            weight: 0.4,
            description: "Overlapping meetings requiring 2 rooms",
          },
          {
            input: "[[7,10],[2,4]]",
            expected_output: "1",
            weight: 0.3,
            description: "Non-overlapping meetings",
          },
          {
            input: "[[9,10],[4,9],[4,17]]",
            expected_output: "2",
            weight: 0.3,
            description: "Complex overlapping pattern",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[][]} intervals\n * @return {number}\n */\nvar minMeetingRooms = function(intervals) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[][]} intervals\n * @return {number}\n */\nvar minMeetingRooms = function(intervals) {\n    if (!intervals || intervals.length === 0) {\n        return 0;\n    }\n    \n    // Separate start and end times\n    const starts = intervals.map(interval => interval[0]).sort((a, b) => a - b);\n    const ends = intervals.map(interval => interval[1]).sort((a, b) => a - b);\n    \n    let roomsNeeded = 0;\n    let maxRooms = 0;\n    let startPtr = 0, endPtr = 0;\n    \n    while (startPtr < intervals.length) {\n        // If a meeting starts before the earliest ending meeting ends\n        if (starts[startPtr] < ends[endPtr]) {\n            roomsNeeded++;\n            startPtr++;\n        } else {\n            // A meeting ends, so we can reuse the room\n            roomsNeeded--;\n            endPtr++;\n        }\n        \n        maxRooms = Math.max(maxRooms, roomsNeeded);\n    }\n    \n    return maxRooms;\n};",
        testCases: [
          {
            input: "[[0,30],[5,10],[15,20]]",
            expected_output: "2",
            weight: 0.4,
            description: "Overlapping meetings requiring 2 rooms",
          },
          {
            input: "[[7,10],[2,4]]",
            expected_output: "1",
            weight: 0.3,
            description: "Non-overlapping meetings",
          },
          {
            input: "[[9,10],[4,9],[4,17]]",
            expected_output: "2",
            weight: 0.3,
            description: "Complex overlapping pattern",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int minMeetingRooms(int[][] intervals) {\n        if (intervals == null || intervals.length == 0) {\n            return 0;\n        }\n        \n        // Separate start and end times\n        int[] starts = new int[intervals.length];\n        int[] ends = new int[intervals.length];\n        \n        for (int i = 0; i < intervals.length; i++) {\n            starts[i] = intervals[i][0];\n            ends[i] = intervals[i][1];\n        }\n        \n        Arrays.sort(starts);\n        Arrays.sort(ends);\n        \n        int roomsNeeded = 0;\n        int maxRooms = 0;\n        int startPtr = 0, endPtr = 0;\n        \n        while (startPtr < intervals.length) {\n            // If a meeting starts before the earliest ending meeting ends\n            if (starts[startPtr] < ends[endPtr]) {\n                roomsNeeded++;\n                startPtr++;\n            } else {\n                // A meeting ends, so we can reuse the room\n                roomsNeeded--;\n                endPtr++;\n            }\n            \n            maxRooms = Math.max(maxRooms, roomsNeeded);\n        }\n        \n        return maxRooms;\n    }\n}",
        testCases: [
          {
            input: "[[0,30],[5,10],[15,20]]",
            expected_output: "2",
            weight: 0.4,
            description: "Overlapping meetings requiring 2 rooms",
          },
          {
            input: "[[7,10],[2,4]]",
            expected_output: "1",
            weight: 0.3,
            description: "Non-overlapping meetings",
          },
          {
            input: "[[9,10],[4,9],[4,17]]",
            expected_output: "2",
            weight: 0.3,
            description: "Complex overlapping pattern",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func minMeetingRooms(intervals [][]int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func minMeetingRooms(intervals [][]int) int {\n    if len(intervals) == 0 {\n        return 0\n    }\n    \n    // Separate start and end times\n    starts := make([]int, len(intervals))\n    ends := make([]int, len(intervals))\n    \n    for i, interval := range intervals {\n        starts[i] = interval[0]\n        ends[i] = interval[1]\n    }\n    \n    sort.Ints(starts)\n    sort.Ints(ends)\n    \n    roomsNeeded := 0\n    maxRooms := 0\n    startPtr, endPtr := 0, 0\n    \n    for startPtr < len(intervals) {\n        // If a meeting starts before the earliest ending meeting ends\n        if starts[startPtr] < ends[endPtr] {\n            roomsNeeded++\n            startPtr++\n        } else {\n            // A meeting ends, so we can reuse the room\n            roomsNeeded--\n            endPtr++\n        }\n        \n        if roomsNeeded > maxRooms {\n            maxRooms = roomsNeeded\n        }\n    }\n    \n    return maxRooms\n}",
        testCases: [
          {
            input: "[[0,30],[5,10],[15,20]]",
            expected_output: "2",
            weight: 0.4,
            description: "Overlapping meetings requiring 2 rooms",
          },
          {
            input: "[[7,10],[2,4]]",
            expected_output: "1",
            weight: 0.3,
            description: "Non-overlapping meetings",
          },
          {
            input: "[[9,10],[4,9],[4,17]]",
            expected_output: "2",
            weight: 0.3,
            description: "Complex overlapping pattern",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[][]} intervals\n# @return {Integer}\ndef min_meeting_rooms(intervals)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[][]} intervals\n# @return {Integer}\ndef min_meeting_rooms(intervals)\n    return 0 if intervals.empty?\n    \n    # Separate start and end times\n    starts = intervals.map { |interval| interval[0] }.sort\n    ends = intervals.map { |interval| interval[1] }.sort\n    \n    rooms_needed = 0\n    max_rooms = 0\n    start_ptr = end_ptr = 0\n    \n    while start_ptr < intervals.length\n        # If a meeting starts before the earliest ending meeting ends\n        if starts[start_ptr] < ends[end_ptr]\n            rooms_needed += 1\n            start_ptr += 1\n        else\n            # A meeting ends, so we can reuse the room\n            rooms_needed -= 1\n            end_ptr += 1\n        end\n        \n        max_rooms = [max_rooms, rooms_needed].max\n    end\n    \n    max_rooms\nend",
        testCases: [
          {
            input: "[[0,30],[5,10],[15,20]]",
            expected_output: "2",
            weight: 0.4,
            description: "Overlapping meetings requiring 2 rooms",
          },
          {
            input: "[[7,10],[2,4]]",
            expected_output: "1",
            weight: 0.3,
            description: "Non-overlapping meetings",
          },
          {
            input: "[[9,10],[4,9],[4,17]]",
            expected_output: "2",
            weight: 0.3,
            description: "Complex overlapping pattern",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int minMeetingRooms(vector<vector<int>>& intervals) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int minMeetingRooms(vector<vector<int>>& intervals) {\n        if (intervals.empty()) {\n            return 0;\n        }\n        \n        // Separate start and end times\n        vector<int> starts, ends;\n        for (const auto& interval : intervals) {\n            starts.push_back(interval[0]);\n            ends.push_back(interval[1]);\n        }\n        \n        sort(starts.begin(), starts.end());\n        sort(ends.begin(), ends.end());\n        \n        int roomsNeeded = 0;\n        int maxRooms = 0;\n        int startPtr = 0, endPtr = 0;\n        \n        while (startPtr < intervals.size()) {\n            // If a meeting starts before the earliest ending meeting ends\n            if (starts[startPtr] < ends[endPtr]) {\n                roomsNeeded++;\n                startPtr++;\n            } else {\n                // A meeting ends, so we can reuse the room\n                roomsNeeded--;\n                endPtr++;\n            }\n            \n            maxRooms = max(maxRooms, roomsNeeded);\n        }\n        \n        return maxRooms;\n    }\n};",
        testCases: [
          {
            input: "[[0,30],[5,10],[15,20]]",
            expected_output: "2",
            weight: 0.4,
            description: "Overlapping meetings requiring 2 rooms",
          },
          {
            input: "[[7,10],[2,4]]",
            expected_output: "1",
            weight: 0.3,
            description: "Non-overlapping meetings",
          },
          {
            input: "[[9,10],[4,9],[4,17]]",
            expected_output: "2",
            weight: 0.3,
            description: "Complex overlapping pattern",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n log n)",
      spaceComplexity: "O(n)",
      constraints: ["1 <= intervals.length <= 10^4", "0 <= starti < endi <= 10^6"],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 35,
      tags: ["array", "two-pointers", "greedy", "sorting", "heap"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Greedy Algorithms",
    },
  },

  // Bit Manipulation - Easy: Single Number
  {
    id: "single-number",
    title: "Single Number",
    text: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.\n\nYou must implement a solution with a linear runtime complexity and use only constant extra space.\n\n**Example 1:**\nInput: nums = [2,2,1]\nOutput: 1\n\n**Example 2:**\nInput: nums = [4,1,2,1,2]\nOutput: 4\n\n**Example 3:**\nInput: nums = [1]\nOutput: 1",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def singleNumber(self, nums):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def singleNumber(self, nums):\n        result = 0\n        for num in nums:\n            result ^= num\n        return result",
        testCases: [
          {
            input: "[2,2,1]",
            expected_output: "1",
            weight: 0.4,
            description: "Single number at end",
          },
          {
            input: "[4,1,2,1,2]",
            expected_output: "4",
            weight: 0.4,
            description: "Single number at beginning",
          },
          { input: "[1]", expected_output: "1", weight: 0.2, description: "Single element array" },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar singleNumber = function(nums) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[]} nums\n * @return {number}\n */\nvar singleNumber = function(nums) {\n    let result = 0;\n    for (const num of nums) {\n        result ^= num;\n    }\n    return result;\n};",
        testCases: [
          {
            input: "[2,2,1]",
            expected_output: "1",
            weight: 0.4,
            description: "Single number at end",
          },
          {
            input: "[4,1,2,1,2]",
            expected_output: "4",
            weight: 0.4,
            description: "Single number at beginning",
          },
          { input: "[1]", expected_output: "1", weight: 0.2, description: "Single element array" },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int singleNumber(int[] nums) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int singleNumber(int[] nums) {\n        int result = 0;\n        for (int num : nums) {\n            result ^= num;\n        }\n        return result;\n    }\n}",
        testCases: [
          {
            input: "[2,2,1]",
            expected_output: "1",
            weight: 0.4,
            description: "Single number at end",
          },
          {
            input: "[4,1,2,1,2]",
            expected_output: "4",
            weight: 0.4,
            description: "Single number at beginning",
          },
          { input: "[1]", expected_output: "1", weight: 0.2, description: "Single element array" },
        ],
      },
      {
        language: "go",
        starterCode: "func singleNumber(nums []int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func singleNumber(nums []int) int {\n    result := 0\n    for _, num := range nums {\n        result ^= num\n    }\n    return result\n}",
        testCases: [
          {
            input: "[2,2,1]",
            expected_output: "1",
            weight: 0.4,
            description: "Single number at end",
          },
          {
            input: "[4,1,2,1,2]",
            expected_output: "4",
            weight: 0.4,
            description: "Single number at beginning",
          },
          { input: "[1]", expected_output: "1", weight: 0.2, description: "Single element array" },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[]} nums\n# @return {Integer}\ndef single_number(nums)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[]} nums\n# @return {Integer}\ndef single_number(nums)\n    result = 0\n    nums.each do |num|\n        result ^= num\n    end\n    result\nend",
        testCases: [
          {
            input: "[2,2,1]",
            expected_output: "1",
            weight: 0.4,
            description: "Single number at end",
          },
          {
            input: "[4,1,2,1,2]",
            expected_output: "4",
            weight: 0.4,
            description: "Single number at beginning",
          },
          { input: "[1]", expected_output: "1", weight: 0.2, description: "Single element array" },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int singleNumber(vector<int>& nums) {\n        int result = 0;\n        for (int num : nums) {\n            result ^= num;\n        }\n        return result;\n    }\n};",
        testCases: [
          {
            input: "[2,2,1]",
            expected_output: "1",
            weight: 0.4,
            description: "Single number at end",
          },
          {
            input: "[4,1,2,1,2]",
            expected_output: "4",
            weight: 0.4,
            description: "Single number at beginning",
          },
          { input: "[1]", expected_output: "1", weight: 0.2, description: "Single element array" },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      constraints: [
        "1 <= nums.length <= 3 * 10^4",
        "-3 * 10^4 <= nums[i] <= 3 * 10^4",
        "Each element in the array appears twice except for one element which appears only once",
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
      tags: ["array", "bit-manipulation"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Bit Manipulation",
    },
  },

  // Bit Manipulation - Medium: Counting Bits
  {
    id: "counting-bits",
    title: "Counting Bits",
    text: "Given an integer n, return an array ans of length n + 1 such that for each i (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.\n\n**Example 1:**\nInput: n = 2\nOutput: [0,1,1]\nExplanation:\n0 --> 0\n1 --> 1\n2 --> 10\n\n**Example 2:**\nInput: n = 5\nOutput: [0,1,1,2,1,2]\nExplanation:\n0 --> 0\n1 --> 1\n2 --> 10\n3 --> 11\n4 --> 100\n5 --> 101\n\n**Follow up:**\n- It is very easy to come up with a solution with a runtime of O(n log n). Can you do it in linear time O(n)?\n- Can you do it without using any built-in function (i.e., like __builtin_popcount in C++)?",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def countBits(self, n):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def countBits(self, n):\n        dp = [0] * (n + 1)\n        \n        for i in range(1, n + 1):\n            # dp[i] = dp[i >> 1] + (i & 1)\n            # Number of 1s in i = Number of 1s in i//2 + (1 if i is odd else 0)\n            dp[i] = dp[i >> 1] + (i & 1)\n        \n        return dp",
        testCases: [
          { input: "2", expected_output: "[0,1,1]", weight: 0.4, description: "Small case n=2" },
          {
            input: "5",
            expected_output: "[0,1,1,2,1,2]",
            weight: 0.4,
            description: "Standard case n=5",
          },
          { input: "0", expected_output: "[0]", weight: 0.2, description: "Edge case n=0" },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number} n\n * @return {number[]}\n */\nvar countBits = function(n) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number} n\n * @return {number[]}\n */\nvar countBits = function(n) {\n    const dp = new Array(n + 1).fill(0);\n    \n    for (let i = 1; i <= n; i++) {\n        // dp[i] = dp[i >> 1] + (i & 1)\n        // Number of 1s in i = Number of 1s in i//2 + (1 if i is odd else 0)\n        dp[i] = dp[i >> 1] + (i & 1);\n    }\n    \n    return dp;\n};",
        testCases: [
          { input: "2", expected_output: "[0,1,1]", weight: 0.4, description: "Small case n=2" },
          {
            input: "5",
            expected_output: "[0,1,1,2,1,2]",
            weight: 0.4,
            description: "Standard case n=5",
          },
          { input: "0", expected_output: "[0]", weight: 0.2, description: "Edge case n=0" },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int[] countBits(int n) {\n        // Your code here\n        return new int[0];\n    }\n}",
        solutionCode:
          "class Solution {\n    public int[] countBits(int n) {\n        int[] dp = new int[n + 1];\n        \n        for (int i = 1; i <= n; i++) {\n            // dp[i] = dp[i >> 1] + (i & 1)\n            // Number of 1s in i = Number of 1s in i//2 + (1 if i is odd else 0)\n            dp[i] = dp[i >> 1] + (i & 1);\n        }\n        \n        return dp;\n    }\n}",
        testCases: [
          { input: "2", expected_output: "[0,1,1]", weight: 0.4, description: "Small case n=2" },
          {
            input: "5",
            expected_output: "[0,1,1,2,1,2]",
            weight: 0.4,
            description: "Standard case n=5",
          },
          { input: "0", expected_output: "[0]", weight: 0.2, description: "Edge case n=0" },
        ],
      },
      {
        language: "go",
        starterCode: "func countBits(n int) []int {\n    // Your code here\n    return []int{}\n}",
        solutionCode:
          "func countBits(n int) []int {\n    dp := make([]int, n+1)\n    \n    for i := 1; i <= n; i++ {\n        // dp[i] = dp[i >> 1] + (i & 1)\n        // Number of 1s in i = Number of 1s in i//2 + (1 if i is odd else 0)\n        dp[i] = dp[i>>1] + (i&1)\n    }\n    \n    return dp\n}",
        testCases: [
          { input: "2", expected_output: "[0,1,1]", weight: 0.4, description: "Small case n=2" },
          {
            input: "5",
            expected_output: "[0,1,1,2,1,2]",
            weight: 0.4,
            description: "Standard case n=5",
          },
          { input: "0", expected_output: "[0]", weight: 0.2, description: "Edge case n=0" },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer} n\n# @return {Integer[]}\ndef count_bits(n)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer} n\n# @return {Integer[]}\ndef count_bits(n)\n    dp = Array.new(n + 1, 0)\n    \n    (1..n).each do |i|\n        # dp[i] = dp[i >> 1] + (i & 1)\n        # Number of 1s in i = Number of 1s in i//2 + (1 if i is odd else 0)\n        dp[i] = dp[i >> 1] + (i & 1)\n    end\n    \n    dp\nend",
        testCases: [
          { input: "2", expected_output: "[0,1,1]", weight: 0.4, description: "Small case n=2" },
          {
            input: "5",
            expected_output: "[0,1,1,2,1,2]",
            weight: 0.4,
            description: "Standard case n=5",
          },
          { input: "0", expected_output: "[0]", weight: 0.2, description: "Edge case n=0" },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    vector<int> countBits(int n) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    vector<int> countBits(int n) {\n        vector<int> dp(n + 1, 0);\n        \n        for (int i = 1; i <= n; i++) {\n            // dp[i] = dp[i >> 1] + (i & 1)\n            // Number of 1s in i = Number of 1s in i//2 + (1 if i is odd else 0)\n            dp[i] = dp[i >> 1] + (i & 1);\n        }\n        \n        return dp;\n    }\n};",
        testCases: [
          { input: "2", expected_output: "[0,1,1]", weight: 0.4, description: "Small case n=2" },
          {
            input: "5",
            expected_output: "[0,1,1,2,1,2]",
            weight: 0.4,
            description: "Standard case n=5",
          },
          { input: "0", expected_output: "[0]", weight: 0.2, description: "Edge case n=0" },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
      constraints: ["0 <= n <= 10^5"],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 25,
      tags: ["dynamic-programming", "bit-manipulation"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Bit Manipulation",
    },
  },

  // Bit Manipulation - Hard: Bitwise AND of Numbers Range
  {
    id: "bitwise-and-numbers-range",
    title: "Bitwise AND of Numbers Range",
    text: "Given two integers left and right that represent the range [left, right], return the bitwise AND of all numbers in this range, inclusive.\n\n**Example 1:**\nInput: left = 5, right = 7\nOutput: 4\nExplanation: The bitwise AND of 5 (101), 6 (110), and 7 (111) is 4 (100).\n\n**Example 2:**\nInput: left = 0, right = 0\nOutput: 0\n\n**Example 3:**\nInput: left = 1, right = 2147483647\nOutput: 0\nExplanation: The bitwise AND of all numbers from 1 to 2147483647 will be 0 because there will be at least one 0 bit in each position across all numbers.",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def rangeBitwiseAnd(self, left, right):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def rangeBitwiseAnd(self, left, right):\n        shift = 0\n        \n        # Find the common prefix of left and right\n        while left != right:\n            left >>= 1\n            right >>= 1\n            shift += 1\n        \n        # Shift back to get the result\n        return left << shift",
        testCases: [
          {
            input: "5, 7",
            expected_output: "4",
            weight: 0.4,
            description: "Range [5,7] with common prefix",
          },
          { input: "0, 0", expected_output: "0", weight: 0.2, description: "Single number range" },
          {
            input: "1, 2147483647",
            expected_output: "0",
            weight: 0.4,
            description: "Large range resulting in 0",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number} left\n * @param {number} right\n * @return {number}\n */\nvar rangeBitwiseAnd = function(left, right) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number} left\n * @param {number} right\n * @return {number}\n */\nvar rangeBitwiseAnd = function(left, right) {\n    let shift = 0;\n    \n    // Find the common prefix of left and right\n    while (left !== right) {\n        left >>= 1;\n        right >>= 1;\n        shift++;\n    }\n    \n    // Shift back to get the result\n    return left << shift;\n};",
        testCases: [
          {
            input: "5, 7",
            expected_output: "4",
            weight: 0.4,
            description: "Range [5,7] with common prefix",
          },
          { input: "0, 0", expected_output: "0", weight: 0.2, description: "Single number range" },
          {
            input: "1, 2147483647",
            expected_output: "0",
            weight: 0.4,
            description: "Large range resulting in 0",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public int rangeBitwiseAnd(int left, int right) {\n        // Your code here\n        return 0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public int rangeBitwiseAnd(int left, int right) {\n        int shift = 0;\n        \n        // Find the common prefix of left and right\n        while (left != right) {\n            left >>= 1;\n            right >>= 1;\n            shift++;\n        }\n        \n        // Shift back to get the result\n        return left << shift;\n    }\n}",
        testCases: [
          {
            input: "5, 7",
            expected_output: "4",
            weight: 0.4,
            description: "Range [5,7] with common prefix",
          },
          { input: "0, 0", expected_output: "0", weight: 0.2, description: "Single number range" },
          {
            input: "1, 2147483647",
            expected_output: "0",
            weight: 0.4,
            description: "Large range resulting in 0",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func rangeBitwiseAnd(left int, right int) int {\n    // Your code here\n    return 0\n}",
        solutionCode:
          "func rangeBitwiseAnd(left int, right int) int {\n    shift := 0\n    \n    // Find the common prefix of left and right\n    for left != right {\n        left >>= 1\n        right >>= 1\n        shift++\n    }\n    \n    // Shift back to get the result\n    return left << shift\n}",
        testCases: [
          {
            input: "5, 7",
            expected_output: "4",
            weight: 0.4,
            description: "Range [5,7] with common prefix",
          },
          { input: "0, 0", expected_output: "0", weight: 0.2, description: "Single number range" },
          {
            input: "1, 2147483647",
            expected_output: "0",
            weight: 0.4,
            description: "Large range resulting in 0",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer} left\n# @param {Integer} right\n# @return {Integer}\ndef range_bitwise_and(left, right)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer} left\n# @param {Integer} right\n# @return {Integer}\ndef range_bitwise_and(left, right)\n    shift = 0\n    \n    # Find the common prefix of left and right\n    while left != right\n        left >>= 1\n        right >>= 1\n        shift += 1\n    end\n    \n    # Shift back to get the result\n    left << shift\nend",
        testCases: [
          {
            input: "5, 7",
            expected_output: "4",
            weight: 0.4,
            description: "Range [5,7] with common prefix",
          },
          { input: "0, 0", expected_output: "0", weight: 0.2, description: "Single number range" },
          {
            input: "1, 2147483647",
            expected_output: "0",
            weight: 0.4,
            description: "Large range resulting in 0",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    int rangeBitwiseAnd(int left, int right) {\n        // Your code here\n        return 0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    int rangeBitwiseAnd(int left, int right) {\n        int shift = 0;\n        \n        // Find the common prefix of left and right\n        while (left != right) {\n            left >>= 1;\n            right >>= 1;\n            shift++;\n        }\n        \n        // Shift back to get the result\n        return left << shift;\n    }\n};",
        testCases: [
          {
            input: "5, 7",
            expected_output: "4",
            weight: 0.4,
            description: "Range [5,7] with common prefix",
          },
          { input: "0, 0", expected_output: "0", weight: 0.2, description: "Single number range" },
          {
            input: "1, 2147483647",
            expected_output: "0",
            weight: 0.4,
            description: "Large range resulting in 0",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      constraints: ["0 <= left <= right <= 2^31 - 1"],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 30,
      tags: ["bit-manipulation"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Bit Manipulation",
    },
  },

  // Math & Geometry - Easy: Pow(x, n)
  {
    id: "pow-x-n",
    title: "Pow(x, n)",
    text: "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).\n\n**Example 1:**\nInput: x = 2.00000, n = 10\nOutput: 1024.00000\n\n**Example 2:**\nInput: x = 2.10000, n = 3\nOutput: 9.26100\n\n**Example 3:**\nInput: x = 2.00000, n = -2\nOutput: 0.25000\nExplanation: 2^-2 = 1/2^2 = 1/4 = 0.25",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def myPow(self, x, n):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def myPow(self, x, n):\n        if n == 0:\n            return 1.0\n        \n        if n < 0:\n            x = 1 / x\n            n = -n\n        \n        result = 1.0\n        current_power = x\n        \n        while n > 0:\n            if n % 2 == 1:\n                result *= current_power\n            current_power *= current_power\n            n //= 2\n        \n        return result",
        testCases: [
          {
            input: "2.00000, 10",
            expected_output: "1024.00000",
            weight: 0.4,
            description: "Positive integer exponent",
          },
          {
            input: "2.10000, 3",
            expected_output: "9.26100",
            weight: 0.3,
            description: "Decimal base with positive exponent",
          },
          {
            input: "2.00000, -2",
            expected_output: "0.25000",
            weight: 0.3,
            description: "Negative exponent",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number} x\n * @param {number} n\n * @return {number}\n */\nvar myPow = function(x, n) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number} x\n * @param {number} n\n * @return {number}\n */\nvar myPow = function(x, n) {\n    if (n === 0) {\n        return 1.0;\n    }\n    \n    if (n < 0) {\n        x = 1 / x;\n        n = -n;\n    }\n    \n    let result = 1.0;\n    let currentPower = x;\n    \n    while (n > 0) {\n        if (n % 2 === 1) {\n            result *= currentPower;\n        }\n        currentPower *= currentPower;\n        n = Math.floor(n / 2);\n    }\n    \n    return result;\n};",
        testCases: [
          {
            input: "2.00000, 10",
            expected_output: "1024.00000",
            weight: 0.4,
            description: "Positive integer exponent",
          },
          {
            input: "2.10000, 3",
            expected_output: "9.26100",
            weight: 0.3,
            description: "Decimal base with positive exponent",
          },
          {
            input: "2.00000, -2",
            expected_output: "0.25000",
            weight: 0.3,
            description: "Negative exponent",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public double myPow(double x, int n) {\n        // Your code here\n        return 0.0;\n    }\n}",
        solutionCode:
          "class Solution {\n    public double myPow(double x, int n) {\n        if (n == 0) {\n            return 1.0;\n        }\n        \n        long longN = n;\n        if (longN < 0) {\n            x = 1 / x;\n            longN = -longN;\n        }\n        \n        double result = 1.0;\n        double currentPower = x;\n        \n        while (longN > 0) {\n            if (longN % 2 == 1) {\n                result *= currentPower;\n            }\n            currentPower *= currentPower;\n            longN /= 2;\n        }\n        \n        return result;\n    }\n}",
        testCases: [
          {
            input: "2.00000, 10",
            expected_output: "1024.00000",
            weight: 0.4,
            description: "Positive integer exponent",
          },
          {
            input: "2.10000, 3",
            expected_output: "9.26100",
            weight: 0.3,
            description: "Decimal base with positive exponent",
          },
          {
            input: "2.00000, -2",
            expected_output: "0.25000",
            weight: 0.3,
            description: "Negative exponent",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func myPow(x float64, n int) float64 {\n    // Your code here\n    return 0.0\n}",
        solutionCode:
          "func myPow(x float64, n int) float64 {\n    if n == 0 {\n        return 1.0\n    }\n    \n    longN := int64(n)\n    if longN < 0 {\n        x = 1 / x\n        longN = -longN\n    }\n    \n    result := 1.0\n    currentPower := x\n    \n    for longN > 0 {\n        if longN%2 == 1 {\n            result *= currentPower\n        }\n        currentPower *= currentPower\n        longN /= 2\n    }\n    \n    return result\n}",
        testCases: [
          {
            input: "2.00000, 10",
            expected_output: "1024.00000",
            weight: 0.4,
            description: "Positive integer exponent",
          },
          {
            input: "2.10000, 3",
            expected_output: "9.26100",
            weight: 0.3,
            description: "Decimal base with positive exponent",
          },
          {
            input: "2.00000, -2",
            expected_output: "0.25000",
            weight: 0.3,
            description: "Negative exponent",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Float} x\n# @param {Integer} n\n# @return {Float}\ndef my_pow(x, n)\n    # Your code here\nend",
        solutionCode:
          "# @param {Float} x\n# @param {Integer} n\n# @return {Float}\ndef my_pow(x, n)\n    return 1.0 if n == 0\n    \n    if n < 0\n        x = 1.0 / x\n        n = -n\n    end\n    \n    result = 1.0\n    current_power = x\n    \n    while n > 0\n        if n % 2 == 1\n            result *= current_power\n        end\n        current_power *= current_power\n        n /= 2\n    end\n    \n    result\nend",
        testCases: [
          {
            input: "2.00000, 10",
            expected_output: "1024.00000",
            weight: 0.4,
            description: "Positive integer exponent",
          },
          {
            input: "2.10000, 3",
            expected_output: "9.26100",
            weight: 0.3,
            description: "Decimal base with positive exponent",
          },
          {
            input: "2.00000, -2",
            expected_output: "0.25000",
            weight: 0.3,
            description: "Negative exponent",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    double myPow(double x, int n) {\n        // Your code here\n        return 0.0;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    double myPow(double x, int n) {\n        if (n == 0) {\n            return 1.0;\n        }\n        \n        long long longN = n;\n        if (longN < 0) {\n            x = 1 / x;\n            longN = -longN;\n        }\n        \n        double result = 1.0;\n        double currentPower = x;\n        \n        while (longN > 0) {\n            if (longN % 2 == 1) {\n                result *= currentPower;\n            }\n            currentPower *= currentPower;\n            longN /= 2;\n        }\n        \n        return result;\n    }\n};",
        testCases: [
          {
            input: "2.00000, 10",
            expected_output: "1024.00000",
            weight: 0.4,
            description: "Positive integer exponent",
          },
          {
            input: "2.10000, 3",
            expected_output: "9.26100",
            weight: 0.3,
            description: "Decimal base with positive exponent",
          },
          {
            input: "2.00000, -2",
            expected_output: "0.25000",
            weight: 0.3,
            description: "Negative exponent",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(log n)",
      spaceComplexity: "O(1)",
      constraints: [
        "-100.0 < x < 100.0",
        "-2^31 <= n <= 2^31-1",
        "n is an integer",
        "-10^4 <= x^n <= 10^4",
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
      estimatedDuration: 20,
      tags: ["math", "recursion"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple"],
      topic: "Math & Geometry",
    },
  },

  // Math & Geometry - Medium: Spiral Matrix
  {
    id: "spiral-matrix",
    title: "Spiral Matrix",
    text: "Given an m x n matrix, return all elements of the matrix in spiral order.\n\n**Example 1:**\nInput: matrix = [[1,2,3],[4,5,6],[7,8,9]]\nOutput: [1,2,3,6,9,8,7,4,5]\n\n**Example 2:**\nInput: matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]\nOutput: [1,2,3,4,8,12,11,10,9,5,6,7]",
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def spiralOrder(self, matrix):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def spiralOrder(self, matrix):\n        if not matrix or not matrix[0]:\n            return []\n        \n        result = []\n        top, bottom = 0, len(matrix) - 1\n        left, right = 0, len(matrix[0]) - 1\n        \n        while top <= bottom and left <= right:\n            # Traverse right\n            for col in range(left, right + 1):\n                result.append(matrix[top][col])\n            top += 1\n            \n            # Traverse down\n            for row in range(top, bottom + 1):\n                result.append(matrix[row][right])\n            right -= 1\n            \n            # Traverse left (if we still have rows)\n            if top <= bottom:\n                for col in range(right, left - 1, -1):\n                    result.append(matrix[bottom][col])\n                bottom -= 1\n            \n            # Traverse up (if we still have columns)\n            if left <= right:\n                for row in range(bottom, top - 1, -1):\n                    result.append(matrix[row][left])\n                left += 1\n        \n        return result",
        testCases: [
          {
            input: "[[1,2,3],[4,5,6],[7,8,9]]",
            expected_output: "[1,2,3,6,9,8,7,4,5]",
            weight: 0.5,
            description: "3x3 square matrix",
          },
          {
            input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
            expected_output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
            weight: 0.5,
            description: "3x4 rectangular matrix",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {number[][]} matrix\n * @return {number[]}\n */\nvar spiralOrder = function(matrix) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {number[][]} matrix\n * @return {number[]}\n */\nvar spiralOrder = function(matrix) {\n    if (!matrix || matrix.length === 0 || matrix[0].length === 0) {\n        return [];\n    }\n    \n    const result = [];\n    let top = 0, bottom = matrix.length - 1;\n    let left = 0, right = matrix[0].length - 1;\n    \n    while (top <= bottom && left <= right) {\n        // Traverse right\n        for (let col = left; col <= right; col++) {\n            result.push(matrix[top][col]);\n        }\n        top++;\n        \n        // Traverse down\n        for (let row = top; row <= bottom; row++) {\n            result.push(matrix[row][right]);\n        }\n        right--;\n        \n        // Traverse left (if we still have rows)\n        if (top <= bottom) {\n            for (let col = right; col >= left; col--) {\n                result.push(matrix[bottom][col]);\n            }\n            bottom--;\n        }\n        \n        // Traverse up (if we still have columns)\n        if (left <= right) {\n            for (let row = bottom; row >= top; row--) {\n                result.push(matrix[row][left]);\n            }\n            left++;\n        }\n    }\n    \n    return result;\n};",
        testCases: [
          {
            input: "[[1,2,3],[4,5,6],[7,8,9]]",
            expected_output: "[1,2,3,6,9,8,7,4,5]",
            weight: 0.5,
            description: "3x3 square matrix",
          },
          {
            input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
            expected_output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
            weight: 0.5,
            description: "3x4 rectangular matrix",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        // Your code here\n        return new ArrayList<>();\n    }\n}",
        solutionCode:
          "class Solution {\n    public List<Integer> spiralOrder(int[][] matrix) {\n        List<Integer> result = new ArrayList<>();\n        if (matrix == null || matrix.length == 0 || matrix[0].length == 0) {\n            return result;\n        }\n        \n        int top = 0, bottom = matrix.length - 1;\n        int left = 0, right = matrix[0].length - 1;\n        \n        while (top <= bottom && left <= right) {\n            // Traverse right\n            for (int col = left; col <= right; col++) {\n                result.add(matrix[top][col]);\n            }\n            top++;\n            \n            // Traverse down\n            for (int row = top; row <= bottom; row++) {\n                result.add(matrix[row][right]);\n            }\n            right--;\n            \n            // Traverse left (if we still have rows)\n            if (top <= bottom) {\n                for (int col = right; col >= left; col--) {\n                    result.add(matrix[bottom][col]);\n                }\n                bottom--;\n            }\n            \n            // Traverse up (if we still have columns)\n            if (left <= right) {\n                for (int row = bottom; row >= top; row--) {\n                    result.add(matrix[row][left]);\n                }\n                left++;\n            }\n        }\n        \n        return result;\n    }\n}",
        testCases: [
          {
            input: "[[1,2,3],[4,5,6],[7,8,9]]",
            expected_output: "[1,2,3,6,9,8,7,4,5]",
            weight: 0.5,
            description: "3x3 square matrix",
          },
          {
            input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
            expected_output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
            weight: 0.5,
            description: "3x4 rectangular matrix",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func spiralOrder(matrix [][]int) []int {\n    // Your code here\n    return []int{}\n}",
        solutionCode:
          "func spiralOrder(matrix [][]int) []int {\n    if len(matrix) == 0 || len(matrix[0]) == 0 {\n        return []int{}\n    }\n    \n    result := []int{}\n    top, bottom := 0, len(matrix)-1\n    left, right := 0, len(matrix[0])-1\n    \n    for top <= bottom && left <= right {\n        // Traverse right\n        for col := left; col <= right; col++ {\n            result = append(result, matrix[top][col])\n        }\n        top++\n        \n        // Traverse down\n        for row := top; row <= bottom; row++ {\n            result = append(result, matrix[row][right])\n        }\n        right--\n        \n        // Traverse left (if we still have rows)\n        if top <= bottom {\n            for col := right; col >= left; col-- {\n                result = append(result, matrix[bottom][col])\n            }\n            bottom--\n        }\n        \n        // Traverse up (if we still have columns)\n        if left <= right {\n            for row := bottom; row >= top; row-- {\n                result = append(result, matrix[row][left])\n            }\n            left++\n        }\n    }\n    \n    return result\n}",
        testCases: [
          {
            input: "[[1,2,3],[4,5,6],[7,8,9]]",
            expected_output: "[1,2,3,6,9,8,7,4,5]",
            weight: 0.5,
            description: "3x3 square matrix",
          },
          {
            input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
            expected_output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
            weight: 0.5,
            description: "3x4 rectangular matrix",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {Integer[][]} matrix\n# @return {Integer[]}\ndef spiral_order(matrix)\n    # Your code here\nend",
        solutionCode:
          "# @param {Integer[][]} matrix\n# @return {Integer[]}\ndef spiral_order(matrix)\n    return [] if matrix.empty? || matrix[0].empty?\n    \n    result = []\n    top, bottom = 0, matrix.length - 1\n    left, right = 0, matrix[0].length - 1\n    \n    while top <= bottom && left <= right\n        # Traverse right\n        (left..right).each do |col|\n            result << matrix[top][col]\n        end\n        top += 1\n        \n        # Traverse down\n        (top..bottom).each do |row|\n            result << matrix[row][right]\n        end\n        right -= 1\n        \n        # Traverse left (if we still have rows)\n        if top <= bottom\n            right.downto(left) do |col|\n                result << matrix[bottom][col]\n            end\n            bottom -= 1\n        end\n        \n        # Traverse up (if we still have columns)\n        if left <= right\n            bottom.downto(top) do |row|\n                result << matrix[row][left]\n            end\n            left += 1\n        end\n    end\n    \n    result\nend",
        testCases: [
          {
            input: "[[1,2,3],[4,5,6],[7,8,9]]",
            expected_output: "[1,2,3,6,9,8,7,4,5]",
            weight: 0.5,
            description: "3x3 square matrix",
          },
          {
            input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
            expected_output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
            weight: 0.5,
            description: "3x4 rectangular matrix",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        // Your code here\n        return {};\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    vector<int> spiralOrder(vector<vector<int>>& matrix) {\n        if (matrix.empty() || matrix[0].empty()) {\n            return {};\n        }\n        \n        vector<int> result;\n        int top = 0, bottom = matrix.size() - 1;\n        int left = 0, right = matrix[0].size() - 1;\n        \n        while (top <= bottom && left <= right) {\n            // Traverse right\n            for (int col = left; col <= right; col++) {\n                result.push_back(matrix[top][col]);\n            }\n            top++;\n            \n            // Traverse down\n            for (int row = top; row <= bottom; row++) {\n                result.push_back(matrix[row][right]);\n            }\n            right--;\n            \n            // Traverse left (if we still have rows)\n            if (top <= bottom) {\n                for (int col = right; col >= left; col--) {\n                    result.push_back(matrix[bottom][col]);\n                }\n                bottom--;\n            }\n            \n            // Traverse up (if we still have columns)\n            if (left <= right) {\n                for (int row = bottom; row >= top; row--) {\n                    result.push_back(matrix[row][left]);\n                }\n                left++;\n            }\n        }\n        \n        return result;\n    }\n};",
        testCases: [
          {
            input: "[[1,2,3],[4,5,6],[7,8,9]]",
            expected_output: "[1,2,3,6,9,8,7,4,5]",
            weight: 0.5,
            description: "3x3 square matrix",
          },
          {
            input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]",
            expected_output: "[1,2,3,4,8,12,11,10,9,5,6,7]",
            weight: 0.5,
            description: "3x4 rectangular matrix",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(m * n)",
      spaceComplexity: "O(1)",
      constraints: [
        "m == matrix.length",
        "n == matrix[i].length",
        "1 <= m, n <= 10",
        "-100 <= matrix[i][j] <= 100",
      ],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "MEDIUM",
      estimatedDuration: 30,
      tags: ["array", "matrix", "simulation"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn"],
      topic: "Math & Geometry",
    },
  },

  // Math & Geometry - Hard: Robot Bounded In Circle
  {
    id: "robot-bounded-in-circle",
    title: "Robot Bounded In Circle",
    text: 'On an infinite plane, a robot initially stands at (0, 0) and faces north. Note that:\n\n- North is the positive Y direction.\n- East is the positive X direction.\n- South is the negative Y direction.\n- West is the negative X direction.\n\nThe robot can receive one of three instructions:\n\n- "G": go straight 1 unit.\n- "L": turn 90 degrees to the left (i.e., counter-clockwise).\n- "R": turn 90 degrees to the right (i.e., clockwise).\n\nThe robot performs the instructions given in order, and repeats them forever.\n\nReturn true if and only if there exists a circle such that the robot never leaves the circle.\n\n**Example 1:**\nInput: instructions = "GGLLGG"\nOutput: true\nExplanation: The robot is initially at (0, 0) facing the north direction.\n"G": move one step to (0, 1).\n"G": move one step to (0, 2).\n"L": turn 90 degrees to the left (west).\n"L": turn 90 degrees to the left (south).\n"G": move one step to (-1, 2).\n"G": move one step to (-2, 2).\nRepeating the instructions, the robot goes into the cycle: (0, 0) → (0, 1) → (0, 2) → (-1, 2) → (-2, 2) → (-2, 1) → (-2, 0) → (-1, 0) → (0, 0).\nBased on that, we return true.\n\n**Example 2:**\nInput: instructions = "GG"\nOutput: false\nExplanation: The robot is initially at (0, 0) facing the north direction.\n"G": move one step to (0, 1).\n"G": move one step to (0, 2).\nRepeating the instructions, the robot keeps moving in the north direction and does not go into a cycle.\nBased on that, we return false.\n\n**Example 3:**\nInput: instructions = "GL"\nOutput: true\nExplanation: The robot is initially at (0, 0) facing the north direction.\n"G": move one step to (0, 1).\n"L": turn 90 degrees to the left (west).\nRepeating the instructions, the robot goes into the cycle: (0, 0) → (0, 1) → (-1, 1) → (-1, 0) → (0, 0).\nBased on that, we return true.',
    implementations: [
      {
        language: "python",
        starterCode:
          "class Solution:\n    def isRobotBounded(self, instructions):\n        # Your code here\n        pass",
        solutionCode:
          "class Solution:\n    def isRobotBounded(self, instructions):\n        # Starting position and direction\n        x, y = 0, 0\n        # Directions: North, East, South, West\n        directions = [(0, 1), (1, 0), (0, -1), (-1, 0)]\n        direction_idx = 0  # Start facing North\n        \n        for instruction in instructions:\n            if instruction == 'G':\n                dx, dy = directions[direction_idx]\n                x += dx\n                y += dy\n            elif instruction == 'L':\n                direction_idx = (direction_idx - 1) % 4\n            elif instruction == 'R':\n                direction_idx = (direction_idx + 1) % 4\n        \n        # Robot is bounded if:\n        # 1. It returns to origin, OR\n        # 2. It doesn't face north (will eventually return due to cycles)\n        return (x == 0 and y == 0) or direction_idx != 0",
        testCases: [
          {
            input: '"GGLLGG"',
            expected_output: "True",
            weight: 0.4,
            description: "Complex path that forms a cycle",
          },
          {
            input: '"GG"',
            expected_output: "False",
            weight: 0.3,
            description: "Straight line, unbounded",
          },
          {
            input: '"GL"',
            expected_output: "True",
            weight: 0.3,
            description: "Simple cycle with turn",
          },
        ],
      },
      {
        language: "javascript",
        starterCode:
          "/**\n * @param {string} instructions\n * @return {boolean}\n */\nvar isRobotBounded = function(instructions) {\n    // Your code here\n};",
        solutionCode:
          "/**\n * @param {string} instructions\n * @return {boolean}\n */\nvar isRobotBounded = function(instructions) {\n    // Starting position and direction\n    let x = 0, y = 0;\n    // Directions: North, East, South, West\n    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];\n    let directionIdx = 0;  // Start facing North\n    \n    for (const instruction of instructions) {\n        if (instruction === 'G') {\n            const [dx, dy] = directions[directionIdx];\n            x += dx;\n            y += dy;\n        } else if (instruction === 'L') {\n            directionIdx = (directionIdx - 1 + 4) % 4;\n        } else if (instruction === 'R') {\n            directionIdx = (directionIdx + 1) % 4;\n        }\n    }\n    \n    // Robot is bounded if:\n    // 1. It returns to origin, OR\n    // 2. It doesn't face north (will eventually return due to cycles)\n    return (x === 0 && y === 0) || directionIdx !== 0;\n};",
        testCases: [
          {
            input: '"GGLLGG"',
            expected_output: "true",
            weight: 0.4,
            description: "Complex path that forms a cycle",
          },
          {
            input: '"GG"',
            expected_output: "false",
            weight: 0.3,
            description: "Straight line, unbounded",
          },
          {
            input: '"GL"',
            expected_output: "true",
            weight: 0.3,
            description: "Simple cycle with turn",
          },
        ],
      },
      {
        language: "java",
        starterCode:
          "class Solution {\n    public boolean isRobotBounded(String instructions) {\n        // Your code here\n        return false;\n    }\n}",
        solutionCode:
          "class Solution {\n    public boolean isRobotBounded(String instructions) {\n        // Starting position and direction\n        int x = 0, y = 0;\n        // Directions: North, East, South, West\n        int[][] directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};\n        int directionIdx = 0;  // Start facing North\n        \n        for (char instruction : instructions.toCharArray()) {\n            if (instruction == 'G') {\n                x += directions[directionIdx][0];\n                y += directions[directionIdx][1];\n            } else if (instruction == 'L') {\n                directionIdx = (directionIdx - 1 + 4) % 4;\n            } else if (instruction == 'R') {\n                directionIdx = (directionIdx + 1) % 4;\n            }\n        }\n        \n        // Robot is bounded if:\n        // 1. It returns to origin, OR\n        // 2. It doesn't face north (will eventually return due to cycles)\n        return (x == 0 && y == 0) || directionIdx != 0;\n    }\n}",
        testCases: [
          {
            input: '"GGLLGG"',
            expected_output: "true",
            weight: 0.4,
            description: "Complex path that forms a cycle",
          },
          {
            input: '"GG"',
            expected_output: "false",
            weight: 0.3,
            description: "Straight line, unbounded",
          },
          {
            input: '"GL"',
            expected_output: "true",
            weight: 0.3,
            description: "Simple cycle with turn",
          },
        ],
      },
      {
        language: "go",
        starterCode:
          "func isRobotBounded(instructions string) bool {\n    // Your code here\n    return false\n}",
        solutionCode:
          "func isRobotBounded(instructions string) bool {\n    // Starting position and direction\n    x, y := 0, 0\n    // Directions: North, East, South, West\n    directions := [][]int{{0, 1}, {1, 0}, {0, -1}, {-1, 0}}\n    directionIdx := 0  // Start facing North\n    \n    for _, instruction := range instructions {\n        if instruction == 'G' {\n            x += directions[directionIdx][0]\n            y += directions[directionIdx][1]\n        } else if instruction == 'L' {\n            directionIdx = (directionIdx - 1 + 4) % 4\n        } else if instruction == 'R' {\n            directionIdx = (directionIdx + 1) % 4\n        }\n    }\n    \n    // Robot is bounded if:\n    // 1. It returns to origin, OR\n    // 2. It doesn't face north (will eventually return due to cycles)\n    return (x == 0 && y == 0) || directionIdx != 0\n}",
        testCases: [
          {
            input: '"GGLLGG"',
            expected_output: "true",
            weight: 0.4,
            description: "Complex path that forms a cycle",
          },
          {
            input: '"GG"',
            expected_output: "false",
            weight: 0.3,
            description: "Straight line, unbounded",
          },
          {
            input: '"GL"',
            expected_output: "true",
            weight: 0.3,
            description: "Simple cycle with turn",
          },
        ],
      },
      {
        language: "ruby",
        starterCode:
          "# @param {String} instructions\n# @return {Boolean}\ndef is_robot_bounded(instructions)\n    # Your code here\nend",
        solutionCode:
          "# @param {String} instructions\n# @return {Boolean}\ndef is_robot_bounded(instructions)\n    # Starting position and direction\n    x, y = 0, 0\n    # Directions: North, East, South, West\n    directions = [[0, 1], [1, 0], [0, -1], [-1, 0]]\n    direction_idx = 0  # Start facing North\n    \n    instructions.each_char do |instruction|\n        if instruction == 'G'\n            dx, dy = directions[direction_idx]\n            x += dx\n            y += dy\n        elsif instruction == 'L'\n            direction_idx = (direction_idx - 1) % 4\n        elsif instruction == 'R'\n            direction_idx = (direction_idx + 1) % 4\n        end\n    end\n    \n    # Robot is bounded if:\n    # 1. It returns to origin, OR\n    # 2. It doesn't face north (will eventually return due to cycles)\n    (x == 0 && y == 0) || direction_idx != 0\nend",
        testCases: [
          {
            input: '"GGLLGG"',
            expected_output: "true",
            weight: 0.4,
            description: "Complex path that forms a cycle",
          },
          {
            input: '"GG"',
            expected_output: "false",
            weight: 0.3,
            description: "Straight line, unbounded",
          },
          {
            input: '"GL"',
            expected_output: "true",
            weight: 0.3,
            description: "Simple cycle with turn",
          },
        ],
      },
      {
        language: "cpp",
        starterCode:
          "class Solution {\npublic:\n    bool isRobotBounded(string instructions) {\n        // Your code here\n        return false;\n    }\n};",
        solutionCode:
          "class Solution {\npublic:\n    bool isRobotBounded(string instructions) {\n        // Starting position and direction\n        int x = 0, y = 0;\n        // Directions: North, East, South, West\n        vector<vector<int>> directions = {{0, 1}, {1, 0}, {0, -1}, {-1, 0}};\n        int directionIdx = 0;  // Start facing North\n        \n        for (char instruction : instructions) {\n            if (instruction == 'G') {\n                x += directions[directionIdx][0];\n                y += directions[directionIdx][1];\n            } else if (instruction == 'L') {\n                directionIdx = (directionIdx - 1 + 4) % 4;\n            } else if (instruction == 'R') {\n                directionIdx = (directionIdx + 1) % 4;\n            }\n        }\n        \n        // Robot is bounded if:\n        // 1. It returns to origin, OR\n        // 2. It doesn't face north (will eventually return due to cycles)\n        return (x == 0 && y == 0) || directionIdx != 0;\n    }\n};",
        testCases: [
          {
            input: '"GGLLGG"',
            expected_output: "true",
            weight: 0.4,
            description: "Complex path that forms a cycle",
          },
          {
            input: '"GG"',
            expected_output: "false",
            weight: 0.3,
            description: "Straight line, unbounded",
          },
          {
            input: '"GL"',
            expected_output: "true",
            weight: 0.3,
            description: "Simple cycle with turn",
          },
        ],
      },
    ],
    evaluationCriteria: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
      constraints: ["1 <= instructions.length <= 100", "instructions[i] is 'G', 'L' or, 'R'"],
    },
    gradingRules: {
      testCaseWeight: 0.6,
      codeQualityWeight: 0.2,
      efficiencyWeight: 0.2,
      partialCredit: true,
    },
    metadata: {
      difficulty: "HARD",
      estimatedDuration: 35,
      tags: ["math", "string", "simulation"],
      companies: ["Google", "Amazon", "Microsoft", "Facebook", "Apple", "LinkedIn", "Uber"],
      topic: "Math & Geometry",
    },
  },
];

// Helper functions
export const getQuestionsByTopic = (topic: string): PredefinedQuestion[] => {
  return PREDEFINED_QUESTIONS.filter((q) => q.metadata.topic === topic);
};

export const getQuestionsByCompany = (company: string): PredefinedQuestion[] => {
  return PREDEFINED_QUESTIONS.filter((q) => q.metadata.companies.includes(company));
};

export const getQuestionsByDifficulty = (difficulty: string): PredefinedQuestion[] => {
  return PREDEFINED_QUESTIONS.filter((q) => q.metadata.difficulty === difficulty.toUpperCase());
};

export const searchQuestions = (query: string): PredefinedQuestion[] => {
  const lowercaseQuery = query.toLowerCase();
  return PREDEFINED_QUESTIONS.filter(
    (q) =>
      q.title.toLowerCase().includes(lowercaseQuery) ||
      q.metadata.tags.some((tag) => tag.toLowerCase().includes(lowercaseQuery)) ||
      q.metadata.companies.some((company) => company.toLowerCase().includes(lowercaseQuery)) ||
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
