import React from "react";
import { Pagination } from "@nextui-org/react";
const NextPagination = ({ data }) => {
  return (
    <div>
      <Pagination total={data?.length} initialPage={1} />
    </div>
  );
};

export default NextPagination;
