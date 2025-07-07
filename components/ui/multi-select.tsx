"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";

export interface MultiSelectOption {
  label: string;
  value: string;
  icon?: React.ReactNode;
}

interface MultiSelectProps {
  options: MultiSelectOption[];
  selected: string[];
  onChange: (selected: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  maxDisplay?: number;
  searchPlaceholder?: string;
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder = "Select items...",
  className,
  disabled = false,
  maxDisplay = 3,
  searchPlaceholder = "Search options...",
}: MultiSelectProps) {
  const [open, setOpen] = React.useState(false);

  const handleUnselect = (item: string) => {
    onChange(selected.filter((i) => i !== item));
  };

  const handleSelect = (item: string) => {
    if (selected.includes(item)) {
      onChange(selected.filter((i) => i !== item));
    } else {
      onChange([...selected, item]);
    }
  };

  const selectedOptions = options.filter((option) => selected.includes(option.value));

  const displayedOptions = selectedOptions.slice(0, maxDisplay);
  const remainingCount = selected.length - maxDisplay;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={cn(
            "w-full justify-between max-h-9 h-auto px-3 py-2",
            "hover:bg-accent/50 transition-colors duration-200",
            "border-input bg-background",
            disabled && "opacity-50 cursor-not-allowed",
            className
          )}
          disabled={disabled}
        >
          <div className="flex flex-wrap gap-1.5 flex-1 min-w-0">
            {selected.length === 0 ? (
              <span className="text-muted-foreground text-sm font-normal">{placeholder}</span>
            ) : (
              <>
                {displayedOptions.map((option) => (
                  <Badge
                    key={option.value}
                    variant="secondary"
                    className={cn(
                      "px-2 py-1 text-xs font-medium",
                      "bg-primary/10 text-primary border-primary/20",
                      "hover:bg-primary/20 transition-colors duration-150",
                      "flex items-center gap-1 max-w-[200px]"
                    )}
                  >
                    {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                    <span className="truncate">{option.label}</span>
                    <div
                      role="button"
                      tabIndex={0}
                      className={cn(
                        "ml-1 rounded-full hover:bg-primary/30",
                        "transition-colors duration-150 p-0.5 cursor-pointer",
                        "focus:outline-none focus:ring-1 focus:ring-primary"
                      )}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleUnselect(option.value);
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          e.stopPropagation();
                          handleUnselect(option.value);
                        }
                      }}
                    >
                      <X className="h-3 w-3" />
                    </div>
                  </Badge>
                ))}
                {remainingCount > 0 && (
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-2 py-1 text-xs font-medium",
                      "bg-muted/50 text-muted-foreground border-muted-foreground/30"
                    )}
                  >
                    +{remainingCount} more
                  </Badge>
                )}
              </>
            )}
          </div>
          <ChevronsUpDown
            className={cn(
              "h-4 w-4 shrink-0 text-muted-foreground ml-2",
              "transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn("w-[var(--radix-popover-trigger-width)] p-0", "border shadow-lg bg-popover")}
        align="start"
        sideOffset={4}
      >
        <Command className="rounded-lg">
          <div className="flex items-center border-b px-3">
            <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
            <CommandInput
              placeholder={searchPlaceholder}
              className="flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 border-0 focus:ring-0"
            />
          </div>
          <CommandList>
            <CommandEmpty className="py-6 text-center text-sm text-muted-foreground">
              No options found.
            </CommandEmpty>
            <CommandGroup className="p-2">
              {options.map((option) => {
                const isSelected = selected.includes(option.value);
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => handleSelect(option.value)}
                    className={cn(
                      "flex items-center gap-2 px-2 py-2 text-sm rounded-sm cursor-pointer",
                      "hover:bg-accent hover:text-accent-foreground",
                      "transition-colors duration-150",
                      isSelected && "bg-accent/50"
                    )}
                  >
                    <div
                      className={cn(
                        "flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check className="h-3 w-3" />
                    </div>
                    {option.icon && <span className="flex-shrink-0">{option.icon}</span>}
                    <span className="flex-1 truncate">{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

// Enhanced utility functions with better styling
export const createMultiSelectOptions = (items: string[]): MultiSelectOption[] => {
  return items.map((item) => ({
    label: item,
    value: item,
  }));
};

export const formatDifficultyLabel = (difficulty: string): string => {
  switch (difficulty.toUpperCase()) {
    case "EASY":
      return "Easy";
    case "MEDIUM":
      return "Medium";
    case "HARD":
      return "Hard";
    default:
      return difficulty;
  }
};

export const createDifficultyOptions = (difficulties: string[]): MultiSelectOption[] => {
  return difficulties.map((difficulty) => {
    const formatted = formatDifficultyLabel(difficulty);
    let icon;
    switch (difficulty.toUpperCase()) {
      case "EASY":
        icon = <div className="w-2 h-2 rounded-full bg-green-500" />;
        break;
      case "MEDIUM":
        icon = <div className="w-2 h-2 rounded-full bg-yellow-500" />;
        break;
      case "HARD":
        icon = <div className="w-2 h-2 rounded-full bg-red-500" />;
        break;
      default:
        icon = <div className="w-2 h-2 rounded-full bg-gray-400" />;
    }

    return {
      label: formatted,
      value: difficulty,
      icon,
    };
  });
};

export const createCompanyOptions = (companies: string[]): MultiSelectOption[] => {
  return companies.map((company) => ({
    label: company,
    value: company,
    icon: (
      <div className="w-3 h-3 rounded bg-blue-100 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded bg-blue-600" />
      </div>
    ),
  }));
};

export const createTopicOptions = (topics: string[]): MultiSelectOption[] => {
  return topics.map((topic) => ({
    label: topic,
    value: topic,
    icon: (
      <div className="w-3 h-3 rounded bg-purple-100 flex items-center justify-center">
        <div className="w-1.5 h-1.5 rounded bg-purple-600" />
      </div>
    ),
  }));
};
