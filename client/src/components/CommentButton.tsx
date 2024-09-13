import { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchData } from "../services/helpers";

const ActionButton = styled.svg`
  margin-right: 5px;
  /* &:hover {
    fill: orange;
    stroke: black;
  } */
`;

export default function CommentButton(postId: string) {
  const [totalComments, setTotalComments] = useState(0);

  useEffect(() => {
    const getCommentCount = async () => {
      const res = await fetchData(`${postId.postId}/getComments`, "GET");
      const data = await res?.json();
      setTotalComments(data.message.length);
    };

    getCommentCount();
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
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </ActionButton>
      <div>{totalComments}</div>
    </>
  );
}
