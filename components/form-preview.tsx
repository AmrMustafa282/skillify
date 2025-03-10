"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ElementType, type FormElement, type FormPreviewProps } from "@/types";

export default function FormPreview({ title, description, elements }: FormPreviewProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  const handleInputChange = (id: string, value: any) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleCheckboxChange = (id: string, optionIndex: number, checked: boolean) => {
    const currentValues = formData[id] || [];
    let newValues: number[];

    if (checked) {
      newValues = [...currentValues, optionIndex];
    } else {
      newValues = currentValues.filter((index: number) => index !== optionIndex);
    }

    setFormData({ ...formData, [id]: newValues });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
    setFormData({});
  };

  const renderFormElement = (element: FormElement) => {
    const { id, type, question, required } = element;

    switch (type) {
      case ElementType.SHORT_TEXT:
        return (
          <div className="space-y-2">
            <Label htmlFor={id}>
              {question} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={id}
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              required={required}
            />
          </div>
        );

      case ElementType.LONG_TEXT:
        return (
          <div className="space-y-2">
            <Label htmlFor={id}>
              {question} {required && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id={id}
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              required={required}
            />
          </div>
        );

      case ElementType.MULTIPLE_CHOICE:
        if ("options" in element && Array.isArray(element.options)) {
          return (
            <div className="space-y-2">
              <div>
                {question} {required && <span className="text-red-500">*</span>}
              </div>
              <RadioGroup
                value={formData[id] || ""}
                onValueChange={(value) => handleInputChange(id, value)}
                required={required}
              >
                {element.options.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <RadioGroupItem value={index.toString()} id={`${id}-option-${index}`} />
                    <Label htmlFor={`${id}-option-${index}`}>{option}</Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          );
        }
        return null;

      case ElementType.CHECKBOX:
        if ("options" in element && Array.isArray(element.options)) {
          return (
            <div className="space-y-2">
              <div>
                {question} {required && <span className="text-red-500">*</span>}
              </div>
              {element.options.map((option, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    id={`${id}-option-${index}`}
                    checked={(formData[id] || []).includes(index)}
                    onCheckedChange={(checked) => handleCheckboxChange(id, index, !!checked)}
                  />
                  <Label htmlFor={`${id}-option-${index}`}>{option}</Label>
                </div>
              ))}
            </div>
          );
        }
        return null;

      case ElementType.DROPDOWN:
        if ("options" in element && Array.isArray(element.options)) {
          return (
            <div className="space-y-2">
              <Label htmlFor={id}>
                {question} {required && <span className="text-red-500">*</span>}
              </Label>
              <Select
                value={formData[id] || ""}
                onValueChange={(value) => handleInputChange(id, value)}
              >
                <SelectTrigger id={id}>
                  <SelectValue placeholder="Select an option" />
                </SelectTrigger>
                <SelectContent>
                  {element.options.map((option, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          );
        }
        return null;

      case ElementType.DATE:
        return (
          <div className="space-y-2">
            <Label htmlFor={id}>
              {question} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={id}
              type="date"
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              required={required}
            />
          </div>
        );

      case ElementType.TIME:
        return (
          <div className="space-y-2">
            <Label htmlFor={id}>
              {question} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={id}
              type="time"
              value={formData[id] || ""}
              onChange={(e) => handleInputChange(id, e.target.value)}
              required={required}
            />
          </div>
        );

      case ElementType.FILE_UPLOAD:
        return (
          <div className="space-y-2">
            <Label htmlFor={id}>
              {question} {required && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id={id}
              type="file"
              onChange={(e) => handleInputChange(id, e.target.files?.[0])}
              required={required}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle className="text-2xl">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {elements.map((element) => (
            <div key={element.id} className="border-b pb-6 last:border-0">
              {renderFormElement(element)}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => setFormData({})}>
            Clear Form
          </Button>
          <Button type="submit">Submit</Button>
        </CardFooter>
      </form>
    </Card>
  );
}
