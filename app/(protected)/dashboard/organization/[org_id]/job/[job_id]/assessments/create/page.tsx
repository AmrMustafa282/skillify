import CreateAssessmentForm from "../_components/create-assessment-form";

export default function CreateAssessmentPage() {
  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Create Assessment</h1>
      </div>
      <CreateAssessmentForm />
    </div>
  );
}
