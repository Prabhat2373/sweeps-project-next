import { useLogoutAdminMutation } from "@/features/rtk/mainApi";
import { RootState } from "@/features/store/store";
import { decodeData } from "@/utils/utils";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const Logout = () => {
  const [logoutApi] = useLogoutAdminMutation();
  const { user } = useSelector((state: RootState) => state.user);
  const handleLogout = async () => {
    const response = await logoutApi({ userid: user ? user.id : "" });
    decodeData(response).then((result) => console.log("result", result));
  };

  useEffect(() => {
    handleLogout();
  }, []);
  return <div></div>;
};

export default Logout;
