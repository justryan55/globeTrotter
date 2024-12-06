import Avvvatars from "avvvatars-react";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface ContainerProps {
  own?: boolean;
}

interface MessageProps {
  message: {
    createdAt: string;
    sender: {
      firstName: string;
      lastName: string;
    };
    text: string;
  };
  own?: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: ${(props) => (props.own ? "flex-end" : "flex-start")};
  margin-top: 20px;
`;

const MessageTop = styled.div`
  display: flex;
  align-items: center;
`;

const MessageText = styled.p<ContainerProps>`
  padding: 10px;
  border-radius: 20px;
  background-color: ${(props) => (props.own ? "#90ee90" : "#ffde9d")};
  color: ${(props) => (props.own ? "black" : "black")};
  max-width: 300px;
`;

const MessageBottom = styled.div<ContainerProps>`
  font-size: 12px;
  text-align: ${(props) => (props.own ? "right" : "left")};
`;

export default function Message({ message, own }: MessageProps) {
  const [timestamp, setTimestamp] = useState("");
  const formatTimestamp = (timestamp: string) => {
    const current = new Date();
    const provided = new Date(timestamp);
    // const timeDifference = current - provided;
    const timeDifference: number = current.getTime() - provided.getTime();

    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutes === 0) {
      return "Just now";
    } else if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    } else if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
  };

  useEffect(() => {
    setTimestamp(formatTimestamp(message.createdAt));
  }, [message, message.createdAt]);

  const displayName = message.sender.firstName[0] + message.sender.lastName[0];
  const username = message.sender.firstName + " " + message.sender.lastName;

  return (
    <Container own={own}>
      <MessageTop>
        {!own && (
          <Avvvatars value={username} size={50} displayValue={displayName} />
        )}

        <MessageText own={own}>{message.text}</MessageText>
        {own && (
          <Avvvatars value={username} size={50} displayValue={displayName} />
        )}
      </MessageTop>{" "}
      <MessageBottom own={own}>{timestamp}</MessageBottom>
    </Container>
  );
}
