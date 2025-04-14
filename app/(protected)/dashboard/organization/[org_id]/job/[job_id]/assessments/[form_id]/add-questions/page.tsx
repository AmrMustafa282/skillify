"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlignLeft,
  CheckSquare,
  CircleDot,
  Calendar,
  Clock,
  FileText,
  Trash2,
  Copy,
  Save,
  GripVertical,
} from "lucide-react";
import FormElementEditor from "@/components/form-element-editor";
import FormPreview from "@/components/form-preview";
import FormSettings from "@/components/form-settings";
import { ElementType, type FormElement, type FormData } from "@/types";

// Sortable form element component
function SortableFormElement({
  element,
  activeElementId,
  setActiveElementId,
  updateElement,
  duplicateFormElement,
  deleteFormElement,
  isDragging,
}: {
  element: FormElement;
  activeElementId: string;
  setActiveElementId: (id: string) => void;
  updateElement: (id: string, updates: Partial<FormElement>) => void;
  duplicateFormElement: (id: string) => void;
  deleteFormElement: (id: string) => void;
  isDragging: boolean;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: element.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`border rounded-lg p-4 ${activeElementId === element.id ? "ring-2 ring-primary" : ""}`}
      onClick={() => setActiveElementId(element.id)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{element.question}</div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => duplicateFormElement(element.id)}>
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => deleteFormElement(element.id)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {activeElementId === element.id && (
        <FormElementEditor element={element} updateElement={updateElement} />
      )}
    </div>
  );
}

// Draggable form element component for the overlay
function DraggableFormElement({ element }: { element: FormElement }) {
  return (
    <div className="border rounded-lg p-4 bg-background shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{element.question}</div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="cursor-grabbing">
            <GripVertical className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Copy className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function CreateFormPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [formTitle, setFormTitle] = useState<string>("Untitled Form");
  const [formDescription, setFormDescription] = useState<string>("Form description");
  const [formElements, setFormElements] = useState<FormElement[]>([
    {
      id: "element-1",
      type: ElementType.SHORT_TEXT,
      question: "What is your name?",
      required: true,
      options: [],
    } as FormElement,
  ]);
  const [activeElementId, setActiveElementId] = useState<string>("element-1");
  const [activeId, setActiveId] = useState<string | null>(null);

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Add a new form element
  const addFormElement = (type: ElementType) => {
    let newElement: FormElement;

    // Create the appropriate element based on type
    if (
      type === ElementType.MULTIPLE_CHOICE ||
      type === ElementType.CHECKBOX ||
      type === ElementType.DROPDOWN
    ) {
      newElement = {
        id: `element-${formElements.length + 1}`,
        type,
        question: "New Question",
        required: false,
        options: ["Option 1"],
      } as FormElement;
    } else {
      newElement = {
        id: `element-${formElements.length + 1}`,
        type,
        question: "New Question",
        required: false,
        options: [],
      } as FormElement;
    }

    setFormElements([...formElements, newElement]);
    setActiveElementId(newElement.id);
  };

  // Delete a form element
  const deleteFormElement = (id: string) => {
    if (formElements.length === 1) {
      return; // Don't delete the last element
    }

    const newElements = formElements.filter((element) => element.id !== id);
    setFormElements(newElements);

    if (activeElementId === id) {
      setActiveElementId(newElements[0]?.id || "");
    }
  };

  // Duplicate a form element
  const duplicateFormElement = (id: string) => {
    const elementToDuplicate = formElements.find((element) => element.id === id);
    if (!elementToDuplicate) return;

    const newElement = {
      ...elementToDuplicate,
      id: `element-${formElements.length + 1}`,
      question: `${elementToDuplicate.question} (Copy)`,
    };

    setFormElements([...formElements, newElement]);
    setActiveElementId(newElement.id);
  };

  // Update a form element
  const updateFormElement = (id: string, updates: Partial<FormElement>) => {
    setFormElements(
      formElements.map((element) => (element.id === id ? { ...element, ...updates } : element))
    );
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFormElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  // Save the form
  const saveForm = () => {
    // In a real app, you would save to a database here
    const formData: FormData = {
      title: formTitle,
      description: formDescription,
      elements: formElements,
    };
    console.log("Form saved:", formData);
    alert("Form saved successfully!");
    router.push("/");
  };

  // Find the active element for the drag overlay
  const activeElement = formElements.find((element) => element.id === activeId);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 space-y-2 ">
          <Input
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="text-2xl font-bold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          <Input
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="text-gray-500 border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4 py-4">
          <div className="grid grid-cols-1 2xl:grid-cols-4 gap-6">
            {/* Form Builder */}
            <div className="col-span-3 space-y-4 ">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={formElements.map((element) => element.id)}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-4">
                    {formElements.map((element) => (
                      <SortableFormElement
                        key={element.id}
                        element={element}
                        activeElementId={activeElementId}
                        setActiveElementId={setActiveElementId}
                        updateElement={updateFormElement}
                        duplicateFormElement={duplicateFormElement}
                        deleteFormElement={deleteFormElement}
                        isDragging={activeId === element.id}
                      />
                    ))}
                  </div>
                </SortableContext>

                <DragOverlay>
                  {activeElement ? <DraggableFormElement element={activeElement} /> : null}
                </DragOverlay>
              </DndContext>
            </div>
            {/* Form Elements Sidebar */}
            <div className="space-y-4 col-span-3 2xl:col-span-1">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Add Question</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.SHORT_TEXT)}
                    >
                      <AlignLeft className="mr-2 h-4 w-4" />
                      <span>Short Text</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.LONG_TEXT)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Paragraph</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.MULTIPLE_CHOICE)}
                    >
                      <CircleDot className="mr-2 h-4 w-4" />
                      <span>Multiple Choice</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.CHECKBOX)}
                    >
                      <CheckSquare className="mr-2 h-4 w-4" />
                      <span>Checkboxes</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.DROPDOWN)}
                    >
                      <AlignLeft className="mr-2 h-4 w-4" />
                      <span>Dropdown</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.DATE)}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      <span>Date</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.TIME)}
                    >
                      <Clock className="mr-2 h-4 w-4" />
                      <span>Time</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.FILE_UPLOAD)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      <span>File Upload</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          <FormPreview title={formTitle} description={formDescription} elements={formElements} />
        </TabsContent>

        <TabsContent value="settings">
          <FormSettings />
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <Button onClick={saveForm} className="w-full">
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
}
