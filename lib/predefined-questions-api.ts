/**
 * API service for predefined questions from MongoDB
 */

import { PY_URL } from "@/config";

// API Response Types
export interface PredefinedQuestion {
  id: string;
  title: string;
  text: string;
  implementations: QuestionImplementation[];
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
  createdAt: string;
  updatedAt: string;
}

export interface QuestionImplementation {
  language: "python" | "javascript" | "java" | "go" | "ruby" | "cpp";
  starterCode: string;
  solutionCode: string;
  testCases: TestCase[];
}

export interface TestCase {
  input: string;
  expected_output: string;
  weight: number;
  description: string;
}

export interface PredefinedQuestionsResponse {
  success: boolean;
  questions: PredefinedQuestion[];
  total: number;
  offset: number;
  limit?: number;
  has_more: boolean;
}

export interface PredefinedQuestionResponse {
  success: boolean;
  question: PredefinedQuestion;
}

export interface TopicsResponse {
  success: boolean;
  topics: string[];
}

export interface LanguagesResponse {
  success: boolean;
  languages: string[];
}

export interface CompaniesResponse {
  success: boolean;
  companies: string[];
}

export interface DifficultiesResponse {
  success: boolean;
  difficulties: string[];
}

// API Service Class
export class PredefinedQuestionsAPI {
  private baseUrl: string;

  constructor(baseUrl: string = PY_URL) {
    this.baseUrl = baseUrl;
  }

  /**
   * Get all predefined questions with optional filtering and pagination
   */
  async getQuestions(params?: {
    topic?: string;
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    language?: string;
    limit?: number;
    offset?: number;
  }): Promise<PredefinedQuestionsResponse> {
    const searchParams = new URLSearchParams();

    if (params?.topic) searchParams.append("topic", params.topic);
    if (params?.difficulty) searchParams.append("difficulty", params.difficulty);
    if (params?.language) searchParams.append("language", params.language);
    if (params?.limit) searchParams.append("limit", params.limit.toString());
    if (params?.offset) searchParams.append("offset", params.offset.toString());

    const url = `${this.baseUrl}/predefined-questions?${searchParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch questions: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get a specific predefined question by ID
   */
  async getQuestion(questionId: string, language?: string): Promise<PredefinedQuestionResponse> {
    const searchParams = new URLSearchParams();
    if (language) searchParams.append("language", language);

    const url = `${this.baseUrl}/predefined-questions/${questionId}?${searchParams.toString()}`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch question: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all available topics
   */
  async getTopics(): Promise<TopicsResponse> {
    const response = await fetch(`${this.baseUrl}/predefined-questions/topics`);

    if (!response.ok) {
      throw new Error(`Failed to fetch topics: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all available programming languages
   */
  async getLanguages(): Promise<LanguagesResponse> {
    const response = await fetch(`${this.baseUrl}/predefined-questions/languages`);

    if (!response.ok) {
      throw new Error(`Failed to fetch languages: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all available companies
   */
  async getCompanies(): Promise<CompaniesResponse> {
    const response = await fetch(`${this.baseUrl}/predefined-questions/companies`);

    if (!response.ok) {
      throw new Error(`Failed to fetch companies: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get all available difficulty levels
   */
  async getDifficulties(): Promise<DifficultiesResponse> {
    const response = await fetch(`${this.baseUrl}/predefined-questions/difficulties`);

    if (!response.ok) {
      throw new Error(`Failed to fetch difficulties: ${response.statusText}`);
    }

    return response.json();
  }
}

// Utility functions for compatibility with existing code
export const searchQuestions = (
  questions: PredefinedQuestion[],
  query: string,
  filters: {
    topic?: string;
    difficulty?: string;
    company?: string;
  } = {}
): PredefinedQuestion[] => {
  return questions.filter((question) => {
    // Search in title and text
    const matchesQuery =
      query === "" ||
      question.title.toLowerCase().includes(query.toLowerCase()) ||
      question.text.toLowerCase().includes(query.toLowerCase());

    // Filter by topic
    const matchesTopic =
      !filters.topic || filters.topic === "all" || question.metadata.topic === filters.topic;

    // Filter by difficulty
    const matchesDifficulty =
      !filters.difficulty ||
      filters.difficulty === "all" ||
      question.metadata.difficulty === filters.difficulty;

    // Filter by company
    const matchesCompany =
      !filters.company ||
      filters.company === "all" ||
      question.metadata.companies.includes(filters.company);

    return matchesQuery && matchesTopic && matchesDifficulty && matchesCompany;
  });
};

export const getImplementationForLanguage = (
  question: PredefinedQuestion,
  language: string
): QuestionImplementation | undefined => {
  return question.implementations.find((impl) => impl.language === language);
};

export const getTestCasesForLanguage = (
  question: PredefinedQuestion,
  language: string
): TestCase[] => {
  const implementation = getImplementationForLanguage(question, language);
  return implementation?.testCases || [];
};

export const getStarterCodeForLanguage = (
  question: PredefinedQuestion,
  language: string
): string => {
  const implementation = getImplementationForLanguage(question, language);
  return implementation?.starterCode || "";
};

export const getSolutionCodeForLanguage = (
  question: PredefinedQuestion,
  language: string
): string => {
  const implementation = getImplementationForLanguage(question, language);
  return implementation?.solutionCode || "";
};

// Create a singleton instance
export const predefinedQuestionsAPI = new PredefinedQuestionsAPI();

// Export supported languages and topics (these will be fetched from API)
export const SUPPORTED_LANGUAGES = ["python", "javascript", "java", "go", "ruby", "cpp"];

// Default topics (will be replaced by API data)
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
  "Greedy Algorithms",
  "Bit Manipulation",
  "Math & Geometry",
  "Intervals",
];

// Hook for React components
export const usePredefinedQuestions = () => {
  const api = new PredefinedQuestionsAPI();

  const loadQuestionsForSelector = async (params?: {
    topic?: string;
    difficulty?: "EASY" | "MEDIUM" | "HARD";
    language?: string;
    limit?: number;
  }) => {
    try {
      const response = await api.getQuestions(params);
      return response.questions.map((q) => ({
        value: q.id,
        label: `${q.title} (${q.metadata.difficulty})`,
        topic: q.metadata.topic,
        difficulty: q.metadata.difficulty,
        question: q,
      }));
    } catch (error) {
      console.error("Failed to load questions:", error);
      return [];
    }
  };

  const loadQuestionsByTopic = async (topic: string) => {
    try {
      const response = await api.getQuestions({ topic });
      return response.questions;
    } catch (error) {
      console.error(`Failed to load questions for topic ${topic}:`, error);
      return [];
    }
  };

  const loadQuestionForEditing = async (questionId: string, language?: string) => {
    try {
      const response = await api.getQuestion(questionId, language);
      return response.question;
    } catch (error) {
      console.error(`Failed to load question ${questionId}:`, error);
      return null;
    }
  };

  const loadFilterOptions = async () => {
    try {
      const [topicsResponse, languagesResponse, companiesResponse, difficultiesResponse] =
        await Promise.all([
          api.getTopics(),
          api.getLanguages(),
          api.getCompanies(),
          api.getDifficulties(),
        ]);

      return {
        topics: topicsResponse.topics,
        languages: languagesResponse.languages,
        companies: companiesResponse.companies,
        difficulties: difficultiesResponse.difficulties,
      };
    } catch (error) {
      console.error("Failed to load filter options:", error);
      return {
        topics: QUESTION_TOPICS,
        languages: SUPPORTED_LANGUAGES,
        companies: [],
        difficulties: ["EASY", "MEDIUM", "HARD"],
      };
    }
  };

  return {
    loadQuestionsForSelector,
    loadQuestionsByTopic,
    loadQuestionForEditing,
    loadFilterOptions,
    api,
  };
};
