import { v4 as uuidv4 } from "uuid";

export interface IMessage {
  name: string;
  message: string;
}

export interface IState {
  playerName: string;
  roomName: string;
  messages: IMessage[];
}

export const initialState: IState = {
  playerName: uuidv4(),
  roomName: "",
  messages: [],
};
