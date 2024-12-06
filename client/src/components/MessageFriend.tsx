/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import styled from "styled-components";
import { fetchData } from "../services/helpers";
import { useContext, useState } from "react";
import { UserContext } from "../services/AuthContext";

interface User {
  userId: string;
  firstName: string;
  lastName: string;
}

interface MessageDetailsPayload {
  conversationId: string;
  sender: User;
  text: string;
  [key: string]: any;
}

const Button = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 0px 30px;
  border-radius: 5px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #1976d2;
  }

  &:active {
    background-color: #0d47a1;
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

type FollowFriendProps = {
  Id: string;
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModelContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Header = styled.h2`
  margin-bottom: 20px;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border: 1px solid #ccc;
  border-radius: 4px;
  resize: none;
  font-family: "Open Sans";
`;

const ModelActions = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

const Btn = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

export default function FollowFriend(Id: FollowFriendProps) {
  const context = useContext(UserContext);
  const [user] = context || [{}, () => {}];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageSent, setMessageSent] = useState(false);
  // @ts-ignore
  const userId = user?.userId ?? "";
  const friendId = Id.Id;

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const payload = {
        senderId: userId,
        receiverId: friendId,
      };
      const res = await fetchData(
        `/${userId}/newConversation`,
        "POST",
        payload
      );

      if (res?.ok) {
        const data = await res?.json();

        const messageDetails: MessageDetailsPayload = {
          conversationId: data.message._id,
          sender: {
            userId: userId ?? "",
            firstName: (user as { firstName: string }).firstName ?? "Unknown",
            lastName: (user as { lastName: string }).lastName ?? "User",
          },
          text: message,
        };

        const response = await fetchData(
          `/${data.message._id}/newMessage`,
          "POST",
          messageDetails
        );

        if (response?.ok) {
          setMessageSent(true);
          setTimeout(() => {
            closeModal();
            setMessageSent(false);
            setMessage("");
          }, 1000);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Button onClick={openModal}>
        <p>Message</p>
      </Button>
      {isModalOpen && (
        <ModalOverlay>
          <ModelContent onClick={(e) => e.stopPropagation()}>
            <Header>Send a Message</Header>
            <form onSubmit={handleSubmit}>
              <TextArea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message here..."
                required
              ></TextArea>
              <ModelActions>
                <Btn type="button" onClick={closeModal}>
                  Cancel
                </Btn>
                {messageSent && <p>Message Sent</p>}
                <Btn type="submit">Send</Btn>
              </ModelActions>
            </form>
          </ModelContent>
        </ModalOverlay>
      )}
    </>
  );
}
