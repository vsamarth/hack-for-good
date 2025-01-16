import { Heading } from "@/components/heading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/lib/db";
import { Plus } from "lucide-react";

export default async function Admin() {
  const users = await db.query.users.findMany({
    columns: {
      id: true,
      email: true,
      name: true,
    },
  });
  return (
    <div className="flex w-full flex-col gap-8">
      <div className="flex items-center justify-between">
        <Heading title="Residents" description="View and manage residents" />
        <Button variant='secondary'>
          <Plus size={16} />
          Add new
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell className="text-sm text-zinc-600">
                {user.email}
              </TableCell>
              <TableCell>8506 2380</TableCell>
              <TableCell>
                <Badge variant="outline">Active</Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
