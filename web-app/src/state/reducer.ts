import { ActionType, Actions, SetRoom } from "./actions";
import { IState } from "./state";

export const reducer = (state: IState, action: Actions): IState => {
  console.log(action.type, action.payload);
  switch (action.type) {
    case ActionType.SET_ROOM:
      return { ...state, roomName: action.payload };
    default:
      return state;
  }
};

export const setRoom = (roomName: string): SetRoom => ({
  type: ActionType.SET_ROOM,
  payload: roomName,
});
