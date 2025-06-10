"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Upload, Star } from "lucide-react";
import { InvitationElementType, InvitationFormElement } from "@/types/index";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface FormPreviewProps {
  title: string;
  description: string;
  elements: InvitationFormElement[];
}

export function FormPreview({ title, description, elements }: FormPreviewProps) {
  const renderFormElement = (element: InvitationFormElement) => {
    const baseProps = {
      key: element.id,
      className: "space-y-2"
    };

    const labelElement = (
      <Label htmlFor={element.id} className="text-sm font-medium">
        {element.question}
        {element.required && <span className="text-destructive ml-1">*</span>}
      </Label>
    );

    const descriptionElement = element.description && (
      <p className="text-sm text-muted-foreground">{element.description}</p>
    );

    switch (element.type) {
      case InvitationElementType.SHORT_TEXT:
      case InvitationElementType.EMAIL:
      case InvitationElementType.PHONE:
      case InvitationElementType.URL:
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <Input
              id={element.id}
              type={element.type === InvitationElementType.EMAIL ? "email" : 
                    element.type === InvitationElementType.PHONE ? "tel" :
                    element.type === InvitationElementType.URL ? "url" : "text"}
              placeholder={element.placeholder || `Enter your ${element.question.toLowerCase()}`}
              disabled
            />
          </div>
        );

      case InvitationElementType.LONG_TEXT:
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <Textarea
              id={element.id}
              placeholder={element.placeholder || `Enter your ${element.question.toLowerCase()}`}
              rows={4}
              disabled
            />
          </div>
        );

      case InvitationElementType.NUMBER:
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <Input
              id={element.id}
              type="number"
              placeholder={element.placeholder || "Enter a number"}
              disabled
            />
          </div>
        );

      case InvitationElementType.MULTIPLE_CHOICE:
        const mcElement = element as any;
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <RadioGroup disabled>
              {(mcElement.options || []).map((option: any) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={option.id} id={option.id} />
                  <Label htmlFor={option.id} className="text-sm font-normal">
                    {option.text}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case InvitationElementType.CHECKBOX:
        const cbElement = element as any;
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <div className="space-y-2">
              {(cbElement.options || []).map((option: any) => (
                <div key={option.id} className="flex items-center space-x-2">
                  <Checkbox id={option.id} disabled />
                  <Label htmlFor={option.id} className="text-sm font-normal">
                    {option.text}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        );

      case InvitationElementType.DROPDOWN:
        const ddElement = element as any;
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {(ddElement.options || []).map((option: any) => (
                  <SelectItem key={option.id} value={option.id}>
                    {option.text}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );

      case InvitationElementType.DATE:
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    "text-muted-foreground"
                  )}
                  disabled
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  Select a date
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" disabled />
              </PopoverContent>
            </Popover>
          </div>
        );

      case InvitationElementType.TIME:
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <Input
              id={element.id}
              type="time"
              disabled
            />
          </div>
        );

      case InvitationElementType.FILE_UPLOAD:
        const fileElement = element as any;
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-sm text-muted-foreground mb-1">
                Click to upload or drag and drop
              </p>
              <p className="text-xs text-muted-foreground">
                {fileElement.fileSettings?.allowedTypes?.join(", ") || "PDF, DOC, DOCX"} 
                {fileElement.fileSettings?.maxSize && ` (max ${fileElement.fileSettings.maxSize}MB)`}
              </p>
            </div>
          </div>
        );

      case InvitationElementType.RATING:
        const ratingElement = element as any;
        const ratingScale = ratingElement.scale || { min: 1, max: 5 };
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <div className="space-y-2">
              <div className="flex items-center space-x-1">
                {Array.from({ length: ratingScale.max - ratingScale.min + 1 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className="p-1 hover:bg-muted rounded"
                    disabled
                  >
                    <Star className="h-5 w-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
              {(ratingScale.minLabel || ratingScale.maxLabel) && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{ratingScale.minLabel}</span>
                  <span>{ratingScale.maxLabel}</span>
                </div>
              )}
            </div>
          </div>
        );

      case InvitationElementType.LINEAR_SCALE:
        const scaleElement = element as any;
        const scale = scaleElement.scale || { min: 1, max: 5 };
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                {Array.from({ length: scale.max - scale.min + 1 }, (_, i) => {
                  const value = scale.min + i;
                  return (
                    <div key={i} className="flex flex-col items-center space-y-1">
                      <div className="w-8 h-8 rounded-full border-2 border-muted-foreground/25 flex items-center justify-center text-sm">
                        {value}
                      </div>
                    </div>
                  );
                })}
              </div>
              {(scale.minLabel || scale.maxLabel) && (
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{scale.minLabel}</span>
                  <span>{scale.maxLabel}</span>
                </div>
              )}
            </div>
          </div>
        );

      default:
        return (
          <div {...baseProps}>
            {labelElement}
            {descriptionElement}
            <Input
              id={element.id}
              placeholder="Preview not available for this question type"
              disabled
            />
          </div>
        );
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">{title}</CardTitle>
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </CardHeader>
        <CardContent className="space-y-6">
          {elements.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No questions to preview</p>
              <p className="text-sm">Add some questions to see the preview</p>
            </div>
          ) : (
            <>
              {elements.map((element) => renderFormElement(element))}
              
              {/* Submit Button Preview */}
              <div className="pt-6 border-t">
                <Button className="w-full" disabled>
                  Submit Application
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
