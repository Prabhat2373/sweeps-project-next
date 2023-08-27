import { debounce } from "@/utils/utils";
import { Input, Spacer } from "@nextui-org/react";
import { Pagination } from "@nextui-org/pagination";
import React, { Fragment, useEffect, useState } from "react";

import { RootState } from "@/features/store/store";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
const NextTable = ({
  columns,
  lazyQuery,
  searchPlaceholder = "Search by name",
}) => {
  const [expandedRows, setExpandedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { user } = useSelector((state: RootState) => state.user);
  const [data, setData] = useState([]);
  const [loadData, { data: lazyData, isLoading }] = lazyQuery;

  const debouncedLoad = React.useMemo(() => debounce(loadData, 500), []);

  const fetchData = () => {
    debouncedLoad({ currentPage, searchTerm });
  };

  useEffect(() => {
    fetchData();
    // console.log("fetching");
  }, [currentPage, searchTerm]);

  //   useEffect(() => {
  //     if (user && user.id) {
  //       loadData({ userid: user.id }).then((res) => {
  //         decodeData(res?.data).then((result) => {
  //           console.log("result", result);

  //           setData(JSON.parse(result?.data)?.data?.products);
  //         });
  //       });
  //     }
  //   }, [currentPage, searchTerm]);
  useEffect(() => {
    // if (lazyData) {
    setData(lazyData?.products ?? []);
    // }
  }, [lazyData]);
  console.log("lazyData", data);

  const handleToggleRow = (rowKey) => {
    if (expandedRows.includes(rowKey)) {
      setExpandedRows(expandedRows.filter((key) => key !== rowKey));
    } else {
      setExpandedRows([...expandedRows, rowKey]);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const filteredRows = data.filter((row) =>
    row?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <div>
        <h1>Table with server-side pagination</h1>
        <Spacer />
        <Input
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Spacer />
        <Table selectionMode="multiple">
          <TableHeader>
            {columns.map((column) => (
              <TableColumn key={column.accessorKey}>
                {column.header}
              </TableColumn>
            ))}
          </TableHeader>
          <TableBody>
            {data?.map((row, index) => (
              <Fragment key={index}>
                <TableRow>
                  {columns?.map((column) => (
                    <TableCell key={column.accessorKey}>{row?.title}</TableCell>
                  ))}
                </TableRow>
                {expandedRows?.includes(row.accessorKey) && (
                  <TableRow>
                    <TableCell colSpan={columns.length}>
                      <div className="flex items-center space-x-2 p-4">
                        <div>Additional details for {row.header}</div>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </Fragment>
            ))}
          </TableBody>
        </Table>
        <Pagination total={100} />
      </div>
    </Fragment>
  );
};

export default NextTable;
