"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Save,
  Plus,
  AlignLeft,
  FileText,
  CircleDot,
  Upload,
  Mail,
  Phone,
  Hash,
  Link as LinkIcon,
  Star,
  BarChart3,
  Calendar,
  Clock
} from "lucide-react";
import { InvitationElementType, InvitationFormElement, InvitationFormData } from "@/types/index";
import { InvitationsAPI } from "@/lib/api/invitations";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { FormElementEditor } from "../_components/form-element-editor";
import { FormPreview } from "../_components/form-preview";

export default function CreateInvitationFormPage() {
  const params = useParams();
  const router = useRouter();
  const [formData, setFormData] = useState<InvitationFormData>({
    title: "",
    description: "",
    elements: []
  });
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const orgId = params.org_id as string;
  const jobId = params.job_id as string;

  const addFormElement = (type: InvitationElementType) => {
    const newElement: InvitationFormElement = {
      id: `element_${Date.now()}`,
      type,
      question: getDefaultQuestion(type),
      required: false,
      order: formData.elements.length + 1,
      ...(type === InvitationElementType.MULTIPLE_CHOICE ||
         type === InvitationElementType.CHECKBOX ||
         type === InvitationElementType.DROPDOWN ? {
        options: [
          { id: `option_${Date.now()}_1`, text: "Option 1", order: 1 },
          { id: `option_${Date.now()}_2`, text: "Option 2", order: 2 }
        ]
      } : {}),
      ...(type === InvitationElementType.RATING ||
         type === InvitationElementType.LINEAR_SCALE ? {
        scale: { min: 1, max: 5, minLabel: "Poor", maxLabel: "Excellent" }
      } : {}),
      ...(type === InvitationElementType.FILE_UPLOAD ? {
        fileSettings: {
          allowedTypes: [".pdf", ".doc", ".docx"],
          maxSize: 10,
          maxFiles: 1
        }
      } : {})
    } as InvitationFormElement;

    setFormData(prev => ({
      ...prev,
      elements: [...prev.elements, newElement]
    }));
  };

  const getDefaultQuestion = (type: InvitationElementType): string => {
    switch (type) {
      case InvitationElementType.SHORT_TEXT: return "What is your name?";
      case InvitationElementType.LONG_TEXT: return "Tell us about yourself";
      case InvitationElementType.EMAIL: return "What is your email address?";
      case InvitationElementType.PHONE: return "What is your phone number?";
      case InvitationElementType.MULTIPLE_CHOICE: return "What is your preferred work arrangement?";
      case InvitationElementType.CHECKBOX: return "Which skills do you have? (Select all that apply)";
      case InvitationElementType.DROPDOWN: return "What is your experience level?";
      case InvitationElementType.FILE_UPLOAD: return "Please upload your resume";
      case InvitationElementType.DATE: return "What is your available start date?";
      case InvitationElementType.TIME: return "What is your preferred interview time?";
      case InvitationElementType.NUMBER: return "How many years of experience do you have?";
      case InvitationElementType.RATING: return "How would you rate your proficiency in this skill?";
      case InvitationElementType.LINEAR_SCALE: return "How interested are you in this position?";
      case InvitationElementType.URL: return "What is your LinkedIn profile URL?";
      default: return "New Question";
    }
  };

  const updateElement = (id: string, updates: Partial<InvitationFormElement>) => {
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.map(el =>
        el.id === id ? { ...el, ...updates } : el
      )
    }));
  };

  const deleteElement = (id: string) => {
    setFormData(prev => ({
      ...prev,
      elements: prev.elements.filter(el => el.id !== id)
    }));
  };

  const duplicateElement = (id: string) => {
    const element = formData.elements.find(el => el.id === id);
    if (element) {
      const newElement = {
        ...element,
        id: `element_${Date.now()}`,
        question: `${element.question} (Copy)`,
        order: formData.elements.length + 1
      };
      setFormData(prev => ({
        ...prev,
        elements: [...prev.elements, newElement]
      }));
    }
  };

  const handleSave = async () => {
    if (!formData.title.trim()) {
      toast.error("Please enter a form title");
      return;
    }

    if (formData.elements.length === 0) {
      toast.error("Please add at least one question");
      return;
    }

    setSaving(true);
    try {
      const response = await InvitationsAPI.createInvitationForm(orgId, jobId, {
        title: formData.title,
        description: formData.description,
        jobId,
        organizationId: orgId,
        elements: formData.elements,
        settings: {
          collectEmail: true,
          limitResponses: false,
          responseLimit: 0,
          showProgressBar: true,
          shuffleQuestions: false,
          confirmationMessage: "Thank you for your application!",
          redirectUrl: "",
          theme: "default",
          headerColor: "#000000",
          fontFamily: "Inter",
          allowAnonymous: false,
          requireLogin: false,
          notifyOnSubmission: true
        },
        status: 'draft',
        isActive: true
      });

      if (response.success) {
        toast.success("Form created successfully!");
        router.push(`/dashboard/organization/${orgId}/job/${jobId}/invitations`);
      } else {
        toast.error(response.error || "Failed to create form");
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to create form");
    } finally {
      setSaving(false);
    }
  };

  const getElementIcon = (type: InvitationElementType) => {
    switch (type) {
      case InvitationElementType.SHORT_TEXT: return <AlignLeft className="h-4 w-4" />;
      case InvitationElementType.LONG_TEXT: return <FileText className="h-4 w-4" />;
      case InvitationElementType.EMAIL: return <Mail className="h-4 w-4" />;
      case InvitationElementType.PHONE: return <Phone className="h-4 w-4" />;
      case InvitationElementType.MULTIPLE_CHOICE: return <CircleDot className="h-4 w-4" />;
      case InvitationElementType.CHECKBOX: return <CircleDot className="h-4 w-4" />;
      case InvitationElementType.DROPDOWN: return <CircleDot className="h-4 w-4" />;
      case InvitationElementType.FILE_UPLOAD: return <Upload className="h-4 w-4" />;
      case InvitationElementType.DATE: return <Calendar className="h-4 w-4" />;
      case InvitationElementType.TIME: return <Clock className="h-4 w-4" />;
      case InvitationElementType.NUMBER: return <Hash className="h-4 w-4" />;
      case InvitationElementType.RATING: return <Star className="h-4 w-4" />;
      case InvitationElementType.LINEAR_SCALE: return <BarChart3 className="h-4 w-4" />;
      case InvitationElementType.URL: return <LinkIcon className="h-4 w-4" />;
      default: return <AlignLeft className="h-4 w-4" />;
    }
  };

  const getElementLabel = (type: InvitationElementType) => {
    switch (type) {
      case InvitationElementType.SHORT_TEXT: return "Short Answer";
      case InvitationElementType.LONG_TEXT: return "Long Answer";
      case InvitationElementType.EMAIL: return "Email";
      case InvitationElementType.PHONE: return "Phone";
      case InvitationElementType.MULTIPLE_CHOICE: return "Multiple Choice";
      case InvitationElementType.CHECKBOX: return "Checkboxes";
      case InvitationElementType.DROPDOWN: return "Dropdown";
      case InvitationElementType.FILE_UPLOAD: return "File Upload";
      case InvitationElementType.DATE: return "Date";
      case InvitationElementType.TIME: return "Time";
      case InvitationElementType.NUMBER: return "Number";
      case InvitationElementType.RATING: return "Rating";
      case InvitationElementType.LINEAR_SCALE: return "Linear Scale";
      case InvitationElementType.URL: return "Website URL";
      default: return "Question";
    }
  };

  if (previewMode) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setPreviewMode(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editor
            </Button>
            <h1 className="text-2xl font-bold">Form Preview</h1>
          </div>
        </div>
        <FormPreview
          title={formData.title || "Untitled Form"}
          description={formData.description}
          elements={formData.elements}
        />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-full">
      {/* Main Editor */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* <Link href={`/dashboard/organization/${orgId}/job/${jobId}/invitations`}>
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
            </Link> */}
            <h1 className="text-2xl font-bold">Create Invitation Form</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" onClick={() => setPreviewMode(true)}>
              Preview
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Form"}
            </Button>
          </div>
        </div>

        {/* Form Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Form Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="title">Form Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                placeholder="e.g., Software Engineer Application"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Brief description of this application form..."
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Form Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Questions ({formData.elements.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {formData.elements.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No questions added yet</p>
                <p className="text-sm">Use the sidebar to add your first question</p>
              </div>
            ) : (
              <div className="space-y-4">
                {formData.elements.map((element, index) => (
                  <motion.div
                    key={element.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <FormElementEditor
                      element={element}
                      updateElement={updateElement}
                      deleteElement={deleteElement}
                      duplicateElement={duplicateElement}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-4 w-4 mr-2" />
              Add Questions
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {/* Basic Input Types */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Basic</h4>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.SHORT_TEXT)}
              >
                {getElementIcon(InvitationElementType.SHORT_TEXT)}
                <span className="ml-2">{getElementLabel(InvitationElementType.SHORT_TEXT)}</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.LONG_TEXT)}
              >
                {getElementIcon(InvitationElementType.LONG_TEXT)}
                <span className="ml-2">{getElementLabel(InvitationElementType.LONG_TEXT)}</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.EMAIL)}
              >
                {getElementIcon(InvitationElementType.EMAIL)}
                <span className="ml-2">{getElementLabel(InvitationElementType.EMAIL)}</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.PHONE)}
              >
                {getElementIcon(InvitationElementType.PHONE)}
                <span className="ml-2">{getElementLabel(InvitationElementType.PHONE)}</span>
              </Button>
            </div>

            {/* Choice Types */}
            <div className="space-y-2 pt-4">
              <h4 className="text-sm font-medium text-muted-foreground">Choices</h4>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.MULTIPLE_CHOICE)}
              >
                {getElementIcon(InvitationElementType.MULTIPLE_CHOICE)}
                <span className="ml-2">{getElementLabel(InvitationElementType.MULTIPLE_CHOICE)}</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.CHECKBOX)}
              >
                {getElementIcon(InvitationElementType.CHECKBOX)}
                <span className="ml-2">{getElementLabel(InvitationElementType.CHECKBOX)}</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.DROPDOWN)}
              >
                {getElementIcon(InvitationElementType.DROPDOWN)}
                <span className="ml-2">{getElementLabel(InvitationElementType.DROPDOWN)}</span>
              </Button>
            </div>

            {/* Advanced Types */}
            <div className="space-y-2 pt-4">
              <h4 className="text-sm font-medium text-muted-foreground">Advanced</h4>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.FILE_UPLOAD)}
              >
                {getElementIcon(InvitationElementType.FILE_UPLOAD)}
                <span className="ml-2">{getElementLabel(InvitationElementType.FILE_UPLOAD)}</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.RATING)}
              >
                {getElementIcon(InvitationElementType.RATING)}
                <span className="ml-2">{getElementLabel(InvitationElementType.RATING)}</span>
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => addFormElement(InvitationElementType.DATE)}
              >
                {getElementIcon(InvitationElementType.DATE)}
                <span className="ml-2">{getElementLabel(InvitationElementType.DATE)}</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Examples */}
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Common Questions</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground space-y-1">
            <p>• Personal: Name, Email, Phone</p>
            <p>• Experience: Years, Skills, Portfolio</p>
            <p>• Preferences: Salary, Location, Start Date</p>
            <p>• Documents: Resume, Cover Letter</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
