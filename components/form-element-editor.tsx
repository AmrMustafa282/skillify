"use client";
import { Button } from "@/components/ui/button";
import type React from "react";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Trash2, Plus, GripVertical } from "lucide-react";
import type { AssessmentQuestionEditorProps, AssessmentQuestionOption } from "@/types";
import { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable option component
function SortableOption({
  option,
  index,
  handleOptionChange,
  removeOption,
  isCorrect,
}: {
  option: AssessmentQuestionOption;
  index: number;
  handleOptionChange: (index: number, value: string) => void;
  removeOption: (index: number) => void;
  isCorrect: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: option.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 p-2 rounded-md border">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-grab active:cursor-grabbing p-1 hover:bg-accent rounded"
        {...attributes}
        {...listeners}
      >
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </Button>

      <RadioGroupItem value={option.id} id={`correct-${option.id}`} className="mr-2" />

      <Input
        value={option.text}
        onChange={(e) => handleOptionChange(index, e.target.value)}
        placeholder={`Option ${index + 1}`}
        className="flex-1"
        draggable={false}
      />

      <Button
        variant="ghost"
        size="icon"
        onClick={() => removeOption(index)}
        disabled={false}
        draggable={false}
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

// Draggable option component for the overlay
function DraggableOption({ option }: { option: AssessmentQuestionOption }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-md border bg-background shadow-lg">
      <Button variant="ghost" size="icon" className="cursor-grabbing p-1 rounded">
        <GripVertical className="h-4 w-4 text-muted-foreground" />
      </Button>

      <div className="w-4 h-4 rounded-full border mr-2"></div>

      <div className="flex-1 h-9 bg-muted/30 rounded-md px-3 py-2">{option.text}</div>

      <Button variant="ghost" size="icon" draggable={false}>
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}

export default function FormElementEditor({
  element,
  updateElement,
}: AssessmentQuestionEditorProps) {
  const [activeId, setActiveId] = useState<string | null>(null);

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleQuestionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateElement(element.id, { text: e.target.value });
  };

  const handleRequiredChange = (checked: boolean) => {
    updateElement(element.id, { required: checked });
  };

  const handleOptionChange = (index: number, value: string) => {
    if ("options" in element && Array.isArray(element.options?.choices)) {
      const newChoices = [...element.options.choices];
      newChoices[index].text = value;
      updateElement(element.id, { options: { choices: newChoices as AssessmentQuestionOption[] } });
    }
  };

  const addOption = () => {
    if ("options" in element && Array.isArray(element.options?.choices)) {
      const newOrder = element.options.choices.length + 1;
      const newChoices = [
        ...element.options.choices,
        {
          // id: `${element.id}-${newOrder}`,
          id: `option-${newOrder}`,
          text: `Option ${newOrder}`,
          isCorrect: false,
          order: newOrder,
        },
      ];
      updateElement(element.id, { options: { choices: newChoices as AssessmentQuestionOption[] } });
    }
  };

  const removeOption = (index: number) => {
    if (
      !("options" in element) ||
      !Array.isArray(element.options?.choices) ||
      element.options.choices.length <= 1
    )
      return;

    const newChoices = element.options.choices.filter((_, i) => i !== index);

    // Update order for remaining options
    const updatedChoices = newChoices.map((choice, idx) => ({
      ...choice,
      order: idx + 1,
    }));

    updateElement(element.id, { options: { choices: updatedChoices } });
  };

  const handleCorrectAnswerChange = (optionId: string) => {
    if ("options" in element && Array.isArray(element.options?.choices)) {
      const newChoices = element.options.choices.map((choice) => ({
        ...choice,
        isCorrect: choice.id === optionId,
      }));
      updateElement(element.id, {
        options: { choices: newChoices },
        correctAnswer: { value: optionId },
      });
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (
      over &&
      active.id !== over.id &&
      "options" in element &&
      Array.isArray(element.options?.choices)
    ) {
      const oldIndex = element.options.choices.findIndex((choice) => choice.id === active.id);
      const newIndex = element.options.choices.findIndex((choice) => choice.id === over.id);

      const reorderedChoices = arrayMove(element.options.choices, oldIndex, newIndex);

      // Update the order property for all choices
      const updatedChoices = reorderedChoices.map((choice, index) => ({
        ...choice,
        order: index + 1,
      }));

      updateElement(element.id, { options: { choices: updatedChoices } });
    }

    setActiveId(null);
  };

  // Prevent drag events from bubbling up to parent
  const preventDragEvents = (e: React.DragEvent) => {
    e.stopPropagation();
  };

  const activeOption =
    element.type === "MCQ" && element.options?.choices
      ? element.options.choices.find((choice) => choice.id === activeId)
      : null;

  // Ensure all options have an order property when component mounts or when options change
  const ensureOptionOrder = () => {
    if ("options" in element && Array.isArray(element.options?.choices)) {
      const hasAllOrders = element.options.choices.every(
        (choice) => typeof choice.order === "number"
      );

      if (!hasAllOrders) {
        const updatedChoices = element.options.choices.map((choice, index) => ({
          ...choice,
          order: index + 1,
        }));

        updateElement(element.id, { options: { choices: updatedChoices } });
      }
    }
  };

  // Call ensureOptionOrder when the component renders
  if (element.type === "MCQ" && element.options?.choices) {
    ensureOptionOrder();
  }

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
          value={element.text}
          onChange={handleQuestionChange}
          placeholder="Enter your question"
          draggable={false}
        />
      </div>

      {element.type === "MCQ" && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Options</Label>
            <Label className="text-sm text-muted-foreground">
              Drag to reorder, select correct answer
            </Label>
          </div>

          <RadioGroup
            value={
              element.correctAnswer?.value ||
              element.options?.choices.find((c) => c.isCorrect)?.id ||
              ""
            }
            onValueChange={handleCorrectAnswerChange}
            className="space-y-2"
          >
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={element.options?.choices.map((choice) => choice.id) || []}
                strategy={verticalListSortingStrategy}
              >
                <div className="space-y-2">
                  {element.options?.choices.map((option, index) => (
                    <SortableOption
                      key={option.id}
                      option={option}
                      index={index}
                      handleOptionChange={handleOptionChange}
                      removeOption={removeOption}
                      isCorrect={option.isCorrect || option.id === element.correctAnswer?.value}
                    />
                  ))}
                </div>
              </SortableContext>

              <DragOverlay>
                {activeOption ? <DraggableOption option={activeOption} /> : null}
              </DragOverlay>
            </DndContext>
          </RadioGroup>

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
