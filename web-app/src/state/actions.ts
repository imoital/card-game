export enum ActionType {
  SET_ROOM,
}

export interface SetRoom {
  type: ActionType.SET_ROOM;
  payload: string;
}

export type Actions = SetRoom;
