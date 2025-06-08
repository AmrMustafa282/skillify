"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  ArrowLeft,
  User,
  Code,
  Brain,
  MessageSquare,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Zap,
  Target,
  Award,
  TrendingUp,
  FileText,
  Loader2,
  Eye,
  Download,
  Share,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Shield,
  Cpu,
  MemoryStick,
} from "lucide-react";
import axios from "axios";
import { useTheme } from "next-themes";

// Types based on your API response
interface SolutionAnalysis {
  _id: string;
  analysis_id: string;
  analyzed_at: string;
  candidate_id: string;
  solution_id: string;
  test_id: string;
  overall_score: number;
  coding_analyses: CodingAnalysis[];
  mcq_analyses: MCQAnalysis[];
  open_ended_analyses: OpenEndedAnalysis[];
}

interface CodingAnalysis {
  question_id: string;
  overall_score: number;
  correctness_score: number;
  code_quality: {
    comment_ratio: number;
    cyclomatic_complexity: number;
    function_count: number;
    halstead_volume: number | null;
    line_count: number;
    maintainability_index:
      | {
          mi: number;
          rank: string;
        }
      | number;
  };
  performance_analysis: {
    efficiency_score: number;
    optimization_suggestions: string[];
    space_complexity: string;
    space_complexity_score: number;
    time_complexity: string;
    time_complexity_score: number;
  };
  style_analysis: {
    naming_convention_score: number;
    style_issues: Array<
      | {
          issue_type: string;
          line_number: number;
          message: string;
          severity: string;
        }
      | string
    >;
    style_score: number;
  };
  ai_detection: {
    ai_generated_probability: number;
    detection_method: string;
    flagged_patterns: string[];
  };
  test_case_results: TestCaseResult[];
}

interface TestCaseResult {
  test_case_id: string;
  passed: boolean;
  expected_output: string;
  actual_output: string;
  execution_time: number;
  memory_usage: number;
  error_message: string | null;
}

interface MCQAnalysis {
  question_id: string;
  is_correct: boolean;
  correctness_score: number;
}

interface OpenEndedAnalysis {
  question_id: string;
  overall_score: number;
  clarity_score: number;
  relevance_score: number;
}

const SolutionAnalysisPage = () => {
  const params = useParams();
  const router = useRouter();
  const solutionId = params.solution_id as string;

  // State management
  const [analysis, setAnalysis] = useState<SolutionAnalysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Fetch solution analysis on component mount
  useEffect(() => {
    fetchSolutionAnalysis();
  }, [solutionId]);

  const fetchSolutionAnalysis = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`http://localhost:5000/api/analysis/${solutionId}`);
      setAnalysis(response.data);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to fetch solution analysis");
    } finally {
      setLoading(false);
    }
  };

  // Calculate summary metrics
  const getSummaryMetrics = () => {
    if (!analysis) return null;

    const codingScore =
      analysis.coding_analyses.length > 0
        ? analysis.coding_analyses.reduce((sum, c) => sum + c.overall_score, 0) /
          analysis.coding_analyses.length
        : 0;

    const mcqScore =
      analysis.mcq_analyses.length > 0
        ? analysis.mcq_analyses.reduce((sum, m) => sum + m.correctness_score, 0) /
          analysis.mcq_analyses.length
        : 0;

    const openEndedScore =
      analysis.open_ended_analyses.length > 0
        ? analysis.open_ended_analyses.reduce((sum, o) => sum + o.overall_score, 0) /
          analysis.open_ended_analyses.length
        : 0;

    const passedTests = analysis.coding_analyses.reduce(
      (sum, c) => sum + c.test_case_results.filter((t) => t.passed).length,
      0
    );

    const totalTests = analysis.coding_analyses.reduce(
      (sum, c) => sum + c.test_case_results.length,
      0
    );

    return {
      codingScore,
      mcqScore,
      openEndedScore,
      passedTests,
      totalTests,
      testPassRate: totalTests > 0 ? passedTests / totalTests : 0,
    };
  };

  const { theme, resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  const colors = {
    correct: isDark ? "#22c55e" : "#10b981",
    incorrect: isDark ? "#ef4444" : "#dc2626",
    grid: isDark ? "#374151" : "#e5e7eb",
    text: isDark ? "#d1d5db" : "#374151",
    tooltip: {
      bg: isDark ? "#1f2937" : "#ffffff",
      border: isDark ? "#374151" : "#e5e7eb",
    },
  };

  const summaryMetrics = getSummaryMetrics();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <h3 className="text-lg font-semibold mb-2">Loading Analysis</h3>
            <p className="text-sm text-muted-foreground text-center">
              Fetching detailed solution analysis...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !analysis) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <Card className="w-full max-w-md">
          <CardContent className="flex flex-col items-center justify-center py-8">
            <XCircle className="h-8 w-8 text-destructive mb-4" />
            <h3 className="text-lg font-semibold mb-2">Failed to Load Analysis</h3>
            <p className="text-sm text-muted-foreground text-center mb-4">
              {error || "Solution analysis not found."}
            </p>
            <div className="flex space-x-2">
              <Button onClick={() => router.back()} variant="outline">
                Go Back
              </Button>
              <Button onClick={fetchSolutionAnalysis}>Retry</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <Button onClick={() => router.back()} variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Analytics
            </Button> */}
            <div>
              <h1 className="text-3xl font-bold">Solution Analysis</h1>
              <p className="text-muted-foreground mt-1">
                Detailed performance analysis for candidate {analysis.candidate_id}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1">
              Solution ID: {analysis.solution_id}
            </Badge>
            <Badge variant="outline" className="px-3 py-1">
              Overall Score: {(analysis.overall_score * 100).toFixed(1)}%
            </Badge>
          </div>
        </div>

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="coding" className="flex items-center space-x-2">
              <Code className="h-4 w-4" />
              <span>Coding Analysis</span>
            </TabsTrigger>
            <TabsTrigger value="mcq" className="flex items-center space-x-2">
              <Brain className="h-4 w-4" />
              <span>MCQ Results</span>
            </TabsTrigger>
            <TabsTrigger value="open-ended" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Open-Ended</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Candidate Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Candidate Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium ">Candidate ID</label>
                    <p className="text-lg font-semibold ">{analysis.candidate_id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium ">Solution ID</label>
                    <p className="text-lg font-semibold ">{analysis.solution_id}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium ">Analyzed At</label>
                    <p className="text-lg font-semibold ">
                      {new Date(analysis.analyzed_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Overall Score</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">
                    {(analysis.overall_score * 100).toFixed(1)}%
                  </div>
                  <Progress value={analysis.overall_score * 100} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Coding Performance</CardTitle>
                  <Code className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {summaryMetrics ? (summaryMetrics.codingScore * 100).toFixed(1) : 0}%
                  </div>
                  <Progress
                    value={summaryMetrics ? summaryMetrics.codingScore * 100 : 0}
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">MCQ Score</CardTitle>
                  <Brain className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-purple-600">
                    {summaryMetrics ? (summaryMetrics.mcqScore * 100).toFixed(1) : 0}%
                  </div>
                  <Progress
                    value={summaryMetrics ? summaryMetrics.mcqScore * 100 : 0}
                    className="mt-2"
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Test Pass Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">
                    {summaryMetrics ? (summaryMetrics.testPassRate * 100).toFixed(1) : 0}%
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {summaryMetrics?.passedTests || 0}/{summaryMetrics?.totalTests || 0} tests
                    passed
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Performance Radar Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Breakdown</CardTitle>
                  <CardDescription>Multi-dimensional performance analysis</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RadarChart
                      data={[
                        {
                          subject: "Coding",
                          score: summaryMetrics ? summaryMetrics.codingScore * 100 : 0,
                          fullMark: 100,
                        },
                        {
                          subject: "MCQ",
                          score: summaryMetrics ? summaryMetrics.mcqScore * 100 : 0,
                          fullMark: 100,
                        },
                        {
                          subject: "Open-Ended",
                          score: summaryMetrics ? summaryMetrics.openEndedScore * 100 : 0,
                          fullMark: 100,
                        },
                        {
                          subject: "Test Pass Rate",
                          score: summaryMetrics ? summaryMetrics.testPassRate * 100 : 0,
                          fullMark: 100,
                        },
                        {
                          subject: "Overall",
                          score: analysis.overall_score * 100,
                          fullMark: 100,
                        },
                      ]}
                    >
                      <PolarGrid />
                      <PolarAngleAxis dataKey="subject" />
                      <PolarRadiusAxis angle={90} domain={[0, 100]} />
                      <Radar
                        name="Performance"
                        dataKey="score"
                        stroke="#3b82f6"
                        fill="#3b82f6"
                        fillOpacity={0.3}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Question Type Distribution</CardTitle>
                  <CardDescription>Performance across different question types</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={[
                          {
                            name: `Coding (${analysis.coding_analyses.length})`,
                            value: analysis.coding_analyses.length,
                            fill: "#10b981",
                          },
                          {
                            name: `MCQ (${analysis.mcq_analyses.length})`,
                            value: analysis.mcq_analyses.length,
                            fill: "#3b82f6",
                          },
                          {
                            name: `Open-Ended (${analysis.open_ended_analyses.length})`,
                            value: analysis.open_ended_analyses.length,
                            fill: "#f59e0b",
                          },
                        ]}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {[
                          {
                            name: "Coding",
                            value: analysis.coding_analyses.length,
                            fill: "#10b981",
                          },
                          { name: "MCQ", value: analysis.mcq_analyses.length, fill: "#3b82f6" },
                          {
                            name: "Open-Ended",
                            value: analysis.open_ended_analyses.length,
                            fill: "#f59e0b",
                          },
                        ].map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Coding Analysis Tab */}
          <TabsContent value="coding" className="space-y-6">
            {analysis.coding_analyses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Code className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold  mb-2">No Coding Questions</h3>
                  <p className=" text-center">
                    This solution does not contain any coding question analyses.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {analysis.coding_analyses.map((coding, index) => (
                  <motion.div
                    key={coding.question_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="flex items-center space-x-2">
                            <Code className="h-5 w-5" />
                            <span>Question {coding.question_id}</span>
                          </CardTitle>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline">
                              Score: {(coding.overall_score * 100).toFixed(1)}%
                            </Badge>
                            <Badge
                              variant={
                                coding.ai_detection.ai_generated_probability > 0.5
                                  ? "destructive"
                                  : "default"
                              }
                            >
                              AI Detection:{" "}
                              {(coding.ai_detection.ai_generated_probability * 100).toFixed(1)}%
                            </Badge>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="text-center p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                            <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                            <div className="font-semibold text-green-900 dark:text-green-100">
                              {(coding.correctness_score * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300">
                              Correctness
                            </div>
                          </div>
                          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                            <div className="font-semibold text-blue-900 dark:text-blue-100">
                              {((coding.performance_analysis?.efficiency_score || 0) * 100).toFixed(
                                1
                              )}
                              %
                            </div>
                            <div className="text-sm text-blue-700 dark:text-blue-300">
                              Performance
                            </div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                            <FileText className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                            <div className="font-semibold text-purple-900 dark:text-purple-100">
                              {(() => {
                                const mi = coding.code_quality?.maintainability_index;
                                if (typeof mi === "object" && mi?.mi) {
                                  return mi.mi.toFixed(1);
                                } else if (typeof mi === "number") {
                                  return mi.toFixed(1);
                                }
                                return "0.0";
                              })()}
                            </div>
                            <div className="text-sm text-purple-700 dark:text-purple-300">
                              Maintainability
                              {(() => {
                                const mi = coding.code_quality?.maintainability_index;
                                if (typeof mi === "object" && mi?.rank) {
                                  return ` (${mi.rank})`;
                                }
                                return "";
                              })()}
                            </div>
                          </div>
                          <div className="text-center p-4 bg-orange-50 dark:bg-orange-950 border border-orange-200 dark:border-orange-800 rounded-lg">
                            <Award className="h-8 w-8 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                            <div className="font-semibold text-orange-900 dark:text-orange-100">
                              {((coding.style_analysis?.style_score || 0) * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-orange-700 dark:text-orange-300">
                              Style
                            </div>
                          </div>
                        </div>

                        {/* Code Quality Details */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Code Quality Metrics</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between">
                                <span className="">Lines of Code:</span>
                                <span className="font-medium">
                                  {coding.code_quality?.line_count || 0}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="">Function Count:</span>
                                <span className="font-medium">
                                  {coding.code_quality?.function_count || 0}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="">Cyclomatic Complexity:</span>
                                <span className="font-medium">
                                  {coding.code_quality?.cyclomatic_complexity || 0}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="">Comment Ratio:</span>
                                <span className="font-medium">
                                  {((coding.code_quality?.comment_ratio || 0) * 100).toFixed(1)}%
                                </span>
                              </div>
                              {coding.code_quality?.halstead_volume &&
                                typeof coding.code_quality.halstead_volume === "number" && (
                                  <div className="flex justify-between">
                                    <span className="">Halstead Volume:</span>
                                    <span className="font-medium">
                                      {coding.code_quality.halstead_volume.toFixed(2)}
                                    </span>
                                  </div>
                                )}
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader>
                              <CardTitle className="text-lg">Performance Analysis</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                              <div className="flex justify-between">
                                <span className="">Time Complexity:</span>
                                <Badge variant="outline">
                                  {coding.performance_analysis?.time_complexity || "N/A"}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="">Space Complexity:</span>
                                <Badge variant="outline">
                                  {coding.performance_analysis?.space_complexity || "N/A"}
                                </Badge>
                              </div>
                              <div className="flex justify-between">
                                <span className="">Time Score:</span>
                                <span className="font-medium">
                                  {(
                                    (coding.performance_analysis?.time_complexity_score || 0) * 100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="">Space Score:</span>
                                <span className="font-medium">
                                  {(
                                    (coding.performance_analysis?.space_complexity_score || 0) * 100
                                  ).toFixed(1)}
                                  %
                                </span>
                              </div>
                              {coding.performance_analysis?.optimization_suggestions &&
                                Array.isArray(
                                  coding.performance_analysis.optimization_suggestions
                                ) &&
                                coding.performance_analysis.optimization_suggestions.length > 0 && (
                                  <div>
                                    <span className="">Suggestions:</span>
                                    <ul className="mt-1 text-sm text-gray-700">
                                      {coding.performance_analysis.optimization_suggestions.map(
                                        (suggestion, idx) => (
                                          <li key={idx} className="flex items-start">
                                            <span className="mr-2">•</span>
                                            <span>{String(suggestion)}</span>
                                          </li>
                                        )
                                      )}
                                    </ul>
                                  </div>
                                )}
                            </CardContent>
                          </Card>
                        </div>

                        {/* Test Case Results */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Test Case Results</CardTitle>
                            <CardDescription>
                              {coding.test_case_results.filter((t) => t.passed).length} of{" "}
                              {coding.test_case_results.length} tests passed
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-3">
                              {coding.test_case_results.map((testCase) => (
                                <div
                                  key={testCase.test_case_id}
                                  className={`p-3 rounded-lg border ${
                                    testCase.passed
                                      ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                                      : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      {testCase.passed ? (
                                        <CheckCircle className="h-4 w-4 text-green-600" />
                                      ) : (
                                        <XCircle className="h-4 w-4 text-red-600" />
                                      )}
                                      <span className="font-medium">{testCase.test_case_id}</span>
                                    </div>
                                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                      <span className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {testCase.execution_time.toFixed(3)}s
                                      </span>
                                      <span className="flex items-center">
                                        <MemoryStick className="h-3 w-3 mr-1" />
                                        {testCase.memory_usage.toFixed(2)}MB
                                      </span>
                                    </div>
                                  </div>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <div>
                                      <span className="text-muted-foreground">Expected:</span>
                                      <code className="block mt-1 p-2 bg-muted rounded text-xs">
                                        {testCase.expected_output}
                                      </code>
                                    </div>
                                    <div>
                                      <span className="text-muted-foreground">Actual:</span>
                                      <code className="block mt-1 p-2 bg-muted rounded text-xs">
                                        {testCase.actual_output}
                                      </code>
                                    </div>
                                  </div>
                                  {testCase.error_message && (
                                    <div className="mt-2">
                                      <span className="text-destructive text-sm">Error:</span>
                                      <code className="block mt-1 p-2 bg-destructive/10 rounded text-xs text-destructive">
                                        {testCase.error_message}
                                      </code>
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>

                        {/* AI Detection & Style Issues */}
                        {((coding.ai_detection?.flagged_patterns &&
                          Array.isArray(coding.ai_detection.flagged_patterns) &&
                          coding.ai_detection.flagged_patterns.length > 0) ||
                          (coding.style_analysis?.style_issues &&
                            Array.isArray(coding.style_analysis.style_issues) &&
                            coding.style_analysis.style_issues.length > 0)) && (
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {coding.ai_detection?.flagged_patterns &&
                              Array.isArray(coding.ai_detection.flagged_patterns) &&
                              coding.ai_detection.flagged_patterns.length > 0 && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                      <Shield className="h-5 w-5 text-red-600" />
                                      <span>AI Detection Flags</span>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-2">
                                      {coding.ai_detection.flagged_patterns.map((pattern, idx) => (
                                        <li key={idx} className="flex items-start">
                                          <AlertTriangle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                                          <span className="text-sm">{String(pattern)}</span>
                                        </li>
                                      ))}
                                    </ul>
                                  </CardContent>
                                </Card>
                              )}

                            {coding.style_analysis?.style_issues &&
                              Array.isArray(coding.style_analysis.style_issues) &&
                              coding.style_analysis.style_issues.length > 0 && (
                                <Card>
                                  <CardHeader>
                                    <CardTitle className="text-lg flex items-center space-x-2">
                                      <FileText className="h-5 w-5 text-orange-600" />
                                      <span>Style Issues</span>
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <ul className="space-y-2">
                                      {coding.style_analysis.style_issues.map((issue, idx) => (
                                        <li
                                          key={idx}
                                          className="p-3 bg-orange-50 dark:bg-orange-950 rounded-lg border border-orange-200 dark:border-orange-800"
                                        >
                                          <div className="flex items-start">
                                            <AlertTriangle className="h-4 w-4 text-orange-600 dark:text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                                            <div className="flex-1">
                                              {typeof issue === "object" ? (
                                                <div className="space-y-1">
                                                  <div className="flex items-center space-x-2">
                                                    <span className="text-sm font-medium text-orange-800 dark:text-orange-200">
                                                      {(issue as any).issue_type || "Style Issue"}
                                                    </span>
                                                    <span className="text-xs px-2 py-1 bg-orange-200 dark:bg-orange-800 text-orange-800 dark:text-orange-200 rounded">
                                                      {(issue as any).severity || "warning"}
                                                    </span>
                                                  </div>
                                                  <p className="text-sm text-orange-700 dark:text-orange-300">
                                                    {(issue as any).message || String(issue)}
                                                  </p>
                                                  {(issue as any).line_number && (
                                                    <p className="text-xs text-orange-600 dark:text-orange-400">
                                                      Line {(issue as any).line_number}
                                                    </p>
                                                  )}
                                                </div>
                                              ) : (
                                                <span className="text-sm text-orange-700 dark:text-orange-300">
                                                  {String(issue)}
                                                </span>
                                              )}
                                            </div>
                                          </div>
                                        </li>
                                      ))}
                                    </ul>
                                  </CardContent>
                                </Card>
                              )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>

          {/* MCQ Analysis Tab */}
          <TabsContent value="mcq" className="space-y-6">
            {analysis.mcq_analyses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <Brain className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No MCQ Questions</h3>
                  <p className="text-muted-foreground text-center">
                    This solution does not contain any multiple choice question analyses.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* MCQ Summary */}
                <Card>
                  <CardHeader>
                    <CardTitle>MCQ Performance Summary</CardTitle>
                    <CardDescription>
                      Overall performance on multiple choice questions
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                        <Brain className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                        <div className="font-semibold text-blue-900 dark:text-blue-100">
                          {summaryMetrics ? (summaryMetrics.mcqScore * 100).toFixed(1) : 0}%
                        </div>
                        <div className="text-sm text-blue-700 dark:text-blue-300">
                          Average Score
                        </div>
                      </div>
                      <div className="text-center p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                        <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                        <div className="font-semibold text-green-900 dark:text-green-100">
                          {analysis.mcq_analyses.filter((m) => m.is_correct).length}
                        </div>
                        <div className="text-sm text-green-700 dark:text-green-300">
                          Correct Answers
                        </div>
                      </div>
                      <div className="text-center p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
                        <XCircle className="h-8 w-8 text-red-600 dark:text-red-400 mx-auto mb-2" />
                        <div className="font-semibold text-red-900 dark:text-red-100">
                          {analysis.mcq_analyses.filter((m) => !m.is_correct).length}
                        </div>
                        <div className="text-sm text-red-700 dark:text-red-300">
                          Incorrect Answers
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* MCQ Results Chart */}
                {/* <Card>
                  <CardHeader>
                    <CardTitle>Question-by-Question Results</CardTitle>
                    <CardDescription>Performance breakdown for each MCQ question</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={analysis.mcq_analyses.map((mcq) => ({
                          question: `Q${mcq.question_id}`,
                          score: mcq.correctness_score * 100,
                          correct: mcq.is_correct,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="question" />
                        <YAxis domain={[0, 100]} />
                        <Tooltip
                          formatter={(value, name) => [
                            `${value}%`,
                            name === "score" ? "Score" : name,
                          ]}
                        />
                        <Bar
                          dataKey="score"
                          //@ts-ignore
                          fill={(entry: any) => (entry.correct ? "#10b981" : "#ef4444")}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card> */}
                <Card>
                  <CardHeader>
                    <CardTitle>Question-by-Question Results</CardTitle>
                    <CardDescription>Performance breakdown for each MCQ question</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart
                        data={analysis.mcq_analyses.map((mcq) => ({
                          question: `Q${mcq.question_id}`,
                          score: mcq.correctness_score * 100,
                          correct: mcq.is_correct,
                        }))}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke={colors.grid} />
                        <XAxis
                          dataKey="question"
                          tick={{ fill: colors.text }}
                          axisLine={{ stroke: colors.grid }}
                          tickLine={{ stroke: colors.grid }}
                        />
                        <YAxis
                          domain={[0, 100]}
                          tick={{ fill: colors.text }}
                          axisLine={{ stroke: colors.grid }}
                          tickLine={{ stroke: colors.grid }}
                        />
                        <Tooltip
                          formatter={(value, name) => [
                            `${value}%`,
                            name === "score" ? "Score" : name,
                          ]}
                          contentStyle={{
                            backgroundColor: colors.tooltip.bg,
                            border: `1px solid ${colors.tooltip.border}`,
                            borderRadius: "6px",
                            color: colors.text,
                          }}
                          labelStyle={{ color: colors.text }}
                        />
                        <Bar dataKey="score" radius={[4, 4, 0, 0]}>
                          {analysis.mcq_analyses.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={entry.is_correct ? colors.correct : colors.incorrect}
                            />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                {/* Detailed MCQ Results */}
                <Card>
                  <CardHeader>
                    <CardTitle>Detailed Results</CardTitle>
                    <CardDescription>Individual question analysis</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {analysis.mcq_analyses.map((mcq, index) => (
                        <motion.div
                          key={mcq.question_id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 }}
                          className={`p-4 rounded-lg border ${
                            mcq.is_correct
                              ? "bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800"
                              : "bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800"
                          }`}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium">Question {mcq.question_id}</span>
                            {mcq.is_correct ? (
                              <CheckCircle className="h-5 w-5 text-green-600" />
                            ) : (
                              <XCircle className="h-5 w-5 text-red-600" />
                            )}
                          </div>
                          <div className="text-2xl font-bold mb-1">
                            {(mcq.correctness_score * 100).toFixed(0)}%
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {mcq.is_correct ? "Correct" : "Incorrect"}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          {/* Open-Ended Analysis Tab */}
          <TabsContent value="open-ended" className="space-y-6">
            {analysis.open_ended_analyses.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <MessageSquare className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No Open-Ended Questions</h3>
                  <p className="text-muted-foreground text-center">
                    This solution does not contain any open-ended question analyses.
                  </p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {analysis.open_ended_analyses.map((openEnded, index) => (
                  <motion.div
                    key={openEnded.question_id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <MessageSquare className="h-5 w-5" />
                          <span>Question {openEnded.question_id}</span>
                        </CardTitle>
                        <CardDescription>Open-ended response analysis</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Performance Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="text-center p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <Award className="h-8 w-8 text-blue-600 dark:text-blue-400 mx-auto mb-2" />
                            <div className="font-semibold text-blue-900 dark:text-blue-100">
                              {(openEnded.overall_score * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-blue-700 dark:text-blue-300">
                              Overall Score
                            </div>
                          </div>
                          <div className="text-center p-4 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
                            <Eye className="h-8 w-8 text-green-600 dark:text-green-400 mx-auto mb-2" />
                            <div className="font-semibold text-green-900 dark:text-green-100">
                              {(openEnded.clarity_score * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-green-700 dark:text-green-300">
                              Clarity
                            </div>
                          </div>
                          <div className="text-center p-4 bg-purple-50 dark:bg-purple-950 border border-purple-200 dark:border-purple-800 rounded-lg">
                            <Target className="h-8 w-8 text-purple-600 dark:text-purple-400 mx-auto mb-2" />
                            <div className="font-semibold text-purple-900 dark:text-purple-100">
                              {(openEnded.relevance_score * 100).toFixed(1)}%
                            </div>
                            <div className="text-sm text-purple-700 dark:text-purple-300">
                              Relevance
                            </div>
                          </div>
                        </div>

                        {/* Score Breakdown Chart */}
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-lg">Score Breakdown</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ResponsiveContainer width="100%" height={200}>
                              <BarChart
                                data={[
                                  { metric: "Overall", score: openEnded.overall_score * 100 },
                                  { metric: "Clarity", score: openEnded.clarity_score * 100 },
                                  { metric: "Relevance", score: openEnded.relevance_score * 100 },
                                ]}
                              >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="metric" />
                                <YAxis domain={[0, 100]} />
                                <Tooltip
                                  formatter={(value) => [`${Number(value).toFixed(1)}%`, "Score"]}
                                />
                                <Bar dataKey="score" fill="#3b82f6" />
                              </BarChart>
                            </ResponsiveContainer>
                          </CardContent>
                        </Card>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SolutionAnalysisPage;
