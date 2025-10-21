import styled from "styled-components";
import { fetchData } from "../services/helpers";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../services/AuthContext";

const Text = styled.p`
  &:hover {
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Counter = styled.div`
  font-size: 0.85rem;
  font-weight: bold;
  color: #555;
  margin-left: 0.5rem;
  padding: 0.2rem 0.4rem;
  background-color: #f0f0f0;
  border-radius: 0.5rem;
`;

type LikeButtonCommentProps = {
  postId: string;
  commentId: string;
};

export default function LikeButtonComment({
  postId,
  commentId,
}: LikeButtonCommentProps) {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error(
      "useContext(UserContext) must be used within an AuthContext Provider"
    );
  }

  const [user] = context;
  const [text, setText] = useState("Like");
  const [counter, setCounter] = useState();
  const userId = user.userId;

  const handleClick = async () => {
    const res = await fetchData(
      `${postId}/${commentId}/updateCommentLikes`,
      "PUT",
      { userId: userId }
    );
    const data = await res?.json();

    if (data.message === "Liked comment") {
      setText("Liked");
    }
    if (data.message === "Unliked comment") {
      setText("Like");
    }
  };

  useEffect(() => {
    const fetchCommentLikes = async () => {
      const res = await fetchData(
        `${userId}/${postId}/${commentId}/fetchCommentLikes`,
        "GET"
      );

      const data = await res?.json();

      if (data.message.includes(userId)) {
        setText("Liked");
      }
      setCounter(data.message.length);
    };

    fetchCommentLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, text, counter]);
  return (
    <>
      <Text onClick={handleClick}>{text}</Text>
      {counter !== undefined && counter > 0 && (
        <Counter>{`${counter}`}</Counter>
      )}
    </>
  );
}
