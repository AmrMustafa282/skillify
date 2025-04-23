import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddCodingPage({
  params,
}: {
  params: { org_id: string; job_id: string; form_id: string };
}) {
  const languages = [
    {
      name: "JavaScript",
      icon: "🟨",
      description: "Create JavaScript coding challenges with Node.js runtime",
    },
    {
      name: "Python",
      icon: "🐍",
      description: "Create Python coding challenges with test-driven development",
    },
    {
      name: "Java",
      icon: "☕",
      description: "Create Java coding challenges with JUnit testing framework",
    },
    {
      name: "C++",
      icon: "🔷",
      description: "Create C++ coding challenges with modern C++ features",
    },
    { name: "Ruby", icon: "💎", description: "Create Ruby coding challenges with RSpec testing" },
    {
      name: "Go",
      icon: "🔵",
      description: "Create Go coding challenges with built-in testing package",
    },
  ];

  const basePath = `/dashboard/organization/${params.org_id}/job/${params.job_id}/assessments/${params.form_id}/code`;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight mb-2">Add Coding Assessment</h1>
        <p className="text-muted-foreground">
          Choose a template to get started or create a custom coding challenge from scratch.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {languages.map((language) => (
          <Card key={language.name} className="transition-all hover:shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="text-2xl">{language.icon}</span> {language.name}
              </CardTitle>
              <CardDescription>{language.description}</CardDescription>
            </CardHeader>
            <CardFooter>
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

      <div className="flex justify-center">
        <Link href={`${basePath}/create`}>
          <Button variant="outline" size="lg">
            Create Custom Challenge
          </Button>
        </Link>
      </div>
    </div>
  );
}
