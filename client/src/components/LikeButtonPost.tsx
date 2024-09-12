import styled from "styled-components";
import { fetchData } from "../services/helpers";
import { useEffect, useState } from "react";

const ActionButton = styled.svg`
  margin-right: 5px;
  &:hover {
    fill: orange;
    stroke: black;
  }
`;

type postId = {
  postId: string;
};

export default function LikeButton({ postId }: postId) {
  const [postLikes, setPostLikes] = useState();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const handleClick = async () => {
    const res = await fetchData(
      `${backendURL}/api/${postId}/updatePostLikes`,
      "PUT"
    );
    const data = await res?.json();
    const updatedPostLikes = data.updatedPostLikes;
    setPostLikes(updatedPostLikes);
  };

  useEffect(() => {
    const getPostLikes = async () => {
      const res = await fetchData(
        `${backendURL}/api/${postId}/getPostLikes`,
        "GET"
      );
      const data = await res?.json();
      const totalPostLikes = data.postLikes;
      setPostLikes(totalPostLikes);
    };
    getPostLikes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ActionButton
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="black"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        onClick={handleClick}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </ActionButton>
      <div>{postLikes}</div>
    </>
  );
}
