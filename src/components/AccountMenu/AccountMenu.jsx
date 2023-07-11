import React, { useContext } from "react";
import "./AccountMenu.css";
import { useLocalStorage } from "../../hooks/useLocalStogage";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/userContext";

const AccountMenu = () => {
  const [ses_id, setSessionId] = useLocalStorage("session_id");
  const navigate = useNavigate();
  const [, setUserContext] = useContext(UserContext);

  const logOutHendler = async () => {
    console.log("logOut");

    await setSessionId(null);
    await setUserContext({ isLogedIn: null, currentUser: null });
    navigate("/");
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
