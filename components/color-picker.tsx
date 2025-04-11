"use client";

import { useState, useEffect } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ColorPickerProps } from "@/types";

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  const [value, setValue] = useState(color || "#000000");

  useEffect(() => {
    setValue(color || "#000000");
  }, [color]);

  const handleChange = (newColor: string) => {
    setValue(newColor);
    onChange?.(newColor);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[220px] justify-start text-left font-normal">
          <div className="flex items-center gap-2">
            <div className="h-4 w-4 rounded-full border" style={{ backgroundColor: value }} />
            <span>{value}</span>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[280px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="color-picker">Color</Label>
            <div className="flex gap-2">
              <Input
                id="color-picker"
                type="color"
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                className="w-[60px] h-[36px] p-1"
              />
              <Input
                value={value}
                onChange={(e) => handleChange(e.target.value)}
                placeholder="#000000"
              />
            </div>
          </div>
          <div className="grid grid-cols-6 gap-2">
            {[
              "#000000",
              "#ffffff",
              "#f44336",
              "#2196f3",
              "#4caf50",
              "#ffeb3b",
              "#9c27b0",
              "#ff9800",
              "#795548",
              "#607d8b",
              "#e91e63",
              "#00bcd4",
            ].map((presetColor) => (
              <button
                key={presetColor}
                className="h-6 w-6 rounded-md border"
                style={{ backgroundColor: presetColor }}
                onClick={() => handleChange(presetColor)}
                type="button"
              />
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
