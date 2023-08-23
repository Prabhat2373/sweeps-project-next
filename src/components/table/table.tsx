import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import LinksVisitors from "./links-visitors";
import { Button } from "@nextui-org/button";

export default function LinksTable() {
  const links = [
    { id: "link1", name: "Link 1", viewCount: 10 },
    { id: "link2", name: "Link 2", viewCount: 5 },
    // Add more sample links as needed
  ];

  return (
    <div className="w-full ">
      <h2 className="p-4">All links</h2>
      <div className="rounded-md sm:border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Link</TableHead>
              <TableHead className="font-medium">Views</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {links.map((link) => (
              <Collapsible key={link.id} asChild>
                <>
                  <TableRow>
                    <TableCell>{link.name}</TableCell>
                    <TableCell>{link.id}</TableCell>
                    <TableCell>
                      {/* {link.viewCount} */}
                      <CollapsibleTrigger asChild>
                        <Button>{link.viewCount}</Button>
                      </CollapsibleTrigger>
                    </TableCell>
                  </TableRow>
                  <CollapsibleContent asChild>
                    <LinksVisitors linkId={link.id} />
                  </CollapsibleContent>
                </>
              </Collapsible>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
