import { Typography } from "antd";
import { BaseType } from "antd/es/typography/Base";
import styled from "styled-components";

const { Text } = Typography;

enum TYPE {
  SEND,
  RECEIVE,
  PLAYER_JOINED,
  PLAYER_LEAVE,
}

const ChatMessage = styled(Text)``;

const ChatBubble = ({
  type,
  name,
  message,
}: {
  type?: TYPE;
  name: string;
  message: string;
}) => {
  let antType: BaseType | undefined = undefined;

  switch (type) {
    case TYPE.PLAYER_JOINED:
      antType = "success";
      break;
    case TYPE.PLAYER_LEAVE:
      antType = "danger";
      break;
    default:
      break;
  }
  return (
    <div>
      <ChatMessage type={antType}>
        {name !== "" ? `${name}: ${message}` : message}
      </ChatMessage>
    </div>
  );
};

export { ChatBubble, TYPE };
