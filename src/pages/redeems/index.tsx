import { useLazyGetRedeemsQuery } from "@/features/rtk/mainApi";
import { decodeData } from "@/utils/utils";
import React, { useEffect, useState } from "react";

const Redeems = () => {
  const [getRedeems] = useLazyGetRedeemsQuery();
  const [redeems, setRedeems] = useState([]);
  useEffect(() => {
    getRedeems("").then((res) => {
      decodeData(res?.data).then((result) => setRedeems(result));
    });
  }, []);

  console.log("redeems", redeems);

  return <div>
    
  </div>;
};

export default Redeems;
