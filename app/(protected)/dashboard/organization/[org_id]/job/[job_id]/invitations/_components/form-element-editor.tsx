"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreVertical,
  Trash2,
  Copy,
  Plus,
  X,
  GripVertical,
  Mail,
  Phone,
  Hash,
  Link as LinkIcon,
  Star,
  BarChart3,
  Calendar,
  Clock,
  Upload,
  AlignLeft,
  FileText,
  CircleDot
} from "lucide-react";
import { InvitationElementType, InvitationFormElement, InvitationQuestionOption } from "@/types/index";

interface FormElementEditorProps {
  element: InvitationFormElement;
  updateElement: (id: string, updates: Partial<InvitationFormElement>) => void;
  deleteElement: (id: string) => void;
  duplicateElement: (id: string) => void;
}

export function FormElementEditor({ 
  element, 
  updateElement, 
  deleteElement, 
  duplicateElement 
}: FormElementEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

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

  const getElementTypeName = (type: InvitationElementType) => {
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

  const hasOptions = (type: InvitationElementType) => {
    return [
      InvitationElementType.MULTIPLE_CHOICE,
      InvitationElementType.CHECKBOX,
      InvitationElementType.DROPDOWN
    ].includes(type);
  };

  const hasScale = (type: InvitationElementType) => {
    return [
      InvitationElementType.RATING,
      InvitationElementType.LINEAR_SCALE
    ].includes(type);
  };

  const hasFileSettings = (type: InvitationElementType) => {
    return type === InvitationElementType.FILE_UPLOAD;
  };

  const addOption = () => {
    if (!hasOptions(element.type)) return;
    
    const choiceElement = element as any;
    const newOption: InvitationQuestionOption = {
      id: `option_${Date.now()}`,
      text: `Option ${(choiceElement.options?.length || 0) + 1}`,
      order: (choiceElement.options?.length || 0) + 1
    };

    updateElement(element.id, {
      options: [...(choiceElement.options || []), newOption]
    });
  };

  const updateOption = (optionId: string, text: string) => {
    const choiceElement = element as any;
    const updatedOptions = choiceElement.options?.map((opt: InvitationQuestionOption) =>
      opt.id === optionId ? { ...opt, text } : opt
    ) || [];

    updateElement(element.id, { options: updatedOptions });
  };

  const removeOption = (optionId: string) => {
    const choiceElement = element as any;
    const updatedOptions = choiceElement.options?.filter((opt: InvitationQuestionOption) =>
      opt.id !== optionId
    ) || [];

    updateElement(element.id, { options: updatedOptions });
  };

  return (
    <Card className="border-l-4 border-l-primary/20">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
            <div className="flex items-center space-x-2">
              {getElementIcon(element.type)}
              <Badge variant="secondary" className="text-xs">
                {getElementTypeName(element.type)}
              </Badge>
            </div>
            <div className="flex-1">
              <p className="font-medium line-clamp-1">{element.question}</p>
              {element.required && (
                <span className="text-xs text-destructive">Required</span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Collapse" : "Edit"}
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => duplicateElement(element.id)}>
                  <Copy className="mr-2 h-4 w-4" />
                  Duplicate
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => deleteElement(element.id)}
                  className="text-destructive"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      {isExpanded && (
        <CardContent className="space-y-4 border-t">
          {/* Question Text */}
          <div>
            <Label htmlFor={`question-${element.id}`}>Question</Label>
            <Input
              id={`question-${element.id}`}
              value={element.question}
              onChange={(e) => updateElement(element.id, { question: e.target.value })}
              placeholder="Enter your question..."
            />
          </div>

          {/* Description */}
          <div>
            <Label htmlFor={`description-${element.id}`}>Description (Optional)</Label>
            <Textarea
              id={`description-${element.id}`}
              value={element.description || ""}
              onChange={(e) => updateElement(element.id, { description: e.target.value })}
              placeholder="Add helpful text or instructions..."
              rows={2}
            />
          </div>

          {/* Placeholder for text inputs */}
          {[InvitationElementType.SHORT_TEXT, InvitationElementType.LONG_TEXT, InvitationElementType.EMAIL, InvitationElementType.PHONE, InvitationElementType.URL].includes(element.type) && (
            <div>
              <Label htmlFor={`placeholder-${element.id}`}>Placeholder Text</Label>
              <Input
                id={`placeholder-${element.id}`}
                value={element.placeholder || ""}
                onChange={(e) => updateElement(element.id, { placeholder: e.target.value })}
                placeholder="Enter placeholder text..."
              />
            </div>
          )}

          {/* Options for choice-based questions */}
          {hasOptions(element.type) && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label>Options</Label>
                <Button variant="outline" size="sm" onClick={addOption}>
                  <Plus className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>
              <div className="space-y-2">
                {((element as any).options || []).map((option: InvitationQuestionOption, index: number) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <span className="text-sm text-muted-foreground w-6">{index + 1}.</span>
                    <Input
                      value={option.text}
                      onChange={(e) => updateOption(option.id, e.target.value)}
                      placeholder={`Option ${index + 1}`}
                      className="flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeOption(option.id)}
                      className="h-8 w-8"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scale settings for rating/linear scale */}
          {hasScale(element.type) && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`scale-min-${element.id}`}>Minimum Value</Label>
                <Input
                  id={`scale-min-${element.id}`}
                  type="number"
                  value={(element as any).scale?.min || 1}
                  onChange={(e) => updateElement(element.id, {
                    scale: { ...(element as any).scale, min: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor={`scale-max-${element.id}`}>Maximum Value</Label>
                <Input
                  id={`scale-max-${element.id}`}
                  type="number"
                  value={(element as any).scale?.max || 5}
                  onChange={(e) => updateElement(element.id, {
                    scale: { ...(element as any).scale, max: parseInt(e.target.value) }
                  })}
                />
              </div>
              <div>
                <Label htmlFor={`scale-min-label-${element.id}`}>Min Label</Label>
                <Input
                  id={`scale-min-label-${element.id}`}
                  value={(element as any).scale?.minLabel || ""}
                  onChange={(e) => updateElement(element.id, {
                    scale: { ...(element as any).scale, minLabel: e.target.value }
                  })}
                  placeholder="e.g., Poor"
                />
              </div>
              <div>
                <Label htmlFor={`scale-max-label-${element.id}`}>Max Label</Label>
                <Input
                  id={`scale-max-label-${element.id}`}
                  value={(element as any).scale?.maxLabel || ""}
                  onChange={(e) => updateElement(element.id, {
                    scale: { ...(element as any).scale, maxLabel: e.target.value }
                  })}
                  placeholder="e.g., Excellent"
                />
              </div>
            </div>
          )}

          {/* File upload settings */}
          {hasFileSettings(element.type) && (
            <div className="space-y-4">
              <div>
                <Label htmlFor={`file-types-${element.id}`}>Allowed File Types</Label>
                <Input
                  id={`file-types-${element.id}`}
                  value={(element as any).fileSettings?.allowedTypes?.join(", ") || ".pdf, .doc, .docx"}
                  onChange={(e) => updateElement(element.id, {
                    fileSettings: {
                      ...(element as any).fileSettings,
                      allowedTypes: e.target.value.split(",").map(t => t.trim())
                    }
                  })}
                  placeholder=".pdf, .doc, .docx"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor={`max-size-${element.id}`}>Max Size (MB)</Label>
                  <Input
                    id={`max-size-${element.id}`}
                    type="number"
                    value={(element as any).fileSettings?.maxSize || 10}
                    onChange={(e) => updateElement(element.id, {
                      fileSettings: {
                        ...(element as any).fileSettings,
                        maxSize: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor={`max-files-${element.id}`}>Max Files</Label>
                  <Input
                    id={`max-files-${element.id}`}
                    type="number"
                    value={(element as any).fileSettings?.maxFiles || 1}
                    onChange={(e) => updateElement(element.id, {
                      fileSettings: {
                        ...(element as any).fileSettings,
                        maxFiles: parseInt(e.target.value)
                      }
                    })}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Required toggle */}
          <div className="flex items-center justify-between">
            <Label htmlFor={`required-${element.id}`}>Required</Label>
            <Switch
              id={`required-${element.id}`}
              checked={element.required}
              onCheckedChange={(checked) => updateElement(element.id, { required: checked })}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
