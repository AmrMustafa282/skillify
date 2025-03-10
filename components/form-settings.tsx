"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormSettings as FormSettingsType } from "@/types";

export default function FormSettings() {
  const [settings, setSettings] = useState<FormSettingsType>({
    collectEmail: true,
    limitResponses: false,
    responseLimit: 100,
    showProgressBar: true,
    shuffleQuestions: false,
    confirmationMessage: "Thank you for submitting the form!",
    redirectUrl: "",
    theme: "default",
    headerColor: "#4f46e5",
    fontFamily: "Inter",
  });

  const handleSettingChange = <K extends keyof FormSettingsType>(
    key: K,
    value: FormSettingsType[K]
  ) => {
    setSettings({ ...settings, [key]: value });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="presentation">Presentation</TabsTrigger>
          <TabsTrigger value="responses">Responses</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>General Settings</CardTitle>
              <CardDescription>Configure the basic settings for your form</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="collect-email">Collect Email Addresses</Label>
                  <p className="text-sm text-muted-foreground">Require respondents to sign in</p>
                </div>
                <Switch
                  id="collect-email"
                  checked={settings.collectEmail}
                  onCheckedChange={(checked) => handleSettingChange("collectEmail", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="show-progress">Show Progress Bar</Label>
                  <p className="text-sm text-muted-foreground">Display progress through the form</p>
                </div>
                <Switch
                  id="show-progress"
                  checked={settings.showProgressBar}
                  onCheckedChange={(checked) => handleSettingChange("showProgressBar", checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="shuffle-questions">Shuffle Question Order</Label>
                  <p className="text-sm text-muted-foreground">Randomize the order of questions</p>
                </div>
                <Switch
                  id="shuffle-questions"
                  checked={settings.shuffleQuestions}
                  onCheckedChange={(checked) => handleSettingChange("shuffleQuestions", checked)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmation-message">Confirmation Message</Label>
                <Textarea
                  id="confirmation-message"
                  value={settings.confirmationMessage}
                  onChange={(e) => handleSettingChange("confirmationMessage", e.target.value)}
                  placeholder="Thank you for submitting the form!"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="redirect-url">Redirect URL (Optional)</Label>
                <Input
                  id="redirect-url"
                  value={settings.redirectUrl}
                  onChange={(e) => handleSettingChange("redirectUrl", e.target.value)}
                  placeholder="https://example.com/thank-you"
                />
                <p className="text-xs text-muted-foreground">
                  Redirect respondents to a URL after form submission
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="presentation" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Presentation Settings</CardTitle>
              <CardDescription>Customize how your form looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <Select
                  value={settings.theme}
                  onValueChange={(value) => handleSettingChange("theme", value)}
                >
                  <SelectTrigger id="theme">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="colorful">Colorful</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="header-color">Header Color</Label>
                <div className="flex items-center gap-2">
                  <div
                    className="w-10 h-10 rounded-md border"
                    style={{ backgroundColor: settings.headerColor }}
                  />
                  <Input
                    id="header-color"
                    value={settings.headerColor}
                    onChange={(e) => handleSettingChange("headerColor", e.target.value)}
                    placeholder="#4f46e5"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="font-family">Font Family</Label>
                <Select
                  value={settings.fontFamily}
                  onValueChange={(value) => handleSettingChange("fontFamily", value)}
                >
                  <SelectTrigger id="font-family">
                    <SelectValue placeholder="Select a font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Inter">Inter</SelectItem>
                    <SelectItem value="Roboto">Roboto</SelectItem>
                    <SelectItem value="Open Sans">Open Sans</SelectItem>
                    <SelectItem value="Montserrat">Montserrat</SelectItem>
                    <SelectItem value="Poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="pt-4">
                <Button variant="outline">Preview Theme</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4 py-4">
          <Card>
            <CardHeader>
              <CardTitle>Response Settings</CardTitle>
              <CardDescription>Configure how responses are collected</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="limit-responses">Limit Responses</Label>
                  <p className="text-sm text-muted-foreground">Set a maximum number of responses</p>
                </div>
                <Switch
                  id="limit-responses"
                  checked={settings.limitResponses}
                  onCheckedChange={(checked) => handleSettingChange("limitResponses", checked)}
                />
              </div>

              {settings.limitResponses && (
                <div className="space-y-2">
                  <Label htmlFor="response-limit">Response Limit</Label>
                  <Input
                    id="response-limit"
                    type="number"
                    min="1"
                    value={settings.responseLimit}
                    onChange={(e) =>
                      handleSettingChange("responseLimit", Number.parseInt(e.target.value))
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Response Notifications</Label>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-all" />
                  <Label htmlFor="notify-all">Receive email for all responses</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="notify-daily" />
                  <Label htmlFor="notify-daily">Receive daily summary</Label>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Data Export Options</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline">Export as CSV</Button>
                  <Button variant="outline">Export as Excel</Button>
                  <Button variant="outline">Export as PDF</Button>
                  <Button variant="outline">Print Responses</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
