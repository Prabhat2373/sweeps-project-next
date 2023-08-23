import React from "react";
import { TableCell, TableRow } from "@/components/ui/table";

export default function LinksVisitors({ linkId }: { linkId: string }) {
  const visitors = [
    { id: "visitor1", name: "Visitor 1", totalDuration: "2 hours" },
    { id: "visitor2", name: "Visitor 2", totalDuration: "1 hour" },
  ];

  return (
    <>
      {visitors.map((visitor) => (
        <TableRow key={visitor.id}>
          <TableCell></TableCell>
          <TableCell>{visitor.name}</TableCell>
          <TableCell>{visitor.totalDuration}</TableCell>
        </TableRow>
      ))}
    </>
  );
}
