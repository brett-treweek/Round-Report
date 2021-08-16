import React, { useState } from "react";

const initialState = {
  lat: 21,
  lng: 22
}

export const Context = React.createContext();


const Store = ({ children }) => {
  const [coords, setCoords] = useState(initialState);

  return (
    <Context.Provider value={[coords, setCoords]}>{children}</Context.Provider>
  )

};

export default Store;