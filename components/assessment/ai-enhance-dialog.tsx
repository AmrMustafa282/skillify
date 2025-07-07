"use client";

import { useState } from "react";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface AIEnhanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  originalDescription: string;
  onEnhance: (enhancedDescription: string) => void;
}

export function AIEnhanceDialog({
  open,
  onOpenChange,
  originalDescription,
  onEnhance,
}: AIEnhanceDialogProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [enhancedDescription, setEnhancedDescription] = useState("");

  // Simulate AI enhancement
  const enhanceDescription = async () => {
    setIsLoading(true);

    // In a real implementation, this would call an AI service
    // For now, we'll simulate a response with a timeout
    setTimeout(() => {
      const enhanced = originalDescription.trim()
        ? improveDescription(originalDescription)
        : generateSampleDescription();

      setEnhancedDescription(enhanced);
      setIsLoading(false);
    }, 1500);
  };

  // Simple enhancement simulation
  const improveDescription = (text: string) => {
    // Add formatting and structure
    let enhanced = text;

    if (!enhanced.includes("## Description")) {
      enhanced = "## Description\n\n" + enhanced;
    }

    if (!enhanced.includes("## Examples")) {
      enhanced += "\n\n## Examples\n\n";
      enhanced += "**Example 1:**\n\n";
      enhanced += "```\nInput: [1, 2, 3]\nOutput: 6\nExplanation: 1 + 2 + 3 = 6\n```\n\n";
      enhanced += "**Example 2:**\n\n";
      enhanced += "```\nInput: [4, 5, 6]\nOutput: 15\nExplanation: 4 + 5 + 6 = 15\n```";
    }

    if (!enhanced.includes("## Constraints")) {
      enhanced += "\n\n## Constraints\n\n";
      enhanced += "- The length of the input array will be between 0 and 10^5\n";
      enhanced += "- Each element in the array will be between -10^9 and 10^9";
    }

    return enhanced;
  };

  // Generate a sample description if none provided
  const generateSampleDescription = () => {
    return `## Description

Given an array of integers, return the sum of all elements in the array.

## Examples

**Example 1:**

\`\`\`
Input: [1, 2, 3]
Output: 6
Explanation: 1 + 2 + 3 = 6
\`\`\`

**Example 2:**

\`\`\`
Input: [4, 5, 6]
Output: 15
Explanation: 4 + 5 + 6 = 15
\`\`\`

## Constraints

- The length of the input array will be between 0 and 10^5
- Each element in the array will be between -10^9 and 10^9`;
  };

  const handleAccept = () => {
    onEnhance(enhancedDescription);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>AI-Enhanced Description</DialogTitle>
          <DialogDescription>
            Let AI help you create a more detailed and structured problem description.
          </DialogDescription>
        </DialogHeader>

        {!enhancedDescription && !isLoading ? (
          <div className="flex justify-center py-8">
            <Button onClick={enhanceDescription}>
              <Sparkles className="mr-2 h-4 w-4" />
              Generate Enhanced Description
            </Button>
          </div>
        ) : isLoading ? (
          <div className="flex flex-col items-center justify-center py-12 space-y-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            <p className="text-sm text-muted-foreground">Enhancing your description...</p>
          </div>
        ) : (
          <Textarea
            value={enhancedDescription}
            onChange={(e) => setEnhancedDescription(e.target.value)}
            className="min-h-[300px] font-mono"
          />
        )}

        {enhancedDescription && (
          <DialogFooter>
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleAccept}>Accept Changes</Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
