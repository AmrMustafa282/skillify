export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  profilePicture?: string;
}

export interface UserStoreState {
  user: User | null;
  expiresAt: number | null;
  setUser: (user: User | null) => void;
  setExpiration: (expiresAt: number | null) => void;
  clearUser: () => void;
}

export enum Role {
  ROLE_USER= "ROLE_USER",
  ROLE_ADMIN = "ROLE_ADMIN",
  ROLE_RECRUITER = "ROLE_RECRUITER",
  ROLE_CANDIDATE = "ROLE_CANDIDATE",
}

type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const payments: Payment[] = [
  {
    id: "728ed52f",
    amount: 100,
    status: "pending",
    email: "m@example.com",
  },
  {
    id: "489e1d42",
    amount: 125,
    status: "processing",
    email: "example@gmail.com",
  },
  // ...
];

export type QuestionType =
  | "short-answer"
  | "paragraph"
  | "multiple-choice"
  | "checkboxes"
  | "dropdown"
  | "linearScale"
  | "dateTime";

export interface Question {
  id: string;
  type: QuestionType;
  title: string;
  required: boolean;
  options?: string[];
  min?: number;
  max?: number;
  description?: string;
}

export interface SortableQuestionProps {
  question: Question;
  index: number;
  updateQuestion: (id: string, updates: Partial<Question>) => void;
  deleteQuestion: (id: string) => void;
  copyQuestion: (id: string) => void;
  addOption: (questionId: string) => void;
  updateOption: (questionId: string, optionIndex: number, value: string) => void;
}

export type Form = {
  id: string;
  title: string;
  description: string;
  questions: Question[];
};
