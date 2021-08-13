import React, { useState } from "react";

const initialState = {
  lat: 21,
  lng: 22
}

export const Context = React.createContext();

// export function getState() {
//   return localStorage.getItem('state')
// }

// export function removeState() {
//   return localStorage.removeItem('state')
// }

const Store = ({ children }) => {
  const [coords, setCoords] = useState(initialState);
  // localStorage.setItem('state', state.loggedIn)

  return (
    <Context.Provider value={[coords, setCoords]}>{children}</Context.Provider>
  )

};

export default Store;