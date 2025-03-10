"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function EditFormPage() {
  const router = useRouter();
  const { id } = useParams();

  useEffect(() => {
    // In a real app, you would fetch the form data from a database here
    console.log(`Fetching form with ID: ${id}`);
  }, [id]);

  return (
    <div className="container mx-auto py-6">
      <Button variant="ghost" onClick={() => router.push("/")} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Forms
      </Button>

      <div className="flex items-center justify-center h-[60vh]">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Edit Form {id}</h1>
          <p className="text-muted-foreground mb-6">
            This is a placeholder for the form editor. In a real application, this would load the
            form data and allow you to edit it.
          </p>
          <Button onClick={() => router.push("create")}>Go to Form Builder</Button>
        </div>
      </div>
    </div>
  );
}
