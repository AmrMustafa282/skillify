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
}

// Specific form element interfaces
export interface TextFormElement extends BaseFormElement {
  type: ElementType.SHORT_TEXT | ElementType.LONG_TEXT;
  options: never[];
}

export interface ChoiceFormElement extends BaseFormElement {
  type: ElementType.MULTIPLE_CHOICE | ElementType.CHECKBOX | ElementType.DROPDOWN;
  options: string[];
}

export interface DateFormElement extends BaseFormElement {
  type: ElementType.DATE;
  options: never[];
}

export interface TimeFormElement extends BaseFormElement {
  type: ElementType.TIME;
  options: never[];
}

export interface FileFormElement extends BaseFormElement {
  type: ElementType.FILE_UPLOAD;
  options: never[];
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
