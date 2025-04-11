"use client";
import { Button } from "@/components/ui/button";
import type React from "react";

import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trash2, Plus } from "lucide-react";
import { ElementType, type FormElementEditorProps } from "@/types";

export default function FormElementEditor({ element, updateElement }: FormElementEditorProps) {
  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, { question: e.target.value });
  };

  const handleRequiredChange = (checked: boolean) => {
    updateElement(element.id, { required: checked });
  };

  const handleOptionChange = (index: number, value: string) => {
    if ("options" in element) {
      const newOptions = [...element.options];
      newOptions[index] = value;
      updateElement(element.id, { options: newOptions });
    }
  };

  const addOption = () => {
    if ("options" in element && Array.isArray(element.options)) {
      const newOptions = [...element.options, `Option ${element.options.length + 1}`];
      updateElement(element.id, { options: newOptions });
    }
  };

  const removeOption = (index: number) => {
    if (!("options" in element) || !Array.isArray(element.options) || element.options.length <= 1)
      return;

    const newOptions = element.options.filter((_, i) => i !== index);
    updateElement(element.id, { options: newOptions });
  };

  // Prevent drag events from bubbling up to parent
  const preventDragEvents = (e: React.DragEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="space-y-4 mt-4 border-t pt-4"
      onDragStart={preventDragEvents}
      onDragEnd={preventDragEvents}
      onDragOver={preventDragEvents}
      onDragEnter={preventDragEvents}
      onDragLeave={preventDragEvents}
      draggable={false}
    >
      <div className="space-y-2">
        <Label htmlFor={`question-${element.id}`}>Question</Label>
        <Input
          id={`question-${element.id}`}
          value={element.question}
          onChange={handleQuestionChange}
          placeholder="Enter your question"
          draggable={false}
        />
      </div>

      {(element.type === ElementType.MULTIPLE_CHOICE ||
        element.type === ElementType.CHECKBOX ||
        element.type === ElementType.DROPDOWN) && (
        <div className="space-y-2">
          <Label>Options</Label>
          {element.options.map((option, index) => (
            <div key={`option-${index}`} className="flex items-center gap-2">
              <Input
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Option ${index + 1}`}
                draggable={false}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeOption(index)}
                disabled={element.options.length <= 1}
                draggable={false}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={addOption}
            className="mt-2"
            draggable={false}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Option
          </Button>
        </div>
      )}

      <div className="flex items-center space-x-2">
        <Switch
          id={`required-${element.id}`}
          checked={element.required}
          onCheckedChange={handleRequiredChange}
        />
        <Label htmlFor={`required-${element.id}`}>Required</Label>
      </div>
    </div>
  );
}
