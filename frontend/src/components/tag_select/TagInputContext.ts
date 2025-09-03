import { createContext } from "react";

export const InputShownContext = createContext(false);
export const InputShownDispatchContext = createContext(
  null as unknown as React.Dispatch<boolean>
);
