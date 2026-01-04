"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Role } from "@/context/AuthContext";
import { useUsers } from "@/features/admin/hooks/useUsers";

export default function AdminUsersPage() {
  const {
    users,
    loading,
    error,
    onBlockToggle,
    onRoleChange,
  } = useUsers();

  if (loading) {
    return <p className="p-6">Loading users...</p>;
  }

  if (error) {
    return (
      <div className="p-6 text-red-500">
        Failed to load users: {error}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">User Management</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>

              <TableCell>
                <Select
                  value={user.role}
                  onValueChange={(value: Role) =>
                    onRoleChange(user._id, value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="jobseeker">Job Seeker</SelectItem>
                    <SelectItem value="recruiter">Recruiter</SelectItem>
                  </SelectContent>
                </Select>
              </TableCell>

              <TableCell>
                {user.isBlocked ? (
                  <span className="text-red-500">Blocked</span>
                ) : (
                  <span className="text-green-600">Active</span>
                )}
              </TableCell>

              <TableCell className="text-right">
                <Button
                  variant={user.isBlocked ? "default" : "destructive"}
                  onClick={() => onBlockToggle(user._id)}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
