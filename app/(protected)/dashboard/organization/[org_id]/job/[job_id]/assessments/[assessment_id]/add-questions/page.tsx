"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  AlignLeft,
  CircleDot,
  Trash2,
  Copy,
  Save,
  GripVertical,
  CheckCircle2,
  FileSliders,
} from "lucide-react";
import FormElementEditor from "@/components/form-element-editor";
import FormPreview from "@/components/assessment/assessment-preview";
import FormSettings from "@/components/form-settings";
import {
  ElementType,
  type Assessment,
  type AssessmentQuestion,
  type AssessmentFormData,
} from "@/types";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL, PY_URL } from "@/config";
import { Badge } from "@/components/ui/badge";
import { getStatusForArrays } from "@/lib/utils";

function SavingStatus({ status }: { status: "saved" | "draft" }) {
  return (
    <div
      className={`rounded-md px-3 h-8 flex items-center gap-2 text-sm transition-all duration-300 ${
        status === "saved"
          ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
          : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      }`}
    >
      {status === "saved" ? (
        <>
          <CheckCircle2 className="h-4 w-4" />
          <span>All changes saved</span>
        </>
      ) : (
        <>
          <FileSliders className="h-4 w-4 animate-pulse" />
          <span>Draft - Unsaved changes</span>
        </>
      )}
    </div>
  );
}

// Sortable form element component
function SortableFormElement({
  element,
  elements,
  activeElementId,
  setActiveElementId,
  updateElement,
  duplicateFormElement,
  deleteFormElement,
  isDragging,
}: {
  element: AssessmentQuestion;
  elements: AssessmentQuestion[];
  activeElementId: string;
  setActiveElementId: (id: string) => void;
  updateElement: (id: string, updates: Partial<AssessmentQuestion>) => void;
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
        <div className="font-medium flex gap-4">
          {elements.includes(element) || <Badge>Draft</Badge>}
          <p>{element.text}</p>
        </div>
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
function DraggableFormElement({ element }: { element: AssessmentQuestion }) {
  return (
    <div className="border rounded-lg p-4 bg-background shadow-lg">
      <div className="flex items-center justify-between mb-2">
        <div className="font-medium">{element.text}</div>
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

// Skeleton loader for form elements
function FormElementSkeleton() {
  return (
    <div className="border rounded-lg p-4 animate-pulse">
      <div className="flex items-center justify-between mb-2">
        <Skeleton className="h-6 w-3/4" />
        <div className="flex items-center gap-1">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-8 w-8 rounded-md" />
        </div>
      </div>
      <div className="space-y-3 mt-4">
        <Skeleton className="h-5 w-full" />
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-8 w-1/2" />
      </div>
    </div>
  );
}

// Skeleton loader for form header
function FormHeaderSkeleton() {
  return (
    <div className="space-y-2 animate-pulse">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-5 w-1/2" />
    </div>
  );
}

export default function CreateFormPage() {
  const { assessment_id } = useParams();
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formElements, setFormElements] = useState<AssessmentQuestion[]>([]);
  const [originalElements, setOriginalElements] = useState<AssessmentQuestion[]>([]);
  const [activeElementId, setActiveElementId] = useState<string>("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loadingTestInfo, setLoadingTestInfo] = useState(true);
  const [loadingTestQuestions, setLoadingTestQuestions] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState<"saved" | "draft">("saved");

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addFormElement = (type: ElementType) => {
    let newElement: AssessmentQuestion;

    if (type === ElementType.MULTIPLE_CHOICE) {
      newElement = {
        id: `element-${formElements.length + 1}`,
        type: "MCQ",
        difficulty: "EASY",
        order: formElements.length + 1,
        correctAnswer: {
          value: `option-1`,
        },
        text: "New MCQ Question",
        required: false,
        options: {
          choices: [
            {
              id: `option-1`,
              text: "Option 1",
              isCorrect: true,
              order: 1,
            },
          ],
        },
      } as AssessmentQuestion;
    } else {
      newElement = {
        id: `element-${formElements.length + 1}`,
        type: "OPEN_ENDED",
        difficulty: "EASY",
        order: formElements.length + 1,
        text: "New Open-Ended Question",
        required: false,
      } as AssessmentQuestion;
    }

    setFormElements([...formElements, newElement]);
    setActiveElementId(newElement.id);
  };

  const deleteFormElement = (id: string) => {
    if (formElements.length === 1) {
      return; // Don't delete the last element
    }

    const newElements = formElements.filter((element) => {
      if (!originalElements.includes(element)) return element.id !== id;
      return element.id === id ? (element.deleted = true) : element;
    });
    setFormElements(newElements);

    if (activeElementId === id) {
      setActiveElementId(newElements[0]?.id || "");
    }
  };

  const duplicateFormElement = (id: string) => {
    const elementToDuplicate = formElements.find((element) => element.id === id);
    if (!elementToDuplicate) return;

    const newElement = {
      ...elementToDuplicate,
      id: `element-${formElements.length + 1}`,
      order: formElements.length + 1,
      text: `${elementToDuplicate.text} (Copy)`,
    };

    setFormElements([...formElements, newElement]);
    setActiveElementId(newElement.id);
  };

  const updateFormElement = (id: string, updates: Partial<AssessmentQuestion>) => {
    setFormElements(
      formElements.map((element) => (element.id === id ? { ...element, ...updates } : element))
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setFormElements((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        const reorderedItems = arrayMove(items, oldIndex, newIndex);

        // Update the order property for all elements
        return reorderedItems.map((item, index) => ({
          ...item,
          order: index + 1,
        }));
      });
    }

    setActiveId(null);
  };

  const saveForm = async () => {
    if (!formElements.length) return toast.error("Please add at least one question before saving.");
    try {
      let counter = 0;
      const elements = formElements.map((element) => {
        if (!element.deleted) counter++;
        return {
          ...element,
          id: element.id ? element.id : element.order,
          order: element.deleted ? 0 : counter,
          deleted: element.deleted ? true : false,
        };
      });

      const res = await axios.patch(
        `${PY_URL}/assessments/${assessment_id}`,
        {
          questions: elements,
        },
      );

      if (res.data.success) {
        console.log("Form saved:", elements);
        toast.success("Form saved successfully!");
        localStorage.removeItem(`form_${assessment_id}`);
        setOriginalElements(res.data.data.resultingQuestions);
        setFormElements(res.data.data.resultingQuestions);
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("Failed to save form");
    }
  };

  const activeElement = formElements.find((element) => element.id === activeId);

  // useEffect(() => {

  // }, [formElements]);

  useEffect(() => {
    const trackChanges = () => {
      if (getStatusForArrays(originalElements, formElements)) {
        setSavingStatus("saved");
      } else {
        setSavingStatus("draft");
      }
    };

    trackChanges();
  }, [originalElements, formElements]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        setLoadingTestInfo(true);
        const infoRes = await axios.get(`${API_URL}/tests/${assessment_id}`, {
          withCredentials: true,
        });
        const infoData = infoRes.data.data as Assessment;
        if (infoData) {
          setFormTitle(infoData.name);
          setFormDescription(infoData.description);
        }
      } catch {
        toast.error("Failed to fetch assessment data");
      } finally {
        setLoadingTestInfo(false);
      }

      try {
        setLoadingTestQuestions(true);
        // const questionsRes = await axios.get(`${API_URL}/tests/${assessment_id}/questions`);
        const questionsRes = await axios.get(`${PY_URL}/assessments/${assessment_id}`);

        const questionsData = questionsRes.data.questions as AssessmentQuestion[];
        if (questionsData && questionsData.length > 0) {
          const sortedQuestion = [...questionsData].sort((a, b) => a.order - b.order);
          setFormElements(sortedQuestion);
          setOriginalElements(sortedQuestion);
          setActiveElementId(sortedQuestion[0].id);
        }
      } catch {
        toast.error("Failed to fetch assessment questions");
      } finally {
        setLoadingTestQuestions(false);
      }
      setIsLoading(false);
    };

    if (assessment_id) {
      fetchData();
    }
  }, [assessment_id]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex-1 space-y-2">
          {loadingTestInfo ? (
            <FormHeaderSkeleton />
          ) : (
            <div className="flex justify-between ">
              <div>
                <h1 className="text-2xl font-bold border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent w-full">
                  {formTitle}
                </h1>
                <p className="text-gray-500 border-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0 bg-transparent w-full resize-none">
                  {formDescription}
                </p>
              </div>
              <SavingStatus status={savingStatus} />
            </div>
          )}
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="edit">Edit</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="edit" className="space-y-4 py-4">
          <div className="grid grid-cols-1 gap-6">
            {/* Form Builder */}
            <div className="col-span-3 space-y-4">
              {loadingTestQuestions ? (
                // Skeleton loading state for form elements
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <FormElementSkeleton key={i} />
                  ))}
                </div>
              ) : (
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
                      {formElements
                        .filter((element) => !element.deleted)
                        .map((element) => (
                          <SortableFormElement
                            key={element.id}
                            element={element}
                            elements={formElements}
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
              )}
            </div>
            {/* Form Elements Sidebar */}
            <div className="space-y-4 col-span-3 2xl:col-span-3">
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-medium mb-3">Add Question</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.SHORT_TEXT)}
                      disabled={isLoading}
                    >
                      <AlignLeft className="mr-2 h-4 w-4" />
                      <span>Short Text</span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start"
                      onClick={() => addFormElement(ElementType.MULTIPLE_CHOICE)}
                      disabled={isLoading}
                    >
                      <CircleDot className="mr-2 h-4 w-4" />
                      <span>Multiple Choice</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="preview">
          {loadingTestInfo || loadingTestQuestions ? (
            <div className="space-y-6">
              <FormHeaderSkeleton />
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <FormElementSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <FormPreview title={formTitle} description={formDescription} elements={formElements} />
          )}
        </TabsContent>

        <TabsContent value="settings">
          {loadingTestInfo ? (
            <div className="space-y-4">
              <Skeleton className="h-8 w-1/2" />
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-10 w-1/4" />
            </div>
          ) : (
            <FormSettings />
          )}
        </TabsContent>
      </Tabs>
      <div className="mt-6">
        <Button onClick={saveForm} className="w-full" disabled={isLoading}>
          <Save className="mr-2 h-4 w-4" />
          Save
        </Button>
      </div>
    </div>
  );
}
