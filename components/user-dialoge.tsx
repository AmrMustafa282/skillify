"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { createUser, updateUser, getRoles } from "@/lib/account-api";
// import { useToast } from "@/hooks/use-toast";

interface User {
  id: string;
  username: string;
  email: string;
  verified: boolean;
  roles: Array<{
    id: number;
    name: string;
  }>;
}

interface Role {
  id: number;
  name: string;
  permissions: Array<{
    permissionName: string;
    description: string;
    category: string;
  }>;
}

interface UserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  user?: User | null;
  onSuccess: () => void;
}

export function UserDialog({ open, onOpenChange, user, onSuccess }: UserDialogProps) {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    verified: false,
    roleNames: [] as string[],
  });
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      fetchRoles();
      if (user) {
        setFormData({
          username: user.username,
          email: user.email,
          password: "",
          verified: user.verified,
          roleNames: user.roles.map((role) => role.name),
        });
      } else {
        setFormData({
          username: "",
          email: "",
          password: "",
          verified: false,
          roleNames: [],
        });
      }
    }
  }, [open, user]);

  async function fetchRoles() {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to fetch roles",
      //   variant: "destructive",
      // });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (user) {
        await updateUser(user.id, {
          username: formData.username,
          email: formData.email,
          roleNames: formData.roleNames,
          verified: formData.verified,
        });
        // toast({
        //   title: "Success",
        //   description: "User updated successfully",
        // });
      } else {
        await createUser({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          roleNames: formData.roleNames,
          verified: formData.verified,
        });
        // toast({
        //   title: "Success",
        //   description: "User created successfully",
        // });
      }
      onSuccess();
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: `Failed to ${user ? "update" : "create"} user`,
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  }

  function handleRoleChange(roleName: string, checked: boolean) {
    setFormData((prev) => ({
      ...prev,
      roleNames: checked
        ? [...prev.roleNames, roleName]
        : prev.roleNames.filter((name) => name !== roleName),
    }));
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{user ? "Edit User" : "Create User"}</DialogTitle>
          <DialogDescription>
            {user ? "Update user information and roles." : "Create a new user account."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Username
              </Label>
              <Input
                id="username"
                value={formData.username}
                onChange={(e) => setFormData((prev) => ({ ...prev, username: e.target.value }))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="col-span-3"
                required
              />
            </div>
            {!user && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="password" className="text-right">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((prev) => ({ ...prev, password: e.target.value }))}
                  className="col-span-3"
                  required
                />
              </div>
            )}
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Verified</Label>
              <div className="col-span-3">
                <Checkbox
                  checked={formData.verified}
                  onCheckedChange={(checked) =>
                    setFormData((prev) => ({ ...prev, verified: checked as boolean }))
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">Roles</Label>
              <div className="col-span-3 space-y-2">
                {roles.map((role) => (
                  <div key={role.id} className="flex items-center space-x-2">
                    <Checkbox
                      checked={formData.roleNames.includes(role.name)}
                      onCheckedChange={(checked) => handleRoleChange(role.name, checked as boolean)}
                    />
                    <Label className="text-sm">{role.name}</Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : user ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
