import { Layout, Typography } from "antd";
import { useEffect, useReducer } from "react";
import styled, { createGlobalStyle } from "styled-components";
import Game from "./Game/Game";
import InitialScreen from "./InitialScreen/InitialScreen";
import { gun } from "./gun";
import { Context } from "./state/context";
import { reducer } from "./state/reducer";
import { initialState } from "./state/state";

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
`;

const StyledLayout = styled(Layout)`
  height: 100vh;
  padding: 8px;
`;

const StyledUserID = styled(Typography.Text)`
  position: fixed;
  bottom: 10px;
  left: 10px;
`;

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const handleBeforeUnload = async (event: BeforeUnloadEvent) => {
      event.preventDefault();

      const room = gun.get(state.roomName);
      try {
        const userCountData = await new Promise<number>((resolve) => {
          room.get("userCount").once((data) => {
            resolve(data);
          });
        });

        await new Promise<void>((resolve) => {
          room.get("userCount").put(userCountData - 1, () => {
            resolve();
          });
        });
        event.returnValue = "";
      } catch (error) {
        console.error("Error handling beforeunload event:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [state.roomName]);

  return (
    <Context.Provider value={{ state, dispatch }}>
      <GlobalStyle />
      <StyledLayout hasSider>
        <StyledUserID type="secondary">
          {state.roomName && `ROOM: ${state.roomName}`}
          <br />
          YOUR ID: {state.playerName}
        </StyledUserID>
        {state.roomName ? <Game /> : <InitialScreen />}
      </StyledLayout>
    </Context.Provider>
  );
};

export default App;
