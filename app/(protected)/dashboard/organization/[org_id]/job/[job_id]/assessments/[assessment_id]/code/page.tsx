import Link from "next/link";
import { ArrowRight, Edit, Code, Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import axios from "axios";
import { PY_URL } from "@/config";

// Types for the assessment data
interface TestCase {
  input: string;
  expected_output: string;
  weight: number;
}

interface CodingQuestion {
  title: string;
  text: string;
  language: string;
  order: number;
  starterCode: string;
  testCases: TestCase[];
  metadata: {
    difficulty: string;
    estimatedDuration: number;
    tags: string[];
  };
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
}

interface Assessment {
  _id: string;
  name: string;
  description: string;
  codingQuestions: CodingQuestion[];
  questions: any[];
  timeLimit: number;
  startDate: string;
  endDate: string;
}

async function getAssessment(assessmentId: string): Promise<Assessment | null> {
  try {
    const response = await axios.get(`${PY_URL}/assessments/${assessmentId}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching assessment:", error);
    return null;
  }
}

function getDifficultyColor(difficulty: string) {
  switch (difficulty.toLowerCase()) {
    case "easy":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "medium":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "hard":
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
}

function getLanguageIcon(language: string) {
  const langMap: { [key: string]: string } = {
    javascript: "/langs/javascript.svg",
    python: "/langs/python.svg",
    java: "/langs/java.svg",
    cpp: "/langs/cpp.svg",
    ruby: "/langs/ruby.svg",
    go: "/langs/go.svg",
  };

  return langMap[language.toLowerCase()] || "/langs/javascript.svg";
}

export default async function AddCodingPage({
  params,
}: {
  params: { org_id: string; job_id: string; assessment_id: string };
}) {
  const assessment = await getAssessment(params.assessment_id);

  const languages = [
    {
      name: "JavaScript",
      icon: "/langs/javascript.svg",
      description: "Create JavaScript coding challenges with Node.js runtime",
    },
    {
      name: "Python",
      icon: "/langs/python.svg",
      description: "Create Python coding challenges with test-driven development",
    },
    {
      name: "Java",
      icon: "/langs/java.svg",
      description: "Create Java coding challenges with JUnit testing framework",
    },
    {
      name: "CPP",
      icon: "/langs/cpp.svg",
      description: "Create C++ coding challenges with modern C++ features",
    },
    {
      name: "Ruby",
      icon: "/langs/ruby.svg",
      description: "Create Ruby coding challenges with RSpec testing",
    },
    {
      name: "Go",
      icon: "/langs/go.svg",
      description: "Create Go coding challenges with built-in testing package",
    },
  ];

  const basePath = `/dashboard/organization/${params.org_id}/job/${params.job_id}/assessments/${params.assessment_id}/code`;

  return (
    <div className="space-y-12">
      {/* Existing Coding Questions Section */}
      {assessment && assessment.codingQuestions && assessment.codingQuestions.length > 0 && (
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold tracking-tight mb-2">Existing Coding Questions</h2>
            <p className="text-muted-foreground">
              Update or modify your existing coding questions.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {assessment.codingQuestions
              .sort((a, b) => a.order - b.order)
              .map((question, index) => (
                <Card key={index} className="transition-all hover:shadow-md flex flex-col h-full">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <CardTitle className="flex items-center gap-2 text-lg">
                        <Image
                          src={getLanguageIcon(question.language) || "/placeholder.svg"}
                          alt={question.language}
                          width={24}
                          height={24}
                        />
                        {question.title}
                      </CardTitle>
                      <Badge
                        variant="secondary"
                        className={getDifficultyColor(question.metadata.difficulty)}
                      >
                        {question.metadata.difficulty}
                      </Badge>
                    </div>

                    <CardDescription className="line-clamp-3">
                      {question.text.split("\n")[0]}
                    </CardDescription>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Code className="h-3 w-3" />
                        {question.language}
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {question.metadata.estimatedDuration}min
                      </div>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Tag className="h-3 w-3" />
                        {question.testCases.length} tests
                      </div>
                    </div>

                    {question.metadata.tags && question.metadata.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {question.metadata.tags.slice(0, 3).map((tag, tagIndex) => (
                          <Badge key={tagIndex} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {question.metadata.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{question.metadata.tags.length - 3}
                          </Badge>
                        )}
                      </div>
                    )}
                  </CardHeader>

                  <CardFooter className="mt-auto pt-4">
                    <Link
                      href={`${basePath}/edit/${question.order}?language=${question.language.toLowerCase()}`}
                      className="w-full"
                    >
                      <Button
                        variant="outline"
                        className="w-full bg-white text-black hover:bg-gray-50"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Question
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </div>
      )}

      {/* Add New Coding Questions Section */}
      <div>
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight mb-2">Add New Coding Question</h2>
          <p className="text-muted-foreground">
            Choose a template to get started or create a custom coding challenge from scratch.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {languages.map((language) => (
            <Card
              key={language.name}
              className="transition-all hover:shadow-md flex flex-col h-full"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Image
                    src={language.icon || "/placeholder.svg"}
                    alt={language.name}
                    width={40}
                    height={40}
                  />
                  {language.name}
                </CardTitle>
                <CardDescription>{language.description}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto">
                <Link
                  href={`${basePath}/create?template=${language.name.toLowerCase()}`}
                  className="w-full"
                >
                  <Button className="w-full">
                    Use Template <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
