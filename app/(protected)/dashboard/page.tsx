// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { FileText, Code, Clock } from "lucide-react";

export default function Page() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <div className="h-12 rounded-xl bg-muted/50" />
        <div className="h-12  rounded-xl bg-muted/50" />
        <div className="h-12  rounded-xl bg-muted/50" />
      </div>
      {/* <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" /> */}
      main dashboard content
      {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Demo Assessment
            </CardTitle>
            <CardDescription>
              Python Basics Assessment - Test the assessment functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                90 minutes
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4" />3 regular questions
              </div>
              <div className="flex items-center gap-2">
                <Code className="h-4 w-4" />2 coding challenges
              </div>
            </div>
            <Link href="/assessments/python-basics">
              <Button className="w-full">Take Assessment</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <div className="text-sm text-muted-foreground">
        <p>This is a demo assessment to test the assessment functionality. It includes:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Multiple choice questions</li>
          <li>Open-ended questions</li>
          <li>Coding challenges with a professional coding environment</li>
          <li>Timer functionality</li>
          <li>Progress tracking</li>
        </ul>
      </div> */}
    </div>
  );
}
