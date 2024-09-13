import styled from "styled-components";

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

export default function FollowFriend() {
  return <Button>Follow</Button>;
}
