import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import ChatBox from "./ChatBox/ChatBox";

const Game = () => (
  <>
    <Content>
      <div></div>
    </Content>
    <Sider width={500}>
      <ChatBox />
    </Sider>
  </>
);

export default Game;
