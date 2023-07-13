import React, { useContext, useEffect } from "react";
import "./AccountMenu.css";
import { useLocalStorage } from "../../hooks/useLocalStogage";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";
import { useFetch } from "../../hooks/useFetch";

const AccountMenu = () => {
  const [session_id, setSessionId] = useLocalStorage("session_id");
  const navigate = useNavigate();
  const [, setUserContext] = useContext(UserContext);
  const [{ isLoading, response, error }, createFetchRequest] = useFetch();

  useEffect(() => {
    if (response?.success && !error) {
      clearSession();
    }

    if (error) alert(error);
  }, [response, error]);

  const clearSession = async () => {
    await setSessionId(null);
    await setUserContext({ isLogedIn: null, currentUser: null });
    navigate("/");
  };

  const logOutHendler = () => {
    createFetchRequest("deleteSession", [], { session_id }, "DELETE");
  };

  return (
    <div className="accountMenu">
      <ul>
        <li onClick={logOutHendler}>LogOut</li>
      </ul>
    </div>
  );
};

export default AccountMenu;
