import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question } from "@/types";

type QuestionFieldProps = {
  question: Question;
  onUpdate: (updatedQuestion: Partial<Question>) => void;
  onDelete: () => void;
};

export default function QuestionField({ question, onUpdate, onDelete }: QuestionFieldProps) {
  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...(question.options || [])];
    updatedOptions[index] = value;
    onUpdate({ options: updatedOptions });
  };

  const addOption = () => {
    const updatedOptions = [
      ...(question.options || []),
      `Option ${(question.options?.length || 0) + 1}`,
    ];
    onUpdate({ options: updatedOptions });
  };

  const renderQuestionInput = () => {
    switch (question.type) {
      case "short-answer":
        return <Input disabled placeholder="Short answer text" />;
      case "paragraph":
        return <Textarea disabled placeholder="Long answer text" />;
      case "multiple-choice":
        return (
          <RadioGroup>
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`option-${index}`} />
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-grow"
                />
              </div>
            ))}
          </RadioGroup>
        );
      case "checkboxes":
        return (
          <div className="space-y-2">
            {question.options?.map((option, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox id={`option-${index}`} />
                <Input
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  className="flex-grow"
                />
              </div>
            ))}
          </div>
        );
      case "dropdown":
        return (
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              {question.options?.map((option, index) => (
                <SelectItem key={index} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );
      case "linearScale":
        return (
          <div className="flex items-center space-x-2">
            <Input
              type="number"
              value={question.min || 1}
              onChange={(e) => onUpdate({ min: Number.parseInt(e.target.value) })}
              className="w-20"
            />
            <span>to</span>
            <Input
              type="number"
              value={question.max || 5}
              onChange={(e) => onUpdate({ max: Number.parseInt(e.target.value) })}
              className="w-20"
            />
          </div>
        );
      case "dateTime":
        return <Input type="datetime-local" disabled />;
      default:
        return null;
    }
  };

  return (
    <div className="border p-4 rounded-md space-y-4">
      <Input
        value={question.title}
        onChange={(e) => onUpdate({ title: e.target.value })}
        placeholder="Enter your question"
        className="font-semibold"
      />
      <Textarea
        value={question.description}
        onChange={(e) => onUpdate({ description: e.target.value })}
        placeholder="Enter a description (optional)"
      />
      {renderQuestionInput()}
      {["multipleChoice", "checkboxes", "dropdown"].includes(question.type) && (
        <Button onClick={addOption} variant="outline" size="sm">
          Add Option
        </Button>
      )}
      <div className="flex items-center space-x-2">
        <Switch
          checked={question.required}
          onCheckedChange={(checked) => onUpdate({ required: checked })}
        />
        <Label>Required</Label>
      </div>
      <Button onClick={onDelete} variant="destructive" size="sm">
        Delete Question
      </Button>
    </div>
  );
}
