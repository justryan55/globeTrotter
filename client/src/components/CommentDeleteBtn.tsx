import styled from "styled-components";
import { fetchData } from "../services/helpers";

const DeleteButton = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: transparent;
  font-size: 20px;
  margin-bottom: 18px;

  cursor: pointer;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &:hover {
    background-color: rgba(255, 0, 0, 0.1);
    color: darkred;
  }

  &:active {
    background-color: rgba(255, 0, 0, 0.2);
  }
`;

export default function CommentDeleteBtn({
  postId,
  user,
  commentId,
  fetchComments,
  postedBy,
}) {
  const userId = user.userId;

  const handleClick = async () => {
    const res = await fetchData(
      `${userId}/${postId}/${commentId}/deleteComment`,
      "DELETE"
    );
    fetchComments();
  };
  return (
    userId === postedBy && (
      <DeleteButton onClick={handleClick}>&times;</DeleteButton>
    )
  );
}
