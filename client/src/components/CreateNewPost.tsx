import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";
import { fetchData } from "../services/helpers";
import Avvvatars from "avvvatars-react";

const Layout = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    padding: 0rem;
  }
`;

const TextBox = styled.textarea`
  width: 100%;
  min-height: 80px;
  padding: 15px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: #f9f9f9;
  color: #333;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
  margin-left: 1rem;

  &:focus {
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }

  @media (max-width: 768px) {
    min-height: 60px;
  }
`;

type CreateNewPostProps = {
  onPostCreated: () => void;
};

export default function CreateNewPost({ onPostCreated }: CreateNewPostProps) {
  const [user] = useContext(UserContext);
  const [avatarSize, setAvatarSize] = useState(100);

  const [content, setContent] = useState({
    userId: "",
    postedBy: "",
    message: "",
  });

  const userid = user.userId;
  const name = user.firstName + " " + user.lastName;

  const handleSubmit = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createPost();
      setContent({ ...content, message: "" });
    }
  };

  const createPost = async () => {
    await fetchData(`${userid}/newPost`, "POST", content);

    onPostCreated();
  };

  useEffect(() => {
    setContent({ ...content, userId: userid, postedBy: name });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userid]);

  const displayName = user.firstName[0] + user.lastName[0];
  const username = user.firstName + " " + user.lastName;

  useEffect(() => {
    const updateAvatarSize = () => {
      if (window.innerWidth < 768) {
        setAvatarSize(80);
      } else {
        setAvatarSize(100);
      }
    };

    updateAvatarSize();

    window.addEventListener("resize", updateAvatarSize);

    return () => window.removeEventListener("resize", updateAvatarSize);
  }, []);
  return (
    <>
      <Layout>
        <Avvvatars
          value={username}
          size={avatarSize}
          displayValue={displayName}
        />
        <TextBox
          placeholder={`What's on your mind, ${user.firstName} ?`}
          onKeyDown={handleSubmit}
          value={content.message}
          onChange={(e) => setContent({ ...content, message: e.target.value })}
        />
      </Layout>
    </>
  );
}
