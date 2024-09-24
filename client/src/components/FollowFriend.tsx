import styled from "styled-components";
import { fetchData } from "../services/helpers";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../services/AuthContext";

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

type User = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  countriesVisited: string[];
  friends: string[];
  followers: string[];
};

export default function FollowFriend(Id: FollowFriendProps) {
  const context = useContext(UserContext);
  const [user, setUser] = context || [{}, () => {}];
  const [following, setFollowing] = useState<string[]>([]);
  const userId = user?.userId;
  const friendId = Id.Id;

  useEffect(() => {
    const fetchFriends = async () => {
      const res = await fetchData(`/${userId}/fetchFriends`, "GET");
      const data = await res?.json();
      setFollowing(data.message);
    };

    fetchFriends();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.friends]);

  const handleClick = async () => {
    try {
      const res = await fetchData(`/${userId}/toggleFollow`, "PUT", {
        friendId,
      });
      const data = await res?.json();

      if (data.message === "Following user") {
        setUser((prevUser: User) => ({
          ...prevUser,
          friends: [...prevUser.friends, friendId],
        }));
      }

      if (data.message === "Unfollowing user") {
        setUser((prevUser: User) => ({
          ...prevUser,
          friends: prevUser.friends.filter((id: string) => id !== friendId),
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
