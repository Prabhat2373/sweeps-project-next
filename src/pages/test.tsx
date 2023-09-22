import { useLazyGetCustomerWalletQuery } from "@/features/rtk/mainApi";
import ExternalGrid from "@/temp/AgGrid";
import React from "react";

const TestTable = () => {
  const [getData] = useLazyGetCustomerWalletQuery();
  const rowData = [
    { quantity: 10 },
    { quantity: 20 },
    { quantity: 30 },
    // Add more data as needed
  ];
  return (
    <div>
      <ExternalGrid fetchData={getData} rowData={rowData} setSortParams={} />
    </div>
  );
};

export default TestTable;
