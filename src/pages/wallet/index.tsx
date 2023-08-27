import DataTable from "@/components/table/DataTable";
import NextTable from "@/components/table/NextTable";
import { useLazyGetCustomerWalletQuery } from "@/features/rtk/mainApi";
import { useLazyTestProductsQuery } from "@/features/rtk/testApi";
import { RootState } from "@/features/store/store";
import AppLayout from "@/layout/app/AppLayout";
import { decodeData } from "@/utils/utils";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Wallet = () => {
  const [getCustomerWallet] = useLazyGetCustomerWalletQuery();
  const customerWalletQuery = useLazyGetCustomerWalletQuery();
  const productsLazyQuery = useLazyTestProductsQuery();
  const [wallet, setWallet] = useState({});
  const { user } = useSelector((state: RootState) => state.user);
  const [expandedRows, setExpandedRows] = React.useState([]);

  const handleToggleRow = (rowId) => {
    if (expandedRows.includes(rowId)) {
      setExpandedRows(expandedRows.filter((id) => id !== rowId));
    } else {
      setExpandedRows([...expandedRows, rowId]);
    }
  };

  const columns = [
    {
      accessorKey: "id",
      header: "ID",
    },

    {
      accessorKey: "first",
      header: "Name",
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
    },
    {
      accessorKey: "selfieverified",
      header: "Photo Verified",
    },

    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => (
        <button onClick={() => handleToggleRow(row?.id)}>View</button>
      ),
    },
  ];
  // useEffect(() => {
  //   if (user && user.id) {
  //     getCustomerWallet({ userid: user.id }).then((res) => {
  //       decodeData(res?.data).then((result) => {
  //         console.log("result", result);

  //         setWallet(JSON.parse(result?.data)?.data?.users);
  //       });
  //     });
  //   }
  // }, []);

  console.log("wallet", wallet);

  return (
    <AppLayout>
      {/* <DataTable
        columns={columns}
        data={wallet}
        expandedRows={expandedRows}
        setExpandedRows={setExpandedRows}
        handleToggleRow={handleToggleRow}
        id="test"
        response={wallet}
      /> */}
      <NextTable columns={columns} lazyQuery={productsLazyQuery} />
    </AppLayout>
  );
};

export default Wallet;
