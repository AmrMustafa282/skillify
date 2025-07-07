"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart3, LineChartIcon, PieChart, RadarIcon, Users } from "lucide-react";

// Sample assessment data
const scoreDistributionData = [
  { score: "0-10", count: 5, fill: "hsl(var(--chart-1))" },
  { score: "11-20", count: 8, fill: "hsl(var(--chart-1))" },
  { score: "21-30", count: 12, fill: "hsl(var(--chart-1))" },
  { score: "31-40", count: 18, fill: "hsl(var(--chart-1))" },
  { score: "41-50", count: 25, fill: "hsl(var(--chart-1))" },
  { score: "51-60", count: 32, fill: "hsl(var(--chart-2))" },
  { score: "61-70", count: 45, fill: "hsl(var(--chart-2))" },
  { score: "71-80", count: 38, fill: "hsl(var(--chart-3))" },
  { score: "81-90", count: 22, fill: "hsl(var(--chart-4))" },
  { score: "91-100", count: 15, fill: "hsl(var(--chart-5))" },
];

const completionRateData = [
  { month: "Jan", completed: 65, abandoned: 35 },
  { month: "Feb", completed: 68, abandoned: 32 },
  { month: "Mar", completed: 72, abandoned: 28 },
  { month: "Apr", completed: 75, abandoned: 25 },
  { month: "May", completed: 82, abandoned: 18 },
  { month: "Jun", completed: 87, abandoned: 13 },
];

const timeToCompleteData = [
  { time: "<10 min", count: 12 },
  { time: "10-15 min", count: 28 },
  { time: "15-20 min", count: 45 },
  { time: "20-25 min", count: 32 },
  { time: "25-30 min", count: 18 },
  { time: ">30 min", count: 8 },
];

const skillsAnalysisData = [
  { skill: "Problem Solving", candidate: 75, benchmark: 80 },
  { skill: "Communication", candidate: 85, benchmark: 75 },
  { skill: "Technical", candidate: 65, benchmark: 70 },
  { skill: "Leadership", candidate: 70, benchmark: 65 },
  { skill: "Creativity", candidate: 80, benchmark: 60 },
  { skill: "Teamwork", candidate: 90, benchmark: 85 },
];

const candidateProgressData = [
  { day: "Mon", invited: 45, started: 38, completed: 32 },
  { day: "Tue", invited: 52, started: 45, completed: 38 },
  { day: "Wed", invited: 48, started: 42, completed: 36 },
  { day: "Thu", invited: 61, started: 52, completed: 45 },
  { day: "Fri", invited: 55, started: 48, completed: 40 },
  { day: "Sat", invited: 28, started: 22, completed: 18 },
  { day: "Sun", invited: 25, started: 18, completed: 15 },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

export function AssessmentAnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="w-full overflow-x-hidden">
      <Tabs
        defaultValue="overview"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-5 mb-4">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            <span className="hidden sm:inline">Overview</span>
          </TabsTrigger>
          <TabsTrigger value="scores" className="flex items-center gap-2">
            <LineChartIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Scores</span>
          </TabsTrigger>
          <TabsTrigger value="completion" className="flex items-center gap-2">
            <PieChart className="h-4 w-4" />
            <span className="hidden sm:inline">Completion</span>
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <RadarIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Skills</span>
          </TabsTrigger>
          <TabsTrigger value="candidates" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="hidden sm:inline">Candidates</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-0 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Score Distribution</CardTitle>
                  <CardDescription>Candidate performance across all assessments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] md:h-[250px]">
                    <ChartContainer
                      config={{
                        count: {
                          label: "Candidates",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <BarChart data={scoreDistributionData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="score" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={1500}>
                            {scoreDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Skills Analysis</CardTitle>
                  <CardDescription>Candidate vs. Benchmark comparison</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] md:h-[250px]">
                    <ChartContainer
                      config={{
                        candidate: {
                          label: "Candidate",
                          color: "hsl(var(--chart-2))",
                        },
                        benchmark: {
                          label: "Benchmark",
                          color: "hsl(var(--chart-4))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <RadarChart outerRadius={80} data={skillsAnalysisData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" />
                          <Radar
                            name="Candidate"
                            dataKey="candidate"
                            stroke="hsl(var(--chart-2))"
                            fill="hsl(var(--chart-2))"
                            fillOpacity={0.5}
                            animationDuration={1500}
                          />
                          <Radar
                            name="Benchmark"
                            dataKey="benchmark"
                            stroke="hsl(var(--chart-4))"
                            fill="hsl(var(--chart-4))"
                            fillOpacity={0.3}
                            animationDuration={1500}
                            animationBegin={300}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="scores" className="mt-0 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Detailed Score Distribution</CardTitle>
                  <CardDescription>Performance breakdown by score ranges</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] md:h-[350px]">
                    <ChartContainer
                      config={{
                        count: {
                          label: "Candidates",
                          color: "hsl(var(--chart-1))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <BarChart data={scoreDistributionData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="score" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar dataKey="count" radius={[4, 4, 0, 0]} animationDuration={1500}>
                            {scoreDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="completion" className="mt-0 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Completion Rates</CardTitle>
                  <CardDescription>Monthly assessment completion trends</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] md:h-[250px]">
                    <ChartContainer
                      config={{
                        completed: {
                          label: "Completed",
                          color: "hsl(var(--chart-3))",
                        },
                        abandoned: {
                          label: "Abandoned",
                          color: "hsl(var(--chart-5))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <AreaChart data={completionRateData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Area
                            type="monotone"
                            dataKey="completed"
                            stackId="1"
                            stroke="hsl(var(--chart-3))"
                            fill="hsl(var(--chart-3))"
                            animationDuration={1500}
                          />
                          <Area
                            type="monotone"
                            dataKey="abandoned"
                            stackId="1"
                            stroke="hsl(var(--chart-5))"
                            fill="hsl(var(--chart-5))"
                            animationDuration={1500}
                            animationBegin={300}
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Time to Complete</CardTitle>
                  <CardDescription>Assessment duration distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[200px] md:h-[250px]">
                    <ChartContainer
                      config={{
                        count: {
                          label: "Candidates",
                          color: "hsl(var(--chart-2))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <BarChart data={timeToCompleteData}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Bar
                            dataKey="count"
                            fill="hsl(var(--chart-2))"
                            radius={[4, 4, 0, 0]}
                            animationDuration={1500}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="skills" className="mt-0 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    Comprehensive Skills Analysis
                  </CardTitle>
                  <CardDescription>Candidate performance vs. industry benchmarks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] md:h-[350px]">
                    <ChartContainer
                      config={{
                        candidate: {
                          label: "Candidate",
                          color: "hsl(var(--chart-2))",
                        },
                        benchmark: {
                          label: "Benchmark",
                          color: "hsl(var(--chart-4))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <RadarChart outerRadius={130} data={skillsAnalysisData}>
                          <PolarGrid />
                          <PolarAngleAxis dataKey="skill" />
                          <Radar
                            name="Candidate"
                            dataKey="candidate"
                            stroke="hsl(var(--chart-2))"
                            fill="hsl(var(--chart-2))"
                            fillOpacity={0.5}
                            animationDuration={1500}
                          />
                          <Radar
                            name="Benchmark"
                            dataKey="benchmark"
                            stroke="hsl(var(--chart-4))"
                            fill="hsl(var(--chart-4))"
                            fillOpacity={0.3}
                            animationDuration={1500}
                            animationBegin={300}
                          />
                          <Tooltip />
                        </RadarChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>

        <TabsContent value="candidates" className="mt-0 w-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="w-full"
          >
            <motion.div variants={itemVariants}>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">Candidate Progress</CardTitle>
                  <CardDescription>Weekly invitation to completion funnel</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-[300px] md:h-[350px]">
                    <ChartContainer
                      config={{
                        invited: {
                          label: "Invited",
                          color: "hsl(var(--chart-1))",
                        },
                        started: {
                          label: "Started",
                          color: "hsl(var(--chart-3))",
                        },
                        completed: {
                          label: "Completed",
                          color: "hsl(var(--chart-5))",
                        },
                      }}
                    >
                      <ResponsiveContainer width="99%" height="100%">
                        <LineChart data={candidateProgressData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="day" />
                          <YAxis />
                          <ChartTooltip content={<ChartTooltipContent />} />
                          <Line
                            type="monotone"
                            dataKey="invited"
                            stroke="hsl(var(--chart-1))"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1500}
                          />
                          <Line
                            type="monotone"
                            dataKey="started"
                            stroke="hsl(var(--chart-3))"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1500}
                            animationBegin={300}
                          />
                          <Line
                            type="monotone"
                            dataKey="completed"
                            stroke="hsl(var(--chart-5))"
                            strokeWidth={2}
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                            animationDuration={1500}
                            animationBegin={600}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </ChartContainer>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
