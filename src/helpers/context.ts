import React from "react";

export type GlobalContextType = {
  count: number;
  update: Function;
};

const defaultState:GlobalContextType = {
  count: 0,
  update: (data: GlobalContextType) => {},
};

const GlobalContext = React.createContext(defaultState);

export default GlobalContext;
