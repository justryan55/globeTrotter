import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";
import { fetchData } from "../services/helpers";

const ExistingComments = styled.div`
  box-sizing: border-box;
  width: 100%;

  padding: 10px;
  min-height: 50px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: #f9f9f9;
`;

const ExistingComment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;

  padding: 10px;
  min-height: 50px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
`;

const Sender = styled.div`
  color: black;
  font-weight: 500;
`;

const Comment = styled.div`
  color: black;
`;

const Timestamp = styled.div`
  color: #333;
  font-size: 12px;
`;

const NewCommentBox = styled.textarea`
  box-sizing: border-box;
  width: 100%;

  padding: 10px;
  min-height: 50px;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: #f9f9f9;
  color: #333;
`;

export default function CommentComponent({ postId }) {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const [user] = useContext(UserContext);

  const userid = user.userId;
  const name = user.firstName + " " + user.lastName;
  const [comments, setComments] = useState([]);
  const [commentDetails, setCommentDetails] = useState({
    userId: "",
    postedBy: "",
    comment: "",
  });

  const handleSubmit = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setCommentDetails({
        userId: userid,
        postedBy: name,
        comment: "",
      });
      createComment();
    }
  };

  const createComment = async () => {
    const res = await fetchData(
      `${backendURL}/api/${postId}/newComment`,
      "POST",
      commentDetails
    );
    const data = await res?.json();
  };

  const fetchComments = async () => {
    const res = await fetchData(
      `${backendURL}/api/${postId}/getComments`,
      "GET"
    );
    const data = await res?.json();
    const existingComments = await data.message;
    setComments(existingComments);
  };

  useEffect(() => {
    fetchComments();
  }, [userid]);

  useEffect(() => {
    setCommentDetails({ ...commentDetails, userId: userid, postedBy: name });
  }, [user]);

  return (
    <>
      <ExistingComments>
        {comments.length === 0 ? (
          <p>No comments</p>
        ) : !comments ? (
          <p>Loading...</p>
        ) : (
          comments &&
          comments.map((comment) => {
            const postedBy = comment.postedBy;
            const timestamp = comment.createdAt;
            const message = comment.comment;

            return (
              <ExistingComment>
                <div>
                  <Sender>{postedBy}</Sender>
                  <Comment>{message}</Comment>
                </div>
                <Timestamp>{timestamp}</Timestamp>
              </ExistingComment>
            );
          })
        )}
      </ExistingComments>
      <NewCommentBox
        placeholder={`Comment as ${user.firstName}`}
        onKeyDown={handleSubmit}
        value={commentDetails.comment}
        onChange={(e) =>
          setCommentDetails({ ...commentDetails, comment: e.target.value })
        }
      />
    </>
  );
}
