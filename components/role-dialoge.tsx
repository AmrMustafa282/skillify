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
import { createRole, updateRole, getPermissions } from "@/lib/account-api";


interface Role {
  id: number;
  name: string;
  permissions: Array<{
    permissionName: string;
    description: string;
    category: string;
  }>;
}

interface Permission {
  permissionName: string;
  description: string;
  category: string;
}

interface RoleDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  role?: Role | null;
  onSuccess: () => void;
}

export function RoleDialog({ open, onOpenChange, role, onSuccess }: RoleDialogProps) {
  const [formData, setFormData] = useState({
    name: "",
    permissionNames: [] as string[],
  });
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    if (open) {
      fetchPermissions();
      if (role) {
        setFormData({
          name: role.name,
          permissionNames: role.permissions.map((p) => p.permissionName),
        });
      } else {
        setFormData({
          name: "",
          permissionNames: [],
        });
      }
    }
  }, [open, role]);

  async function fetchPermissions() {
    try {
      const data = await getPermissions();
      setPermissions(data);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to fetch permissions",
      //   variant: "destructive",
      // });
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (role) {
        await updateRole(role.id, formData);
        // toast({
        //   title: "Success",
        //   description: "Role updated successfully",
        // });
      } else {
        await createRole(formData);
        // toast({
        //   title: "Success",
        //   description: "Role created successfully",
        // });
      }
      onSuccess();
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: `Failed to ${role ? "update" : "create"} role`,
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  }

  function handlePermissionChange(permissionName: string, checked: boolean) {
    setFormData((prev) => ({
      ...prev,
      permissionNames: checked
        ? [...prev.permissionNames, permissionName]
        : prev.permissionNames.filter((name) => name !== permissionName),
    }));
  }

  // Group permissions by category
  const groupedPermissions = permissions.reduce(
    (acc, permission) => {
      if (!acc[permission.category]) {
        acc[permission.category] = [];
      }
      acc[permission.category].push(permission);
      return acc;
    },
    {} as Record<string, Permission[]>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{role ? "Edit Role" : "Create Role"}</DialogTitle>
          <DialogDescription>
            {role
              ? "Update role name and permissions."
              : "Create a new role with specific permissions."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Role Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label className="text-right">Permissions</Label>
              <div className="col-span-3 space-y-4">
                {Object.entries(groupedPermissions).map(([category, categoryPermissions]) => (
                  <div key={category} className="space-y-2">
                    <h4 className="font-medium text-sm text-muted-foreground">{category}</h4>
                    <div className="space-y-2 pl-4">
                      {categoryPermissions.map((permission) => (
                        <div key={permission.permissionName} className="flex items-start space-x-2">
                          <Checkbox
                            checked={formData.permissionNames.includes(permission.permissionName)}
                            onCheckedChange={(checked) =>
                              handlePermissionChange(permission.permissionName, checked as boolean)
                            }
                          />
                          <div className="space-y-1">
                            <Label className="text-sm font-medium">
                              {permission.permissionName}
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              {permission.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? "Saving..." : role ? "Update" : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
