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
  ROLE_USER = "ROLE_USER",
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

export type FieldValue = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

export enum View {
  PERSONAL = "personal",
  ORGANIZATION = "organization",
}

export enum ORG_ROLES {
  ROLE_ORG_ADMIN = "Admin",
  ROLE_ORG_HR = "HR",
  ROLE_ORG_INTERVIEWER = "Interviewer",
}

export type ORG_ROLE = "ROLE_ORG_ADMIN" | "ROLE_ORG_HR" | "ROLE_ORG_INTERVIEWER";

export type Member = {
  userId: string;
  email: string;
  roles: ORG_ROLE[];
};

export interface Org {
  id: string;
  name: string;
  createdBy: string;
  members: {
    userId: string;
    email: string;
    roles: ["ROLE_ORG_ADMIN" | "ROLE_ORG_HR" | "ROLE_ORG_INTERVIEWER"];
  }[];
}

export interface Job {
  id: string;
  title: string;
  description: string;
  organizationId: string;
  createdBy: string;
  updatedBy: string;
  updatedAt: string;
  createdAt: string;
  active: boolean;
}

export enum ElementType {
  SHORT_TEXT = "short_text",
  LONG_TEXT = "long_text",
  MULTIPLE_CHOICE = "multiple_choice",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
  DATE = "date",
  TIME = "time",
  FILE_UPLOAD = "file_upload",
}

// Base form element interface
export interface BaseFormElement {
  id: string;
  type: ElementType;
  question: string;
  required: boolean;
  order?: number;
  deleted?: boolean;
  options?: {
    choices: InvitationQuestionOption[];
  };
}

export interface InvitationQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  order?: number;
}

// Specific form element interfaces
export interface TextFormElement extends BaseFormElement {
  type: ElementType.SHORT_TEXT | ElementType.LONG_TEXT;
  // options: never[];
}

export interface ChoiceFormElement extends BaseFormElement {
  type: ElementType.MULTIPLE_CHOICE | ElementType.CHECKBOX | ElementType.DROPDOWN;
  // options: string[];
}

export interface DateFormElement extends BaseFormElement {
  type: ElementType.DATE;
  // options: never[];
}

export interface TimeFormElement extends BaseFormElement {
  type: ElementType.TIME;
  // options: never[];
}

export interface FileFormElement extends BaseFormElement {
  type: ElementType.FILE_UPLOAD;
  // options: never[];
}

// Union type for all form elements
export type FormElement =
  | TextFormElement
  | ChoiceFormElement
  | DateFormElement
  | TimeFormElement
  | FileFormElement;

// Form data interface
export interface FormData {
  title: string;
  description: string;
  elements: FormElement[];
}

// Form settings interface
export interface FormSettings {
  collectEmail: boolean;
  limitResponses: boolean;
  responseLimit: number;
  showProgressBar: boolean;
  shuffleQuestions: boolean;
  confirmationMessage: string;
  redirectUrl: string;
  theme: string;
  headerColor: string;
  fontFamily: string;
}

// Form response data
export interface FormResponse {
  id: string;
  submittedAt: string;
  data: Record<string, any>;
}

// Component prop interfaces
export interface FormElementEditorProps {
  element: FormElement;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
}

export interface FormPreviewProps {
  title: string;
  description: string;
  elements: FormElement[];
}

export interface ColorPickerProps {
  color: string;
  onChange: (color: string) => void;
}

export interface AssessmentProps {
  id: string;
  name: string;
  description: string;
  timeLimit: number;
  orgId: string;
  jobId: string;
  jobTitle: string;
  startTime: string;
  endTime: string;
  status: string;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface Assessment {
  id: string;
  name: string;
  description: string;
  timeLimit: number;
  jobId: string;
  orgId: string;
  jobTitle: string;
  startTime: string;
  endTime: string;
  status: AssessmentStatus;
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
}

export type AssessmentStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type AssessmentQuestionType = "MCQ" | "OPEN_ENDED";

export interface AssessmentQuestion {
  id: string;
  type: AssessmentQuestionType;
  text: string;
  options?: {
    choices: AssessmentQuestionOption[];
  };
  correctAnswer?: {
    value: string;
  };
  difficulty: "EASY" | "MEDIUM" | "HARD";
  order: number;
  required: boolean;
  deleted?: boolean;
}
export interface TestAssignment {
  id: string;
  testId: string;
  testTitle: string;
  candidateEmail: string;
  status: "PENDING" | "IN_PROGRESS" | "COMPLETED";
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

export interface AssessmentQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  order?: number;
}

export interface AssessmentQuestionEditorProps {
  element: AssessmentQuestion;
  updateElement: (id: string, updates: Partial<AssessmentQuestion>) => void;
}

export interface AssessmentFormData {
  title: string;
  description: string;
  elements: AssessmentQuestion[];
}

export interface AssessmentPreviewProps {
  title: string;
  description: string;
  elements: AssessmentQuestion[];
}

export interface SubscriptionStatus {
  status: string;
  success: boolean;
  data: {
    planName: string;
    displayName: string;
    status: string;
    startedAt: string;
    endedAt: string | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    trialEnd: string | null;
    currentOrganizations: number;
    maxOrganizations: number;
    maxTests: number;
    hasReachedLimit: boolean;
    canCreateOrganization: boolean;
    usagePercentage: number;
    daysRemaining: number | null;
    trial: boolean;
    activeAndValid: boolean;
  };
  timestamp: string;
}

export interface Plan {
  id: string;
  name: string;
  displayName: string;
  maxOrganizations: number;
  maxTests: number;
  active: boolean;
}

export interface SubscriptionHistory {
  status: string;
  success: boolean;
  data: Array<{
    id: string;
    plan: Plan;
    status: string;
    startedAt: string;
    endedAt: string | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    trialEnd: string | null;
    createdAt: string;
    updatedAt: string;
  }>;
  timestamp: string;
}

export interface SubscriptionPlans {
  status: string;
  success: boolean;
  data: Array<{
    plan: Plan;
    canStartTrial: boolean;
    hasUsedTrial: boolean;
    restrictionReason: string | null;
    currentPlan: boolean;
  }>;
  timestamp: string;
}

export interface SubscriptionPlan {
  plan: Plan;
  canStartTrial: boolean;
  hasUsedTrial: boolean;
  restrictionReason: string | null;
  currentPlan: boolean;
}
