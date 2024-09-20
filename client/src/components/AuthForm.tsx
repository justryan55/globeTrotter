import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { fetchData } from "../services/helpers";
import { useState } from "react";

const CredentialsLayout = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px rgb(0, 0, 0, 75%) solid;
  border-radius: 1rem;
  min-width: 50%;
  min-height: 50%;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Header = styled.h2`
  font-weight: 500;
  padding: 0px 1rem;
`;

const Text = styled.p`
  font-size: 0.9rem;
`;

const Input = styled.input`
  width: 80%;
  padding: 0.5rem;
  margin-bottom: 10px;
`;

const Button = styled.button`
  background-color: #3283ae;
  width: 85%;
  color: white;
  font-size: 1rem;
  font-weight: 600;
  padding: 0.5rem;
  border: none;
  border-radius: 0.25rem;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #116592;
  }
`;

const ErrorText = styled.p`
  color: #d00000;
  font-size: medium;
`;

export const AuthForm = ({ auth }: { auth: string }) => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (auth === "login") {
      const res = await fetchData(`auth/login`, "POST", formData);

      if (formData.email === "") {
        setError("Please enter a valid email address");
        return;
      }

      if (!res?.ok) {
        const data = await res?.json();
        setError(data);
      } else {
        const data = await res?.json();
        const token = window.localStorage.setItem("token", data.token);
        navigate("/home");
        console.log("Logged in!");
      }
    }

    if (auth === "register") {
      const res = await fetchData(`auth/register`, "POST", formData);

      if (!res?.ok) {
        const data = await res?.json();
        setError(data.message);
      } else {
        navigate("/home");
      }
    }
  };

  return (
    <CredentialsLayout>
      <Header>Welcome to Globe Trotter</Header>
      <Form onSubmit={handleSubmit}>
        {auth === "register" && (
          <Input
            id="first-name"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={formData.firstName}
            placeholder="First Name"
          />
        )}
        {auth === "register" && (
          <Input
            id="last-name"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={formData.lastName}
            placeholder="Last Name"
          />
        )}

        <Input
          id="email"
          name="email"
          type="email"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
        />
        <Input
          id="password"
          name="password"
          type="password"
          onChange={handleChange}
          value={formData.password}
          placeholder="Password"
        />
        {auth === "register" && (
          <Input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            onChange={handleChange}
            value={formData.confirmPassword}
            placeholder="Confirm Password"
          />
        )}
        <Button type="submit">{auth === "login" ? "Login" : "Register"}</Button>
      </Form>
      {auth === "login" && (
        <Text style={{ color: "blue" }}>Forgotten password?</Text>
      )}
      <ErrorText>{error}</ErrorText>

      <Text>
        {auth === "login" ? (
          <>
            Not a member?{" "}
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Join here
            </Link>
          </>
        ) : (
          <>
            Already a member?{" "}
            <Link to="/" style={{ textDecoration: "none", color: "blue" }}>
              Login
            </Link>
          </>
        )}
      </Text>
    </CredentialsLayout>
  );
};
