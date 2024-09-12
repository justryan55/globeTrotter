import { ChangeEvent, useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";
import { fetchData } from "../services/helpers";

const Layout = styled.div`
  display: flex;
  align-items: center;
  box-sizing: border-box;
  /* border: 0.5px rgb(0, 0, 0, 0.2) solid; */
  width: 100%;
  padding: 1rem;
  margin-bottom: 1rem;
`;

const UserImg = styled.img`
  height: 80px;
  margin-right: 1rem;
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

  &:focus {
    box-shadow: 0 0 8px rgba(0, 123, 255, 0.2);
  }
`;

export default function CreateNewPost({ onPostCreated }) {
  const [user] = useContext(UserContext);
  const [content, setContent] = useState({
    userId: "",
    postedBy: "",
    message: "",
  });

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const userid = user.userId;
  const name = user.firstName + " " + user.lastName;

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      createPost();
      setContent({ ...content, message: "" });
    }
  };

  const createPost = async () => {
    const res = await fetchData(
      `${backendURL}/api/${userid}/newPost`,
      "POST",
      content
    );
    const data = await res?.json();

    onPostCreated();
  };

  useEffect(() => {
    setContent({ ...content, userId: userid, postedBy: name });
  }, [userid]);

  return (
    <>
      <Layout>
        <UserImg src="/images/avatar.png" />
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
