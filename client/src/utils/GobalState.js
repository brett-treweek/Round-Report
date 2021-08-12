import React, { useState } from "react";

const initialState = {
  loggedIn: 'false',
}

export const Context = React.createContext();

export function getState() {
  return localStorage.getItem('state')
}

export function removeState() {
  return localStorage.removeItem('state')
}

const Store = ({ children }) => {
  const [state, setState] = useState(initialState);
  localStorage.setItem('state', state.loggedIn)

  return (
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  )

};

export default Store;