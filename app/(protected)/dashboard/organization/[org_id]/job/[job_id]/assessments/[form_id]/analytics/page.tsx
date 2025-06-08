"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  Play,
  RefreshCw,
  FileText,
  Users,
  TrendingUp,
  Award,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  BarChart3,
  PieChart as PieChartIcon,
  Download,
  Eye,
  Loader2,
  Search,
  Filter,
  Calendar,
  Target,
  Code,
  Brain,
  MessageSquare,
} from "lucide-react";
import axios from "axios";

// Types based on your API responses
interface AnalysisJob {
  _id: string;
  job_id: string;
  message: string;
  timestamp: string;
}

interface JobStatus {
  job_id: string;
  status: "pending" | "running" | "completed" | "failed";
  job_type: string;
  job_data: any;
  created_at: string;
  updated_at: string;
}

interface Report {
  _id: string;
  report_id: string;
  test_id: string;
  generated_at: string;
  candidate_count: number;
  average_score: number;
  score_distribution: {
    excellent: number;
    good: number;
    average: number;
    poor: number;
  };
  mcq_performance: {
    average_score: number;
  };
  coding_performance: {
    average_score: number;
    average_test_pass_rate: number;
    metrics: {
      correctness: number;
      performance: number;
      code_quality: number;
      style: number;
      originality: number;
    };
  };
  open_ended_performance: {
    average_score: number;
    metrics: {
      clarity: number;
      relevance: number;
    };
  };
  top_candidates: Array<{
    candidate_id: string;
    solution_id: string;
    overall_score: number;
    rank: number;
    mcq_score: number;
    coding_score: number;
    open_ended_score: number;
    coding_details: {
      correctness: number;
      performance: number;
      code_quality: number;
      style: number;
      originality: number;
      test_pass_rate: number;
      passed_tests: number;
      total_tests: number;
      overall: number;
    };
    mcq_details: {
      overall: number;
    };
    open_ended_details: {
      overall: number;
    };
  }>;
}

const AnalyticsPage = () => {
  const params = useParams();
  const router = useRouter();
  const formId = params.form_id as string;

  // State management
  const [activeTab, setActiveTab] = useState("overview");
  const [testId, setTestId] = useState("");
  const [currentReport, setCurrentReport] = useState<Report | null>(null);
  const [analysisJobs, setAnalysisJobs] = useState<AnalysisJob[]>([]);
  const [currentJob, setCurrentJob] = useState<JobStatus | null>(null);
  const [loading, setLoading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<AnalysisJob[]>([]);
  const [autoRefresh, setAutoRefresh] = useState(false);

  // Check for existing report on component mount
  useEffect(() => {
    if (formId) {
      setTestId(formId);
      checkExistingReport(formId);
    }
  }, [formId]);

  // Auto-refresh logs when analyzing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoRefresh && currentJob) {
      interval = setInterval(() => {
        fetchJobLogs(currentJob.job_id);
        fetchJobStatus(currentJob.job_id);
      }, 2000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoRefresh, currentJob]);

  const checkExistingReport = async (testId: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:5000/api/reports/test/${testId}`);
      setCurrentReport(response.data);
      setActiveTab("report");
    } catch (error: any) {
      if (error.response?.status !== 404) {
        console.error("Error checking existing report:", error);
      }
      // No existing report, stay on overview tab
    } finally {
      setLoading(false);
    }
  };

  const startAnalysis = async () => {
    if (!testId.trim()) {
      setError("Please enter a test ID");
      return;
    }

    try {
      setAnalyzing(true);
      setError(null);
      const response = await axios.post(`http://localhost:5000/api/analyze/test/${testId}`);

      setCurrentJob({
        job_id: response.data.job_id,
        status: "pending",
        job_type: "test",
        job_data: { test_id: testId },
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });

      setAutoRefresh(true);
      setActiveTab("logs");

      // Start fetching logs immediately
      setTimeout(() => fetchJobLogs(response.data.job_id), 1000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to start analysis");
    } finally {
      setAnalyzing(false);
    }
  };

  const fetchJobStatus = async (jobId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/analysis/jobs/${jobId}`);
      setCurrentJob(response.data);

      if (response.data.status === "completed") {
        setAutoRefresh(false);
        // Check if report is available
        setTimeout(() => checkExistingReport(testId), 2000);
      }
    } catch (error) {
      console.error("Error fetching job status:", error);
    }
  };

  const fetchJobLogs = async (jobId: string) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/analysis/jobs/${jobId}/logs`);
      setLogs(response.data);
    } catch (error) {
      console.error("Error fetching job logs:", error);
    }
  };

  const generateReport = async () => {
    if (!testId.trim()) {
      setError("Please enter a test ID");
      return;
    }

    try {
      setGenerating(true);
      setError(null);
      const response = await axios.post(`http://localhost:5000/api/reports/generate/${testId}`);

      // Fetch the generated report
      setTimeout(() => checkExistingReport(testId), 2000);
    } catch (error: any) {
      setError(error.response?.data?.message || "Failed to generate report");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Test Analytics Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Analyze test performance, track analysis jobs, and generate comprehensive reports
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <Badge variant="outline" className="px-3 py-1">
              Test ID: {formId}
            </Badge>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-lg p-4"
          >
            <div className="flex items-center">
              <XCircle className="h-5 w-5 text-red-600 mr-3" />
              <p className="text-red-800">{error}</p>
            </div>
          </motion.div>
        )}

        {/* Main Content */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" className="flex items-center space-x-2">
              <BarChart3 className="h-4 w-4" />
              <span>Overview</span>
            </TabsTrigger>
            <TabsTrigger value="analyze" className="flex items-center space-x-2">
              <Play className="h-4 w-4" />
              <span>Analyze</span>
            </TabsTrigger>
            <TabsTrigger value="logs" className="flex items-center space-x-2">
              <FileText className="h-4 w-4" />
              <span>Logs</span>
            </TabsTrigger>
            <TabsTrigger value="report" className="flex items-center space-x-2">
              <Award className="h-4 w-4" />
              <span>Report</span>
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Status</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {currentReport ? "Report Available" : "No Analysis"}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {currentReport
                      ? `Generated ${new Date(currentReport.generated_at).toLocaleDateString()}`
                      : "Start analysis to generate insights"}
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Test ID</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{formId}</div>
                  <p className="text-xs text-muted-foreground">Assessment identifier</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Candidates</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{currentReport?.candidate_count || 0}</div>
                  <p className="text-xs text-muted-foreground">Total submissions</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Start analysis or generate reports for this test
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button onClick={startAnalysis} disabled={analyzing} className="w-full">
                    {analyzing ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Starting Analysis...
                      </>
                    ) : (
                      <>
                        <Play className="mr-2 h-4 w-4" />
                        Start Test Analysis
                      </>
                    )}
                  </Button>

                  <Button
                    onClick={generateReport}
                    disabled={generating}
                    variant="outline"
                    className="w-full"
                  >
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Analysis Workflow</CardTitle>
                  <CardDescription>Follow these steps to analyze test performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">1</span>
                      </div>
                      <div>
                        <p className="font-medium">Start Analysis</p>
                        <p className="text-sm text-gray-600">Analyze all test solutions</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">2</span>
                      </div>
                      <div>
                        <p className="font-medium">Monitor Logs</p>
                        <p className="text-sm text-gray-600">Track analysis progress</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">3</span>
                      </div>
                      <div>
                        <p className="font-medium">Generate Report</p>
                        <p className="text-sm text-gray-600">Create comprehensive insights</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium text-blue-600">4</span>
                      </div>
                      <div>
                        <p className="font-medium">View Results</p>
                        <p className="text-sm text-gray-600">Analyze performance metrics</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analyze Tab */}
          <TabsContent value="analyze" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Test Analysis</CardTitle>
                <CardDescription>
                  Start analyzing all solutions for this test to generate performance insights
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="testId">Test ID</Label>
                    <Input
                      id="testId"
                      value={testId}
                      onChange={(e) => setTestId(e.target.value)}
                      placeholder="Enter test ID to analyze"
                      className="mt-1"
                    />
                  </div>

                  <div className="flex space-x-3">
                    <Button onClick={startAnalysis} disabled={analyzing} className="flex-1">
                      {analyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Starting Analysis...
                        </>
                      ) : (
                        <>
                          <Play className="mr-2 h-4 w-4" />
                          Start Analysis
                        </>
                      )}
                    </Button>

                    {currentJob && (
                      <Button onClick={() => fetchJobStatus(currentJob.job_id)} variant="outline">
                        <RefreshCw className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>

                {currentJob && (
                  <div className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">Current Analysis Job</h4>
                      <Badge
                        variant={
                          currentJob.status === "completed"
                            ? "default"
                            : currentJob.status === "running"
                              ? "secondary"
                              : currentJob.status === "failed"
                                ? "destructive"
                                : "outline"
                        }
                      >
                        {currentJob.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Job ID:</span>
                        <span className="font-mono">{currentJob.job_id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span>{new Date(currentJob.created_at).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Test ID:</span>
                        <span>{currentJob.job_data?.test_id}</span>
                      </div>
                    </div>

                    {currentJob.status === "running" && (
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                          <span className="text-sm text-blue-600">Analysis in progress...</span>
                        </div>
                        <Progress value={undefined} className="mt-2" />
                      </div>
                    )}

                    {currentJob.status === "completed" && (
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">
                            Analysis completed successfully
                          </span>
                        </div>
                      </div>
                    )}

                    {currentJob.status === "failed" && (
                      <div className="mt-3">
                        <div className="flex items-center space-x-2">
                          <XCircle className="h-4 w-4 text-red-600" />
                          <span className="text-sm text-red-600">Analysis failed</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-3" />
                    <div>
                      <h4 className="font-semibold text-blue-800">Analysis Information</h4>
                      <ul className="mt-2 text-sm text-blue-700 space-y-1">
                        <li>• Analysis processes all candidate solutions for the specified test</li>
                        <li>
                          • Evaluates coding performance, MCQ answers, and open-ended responses
                        </li>
                        <li>
                          • Generates detailed metrics for each candidate and overall statistics
                        </li>
                        <li>• Results are used to create comprehensive performance reports</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Logs Tab */}
          <TabsContent value="logs" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Analysis Logs</CardTitle>
                  <CardDescription>Real-time logs from the analysis job</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  {autoRefresh && (
                    <div className="flex items-center space-x-2">
                      <Loader2 className="h-4 w-4 animate-spin text-blue-600" />
                      <span className="text-sm text-blue-600">Auto-refreshing</span>
                    </div>
                  )}
                  {currentJob && (
                    <Button
                      onClick={() => fetchJobLogs(currentJob.job_id)}
                      variant="outline"
                      size="sm"
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {!currentJob ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium  mb-2">No Active Analysis</h3>
                    <p className="text-gray-600">Start an analysis to view logs here</p>
                  </div>
                ) : logs.length === 0 ? (
                  <div className="text-center py-8">
                    <Loader2 className="h-12 w-12 text-blue-600 mx-auto mb-4 animate-spin" />
                    <h3 className="text-lg font-medium  mb-2">Loading Logs</h3>
                    <p className="text-gray-600">Fetching analysis logs...</p>
                  </div>
                ) : (
                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {logs.map((log, index) => (
                      <motion.div
                        key={log._id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg"
                      >
                        <div className="flex-shrink-0 mt-1">
                          {log.message.includes("completed") ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : log.message.includes("failed") || log.message.includes("error") ? (
                            <XCircle className="h-4 w-4 text-red-600" />
                          ) : log.message.includes("starting") ||
                            log.message.includes("analyzing") ? (
                            <Play className="h-4 w-4 text-blue-600" />
                          ) : (
                            <Clock className="h-4 w-4 text-gray-600" />
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm ">{log.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {currentJob && (
              <Card>
                <CardHeader>
                  <CardTitle>Job Status</CardTitle>
                  <CardDescription>Current status and details of the analysis job</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Status</Label>
                        <div className="mt-1">
                          <Badge
                            variant={
                              currentJob.status === "completed"
                                ? "default"
                                : currentJob.status === "running"
                                  ? "secondary"
                                  : currentJob.status === "failed"
                                    ? "destructive"
                                    : "outline"
                            }
                          >
                            {currentJob.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Job ID</Label>
                        <p className="text-sm font-mono bg-gray-100 p-2 rounded mt-1">
                          {currentJob.job_id}
                        </p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Test ID</Label>
                        <p className="text-sm mt-1">{currentJob.job_data?.test_id}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-gray-600">Created At</Label>
                        <p className="text-sm mt-1">
                          {new Date(currentJob.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Report Tab */}
          <TabsContent value="report" className="space-y-6">
            {!currentReport ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <FileText className="h-16 w-16 text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold  mb-2">No Report Available</h3>
                  <p className="text-gray-600 text-center mb-6">
                    Generate a report to view comprehensive test analytics and candidate performance
                    insights.
                  </p>
                  <Button onClick={generateReport} disabled={generating}>
                    {generating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating Report...
                      </>
                    ) : (
                      <>
                        <FileText className="mr-2 h-4 w-4" />
                        Generate Report
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-6">
                {/* Report Header */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl">Test Performance Report</CardTitle>
                        <CardDescription>
                          Generated on {new Date(currentReport.generated_at).toLocaleDateString()} •
                          Test ID: {currentReport.test_id}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-2" />
                          Export
                        </Button>
                        <Button onClick={generateReport} disabled={generating} size="sm">
                          <RefreshCw className="h-4 w-4 mr-2" />
                          Refresh
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                </Card>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{currentReport.candidate_count}</div>
                      <p className="text-xs text-muted-foreground">Submitted solutions</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Average Score</CardTitle>
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(currentReport.average_score * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-muted-foreground">Overall performance</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Coding Performance</CardTitle>
                      <Code className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(currentReport.coding_performance.average_score * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {(currentReport.coding_performance.average_test_pass_rate * 100).toFixed(0)}
                        % test pass rate
                      </p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">MCQ Performance</CardTitle>
                      <Brain className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">
                        {(currentReport.mcq_performance.average_score * 100).toFixed(1)}%
                      </div>
                      <p className="text-xs text-muted-foreground">Multiple choice questions</p>
                    </CardContent>
                  </Card>
                </div>

                {/* Performance Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Score Distribution</CardTitle>
                      <CardDescription>
                        Distribution of candidate performance levels
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={[
                              {
                                name: "Excellent",
                                value: currentReport.score_distribution.excellent,
                                fill: "#10b981",
                              },
                              {
                                name: "Good",
                                value: currentReport.score_distribution.good,
                                fill: "#3b82f6",
                              },
                              // { name: "Average", value: currentReport.score_distribution.average, fill: "#f59e0b" },
                              {
                                name: "Poor",
                                value: currentReport.score_distribution.poor,
                                fill: "#ef4444",
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
                                name: "Excellent",
                                value: currentReport.score_distribution.excellent,
                                fill: "#10b981",
                              },
                              {
                                name: "Good",
                                value: currentReport.score_distribution.good,
                                fill: "#3b82f6",
                              },
                              // { name: "Average", value: currentReport.score_distribution.average, fill: "#f59e0b" },
                              {
                                name: "Poor",
                                value: currentReport.score_distribution.poor,
                                fill: "#ef4444",
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

                  <Card>
                    <CardHeader>
                      <CardTitle>Coding Metrics</CardTitle>
                      <CardDescription>Detailed coding performance breakdown</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={[
                            {
                              name: "Correctness",
                              value: currentReport.coding_performance.metrics.correctness * 100,
                            },
                            {
                              name: "Performance",
                              value: currentReport.coding_performance.metrics.performance * 100,
                            },
                            {
                              name: "Code Quality",
                              value: currentReport.coding_performance.metrics.code_quality * 100,
                            },
                            {
                              name: "Style",
                              value: currentReport.coding_performance.metrics.style * 100,
                            },
                            {
                              name: "Originality",
                              value: currentReport.coding_performance.metrics.originality * 100,
                            },
                          ]}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip
                            formatter={(value) => [`${Number(value).toFixed(1)}%`, "Score"]}
                          />
                          <Bar dataKey="value" fill="#3b82f6" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>
                </div>

                {/* Top Candidates */}
                <Card>
                  <CardHeader>
                    <CardTitle>Top Candidates</CardTitle>
                    <CardDescription>Highest performing candidates in this test</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {currentReport.top_candidates.map((candidate, index) => (
                        <motion.div
                          key={candidate.solution_id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center justify-between p-4 border rounded-lg"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                  index === 0
                                    ? "bg-yellow-100 text-yellow-800"
                                    : index === 1
                                      ? "bg-gray-100 text-gray-800"
                                      : index === 2
                                        ? "bg-orange-100 text-orange-800"
                                        : "bg-blue-100 text-blue-800"
                                }`}
                              >
                                {candidate.rank}
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">{candidate.candidate_id}</p>
                              <p className="text-sm text-gray-600">
                                Solution ID: {candidate.solution_id}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-6">
                            <div className="text-right">
                              <p className="text-sm font-medium ">
                                {(candidate.overall_score * 100).toFixed(1)}%
                              </p>
                              <p className="text-xs text-gray-600">Overall</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium ">
                                {(candidate.coding_score * 100).toFixed(1)}%
                              </p>
                              <p className="text-xs ">Coding</p>
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-medium ">
                                {candidate.coding_details.passed_tests}/
                                {candidate.coding_details.total_tests}
                              </p>
                              <p className="text-xs text-gray-600">Tests</p>
                            </div>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                router.push(
                                  `/dashboard/organization/org1/job/job1/assessments/${formId}/analytics/solution/${candidate.solution_id}`
                                )
                              }
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              View
                            </Button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsPage;
