import { SendOutlined } from "@ant-design/icons";
import { Button, Form, Input, Space, Typography } from "antd";
import {
  ChangeEvent,
  SyntheticEvent,
  useContext,
  useEffect,
  useState,
} from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import { gun } from "../../gun";
import { Context } from "../../state/context";
import { ChatBubble } from "./ChatBubble";

import * as _ from "lodash";

const { Text } = Typography;

interface ChatLog {
  name: string;
  message: string;
  id: number;
}

const ChatWrapper = styled(Space)`
  display: flex;
  background-color: white;
  height: 100%;
  padding: 20px;
`;

const StyledInput = styled(Space.Compact)`
  width: 100%;
`;

const ChatBox = () => {
  const { state } = useContext(Context);
  const [message, setMessage] = useState("");
  const [chatLogs, setChatLogs] = useState<ChatLog[]>([]);

  useEffect(() => {
    // TODO: figure out why this subscription triggers multiple times
    // TODO: remove _.unionBy
    const messageSubscription = gun
      .get(state.roomName)
      .get("messages")
      .map()
      .on((m) => {
        setChatLogs((oldChatLogs) =>
          _.unionBy(
            oldChatLogs,
            [
              {
                name: m.name === state.playerName ? "Me" : "Friend",
                message: m.message,
                id: m.id,
              },
            ],
            "id"
          )
        );
      });

    return () => {
      messageSubscription.off();
    };
  }, []);

  const handleNewMessage = (event: SyntheticEvent) => {
    event.preventDefault();
    gun.get(state.roomName).get("messages").set({
      name: state.playerName,
      message,
      id: uuidv4(),
    });
    setMessage("");
  };
  const handleMessageChange = (event: ChangeEvent<HTMLInputElement>) =>
    setMessage(event.target.value);

  return (
    <ChatWrapper direction="vertical">
      <Text>Chat</Text>
      <div style={{ flex: 1 }}>
        {chatLogs.map(({ name, message, id }) => (
          <ChatBubble key={id} name={name} message={message} />
        ))}
      </div>
      <Form onSubmitCapture={handleNewMessage}>
        <StyledInput>
          <Input
            placeholder="Send Message"
            value={message}
            onChange={handleMessageChange}
          />
          <Button type="primary" htmlType="submit" icon={<SendOutlined />} />
        </StyledInput>
      </Form>
    </ChatWrapper>
  );
};

export default ChatBox;
