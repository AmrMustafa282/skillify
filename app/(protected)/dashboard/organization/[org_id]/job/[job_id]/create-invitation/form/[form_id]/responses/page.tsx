"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Download, Filter, BarChart, PieChart, LineChart } from "lucide-react";
import type { FormResponse } from "@/types";

export default function FormResponsesPage() {
  const router = useRouter();
  const { form_id } = useParams();
  const [responses, setResponses] = useState<FormResponse[]>([]);

  useEffect(() => {
    // In a real app, you would fetch the responses from a database
    const mockResponses: FormResponse[] = Array.from({ length: 10 }, (_, i) => ({
      id: `response-${i + 1}`,
      submittedAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      data: {
        name: `Respondent ${i + 1}`,
        email: `user${i + 1}@example.com`,
        feedback: `This is feedback from respondent ${i + 1}`,
        rating: Math.floor(Math.random() * 5) + 1,
      },
    }));

    setResponses(mockResponses);
  }, [form_id]);

  return (
    <div>
      <Button variant="ghost" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Forms
      </Button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Form {form_id} Responses</h1>
          <p className="text-muted-foreground">View and analyze form submissions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Filter className="mr-2 h-4 w-4" />
            Filter
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Responses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{responses.length}</div>
            <p className="text-xs text-muted-foreground">+2 since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">92%</div>
            <p className="text-xs text-muted-foreground">+5% since last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Average Time to Complete</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">3m 24s</div>
            <p className="text-xs text-muted-foreground">-12s since last week</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="individual" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="individual">Individual Responses</TabsTrigger>
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="charts">Charts</TabsTrigger>
        </TabsList>

        <TabsContent value="individual" className="space-y-4 py-4">
          <div className="flex items-center justify-between">
            <Input placeholder="Search responses..." className="max-w-sm" />
            <div className="text-sm text-muted-foreground">
              Showing {responses.length} responses
            </div>
          </div>

          <div className="border rounded-md">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Submission ID</TableHead>
                  <TableHead>Submitted At</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {responses.map((response) => (
                  <TableRow key={response.id}>
                    <TableCell className="font-medium">{response.id}</TableCell>
                    <TableCell>{new Date(response.submittedAt).toLocaleString()}</TableCell>
                    <TableCell>{response.data.name}</TableCell>
                    <TableCell>{response.data.email}</TableCell>
                    <TableCell>{response.data.rating} / 5</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Summary</CardTitle>
              <CardDescription>Overview of all form responses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                <div>
                  <h3 className="text-lg font-medium mb-2">Question 1: What is your name?</h3>
                  <p className="text-sm text-muted-foreground mb-2">Text responses (10)</p>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {responses.map((response) => (
                      <div key={response.id} className="text-sm p-2 bg-muted rounded-md">
                        {response.data.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Question 2: What is your email?</h3>
                  <p className="text-sm text-muted-foreground mb-2">Text responses (10)</p>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {responses.map((response) => (
                      <div key={response.id} className="text-sm p-2 bg-muted rounded-md">
                        {response.data.email}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">
                    Question 3: How would you rate our service?
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">Rating scale (1-5)</p>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-full bg-muted rounded-full h-4">
                      <div className="bg-primary h-4 rounded-full" style={{ width: "75%" }}></div>
                    </div>
                    <span className="text-sm font-medium">3.8 / 5</span>
                  </div>
                  <div className="grid grid-cols-5 gap-2 text-center text-sm">
                    <div>
                      1 ★<br />
                      (1)
                    </div>
                    <div>
                      2 ★★
                      <br />
                      (2)
                    </div>
                    <div>
                      3 ★★★
                      <br />
                      (3)
                    </div>
                    <div>
                      4 ★★★★
                      <br />
                      (2)
                    </div>
                    <div>
                      5 ★★★★★
                      <br />
                      (2)
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-2">Question 4: Please provide feedback</h3>
                  <p className="text-sm text-muted-foreground mb-2">Text responses (10)</p>
                  <div className="max-h-40 overflow-y-auto space-y-1">
                    {responses.map((response) => (
                      <div key={response.id} className="text-sm p-2 bg-muted rounded-md">
                        {response.data.feedback}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="charts" className="space-y-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-4 w-4" />
                  Rating Distribution
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Chart visualization would appear here</p>
                  <p className="text-sm">Showing distribution of ratings</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart className="mr-2 h-4 w-4" />
                  Response Frequency
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Chart visualization would appear here</p>
                  <p className="text-sm">Showing responses over time</p>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <LineChart className="mr-2 h-4 w-4" />
                  Trends Over Time
                </CardTitle>
              </CardHeader>
              <CardContent className="h-80 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <p>Chart visualization would appear here</p>
                  <p className="text-sm">Showing trends in responses over time</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
