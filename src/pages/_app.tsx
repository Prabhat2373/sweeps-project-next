import {
  useGetAdminMutation,
  useRevokeAdminLoginMutation,
} from "@/features/rtk/mainApi";
import { setUser } from "@/features/slices/userSlice";
import { RootState, store } from "@/features/store/store";
import "@/styles/globals.css";
import { decodeData } from "@/utils/utils";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { Provider, useDispatch, useSelector } from "react-redux";
import { NextUIProvider } from "@nextui-org/react";
import { Providers } from "@/layout/providers";
const MyApp = ({ children }) => {
  const [revokeAdminLogin] = useRevokeAdminLoginMutation();
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  console.log("user", user);

  const [getAdmin] = useGetAdminMutation();

  useEffect(() => {
    getAdmin({ userid: user?.id }).then((res) => {
      if (res?.data) {
        decodeData(res?.data).then((result) => {
          console.log("result", result);
        });
      }
    });
  }, []);
  const checkUserLoggedIn = () => {
    const interval = setInterval(async () => {
      try {
        const response = await revokeAdminLogin({ userid: user?.id });
        const json = decodeData(response?.data);
        console.log("dataJson", json);
        const status = JSON.parse(json.data);
        console.log("status", status);

        if (status === "error") {
          clearInterval(interval);
        }
      } catch (error) {
        console.error("Error checking user login:", error);
      }
    }, 5000); // 5000 milliseconds (5 seconds)
  };

  // checkUserLoggedIn();

  useEffect(() => {
    let isRequestInProgress = false; // Flag to track if a request is already in progress
    let interval;

    const checkUserLoggedIn = async () => {
      if (!isRequestInProgress) {
        isRequestInProgress = true;

        try {
          const response = await revokeAdminLogin({ userid: user?.id });
          const json = await decodeData(response?.data);
          console.log("dataJson", json);
          const status = JSON.parse(json.data);
          console.log("status", status);

          if (status?.status === "error") {
            clearInterval(interval);
          }
        } catch (error) {
          console.error("Error checking user login:", error);
        } finally {
          isRequestInProgress = false;
        }
      }
    };

    interval = setInterval(checkUserLoggedIn, 5000); // 5000 milliseconds (5 seconds)

    return () => {
      clearInterval(interval);
    };
  }, [revokeAdminLogin]);

  useEffect(() => {
    dispatch(
      setUser({
        id: 74,
        username: "testadmin",
        first: "Test",
        last: "Admin",
        email: "test@admin.com",
        phone: "9874563210",
        role: "Super",
        is_loggedin: 1,
        ban: 0,
        reason: null,
        first_login: 1,
      })
    );
  }, []);

  return <>{children}</>;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      {/* <NextUIProvider> */}
      <Providers>
        <MyApp>
          <Component {...pageProps} />
        </MyApp>
      </Providers>
      {/* </NextUIProvider> */}
    </Provider>
  );
}
