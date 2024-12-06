import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../services/helpers";
import Avvvatars from "avvvatars-react";

type Snapshot = {
  messageId: string;
  name: string;
  timestamp: string;
  lastMessage: string;
};

const ConversationDetails = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
  height: 90px;
  border-top: none;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

const ConversationSnapshot = styled.div`
  align-items: center;
  justify-content: center;
  width: 80%;
`;

const FirstRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1000px) {
    flex-direction: column;
  }

  @media (max-width: 764px) {
    flex-direction: row;
  }
`;

const Name = styled.p`
  font-size: 1rem;
  font-weight: 600;
`;

const LastMessage = styled.p`
  font-size: 0.75rem;
  color: rgb(95, 101, 106);
`;

const SecondRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 1000px) {
    display: none;
  }

  @media (max-width: 764px) {
    display: flex;
  }
`;

const LastSent = styled.p`
  font-size: 0.75rem;
  color: rgb(95, 101, 106);
`;

const MessageSentImage = styled.img`
  margin-left: 35px;
  margin-top: 10px;

  @media (max-width: 1200px) {
    display: none;
  }
  @media (max-width: 764px) {
    display: block;
  }
`;

export default function Snapshot({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState("");
  const [timestamp, setTimestamp] = useState("");

  const formatTimestamp = (timestamp) => {
    const current = new Date();
    const provided = new Date(timestamp);
    const timeDifference = current - provided;
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

  const truncateMessage = (message, wordLimit = 5) => {
    const words = message.split(" ");
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...";
    }
    return message;
  };

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser.userId);

    const getUser = async () => {
      const res = await fetchData(`/getUser/${friendId}`, "GET");
      const data = await res?.json();
      setUser(data.message);
    };

    getUser();
  }, [conversation, currentUser]);

  useEffect(() => {
    const fetchLastMessage = async () => {
      const res = await fetchData(`/messages/${conversation._id}`, "GET");
      if (res?.ok) {
        const data = await res?.json();
        const lastMsg = data.message[data.message.length - 1];
        setLastMessage(lastMsg);
        if (lastMsg?.createdAt) {
          setTimestamp(formatTimestamp(lastMsg.createdAt));
        }
      }
    };
    fetchLastMessage();
  }, [conversation, currentUser]);

  useEffect(() => {
    if (lastMessage?.createdAt) {
      setTimestamp(formatTimestamp(lastMessage.createdAt));
    }
  }, [conversation, currentUser]);

  if (!user) {
    return <div>Loading...</div>;
  }

  const displayName = user.firstName[0] + user.lastName[0];
  const username = user.firstName + " " + user.lastName;
  const truncatedMessage = lastMessage
    ? truncateMessage(lastMessage.text)
    : "No messages";

  return (
    <ConversationDetails>
      {/* <ProfileImage src="/images/profile.png" alt="profile" /> */}
      <Avvvatars value={username} size={50} displayValue={displayName} />
      <ConversationSnapshot>
        <FirstRow>
          <Name>
            {user.firstName} {user.lastName}
          </Name>
          {lastMessage ? (
            <div>
              <LastMessage>{truncatedMessage}</LastMessage>
            </div>
          ) : (
            <LastMessage>No messages</LastMessage>
          )}
        </FirstRow>
        <SecondRow>
          {lastMessage ? (
            <div>
              <LastSent>{timestamp}</LastSent>
            </div>
          ) : (
            <LastSent></LastSent>
          )}

          <MessageSentImage src="/images/tick.svg" alt="messageSent" />
        </SecondRow>
      </ConversationSnapshot>
    </ConversationDetails>
  );
}
