import Link from "next/link";
import { Code, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CodingProblemsPage({
  params,
}: {
  params: { org_id: string; job_id: string; assessment_id: string };
}) {
  const basePath = `/dashboard/organization/${params.org_id}/job/${params.job_id}/assessments/${params.assessment_id}/code`;

  const problems = [
    {
      id: "1",
      title: "Array Sum Problem",
      language: "JavaScript",
      difficulty: "Easy",
      createdAt: "2023-04-15",
      submissions: 45,
    },
    {
      id: "2",
      title: "String Manipulation",
      language: "Python",
      difficulty: "Medium",
      createdAt: "2023-04-10",
      submissions: 32,
    },
    {
      id: "3",
      title: "Binary Search Tree",
      language: "Java",
      difficulty: "Hard",
      createdAt: "2023-04-05",
      submissions: 18,
    },
    {
      id: "4",
      title: "Linked List Reversal",
      language: "C++",
      difficulty: "Medium",
      createdAt: "2023-03-28",
      submissions: 27,
    },
    {
      id: "5",
      title: "Dynamic Programming Challenge",
      language: "JavaScript",
      difficulty: "Hard",
      createdAt: "2023-03-20",
      submissions: 15,
    },
    {
      id: "6",
      title: "Graph Traversal",
      language: "Python",
      difficulty: "Medium",
      createdAt: "2023-03-15",
      submissions: 22,
    },
    {
      id: "7",
      title: "Sorting Algorithm",
      language: "Java",
      difficulty: "Easy",
      createdAt: "2023-03-10",
      submissions: 38,
    },
    {
      id: "8",
      title: "Hash Table Implementation",
      language: "C++",
      difficulty: "Medium",
      createdAt: "2023-03-05",
      submissions: 19,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Coding Problems</h2>
        <Link href={`${basePath}/create`}>
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Problem
          </Button>
        </Link>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search problems..." className="pl-8" />
        </div>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="java">Java</SelectItem>
            <SelectItem value="cpp">C++</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all">
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Difficulties</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-md border">
        <div className="grid grid-cols-6 p-4 font-medium border-b">
          <div className="col-span-2">Title</div>
          <div>Language</div>
          <div>Difficulty</div>
          <div>Submissions</div>
          <div></div>
        </div>
        {problems.map((problem) => (
          <div
            key={problem.id}
            className="grid grid-cols-6 p-4 items-center border-b last:border-0"
          >
            <div className="col-span-2 font-medium flex items-center gap-2">
              <Code className="h-4 w-4 text-muted-foreground" />
              {problem.title}
            </div>
            <div>{problem.language}</div>
            <div>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                  problem.difficulty === "Easy"
                    ? "bg-green-100 text-green-800"
                    : problem.difficulty === "Medium"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {problem.difficulty}
              </span>
            </div>
            <div>{problem.submissions}</div>
            <div className="flex justify-end gap-2">
              <Link href={`${basePath}/problems/${problem.id}`}>
                <Button variant="outline" size="sm">
                  View
                </Button>
              </Link>
              <Link href={`${basePath}/problems/${problem.id}/edit`}>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
