"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ComposedChart,
  Legend,
  Line,
  Pie,
  PieChart,
  RadialBar,
  RadialBarChart,
  RadarChart,
  Radar,
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BrainCircuit,
  CheckCircle2,
  Clock,
  LineChartIcon,
  RadarIcon,
  RefreshCw,
  Users,
} from "lucide-react";

// Sample assessment data
const skillsData = [
  { name: "Problem Solving", value: 78, fill: "hsl(var(--chart-1))" },
  { name: "Communication", value: 85, fill: "hsl(var(--chart-2))" },
  { name: "Technical", value: 65, fill: "hsl(var(--chart-3))" },
  { name: "Leadership", value: 72, fill: "hsl(var(--chart-4))" },
  { name: "Creativity", value: 80, fill: "hsl(var(--chart-5))" },
];

const completionData = [
  { name: "Completed", value: 78, fill: "hsl(var(--chart-3))" },
  { name: "In Progress", value: 15, fill: "hsl(var(--chart-2))" },
  { name: "Not Started", value: 7, fill: "hsl(var(--chart-5))" },
];

const timeData = [{ name: "Avg. Time", value: 18, fill: "hsl(var(--chart-4))" }];

const performanceData = [
  { month: "Jan", score: 65, benchmark: 60, candidates: 120 },
  { month: "Feb", score: 68, benchmark: 62, candidates: 150 },
  { month: "Mar", score: 72, benchmark: 65, candidates: 200 },
  { month: "Apr", score: 75, benchmark: 68, candidates: 220 },
  { month: "May", score: 82, benchmark: 70, candidates: 280 },
  { month: "Jun", score: 87, benchmark: 72, candidates: 250 },
];

const radarData = [
  { subject: "Problem Solving", A: 85, B: 65, fullMark: 100 },
  { subject: "Communication", A: 90, B: 75, fullMark: 100 },
  { subject: "Technical", A: 75, B: 80, fullMark: 100 },
  { subject: "Leadership", A: 80, B: 70, fullMark: 100 },
  { subject: "Creativity", A: 85, B: 60, fullMark: 100 },
  { subject: "Teamwork", A: 95, B: 85, fullMark: 100 },
];

// Chart types
const CHART_TYPES = [
  { id: "performance", label: "Performance", icon: LineChartIcon },
  { id: "skills", label: "Skills Gap", icon: RadarIcon },
  { id: "completion", label: "Completion", icon: CheckCircle2 },
  { id: "time", label: "Time Analysis", icon: Clock },
  { id: "candidates", label: "Candidates", icon: Users },
];

// Custom tooltip component to avoid null/undefined issues
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  return (
    <div className="bg-background/95 border rounded-md shadow-md p-2 text-sm">
      {label && <p className="font-medium">{label}</p>}
      {payload.map((entry, index) => (
        <div key={`item-${index}`} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
          <span>
            {entry.name}: {entry.value}
            {entry.unit || ""}
          </span>
        </div>
      ))}
    </div>
  );
};

export function HeroChart() {
  const [activeChart, setActiveChart] = useState("performance");
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Set mounted state to true after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Auto-rotate charts
  useEffect(() => {
    if (!mounted) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setActiveChart((current) => {
          const currentIndex = CHART_TYPES.findIndex((chart) => chart.id === current);
          const nextIndex = (currentIndex + 1) % CHART_TYPES.length;
          return CHART_TYPES[nextIndex].id;
        });
        setIsAnimating(false);
      }, 500);
    }, 8000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Don't render until component is mounted to avoid hydration issues
  if (!mounted) {
    return (
      <div className="w-full h-[300px] sm:h-[350px] md:h-[400px] flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BrainCircuit className="h-5 w-5 text-primary" />
          <h3 className="text-lg font-semibold">Assessment Analytics</h3>
        </div>
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex gap-2">
            {CHART_TYPES.map((chart) => (
              <Button
                key={chart.id}
                variant={activeChart === chart.id ? "default" : "outline"}
                size="sm"
                className="gap-1.5"
                onClick={() => {
                  setIsAnimating(true);
                  setTimeout(() => {
                    setActiveChart(chart.id);
                    setIsAnimating(false);
                  }, 300);
                }}
              >
                <chart.icon className="h-3.5 w-3.5" />
                <span className="hidden md:inline">{chart.label}</span>
              </Button>
            ))}
          </div>
          <div className="sm:hidden">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setActiveChart((current) => {
                    const currentIndex = CHART_TYPES.findIndex((chart) => chart.id === current);
                    const nextIndex = (currentIndex + 1) % CHART_TYPES.length;
                    return CHART_TYPES[nextIndex].id;
                  });
                  setIsAnimating(false);
                }, 300);
              }}
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Change View</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="relative h-[300px] sm:h-[350px] md:h-[350px]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 0 : 1 }}
          transition={{ duration: 0.3 }}
          className="w-full h-full"
        >
          {activeChart === "performance" && (
            <div className="w-full h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10">
                    <span className="text-xs font-medium">Average Score: 74.8%</span>
                  </Badge>
                  <Badge variant="outline" className="bg-primary/10">
                    <span className="text-xs font-medium">Trend: +12.5%</span>
                  </Badge>
                </div>
              </div>
              <div className="w-full h-[calc(100%-30px)]">
                <ResponsiveContainer width="99%" height="100%">
                  <ComposedChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" domain={[0, 100]} />
                    <YAxis yAxisId="right" orientation="right" domain={[0, 300]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="score"
                      name="Candidate Score"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={3}
                      dot={{ r: 6, strokeWidth: 2 }}
                      activeDot={{ r: 8 }}
                      animationDuration={2000}
                    />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="benchmark"
                      name="Industry Benchmark"
                      stroke="hsl(var(--chart-4))"
                      strokeWidth={2}
                      strokeDasharray="5 5"
                      dot={{ r: 4 }}
                      animationDuration={2000}
                      animationBegin={300}
                    />
                    <Bar
                      yAxisId="right"
                      dataKey="candidates"
                      name="Candidates"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.3}
                      radius={[4, 4, 0, 0]}
                      animationDuration={2000}
                      animationBegin={600}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeChart === "skills" && (
            <div className="w-full h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10">
                    <span className="text-xs font-medium">Skills Gap Analysis</span>
                  </Badge>
                </div>
              </div>
              <div className="w-full h-[calc(100%-30px)]">
                <ResponsiveContainer width="99%" height="100%">
                  <RadarChart outerRadius="70%" data={radarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis domain={[0, 100]} />
                    <Radar
                      name="Top Performers"
                      dataKey="A"
                      stroke="hsl(var(--chart-2))"
                      fill="hsl(var(--chart-2))"
                      fillOpacity={0.5}
                      animationDuration={2000}
                    />
                    <Radar
                      name="Average Performers"
                      dataKey="B"
                      stroke="hsl(var(--chart-5))"
                      fill="hsl(var(--chart-5))"
                      fillOpacity={0.3}
                      animationDuration={2000}
                      animationBegin={500}
                    />
                    <Legend />
                    <Tooltip content={<CustomTooltip />} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeChart === "completion" && (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="w-full h-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10">
                      <span className="text-xs font-medium">Completion Rate: 78%</span>
                    </Badge>
                  </div>
                </div>
                <div className="w-full h-[calc(100%-30px)]">
                  <ResponsiveContainer width="99%" height="100%">
                    <PieChart>
                      <Pie
                        data={completionData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        nameKey="name"
                        animationDuration={2000}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        labelLine={false}
                      >
                        {completionData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                      </Pie>
                      <Tooltip content={<CustomTooltip />} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="w-full h-full">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-primary/10">
                      <span className="text-xs font-medium">Monthly Trend</span>
                    </Badge>
                  </div>
                </div>
                <div className="w-full h-[calc(100%-30px)]">
                  <ResponsiveContainer width="99%" height="100%">
                    <AreaChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" opacity={0.7} />
                      <XAxis dataKey="month" />
                      <YAxis domain={[50, 100]} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="score"
                        name="Completion Rate"
                        stroke="hsl(var(--chart-3))"
                        fill="hsl(var(--chart-3))"
                        fillOpacity={0.5}
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {activeChart === "time" && (
            <div className="w-full h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10">
                    <span className="text-xs font-medium">Average Completion Time: 18 minutes</span>
                  </Badge>
                </div>
              </div>
              <div className="w-full h-[calc(100%-30px)]">
                <ResponsiveContainer width="99%" height="100%">
                  <RadialBarChart
                    cx="50%"
                    cy="50%"
                    innerRadius="20%"
                    outerRadius="80%"
                    barSize={20}
                    data={timeData}
                    startAngle={180}
                    endAngle={0}
                  >
                    <RadialBar
                      background
                      clockWise={true}
                      dataKey="value"
                      cornerRadius={30}
                      fill="hsl(var(--chart-4))"
                      animationDuration={2000}
                      label={{
                        position: "center",
                        fill: "hsl(var(--foreground))",
                        fontSize: 32,
                        fontWeight: "bold",
                        formatter: (value) => `${value} min`,
                      }}
                    />
                    <PolarAngleAxis type="number" domain={[0, 30]} tick={false} />
                    <Tooltip content={<CustomTooltip />} />
                  </RadialBarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {activeChart === "candidates" && (
            <div className="w-full h-full">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10">
                    <span className="text-xs font-medium">Candidate Distribution by Skill</span>
                  </Badge>
                </div>
              </div>
              <div className="w-full h-[calc(100%-30px)]">
                <ResponsiveContainer width="99%" height="100%">
                  <BarChart data={skillsData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                    <XAxis type="number" domain={[0, 100]} />
                    <YAxis dataKey="name" type="category" width={100} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar
                      dataKey="value"
                      name="Score"
                      animationDuration={2000}
                      radius={[0, 4, 4, 0]}
                      label={{ position: "right", formatter: (value) => `${value}%` }}
                    >
                      {skillsData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </motion.div>
      </div>

      <div className="flex items-center justify-center mt-4 sm:hidden">
        <div className="flex gap-2">
          {CHART_TYPES.map((chart) => (
            <Button
              key={chart.id}
              variant="ghost"
              size="sm"
              className={`w-2 h-2 p-0 rounded-full ${activeChart === chart.id ? "bg-primary" : "bg-muted"}`}
              onClick={() => {
                setIsAnimating(true);
                setTimeout(() => {
                  setActiveChart(chart.id);
                  setIsAnimating(false);
                }, 300);
              }}
            >
              <span className="sr-only">{chart.label}</span>
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
