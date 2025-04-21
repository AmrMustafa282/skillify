"use client";

import { useEffect, useState, useCallback } from "react";
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
  Clock,
} from "lucide-react";
import FormElementEditor from "@/components/form-element-editor";
import FormPreview from "@/components/assessment-preview";
import FormSettings from "@/components/form-settings";
import {
  ElementType,
  type Assessment,
  type AssessmentQuestion,
  type AssessmentFormData,
} from "@/types";
import toast from "react-hot-toast";
import axios from "axios";
import { API_URL } from "@/config";
import { Badge } from "@/components/ui/badge";

// Saving status component
function SavingStatus({ status }: { status: "saved" | "saving" | "unsaved" }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-md px-3 py-2 flex items-center gap-2 text-sm transition-all duration-300">
      {status === "saved" ? (
        <>
          <CheckCircle2 className="h-4 w-4 text-green-500" />
          <span>All changes saved</span>
        </>
      ) : (
        <>
          <Clock className="h-4 w-4 text-amber-500 animate-pulse" />
          <span>Saving...</span>
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
  const { form_id } = useParams();
  const [activeTab, setActiveTab] = useState<string>("edit");
  const [formTitle, setFormTitle] = useState<string>("");
  const [formDescription, setFormDescription] = useState<string>("");
  const [formElements, setFormElements] = useState<AssessmentQuestion[]>([]);
  const [activeElementId, setActiveElementId] = useState<string>("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [loadingTestInfo, setLoadingTestInfo] = useState(true);
  const [loadingTestQuestions, setLoadingTestQuestions] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [savingStatus, setSavingStatus] = useState<"saved" | "saving" | "unsaved">("saved");

  // Create a form data object for saving
  const formData: AssessmentFormData = {
    title: formTitle,
    description: formDescription,
    elements: formElements,
  };

  // Debounce the form data to avoid too frequent saves
  // const debouncedFormData = useDebounce(formData, 1000);

  // Set up sensors for drag and drop
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Save to localStorage
  const saveToLocalStorage = useCallback(() => {
    if (!form_id) return;

    try {
      setSavingStatus("saving");
      const formDataToSave = {
        title: formTitle,
        description: formDescription,
        elements: formElements,
        lastSaved: new Date().toISOString(),
      };
      localStorage.setItem(`form_${form_id}`, JSON.stringify(formDataToSave));

      // Set saved status after a short delay to show the saving animation
      setTimeout(() => {
        setSavingStatus("saved");
      }, 800);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
      setSavingStatus("unsaved");
    }
  }, [form_id, formTitle, formDescription, formElements]);

  // Load from localStorage
  const loadFromLocalStorage = useCallback(() => {
    if (!form_id) return false;

    try {
      const savedData = localStorage.getItem(`form_${form_id}`);
      if (!savedData) return false;

      const parsedData = JSON.parse(savedData);

      // Check if the data is recent (within the last 24 hours)
      const lastSaved = new Date(parsedData.lastSaved);
      const now = new Date();
      const hoursDiff = (now.getTime() - lastSaved.getTime()) / (1000 * 60 * 60);

      if (hoursDiff > 24) {
        // Data is too old, remove it
        localStorage.removeItem(`form_${form_id}`);
        return false;
      }

      setFormTitle(parsedData.title || "");
      setFormDescription(parsedData.description || "");

      if (parsedData.elements && parsedData.elements.length > 0) {
        setFormElements(parsedData.elements);
        setActiveElementId(parsedData.elements[0].id);
      }

      toast.success("Loaded from autosave");
      return true;
    } catch (error) {
      console.error("Error loading from localStorage:", error);
      return false;
    }
  }, [form_id]);

  const addFormElement = (type: ElementType) => {
    let newElement: AssessmentQuestion;

    if (type === ElementType.MULTIPLE_CHOICE) {
      newElement = {
        id: `element-${formElements.length + 1}`,
        type: "MCQ",
        difficulty: "EASY",
        order: formElements.length + 1,
        correctAnswer: {
          value: `element-${formElements.length + 1}-1`,
        },
        text: "New MCQ Question",
        required: false,
        options: {
          choices: [
            {
              id: `element-${formElements.length + 1}-1`,
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
    setSavingStatus("unsaved");
  };

  const deleteFormElement = (id: string) => {
    if (formElements.length === 1) {
      return; // Don't delete the last element
    }

    const newElements = formElements.filter((element) => element.id !== id);
    setFormElements(newElements);

    if (activeElementId === id) {
      setActiveElementId(newElements[0]?.id || "");
    }

    setSavingStatus("unsaved");
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
    setSavingStatus("unsaved");
  };

  const updateFormElement = (id: string, updates: Partial<AssessmentQuestion>) => {
    setFormElements(
      formElements.map((element) => (element.id === id ? { ...element, ...updates } : element))
    );
    setSavingStatus("unsaved");
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

      setSavingStatus("unsaved");
    }

    setActiveId(null);
  };

  const saveForm = async () => {
    // In a real app, you would save to a database here
    try {
      setSavingStatus("saving");

      const res = await axios.post(
        `${API_URL}/questions/batch`,
        {
          testId: form_id,
          questions: formElements,
        },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log("Form saved:", formData);
        toast.success("Form saved successfully!");
        setSavingStatus("saved");
        localStorage.removeItem(`form_${form_id}`);
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("Failed to save form");
      setSavingStatus("unsaved");
    }
  };

  const activeElement = formElements.find((element) => element.id === activeId);

  // Effect for auto-saving to localStorage
  useEffect(() => {
    if (formData.elements.length > 0 && !isLoading) {
      saveToLocalStorage();
    }
  }, [saveToLocalStorage, isLoading, formData.elements.length]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Try to load from localStorage first
      const loadedFromLocal = loadFromLocalStorage();

      if (!loadedFromLocal) {
        try {
          setLoadingTestInfo(true);
          const infoRes = await axios.get(`${API_URL}/tests/${form_id}`, {
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
          const questionsRes = await axios.get(`${API_URL}/tests/${form_id}/questions`, {
            withCredentials: true,
          });
          const questionsData = questionsRes.data.data as AssessmentQuestion[];
          if (questionsData && questionsData.length > 0) {
            setFormElements(questionsData);
            setActiveElementId(questionsData[0].id);
          } else {
            // If no questions, add a default one
            addFormElement(ElementType.SHORT_TEXT);
          }
        } catch {
          toast.error("Failed to fetch assessment questions");
          // Add a default question if fetch fails
          addFormElement(ElementType.SHORT_TEXT);
        } finally {
          setLoadingTestQuestions(false);
        }
      } else {
        setLoadingTestInfo(false);
        setLoadingTestQuestions(false);
      }

      setIsLoading(false);
    };

    if (form_id) {
      fetchData();
    } else {
      setIsLoading(false);
      // Add a default question for new forms
      addFormElement(ElementType.SHORT_TEXT);
    }
  }, [form_id, loadFromLocalStorage]);

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
                      {formElements.map((element) => (
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
