import styled from "styled-components";
import { fetchData } from "../services/helpers";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../services/AuthContext";
import { isCompositeComponent } from "react-dom/test-utils";

const Button = styled.button`
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 10px 20px;
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

export default function FollowFriend(Id) {
  const [user, setUser] = useContext(UserContext);
  const [following, setFollowing] = useState([]);
  const userId = user.userId;
  const friendId = Id.Id;

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await fetchData(`/${userId}/fetchFriends`, "GET");
      const data = await res?.json();
      console.log(data);
      setFollowing(data.message);
    };

    fetchFriends();
  }, [user.friends]);

  const handleClick = async () => {
    try {
      const res = await fetchData(`/${userId}/toggleFollow`, "PUT", {
        friendId,
      });
      const data = await res?.json();

      if (data.message === "Following user") {
        setUser((prevUser) => ({
          ...prevUser,
          friends: [...prevUser.friends, friendId],
        }));
      }

      if (data.message === "Unfollowing user") {
        setUser((prevUser) => ({
          ...prevUser,
          friends: prevUser.friends.filter((id) => id !== friendId),
        }));
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Button onClick={handleClick}>
      {following.includes(friendId) ? <p>Following</p> : <p>Follow</p>}
    </Button>
  );
}
