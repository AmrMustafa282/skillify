import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default function HomePage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">My Forms</h1>
        <Link href="create-invitation/form/create">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Form
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="h-40 bg-muted flex items-center justify-center border-b">
              <span className="text-muted-foreground">Form Preview</span>
            </div>
            <div className="p-4">
              <h2 className="font-semibold text-lg mb-1">Sample Form {i + 1}</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Last edited: {new Date().toLocaleDateString()}
              </p>
              <div className="flex gap-2">
                <Link href={`create-invitation/form/${i + 1}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Link href={`create-invitation/form/${i + 1}/responses`}>
                  <Button variant="outline" size="sm">
                    Responses
                  </Button>
                </Link>
                <Link href={`create-invitation/form/${i + 1}/preview`}>
                  <Button variant="outline" size="sm">
                    Preview
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
