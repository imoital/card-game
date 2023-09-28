import { Button, Input, Row, Space, Typography } from "antd";
import { Content } from "antd/es/layout/layout";
import { ChangeEvent, useContext, useState } from "react";
import { gun } from "../gun";
import { Context } from "../state/context";
import { setRoom } from "../state/reducer";

const InitialScreen = () => {
  const { dispatch } = useContext(Context);
  const [roomName, setRoomName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const createRoom = async () => {
    setIsLoading(true);
    await new Promise<void>((resolve) => {
      gun.get(roomName).once((data) => {
        if (data === undefined || data.userCount === 0) {
          gun
            .get(roomName)
            .get("userCount")
            .put(1, () => {
              dispatch(setRoom(roomName));
              setRoomName("");
              resolve();
            });
        } else {
          setErrorMessage("Room Already Exists");
        }
        setIsLoading(false);
      });
    });
  };

  const joinRoom = async () => {
    setIsLoading(true);
    await new Promise<void>((resolve) => {
      gun.get(roomName).once((data) => {
        if (data === undefined) {
          setErrorMessage("Room Doesn't Exist");
        } else {
          console.log(data.userCount);
          if (data.userCount < 2) {
            gun
              .get(roomName)
              .get("userCount")
              .put(data.userCount + 1);
            dispatch(setRoom(roomName));
            setRoomName("");
          } else {
            setErrorMessage("Room Is Full");
          }
          resolve();
        }
        setIsLoading(false);
      });
    });
  };

  const onChangeRoomName = (e: ChangeEvent<HTMLInputElement>) => {
    setRoomName(e.target.value);
  };

  return (
    <Content>
      <Row justify="center" align="middle" style={{ minHeight: "100%" }}>
        <Space direction="vertical" align="center">
          <Typography.Title>Card Game</Typography.Title>
          <Input
            value={roomName}
            placeholder="Room Name"
            allowClear
            onChange={onChangeRoomName}
            showCount
            maxLength={10}
            status={errorMessage ? "error" : undefined}
          />
          {errorMessage && (
            <Typography.Text type="danger">{errorMessage}</Typography.Text>
          )}
          <Space>
            {isLoading ? (
              <></>
            ) : (
              <>
                <Button type="primary" onClick={joinRoom}>
                  Join Room
                </Button>
                <Button type="primary" danger onClick={createRoom}>
                  Add Room
                </Button>
              </>
            )}
          </Space>
        </Space>
      </Row>
    </Content>
  );
};

export default InitialScreen;
