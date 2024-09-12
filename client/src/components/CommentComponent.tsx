import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../services/AuthContext";
import { fetchData } from "../services/helpers";

const ExistingComments = styled.div`
  box-sizing: border-box;
  width: 100%;

  padding: 10px;
  min-height: 50px;
  max-height: 240px;
  overflow-y: scroll;
  margin-bottom: 10px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  outline: none;
  resize: none;
  background-color: white;
`;

const ExistingComment = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  width: 100%;
  background-color: #f9f9f9;

  padding: 10px;
  min-height: 50px;
  font-size: 16px;
  border: 1px solid rgb(204, 204, 204, 0.5);
  border-radius: 8px;
`;

const Sender = styled.div`
  color: black;
  font-weight: 500;
  font-size: 0.9rem;
`;

const Comment = styled.div`
  color: black;
  font-size: 0.9rem;
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

const CommentActions = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  font-size: 14px;
  padding-left: 10px;
  gap: 1rem;
  /* margin-bottom: 10px; */
`;

const Action = styled.p``;

type postId = {
  postId: string;
};

type Comment = {
  _id: string;
  postedBy: string;
  createdAt: string;
  comment: string;
};

export default function CommentComponent({ postId }: postId) {
  const [user] = useContext(UserContext);

  const userid = user.userId;
  const name = user.firstName + " " + user.lastName;
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentDetails, setCommentDetails] = useState({
    userId: "",
    postedBy: "",
    comment: "",
  });

  const formatTimestamp = (timestamp: string) => {
    const current = new Date();
    const provided = new Date(timestamp);

    const timeDifference = current.getTime() - provided.getTime();
    const minutes = Math.floor(timeDifference / (1000 * 60));
    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    if (minutes === 0) {
      return "Just now";
    }

    if (minutes < 60) {
      return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;
    }

    if (hours < 24) {
      return `${hours} hour${hours === 1 ? "" : "s"} ago`;
    } else {
      return `${days} day${days === 1 ? "" : "s"} ago`;
    }
  };

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
    const res = await fetchData(`${postId}/newComment`, "POST", commentDetails);
    const data = await res?.json();
  };

  const fetchComments = async () => {
    const res = await fetchData(`${postId}/getComments`, "GET");
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
      {comments && comments.length > 0 && (
        <ExistingComments>
          {comments.map((comment) => {
            const postedBy = comment.postedBy;
            const timestamp = comment.createdAt;
            const message = comment.comment;

            return (
              <>
                <ExistingComment key={comment._id}>
                  <div>
                    <Sender>{postedBy}</Sender>
                    <Comment>{message}</Comment>
                  </div>
                </ExistingComment>
                <CommentActions>
                  <Timestamp>{formatTimestamp(timestamp)}</Timestamp>
                  <Action>Like</Action>
                  <Action>Reply</Action>
                </CommentActions>
              </>
            );
          })}
        </ExistingComments>
      )}
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
