# Assessment System Documentation

## Overview

The SkIllIfy.io assessment system provides a comprehensive platform for conducting assessments that include both regular questions (MCQ and open-ended) and coding challenges. The system features a professional coding environment, real-time timer, progress tracking, and seamless navigation between different question types.

## Features

### Assessment Types

- **Multiple Choice Questions (MCQ)**: Standard multiple-choice questions with radio button selection
- **Open-Ended Questions**: Text area for detailed written responses
- **Coding Challenges**: Professional coding environment with syntax highlighting, test execution, and result validation

### Key Functionality

- **Timer Management**: Real-time countdown with automatic submission when time expires
- **Progress Tracking**: Visual progress indicators and question navigation
- **State Persistence**: Assessment state is saved when navigating to coding challenges
- **Professional Coding Environment**: Three-panel layout with problem description, code editor, and live test results
- **Test Execution**: Run code against test cases with immediate feedback
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## File Structure

```
app/(protected)/assessments/
├── [assessment_id]/
│   ├── page.tsx                    # Main assessment page
│   └── coding/
│       └── [question_id]/
│           └── page.tsx            # Coding dashboard
```

## API Integration

The system is now fully integrated with your exact backend APIs on `localhost:5000`:

### Assessment APIs

- `POST http://localhost:5000/api/assessments/{test_id}/start` - Start an assessment session
- `POST http://localhost:5000/api/assessments/{test_id}/test-code` - Test code execution (multiple times during coding)
- `POST http://localhost:5000/api/assessments/{test_id}/submit/coding` - Submit coding answer
- `POST http://localhost:5000/api/assessments/{test_id}/submit/complete` - Complete and submit entire assessment

### API Request/Response Format

#### Start Assessment

**Request:**

```json
{
  "test_id": "python-basics",
  "candidate_id": "candidate-current"
}
```

#### Test Code

**Request:**

```json
{
  "code": "def reverse_string(s):\n    return s[::-1]",
  "language": "python",
  "testCases": [{ "input": "hello", "expectedOutput": "olleh" }]
}
```

**Expected Response:**

```json
{
  "output": "Code executed successfully!",
  "testResults": [
    {
      "output": "olleh",
      "passed": true
    }
  ]
}
```

#### Submit Coding Answer

**Request:**

```json
{
  "question_id": "52",
  "code": "def reverse_string(s):\n    return s[::-1]",
  "language": "python",
  "execution_time": 0.18504230762255164,
  "memory_usage": 1011
}
```

#### Complete Assessment

**Request:** (Full assessment data as shown in your example)

### Data Format

The assessment submission follows this structure:

```json
{
  "solution_id": "python-basics-sol-1",
  "test_id": "python-basics",
  "candidate_id": "candidate-41e73cb6",
  "answers": [
    {
      "question_id": "1",
      "answer_type": "MCQ",
      "value": "q1_a",
      "submitted_at": "2025-04-26T06:27:24.629068"
    }
  ],
  "coding_answers": [
    {
      "question_id": "52",
      "code": "def reverse_string(s):\n    return s[::-1]",
      "language": "python",
      "execution_time": 0.18504230762255164,
      "memory_usage": 1011,
      "submitted_at": "2025-04-26T07:06:09.629068"
    }
  ],
  "started_at": "2025-04-26T06:25:54.629068",
  "completed_at": "2025-04-26T07:20:18.629068",
  "time_taken": 3264
}
```

## Usage Guide

### Starting an Assessment

1. Navigate to the dashboard
2. Click on "Take Assessment" for the desired assessment
3. Review the assessment details (time limit, number of questions, etc.)
4. Click "Start Assessment" to begin

### Taking the Assessment

#### Regular Questions

- Navigate between questions using the sidebar or Previous/Next buttons
- Select answers for MCQ questions using radio buttons
- Type responses for open-ended questions in the text area
- Your progress is automatically saved

#### Coding Questions

- Click on coding question buttons in the sidebar
- This opens the professional coding dashboard with three panels:
  - **Left Panel**: Problem description with detailed requirements
  - **Middle Panel**: Code editor with syntax highlighting
  - **Right Panel**: Live output console and test case results
- Test cases are always visible and update in real-time
- Write your solution in the code editor
- Click "Run Code" to test against provided test cases
- Test cases change color: Gray (not run) → Green (passed) → Red (failed)
- View execution output and detailed test results simultaneously
- Click "Save & Return" to go back to the main assessment

### Submitting the Assessment

- Complete all questions (regular and coding)
- Click "Submit Assessment" on the final question
- The system will compile all answers and submit them via API

## Technical Implementation

### State Management

- Assessment state is managed using React hooks
- Local storage is used to persist state when navigating to coding challenges
- Timer state is maintained and synchronized across page transitions

### Coding Environment (LeetCode-Style)

- **Split-Screen Layout**: 50/50 split between problem description and code editor
- **Monaco Code Editor**: Professional VS Code-like editor with syntax highlighting
- **LeetCode-Style UI**: Clean, modern interface matching industry standards
- **Live Test Cases**: Always visible examples that update with real-time results
- **Visual Feedback**: Color-coded test case status with clear pass/fail indicators
- **Console Output**: Bottom panel showing execution results and test summaries
- **Professional Styling**: Clean typography, proper spacing, and intuitive layout
- **Real-time Updates**: Test results update immediately after code execution
- **Memory and Performance**: Execution time and memory usage tracking

### Navigation Flow

1. Assessment Start → Main Assessment Page
2. Coding Question Click → Coding Dashboard
3. Save & Return → Back to Main Assessment Page (with state restored)
4. Submit Assessment → API submission and redirect

### Timer Management

- Global timer for the entire assessment
- Individual timers for coding questions
- Automatic submission when time expires
- Visual warnings when time is running low

## Customization

### Adding New Question Types

To add new question types, modify the `Question` interface and add corresponding UI components in the main assessment page.

### Modifying the Coding Environment

The coding dashboard can be customized by:

- Adding support for more programming languages
- Implementing advanced code editor features
- Adding more test case visualization options
- Integrating with external code execution services

### Styling and Theming

The assessment system uses Tailwind CSS and Shadcn UI components, making it easy to customize the appearance while maintaining consistency with the rest of the application.

## Demo

A demo assessment is available in the dashboard with:

- 3 regular questions (MCQ and open-ended)
- 2 coding challenges (Easy and Medium difficulty)
- 90-minute time limit
- Full functionality demonstration

Access the demo by navigating to `/dashboard` and clicking "Take Assessment" on the Demo Assessment card.
