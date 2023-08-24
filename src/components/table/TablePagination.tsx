// import Button from '@/components/buttons/Button'
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from '@/components/ui/select'
// import { Button } from "@/components/ui/Button";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/Select";
import { Select, SelectSection, SelectItem, Button } from "@nextui-org/react";
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  searchParams?: any;
  setSearchParams?: any;
  response?: any;
  hideRowSelected?: boolean;
}

export function DataTablePagination<TData>({
  table,
  searchParams,
  setSearchParams,
  response,
  hideRowSelected,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex items-center justify-between px-2">
      {!hideRowSelected ? (
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
      ) : (
        <div></div>
      )}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {/* <div className="flex items-center space-x-2">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
              searchParams.set("limit", value.toString());
              setSearchParams({
                limit: value.toString() === "All" ? -1 : value.toString(),
              });
            }}
          >
            {[10, 20, 30, 40, 50, "All"].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </Select>
        </div> */}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {response?.current_page} of {response?.last_page}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="bordered"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="bordered"
            className="h-8 w-8 p-0"
            onClick={() => {
              // table.previousPage()

              setSearchParams({
                page: Number(response?.current_page) - 1,
              });
            }}
            disabled={!response || !response?.next_page_url}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="bordered"
            className="h-8 w-8 p-0"
            onClick={() => {
              // table.nextPage()

              setSearchParams({
                page: response?.current_page + 1,
              });
            }}
            disabled={!response || !response?.next_page_url}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
          <Button
            variant="bordered"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
