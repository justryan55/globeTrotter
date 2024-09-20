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
  font-size: 24px;

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

type user = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  countriesVisited: string[];
  friends: string[];
  followers: string[];
};

type PostDeleteBtnProps = {
  postId: string;
  user: user;
  fetchPosts: () => void;
};

export default function PostDeleteBtn({
  postId,
  user,
  fetchPosts,
}: PostDeleteBtnProps) {
  const userId = user.userId;
  const handleClick = async () => {
    const res = await fetchData(`${userId}/${postId}/deletePost`, "DELETE");

    if (res && res.ok) {
      fetchPosts();
    }
  };
  return <DeleteButton onClick={handleClick}>&times;</DeleteButton>;
}
