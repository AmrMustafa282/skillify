"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Badge } from "@/components/ui/badge";
import { Plus, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getRoles, deleteRole } from "@/lib/account-api";
import { RoleDialog } from "@/components/role-dialoge";


interface Role {
  id: number;
  name: string;
  permissions: Array<{
    permissionName: string;
    description: string;
    category: string;
  }>;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);


  useEffect(() => {
    fetchRoles();
  }, []);

  async function fetchRoles() {
    try {
      setLoading(true);
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to fetch roles",
      //   variant: "destructive",
      // });
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteRole(roleId: number) {
    if (!confirm("Are you sure you want to delete this role?")) return;

    try {
      await deleteRole(roleId);
      // toast({
      //   title: "Success",
      //   description: "Role deleted successfully",
      // });
      fetchRoles();
    } catch (error) {
      // toast({
      //   title: "Error",
      //   description: "Failed to delete role",
      //   variant: "destructive",
      // });
    }
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div className="flex items-center space-x-2">
          <SidebarTrigger />
          <h2 className="text-3xl font-bold tracking-tight">Roles</h2>
        </div>
        <Button onClick={() => setDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Role
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Role Management</CardTitle>
          <CardDescription>Manage user roles and their permissions</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-4">Loading...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Role Name</TableHead>
                  <TableHead>Permissions</TableHead>
                  <TableHead>Permission Count</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {roles.map((role) => (
                  <TableRow key={role.id}>
                    <TableCell className="font-medium">{role.name}</TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1 max-w-md">
                        {role.permissions.slice(0, 3).map((permission) => (
                          <Badge
                            key={permission.permissionName}
                            variant="outline"
                            className="text-xs"
                          >
                            {permission.permissionName}
                          </Badge>
                        ))}
                        {role.permissions.length > 3 && (
                          <Badge variant="secondary" className="text-xs">
                            +{role.permissions.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{role.permissions.length}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => {
                              setEditingRole(role);
                              setDialogOpen(true);
                            }}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteRole(role.id)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <RoleDialog
        open={dialogOpen}
        onOpenChange={(open) => {
          setDialogOpen(open);
          if (!open) setEditingRole(null);
        }}
        role={editingRole}
        onSuccess={() => {
          fetchRoles();
          setDialogOpen(false);
          setEditingRole(null);
        }}
      />
    </div>
  );
}
