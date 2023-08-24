import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import * as React from "react";

import classNames from "classnames";
import { type ParsedUrlQuery } from "querystring";
// import Spinner from "../ui/Spinner";
import { DataTablePagination } from "./TablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { debounce } from "@/utils/utils";
import { ChevronUp } from "lucide-react";
// import { DataTableToolbar } from "./TableToolbar";
// import { DataTableToolbar } from './TableToolbar'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loadData?: any;
  searchParams?: ParsedUrlQuery | string;
  setSearchParams?: any;
  selectedRows?: any;
  isLoading?: boolean;
  id?: string;
  response?: any;
  refetch?: any;
  hidePagination?: boolean;
  hideToolbar?: boolean;
  toolbar?: JSX.Element;
  hideHeader?: boolean;
  hideRowSelected?: boolean;
  showNumbering?: boolean;
  lazyQueryHook?: any;
  expandedRows?: any;
  setExpandedRows?: any;
  handleToggleRow?: any;
}

function DataTable<TData, TValue>({
  columns,
  data,
  loadData,
  searchParams,
  setSearchParams,
  selectedRows,
  isLoading,
  id,
  response,
  hidePagination = false,
  hideToolbar = false,
  refetch,
  toolbar,
  hideHeader,
  hideRowSelected,
  showNumbering,
  lazyQueryHook,
  expandedRows,
  setExpandedRows,
  handleToggleRow,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const updatedSearchParams = new URLSearchParams(searchParams?.toString());
  const debouncedLoad = React.useMemo(() => debounce(loadData, 500), []);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });
  const fetchLatest = () => {
    debouncedLoad(searchParams);
  };
  function isFiltersEmpty(filters) {
    return Object.keys(filters).forEach((filter) =>
      filter ? filter.length <= 0 : true
    );
  }

  React.useEffect(() => {
    fetchLatest();
  }, [searchParams]);

  //   React.useEffect(() => {
  //     if (selectedRows) {
  //       selectedRows(table?.getSelectedRowModel());
  //     }
  //   }, [table?.getSelectedRowModel()]);

  return (
    <div className="space-y-4">
      {!data ? (
        <>
          <div>{id} Loading..</div>
        </>
      ) : (
        <>
          {/* {!hideToolbar && !toolbar ? (
            <DataTableToolbar
              searchParams={updatedSearchParams}
              setSearchParams={setSearchParams}
              table={table}
              refetchData={fetchLatest}
            />
          ) : (
            <>{toolbar}</>
          )} */}
          <div className="border border-border-foreground_100">
            <Table>
              {!hideHeader && (
                <TableHeader>
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                      {showNumbering ? (
                        <TableHead key="#">
                          <span className="inline-block pl-4 text-center">
                            #
                          </span>
                        </TableHead>
                      ) : null}

                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
              )}

              <TableBody>
                <>
                  {
                    // eslint-disable-next-line no-nested-ternary
                    !isLoading && table.getRowModel().rows?.length ? (
                      table.getRowModel().rows.map((row) => (
                        <>
                          <TableRow
                            key={row.id}
                            data-state={row.getIsSelected() && "selected"}
                            className={classNames("hover:bg-slate-50", {
                              "bg-slate-50": row.index % 2 == 1,
                            })}
                          >
                            {showNumbering ? (
                              <TableCell key={row.index}>
                                <span className="inline-block pl-4 text-center">
                                  {row.index + 1}
                                </span>
                              </TableCell>
                            ) : null}
                            {row.getVisibleCells().map((cell) => (
                              <TableCell key={cell.id}>
                                {flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext()
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                          {expandedRows.includes(row.id) && (
                            <TableRow className="bg-gray-100">
                              <TableCell colSpan={columns.length}>
                                {/* Collapsible Content */}
                                <div className="flex items-center space-x-2 p-4">
                                  <div className="w-6">
                                    <ChevronUp
                                      className="cursor-pointer"
                                      onClick={() => handleToggleRow(row.id)}
                                    />
                                  </div>
                                  <div>Collapsible content goes here</div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))
                    ) : isLoading ? (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          {id} Loading...
                        </TableCell>
                      </TableRow>
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={columns.length}
                          className="h-24 text-center"
                        >
                          {id} not found.
                        </TableCell>
                      </TableRow>
                    )
                  }
                </>
              </TableBody>
            </Table>
          </div>
          {!hidePagination && (
            <DataTablePagination
              searchParams={updatedSearchParams}
              setSearchParams={setSearchParams}
              table={table}
              response={response}
              hideRowSelected={hideRowSelected}
            />
          )}
        </>
      )}
    </div>
  );
}

export default DataTable;
