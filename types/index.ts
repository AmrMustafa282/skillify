// ===== INVITATION FORM TYPES =====
export enum InvitationElementType {
  SHORT_TEXT = "short_text",
  LONG_TEXT = "long_text",
  MULTIPLE_CHOICE = "multiple_choice",
  CHECKBOX = "checkbox",
  DROPDOWN = "dropdown",
  DATE = "date",
  TIME = "time",
  FILE_UPLOAD = "file_upload",
  EMAIL = "email",
  PHONE = "phone",
  NUMBER = "number",
  URL = "url",
  RATING = "rating",
  LINEAR_SCALE = "linear_scale",
}

// Base invitation form element interface
export interface BaseInvitationElement {
  id: string;
  type: InvitationElementType;
  question: string;
  required: boolean;
  description?: string;
  placeholder?: string;
  order?: number;
  deleted?: boolean;
}

// Text-based invitation elements
export interface InvitationTextElement extends BaseInvitationElement {
  type:
    | InvitationElementType.SHORT_TEXT
    | InvitationElementType.LONG_TEXT
    | InvitationElementType.EMAIL
    | InvitationElementType.PHONE
    | InvitationElementType.URL;
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

// Choice-based invitation elements
export interface InvitationChoiceElement extends BaseInvitationElement {
  type:
    | InvitationElementType.MULTIPLE_CHOICE
    | InvitationElementType.CHECKBOX
    | InvitationElementType.DROPDOWN;
  options: InvitationQuestionOption[];
  allowOther?: boolean;
  multipleSelection?: boolean;
}

// Number-based invitation elements
export interface InvitationNumberElement extends BaseInvitationElement {
  type:
    | InvitationElementType.NUMBER
    | InvitationElementType.RATING
    | InvitationElementType.LINEAR_SCALE;
  validation?: {
    min?: number;
    max?: number;
    step?: number;
  };
  scale?: {
    min: number;
    max: number;
    minLabel?: string;
    maxLabel?: string;
  };
}

// Date/Time invitation elements
export interface InvitationDateTimeElement extends BaseInvitationElement {
  type: InvitationElementType.DATE | InvitationElementType.TIME;
  validation?: {
    minDate?: string;
    maxDate?: string;
  };
}

// File upload invitation elements
export interface InvitationFileElement extends BaseInvitationElement {
  type: InvitationElementType.FILE_UPLOAD;
  fileSettings?: {
    allowedTypes?: string[];
    maxSize?: number; // in MB
    maxFiles?: number;
  };
}

export interface InvitationQuestionOption {
  id: string;
  text: string;
  order?: number;
}

// Union type for all invitation form elements
export type InvitationFormElement =
  | InvitationTextElement
  | InvitationChoiceElement
  | InvitationNumberElement
  | InvitationDateTimeElement
  | InvitationFileElement;

// ===== ASSESSMENT FORM TYPES (existing) =====
export type AssessmentQuestionType = "MCQ" | "OPEN_ENDED" | "CODING";

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

export interface AssessmentQuestionOption {
  id: string;
  text: string;
  isCorrect: boolean;
  order?: number;
}

// ===== LEGACY SUPPORT (for backward compatibility) =====
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

// Legacy form element (alias to invitation form element for backward compatibility)
export type FormElement = InvitationFormElement;

// ===== INVITATION FORM DATA INTERFACES =====
export interface InvitationFormData {
  title: string;
  description: string;
  elements: InvitationFormElement[];
}

// Enhanced invitation/form interfaces for API integration
export interface InvitationForm {
  id: string;
  title: string;
  description: string;
  jobId: string;
  organizationId: string;
  elements: InvitationFormElement[];
  settings: InvitationFormSettings;
  status: "draft" | "published" | "closed";
  createdBy: string;
  updatedBy: string;
  createdAt: string;
  updatedAt: string;
  responseCount: number;
  isActive: boolean;
}

// Invitation form settings
export interface InvitationFormSettings {
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
  allowAnonymous?: boolean;
  requireLogin?: boolean;
  notifyOnSubmission?: boolean;
}

// ===== ASSESSMENT FORM DATA INTERFACES =====
export interface AssessmentFormData {
  title: string;
  description: string;
  elements: AssessmentQuestion[];
}

// ===== LEGACY SUPPORT =====
// Form data interface (legacy - maps to invitation forms)
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

// ===== FORM SUBMISSION INTERFACES =====
// Invitation form submission data
export interface InvitationFormSubmission {
  id: string;
  formId: string;
  candidateEmail: string;
  candidateName?: string;
  responses: InvitationFieldResponse[];
  submittedAt: string;
  status: "submitted" | "reviewed" | "shortlisted" | "rejected";
  score?: number;
  metadata?: {
    userAgent?: string;
    ipAddress?: string;
    submissionTime?: number; // time taken to complete in seconds
  };
}

export interface InvitationFieldResponse {
  elementId: string;
  elementType: InvitationElementType;
  question: string;
  answer: string | string[] | File | number;
  required: boolean;
  metadata?: {
    timeSpent?: number; // time spent on this question in seconds
  };
}

// Assessment form submission data
export interface AssessmentSubmission {
  id: string;
  assessmentId: string;
  candidateId: string;
  candidateEmail: string;
  responses: AssessmentFieldResponse[];
  codingResponses?: CodingResponse[];
  submittedAt: string;
  status: "in_progress" | "submitted" | "graded" | "expired";
  score?: number;
  timeSpent?: number;
  startedAt?: string;
}

export interface AssessmentFieldResponse {
  questionId: string;
  questionType: AssessmentQuestionType;
  question: string;
  answer: string | string[];
  isCorrect?: boolean;
  score?: number;
}

export interface CodingResponse {
  questionId: string;
  language: string;
  code: string;
  testResults?: TestResult[];
  score?: number;
  submittedAt: string;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  expectedOutput: string;
  actualOutput: string;
  executionTime?: number;
  memoryUsage?: number;
  error?: string;
}

// ===== API RESPONSE TYPES =====
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

// ===== LEGACY SUPPORT =====
// Form submission data (legacy - maps to invitation form submission)
export interface FormSubmission {
  id: string;
  formId: string;
  candidateEmail: string;
  candidateName?: string;
  responses: FormFieldResponse[];
  submittedAt: string;
  status: "submitted" | "reviewed" | "shortlisted" | "rejected";
  score?: number;
}

export interface FormFieldResponse {
  elementId: string;
  elementType: ElementType;
  question: string;
  answer: string | string[] | File;
  required: boolean;
}
