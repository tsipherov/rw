import React, { useContext, useEffect, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStogage";
import ApiService from "../services/apiService";
import { useFetch } from "../hooks/useFetch";
import { useDispatch } from "react-redux";
import { fetchUser } from "../store/slices/auth.slice";

export const UserContext = React.createContext([{}, () => {}]);

export const UserProvider = ({ children }) => {
  const [sessionId, setSessionId] = useLocalStorage("session_id");
  const [{ isLoading, response, error }, createFetchRequest] = useFetch();
  const apiServices = new ApiService();
  const dispatch = useDispatch();

  let contextData = {
    isLogedIn: null,
    currentUser: null,
  };
  const [state, setState] = useState(contextData);

  useEffect(() => {
    if (sessionId) {
      // dispatch(fetchUser());
    }
  }, [sessionId]);

  // const getUserDetails = async (s_id) => {
  //   const data = await apiServices.getAccountDetails(s_id || sessionId);
  //   contextData = {
  //     isLogedIn: true,
  //     currentUser: data,
  //   };
  //   setState(contextData);
  //   // console.log("context getUserDetails >>>> ", data);
  //   return data;
  // };

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};
