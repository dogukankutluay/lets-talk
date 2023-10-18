import React, { useContext, createContext } from "react";

const FireBaseContext = createContext();

export function FireBaseProvider({ app, auth, db, children }) {
  return (
    <FireBaseContext.Provider value={{ app, auth, db }}>
      {children}
    </FireBaseContext.Provider>
  );
}

export function useFireBase() {
  const context = useContext(FireBaseContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
