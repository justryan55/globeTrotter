import styled from "styled-components";
import { useContext, useEffect, useState } from "react";
import { fetchData } from "../services/helpers";
import Message from "./Message";
import { UserContext } from "../services/AuthContext";
import Snapshot from "./Snapshot";

type Snapshot = {
  messageId: string;
  name: string;
  timestamp: string;
  lastMessage: string;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const ChatBox = styled.div`
  flex: 5.5;

  @media (max-width: 768px) {
    display: none;
  }
`;

const ChatBoxWrapper = styled.div`
  height: 82vh;
  padding: 10px;
`;

const ChatBoxTop = styled.div`
  height: 100%;
  overflow-y: scroll;
  padding-right: 20px;
`;

const ChatBoxBottom = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  border: 1px black solid;
  border-radius: 10px;
  border-color: lightgrey;
  border-style: solid;
  background-color: white;
`;

const ChatMessageInput = styled.textarea`
  padding: 10px;
  width: 90%;
  resize: none;
  border: none;

  &:placeholder-shown {
    font-family: "Open Sans";
  }

  &:focus {
    outline: none;
    border: none;
  }
`;

const ChatSubmitButton = styled.svg`
  width: 30px;
  height: 30px;
  cursor: pointer;

  &:hover {
    stroke: #45aee7;
  }
`;

const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  width: 100%;
  max-height: 100vh;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Header = styled.h1`
  text-align: start;
  font-weight: 500;
  font-size: 1.5rem;
  margin-left: 20px;
  margin-top: 60px;
`;

const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
  overflow: scroll;

  @media (max-width: 768px) {
    position: absolute;
    width: 100%;
    top: 60px;
    bottom: 0;
    background-color: white;
    z-index: 1;
  }
`;

const RightDiv = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

const SnapshotContainer = styled.div`
  @media (max-width: 768px) {
    display: block;
  }
`;

const ChatBoxHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 15px;
  background-color: white;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;

  > svg {
    &:hover {
      cursor: pointer;
      stroke: #3283ae;
    }
  }
`;

const Text = styled.p`
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([null]);
  const [newMessage, setNewMessage] = useState("");
  const [user] = useContext(UserContext) || [];
  const userId = user?.userId;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: {
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      text: newMessage,
      conversationId: currentChat._id,
    };

    if (message.text === "") {
      return;
    }
    try {
      const res = await fetchData(
        `${currentChat._id}/newMessage`,
        "POST",
        message
      );
      const data = await res?.json();
      setMessages([...messages, data.message]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetchData(`${userId}/getConversations`, "GET");
        const data = await res?.json();
        setConversations(data.message);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [userId]);

  useEffect(() => {
    const getMessages = async () => {
      const res = await fetchData(`messages/${currentChat?._id}`, "GET");
      const data = await res?.json();
      setMessages(data.message);
    };
    getMessages();
  }, [currentChat]);

  const handleDelete = async (currentChat) => {
    try {
      const res = await fetchData(
        `${currentChat._id}/deleteConversation`,
        "DELETE",
        { isDeleted: true }
      );

      if (res?.ok) {
        const data = await res?.json();

        setConversations(
          conversations.filter(
            (conversation) => conversation._id !== currentChat._id
          )
        );

        if (currentChat._id === currentChat._id) {
          setCurrentChat(null);
          setMessages([]);
        }
      }
    } catch (err) {
      console.log("Error deleting conversation:", err);
    }
  };

  return (
    <MainContainer>
      <LeftDiv>
        <Header>Chats</Header>
        {conversations.map((conversation) => (
          <SnapshotContainer onClick={() => setCurrentChat(conversation)}>
            <Snapshot conversation={conversation} currentUser={user} />
          </SnapshotContainer>
        ))}
      </LeftDiv>
      <RightDiv>
        <Wrapper>
          <ChatBox>
            {currentChat && (
              <ChatBoxHeader>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  onClick={() => {
                    handleDelete(currentChat);
                  }}
                >
                  <polyline points="3 6 5 6 21 6"></polyline>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                  <line x1="10" y1="11" x2="10" y2="17"></line>
                  <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
              </ChatBoxHeader>
            )}
            <ChatBoxWrapper>
              {currentChat ? (
                <>
                  <ChatBoxTop>
                    {messages.map((message) => (
                      <Message
                        message={message}
                        own={message.sender.userId === userId}
                      />
                    ))}
                  </ChatBoxTop>
                  <ChatBoxBottom>
                    <ChatMessageInput
                      placeholder="Send your message..."
                      onChange={(e) => setNewMessage(e.target.value)}
                      value={newMessage}
                    ></ChatMessageInput>
                    <ChatSubmitButton
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#3283ae"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      onClick={handleSubmit}
                    >
                      <line x1="22" y1="2" x2="11" y2="13"></line>
                      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                    </ChatSubmitButton>
                  </ChatBoxBottom>
                </>
              ) : (
                <Text>Select or start a new conversation.</Text>
              )}
            </ChatBoxWrapper>
          </ChatBox>
        </Wrapper>
      </RightDiv>
    </MainContainer>
  );
}
