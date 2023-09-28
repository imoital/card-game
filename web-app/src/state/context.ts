import { Dispatch, createContext } from "react";
import { Actions } from "./actions";
import { IState, initialState } from "./state";

export const Context = createContext<{
  state: IState;
  dispatch: Dispatch<Actions>;
}>({
  state: initialState,
  dispatch: () => undefined,
});
