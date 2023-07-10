import React, { useState } from "react";

export const UserContext = React.createContext([{}, () => {}]);

export const UserProvider = ({ children }) => {
  const [state, setState] = useState({
    isLoading: false,
    isLogedIn: null,
    currentUser: null,
  });

  return (
    <UserContext.Provider value={[state, setState]}>
      {children}
    </UserContext.Provider>
  );
};
