import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { AllCommunityModules } from "@ag-grid-community/all-modules";
import "@ag-grid-community/all-modules/dist/styles/ag-grid.css";
import "@ag-grid-community/all-modules/dist/styles/ag-theme-balham.css";

const ExternalGrid = ({ rowData, setSortParams, fetchData, lazyQuery }) => {
  const [gridApi, setGridApi] = useState(null);
  const [gridColsApi, setGridColsApi] = useState(null);
  const [loadData, { data, isLoading }] = lazyQuery;

  const gridOptions = {
    columnDefs: [
      {
        headerName: "Quantity",
        field: "quantity",
        sortable: true,
        comparator: (valueA, valueB, nodeA, nodeB, isInverted) => 0,
      },
    ],
    defaultColDef: {
      sortable: true,
      filter: true,
    },
    pagination: true,
    paginationPageSize: 10, // Number of rows per page
    onPaginationChanged: (page) => {
      fetchData(page.api.paginationGetCurrentPage() + 1); // Page starts from 0, adjust accordingly
    },
    onSortChanged: (params) => {
      const sortModel = params.api.getSortModel();
      setSortParams([
        sortModel.length > 0,
        sortModel.length > 0 ? sortModel[0].sort === "desc" : false,
      ]);
    },
  };

  useEffect(() => {
    if (gridApi && gridColsApi) {
      gridApi.sizeColumnsToFit();
    }
  }, [gridApi, gridColsApi]);

  return (
    <div
      className="ag-theme-balham"
      style={{
        height: "400px",
        width: "100%",
      }}
    >
      <AgGridReact
        gridOptions={gridOptions}
        onGridReady={(params) => {
          setGridApi(params.api);
          setGridColsApi(params.columnApi);
        }}
        modules={AllCommunityModules}
        rowData={rowData}
      />
    </div>
  );
};

export default ExternalGrid;
